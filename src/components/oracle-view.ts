import { applyDailyCipher } from '../core/cipher';
import { splitPocketAndWorld } from '../data/engine-deck';
import type { ThemeDeck } from '../types/card';
import { escapeHtml } from './card-renderer';

export function renderOracleGuideHtml(deck: ThemeDeck, dateSeed: string): string {
  const { figures, worldDeck } = splitPocketAndWorld(deck);
  const cipher = applyDailyCipher(worldDeck, dateSeed);

  const figureRows = figures
    .map(
      (c) => `
      <tr>
        <td class="oracle-code"><strong>${escapeHtml(c.playingCardCode)}</strong></td>
        <td><strong>${escapeHtml(c.title)}</strong><br><small>${escapeHtml(c.typeLine)}</small></td>
        <td>${escapeHtml(c.figurePassiveOrRule ?? '')}</td>
        <td>${escapeHtml(c.figureSpecialOrTaboo ?? '')}</td>
      </tr>
    `,
    )
    .join('');

  const worldRows = worldDeck
    .map(
      (c) => `
      <tr>
        <td class="oracle-code"><strong>${escapeHtml(c.playingCardCode)}</strong></td>
        <td><strong>${escapeHtml(c.title)}</strong></td>
        <td><span class="oracle-trigger">👁 ${escapeHtml(c.topWatcherTrigger ?? '')}</span><br>${escapeHtml(c.topWatcherEvent ?? '')}</td>
        <td><span class="oracle-trigger">⚡ ${escapeHtml(c.bottomEchoPrompt ?? '')}</span><br>${escapeHtml(c.bottomEchoEffect ?? '')}</td>
      </tr>
    `,
    )
    .join('');

  return `
    <div class="oracle-guide-container">
      <header class="oracle-hero">
        <h2>📖 Guia de Oráculo & Regras de Bolso — ${escapeHtml(deck.name)}</h2>
        <p>${escapeHtml(deck.tagline)}</p>
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
          <h3>2. Cifra do Dia (${escapeHtml(cipher.dateLabel)}) — Sincronia Fria</h3>
          <ol>
            ${cipher.steps.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}
          </ol>
          <p class="cipher-preview">
            <strong>Topo inicial (☀ Vigia):</strong> ${escapeHtml(cipher.cards[0].playingCardCode)} (${escapeHtml(cipher.cards[0].title)}) ·
            <strong>Fundo inicial (☾ Eco):</strong> ${escapeHtml(cipher.cards[cipher.cards.length - 1].playingCardCode)} (${escapeHtml(cipher.cards[cipher.cards.length - 1].title)})
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
