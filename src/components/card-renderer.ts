import {
  CLASSES,
  GESTO_DO_NAIPE,
  REGRA,
  REGRA_DA_CAVEIRA,
  REGRA_DA_DAMA,
  REGRA_DA_ESTRELA,
  REGRA_DO_REI,
  REGRA_DO_VALETE,
  SIMBOLO,
  SINAL_DO_NAIPE,
  VIRA_NO_DIA,
  type Carta,
  type Naipe,
  valorDe,
} from '../core/partida';
import type { GameCard } from '../types/card';

export interface RenderCardOptions {
  interactive?: boolean;
  tapped?: boolean;
  selected?: boolean;
  qr?: string; // SVG do código da carta, para o escaneador; ocupa o lugar do ícone da arte
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function isFigure(card: GameCard): boolean {
  return card.kind === 'archetype_king' || card.kind === 'trump_queen' || card.kind === 'scar_jack';
}

/** Converte uma carta de Jornada (A–10) do tema na carta do motor. */
export function cartaDoMotor(card: GameCard): Carta | null {
  if (card.kind !== 'journey' || card.suit === 'joker') return null;
  const valor = card.rank === 'A' ? 1 : Number(card.rank);
  return Number.isFinite(valor) ? { valor, naipe: card.suit } : null;
}

/** A carta do tema que corresponde a uma carta do motor. */
export function cartaDoTema(cards: GameCard[], carta: Carta): GameCard | undefined {
  const rank = carta.valor === 1 ? 'A' : String(carta.valor);
  return cards.find((c) => c.kind === 'journey' && c.suit === carta.naipe && c.rank === rank);
}

interface RegraDaCarta {
  tipo: string;
  blocos: Array<{ rotulo: string; texto: string }>;
  numeros?: Array<{ rotulo: string; valor: string }>;
}

export function regraDaCarta(card: GameCard): RegraDaCarta {
  const naipe = card.suit as Naipe;
  if (card.kind === 'archetype_king') {
    const classe = CLASSES[naipe];
    return {
      tipo: `Rei · ${classe.nome}`,
      blocos: [
        { rotulo: 'Sempre', texto: REGRA_DO_REI },
        { rotulo: `Poder · ao vencer uma cena de ${SIMBOLO[naipe]}`, texto: classe.descricao },
      ],
    };
  }
  if (card.kind === 'trump_queen') {
    return { tipo: 'Dama · Segunda chance', blocos: [{ rotulo: 'Começa em pé', texto: REGRA_DA_DAMA }] };
  }
  if (card.kind === 'scar_jack') {
    return { tipo: 'Valete · Cicatriz', blocos: [{ rotulo: 'Uma vez por campanha', texto: REGRA_DO_VALETE }] };
  }
  if (card.kind === 'joker') {
    const estrela = card.rank === 'JOKER_LIGHT';
    return {
      tipo: estrela ? 'Coringa · ★' : 'Coringa · 💀',
      blocos: [{ rotulo: 'Ao aparecer', texto: estrela ? REGRA_DA_ESTRELA : REGRA_DA_CAVEIRA }],
    };
  }
  const carta = cartaDoMotor(card);
  return {
    tipo: `Cena · ${VIRA_NO_DIA[naipe]?.tipo ?? ''} · valor ${carta ? valorDe(carta) : 0}`,
    blocos: [
      { rotulo: `Sinal · +${REGRA.bonusSinal}`, texto: card.topWatcherTrigger || SINAL_DO_NAIPE[naipe] },
      { rotulo: `Gesto · +${REGRA.bonusGesto}`, texto: card.bottomEchoPrompt || GESTO_DO_NAIPE[naipe] },
    ],
  };
}

function buildArt(card: GameCard, qr?: string): string {
  // Na cena, a faixa da arte traz a ideia do que ela pode ser no dia; a legenda decorativa fica no modal.
  const legenda = card.kind === 'journey' && card.dailyIdea
    ? `<span class="mtg-art-idea"><strong>Ideia</strong> ${escapeHtml(card.dailyIdea)}</span>`
    : `<span class="mtg-art-subtitle">${escapeHtml(card.artSubtitle)}</span>`;
  return `
    <div class="mtg-art-box">
      ${qr ? `<span class="mtg-art-qr" aria-label="Código da carta">${qr}</span>` : `<span class="mtg-art-glyph">${escapeHtml(card.artGlyph)}</span>`}
      ${legenda}
    </div>
  `;
}

function numerosHtml(regra: RegraDaCarta): string {
  if (!regra.numeros) return '';
  return `
    <dl class="mtg-stats">
      ${regra.numeros
        .map((n) => `<div><dt>${escapeHtml(n.rotulo)}</dt><dd>${escapeHtml(n.valor)}</dd></div>`)
        .join('')}
    </dl>
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

  const regra = regraDaCarta(card);
  const narracao = !isFigure(card) && card.topWatcherEvent ? `<p class="mtg-narration">${escapeHtml(card.topWatcherEvent)}</p>` : '';
  const blocos = regra.blocos
    .map(
      (b) => `
        <div class="mtg-rule">
          <div class="mtg-rule-label">${escapeHtml(b.rotulo)}</div>
          <p>${escapeHtml(b.texto)}</p>
        </div>`,
    )
    .join('');

  return `
    <article class="${classes}" data-card-id="${escapeHtml(card.id)}" title="Clique para ampliar">
      <header class="mtg-titlebar">
        <span class="mtg-card-title">${escapeHtml(card.title)}</span>
        <span class="mtg-mana-pip">${escapeHtml(card.playingCardCode)}</span>
      </header>
      ${buildArt(card, options.qr)}
      <div class="mtg-typeline">${escapeHtml(regra.tipo)}</div>
      <div class="mtg-textbox">
        ${numerosHtml(regra)}
        ${narracao}
        ${blocos}
        ${card.kind === 'journey' ? '' : `<div class="mtg-flavor">${escapeHtml(card.flavorText)}</div>`}
      </div>
      <footer class="mtg-collector-bar">
        <span>LIMIAR</span>
        <span>${String(card.collectorNumber).padStart(2, '0')}/54</span>
      </footer>
    </article>
  `;
}

export function renderCardModalContentHtml(card: GameCard): string {
  const regra = regraDaCarta(card);
  const narracao =
    !isFigure(card) && card.topWatcherEvent
      ? `<div class="zoom-detail-box"><h4>História</h4><p>${escapeHtml(card.topWatcherEvent)}</p></div>`
      : '';
  const ideia = card.dailyIdea
    ? `<div class="zoom-detail-box"><h4>Ideia para o seu dia</h4><p>${escapeHtml(card.dailyIdea)}</p></div>`
    : '';
  const carta = cartaDoMotor(card);
  const sinalGenerico = carta
    ? `<p class="muted">Na sua vida, ${SIMBOLO[carta.naipe]} vira ${VIRA_NO_DIA[carta.naipe].vira}: ${VIRA_NO_DIA[carta.naipe].exemplos}. Sinal e gesto nunca são obrigatórios.</p>`
    : '';
  const blocos = regra.blocos
    .map(
      (b) =>
        `<div class="zoom-detail-box"><h4>${escapeHtml(b.rotulo)}</h4><p>${escapeHtml(b.texto)}</p>${b.rotulo.startsWith('Sinal') ? sinalGenerico : ''}</div>`,
    )
    .join('');

  return `
    <div class="zoom-modal-inner">
      <header class="zoom-modal-header">
        <div>
          <span class="eyebrow">${escapeHtml(card.playingCardCode)} · ${escapeHtml(regra.tipo)}</span>
          <h2 id="zoom-dialog-title">${escapeHtml(card.title)}</h2>
        </div>
        <form method="dialog">
          <button type="submit" class="btn-secondary" autofocus>Fechar</button>
        </form>
      </header>
      <div class="zoom-modal-body">
        <div class="zoom-card-visual">${renderMagicCardHtml(card)}</div>
        <div class="zoom-reading-section">
          ${numerosHtml(regra)}
          ${ideia}
          ${narracao}
          ${blocos}
          <blockquote class="zoom-flavor">${escapeHtml(card.flavorText)}</blockquote>
        </div>
      </div>
    </div>
  `;
}
