import { describe, expect, it } from 'vitest';
import {
  applyDailyCipher,
  drawNextTurn,
  generateShuffledOrder,
  parseDateSeed,
  resolveWorldDeckOrder,
  shuffleWorldDeck,
} from '../src/core/cipher';

describe('World Deck Free Shuffle & Turn Draw Engine', () => {
  const sampleWorldDeck = Array.from({ length: 42 }, (_, i) => `C-${i + 1}`);

  it('shuffles the 42-card World Deck freely without losing or duplicating cards', () => {
    const shuffled = shuffleWorldDeck(sampleWorldDeck);
    expect(shuffled).toHaveLength(42);
    expect([...shuffled].sort()).toEqual([...sampleWorldDeck].sort());

    const order = generateShuffledOrder(42);
    expect(order).toHaveLength(42);
    const resolved = resolveWorldDeckOrder(sampleWorldDeck, order);
    expect(resolved).toHaveLength(42);
    expect([...resolved].sort()).toEqual([...sampleWorldDeck].sort());
  });

  it('parses YYYY-MM-DD and DD/MM date strings into day and month cuts', () => {
    expect(parseDateSeed('2026-11-06')).toEqual({
      day: 6,
      month: 11,
      label: '06/11',
    });
    expect(parseDateSeed('15/08')).toEqual({
      day: 15,
      month: 8,
      label: '15/08',
    });
  });

  it('produces identical 42-card permutations for the same date seed without losing cards', () => {
    const first = applyDailyCipher(sampleWorldDeck, '2026-11-06');
    const second = applyDailyCipher(sampleWorldDeck, '2026-11-06');
    const differentDay = applyDailyCipher(sampleWorldDeck, '2026-11-07');

    expect(first.cards).toHaveLength(42);
    expect(first.cards).toEqual(second.cards);
    expect(first.cards).not.toEqual(sampleWorldDeck);
    expect(first.cards).not.toEqual(differentDay.cards);
    expect([...first.cards].sort()).toEqual([...sampleWorldDeck].sort());
    expect(first.steps).toHaveLength(3);
  });

  it('alternates between Top (Vigia) and Bottom (Eco) draws until pointers meet in the middle', () => {
    const ciphered = applyDailyCipher(sampleWorldDeck, '2026-11-06').cards;

    // Turn 1 (odd): draws from Top (index 0) as Vigia
    const t1 = drawNextTurn(ciphered, 0, ciphered.length - 1, 1);
    expect(t1.role).toBe('vigia');
    expect(t1.card).toBe(ciphered[0]);
    expect(t1.nextTop).toBe(1);
    expect(t1.nextBottom).toBe(41);
    expect(t1.converged).toBe(false);

    // Turn 2 (even): draws from Bottom (index 41) as Eco
    const t2 = drawNextTurn(ciphered, t1.nextTop, t1.nextBottom, 2);
    expect(t2.role).toBe('eco');
    expect(t2.card).toBe(ciphered[41]);
    expect(t2.nextTop).toBe(1);
    expect(t2.nextBottom).toBe(40);
    expect(t2.converged).toBe(false);

    // Final convergence check when topIndex === bottomIndex
    const finalTurn = drawNextTurn(ciphered, 20, 20, 41);
    expect(finalTurn.converged).toBe(true);
  });
});
