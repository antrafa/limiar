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
