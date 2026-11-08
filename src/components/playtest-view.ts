import { applyDailyCipher } from '../core/cipher';
import { splitPocketAndWorld } from '../data/engine-deck';
import type { PlaySessionState, Suit, ThemeDeck } from '../types/card';
import { escapeHtml, renderMagicCardHtml } from './card-renderer';

const PLAYABLE_SUITS: Array<Exclude<Suit, 'joker'>> = ['spades', 'hearts', 'diamonds', 'clubs'];

export function renderPlaytestTableHtml(deck: ThemeDeck, session: PlaySessionState): string {
  const { figures, worldDeck } = splitPocketAndWorld(deck);
  const cipher = applyDailyCipher(worldDeck, session.dateSeed);

  const suitFigures = figures.filter((c) => c.suit === session.chosenSuit);
  const kingCard = suitFigures.find((c) => c.rank === 'K') ?? figures[0];
  const queenCard = suitFigures.find((c) => c.rank === 'Q') ?? figures[1];
  const jackCard = suitFigures.find((c) => c.rank === 'J') ?? figures[2];

  const remainingCards = Math.max(0, session.bottomIndex - session.topIndex + 1);
  const isConverged = remainingCards === 0;

  const suitTabsHtml = PLAYABLE_SUITS.map((suit) => {
    const meta = deck.suits[suit];
    const activeClass = session.chosenSuit === suit ? 'is-active' : '';
    return `
      <button
        type="button"
        class="suit-choice-btn ${activeClass}"
        data-choose-suit="${suit}"
      >
        <span class="suit-symbol">${escapeHtml(meta.symbol)}</span>
        <span>${escapeHtml(meta.namePt)} · ${escapeHtml(meta.vocationName)}</span>
      </button>
    `;
  }).join('');

  const latestItem = session.history[0];
  const secondItem = session.history[1];

  let spotlightHtml = `
    <div class="spotlight-empty">
      <p>O Deck do Mundo de <strong>42 cartas</strong> está embaralhado pela Cifra do Dia (<strong>${escapeHtml(cipher.dateLabel)}</strong>).</p>
      <p>Clique em <strong>Sacar do TOPO (☀ Vigia)</strong> ou <strong>Sacar do FUNDO (☾ Eco)</strong> para iniciar o turno.</p>
    </div>
  `;

  if (latestItem) {
    const isPairedTurn =
      secondItem && secondItem.turn === latestItem.turn && secondItem.role !== latestItem.role;

    if (isPairedTurn) {
      const vigiaEntry = latestItem.role === 'vigia' ? latestItem : secondItem;
      const ecoEntry = latestItem.role === 'eco' ? latestItem : secondItem;
      spotlightHtml = `
        <div class="spotlight-duo">
          <div class="spotlight-slot">
            <span class="spotlight-badge badge-vigia">☀ TOPO · O VIGIA (Turno #${vigiaEntry.turn})</span>
            ${renderMagicCardHtml(vigiaEntry.card, { interactive: true, highlightRole: 'vigia' })}
          </div>
          <div class="spotlight-slot">
            <span class="spotlight-badge badge-eco">☾ FUNDO · O ECO (Turno #${ecoEntry.turn})</span>
            ${renderMagicCardHtml(ecoEntry.card, { interactive: true, highlightRole: 'eco' })}
          </div>
        </div>
      `;
    } else {
      const roleLabel =
        latestItem.role === 'vigia'
          ? '☀ TOPO · O VIGIA (Evento do Mundo)'
          : '☾ FUNDO · O ECO (Reação & Resolução)';
      const badgeClass = latestItem.role === 'vigia' ? 'badge-vigia' : 'badge-eco';
      spotlightHtml = `
        <div class="spotlight-single">
          <div class="spotlight-slot">
            <span class="spotlight-badge ${badgeClass}">${roleLabel} · Turno #${latestItem.turn}</span>
            ${renderMagicCardHtml(latestItem.card, { interactive: true, highlightRole: latestItem.role })}
          </div>
        </div>
      `;
    }
  }

  const historyListHtml =
    session.history.length === 0
      ? `<p class="muted-note">Nenhuma carta sacada ainda nesta sessão.</p>`
      : `
        <ul class="turn-history-list">
          ${session.history
            .map(
              (item) => `
              <li class="history-item role-${item.role}">
                <span class="history-turn">#${item.turn}</span>
                <span class="history-role">${item.role === 'vigia' ? '☀ Topo (Vigia)' : '☾ Fundo (Eco)'}</span>
                <strong class="history-card">${escapeHtml(item.card.playingCardCode)} — ${escapeHtml(item.card.title)}</strong>
                <span class="history-detail">
                  ${escapeHtml(
                    item.role === 'vigia'
                      ? `${item.card.topWatcherTrigger ?? ''} → ${item.card.topWatcherEvent ?? ''}`
                      : `${item.card.bottomEchoPrompt ?? ''} → ${item.card.bottomEchoEffect ?? ''}`,
                  )}
                </span>
              </li>
            `,
            )
            .join('')}
        </ul>
      `;

  return `
    <div class="playtest-container">
      <!-- 1. Cifra do Dia -->
      <section class="cipher-panel">
        <div class="cipher-header">
          <div>
            <h2>🔐 Cifra do Dia — Sincronia Determinística (${escapeHtml(cipher.dateLabel)})</h2>
            <p class="subtitle">Ambos os jogadores aplicam a mesma data para gerar exatamente a mesma pilha de 42 cartas sem precisar estar no mesmo lugar.</p>
          </div>
          <div class="cipher-seed-controls">
            <label for="input-cipher-date">Data / Semente (AAAA-MM-DD ou DD/MM):</label>
            <div class="seed-input-row">
              <input
                id="input-cipher-date"
                type="text"
                value="${escapeHtml(session.dateSeed)}"
                placeholder="2026-11-06"
              />
              <button type="button" id="btn-apply-cipher" class="btn-primary">Aplicar Cifra</button>
            </div>
          </div>
        </div>

        <ol class="cipher-steps-list">
          ${cipher.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}
        </ol>
      </section>

      <!-- 2. Seu Trio de Bolso (K, Q, J) -->
      <section class="pocket-trio-panel">
        <header class="pocket-header">
          <div>
            <h3>👑 Seu Trio de Bolso (K, Q, J — Regras Revisadas v1.1)</h3>
            <p class="subtitle">
              <strong>Rei (K):</strong> Convite narrativo (não obrigatório) + Sinergia de naipe ·
              <strong>Dama (Q ⟳):</strong> Proteção individual (recarrega ao cumprir qualquer carta de ♦ Ouros A–10) ·
              <strong>Valete (J):</strong> Revelado em falha grave sem Dama pronta (Tabu vale somente dentro do jogo; nova falha com Valete ativo e Dama esgotada gera <strong>Colapso</strong>).
            </p>
          </div>
          <div class="suit-selector-bar">
            ${suitTabsHtml}
          </div>
        </header>

        <div class="pocket-trio-grid">
          <div class="pocket-slot">
            <div class="pocket-slot-bar">
              <span class="pocket-role-tag">REI (K) · ARQUÉTIPO ATIVO</span>
              <span class="status-pill status-ready">Sempre Ativo</span>
            </div>
            ${renderMagicCardHtml(kingCard, { interactive: true })}
          </div>

          <div class="pocket-slot">
            <div class="pocket-slot-bar">
              <span class="pocket-role-tag">DAMA (Q) · TRUNFO VIRÁVEL</span>
              <button type="button" id="btn-toggle-queen" class="btn-secondary btn-sm">
                ${session.queenTapped ? '↺ Desvirar Dama (Untap)' : '⟳ Virar Dama (Tap 90°)'}
              </button>
            </div>
            <div class="queen-card-holder">
              ${renderMagicCardHtml(queenCard, { interactive: true, tapped: session.queenTapped })}
            </div>
          </div>

          <div class="pocket-slot ${session.jackActive ? 'scar-active' : 'scar-hidden'}">
            <div class="pocket-slot-bar">
              <span class="pocket-role-tag">VALETE (J) · CICATRIZ & TABU</span>
              <button type="button" id="btn-toggle-jack" class="btn-secondary btn-sm">
                ${session.jackActive ? '🙈 Ocultar Cicatriz (Curar)' : '🩸 Revelar Cicatriz (Tabu Ativo)'}
              </button>
            </div>
            <div class="jack-card-holder">
              ${renderMagicCardHtml(jackCard, { interactive: true, selected: session.jackActive })}
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Mesa Sincronizada: Deck do Mundo (42 Cartas) -->
      <section class="world-table-panel">
        <div class="world-controls-column">
          <div class="deck-status-box">
            <h3>🌍 Deck do Mundo (42 Cartas)</h3>
            <div class="deck-meters">
              <div class="meter-item">
                <span class="meter-label">Cartas Restantes</span>
                <strong class="meter-value">${remainingCards} / 42</strong>
              </div>
              <div class="meter-item">
                <span class="meter-label">Índice ☀ Topo</span>
                <strong class="meter-value">#${session.topIndex + 1}</strong>
              </div>
              <div class="meter-item">
                <span class="meter-label">Índice ☾ Fundo</span>
                <strong class="meter-value">#${session.bottomIndex + 1}</strong>
              </div>
            </div>

            ${
              isConverged
                ? `<div class="convergence-alert">⚡ <strong>O Encontro na Metade!</strong> Os índices de Topo e Fundo se cruzaram. A jornada atingiu seu clímax final!</div>`
                : ''
            }

            <div class="draw-buttons-stack">
              <button
                type="button"
                id="btn-draw-top"
                class="btn-draw btn-draw-vigia"
                ${isConverged ? 'disabled' : ''}
              >
                Sacar do TOPO (☀ Vigia)
              </button>
              <button
                type="button"
                id="btn-draw-bottom"
                class="btn-draw btn-draw-eco"
                ${isConverged ? 'disabled' : ''}
              >
                Sacar do FUNDO (☾ Eco)
              </button>
              <button
                type="button"
                id="btn-draw-solo"
                class="btn-secondary"
                ${remainingCards < 2 ? 'disabled' : ''}
              >
                🎭 Modo Solo (Sacar Topo + Fundo)
              </button>
              <button type="button" id="btn-reset-session" class="btn-ghost">
                ↺ Reiniciar Partida
              </button>
            </div>
          </div>
        </div>

        <div class="world-spotlight-column">
          <h3>Carta(s) em Foco na Mesa</h3>
          ${spotlightHtml}
          <div class="v11-table-cheat-sheet">
            <strong>⚖️ Lembrete Rápido (Edição Revisada 1.1):</strong>
            <ul>
              <li><strong>Prazo do Gatilho (☀ Vigia):</strong> Até <strong>2 horas</strong>. Se não acontecer, escolha um <em>gatilho substituto simples e seguro</em> ou <em>adie a carta sem penalidade</em>.</li>
              <li><strong>Ficção em 1º lugar (☾ Eco):</strong> Toda ação física (foto, áudio, toque, deslocamento) é opcional e pode ser substituída por uma descrição ou escolha narrada. Qualquer jogador pode dizer <em>"pausa"</em> ou <em>"passo"</em> sem punição.</li>
              <li><strong>Ordem de Prioridade (7 Passos):</strong> 1. Segurança e limites reais → 2. Ação do Eco → 3. Efeito específico da carta → 4. Sinergia do Rei (K) → 5. Dama (Q ⟳) → 6. Consequência → 7. Valete (J) e Colapso.</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 4. Histórico de Turnos -->
      <section class="history-panel">
        <h3>📜 Diário de Sincronia (${session.history.length} saques registrados)</h3>
        ${historyListHtml}
      </section>
    </div>
  `;
}
