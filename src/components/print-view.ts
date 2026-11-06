import type { GameCard, ThemeDeck } from '../types/card';
import { escapeHtml, renderMagicCardHtml } from './card-renderer';

export type PrintFilterMode = 'all' | 'figures' | 'spades' | 'hearts' | 'diamonds' | 'clubs';

export function filterCardsForPrint(deck: ThemeDeck, filterMode: PrintFilterMode): GameCard[] {
  if (filterMode === 'all') return deck.cards;
  if (filterMode === 'figures') {
    return deck.cards.filter(
      (c) => c.kind === 'archetype_king' || c.kind === 'trump_queen' || c.kind === 'scar_jack',
    );
  }
  return deck.cards.filter((c) => c.suit === filterMode);
}

export function renderPrintSheetsHtml(deck: ThemeDeck, filterMode: PrintFilterMode = 'all'): string {
  const selected = filterCardsForPrint(deck, filterMode);
  const pages: GameCard[][] = [];

  for (let i = 0; i < selected.length; i += 9) {
    pages.push(selected.slice(i, i + 9));
  }

  const sheetsHtml = pages
    .map(
      (pageCards, pageIndex) => `
      <section class="print-a4-sheet">
        <header class="print-sheet-header">
          <span><strong>${escapeHtml(deck.name)}</strong> — Folha ${pageIndex + 1} de ${pages.length}</span>
          <span>Formato Oficial Magic / Poker: <strong>63mm × 88mm</strong> (Escala 100% / Sem margens)</span>
        </header>
        <div class="print-grid-3x3">
          ${pageCards.map((c) => `<div class="print-slot">${renderMagicCardHtml(c)}</div>`).join('')}
        </div>
      </section>
    `,
    )
    .join('');

  return `
    <div class="print-studio-wrapper">
      <div class="print-controls no-print">
        <div>
          <h2>Folhas Print & Play A4 (63×88mm · Grid 3×3)</h2>
          <p class="subtitle">Imprima em folha A4 com escala 100% e coloque na frente de uma carta comum dentro de um sleeve padrão de Magic.</p>
        </div>
        <div class="print-actions">
          <select id="print-filter-select" class="studio-select">
            <option value="all" ${filterMode === 'all' ? 'selected' : ''}>Baralho Completo (54 cartas · 6 páginas)</option>
            <option value="figures" ${filterMode === 'figures' ? 'selected' : ''}>Apenas Trio de Personagem K/Q/J (12 cartas · 2 páginas)</option>
            <option value="spades" ${filterMode === 'spades' ? 'selected' : ''}>Naipe ♠ Espadas (13 cartas)</option>
            <option value="hearts" ${filterMode === 'hearts' ? 'selected' : ''}>Naipe ♥ Copas (13 cartas)</option>
            <option value="diamonds" ${filterMode === 'diamonds' ? 'selected' : ''}>Naipe ♦ Ouros (13 cartas)</option>
            <option value="clubs" ${filterMode === 'clubs' ? 'selected' : ''}>Naipe ♣ Paus (13 cartas)</option>
          </select>
          <button id="btn-trigger-print" class="btn-primary">🖨️ Imprimir / Salvar PDF (A4)</button>
        </div>
      </div>
      <div class="print-sheets-container">
        ${sheetsHtml}
      </div>
    </div>
  `;
}
