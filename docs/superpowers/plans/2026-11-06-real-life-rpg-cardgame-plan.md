# Sinaleiro — Real-Life RPG Card Game & Studio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir o sistema completo de RPG de cartas da vida real **Sinaleiro** no formato Magic (`63×88mm`), incluindo os 3 baralhos temáticos de 54 cartas (*Apocalipse Zumbi*, *Vampiros* e *Fim do Mundo*), o motor determinístico da *"Cifra do Dia"*, o Estúdio Web de edição, a Mesa de Jogo sincronizada (Topo vs. Fundo + controle `K/Q/J`), o gerador de folhas Print & Play A4 (`3×3`) e o Guia de Oráculo para baralho comum.

**Architecture:** Aplicação web estática modular em TypeScript + Vite com testes automatizados em Vitest. O núcleo de regras (`src/core/` e `src/data/`) é desacoplado da camada de apresentação (`src/components/` e `src/styles/`), garantindo que a geração dos 3 baralhos de 54 cartas, o embaralhamento físico/digital da *Cifra do Dia* e a renderização das cartas `63×88mm` sejam 100% testáveis em Node antes de montar a interface interativa.

**Tech Stack:** TypeScript 5, Vite 5, Vitest, HTML5/CSS3 (`@media print` calibrado em milímetros reais `63mm × 88mm`), SVG procedural por tema/naipe e `localStorage`.

**Spec:** `docs/superpowers/specs/2026-11-06-real-life-rpg-cardgame-design.md`

## Global Constraints

- Todo o conteúdo das cartas, interface, regras e oráculo deve estar em **Português (pt-BR)**.
- Cada tema deve conter exatamente **54 cartas**: `12 Figuras (K, Q, J de ♠, ♥, ♦, ♣)` + `40 Cartas de Jornada (A a 10 de ♠, ♥, ♦, ♣)` + `2 Coringas (★ Presságio e 💀 Cataclismo)`.
- O formato físico oficial das cartas é **Magic / Poker (`63mm × 88mm`)**, distribuído em páginas A4 com **grid 3×3 (9 cartas por página)** no modo de impressão.
- A **Cifra do Dia** deve executar os exatos passos físicos descritos na spec (Corte do Dia `DD`, distribuição alternada em 3 pilhas `Centro → Esquerda → Direita`, Corte do Mês `MM`, distribuição alternada em 2 pilhas `Esquerda sobre Direita`) sobre as 42 cartas do Deck do Mundo (`40 Jornada + 2 Coringas`).

---

### Task 1: Project Scaffolding, Core Card Types & Deterministic "Cifra do Dia" Engine

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `src/types/card.ts`
- Create: `src/core/cipher.ts`
- Test: `tests/cipher.test.ts`

**Interfaces:**
- Consumes: none (foundational task)
- Produces:
  - `src/types/card.ts`: `Suit`, `Rank`, `CardKind`, `ThemeId`, `GameCard`, `ThemeDeck`, `CipherResult`, `PlaySessionState`
  - `src/core/cipher.ts`: `parseDateSeed(dateInput: string): { day: number; month: number; label: string }`, `applyDailyCipher<T>(orderedWorldCards: readonly T[], dateInput: string): CipherResult<T>`, `drawNextTurn<T>(deck: readonly T[], topIndex: number, bottomIndex: number, turnNumber: number): { role: 'vigia' | 'eco'; card: T; nextTop: number; nextBottom: number; converged: boolean }`

- [ ] **Step 1: Create `package.json`, `tsconfig.json`, `vite.config.ts` and write the failing test `tests/cipher.test.ts`**

Create `package.json`:
```json
{
  "name": "sinaleiro-rpg-cardgame",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "devDependencies": {
    "typescript": "^5.6.3",
    "vite": "^5.4.10",
    "vitest": "^2.1.4"
  }
}
```

Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "tests"]
}
```

Create `vite.config.ts`:
```ts
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
  },
});
```

Create `tests/cipher.test.ts`:
```ts
import { describe, expect, it } from 'vitest';
import { applyDailyCipher, drawNextTurn, parseDateSeed } from '../src/core/cipher';

describe('Cifra do Dia (Physical + Digital Deterministic Shuffle)', () => {
  const sampleWorldDeck = Array.from({ length: 42 }, (_, i) => `C-${i + 1}`);

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
```

- [ ] **Step 2: Install dependencies and run test to verify it fails**

Run: `npm install && npm test`
Expected: FAIL with module resolution error (`Cannot find module '../src/core/cipher'`).

- [ ] **Step 3: Implement `src/types/card.ts` and `src/core/cipher.ts`**

Create `src/types/card.ts`:
```ts
export type Suit = 'spades' | 'hearts' | 'diamonds' | 'clubs' | 'joker';

export type Rank =
  | 'A'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'Q'
  | 'K'
  | 'JOKER_LIGHT'
  | 'JOKER_DARK';

export type CardKind = 'journey' | 'archetype_king' | 'trump_queen' | 'scar_jack' | 'joker';

export type ThemeId = 'zombies' | 'vampires' | 'eclipse';

export interface SuitMeta {
  suit: Exclude<Suit, 'joker'>;
  symbol: string;
  namePt: string;
  vocationName: string;
  colorHex: string;
}

export interface GameCard {
  id: string;
  themeId: ThemeId;
  collectorNumber: number; // 1 to 54
  suit: Suit;
  rank: Rank;
  playingCardCode: string; // e.g. "7♠", "K♥", "★", "💀"
  kind: CardKind;
  title: string;
  typeLine: string;
  artGlyph: string;
  artSubtitle: string;
  // For Journey (A-10) & Jokers:
  topWatcherTrigger?: string; // Gatilho Real (☀ Topo)
  topWatcherEvent?: string;   // Evento Ficcional (☀ Topo)
  bottomEchoPrompt?: string;  // Interação Real (☾ Fundo)
  bottomEchoEffect?: string;  // Resolução Mecânica (☾ Fundo)
  // For Pocket Trio (K, Q, J):
  figurePassiveOrRule?: string;
  figureSpecialOrTaboo?: string;
  flavorText: string;
}

export interface ThemeDeck {
  id: ThemeId;
  name: string;
  subtitle: string;
  tagline: string;
  accentColor: string;
  secondaryColor: string;
  suits: Record<Exclude<Suit, 'joker'>, SuitMeta>;
  cards: GameCard[];
}

export interface CipherResult<T> {
  dateLabel: string;
  dayCut: number;
  monthCut: number;
  steps: string[];
  cards: T[];
}

export interface DrawnLogItem {
  turn: number;
  role: 'vigia' | 'eco';
  card: GameCard;
  timestamp: string;
}

export interface PlaySessionState {
  themeId: ThemeId;
  dateSeed: string;
  chosenSuit: Exclude<Suit, 'joker'>;
  queenTapped: boolean;
  jackActive: boolean;
  topIndex: number;
  bottomIndex: number;
  turnCount: number;
  history: DrawnLogItem[];
}
```

Create `src/core/cipher.ts`:
```ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS (`tests/cipher.test.ts` passes all 3 tests).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json tsconfig.json vite.config.ts src/types/card.ts src/core/cipher.ts tests/cipher.test.ts
git commit -m "feat: add core card types and deterministic Cifra do Dia shuffle engine"
```

---

### Task 2: 54-Card Theme Builder & The 3 Complete Themes (Zumbis, Vampiros, Fim do Mundo)

**Files:**
- Create: `src/data/engine-deck.ts`
- Create: `src/data/theme-zombies.ts`
- Create: `src/data/theme-vampires.ts`
- Create: `src/data/theme-eclipse.ts`
- Create: `src/data/index.ts`
- Test: `tests/deck.test.ts`

**Interfaces:**
- Consumes: `ThemeDeck`, `GameCard`, `ThemeId`, `Suit`, `Rank` from `src/types/card.ts`
- Produces:
  - `src/data/engine-deck.ts`: `buildThemeDeck(blueprint: ThemeBlueprint): ThemeDeck`, `splitPocketAndWorld(deck: ThemeDeck): { figures: GameCard[]; worldDeck: GameCard[] }`
  - `src/data/index.ts`: `THEMES: Record<ThemeId, ThemeDeck>`, `getDefaultTheme(id: ThemeId): ThemeDeck`

- [ ] **Step 1: Write the failing test `tests/deck.test.ts`**

Create `tests/deck.test.ts`:
```ts
import { describe, expect, it } from 'vitest';
import { getDefaultTheme, THEMES } from '../src/data/index';
import { splitPocketAndWorld } from '../src/data/engine-deck';
import type { ThemeId } from '../src/types/card';

describe('3 Complete 54-Card Themes (Zumbis, Vampiros, Eclipse)', () => {
  const themeIds: ThemeId[] = ['zombies', 'vampires', 'eclipse'];

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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL with `Cannot find module '../src/data/index'`.

- [ ] **Step 3: Implement `src/data/engine-deck.ts`, the 3 theme files, and `src/data/index.ts`**

Create `src/data/engine-deck.ts`:
```ts
import type { GameCard, Rank, Suit, SuitMeta, ThemeDeck, ThemeId } from '../types/card';

export interface JourneySeed {
  rank: Exclude<Rank, 'J' | 'Q' | 'K' | 'JOKER_LIGHT' | 'JOKER_DARK'>;
  title: string;
  artGlyph: string;
  artSubtitle: string;
  topWatcherTrigger: string;
  topWatcherEvent: string;
  bottomEchoPrompt: string;
  bottomEchoEffect: string;
  flavorText: string;
}

export interface FigureTrioSeed {
  king: {
    title: string;
    artGlyph: string;
    artSubtitle: string;
    passive: string;
    synergy: string;
    flavorText: string;
  };
  queen: {
    title: string;
    artGlyph: string;
    artSubtitle: string;
    tapEffect: string;
    rechargeRule: string;
    flavorText: string;
  };
  jack: {
    title: string;
    artGlyph: string;
    artSubtitle: string;
    entryTrigger: string;
    realLifeTaboo: string;
    flavorText: string;
  };
}

export interface JokerSeed {
  title: string;
  artGlyph: string;
  artSubtitle: string;
  topWatcherTrigger: string;
  topWatcherEvent: string;
  bottomEchoPrompt: string;
  bottomEchoEffect: string;
  flavorText: string;
}

export interface ThemeBlueprint {
  id: ThemeId;
  name: string;
  subtitle: string;
  tagline: string;
  accentColor: string;
  secondaryColor: string;
  suits: Record<Exclude<Suit, 'joker'>, SuitMeta>;
  figures: Record<Exclude<Suit, 'joker'>, FigureTrioSeed>;
  journeys: Record<Exclude<Suit, 'joker'>, JourneySeed[]>;
  jokers: {
    light: JokerSeed;
    dark: JokerSeed;
  };
}

const SUIT_ORDER: Array<Exclude<Suit, 'joker'>> = ['spades', 'hearts', 'diamonds', 'clubs'];

export function buildThemeDeck(blueprint: ThemeBlueprint): ThemeDeck {
  const cards: GameCard[] = [];
  let collectorNumber = 1;

  // 1. Build 12 Pocket Figures (K, Q, J for each suit)
  for (const suit of SUIT_ORDER) {
    const meta = blueprint.suits[suit];
    const trio = blueprint.figures[suit];

    cards.push({
      id: `${blueprint.id}-${suit}-K`,
      themeId: blueprint.id,
      collectorNumber: collectorNumber++,
      suit,
      rank: 'K',
      playingCardCode: `K${meta.symbol}`,
      kind: 'archetype_king',
      title: trio.king.title,
      typeLine: `Lenda — Arquétipo (${meta.vocationName})`,
      artGlyph: trio.king.artGlyph,
      artSubtitle: trio.king.artSubtitle,
      figurePassiveOrRule: trio.king.passive,
      figureSpecialOrTaboo: trio.king.synergy,
      flavorText: trio.king.flavorText,
    });

    cards.push({
      id: `${blueprint.id}-${suit}-Q`,
      themeId: blueprint.id,
      collectorNumber: collectorNumber++,
      suit,
      rank: 'Q',
      playingCardCode: `Q${meta.symbol}`,
      kind: 'trump_queen',
      title: trio.queen.title,
      typeLine: `Trunfo Virável (⟳) — ${meta.vocationName}`,
      artGlyph: trio.queen.artGlyph,
      artSubtitle: trio.queen.artSubtitle,
      figurePassiveOrRule: trio.queen.tapEffect,
      figureSpecialOrTaboo: trio.queen.rechargeRule,
      flavorText: trio.queen.flavorText,
    });

    cards.push({
      id: `${blueprint.id}-${suit}-J`,
      themeId: blueprint.id,
      collectorNumber: collectorNumber++,
      suit,
      rank: 'J',
      playingCardCode: `J${meta.symbol}`,
      kind: 'scar_jack',
      title: trio.jack.title,
      typeLine: `Cicatriz & Tabu — ${meta.vocationName}`,
      artGlyph: trio.jack.artGlyph,
      artSubtitle: trio.jack.artSubtitle,
      figurePassiveOrRule: trio.jack.entryTrigger,
      figureSpecialOrTaboo: trio.jack.realLifeTaboo,
      flavorText: trio.jack.flavorText,
    });
  }

  // 2. Build 40 Journey Cards (A-10 in suit order ♠, ♥, ♦, ♣)
  for (const suit of SUIT_ORDER) {
    const meta = blueprint.suits[suit];
    const suitJourneys = blueprint.journeys[suit];
    for (const item of suitJourneys) {
      cards.push({
        id: `${blueprint.id}-${suit}-${item.rank}`,
        themeId: blueprint.id,
        collectorNumber: collectorNumber++,
        suit,
        rank: item.rank,
        playingCardCode: `${item.rank}${meta.symbol}`,
        kind: 'journey',
        title: item.title,
        typeLine: `Jornada · ${meta.namePt} (${meta.vocationName})`,
        artGlyph: item.artGlyph,
        artSubtitle: item.artSubtitle,
        topWatcherTrigger: item.topWatcherTrigger,
        topWatcherEvent: item.topWatcherEvent,
        bottomEchoPrompt: item.bottomEchoPrompt,
        bottomEchoEffect: item.bottomEchoEffect,
        flavorText: item.flavorText,
      });
    }
  }

  // 3. Build 2 Jokers (Light Omen & Dark Cataclysm)
  cards.push({
    id: `${blueprint.id}-joker-light`,
    themeId: blueprint.id,
    collectorNumber: collectorNumber++,
    suit: 'joker',
    rank: 'JOKER_LIGHT',
    playingCardCode: '★',
    kind: 'joker',
    title: blueprint.jokers.light.title,
    typeLine: 'Coringa Claro — Presságio Raro',
    artGlyph: blueprint.jokers.light.artGlyph,
    artSubtitle: blueprint.jokers.light.artSubtitle,
    topWatcherTrigger: blueprint.jokers.light.topWatcherTrigger,
    topWatcherEvent: blueprint.jokers.light.topWatcherEvent,
    bottomEchoPrompt: blueprint.jokers.light.bottomEchoPrompt,
    bottomEchoEffect: blueprint.jokers.light.bottomEchoEffect,
    flavorText: blueprint.jokers.light.flavorText,
  });

  cards.push({
    id: `${blueprint.id}-joker-dark`,
    themeId: blueprint.id,
    collectorNumber: collectorNumber++,
    suit: 'joker',
    rank: 'JOKER_DARK',
    playingCardCode: '💀',
    kind: 'joker',
    title: blueprint.jokers.dark.title,
    typeLine: 'Coringa Escuro — Cataclismo',
    artGlyph: blueprint.jokers.dark.artGlyph,
    artSubtitle: blueprint.jokers.dark.artSubtitle,
    topWatcherTrigger: blueprint.jokers.dark.topWatcherTrigger,
    topWatcherEvent: blueprint.jokers.dark.topWatcherEvent,
    bottomEchoPrompt: blueprint.jokers.dark.bottomEchoPrompt,
    bottomEchoEffect: blueprint.jokers.dark.bottomEchoEffect,
    flavorText: blueprint.jokers.dark.flavorText,
  });

  return {
    id: blueprint.id,
    name: blueprint.name,
    subtitle: blueprint.subtitle,
    tagline: blueprint.tagline,
    accentColor: blueprint.accentColor,
    secondaryColor: blueprint.secondaryColor,
    suits: blueprint.suits,
    cards,
  };
}

export function splitPocketAndWorld(deck: ThemeDeck): {
  figures: GameCard[];
  worldDeck: GameCard[];
} {
  const figures = deck.cards.filter(
    (c) => c.kind === 'archetype_king' || c.kind === 'trump_queen' || c.kind === 'scar_jack',
  );
  const worldDeck = deck.cards.filter((c) => c.kind === 'journey' || c.kind === 'joker');
  return { figures, worldDeck };
}
```

Create `src/data/theme-zombies.ts` with all 54 cards for *Apocalipse Zumbi — Zona de Quarentena* (4 figure trios + 40 tailored journey cards across ♠, ♥, ♦, ♣ + 2 jokers).
Create `src/data/theme-vampires.ts` with all 54 cards for *Vampiros — Sangue & Néon*.
Create `src/data/theme-eclipse.ts` with all 54 cards for *Fim do Mundo — O Último Eclipse*.
Create `src/data/index.ts` exporting `THEMES`, `getDefaultTheme`, and `ALL_THEME_IDS`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS (`tests/deck.test.ts` and `tests/cipher.test.ts` pass).

- [ ] **Step 5: Commit**

```bash
git add src/data/ tests/deck.test.ts
git commit -m "feat: add 54-card deck builder and 3 complete themes (Zumbis, Vampiros, Eclipse)"
```

---

### Task 3: LocalStorage Persistence, Custom Card Overrides & JSON Import/Export

**Files:**
- Create: `src/core/storage.ts`
- Test: `tests/storage.test.ts`

**Interfaces:**
- Consumes: `ThemeDeck`, `GameCard`, `ThemeId`, `PlaySessionState` from `src/types/card.ts`, `getDefaultTheme` from `src/data/index.ts`
- Produces:
  - `src/core/storage.ts`: `loadThemeWithOverrides(themeId: ThemeId): ThemeDeck`, `saveCardOverride(card: GameCard): void`, `resetThemeOverrides(themeId: ThemeId): void`, `exportThemeJson(deck: ThemeDeck): string`, `importThemeJson(jsonStr: string): ThemeDeck`, `loadPlaySession(): PlaySessionState`, `savePlaySession(state: PlaySessionState): void`

- [ ] **Step 1: Write the failing test `tests/storage.test.ts`**

Create `tests/storage.test.ts`:
```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL with `Cannot find module '../src/core/storage'`.

- [ ] **Step 3: Implement `src/core/storage.ts`**

Create `src/core/storage.ts`:
```ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS (`tests/storage.test.ts` passes).

- [ ] **Step 5: Commit**

```bash
git add src/core/storage.ts tests/storage.test.ts
git commit -m "feat: add localStorage card overrides, session persistence, and JSON import/export"
```

---

### Task 4: Magic Card (`63×88mm`) SVG/HTML Renderer, Print & Play Sheets & Oracle Guide

**Files:**
- Create: `src/components/card-renderer.ts`
- Create: `src/components/print-view.ts`
- Create: `src/components/oracle-view.ts`
- Test: `tests/renderer.test.ts`

**Interfaces:**
- Consumes: `GameCard`, `ThemeDeck` from `src/types/card.ts`
- Produces:
  - `src/components/card-renderer.ts`: `renderMagicCardHtml(card: GameCard, options?: { interactive?: boolean; tapped?: boolean; selected?: boolean; highlightRole?: 'vigia' | 'eco' }): string`
  - `src/components/print-view.ts`: `renderPrintSheetsHtml(deck: ThemeDeck, filterMode: 'all' | 'figures' | 'spades' | 'hearts' | 'diamonds' | 'clubs'): string`
  - `src/components/oracle-view.ts`: `renderOracleGuideHtml(deck: ThemeDeck, dateSeed: string): string`

- [ ] **Step 1: Write the failing test `tests/renderer.test.ts`**

Create `tests/renderer.test.ts`:
```ts
import { describe, expect, it } from 'vitest';
import { getDefaultTheme } from '../src/data/index';
import { renderMagicCardHtml } from '../src/components/card-renderer';
import { renderPrintSheetsHtml } from '../src/components/print-view';
import { renderOracleGuideHtml } from '../src/components/oracle-view';

describe('Magic (63x88mm) Card Renderer, Print Sheets & Oracle Guide', () => {
  const deck = getDefaultTheme('zombies');

  it('renders a Figure card (K/Q/J) and Journey card (A-10) in Magic 63x88mm frame', () => {
    const kingCard = deck.cards.find((c) => c.rank === 'K' && c.suit === 'spades')!;
    const journeyCard = deck.cards.find((c) => c.rank === '7' && c.suit === 'spades')!;

    const kingHtml = renderMagicCardHtml(kingCard);
    expect(kingHtml).toContain('mtg-card');
    expect(kingHtml).toContain(kingCard.title);
    expect(kingHtml).toContain('K♠');

    const journeyHtml = renderMagicCardHtml(journeyCard, { highlightRole: 'vigia' });
    expect(journeyHtml).toContain('☀ TOPO · VIGIA');
    expect(journeyHtml).toContain('☾ FUNDO · ECO');
    expect(journeyHtml).toContain('7♠');
  });

  it('paginates 54 cards into 6 A4 3x3 sheets (9 cards per page) for full deck print', () => {
    const printHtml = renderPrintSheetsHtml(deck, 'all');
    const pageMatches = printHtml.match(/class="print-a4-sheet"/g) ?? [];
    expect(pageMatches).toHaveLength(6); // 54 / 9 = 6 pages
  });

  it('renders the Oracle Guide for playing with a standard 54-card deck', () => {
    const oracleHtml = renderOracleGuideHtml(deck, '2026-11-06');
    expect(oracleHtml).toContain('Guia de Oráculo');
    expect(oracleHtml).toContain('Cifra do Dia');
    expect(oracleHtml).toContain('7♠');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL with `Cannot find module '../src/components/card-renderer'`.

- [ ] **Step 3: Implement `src/components/card-renderer.ts`, `src/components/print-view.ts`, and `src/components/oracle-view.ts`**

Create `src/components/card-renderer.ts`:
```ts
import type { GameCard } from '../types/card';

export interface RenderCardOptions {
  interactive?: boolean;
  tapped?: boolean;
  selected?: boolean;
  highlightRole?: 'vigia' | 'eco';
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildProceduralSvgArt(card: GameCard): string {
  const paletteByTheme: Record<string, { bg1: string; bg2: string; stroke: string }> = {
    zombies: { bg1: '#2b1616', bg2: '#0b0f12', stroke: '#ef4444' },
    vampires: { bg1: '#2a0e24', bg2: '#09070d', stroke: '#e11d48' },
    eclipse: { bg1: '#171b30', bg2: '#08090f', stroke: '#f59e0b' },
  };
  const pal = paletteByTheme[card.themeId] ?? paletteByTheme.zombies;

  return `
    <div class="mtg-art-box" style="background: radial-gradient(circle at 50% 38%, ${pal.bg1} 0%, ${pal.bg2} 92%);">
      <svg class="mtg-art-svg" viewBox="0 0 200 84" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <radialGradient id="glow-${escapeHtml(card.id)}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="${pal.stroke}" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="${pal.stroke}" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="100" cy="42" r="38" fill="url(#glow-${escapeHtml(card.id)})" />
        <circle cx="100" cy="42" r="28" fill="none" stroke="${pal.stroke}" stroke-opacity="0.35" stroke-dasharray="3 3" />
        <path d="M 16 42 L 62 42 M 138 42 L 184 42" stroke="${pal.stroke}" stroke-opacity="0.28" stroke-width="1" />
      </svg>
      <div class="mtg-art-overlay">
        <span class="mtg-art-glyph">${escapeHtml(card.artGlyph)}</span>
        <span class="mtg-art-subtitle">${escapeHtml(card.artSubtitle)}</span>
      </div>
    </div>
  `;
}

export function renderMagicCardHtml(card: GameCard, options: RenderCardOptions = {}): string {
  const classes = [
    'mtg-card',
    `suit-${card.suit}`,
    `kind-${card.kind}`,
    `theme-${card.themeId}`,
    options.interactive ? 'is-interactive' : '',
    options.tapped ? 'is-tapped' : '',
    options.selected ? 'is-selected' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const isFigure =
    card.kind === 'archetype_king' || card.kind === 'trump_queen' || card.kind === 'scar_jack';

  let bodyHtml = '';
  if (isFigure) {
    const label1 =
      card.kind === 'archetype_king'
        ? 'Passiva na Vida Real'
        : card.kind === 'trump_queen'
          ? '⟳ Virar (Tap)'
          : 'Gatilho de Entrada';
    const label2 =
      card.kind === 'archetype_king'
        ? 'Sinergia de Naipe'
        : card.kind === 'trump_queen'
          ? 'Recarga (Untap)'
          : 'Tabu na Vida Real';

    bodyHtml = `
      <div class="mtg-textbox figure-textbox">
        <div class="mtg-chamber chamber-figure-primary">
          <div class="chamber-header">${escapeHtml(label1)}</div>
          <p>${escapeHtml(card.figurePassiveOrRule ?? '')}</p>
        </div>
        <div class="mtg-chamber chamber-figure-secondary">
          <div class="chamber-header">${escapeHtml(label2)}</div>
          <p>${escapeHtml(card.figureSpecialOrTaboo ?? '')}</p>
        </div>
        <div class="mtg-flavor">${escapeHtml(card.flavorText)}</div>
      </div>
    `;
  } else {
    const vigiaFocus = options.highlightRole === 'vigia' ? 'chamber-active' : '';
    const ecoFocus = options.highlightRole === 'eco' ? 'chamber-active' : '';

    bodyHtml = `
      <div class="mtg-textbox journey-textbox">
        <div class="mtg-chamber chamber-vigia ${vigiaFocus}">
          <div class="chamber-header">
            <span>☀ TOPO · VIGIA (EVENTO)</span>
          </div>
          <div class="chamber-trigger">👁 ${escapeHtml(card.topWatcherTrigger ?? '')}</div>
          <p>${escapeHtml(card.topWatcherEvent ?? '')}</p>
        </div>
        <div class="mtg-chamber chamber-eco ${ecoFocus}">
          <div class="chamber-header">
            <span>☾ FUNDO · ECO (REAÇÃO)</span>
          </div>
          <div class="chamber-trigger">⚡ ${escapeHtml(card.bottomEchoPrompt ?? '')}</div>
          <p>${escapeHtml(card.bottomEchoEffect ?? '')}</p>
        </div>
      </div>
    `;
  }

  return `
    <article class="${classes}" data-card-id="${escapeHtml(card.id)}">
      <header class="mtg-titlebar">
        <span class="mtg-card-title">${escapeHtml(card.title)}</span>
        <span class="mtg-mana-pip">${escapeHtml(card.playingCardCode)}</span>
      </header>
      ${buildProceduralSvgArt(card)}
      <div class="mtg-typeline">
        <span>${escapeHtml(card.typeLine)}</span>
      </div>
      ${bodyHtml}
      <footer class="mtg-collector-bar">
        <span>SINALEIRO · ${escapeHtml(card.themeId.toUpperCase())}</span>
        <span>${String(card.collectorNumber).padStart(2, '0')}/54 · 63×88mm</span>
      </footer>
    </article>
  `;
}
```

Create `src/components/print-view.ts`:
```ts
import type { GameCard, ThemeDeck } from '../types/card';
import { renderMagicCardHtml } from './card-renderer';

export type PrintFilterMode = 'all' | 'figures' | 'spades' | 'hearts' | 'diamonds' | 'clubs';

export function filterCardsForPrint(deck: ThemeDeck, filterMode: PrintFilterMode): GameCard[] {
  if (filterMode === 'all') return deck.cards;
  if (filterMode === 'figures') {
    return deck.cards.filter(
      (c) => c.kind === 'archetype_king' || c.kind === 'trump_queen' || c.kind === 'scar_jack',
    );
  }
  return deck.cards.filter((c) => c.suit === filterMode);
}

export function renderPrintSheetsHtml(deck: ThemeDeck, filterMode: PrintFilterMode = 'all'): string {
  const selected = filterCardsForPrint(deck, filterMode);
  const pages: GameCard[][] = [];

  for (let i = 0; i < selected.length; i += 9) {
    pages.push(selected.slice(i, i + 9));
  }

  const sheetsHtml = pages
    .map(
      (pageCards, pageIndex) => `
      <section class="print-a4-sheet">
        <header class="print-sheet-header">
          <span><strong>${deck.name}</strong> — Folha ${pageIndex + 1} de ${pages.length}</span>
          <span>Formato Oficial Magic / Poker: <strong>63mm × 88mm</strong> (Escala 100% / Sem margens)</span>
        </header>
        <div class="print-grid-3x3">
          ${pageCards.map((c) => `<div class="print-slot">${renderMagicCardHtml(c)}</div>`).join('')}
        </div>
      </section>
    `,
    )
    .join('');

  return `
    <div class="print-studio-wrapper">
      <div class="print-controls no-print">
        <div>
          <h2>Folhas Print & Play A4 (63×88mm · Grid 3×3)</h2>
          <p class="subtitle">Imprima em folha A4 com escala 100% e coloque na frente de uma carta comum dentro de um sleeve padrão de Magic.</p>
        </div>
        <div class="print-actions">
          <select id="print-filter-select" class="studio-select">
            <option value="all" ${filterMode === 'all' ? 'selected' : ''}>Baralho Completo (54 cartas · 6 páginas)</option>
            <option value="figures" ${filterMode === 'figures' ? 'selected' : ''}>Apenas Trio de Personagem K/Q/J (12 cartas · 2 páginas)</option>
            <option value="spades" ${filterMode === 'spades' ? 'selected' : ''}>Naipe ♠ Espadas (13 cartas)</option>
            <option value="hearts" ${filterMode === 'hearts' ? 'selected' : ''}>Naipe ♥ Copas (13 cartas)</option>
            <option value="diamonds" ${filterMode === 'diamonds' ? 'selected' : ''}>Naipe ♦ Ouros (13 cartas)</option>
            <option value="clubs" ${filterMode === 'clubs' ? 'selected' : ''}>Naipe ♣ Paus (13 cartas)</option>
          </select>
          <button id="btn-trigger-print" class="btn-primary">🖨️ Imprimir / Salvar PDF (A4)</button>
        </div>
      </div>
      <div class="print-sheets-container">
        ${sheetsHtml}
      </div>
    </div>
  `;
}
```

Create `src/components/oracle-view.ts`:
```ts
import { applyDailyCipher } from '../core/cipher';
import { splitPocketAndWorld } from '../data/engine-deck';
import type { ThemeDeck } from '../types/card';

export function renderOracleGuideHtml(deck: ThemeDeck, dateSeed: string): string {
  const { figures, worldDeck } = splitPocketAndWorld(deck);
  const cipher = applyDailyCipher(worldDeck, dateSeed);

  const figureRows = figures
    .map(
      (c) => `
      <tr>
        <td class="oracle-code"><strong>${c.playingCardCode}</strong></td>
        <td><strong>${c.title}</strong><br><small>${c.typeLine}</small></td>
        <td>${c.figurePassiveOrRule ?? ''}</td>
        <td>${c.figureSpecialOrTaboo ?? ''}</td>
      </tr>
    `,
    )
    .join('');

  const worldRows = worldDeck
    .map(
      (c) => `
      <tr>
        <td class="oracle-code"><strong>${c.playingCardCode}</strong></td>
        <td><strong>${c.title}</strong></td>
        <td><span class="oracle-trigger">👁 ${c.topWatcherTrigger ?? ''}</span><br>${c.topWatcherEvent ?? ''}</td>
        <td><span class="oracle-trigger">⚡ ${c.bottomEchoPrompt ?? ''}</span><br>${c.bottomEchoEffect ?? ''}</td>
      </tr>
    `,
    )
    .join('');

  return `
    <div class="oracle-guide-container">
      <header class="oracle-hero">
        <h2>📖 Guia de Oráculo & Regras de Bolso — ${deck.name}</h2>
        <p>${deck.tagline}</p>
      </header>

      <section class="oracle-rules-grid">
        <div class="oracle-rule-box">
          <h3>1. O Trio de Bolso (K, Q, J)</h3>
          <p>Escolha um naipe (♠, ♥, ♦ ou ♣) e separe o <strong>Rei (K)</strong>, a <strong>Dama (Q)</strong> e o <strong>Valete (J)</strong> para a sua carteira:</p>
          <ul>
            <li><strong>K (Arquétipo):</strong> Sua identidade e habilidade passiva no dia a dia.</li>
            <li><strong>Q (Trunfo Virável ⟳):</strong> Gire 90° para cancelar um custo ou salvar o parceiro. Desvira ao se encontrarem pessoalmente ou resolvendo ♦ Ouros.</li>
            <li><strong>J (Cicatriz):</strong> Começa virado para baixo. Se falhar num evento, revele o Valete e cumpra seu <em>Tabu na Vida Real</em>.</li>
          </ul>
        </div>

        <div class="oracle-rule-box">
          <h3>2. Cifra do Dia (${cipher.dateLabel}) — Sincronia Fria</h3>
          <ol>
            ${cipher.steps.map((s) => `<li>${s}</li>`).join('')}
          </ol>
          <p class="cipher-preview">
            <strong>Topo inicial (☀ Vigia):</strong> ${cipher.cards[0].playingCardCode} (${cipher.cards[0].title}) ·
            <strong>Fundo inicial (☾ Eco):</strong> ${cipher.cards[cipher.cards.length - 1].playingCardCode} (${cipher.cards[cipher.cards.length - 1].title})
          </p>
        </div>
      </section>

      <section class="oracle-table-section">
        <h3>Trio de Personagem no Bolso (12 Figuras: K, Q, J)</h3>
        <table class="oracle-table">
          <thead>
            <tr>
              <th>Carta</th>
              <th>Arquétipo / Trunfo / Cicatriz</th>
              <th>Regra Primária / Passiva / Tap ⟳</th>
              <th>Sinergia / Recarga / Tabu Real</th>
            </tr>
          </thead>
          <tbody>${figureRows}</tbody>
        </table>
      </section>

      <section class="oracle-table-section">
        <h3>Oráculo do Mundo (40 Cartas de Jornada A–10 + 2 Coringas)</h3>
        <table class="oracle-table">
          <thead>
            <tr>
              <th>Carta</th>
              <th>Título</th>
              <th>☀ TOPO · O VIGIA (Gatilho Real + Evento)</th>
              <th>☾ FUNDO · O ECO (Interação + Resolução)</th>
            </tr>
          </thead>
          <tbody>${worldRows}</tbody>
        </table>
      </section>
    </div>
  `;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS (`tests/renderer.test.ts` passes).

- [ ] **Step 5: Commit**

```bash
git add src/components/card-renderer.ts src/components/print-view.ts src/components/oracle-view.ts tests/renderer.test.ts
git commit -m "feat: add Magic 63x88mm card renderer, A4 3x3 print sheets, and Oracle guide"
```

---

### Task 5: Interactive Studio Application (Gallery, Live Editor, Synchronized Playtest Table & Styles)

**Files:**
- Create: `index.html`
- Create: `src/styles/main.css`
- Create: `src/styles/card-magic.css`
- Create: `src/styles/print.css`
- Create: `src/components/studio-view.ts`
- Create: `src/components/playtest-view.ts`
- Create: `src/main.ts`
- Test: `tests/app-integration.test.ts`

**Interfaces:**
- Consumes: all modules from Tasks 1–4
- Produces:
  - `src/components/studio-view.ts`: `renderStudioGalleryHtml(deck: ThemeDeck, selectedCard: GameCard, suitFilter: string): string`
  - `src/components/playtest-view.ts`: `renderPlaytestTableHtml(deck: ThemeDeck, session: PlaySessionState): string`
  - `src/main.ts`: interactive browser entrypoint mounting the 4 tabs (`Galeria & Editor`, `Mesa & Cifra do Dia`, `Print & Play A4 63×88mm`, `Guia de Oráculo`)

- [ ] **Step 1: Write the failing integration test `tests/app-integration.test.ts`**

Create `tests/app-integration.test.ts`:
```ts
import { describe, expect, it } from 'vitest';
import { getDefaultPlaySession, loadThemeWithOverrides } from '../src/core/storage';
import { renderStudioGalleryHtml } from '../src/components/studio-view';
import { renderPlaytestTableHtml } from '../src/components/playtest-view';

describe('Studio Gallery & Synchronized Playtest Table views', () => {
  it('renders the Studio Gallery with live editor form for the selected card', () => {
    const deck = loadThemeWithOverrides('zombies');
    const html = renderStudioGalleryHtml(deck, deck.cards[0], 'all');
    expect(html).toContain('Editor de Carta (63×88mm)');
    expect(html).toContain(deck.cards[0].title);
  });

  it('renders the Playtest Table with Pocket Trio (K, Q, J) and Top vs Bottom deck controls', () => {
    const deck = loadThemeWithOverrides('vampires');
    const session = getDefaultPlaySession('vampires');
    const html = renderPlaytestTableHtml(deck, session);
    expect(html).toContain('Sacar do TOPO (☀ Vigia)');
    expect(html).toContain('Sacar do FUNDO (☾ Eco)');
    expect(html).toContain('Seu Trio de Bolso');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL with `Cannot find module '../src/components/studio-view'`.

- [ ] **Step 3: Implement `studio-view.ts`, `playtest-view.ts`, stylesheets, `index.html`, and `main.ts`**

Implement `src/components/studio-view.ts`, `src/components/playtest-view.ts`, `src/styles/main.css`, `src/styles/card-magic.css`, `src/styles/print.css`, `index.html`, and `src/main.ts`.

- [ ] **Step 4: Run tests and production build to verify everything passes**

Run: `npm test && npm run build`
Expected: PASS (all test suites green and `vite build` produces `dist/` with zero TypeScript errors).

- [ ] **Step 5: Commit**

```bash
git add index.html src/ tests/app-integration.test.ts
git commit -m "feat: complete Sinaleiro web studio, live editor, playtest table, and print styles"
```
