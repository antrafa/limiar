import { beforeEach, describe, expect, it } from 'vitest';
import {
  exportThemeJson,
  importThemeJson,
  loadThemeWithOverrides,
  resetThemeOverrides,
  saveCardOverride,
} from '../src/core/storage';

class MemoryStorage implements Storage {
  private map = new Map<string, string>();
  get length(): number {
    return this.map.size;
  }
  clear(): void {
    this.map.clear();
  }
  getItem(key: string): string | null {
    return this.map.get(key) ?? null;
  }
  key(index: number): string | null {
    return Array.from(this.map.keys())[index] ?? null;
  }
  removeItem(key: string): void {
    this.map.delete(key);
  }
  setItem(key: string, value: string): void {
    this.map.set(key, value);
  }
}

describe('Studio Storage & Custom Card Overrides', () => {
  beforeEach(() => {
    globalThis.localStorage = new MemoryStorage();
  });

  it('persists custom edits to a card and restores defaults on reset', () => {
    const initial = loadThemeWithOverrides('zombies');
    const target = { ...initial.cards[0], title: 'O Batedor Renascido' };

    saveCardOverride(target);

    const reloaded = loadThemeWithOverrides('zombies');
    expect(reloaded.cards[0].title).toBe('O Batedor Renascido');

    resetThemeOverrides('zombies');
    const afterReset = loadThemeWithOverrides('zombies');
    expect(afterReset.cards[0].title).toBe(initial.cards[0].title);
  });

  it('exports and re-imports a 54-card theme JSON cleanly', () => {
    const deck = loadThemeWithOverrides('vampires');
    const raw = exportThemeJson(deck);
    const parsed = importThemeJson(raw);

    expect(parsed.id).toBe('vampires');
    expect(parsed.cards).toHaveLength(54);
  });
});
