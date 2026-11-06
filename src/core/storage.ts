import { getDefaultTheme } from '../data/index';
import type { GameCard, PlaySessionState, ThemeDeck, ThemeId } from '../types/card';

const OVERRIDES_KEY_PREFIX = 'sinaleiro_overrides_v1_';
const SESSION_KEY = 'sinaleiro_session_v1';

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

export function getDefaultPlaySession(themeId: ThemeId = 'zombies'): PlaySessionState {
  const today = new Date().toISOString().slice(0, 10);
  return {
    themeId,
    dateSeed: today,
    chosenSuit: 'spades',
    queenTapped: false,
    jackActive: false,
    topIndex: 0,
    bottomIndex: 41,
    turnCount: 0,
    history: [],
  };
}

export function loadPlaySession(): PlaySessionState {
  const store = getStorage();
  if (!store) return getDefaultPlaySession();
  const raw = store.getItem(SESSION_KEY);
  if (!raw) return getDefaultPlaySession();
  try {
    return { ...getDefaultPlaySession(), ...(JSON.parse(raw) as Partial<PlaySessionState>) };
  } catch {
    return getDefaultPlaySession();
  }
}

export function savePlaySession(state: PlaySessionState): void {
  const store = getStorage();
  if (!store) return;
  store.setItem(SESSION_KEY, JSON.stringify(state));
}
