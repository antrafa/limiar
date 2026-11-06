import type { GameCard, ThemeDeck } from '../types/card';
import { escapeHtml, renderMagicCardHtml } from './card-renderer';

export function filterStudioCards(deck: ThemeDeck, suitFilter: string): GameCard[] {
  if (!suitFilter || suitFilter === 'all') return deck.cards;
  if (suitFilter === 'figures') {
    return deck.cards.filter(
      (c) => c.kind === 'archetype_king' || c.kind === 'trump_queen' || c.kind === 'scar_jack',
    );
  }
  return deck.cards.filter((c) => c.suit === suitFilter);
}

export function renderStudioGalleryHtml(
  deck: ThemeDeck,
  selectedCard: GameCard,
  suitFilter: string = 'all',
): string {
  const filteredCards = filterStudioCards(deck, suitFilter);
  const isFigure =
    selectedCard.kind === 'archetype_king' ||
    selectedCard.kind === 'trump_queen' ||
    selectedCard.kind === 'scar_jack';

  const filterPills: Array<{ id: string; label: string }> = [
    { id: 'all', label: 'Todas (54)' },
    { id: 'figures', label: '👑 Trio de Bolso K/Q/J (12)' },
    { id: 'spades', label: `♠ Espadas · ${deck.suits.spades.vocationName}` },
    { id: 'hearts', label: `♥ Copas · ${deck.suits.hearts.vocationName}` },
    { id: 'diamonds', label: `♦ Ouros · ${deck.suits.diamonds.vocationName}` },
    { id: 'clubs', label: `♣ Paus · ${deck.suits.clubs.vocationName}` },
    { id: 'joker', label: '★/💀 Coringas (2)' },
  ];

  const filterHtml = filterPills
    .map(
      (pill) => `
      <button
        type="button"
        class="filter-pill ${suitFilter === pill.id ? 'is-active' : ''}"
        data-suit-filter="${escapeHtml(pill.id)}"
      >
        ${escapeHtml(pill.label)}
      </button>
    `,
    )
    .join('');

  const cardsGridHtml = filteredCards
    .map((card) =>
      renderMagicCardHtml(card, {
        interactive: true,
        selected: card.id === selectedCard.id,
      }),
    )
    .join('');

  const dynamicFieldsHtml = isFigure
    ? `
      <div class="editor-field">
        <label for="edit-figurePassiveOrRule">Passiva / Efeito Virar (⟳) / Gatilho</label>
        <textarea id="edit-figurePassiveOrRule" name="figurePassiveOrRule" rows="3">${escapeHtml(selectedCard.figurePassiveOrRule ?? '')}</textarea>
      </div>
      <div class="editor-field">
        <label for="edit-figureSpecialOrTaboo">Sinergia / Recarga / Tabu na Vida Real</label>
        <textarea id="edit-figureSpecialOrTaboo" name="figureSpecialOrTaboo" rows="3">${escapeHtml(selectedCard.figureSpecialOrTaboo ?? '')}</textarea>
      </div>
    `
    : `
      <div class="editor-field">
        <label for="edit-topWatcherTrigger">☀ Topo (Vigia) — Gatilho Real</label>
        <input id="edit-topWatcherTrigger" name="topWatcherTrigger" type="text" value="${escapeHtml(selectedCard.topWatcherTrigger ?? '')}" />
      </div>
      <div class="editor-field">
        <label for="edit-topWatcherEvent">☀ Topo (Vigia) — Evento Ficcional</label>
        <textarea id="edit-topWatcherEvent" name="topWatcherEvent" rows="2">${escapeHtml(selectedCard.topWatcherEvent ?? '')}</textarea>
      </div>
      <div class="editor-field">
        <label for="edit-bottomEchoPrompt">☾ Fundo (Eco) — Interação Real</label>
        <input id="edit-bottomEchoPrompt" name="bottomEchoPrompt" type="text" value="${escapeHtml(selectedCard.bottomEchoPrompt ?? '')}" />
      </div>
      <div class="editor-field">
        <label for="edit-bottomEchoEffect">☾ Fundo (Eco) — Resolução Mecânica</label>
        <textarea id="edit-bottomEchoEffect" name="bottomEchoEffect" rows="2">${escapeHtml(selectedCard.bottomEchoEffect ?? '')}</textarea>
      </div>
    `;

  return `
    <div class="studio-layout">
      <div class="studio-gallery-column">
        <section class="theme-banner">
          <div>
            <h2>${escapeHtml(deck.name)} <span class="badge-pill">${escapeHtml(deck.subtitle)}</span></h2>
            <p class="subtitle">${escapeHtml(deck.tagline)}</p>
          </div>
          <div class="deck-io-actions">
            <button type="button" id="btn-export-json" class="btn-secondary">⬇ Exportar Deck (.json)</button>
            <button type="button" id="btn-import-json" class="btn-secondary">⬆ Importar JSON</button>
            <input type="file" id="input-import-json" accept="application/json" style="display: none;" />
            <button type="button" id="btn-reset-theme" class="btn-ghost">↺ Restaurar Padrão</button>
          </div>
        </section>

        <nav class="studio-filter-bar" aria-label="Filtros do Baralho">
          ${filterHtml}
        </nav>

        <div class="cards-gallery-grid">
          ${cardsGridHtml}
        </div>
      </div>

      <aside class="studio-editor-sidebar">
        <div class="editor-panel">
          <header class="editor-header">
            <h3>Editor de Carta (63×88mm)</h3>
            <span class="editor-card-code">${escapeHtml(selectedCard.playingCardCode)} · #${String(selectedCard.collectorNumber).padStart(2, '0')}</span>
          </header>

          <div class="editor-preview-slot" id="editor-live-preview">
            ${renderMagicCardHtml(selectedCard)}
          </div>

          <form id="card-editor-form" class="editor-form" data-editing-card-id="${escapeHtml(selectedCard.id)}">
            <div class="editor-field">
              <label for="edit-title">Título da Carta</label>
              <input id="edit-title" name="title" type="text" value="${escapeHtml(selectedCard.title)}" required />
            </div>

            <div class="editor-row-2">
              <div class="editor-field">
                <label for="edit-artGlyph">Ícone / Glifo</label>
                <input id="edit-artGlyph" name="artGlyph" type="text" value="${escapeHtml(selectedCard.artGlyph)}" />
              </div>
              <div class="editor-field">
                <label for="edit-artSubtitle">Legenda da Arte</label>
                <input id="edit-artSubtitle" name="artSubtitle" type="text" value="${escapeHtml(selectedCard.artSubtitle)}" />
              </div>
            </div>

            ${dynamicFieldsHtml}

            <div class="editor-field">
              <label for="edit-flavorText">Texto de Sabor (Flavor Text)</label>
              <input id="edit-flavorText" name="flavorText" type="text" value="${escapeHtml(selectedCard.flavorText)}" />
            </div>

            <div class="editor-actions">
              <button type="submit" id="btn-save-card" class="btn-primary">💾 Salvar Carta no Estúdio</button>
            </div>
          </form>
        </div>
      </aside>
    </div>
  `;
}
