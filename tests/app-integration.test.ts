import { describe, expect, it } from 'vitest';
import { getDefaultPlaySession, loadThemeWithOverrides } from '../src/core/storage';
import { renderStudioGalleryHtml } from '../src/components/studio-view';
import { renderPlaytestTableHtml } from '../src/components/playtest-view';

describe('Studio Gallery & Synchronized Playtest Table views', () => {
  it('renders the Studio Gallery with live editor form for the selected card', () => {
    const deck = loadThemeWithOverrides('zombies');
    const html = renderStudioGalleryHtml(deck, deck.cards[0], 'all');
    expect(html).toContain('Editor de Carta (63×88mm)');
    expect(html).toContain(deck.cards[0].title);
  });

  it('renders Journey card dual-chamber fields when a Journey card is selected in the Studio', () => {
    const deck = loadThemeWithOverrides('eclipse');
    const journeyCard = deck.cards.find((c) => c.kind === 'journey')!;
    const html = renderStudioGalleryHtml(deck, journeyCard, 'spades');
    expect(html).toContain('edit-topWatcherTrigger');
    expect(html).toContain('edit-bottomEchoPrompt');
    expect(html).toContain(journeyCard.title);
  });

  it('renders the Playtest Table with Pocket Trio (K, Q, J) and Top vs Bottom deck controls', () => {
    const deck = loadThemeWithOverrides('vampires');
    const session = getDefaultPlaySession('vampires');
    const html = renderPlaytestTableHtml(deck, session);
    expect(html).toContain('Sacar do TOPO (☀ Vigia)');
    expect(html).toContain('Sacar do FUNDO (☾ Eco)');
    expect(html).toContain('Seu Trio de Bolso');
  });

  it('reflects tapped Queen (Q ⟳), active Scar Jack (J), and drawn history in Playtest Table', () => {
    const deck = loadThemeWithOverrides('zombies');
    const session = getDefaultPlaySession('zombies');
    const journeyCard = deck.cards.find((c) => c.kind === 'journey')!;
    session.queenTapped = true;
    session.jackActive = true;
    session.topIndex = 1;
    session.turnCount = 1;
    session.history = [
      {
        turn: 1,
        role: 'vigia',
        card: journeyCard,
        timestamp: '14:00',
      },
    ];

    const html = renderPlaytestTableHtml(deck, session);
    expect(html).toContain('is-tapped');
    expect(html).toContain('scar-active');
    expect(html).toContain('41 / 42');
    expect(html).toContain(journeyCard.title);
  });
});
