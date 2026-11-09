import type { ThemeDeck, ThemeId } from '../types/card';
import { ZOMBIES_DECK, ZOMBIES_BLUEPRINT } from './theme-zombies';
import { VAMPIRES_DECK, VAMPIRES_BLUEPRINT } from './theme-vampires';
import { ECLIPSE_DECK, ECLIPSE_BLUEPRINT } from './theme-eclipse';
import { EXPEDICAO_DECK } from './theme-expedicao';
import { NOIR_DECK } from './theme-noir';
import { ORBITAL_DECK } from './theme-orbital';
import { ARCANA_DECK } from './theme-arcana';
import { CORSARIOS_DECK } from './theme-corsarios';
import { KAIJU_DECK } from './theme-kaiju';
import { FLORESTA_DECK } from './theme-floresta';
import { NEON_DECK } from './theme-neon';

export const ALL_THEME_IDS: ThemeId[] = [
  'eclipse',
  'zombies',
  'vampires',
  'expedicao',
  'noir',
  'orbital',
  'arcana',
  'corsarios',
  'kaiju',
  'floresta',
  'neon',
];
export const DEFAULT_THEME_ID: ThemeId = 'eclipse';

export const THEMES: Record<ThemeId, ThemeDeck> = {
  eclipse: ECLIPSE_DECK,
  zombies: ZOMBIES_DECK,
  vampires: VAMPIRES_DECK,
  expedicao: EXPEDICAO_DECK,
  noir: NOIR_DECK,
  orbital: ORBITAL_DECK,
  arcana: ARCANA_DECK,
  corsarios: CORSARIOS_DECK,
  kaiju: KAIJU_DECK,
  floresta: FLORESTA_DECK,
  neon: NEON_DECK,
};

export function getDefaultTheme(id: ThemeId): ThemeDeck {
  const deck = THEMES[id] ?? THEMES[DEFAULT_THEME_ID];
  return structuredClone(deck);
}

export { ZOMBIES_DECK, ZOMBIES_BLUEPRINT, VAMPIRES_DECK, VAMPIRES_BLUEPRINT, ECLIPSE_DECK, ECLIPSE_BLUEPRINT };
