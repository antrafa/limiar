import './styles/main.css';
import './styles/card-magic.css';
import './styles/print.css';

import { escapeHtml, isFigure, renderCardModalContentHtml, renderMagicCardHtml } from './components/card-renderer';
import { renderExemploHtml } from './components/exemplo-view';
import { renderOracleGuideHtml } from './components/oracle-view';
import { type PreparacaoMesa, preparacaoPadrao, renderPlaytestTableHtml } from './components/playtest-view';
import {
  type ConfigDeImpressao,
  configDeImpressaoPadrao,
  type EstampaDoVerso,
  type FormatoDeImpressao,
  type PrintFilterMode,
  renderPrintSheetsHtml,
  type TamanhoDaCarta,
} from './components/print-view';
import { renderQuickstartGuideHtml } from './components/quickstart-view';
import { renderStudioGalleryHtml } from './components/studio-view';
import { renderTemasHtml } from './components/temas-view';
import { cartaPeloCodigo, iniciarEscaneador, renderEscaneadorHtml } from './components/scanner';
import { type Acao, agir, criarPartida, type EscolhaDeMarco, linhaDeStatus, type Naipe, type Partida } from './core/partida';
import {
  carregarDaSalaRemota,
  codificarMesaUrl,
  criarSalaRemota,
  decodificarMesaUrl,
  salvarNaSalaRemota,
} from './core/online-sync';
import {
  exportThemeJson,
  importThemeJson,
  loadPartida,
  loadSalaOnlineId,
  loadThemeId,
  loadThemeWithOverrides,
  resetThemeOverrides,
  saveCardOverride,
  savePartida,
  saveSalaOnlineId,
  saveThemeId,
  syncEstadoDoMundo,
} from './core/storage';
import { ALL_THEME_IDS, DEFAULT_THEME_ID, THEMES } from './data/index';
import type { GameCard, ThemeDeck, ThemeId } from './types/card';

export type StudioTab = 'quickstart' | 'exemplo' | 'temas' | 'studio' | 'playtest' | 'print' | 'oracle';

const TABS: Array<{ id: StudioTab; label: string }> = [
  { id: 'quickstart', label: 'Como jogar' },
  { id: 'exemplo', label: 'Primeira partida' },
  { id: 'temas', label: 'Temas' },
  { id: 'playtest', label: 'Mesa de jogo' },
  { id: 'oracle', label: 'Referência rápida' },
  { id: 'studio', label: 'Cartas e editor' },
  { id: 'print', label: 'Imprimir' },
];

interface AppState {
  activeTab: StudioTab;
  activeThemeId: ThemeId;
  suitFilter: string;
  impressao: ConfigDeImpressao;
  selectedCardId: string;
  partida: Partida | null;
  preparo: PreparacaoMesa;
  toastMessage: string | null;
  salaOnlineId: string | null;
  conectandoOnline: boolean;
}

export function mountLimiarApp(root: HTMLElement): void {
  const savedTheme = loadThemeId();
  const initialThemeId: ThemeId = savedTheme && ALL_THEME_IDS.includes(savedTheme) ? savedTheme : DEFAULT_THEME_ID;
  const partida = loadPartida();
  const salaOnlineId = loadSalaOnlineId();

  const state: AppState = {
    activeTab: 'quickstart',
    activeThemeId: initialThemeId,
    suitFilter: 'all',
    impressao: configDeImpressaoPadrao(),
    selectedCardId: loadThemeWithOverrides(initialThemeId).cards[0].id,
    partida,
    preparo: preparacaoPadrao(),
    toastMessage: null,
    salaOnlineId,
    conectandoOnline: false,
  };

  // Se houver parâmetros de sala na URL (#mesa=... ou ?mesa=...)
  verificarParametrosDaUrl();

  // Polling em segundo plano se houver sala online ativa (a cada 4s)
  setInterval(async () => {
    if (!state.salaOnlineId || !state.partida || state.activeTab !== 'playtest') return;
    try {
      const payload = await carregarDaSalaRemota(state.salaOnlineId);
      if (!payload || !payload.partida) return;
      // Compara se o diário ou estado mudou
      const diarioLocal = state.partida.diario.join('|');
      const diarioRemoto = payload.partida.diario.join('|');
      if (diarioLocal !== diarioRemoto || state.partida.trofeus !== payload.partida.trofeus || state.partida.ameaca !== payload.partida.ameaca) {
        setPartida(payload.partida, false);
      }
    } catch {}
  }, 4000);

  function verificarParametrosDaUrl(): void {
    if (typeof window === 'undefined') return;

    // 1. Verifica ?sala=ID
    const params = new URLSearchParams(window.location.search);
    const salaId = params.get('sala');
    if (salaId) {
      state.salaOnlineId = salaId;
      saveSalaOnlineId(salaId);
      state.activeTab = 'playtest';
      carregarDaSalaRemota(salaId)
        .then((payload) => {
          if (payload && payload.partida) {
            state.activeThemeId = payload.temaId;
            saveThemeId(payload.temaId);
            setPartida(payload.partida, false);
            showToast('Conectado à sala online do link!');
          }
        })
        .catch(() => {});
      return;
    }

    // 2. Verifica hash #mesa=...
    if (window.location.hash.startsWith('#mesa=')) {
      const raw = window.location.hash.replace('#mesa=', '');
      const payload = decodificarMesaUrl(raw);
      if (payload && payload.partida) {
        state.activeThemeId = payload.temaId;
        saveThemeId(payload.temaId);
        setPartida(payload.partida, false);
        state.activeTab = 'playtest';
        showToast('Mesa carregada a partir do link!');
      }
    }
  }

  function showToast(msg: string): void {
    state.toastMessage = msg;
    render();
    setTimeout(() => {
      if (state.toastMessage !== msg) return;
      state.toastMessage = null;
      root.querySelector('.toast')?.remove();
    }, 2600);
  }

  function setPartida(next: Partida | null, enviarRemoto = true): void {
    state.partida = next;
    savePartida(next);
    if (next) syncEstadoDoMundo(state.activeThemeId, next);
    if (enviarRemoto && state.salaOnlineId && next) {
      salvarNaSalaRemota(state.salaOnlineId, state.activeThemeId, next).catch(() => {});
    }
    render();
  }

  function buildEditedCardFromForm(form: HTMLFormElement, baseCard: GameCard): GameCard {
    const data = new FormData(form);
    const campo = (nome: string, atual: string | undefined): string => String(data.get(nome) ?? atual ?? '');
    const updated: GameCard = {
      ...baseCard,
      title: campo('title', baseCard.title),
      artGlyph: campo('artGlyph', baseCard.artGlyph),
      artSubtitle: campo('artSubtitle', baseCard.artSubtitle),
      artUrl: campo('artUrl', baseCard.artUrl).trim() || undefined,
      flavorText: campo('flavorText', baseCard.flavorText),
    };
    if (!isFigure(baseCard)) {
      updated.dailyIdea = campo('dailyIdea', baseCard.dailyIdea);
      updated.topWatcherEvent = campo('topWatcherEvent', baseCard.topWatcherEvent);
      updated.topWatcherTrigger = campo('topWatcherTrigger', baseCard.topWatcherTrigger);
      updated.bottomEchoPrompt = campo('bottomEchoPrompt', baseCard.bottomEchoPrompt);
    }
    return updated;
  }

  function renderTab(deck: ThemeDeck, selectedCard: GameCard): string {
    switch (state.activeTab) {
      case 'quickstart':
        return renderQuickstartGuideHtml(deck);
      case 'exemplo':
        return renderExemploHtml(deck);
      case 'temas':
        return renderTemasHtml(ALL_THEME_IDS.map((id) => loadThemeWithOverrides(id)), state.activeThemeId);
      case 'studio':
        return renderStudioGalleryHtml(deck, selectedCard, state.suitFilter);
      case 'playtest':
        return renderPlaytestTableHtml(deck, state.partida, state.preparo, state.salaOnlineId, state.conectandoOnline);
      case 'print':
        return renderPrintSheetsHtml(deck, state.impressao);
      default:
        return renderOracleGuideHtml(deck);
    }
  }

  function render(): void {
    const deck = loadThemeWithOverrides(state.activeThemeId);
    const selectedCard = deck.cards.find((c) => c.id === state.selectedCardId) ?? deck.cards[0];
    state.selectedCardId = selectedCard.id;

    const temaAtual = `
        <div class="theme-current">
          <span class="muted">Tema</span>
          <strong>${escapeHtml(deck.name)}</strong>
          <button type="button" class="btn-ghost btn-sm" data-goto-tab="temas">Trocar tema</button>
          <button type="button" class="btn-secondary btn-sm" data-abrir-escaneador>Escanear carta</button>
        </div>`;

    const tabs = TABS.map(
      (t) => `
        <button type="button" class="tab ${state.activeTab === t.id ? 'is-active' : ''}" data-tab="${t.id}" ${state.activeTab === t.id ? 'aria-current="page"' : ''}>
          ${t.label}${t.id === 'playtest' && state.partida && !state.partida.resultado ? ' <span class="tab-dot" aria-label="partida em andamento"></span>' : ''}
        </button>`,
    ).join('');

    root.innerHTML = `
      <div class="app">
        <header class="topbar no-print">
          <div class="brand">
            <span class="brand-mark" aria-hidden="true">
              <svg class="brand-emblem" viewBox="0 0 48 48" fill="none">
                <path d="M10 41V21a14 14 0 0 1 28 0v20" stroke="currentColor" stroke-opacity="0.28" stroke-width="1.2" />
                <path d="M9 24.5a15 15 0 0 1 30 0 15.8 13.2 0 0 0-30 0Z" fill="currentColor" />
                <path d="M21.8 15h4.4l-.9 1.6v15.2L24 38.5l-1.3-6.7V16.6l-.9-1.6Z" fill="#fff7e0" />
                <path d="M31.5 24.5 33 27l-1.5 2.5L30 27l1.5-2.5Zm-15 0L18 27l-1.5 2.5L15 27l1.5-2.5Z" fill="currentColor" fill-opacity="0.75" />
                <path d="M7 41h13m8 0h13M24 39.2l1.8 1.8-1.8 1.8-1.8-1.8 1.8-1.8Z" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.1" />
              </svg>
            </span>
            <div class="brand-lockup">
              <div class="brand-wordmark">
                <svg class="brand-eclipse-arch" viewBox="0 0 120 22" fill="none" aria-hidden="true">
                  <path d="M6 21C20 4.5 40 1 60 1s40 3.5 54 20c-15-12.5-34-16.2-54-16.2S21 8.5 6 21Z" fill="currentColor" />
                </svg>
                <h1 class="brand-title">LIM<span class="brand-blade">I</span><span class="brand-a">A</span>R</h1>
              </div>
              <span class="brand-sub">O jogo que ultrapassa a mesa · RPG cooperativo no seu dia</span>
            </div>
          </div>
          ${temaAtual}
        </header>
        <nav class="tabs no-print" aria-label="Seções">${tabs}</nav>
        <main class="content">${renderTab(deck, selectedCard)}</main>
        <dialog id="card-zoom-dialog" class="card-zoom-dialog no-print" closedby="any" aria-labelledby="zoom-dialog-title"></dialog>
        ${state.toastMessage ? `<div class="toast no-print" role="status">${escapeHtml(state.toastMessage)}</div>` : ''}
      </div>
    `;

    bindEvents(deck, selectedCard);
  }

  let pararEscaneador: (() => void) | null = null;

  function openCardZoomModal(card: GameCard): void {
    const dialog = root.querySelector<HTMLDialogElement>('#card-zoom-dialog');
    if (!dialog) return;
    pararEscaneador?.();
    dialog.innerHTML = renderCardModalContentHtml(card);
    if (typeof dialog.showModal === 'function' && !dialog.open) dialog.showModal();
  }

  function abrirEscaneador(deck: ThemeDeck): void {
    const dialog = root.querySelector<HTMLDialogElement>('#card-zoom-dialog');
    if (!dialog) return;
    dialog.innerHTML = renderEscaneadorHtml(deck.name);
    if (typeof dialog.showModal === 'function' && !dialog.open) dialog.showModal();
    const abrirPeloCodigo = (texto: string): void => {
      const carta = cartaPeloCodigo(deck.cards, texto);
      if (carta) openCardZoomModal(carta);
    };
    pararEscaneador = iniciarEscaneador(dialog, abrirPeloCodigo);
    dialog.addEventListener('close', () => pararEscaneador?.(), { once: true });

    let valor = '';
    dialog.querySelectorAll<HTMLButtonElement>('[data-scan-valor]').forEach((btn) =>
      btn.addEventListener('click', () => {
        valor = btn.dataset.scanValor ?? '';
        dialog.querySelectorAll('[data-scan-valor]').forEach((b) => b.classList.toggle('is-active', b === btn));
      }),
    );
    dialog.querySelectorAll<HTMLButtonElement>('[data-scan-naipe]').forEach((btn) =>
      btn.addEventListener('click', () => {
        if (valor) abrirPeloCodigo(`LIMIAR:${valor}${btn.dataset.scanNaipe}`);
      }),
    );
    dialog.querySelectorAll<HTMLButtonElement>('[data-scan-codigo]').forEach((btn) =>
      btn.addEventListener('click', () => abrirPeloCodigo(`LIMIAR:${btn.dataset.scanCodigo}`)),
    );
  }

  function bindEvents(deck: ThemeDeck, selectedCard: GameCard): void {
    root.querySelectorAll<HTMLButtonElement>('[data-switch-theme]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = btn.dataset.switchTheme as ThemeId;
        if (!next || next === state.activeThemeId) return;
        state.activeThemeId = next;
        saveThemeId(next);
        state.selectedCardId = loadThemeWithOverrides(next).cards[0].id;
        if (state.activeTab === 'temas' && !btn.dataset.gotoTab) showToast(`Tema escolhido: ${THEMES[next].name}.`);
        else render();
      });
    });

    root.querySelectorAll<HTMLButtonElement>('[data-tab], [data-goto-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = (btn.dataset.tab ?? btn.dataset.gotoTab) as StudioTab;
        if (!tab) return;
        state.activeTab = tab;
        render();
        window.scrollTo({ top: 0 });
      });
    });

    bindDialogFallback();

    root.querySelector('[data-abrir-escaneador]')?.addEventListener('click', () => abrirEscaneador(deck));

    root.querySelectorAll<HTMLElement>('[data-zoom-card-id]').forEach((el) => {
      el.addEventListener('click', () => {
        // o exemplo usa sempre o Último Eclipse, mesmo com outro tema ativo
        const found = [...deck.cards, ...THEMES.eclipse.cards].find((c) => c.id === el.dataset.zoomCardId);
        if (found) openCardZoomModal(found);
      });
    });

    if (state.activeTab === 'quickstart' || state.activeTab === 'oracle' || state.activeTab === 'exemplo') {
      root.querySelectorAll<HTMLElement>('.mtg-card[data-card-id]').forEach((el) => {
        el.addEventListener('click', () => {
          const found = deck.cards.find((c) => c.id === el.dataset.cardId);
          if (found) openCardZoomModal(found);
        });
      });
    }

    if (state.activeTab === 'studio') bindStudio(deck, selectedCard);
    if (state.activeTab === 'playtest') bindMesa();
    if (state.activeTab === 'print') bindPrint();
  }

  function bindDialogFallback(): void {
    const dialog = root.querySelector<HTMLDialogElement>('#card-zoom-dialog');
    if (!dialog || typeof HTMLDialogElement === 'undefined' || 'closedBy' in HTMLDialogElement.prototype) return;
    const isOutside = (e: PointerEvent): boolean => {
      const r = dialog.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };
    let pressedOutside = false;
    dialog.addEventListener('pointerdown', (e) => {
      pressedOutside = isOutside(e);
    });
    dialog.addEventListener('pointerup', (e) => {
      if (pressedOutside && isOutside(e)) dialog.close();
    });
  }

  function bindStudio(deck: ThemeDeck, selectedCard: GameCard): void {
    root.querySelectorAll<HTMLButtonElement>('[data-suit-filter]').forEach((pill) => {
      pill.addEventListener('click', () => {
        state.suitFilter = pill.dataset.suitFilter ?? 'all';
        render();
      });
    });

    root.querySelectorAll<HTMLElement>('.cards-gallery-grid .mtg-card[data-card-id]').forEach((el) => {
      el.addEventListener('click', () => {
        const cardId = el.dataset.cardId;
        if (!cardId) return;
        if (cardId !== state.selectedCardId) {
          state.selectedCardId = cardId;
          render();
          return;
        }
        const found = deck.cards.find((c) => c.id === cardId);
        if (found) openCardZoomModal(found);
      });
    });

    const form = root.querySelector<HTMLFormElement>('#card-editor-form');
    const preview = root.querySelector<HTMLElement>('#editor-live-preview');
    form?.addEventListener('input', () => {
      if (preview) preview.innerHTML = renderMagicCardHtml(buildEditedCardFromForm(form, selectedCard));
    });
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const updated = buildEditedCardFromForm(form, selectedCard);
      saveCardOverride(updated);
      showToast(`Carta "${updated.title}" salva neste navegador.`);
    });

    root.querySelector('#btn-reset-theme')?.addEventListener('click', () => {
      resetThemeOverrides(state.activeThemeId);
      showToast('Cartas do tema restauradas.');
    });

    root.querySelector('#btn-export-json')?.addEventListener('click', () => {
      const url = URL.createObjectURL(new Blob([exportThemeJson(deck)], { type: 'application/json' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = `limiar-${deck.id}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Arquivo JSON exportado.');
    });

    const inputImport = root.querySelector<HTMLInputElement>('#input-import-json');
    root.querySelector('#btn-import-json')?.addEventListener('click', () => inputImport?.click());
    inputImport?.addEventListener('change', async () => {
      const file = inputImport.files?.[0];
      if (!file) return;
      try {
        const imported = importThemeJson(await file.text());
        if (ALL_THEME_IDS.includes(imported.id)) state.activeThemeId = imported.id;
        showToast(`Tema "${imported.name}" importado.`);
      } catch (err) {
        showToast(err instanceof Error ? err.message : 'Não foi possível importar o arquivo.');
      }
    });
  }

  function bindMesa(): void {
    root.querySelectorAll<HTMLButtonElement>('[data-classe]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const jogador = state.preparo.jogadores[Number(btn.dataset.jogador)];
        if (!jogador) return;
        jogador.classe = btn.dataset.classe as Naipe;
        render();
      });
    });

    root.querySelectorAll<HTMLInputElement>('[data-nome-jogador]').forEach((input) => {
      input.addEventListener('input', () => {
        const jogador = state.preparo.jogadores[Number(input.dataset.nomeJogador)];
        if (jogador) jogador.nome = input.value;
      });
    });

    root.querySelectorAll<HTMLButtonElement>('[data-acao-mesa]').forEach((btn) => {
      btn.addEventListener('click', () => acaoDeMesa(btn.dataset.acaoMesa ?? ''));
    });

    root.querySelectorAll<HTMLButtonElement>('[data-acao-online]').forEach((btn) => {
      btn.addEventListener('click', () => acaoOnline(btn.dataset.acaoOnline ?? ''));
    });

    root.querySelectorAll<HTMLButtonElement>('[data-ritmo-mesa]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const meta = Number(btn.dataset.ritmoMesa);
        if (meta > 0) {
          state.preparo.metaPorPessoa = meta;
          render();
        }
      });
    });

    root.querySelectorAll<HTMLButtonElement>('[data-sugestao-campo]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const campo = btn.dataset.sugestaoCampo ?? '';
        const quem = Number(btn.dataset.sugestaoQuem ?? 0);
        const texto = btn.dataset.sugestaoTexto ?? '';
        const input = root.querySelector<HTMLInputElement>(`[data-campo="${campo}"][data-quem="${quem}"]`);
        if (input) input.value = texto;
        const trigger = root.querySelector<HTMLButtonElement>(`[data-acao="${campo}"][data-quem="${quem}"]`);
        trigger?.click();
      });
    });

    root.querySelectorAll<HTMLButtonElement>('[data-acao]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const acao = acaoDoBotao(btn);
        if (!acao || !state.partida) return;
        const proxima = agir(state.partida, acao);
        if (proxima === state.partida) {
          showToast('Essa jogada ainda não vale: confira se falta escrever algo ou um passo anterior.');
          return;
        }
        setPartida(proxima);
      });
    });
  }

  function acaoDeMesa(nome: string): void {
    const jogadores = state.preparo.jogadores;
    if (nome === 'maisPessoa' && jogadores.length < 4) {
      const usadas = new Set(jogadores.map((j) => j.classe));
      const classe = (['spades', 'hearts', 'diamonds', 'clubs'] as Naipe[]).find((n) => !usadas.has(n)) ?? 'spades';
      jogadores.push({ nome: `Jogador ${jogadores.length + 1}`, classe });
      render();
      return;
    }
    if (nome === 'menosPessoa' && jogadores.length > 1) {
      jogadores.pop();
      render();
      return;
    }
    if (nome === 'comecar') {
      const nomeados = jogadores.map((j, i) => ({ ...j, nome: j.nome.trim() || `Jogador ${i + 1}` }));
      setPartida(criarPartida({ jogadores: nomeados, metaPorPessoa: state.preparo.metaPorPessoa }));
      return;
    }
    if (nome === 'salvarMundo') {
      const nota = root.querySelector<HTMLInputElement>('[data-nota-mundo]')?.value.trim() ?? '';
      syncEstadoDoMundo(state.activeThemeId, state.partida, nota);
      showToast('Status do mundo salvo neste navegador.');
      return;
    }
    if (nome === 'abandonar') {
      setPartida(null);
      return;
    }
    if (nome === 'copiar' && state.partida) {
      const linha = linhaDeStatus(state.partida);
      navigator.clipboard
        ?.writeText(linha)
        .then(() => showToast('Linha copiada. Cole na conversa.'))
        .catch(() => showToast('Não deu para copiar: selecione a linha e copie à mão.'));
    }
  }

  async function acaoOnline(acao: string): Promise<void> {
    if (acao === 'desconectar') {
      state.salaOnlineId = null;
      saveSalaOnlineId(null);
      showToast('Desconectado da sala online.');
      render();
      return;
    }

    if (acao === 'copiarLink') {
      if (!state.partida) return;
      const urlBase = `${window.location.origin}${window.location.pathname}`;
      const link = state.salaOnlineId
        ? `${urlBase}?sala=${encodeURIComponent(state.salaOnlineId)}#playtest`
        : `${urlBase}#mesa=${codificarMesaUrl({ versao: 1, temaId: state.activeThemeId, partida: state.partida, atualizadoEm: Date.now() })}`;

      try {
        await navigator.clipboard.writeText(link);
        showToast('Link copiado! Envie para o seu parceiro.');
      } catch {
        showToast('Não foi possível copiar automaticamente.');
      }
      return;
    }

    if (acao === 'criar') {
      let partidaAtual = state.partida;
      if (!partidaAtual) {
        const nomeados = state.preparo.jogadores.map((j, i) => ({ ...j, nome: j.nome.trim() || `Jogador ${i + 1}` }));
        partidaAtual = criarPartida({ jogadores: nomeados, metaPorPessoa: state.preparo.metaPorPessoa });
      }

      state.conectandoOnline = true;
      render();

      try {
        const idCriado = await criarSalaRemota(state.activeThemeId, partidaAtual);
        state.salaOnlineId = idCriado;
        saveSalaOnlineId(idCriado);
        setPartida(partidaAtual, false);
        state.activeTab = 'playtest';
        showToast(`Sala online criada com sucesso!`);
      } catch {
        showToast('Erro ao criar sala online. Tente novamente.');
      } finally {
        state.conectandoOnline = false;
        render();
      }
      return;
    }

    if (acao === 'entrar') {
      const input = root.querySelector<HTMLInputElement>('[data-campo-sala]');
      const raw = input?.value.trim() ?? '';
      if (!raw) {
        showToast('Digite ou cole o código da sala.');
        return;
      }

      let id = raw;
      if (raw.includes('sala=')) {
        try {
          const u = new URL(raw, window.location.href);
          id = u.searchParams.get('sala') ?? raw;
        } catch {}
      }

      state.conectandoOnline = true;
      render();

      try {
        const payload = await carregarDaSalaRemota(id);
        if (!payload || !payload.partida) {
          showToast('Sala não encontrada ou código expirado.');
        } else {
          state.salaOnlineId = id;
          saveSalaOnlineId(id);
          state.activeThemeId = payload.temaId;
          saveThemeId(payload.temaId);
          setPartida(payload.partida, false);
          state.activeTab = 'playtest';
          showToast(`Conectado à sala!`);
        }
      } catch {
        showToast('Não foi possível conectar à sala.');
      } finally {
        state.conectandoOnline = false;
        render();
      }
      return;
    }

    if (acao === 'sincronizarAgora') {
      if (!state.salaOnlineId) return;
      try {
        const payload = await carregarDaSalaRemota(state.salaOnlineId);
        if (payload && payload.partida) {
          setPartida(payload.partida, false);
          showToast('Mesa atualizada da sala online!');
        }
      } catch {
        showToast('Falha ao sincronizar.');
      }
    }
  }

  function acaoDoBotao(btn: HTMLButtonElement): Acao | null {
    const d = btn.dataset;
    const quem = Number(d.quem ?? 0);
    const texto = root.querySelector<HTMLInputElement>(`[data-campo="${d.acao}"][data-quem="${quem}"]`)?.value ?? '';
    switch (d.acao) {
      case 'abrir': {
        const escolha = root.querySelector<HTMLSelectElement>(`[data-eco-de="${quem}"]`)?.value;
        return { tipo: 'abrir', quem, eco: escolha === undefined ? undefined : Number(escolha) };
      }
      case 'declarar':
      case 'ler':
      case 'narrar':
        return { tipo: d.acao, quem, texto };
      case 'sinal':
      case 'gesto':
        return { tipo: d.acao, quem, relato: texto };
      case 'desafioMaster':
        return { tipo: 'desafioMaster', quem, missao: d.missao ?? texto };
      case 'resgatarMarco':
        return {
          tipo: 'resgatarMarco',
          marco: Number(d.marco) === 2 ? 2 : 1,
          escolha: (d.escolha as EscolhaDeMarco) || 'folego',
        };
      case 'confirmarSinal':
        return { tipo: 'confirmarSinal', quem, resposta: texto };
      case 'ajudar':
        return { tipo: 'ajudar', quem, de: Number(d.de) };
      case 'valete':
      case 'virarFundo':
      case 'deitarDama':
      case 'aceitarDerrota':
      case 'enterrarEspiada':
        return { tipo: d.acao, quem };
      case 'mandarSinal': {
        const escolha = root.querySelector<HTMLSelectElement>(`[data-sinal-para="${quem}"]`)?.value;
        const para = escolha === undefined ? (quem + 1) % (state.partida?.pessoas.length ?? 1) : Number(escolha);
        return { tipo: 'mandarSinal', de: quem, para, texto };
      }
      default:
        return null;
    }
  }

  function bindPrint(): void {
    const mudar = (parcial: Partial<ConfigDeImpressao>): void => {
      state.impressao = { ...state.impressao, ...parcial };
      render();
    };
    const conjunto = root.querySelector<HTMLSelectElement>('#print-filter-select');
    conjunto?.addEventListener('change', () => mudar({ conjunto: (conjunto.value as PrintFilterMode) || 'mission' }));
    const tamanho = root.querySelector<HTMLSelectElement>('#print-tamanho-select');
    tamanho?.addEventListener('change', () => mudar({ tamanho: (tamanho.value as TamanhoDaCarta) || 'poker' }));
    const formato = root.querySelector<HTMLSelectElement>('#print-formato-select');
    formato?.addEventListener('change', () => mudar({ formato: (formato.value as FormatoDeImpressao) || 'a4' }));
    const escala = root.querySelector<HTMLSelectElement>('#print-escala-select');
    escala?.addEventListener('change', () => mudar({ escala: Number(escala.value) || 1 }));
    const codigo = root.querySelector<HTMLInputElement>('#print-codigo');
    codigo?.addEventListener('change', () => mudar({ codigo: codigo.checked }));
    const duplex = root.querySelector<HTMLInputElement>('#print-duplex');
    duplex?.addEventListener('change', () => mudar({ frenteEVerso: duplex.checked }));
    root.querySelectorAll<HTMLButtonElement>('[data-print-verso]').forEach((btn) => {
      btn.addEventListener('click', () => mudar({ verso: btn.dataset.printVerso as EstampaDoVerso }));
    });
    root.querySelector('#btn-trigger-print')?.addEventListener('click', () => window.print());
  }

  render();
}

if (typeof document !== 'undefined') {
  const appRoot = document.getElementById('app');
  if (appRoot) mountLimiarApp(appRoot);
}
