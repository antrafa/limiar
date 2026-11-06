import { describe, expect, it } from 'vitest';
import { getDefaultTheme } from '../src/data/index';
import { renderCardModalContentHtml, renderMagicCardHtml } from '../src/components/card-renderer';
import { renderPrintSheetsHtml } from '../src/components/print-view';
import { renderOracleGuideHtml } from '../src/components/oracle-view';

describe('Magic (63x88mm) Card Renderer, Print Sheets & Oracle Guide', () => {
  const deck = getDefaultTheme('zombies');

  it('renders a Figure card (K/Q/J) and Journey card (A-10) in Magic 63x88mm frame', () => {
    const kingCard = deck.cards.find((c) => c.rank === 'K' && c.suit === 'spades')!;
    const journeyCard = deck.cards.find((c) => c.rank === '7' && c.suit === 'spades')!;

    const kingHtml = renderMagicCardHtml(kingCard);
    expect(kingHtml).toContain('mtg-card');
    expect(kingHtml).toContain(kingCard.title);
    expect(kingHtml).toContain('K♠');

    const journeyHtml = renderMagicCardHtml(journeyCard, { highlightRole: 'vigia' });
    expect(journeyHtml).toContain('☀ TOPO · VIGIA');
    expect(journeyHtml).toContain('☾ FUNDO · ECO');
    expect(journeyHtml).toContain('7♠');
  });

  it('renders enlarged modal reading content for any selected card', () => {
    const journeyCard = deck.cards.find((c) => c.rank === '7' && c.suit === 'spades')!;
    const modalHtml = renderCardModalContentHtml(journeyCard);
    expect(modalHtml).toContain('zoom-dialog-title');
    expect(modalHtml).toContain(journeyCard.title);
    expect(modalHtml).toContain('Se você tirou esta carta do TOPO (☀ Vigia)');
    expect(modalHtml).toContain('Se você tirou esta carta do FUNDO (☾ Eco)');
  });

  it('paginates 54 cards into 6 A4 3x3 sheets (9 cards per page) for full deck print', () => {
    const printHtml = renderPrintSheetsHtml(deck, 'all');
    const pageMatches = printHtml.match(/class="print-a4-sheet"/g) ?? [];
    expect(pageMatches).toHaveLength(6); // 54 / 9 = 6 pages
  });

  it('renders the didactic Oracle Guide with clear step-by-step action labels', () => {
    const oracleHtml = renderOracleGuideHtml(deck, '2026-11-06');
    expect(oracleHtml).toContain('Guia de Oráculo');
    expect(oracleHtml).toContain('Cifra do Dia');
    expect(oracleHtml).toContain('1º Observe na rotina:');
    expect(oracleHtml).toContain('1º O que você deve fazer agora:');
    expect(oracleHtml).toContain('7♠');
  });
});
