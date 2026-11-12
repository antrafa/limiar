import { getDefaultTheme } from '../data/index';
import { type EstagioDeAmeaca, estagioDeAmeaca, limiteDeAmeaca, marcoAlcancado, metaDeTrofeus, type Partida } from './partida';
import type { GameCard, ThemeDeck, ThemeId } from '../types/card';

const OVERRIDES_KEY_PREFIX = 'sinaleiro_overrides_v1_';
const PARTIDA_KEY = 'limiar_partida_v2';
const ESTADO_MUNDO_KEY_PREFIX = 'limiar_estado_mundo_v1_';

export interface EstadoDoMundo {
  themeId: ThemeId;
  estagio: EstagioDeAmeaca;
  trofeus: number;
  metaTrofeus: number;
  ameaca: number;
  limiteAmeaca: number;
  cenasConcluidas: number;
  desafiosMasterConcluidos: number;
  marcosAlcancados: 0 | 1 | 2;
  notaDoMundo: string;
  ultimoEvento: string;
  atualizadoEm: string;
}

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
const SALA_ONLINE_KEY = 'limiar_sala_online_id';

export function loadSalaOnlineId(): string | null {
  return getStorage()?.getItem(SALA_ONLINE_KEY) ?? null;
}

export function saveSalaOnlineId(salaId: string | null): void {
  const store = getStorage();
  if (!store) return;
  if (salaId) store.setItem(SALA_ONLINE_KEY, salaId);
  else store.removeItem(SALA_ONLINE_KEY);
}

export function loadThemeId(): ThemeId | null {
  return (getStorage()?.getItem(THEME_KEY) as ThemeId | null) ?? null;
}

export function saveThemeId(themeId: ThemeId): void {
  getStorage()?.setItem(THEME_KEY, themeId);
}

export function estadoDoMundoPadrao(themeId: ThemeId): EstadoDoMundo {
  return {
    themeId,
    estagio: 'calmo',
    trofeus: 0,
    metaTrofeus: 60,
    ameaca: 0,
    limiteAmeaca: 10,
    cenasConcluidas: 0,
    desafiosMasterConcluidos: 0,
    marcosAlcancados: 0,
    notaDoMundo: '',
    ultimoEvento: 'O mundo aguarda a primeira cena do dia.',
    atualizadoEm: '',
  };
}

export function loadEstadoDoMundo(themeId: ThemeId): EstadoDoMundo {
  const base = estadoDoMundoPadrao(themeId);
  const store = getStorage();
  const raw = store?.getItem(`${ESTADO_MUNDO_KEY_PREFIX}${themeId}`);
  if (!raw) return base;
  try {
    const parsed = JSON.parse(raw) as Partial<EstadoDoMundo>;
    return { ...base, ...parsed, themeId };
  } catch {
    return base;
  }
}

export function saveEstadoDoMundo(estado: EstadoDoMundo): void {
  const store = getStorage();
  if (!store) return;
  store.setItem(`${ESTADO_MUNDO_KEY_PREFIX}${estado.themeId}`, JSON.stringify(estado));
}

export function syncEstadoDoMundo(themeId: ThemeId, partida: Partida | null, notaOpcional?: string): EstadoDoMundo {
  const anterior = loadEstadoDoMundo(themeId);
  const notaDoMundo = notaOpcional !== undefined ? notaOpcional : anterior.notaDoMundo;
  if (!partida) {
    const atualizado: EstadoDoMundo = {
      ...anterior,
      notaDoMundo,
    };
    saveEstadoDoMundo(atualizado);
    return atualizado;
  }

  const cenasConcluidas = partida.diario.filter((l) => l.includes(' narra: ')).length;
  const desafiosMasterConcluidos = partida.diario.filter((l) => l.includes('cumpriu o Desafio Master:')).length;
  const ultimoEvento = partida.diario[partida.diario.length - 1] ?? anterior.ultimoEvento;

  const atualizado: EstadoDoMundo = {
    themeId,
    estagio: estagioDeAmeaca(partida),
    trofeus: partida.trofeus,
    metaTrofeus: metaDeTrofeus(partida),
    ameaca: partida.ameaca,
    limiteAmeaca: limiteDeAmeaca(partida),
    cenasConcluidas,
    desafiosMasterConcluidos,
    marcosAlcancados: marcoAlcancado(partida),
    notaDoMundo,
    ultimoEvento,
    atualizadoEm: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
  };
  saveEstadoDoMundo(atualizado);
  return atualizado;
}
