import { describe, expect, it } from 'vitest';
import { ALL_THEME_IDS, getDefaultTheme, THEMES } from '../src/data/index';
import { splitPocketAndWorld } from '../src/data/engine-deck';
import type { ThemeId } from '../src/types/card';

describe('Temas completos de 54 cartas', () => {
  const themeIds: ThemeId[] = ALL_THEME_IDS;

  it('tem os 11 temas registrados, com o Último Eclipse primeiro', () => {
    expect(themeIds).toHaveLength(11);
    expect(themeIds[0]).toBe('eclipse');
    expect(new Set(themeIds).size).toBe(11);
  });

  it.each(themeIds)('o texto das cenas de "%s" serve para qualquer número de pessoas', (themeId) => {
    const cenas = getDefaultTheme(themeId).cards.filter((c) => c.kind === 'journey');
    for (const c of cenas) {
      const texto = [c.dailyIdea, c.topWatcherEvent, c.topWatcherTrigger, c.bottomEchoPrompt].join(' ');
      expect(texto, c.playingCardCode).not.toMatch(/parceir|vocês|dupla/i);
      expect(c.dailyIdea?.startsWith('Pode ser'), c.playingCardCode).toBe(true);
    }
  });

  it.each(themeIds)('builds exactly 54 valid cards for theme "%s"', (themeId) => {
    const deck = getDefaultTheme(themeId);
    expect(deck.cards).toHaveLength(54);

    const { figures, worldDeck } = splitPocketAndWorld(deck);
    expect(figures).toHaveLength(12); // K, Q, J of 4 suits
    expect(worldDeck).toHaveLength(42); // 40 journey (A-10) + 2 jokers

    // Every journey card has both Top (Vigia) and Bottom (Eco) text in Portuguese
    for (const card of worldDeck) {
      expect(card.title.length).toBeGreaterThan(3);
      expect(card.topWatcherTrigger?.length).toBeGreaterThan(10);
      expect(card.topWatcherEvent?.length).toBeGreaterThan(10);
      expect(card.bottomEchoPrompt?.length).toBeGreaterThan(10);
      expect(card.bottomEchoEffect?.length).toBeGreaterThan(10);
    }

    // Every figure card has passive/rule and special/taboo
    for (const fig of figures) {
      expect(fig.figurePassiveOrRule?.length).toBeGreaterThan(10);
      expect(fig.figureSpecialOrTaboo?.length).toBeGreaterThan(10);
    }
  });

  it('assigns unique collector numbers 1..54 and unique playingCardCodes per theme', () => {
    for (const theme of Object.values(THEMES)) {
      const numbers = theme.cards.map((c) => c.collectorNumber);
      expect(numbers).toEqual(Array.from({ length: 54 }, (_, i) => i + 1));

      const codes = new Set(theme.cards.map((c) => c.playingCardCode));
      expect(codes.size).toBe(54);
    }
  });
});
