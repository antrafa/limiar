import type { CipherResult } from '../types/card';

export function parseDateSeed(dateInput: string): { day: number; month: number; label: string } {
  const trimmed = dateInput.trim();
  const isoMatch = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(trimmed);
  if (isoMatch) {
    const month = clamp(parseInt(isoMatch[2], 10), 1, 12);
    const day = clamp(parseInt(isoMatch[3], 10), 1, 31);
    return {
      day,
      month,
      label: `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}`,
    };
  }

  const slashMatch = /^(\d{1,2})\/(\d{1,2})/.exec(trimmed);
  if (slashMatch) {
    const day = clamp(parseInt(slashMatch[1], 10), 1, 31);
    const month = clamp(parseInt(slashMatch[2], 10), 1, 12);
    return {
      day,
      month,
      label: `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}`,
    };
  }

  return { day: 6, month: 11, label: '06/11' };
}

function clamp(n: number, min: number, max: number): number {
  if (Number.isNaN(n)) return min;
  return Math.max(min, Math.min(max, n));
}

function cutDeck<T>(cards: readonly T[], count: number): T[] {
  if (cards.length === 0) return [];
  const normalized = ((count % cards.length) + cards.length) % cards.length;
  if (normalized === 0) return [...cards];
  return [...cards.slice(normalized), ...cards.slice(0, normalized)];
}

function dealIntoThreePilesCenterLeftRight<T>(cards: readonly T[]): T[] {
  const left: T[] = [];
  const center: T[] = [];
  const right: T[] = [];

  cards.forEach((card, idx) => {
    const mod = idx % 3;
    if (mod === 0) left.push(card);
    else if (mod === 1) center.push(card);
    else right.push(card);
  });

  // Stack order per spec: Centro -> Esquerda -> Direita
  return [...center, ...left, ...right];
}

function dealIntoTwoPilesLeftOverRight<T>(cards: readonly T[]): T[] {
  const left: T[] = [];
  const right: T[] = [];

  cards.forEach((card, idx) => {
    if (idx % 2 === 0) left.push(card);
    else right.push(card);
  });

  // Stack order per spec: Esquerda sobre Direita
  return [...left, ...right];
}

export function applyDailyCipher<T>(orderedWorldCards: readonly T[], dateInput: string): CipherResult<T> {
  const { day, month, label } = parseDateSeed(dateInput);

  // Passo 1: Corte do Dia (DD)
  const afterDayCut = cutDeck(orderedWorldCards, day);
  // Passo 2: Distribuir alternadamente em 3 pilhas e juntar Centro -> Esquerda -> Direita
  const afterThreePiles = dealIntoThreePilesCenterLeftRight(afterDayCut);
  // Passo 3: Corte do Mês (MM) + Distribuir em 2 pilhas e juntar Esquerda sobre Direita
  const afterMonthCut = cutDeck(afterThreePiles, month);
  const finalCards = dealIntoTwoPilesLeftOverRight(afterMonthCut);

  const steps = [
    `1. Ordem Inicial: Organize as 42 cartas do Mundo (A–10 na ordem ♠, ♥, ♦, ♣ + Coringas ★ e 💀 no fim).`,
    `2. Corte do Dia (${day}): Passe as ${day} primeiras cartas do topo para o fundo e distribua uma a uma em 3 pilhas (Esquerda, Centro, Direita). Junte: Centro no topo, depois Esquerda, depois Direita.`,
    `3. Corte do Mês (${month}): Passe as ${month} primeiras cartas do topo para o fundo e distribua uma a uma em 2 pilhas (Esquerda e Direita). Junte a pilha da Esquerda sobre a da Direita.`,
  ];

  return {
    dateLabel: label,
    dayCut: day,
    monthCut: month,
    steps,
    cards: finalCards,
  };
}

export function drawNextTurn<T>(
  deck: readonly T[],
  topIndex: number,
  bottomIndex: number,
  turnNumber: number,
): {
  role: 'vigia' | 'eco';
  card: T;
  nextTop: number;
  nextBottom: number;
  converged: boolean;
} {
  const isOddTurn = turnNumber % 2 === 1;
  const role: 'vigia' | 'eco' = isOddTurn ? 'vigia' : 'eco';

  if (topIndex >= bottomIndex) {
    const safeIdx = Math.min(Math.max(topIndex, 0), deck.length - 1);
    return {
      role,
      card: deck[safeIdx],
      nextTop: topIndex,
      nextBottom: bottomIndex,
      converged: true,
    };
  }

  if (role === 'vigia') {
    const card = deck[topIndex];
    const nextTop = topIndex + 1;
    return {
      role,
      card,
      nextTop,
      nextBottom: bottomIndex,
      converged: nextTop > bottomIndex,
    };
  } else {
    const card = deck[bottomIndex];
    const nextBottom = bottomIndex - 1;
    return {
      role,
      card,
      nextTop: topIndex,
      nextBottom,
      converged: topIndex > nextBottom,
    };
  }
}
