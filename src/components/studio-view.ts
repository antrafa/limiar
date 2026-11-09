import type { GameCard, ThemeDeck } from '../types/card';
import { escapeHtml, isFigure, renderMagicCardHtml } from './card-renderer';

export function filterStudioCards(deck: ThemeDeck, suitFilter: string): GameCard[] {
  if (!suitFilter || suitFilter === 'all') return deck.cards;
  if (suitFilter === 'figures') return deck.cards.filter(isFigure);
  return deck.cards.filter((c) => c.suit === suitFilter);
}

export function renderStudioGalleryHtml(
  deck: ThemeDeck,
  selectedCard: GameCard,
  suitFilter: string = 'all',
): string {
  const filteredCards = filterStudioCards(deck, suitFilter);
  const figure = isFigure(selectedCard);

  const filterPills: Array<{ id: string; label: string }> = [
    { id: 'all', label: 'Todas (54)' },
    { id: 'figures', label: 'Trio K/Q/J (12)' },
    { id: 'spades', label: '♠ Confronto' },
    { id: 'hearts', label: '♥ Vínculo' },
    { id: 'diamonds', label: '♦ Recurso' },
    { id: 'clubs', label: '♣ Mistério' },
    { id: 'joker', label: '★ 💀 Coringas' },
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

  const dynamicFieldsHtml = figure
    ? `<p class="muted">A regra do Rei, da Dama e do Valete é a mesma em todos os temas; aqui você muda só o nome e a ambientação.</p>`
    : `
      <p class="muted">Escreva para servir a qualquer pessoa, sozinha ou em grupo: sem falar de parceiro, dupla ou "vocês".</p>
      <div class="editor-field">
        <label for="edit-dailyIdea">Ideia (o que esta cena pode ser no dia)</label>
        <textarea id="edit-dailyIdea" name="dailyIdea" rows="2">${escapeHtml(selectedCard.dailyIdea ?? '')}</textarea>
      </div>
      <div class="editor-field">
        <label for="edit-topWatcherEvent">História (o Eco lê e liga à cena da vida real)</label>
        <textarea id="edit-topWatcherEvent" name="topWatcherEvent" rows="3">${escapeHtml(selectedCard.topWatcherEvent ?? '')}</textarea>
      </div>
      <div class="editor-field">
        <label for="edit-topWatcherTrigger">Sinal (o que pode aparecer no dia)</label>
        <textarea id="edit-topWatcherTrigger" name="topWatcherTrigger" rows="2">${escapeHtml(selectedCard.topWatcherTrigger ?? '')}</textarea>
      </div>
      <div class="editor-field">
        <label for="edit-bottomEchoPrompt">Gesto (pequeno, seguro e opcional)</label>
        <textarea id="edit-bottomEchoPrompt" name="bottomEchoPrompt" rows="2">${escapeHtml(selectedCard.bottomEchoPrompt ?? '')}</textarea>
      </div>
    `;

  return `
    <div class="studio-layout">
      <div class="studio-gallery-column">
        <section class="theme-banner">
          <div>
            <span class="eyebrow">${escapeHtml(deck.subtitle)}</span>
            <h2>${escapeHtml(deck.name)}</h2>
            <p class="lede">${escapeHtml(deck.tagline)} Clique numa carta para editar; clique de novo para ampliar.</p>
          </div>
          <div class="deck-io-actions">
            <button type="button" id="btn-export-json" class="btn-secondary">Exportar JSON</button>
            <button type="button" id="btn-import-json" class="btn-secondary">Importar JSON</button>
            <input type="file" id="input-import-json" accept="application/json" style="display: none;" />
            <button type="button" id="btn-reset-theme" class="btn-ghost">Restaurar padrão</button>
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
            <div>
              <h3>Editor de carta</h3>
              <span class="editor-card-code">${escapeHtml(selectedCard.playingCardCode)} · #${String(selectedCard.collectorNumber).padStart(2, '0')}</span>
            </div>
            <button type="button" class="btn-secondary btn-sm" data-zoom-card-id="${escapeHtml(selectedCard.id)}">
              Ampliar
            </button>
          </header>

          <div class="editor-preview-slot" id="editor-live-preview" data-zoom-card-id="${escapeHtml(selectedCard.id)}" title="Clique para ampliar a carta">
            ${renderMagicCardHtml(selectedCard, { interactive: true })}
          </div>

          <form id="card-editor-form" class="editor-form" data-editing-card-id="${escapeHtml(selectedCard.id)}">
            <div class="editor-field">
              <label for="edit-title">Título</label>
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

            <div class="editor-field">
              <label for="edit-artUrl">Arte / Ilustração (URL ou caminho opcional)</label>
              <input id="edit-artUrl" name="artUrl" type="text" placeholder="Ex.: ./limiar-banner.png ou https://..." value="${escapeHtml(selectedCard.artUrl ?? '')}" />
            </div>

            ${dynamicFieldsHtml}

            <div class="editor-field">
              <label for="edit-flavorText">Frase de ambientação</label>
              <input id="edit-flavorText" name="flavorText" type="text" value="${escapeHtml(selectedCard.flavorText)}" />
            </div>

            <div class="editor-actions">
              <button type="submit" id="btn-save-card" class="btn-primary">Salvar carta</button>
            </div>
          </form>
        </div>
      </aside>
    </div>
  `;
}
