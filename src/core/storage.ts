import { getDefaultTheme } from '../data/index';
import type { Partida } from './partida';
import type { GameCard, ThemeDeck, ThemeId } from '../types/card';

const OVERRIDES_KEY_PREFIX = 'sinaleiro_overrides_v1_';
const PARTIDA_KEY = 'limiar_partida_v2';

function getStorage(): Storage | null {
  try {
    return typeof globalThis !== 'undefined' && globalThis.localStorage ? globalThis.localStorage : null;
  } catch {
    return null;
  }
}

export function loadThemeWithOverrides(themeId: ThemeId): ThemeDeck {
  const base = getDefaultTheme(themeId);
  const store = getStorage();
  if (!store) return base;

  const raw = store.getItem(`${OVERRIDES_KEY_PREFIX}${themeId}`);
  if (!raw) return base;

  try {
    const overridesMap = JSON.parse(raw) as Record<string, GameCard>;
    return {
      ...base,
      cards: base.cards.map((c) => (overridesMap[c.id] ? { ...c, ...overridesMap[c.id] } : c)),
    };
  } catch {
    return base;
  }
}

export function saveCardOverride(card: GameCard): void {
  const store = getStorage();
  if (!store) return;

  const key = `${OVERRIDES_KEY_PREFIX}${card.themeId}`;
  const existingRaw = store.getItem(key);
  let overridesMap: Record<string, GameCard> = {};
  if (existingRaw) {
    try {
      overridesMap = JSON.parse(existingRaw) as Record<string, GameCard>;
    } catch {
      overridesMap = {};
    }
  }
  overridesMap[card.id] = card;
  store.setItem(key, JSON.stringify(overridesMap));
}

export function resetThemeOverrides(themeId: ThemeId): void {
  const store = getStorage();
  if (!store) return;
  store.removeItem(`${OVERRIDES_KEY_PREFIX}${themeId}`);
}

export function exportThemeJson(deck: ThemeDeck): string {
  return JSON.stringify(deck, null, 2);
}

export function importThemeJson(jsonStr: string): ThemeDeck {
  const parsed = JSON.parse(jsonStr) as ThemeDeck;
  if (!parsed || !Array.isArray(parsed.cards) || parsed.cards.length !== 54) {
    throw new Error('JSON inválido: o baralho precisa conter exatamente 54 cartas.');
  }
  for (const card of parsed.cards) {
    saveCardOverride(card);
  }
  return parsed;
}

export function loadPartida(): Partida | null {
  const store = getStorage();
  const raw = store?.getItem(PARTIDA_KEY);
  if (!raw) return null;
  try {
    const partida = JSON.parse(raw) as Partida;
    // campanhas salvas pela regra anterior (mão de cartas) não têm `pessoas`: descarta em vez de quebrar a Mesa
    const valida = Array.isArray(partida.pessoas) && partida.pessoas.every((p) => Array.isArray(p.baralho) && typeof p.folego === 'number');
    return valida ? partida : null;
  } catch {
    return null;
  }
}

export function savePartida(partida: Partida | null): void {
  const store = getStorage();
  if (!store) return;
  if (partida) store.setItem(PARTIDA_KEY, JSON.stringify(partida));
  else store.removeItem(PARTIDA_KEY);
}

const THEME_KEY = 'limiar_tema';

export function loadThemeId(): ThemeId | null {
  return (getStorage()?.getItem(THEME_KEY) as ThemeId | null) ?? null;
}

export function saveThemeId(themeId: ThemeId): void {
  getStorage()?.setItem(THEME_KEY, themeId);
}
