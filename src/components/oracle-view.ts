import {
  CLASSES,
  GESTO_DO_NAIPE,
  NAIPES,
  REGRA,
  REGRA_DA_CAVEIRA,
  REGRA_DA_DAMA,
  REGRA_DA_ESTRELA,
  REGRA_DO_GESTO,
  REGRA_DO_REI,
  REGRA_DO_SINAL,
  REGRA_DO_VALETE,
  SIMBOLO,
  SINAL_DO_NAIPE,
  VIRA_NO_DIA,
} from '../core/partida';
import type { ThemeDeck } from '../types/card';
import { escapeHtml } from './card-renderer';

const VALORES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const DESFECHOS: Array<[string, string]> = [
  ['Passou do topo', 'Vitória. O topo vira troféu.'],
  [`Igualou, ou até ${REGRA.folgaDoCusto} abaixo`, 'Vitória com custo. O topo vira troféu e a Ameaça sobe 1.'],
  [`${REGRA.folgaDoCusto + 1} ou mais abaixo`, 'A cena venceu. Quem vive perde 1 de Fôlego, a Ameaça sobe 1 e o topo é descartado.'],
];

const PESSOAS = [1, 2, 3, 4];

export function renderOracleGuideHtml(deck: ThemeDeck): string {
  const naipes = NAIPES.map((naipe) => {
    const cenas = VALORES.map((rank) => deck.cards.find((c) => c.kind === 'journey' && c.suit === naipe && c.rank === rank))
      .filter((c) => c !== undefined)
      .map(
        (c) => `
          <li>
            <button type="button" class="threat-row" data-zoom-card-id="${escapeHtml(c.id)}">
              <span class="num threat-row-code">${escapeHtml(c.playingCardCode)}</span>
              <span><strong>${escapeHtml(c.title)}</strong>${c.dailyIdea ? ` <span class="muted">· ${escapeHtml(c.dailyIdea)}</span>` : ''}<br />
                <span class="threat-row-story">${escapeHtml(c.topWatcherEvent ?? '')}</span><br />
                <span class="muted">Sinal: ${escapeHtml(c.topWatcherTrigger ?? '')} · Gesto: ${escapeHtml(c.bottomEchoPrompt ?? '')}</span></span>
            </button>
          </li>`,
      )
      .join('');
    return `
      <details class="suit-group">
        <summary>
          <span class="suit-${naipe} big-suit">${SIMBOLO[naipe]}</span>
          <span><strong>${VIRA_NO_DIA[naipe].tipo}</strong> <span class="muted">· classe ${CLASSES[naipe].nome}, ${escapeHtml(deck.suits[naipe].vocationName)}</span></span>
          <span class="muted count">10 cenas</span>
        </summary>
        <ul class="threat-list">${cenas}</ul>
      </details>`;
  }).join('');

  return `
    <div class="reference">
      <header class="section-head">
        <span class="eyebrow">Referência rápida · ${escapeHtml(deck.name)}</span>
        <h2>Tudo o que se consulta durante a campanha</h2>
        <p class="lede">Para jogar com baralho comum, sem abrir a Mesa: o desfecho, os bônus, o que cada naipe vira no dia e o texto de cada cena deste tema.</p>
      </header>

      <div class="ref-grid">
        <section class="ref-block">
          <h3>Desfecho</h3>
          <p class="muted">O Eco vira o fundo do baralho dele. Fundo + bônus, contra o topo. O Ás vale ${REGRA.valorAs}.</p>
          <dl class="glossary">${DESFECHOS.map(([t, d]) => `<dt>${t}</dt><dd>${d}</dd>`).join('')}</dl>

          <h3 class="spaced">Bônus</h3>
          <dl class="glossary">
            <dt>Sinal +${REGRA.bonusSinal}</dt><dd>${REGRA_DO_SINAL}</dd>
            <dt>Gesto +${REGRA.bonusGesto}</dt><dd>${REGRA_DO_GESTO}</dd>
            <dt>Ajuda +${REGRA.bonusAjuda}</dt><dd>Outra pessoa perde 1 de Fôlego. Uma ajuda por cena.</dd>
          </dl>

          <h3 class="spaced">Quantas pessoas</h3>
          <table class="data-table">
            <thead><tr><th>Pessoas</th><th>Troféus para o chefe</th><th>Derrota com Ameaça</th><th>Vida do chefe</th></tr></thead>
            <tbody>${PESSOAS.map((n) => `<tr><th scope="row" class="num">${n}</th><td class="num">${REGRA.trofeusPorPessoa * n}</td><td class="num">${REGRA.ameacaPorPessoa * n}</td><td class="num">${REGRA.chefeVidaBase + n}</td></tr>`).join('')}</tbody>
          </table>
        </section>

        <section class="ref-block">
          <h3>O que cada naipe vira no dia</h3>
          <table class="data-table">
            <thead><tr><th>Naipe</th><th>Vira</th><th>Sinal sem tema</th><th>Gesto sem tema</th></tr></thead>
            <tbody>
              ${NAIPES.map((n) => `<tr><th scope="row" class="suit-${n} big-suit">${SIMBOLO[n]}</th><td><strong>${VIRA_NO_DIA[n].tipo}:</strong> ${VIRA_NO_DIA[n].vira}</td><td>${SINAL_DO_NAIPE[n]}</td><td>${GESTO_DO_NAIPE[n]}</td></tr>`).join('')}
            </tbody>
          </table>

          <h3 class="spaced">Classes</h3>
          <p class="muted">${REGRA_DO_REI}</p>
          <table class="data-table">
            <tbody>
              ${NAIPES.map((n) => `<tr><th scope="row" class="suit-${n} big-suit">${SIMBOLO[n]}</th><td><strong>${CLASSES[n].nome}</strong></td><td>${CLASSES[n].descricao}</td></tr>`).join('')}
            </tbody>
          </table>

          <h3 class="spaced">Cartas especiais</h3>
          <dl class="glossary">
            <dt>Dama</dt><dd>${REGRA_DA_DAMA}</dd>
            <dt>Valete</dt><dd>${REGRA_DO_VALETE}</dd>
            <dt>★</dt><dd>${REGRA_DA_ESTRELA}</dd>
            <dt>💀</dt><dd>${REGRA_DA_CAVEIRA}</dd>
            <dt>Chefe</dt><dd><strong>${escapeHtml(deck.chefe.nome)}</strong> (${escapeHtml(deck.chefe.descricao)}). Aparece ao somar ${REGRA.trofeusPorPessoa} troféus por pessoa. Cada pessoa o enfrenta como uma cena, contra o valor ${REGRA.chefeValor} (vida ${REGRA.chefeVidaBase} + número de pessoas). O Rei não vale contra ele. Vitória, com ou sem custo, tira 1 de vida.</dd>
          </dl>
        </section>
      </div>

      <section class="ref-block">
        <h3>As cenas deste tema</h3>
        <p class="muted">Abra um naipe e clique numa cena para ver a carta inteira.</p>
        ${naipes}
      </section>
    </div>
  `;
}
