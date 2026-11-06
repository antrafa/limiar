import type { ThemeDeck, ThemeId } from '../types/card';
import { ZOMBIES_DECK, ZOMBIES_BLUEPRINT } from './theme-zombies';
import { VAMPIRES_DECK, VAMPIRES_BLUEPRINT } from './theme-vampires';
import { ECLIPSE_DECK, ECLIPSE_BLUEPRINT } from './theme-eclipse';

export const ALL_THEME_IDS: ThemeId[] = ['zombies', 'vampires', 'eclipse'];

export const THEMES: Record<ThemeId, ThemeDeck> = {
  zombies: ZOMBIES_DECK,
  vampires: VAMPIRES_DECK,
  eclipse: ECLIPSE_DECK,
};

export function getDefaultTheme(id: ThemeId): ThemeDeck {
  const deck = THEMES[id] ?? THEMES.zombies;
  return structuredClone(deck);
}

export { ZOMBIES_DECK, ZOMBIES_BLUEPRINT, VAMPIRES_DECK, VAMPIRES_BLUEPRINT, ECLIPSE_DECK, ECLIPSE_BLUEPRINT };
