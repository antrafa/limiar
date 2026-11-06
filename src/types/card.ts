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
