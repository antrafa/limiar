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

describe('Partida salva', () => {
  beforeEach(() => {
    globalThis.localStorage = new MemoryStorage();
  });

  it('guarda e recupera a partida em andamento', async () => {
    const { criarPartida } = await import('../src/core/partida');
    const { loadPartida, savePartida } = await import('../src/core/storage');
    const partida = criarPartida({ jogadores: [{ nome: 'Jogador 1', classe: 'spades' }] });
    savePartida(partida);
    expect(loadPartida()?.pessoas[0].nome).toBe('Jogador 1');
  });

  it('descarta campanha salva pela regra anterior, com mão de cartas', async () => {
    const { loadPartida } = await import('../src/core/storage');
    localStorage.setItem('limiar_partida_v2', JSON.stringify({ modo: 'ao-vivo', frentes: [{ nome: 'x', mao: [], turnos: 2 }] }));
    expect(loadPartida()).toBeNull();
  });

  it('guarda e sincroniza o status do mundo no localStorage', async () => {
    const { criarPartida } = await import('../src/core/partida');
    const { loadEstadoDoMundo, syncEstadoDoMundo } = await import('../src/core/storage');
    const partida = criarPartida({ jogadores: [{ nome: 'Ana', classe: 'spades' }] });
    syncEstadoDoMundo('eclipse', partida, 'Área central sem eletricidade');

    const estado = loadEstadoDoMundo('eclipse');
    expect(estado.themeId).toBe('eclipse');
    expect(estado.notaDoMundo).toBe('Área central sem eletricidade');
    expect(estado.estagio).toBe('calmo');
  });
});
