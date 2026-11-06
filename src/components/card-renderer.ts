import type { GameCard } from '../types/card';

export interface RenderCardOptions {
  interactive?: boolean;
  tapped?: boolean;
  selected?: boolean;
  highlightRole?: 'vigia' | 'eco';
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildProceduralSvgArt(card: GameCard): string {
  const paletteByTheme: Record<string, { bg1: string; bg2: string; stroke: string }> = {
    zombies: { bg1: '#f0ede6', bg2: '#e4e0d6', stroke: '#57534e' },
    vampires: { bg1: '#f2eceb', bg2: '#e5dddc', stroke: '#7f1d1d' },
    eclipse: { bg1: '#eceef2', bg2: '#dfe2e8', stroke: '#334155' },
  };
  const pal = paletteByTheme[card.themeId] ?? paletteByTheme.zombies;

  return `
    <div class="mtg-art-box" style="background: linear-gradient(180deg, ${pal.bg1} 0%, ${pal.bg2} 100%);">
      <svg class="mtg-art-svg" viewBox="0 0 200 84" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="100" cy="42" r="32" fill="none" stroke="${pal.stroke}" stroke-opacity="0.22" stroke-width="1" />
        <circle cx="100" cy="42" r="24" fill="none" stroke="${pal.stroke}" stroke-opacity="0.32" stroke-dasharray="2 3" />
        <path d="M 18 42 L 66 42 M 134 42 L 182 42" stroke="${pal.stroke}" stroke-opacity="0.28" stroke-width="1" />
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
    `suit-${escapeHtml(card.suit)}`,
    `kind-${escapeHtml(card.kind)}`,
    `theme-${escapeHtml(card.themeId)}`,
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
    <article class="${classes}" data-card-id="${escapeHtml(card.id)}" title="Clique para selecionar ou ampliar a carta">
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

export function renderCardModalContentHtml(card: GameCard): string {
  const isFigure =
    card.kind === 'archetype_king' || card.kind === 'trump_queen' || card.kind === 'scar_jack';

  let detailBlocksHtml = '';
  if (isFigure) {
    const roleTitle =
      card.kind === 'archetype_king'
        ? 'Carta de Bolso 1/3 · Rei (K) — Seu Arquétipo'
        : card.kind === 'trump_queen'
          ? 'Carta de Bolso 2/3 · Dama (Q) — Seu Trunfo Virável (⟳)'
          : 'Carta de Bolso 3/3 · Valete (J) — Sua Cicatriz e Tabu';

    const label1 =
      card.kind === 'archetype_king'
        ? 'Como interpretar seu personagem hoje (Passiva na Vida Real)'
        : card.kind === 'trump_queen'
          ? 'O que acontece quando você gira esta carta 90° (⟳ Virar / Tap)'
          : 'Quando esta Cicatriz é revelada (Gatilho de Entrada)';

    const label2 =
      card.kind === 'archetype_king'
        ? 'Sua vantagem especial (Sinergia quando sai uma carta do seu naipe)'
        : card.kind === 'trump_queen'
          ? 'Como recuperar este recurso (Desvirar / Recarga)'
          : 'Restrição que você deve cumprir na rotina (Tabu na Vida Real)';

    detailBlocksHtml = `
      <div class="zoom-reading-section">
        <div class="zoom-section-badge">${escapeHtml(roleTitle)}</div>
        <div class="zoom-detail-box">
          <h4>${escapeHtml(label1)}</h4>
          <p>${escapeHtml(card.figurePassiveOrRule ?? '')}</p>
        </div>
        <div class="zoom-detail-box">
          <h4>${escapeHtml(label2)}</h4>
          <p>${escapeHtml(card.figureSpecialOrTaboo ?? '')}</p>
        </div>
        <blockquote class="zoom-flavor">"${escapeHtml(card.flavorText)}"</blockquote>
      </div>
    `;
  } else {
    detailBlocksHtml = `
      <div class="zoom-reading-section">
        <div class="zoom-detail-box zoom-box-vigia">
          <div class="zoom-role-kicker">Se você tirou esta carta do TOPO (☀ Vigia)</div>
          <h4>1º Observe este sinal no mundo real:</h4>
          <p class="zoom-trigger-text">👁 ${escapeHtml(card.topWatcherTrigger ?? '')}</p>
          <h4>2º O que acontece na história (conte ao parceiro ou registre no diário):</h4>
          <p>${escapeHtml(card.topWatcherEvent ?? '')}</p>
        </div>

        <div class="zoom-detail-box zoom-box-eco">
          <div class="zoom-role-kicker">Se você tirou esta carta do FUNDO (☾ Eco)</div>
          <h4>1º O que você deve fazer na prática para responder:</h4>
          <p class="zoom-trigger-text">⚡ ${escapeHtml(card.bottomEchoPrompt ?? '')}</p>
          <h4>2º Como resolver na regra (Sucesso ou Custo):</h4>
          <p>${escapeHtml(card.bottomEchoEffect ?? '')}</p>
        </div>

        <blockquote class="zoom-flavor">"${escapeHtml(card.flavorText)}"</blockquote>
      </div>
    `;
  }

  return `
    <div class="zoom-modal-inner">
      <header class="zoom-modal-header">
        <div>
          <span class="zoom-card-code">${escapeHtml(card.playingCardCode)} · Carta #${String(card.collectorNumber).padStart(2, '0')} de 54</span>
          <h2 id="zoom-dialog-title">${escapeHtml(card.title)}</h2>
          <p class="subtitle">${escapeHtml(card.typeLine)}</p>
        </div>
        <form method="dialog">
          <button type="submit" class="btn-secondary" autofocus>Fechar (Esc)</button>
        </form>
      </header>

      <div class="zoom-modal-body">
        <div class="zoom-card-Visual">
          ${renderMagicCardHtml(card)}
        </div>
        ${detailBlocksHtml}
      </div>
    </div>
  `;
}
