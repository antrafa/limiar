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
