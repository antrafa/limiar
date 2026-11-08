import './styles/main.css';
import './styles/card-magic.css';
import './styles/print.css';

import { renderCardModalContentHtml, renderMagicCardHtml } from './components/card-renderer';
import { renderOracleGuideHtml } from './components/oracle-view';
import { renderPlaytestTableHtml } from './components/playtest-view';
import { type PrintFilterMode, renderPrintSheetsHtml } from './components/print-view';
import { renderQuickstartGuideHtml } from './components/quickstart-view';
import { renderStudioGalleryHtml } from './components/studio-view';
import { generateShuffledOrder, resolveWorldDeckOrder } from './core/cipher';
import {
  exportThemeJson,
  getDefaultPlaySession,
  importThemeJson,
  loadPlaySession,
  loadThemeWithOverrides,
  resetThemeOverrides,
  saveCardOverride,
  savePlaySession,
} from './core/storage';
import { splitPocketAndWorld } from './data/engine-deck';
import { ALL_THEME_IDS, THEMES } from './data/index';
import type { GameCard, PlaySessionState, Suit, ThemeId } from './types/card';

export type StudioTab = 'quickstart' | 'studio' | 'playtest' | 'print' | 'oracle';

interface AppState {
  activeTab: StudioTab;
  activeThemeId: ThemeId;
  suitFilter: string;
  printFilter: PrintFilterMode;
  selectedCardId: string;
  session: PlaySessionState;
  toastMessage: string | null;
}

export function mountSinaleiroApp(root: HTMLElement): void {
  const initialSession = loadPlaySession();
  const initialThemeId: ThemeId = ALL_THEME_IDS.includes(initialSession.themeId)
    ? initialSession.themeId
    : 'zombies';
  const initialDeck = loadThemeWithOverrides(initialThemeId);

  const state: AppState = {
    activeTab: 'quickstart',
    activeThemeId: initialThemeId,
    suitFilter: 'all',
    printFilter: 'all',
    selectedCardId: initialDeck.cards[0].id,
    session: { ...initialSession, themeId: initialThemeId },
    toastMessage: null,
  };

  function showToast(msg: string): void {
    state.toastMessage = msg;
    render();
    setTimeout(() => {
      if (state.toastMessage === msg) {
        state.toastMessage = null;
        const banner = root.querySelector('.toast-banner');
        if (banner) banner.remove();
      }
    }, 2600);
  }

  function getSelectedCard(cards: GameCard[]): GameCard {
    return cards.find((c) => c.id === state.selectedCardId) ?? cards[0];
  }

  function buildEditedCardFromForm(form: HTMLFormElement, baseCard: GameCard): GameCard {
    const formData = new FormData(form);
    const updated: GameCard = {
      ...baseCard,
      title: String(formData.get('title') ?? baseCard.title),
      artGlyph: String(formData.get('artGlyph') ?? baseCard.artGlyph),
      artSubtitle: String(formData.get('artSubtitle') ?? baseCard.artSubtitle),
      flavorText: String(formData.get('flavorText') ?? baseCard.flavorText),
    };

    const isFigure =
      baseCard.kind === 'archetype_king' ||
      baseCard.kind === 'trump_queen' ||
      baseCard.kind === 'scar_jack';

    if (isFigure) {
      updated.figurePassiveOrRule = String(
        formData.get('figurePassiveOrRule') ?? baseCard.figurePassiveOrRule ?? '',
      );
      updated.figureSpecialOrTaboo = String(
        formData.get('figureSpecialOrTaboo') ?? baseCard.figureSpecialOrTaboo ?? '',
      );
    } else {
      updated.topWatcherTrigger = String(
        formData.get('topWatcherTrigger') ?? baseCard.topWatcherTrigger ?? '',
      );
      updated.topWatcherEvent = String(
        formData.get('topWatcherEvent') ?? baseCard.topWatcherEvent ?? '',
      );
      updated.bottomEchoPrompt = String(
        formData.get('bottomEchoPrompt') ?? baseCard.bottomEchoPrompt ?? '',
      );
      updated.bottomEchoEffect = String(
        formData.get('bottomEchoEffect') ?? baseCard.bottomEchoEffect ?? '',
      );
    }

    return updated;
  }

  function render(): void {
    const deck = loadThemeWithOverrides(state.activeThemeId);
    const selectedCard = getSelectedCard(deck.cards);
    state.selectedCardId = selectedCard.id;

    const themeButtonsHtml = ALL_THEME_IDS.map((tId) => {
      const tMeta = THEMES[tId];
      const activeClass = state.activeThemeId === tId ? 'is-active' : '';
      return `
        <button
          type="button"
          class="theme-pill-btn ${activeClass}"
          data-switch-theme="${tId}"
        >
          ${tMeta.name}
        </button>
      `;
    }).join('');

    let tabBodyHtml = '';
    if (state.activeTab === 'quickstart') {
      tabBodyHtml = renderQuickstartGuideHtml(deck);
    } else if (state.activeTab === 'studio') {
      tabBodyHtml = renderStudioGalleryHtml(deck, selectedCard, state.suitFilter);
    } else if (state.activeTab === 'playtest') {
      tabBodyHtml = renderPlaytestTableHtml(deck, state.session);
    } else if (state.activeTab === 'print') {
      tabBodyHtml = renderPrintSheetsHtml(deck, state.printFilter);
    } else {
      tabBodyHtml = renderOracleGuideHtml(deck);
    }

    root.innerHTML = `
      <div class="app-shell">
        <header class="studio-topbar no-print">
          <div class="brand-block">
            <div class="brand-emblem" aria-hidden="true">♠</div>
            <div>
              <h1 class="brand-title">Limiar</h1>
              <div class="brand-subtitle">O Jogo que Ultrapassa a Mesa · RPG na Vida Real · 54 Cartas (63×88mm)</div>
            </div>
          </div>

          <div class="theme-switcher-group">
            <span class="theme-switcher-label">Tema:</span>
            ${themeButtonsHtml}
          </div>
        </header>

        <nav class="studio-tabs-nav no-print" aria-label="Módulos do Estúdio">
          <button type="button" class="tab-nav-btn ${state.activeTab === 'quickstart' ? 'is-active' : ''}" data-tab="quickstart">
            Como Começar
          </button>
          <button type="button" class="tab-nav-btn ${state.activeTab === 'playtest' ? 'is-active' : ''}" data-tab="playtest">
            Mesa de Jogo
          </button>
          <button type="button" class="tab-nav-btn ${state.activeTab === 'studio' ? 'is-active' : ''}" data-tab="studio">
            Galeria &amp; Editor (54 Cartas)
          </button>
          <button type="button" class="tab-nav-btn ${state.activeTab === 'oracle' ? 'is-active' : ''}" data-tab="oracle">
            Guia de Oráculo
          </button>
          <button type="button" class="tab-nav-btn ${state.activeTab === 'print' ? 'is-active' : ''}" data-tab="print">
            Print &amp; Play A4
          </button>
        </nav>

        <main class="studio-main-content">
          ${tabBodyHtml}
        </main>

        <dialog id="card-zoom-dialog" class="card-zoom-dialog no-print" closedby="any" aria-labelledby="zoom-dialog-title"></dialog>

        ${state.toastMessage ? `<div class="toast-banner no-print">${state.toastMessage}</div>` : ''}
      </div>
    `;

    bindEvents(deck, selectedCard);
  }

  function openCardZoomModal(card: GameCard): void {
    const dialog = root.querySelector<HTMLDialogElement>('#card-zoom-dialog');
    if (!dialog) return;
    dialog.innerHTML = renderCardModalContentHtml(card);
    if (typeof dialog.showModal === 'function' && !dialog.open) {
      dialog.showModal();
    }
  }

  function bindEvents(deck: ReturnType<typeof loadThemeWithOverrides>, selectedCard: GameCard): void {
    // 1. Theme Switcher
    root.querySelectorAll<HTMLButtonElement>('[data-switch-theme]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const nextTheme = btn.dataset.switchTheme as ThemeId;
        if (!nextTheme || nextTheme === state.activeThemeId) return;
        state.activeThemeId = nextTheme;
        const nextDeck = loadThemeWithOverrides(nextTheme);
        state.selectedCardId = nextDeck.cards[0].id;
        state.session = {
          ...getDefaultPlaySession(nextTheme),
          dateSeed: state.session.dateSeed,
        };
        savePlaySession(state.session);
        render();
      });
    });

    // 2. Navigation Tabs & Quickstart CTA shortcuts
    root.querySelectorAll<HTMLButtonElement>('[data-tab], [data-goto-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = (btn.dataset.tab ?? btn.dataset.gotoTab) as StudioTab;
        if (!tab) return;
        state.activeTab = tab;
        render();
      });
    });

    // 2b. Modal Zoom Dialog fallback for browsers without native closedby="any" & explicit zoom triggers
    const zoomDialog = root.querySelector<HTMLDialogElement>('#card-zoom-dialog');
    if (
      zoomDialog &&
      typeof HTMLDialogElement !== 'undefined' &&
      !('closedBy' in HTMLDialogElement.prototype)
    ) {
      const isOutsideDialog = (e: PointerEvent, dlg: HTMLDialogElement): boolean => {
        const r = dlg.getBoundingClientRect();
        return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
      };
      let pressedOutside = false;
      zoomDialog.addEventListener('pointerdown', (e) => {
        pressedOutside = isOutsideDialog(e, zoomDialog);
      });
      zoomDialog.addEventListener('pointerup', (e) => {
        if (pressedOutside && isOutsideDialog(e, zoomDialog)) {
          zoomDialog.close();
        }
      });
    }

    root.querySelectorAll<HTMLElement>('[data-zoom-card-id]').forEach((el) => {
      el.addEventListener('click', () => {
        const cardId = el.dataset.zoomCardId;
        const found = deck.cards.find((c) => c.id === cardId);
        if (found) openCardZoomModal(found);
      });
    });

    if (state.activeTab === 'quickstart' || state.activeTab === 'playtest') {
      root.querySelectorAll<HTMLElement>('.mtg-card[data-card-id]').forEach((cardEl) => {
        cardEl.addEventListener('click', () => {
          const cardId = cardEl.dataset.cardId;
          const found = deck.cards.find((c) => c.id === cardId);
          if (found) openCardZoomModal(found);
        });
      });
    }

    // 3. Studio Gallery Events
    if (state.activeTab === 'studio') {
      root.querySelectorAll<HTMLButtonElement>('[data-suit-filter]').forEach((pill) => {
        pill.addEventListener('click', () => {
          state.suitFilter = pill.dataset.suitFilter ?? 'all';
          render();
        });
      });

      root
        .querySelectorAll<HTMLElement>('.cards-gallery-grid .mtg-card[data-card-id]')
        .forEach((cardEl) => {
          cardEl.addEventListener('click', () => {
            const cardId = cardEl.dataset.cardId;
            if (!cardId) return;
            if (cardId === state.selectedCardId) {
              const found = deck.cards.find((c) => c.id === cardId);
              if (found) openCardZoomModal(found);
            } else {
              state.selectedCardId = cardId;
              render();
            }
          });
        });

      const form = root.querySelector<HTMLFormElement>('#card-editor-form');
      const livePreview = root.querySelector<HTMLElement>('#editor-live-preview');

      if (form && livePreview) {
        form.addEventListener('input', () => {
          const previewCard = buildEditedCardFromForm(form, selectedCard);
          livePreview.innerHTML = renderMagicCardHtml(previewCard);
        });

        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const updatedCard = buildEditedCardFromForm(form, selectedCard);
          saveCardOverride(updatedCard);
          showToast(`Carta "${updatedCard.title}" salva no navegador!`);
        });
      }

      const btnResetTheme = root.querySelector<HTMLButtonElement>('#btn-reset-theme');
      btnResetTheme?.addEventListener('click', () => {
        resetThemeOverrides(state.activeThemeId);
        showToast('Baralho restaurado para o padrão original.');
      });

      const btnExportJson = root.querySelector<HTMLButtonElement>('#btn-export-json');
      btnExportJson?.addEventListener('click', () => {
        const json = exportThemeJson(deck);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sinaleiro-${deck.id}-54cartas.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Arquivo JSON exportado!');
      });

      const btnImportJson = root.querySelector<HTMLButtonElement>('#btn-import-json');
      const inputImportJson = root.querySelector<HTMLInputElement>('#input-import-json');
      btnImportJson?.addEventListener('click', () => inputImportJson?.click());
      inputImportJson?.addEventListener('change', async () => {
        const file = inputImportJson.files?.[0];
        if (!file) return;
        try {
          const text = await file.text();
          const imported = importThemeJson(text);
          if (ALL_THEME_IDS.includes(imported.id)) {
            state.activeThemeId = imported.id;
          }
          showToast(`Baralho "${imported.name}" importado com sucesso!`);
        } catch (err) {
          showToast(err instanceof Error ? err.message : 'Erro ao importar JSON');
        }
      });
    }

    // 4. Playtest Table Events
    if (state.activeTab === 'playtest') {
      const { worldDeck } = splitPocketAndWorld(deck);
      const activeWorldCards = resolveWorldDeckOrder(worldDeck, state.session.deckOrder);

      const btnShuffleDeck = root.querySelector<HTMLButtonElement>('#btn-shuffle-deck');
      btnShuffleDeck?.addEventListener('click', () => {
        state.session = {
          ...state.session,
          deckOrder: generateShuffledOrder(worldDeck.length),
          topIndex: 0,
          bottomIndex: worldDeck.length - 1,
          turnCount: 0,
          history: [],
        };
        savePlaySession(state.session);
        showToast('Baralho de 42 cartas embaralhado livremente!');
      });

      root.querySelectorAll<HTMLButtonElement>('[data-choose-suit]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const suit = btn.dataset.chooseSuit as Exclude<Suit, 'joker'>;
          if (!suit) return;
          state.session = { ...state.session, chosenSuit: suit };
          savePlaySession(state.session);
          render();
        });
      });

      const btnToggleQueen = root.querySelector<HTMLButtonElement>('#btn-toggle-queen');
      btnToggleQueen?.addEventListener('click', () => {
        state.session = { ...state.session, queenTapped: !state.session.queenTapped };
        savePlaySession(state.session);
        render();
      });

      const btnToggleJack = root.querySelector<HTMLButtonElement>('#btn-toggle-jack');
      btnToggleJack?.addEventListener('click', () => {
        state.session = { ...state.session, jackActive: !state.session.jackActive };
        savePlaySession(state.session);
        render();
      });

      const btnDrawTop = root.querySelector<HTMLButtonElement>('#btn-draw-top');
      btnDrawTop?.addEventListener('click', () => {
        if (state.session.topIndex > state.session.bottomIndex) return;
        const card = activeWorldCards[state.session.topIndex];
        const nextTurn = state.session.turnCount + 1;
        state.session = {
          ...state.session,
          topIndex: state.session.topIndex + 1,
          turnCount: nextTurn,
          history: [
            {
              turn: nextTurn,
              role: 'vigia',
              card,
              timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            },
            ...state.session.history,
          ],
        };
        savePlaySession(state.session);
        render();
      });

      const btnDrawBottom = root.querySelector<HTMLButtonElement>('#btn-draw-bottom');
      btnDrawBottom?.addEventListener('click', () => {
        if (state.session.topIndex > state.session.bottomIndex) return;
        const card = activeWorldCards[state.session.bottomIndex];
        const nextTurn = state.session.turnCount + 1;
        state.session = {
          ...state.session,
          bottomIndex: state.session.bottomIndex - 1,
          turnCount: nextTurn,
          history: [
            {
              turn: nextTurn,
              role: 'eco',
              card,
              timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            },
            ...state.session.history,
          ],
        };
        savePlaySession(state.session);
        render();
      });

      const btnDrawSolo = root.querySelector<HTMLButtonElement>('#btn-draw-solo');
      btnDrawSolo?.addEventListener('click', () => {
        if (state.session.bottomIndex - state.session.topIndex + 1 < 2) return;
        const topCard = activeWorldCards[state.session.topIndex];
        const bottomCard = activeWorldCards[state.session.bottomIndex];
        const nextTurn = state.session.turnCount + 1;
        const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        state.session = {
          ...state.session,
          topIndex: state.session.topIndex + 1,
          bottomIndex: state.session.bottomIndex - 1,
          turnCount: nextTurn,
          history: [
            { turn: nextTurn, role: 'eco', card: bottomCard, timestamp: now },
            { turn: nextTurn, role: 'vigia', card: topCard, timestamp: now },
            ...state.session.history,
          ],
        };
        savePlaySession(state.session);
        render();
      });

      const btnResetSession = root.querySelector<HTMLButtonElement>('#btn-reset-session');
      btnResetSession?.addEventListener('click', () => {
        state.session = {
          ...state.session,
          deckOrder: generateShuffledOrder(worldDeck.length),
          topIndex: 0,
          bottomIndex: 41,
          turnCount: 0,
          queenTapped: false,
          jackActive: false,
          history: [],
        };
        savePlaySession(state.session);
        showToast('Mesa reiniciada e maço reembaralhado!');
      });
    }

    // 5. Print & Play Events
    if (state.activeTab === 'print') {
      const printSelect = root.querySelector<HTMLSelectElement>('#print-filter-select');
      printSelect?.addEventListener('change', () => {
        state.printFilter = (printSelect.value as PrintFilterMode) || 'all';
        render();
      });

      const btnPrint = root.querySelector<HTMLButtonElement>('#btn-trigger-print');
      btnPrint?.addEventListener('click', () => {
        window.print();
      });
    }
  }

  render();
}

if (typeof document !== 'undefined') {
  const appRoot = document.getElementById('app');
  if (appRoot) {
    mountSinaleiroApp(appRoot);
  }
}
