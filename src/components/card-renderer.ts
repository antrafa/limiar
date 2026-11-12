import {
  CLASSES,
  desafioMasterDaCarta,
  ehDesafioMaster,
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
  const master = ehDesafioMaster(carta);
  return {
    tipo: `Cena${master ? ' · Desafio Master' : ''} · ${VIRA_NO_DIA[naipe]?.tipo ?? ''} · valor ${carta ? valorDe(carta) : 0}`,
    blocos: [
      { rotulo: `Sinal · +${REGRA.bonusSinal}`, texto: card.topWatcherTrigger || SINAL_DO_NAIPE[naipe] },
      { rotulo: `Gesto · +${REGRA.bonusGesto}`, texto: card.bottomEchoPrompt || GESTO_DO_NAIPE[naipe] },
      ...(master && carta
        ? [{ rotulo: `Desafio Master · +${REGRA.bonusDesafioMaster}`, texto: desafioMasterDaCarta(carta) }]
        : []),
    ],
  };
}

export function sanitizeArtUrl(url?: string): string {
  const trimmed = (url ?? '').trim();
  if (!trimmed) return '';
  if (/^(https?:\/\/|\/|\.\.?\/|data:image\/(png|jpe?g|webp|gif|svg\+xml);base64,)/i.test(trimmed)) {
    return escapeHtml(trimmed);
  }
  return '';
}

function buildSeal(qr?: string): string {
  if (!qr) return '';
  return `<span class="mtg-art-qr" aria-label="Código da carta">${qr}</span>`;
}

function buildArtFrame(card: GameCard): string {
  const safeUrl = sanitizeArtUrl(card.artUrl);
  const modifier = card.kind === 'journey' ? 'mtg-art-frame--scene' : 'mtg-art-frame--figure';
  if (safeUrl) {
    return `<div class="mtg-art-frame ${modifier}"><img src="${safeUrl}" alt="${escapeHtml(card.title)}" class="mtg-art-img" loading="lazy" /></div>`;
  }
  return `
    <div class="mtg-art-frame ${modifier} mtg-art-frame--engraved" aria-hidden="true">
      <svg class="mtg-art-engraving" viewBox="0 0 220 68" fill="none">
        <line x1="10" y1="34" x2="74" y2="34" stroke="currentColor" stroke-opacity="0.35" stroke-width="0.8" />
        <line x1="146" y1="34" x2="210" y2="34" stroke="currentColor" stroke-opacity="0.35" stroke-width="0.8" />
        <path d="M74 34 78 30 82 34 78 38ZM138 34l4-4 4 4-4 4Z" fill="currentColor" fill-opacity="0.45" />
        <circle cx="110" cy="34" r="24" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.9" />
        <circle cx="110" cy="34" r="20" stroke="currentColor" stroke-opacity="0.3" stroke-width="0.6" stroke-dasharray="1.5 2.5" />
        <path d="M90 22c5-7.5 12-11 20-11s15 3.5 20 11c-5.5-5.5-12-8.2-20-8.2S95.5 16.5 90 22Z" fill="currentColor" fill-opacity="0.55" />
      </svg>
      <span class="mtg-art-glyph mtg-art-medallion">${escapeHtml(card.artGlyph)}</span>
    </div>`;
}

function buildArtSection(card: GameCard): string {
  const quadro = buildArtFrame(card);
  if (card.kind === 'journey') {
    const ideia = card.dailyIdea
      ? `<div class="mtg-art-box"><span class="mtg-art-idea"><strong>Ideia · sugestão</strong> ${escapeHtml(card.dailyIdea)}</span></div>`
      : '';
    return `${quadro}${ideia}`;
  }
  const subtitulo = card.artSubtitle
    ? `<div class="mtg-art-box"><span class="mtg-art-subtitle">${escapeHtml(card.artSubtitle)}</span></div>`
    : '';
  return `${quadro}${subtitulo}`;
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
  const safeUrl = sanitizeArtUrl(card.artUrl);
  const classes = [
    'mtg-card',
    `suit-${card.suit}`,
    `kind-${card.kind}`,
    `theme-${card.themeId}`,
    safeUrl ? 'has-art' : '',
    options.interactive ? 'is-interactive' : '',
    options.tapped ? 'is-tapped' : '',
    options.selected ? 'is-selected' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const regra = regraDaCarta(card);
  const narracao =
    !isFigure(card) && card.topWatcherEvent
      ? `<p class="mtg-narration"><strong>História · sugestão</strong> ${escapeHtml(card.topWatcherEvent)}</p>`
      : '';
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
        <span class="mtg-mana-pip">${escapeHtml(card.playingCardCode)}</span>
        <div class="mtg-heading">
          <div class="mtg-typeline">${escapeHtml(regra.tipo)}</div>
          <span class="mtg-card-title">${escapeHtml(card.title)}</span>
        </div>
        ${buildSeal(options.qr)}
      </header>
      ${buildArtSection(card)}
      <div class="mtg-textbox">
        ${numerosHtml(regra)}
        ${narracao}
        <div class="mtg-rules">${blocos}</div>
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
      ? `
        <div class="zoom-detail-box">
          <div class="zoom-detail-head">
            <h4>História</h4>
            <span class="chip">Sugestão para contar a história</span>
          </div>
          <p>${escapeHtml(card.topWatcherEvent)}</p>
          <p class="zoom-usage-hint muted">
            <strong>Como usar na partida:</strong> este texto é apenas uma <strong>sugestão de fantasia</strong>, não uma fala que deve ser repetida palavra por palavra. Depois que <strong>quem vive</strong> escolhe o momento do dia (ex.: uma reunião, um trajeto ou uma tarefa), <strong>o Eco</strong> usa esta ideia só como inspiração para ligar a aventura à situação real em uma frase simples — podendo usar os elementos daqui ou adaptar livremente.
          </p>
        </div>`
      : '';
  const ideia = card.dailyIdea
    ? `
        <div class="zoom-detail-box">
          <div class="zoom-detail-head">
            <h4>Ideia para o seu dia</h4>
            <span class="chip">Sugestão de rotina</span>
          </div>
          <p>${escapeHtml(card.dailyIdea)}</p>
          <p class="zoom-usage-hint muted">
            <strong>Como usar:</strong> são apenas exemplos caso <strong>quem vive</strong> fique em dúvida do que escolher hoje. Vale qualquer outro compromisso, conversa ou tarefa real do seu dia.
          </p>
        </div>`
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
