import { describe, expect, it } from 'vitest';
import { getDefaultPlaySession, loadThemeWithOverrides } from '../src/core/storage';
import { renderStudioGalleryHtml } from '../src/components/studio-view';
import { renderPlaytestTableHtml } from '../src/components/playtest-view';
import { renderQuickstartGuideHtml } from '../src/components/quickstart-view';

describe('Studio Gallery & Synchronized Playtest Table views', () => {
  it('renders the Quickstart Guide ("Como Começar a Jogar") with step-by-step instructions and real turn example', () => {
    const deck = loadThemeWithOverrides('zombies');
    const html = renderQuickstartGuideHtml(deck, '2026-11-06');
    expect(html).toContain('Como Começar a Jogar');
    expect(html).toContain('1. Escolha seu Material');
    expect(html).toContain('2. Separe seu Trio de Bolso');
    expect(html).toContain('3. Combine o Ritmo e a Cifra');
    expect(html).toContain('4. Exemplo Real de 1 Rodada');
    expect(html).toContain('Como essa rodada acontece na vida real (Em Dupla)');
    expect(html).toContain('E como funciona no Modo Solo');
    expect(html).toContain('data-goto-tab="playtest"');
  });

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
