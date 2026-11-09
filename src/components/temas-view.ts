import { NAIPES, SIMBOLO, VIRA_NO_DIA } from '../core/partida';
import type { ThemeDeck, ThemeId } from '../types/card';
import { escapeHtml } from './card-renderer';

function cenaDeAmostra(deck: ThemeDeck) {
  return deck.cards.find((c) => c.kind === 'journey' && c.suit === 'spades' && c.rank === '7');
}

function renderTema(deck: ThemeDeck, ativo: boolean): string {
  const amostra = cenaDeAmostra(deck);
  const naipes = NAIPES.map(
    (n) => `<li><span class="suit-${n}">${SIMBOLO[n]}</span> <span class="muted">${VIRA_NO_DIA[n].tipo}:</span> ${escapeHtml(deck.suits[n].vocationName)}</li>`,
  ).join('');

  return `
    <article class="theme-tile ${ativo ? 'is-active' : ''}" style="--tema: ${escapeHtml(deck.accentColor)}">
      <header>
        <span class="chip">${escapeHtml(deck.tom)}</span>
        <h3>${escapeHtml(deck.name)}</h3>
        <p class="muted">${escapeHtml(deck.subtitle)}</p>
      </header>
      <p class="theme-tagline">${escapeHtml(deck.tagline)}</p>
      <ul class="theme-suits">${naipes}</ul>
      ${
        amostra
          ? `<div class="theme-sample">
              <span class="field-label">Uma cena: ${escapeHtml(amostra.playingCardCode)} ${escapeHtml(amostra.title)}</span>
              <p>${escapeHtml(amostra.dailyIdea ?? amostra.topWatcherEvent ?? '')}</p>
            </div>`
          : ''
      }
      <p class="theme-boss"><span class="field-label">Chefe</span> <strong>${escapeHtml(deck.chefe.nome)}</strong></p>
      <div class="inline wrap">
        ${
          ativo
            ? '<span class="chip chip-ok">Tema atual</span>'
            : `<button type="button" class="btn-primary btn-sm" data-switch-theme="${escapeHtml(deck.id)}">Jogar com este tema</button>`
        }
        <button type="button" class="btn-ghost btn-sm" data-switch-theme="${escapeHtml(deck.id)}" data-goto-tab="studio">Ver as 54 cartas</button>
      </div>
    </article>`;
}

export function renderTemasHtml(temas: ThemeDeck[], ativo: ThemeId): string {
  return `
    <div class="themes-page">
      <header class="section-head">
        <span class="eyebrow">Temas · ${temas.length} mundos</span>
        <h2>Escolha o mundo em que o seu dia vai acontecer.</h2>
        <p class="lede">A regra é a mesma em todos: o tema só muda o que a reunião, o trânsito e o jantar viram na história. Dá para trocar a qualquer momento, até no meio de uma campanha.</p>
      </header>
      <div class="theme-grid">${temas.map((t) => renderTema(t, t.id === ativo)).join('')}</div>
    </div>`;
}
