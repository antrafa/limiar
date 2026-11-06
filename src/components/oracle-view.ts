import { applyDailyCipher } from '../core/cipher';
import { splitPocketAndWorld } from '../data/engine-deck';
import type { GameCard, ThemeDeck } from '../types/card';
import { escapeHtml } from './card-renderer';

function renderFigureRow(c: GameCard): string {
  const roleBadge =
    c.kind === 'archetype_king'
      ? '1/3 · Rei (K) — Quem você é (Fica visível no bolso)'
      : c.kind === 'trump_queen'
        ? '2/3 · Dama (Q) — Recurso de emergência (Começa em pé)'
        : '3/3 · Valete (J) — Cicatriz / Consequência (Começa virado para baixo)';

  const labelPrimary =
    c.kind === 'archetype_king'
      ? 'Como agir hoje na rotina (Hábito Real):'
      : c.kind === 'trump_queen'
        ? 'Quando girar esta carta 90° (Usar Trunfo ⟳):'
        : 'Quando virar esta carta para cima (Entra em jogo):';

  const labelSecondary =
    c.kind === 'archetype_king'
      ? 'Sua vantagem quando sair carta deste naipe:'
      : c.kind === 'trump_queen'
        ? 'Como desvirar para usar de novo (Recarga):'
        : 'Restrição obrigatória enquanto estiver ativa (Tabu Real):';

  return `
    <tr>
      <td class="oracle-code">
        <strong>${escapeHtml(c.playingCardCode)}</strong>
        <button type="button" class="btn-ghost btn-sm oracle-zoom-btn" data-zoom-card-id="${escapeHtml(c.id)}">
          🔍 Ampliar
        </button>
      </td>
      <td>
        <strong>${escapeHtml(c.title)}</strong>
        <div class="oracle-subrole">${escapeHtml(roleBadge)}</div>
      </td>
      <td>
        <span class="oracle-step-label">${escapeHtml(labelPrimary)}</span>
        <div>${escapeHtml(c.figurePassiveOrRule ?? '')}</div>
      </td>
      <td>
        <span class="oracle-step-label">${escapeHtml(labelSecondary)}</span>
        <div>${escapeHtml(c.figureSpecialOrTaboo ?? '')}</div>
      </td>
    </tr>
  `;
}

function renderWorldRow(c: GameCard): string {
  return `
    <tr>
      <td class="oracle-code">
        <strong>${escapeHtml(c.playingCardCode)}</strong>
        <button type="button" class="btn-ghost btn-sm oracle-zoom-btn" data-zoom-card-id="${escapeHtml(c.id)}">
          🔍 Ampliar
        </button>
      </td>
      <td>
        <strong>${escapeHtml(c.title)}</strong>
        <div class="oracle-subrole">${escapeHtml(c.typeLine)}</div>
      </td>
      <td>
        <div class="oracle-step-block">
          <span class="oracle-step-label">1º Observe na rotina:</span>
          <span class="oracle-trigger">👁 ${escapeHtml(c.topWatcherTrigger ?? '')}</span>
        </div>
        <div class="oracle-step-block">
          <span class="oracle-step-label">2º Narre ao parceiro (Evento):</span>
          <div>${escapeHtml(c.topWatcherEvent ?? '')}</div>
        </div>
      </td>
      <td>
        <div class="oracle-step-block">
          <span class="oracle-step-label">1º O que você deve fazer agora:</span>
          <span class="oracle-trigger">⚡ ${escapeHtml(c.bottomEchoPrompt ?? '')}</span>
        </div>
        <div class="oracle-step-block">
          <span class="oracle-step-label">2º Regra de desfecho (Sucesso ou Custo):</span>
          <div>${escapeHtml(c.bottomEchoEffect ?? '')}</div>
        </div>
      </td>
    </tr>
  `;
}

export function renderOracleGuideHtml(deck: ThemeDeck, dateSeed: string): string {
  const { figures, worldDeck } = splitPocketAndWorld(deck);
  const cipher = applyDailyCipher(worldDeck, dateSeed);

  const figureRows = figures.map(renderFigureRow).join('');
  const worldRows = worldDeck.map(renderWorldRow).join('');

  return `
    <div class="oracle-guide-container">
      <header class="oracle-hero">
        <h2>📖 Guia de Oráculo Didático — ${escapeHtml(deck.name)}</h2>
        <p>${escapeHtml(deck.tagline)}</p>
        <p class="oracle-hero-helper">
          Use esta página para jogar com <strong>qualquer baralho comum de 54 cartas</strong> (52 cartas + 2 Coringas) sem precisar imprimir nada. Basta procurar abaixo a carta que você tirou na mão e seguir as instruções numeradas.
        </p>
      </header>

      <section class="oracle-rules-grid">
        <div class="oracle-rule-box">
          <h3>Passo 1: O que separar antes de começar</h3>
          <ol class="oracle-didactic-list">
            <li>
              <strong>Escolha sua Vocação (Naipe):</strong> Cada jogador escolhe um naipe (♠ Espadas, ♥ Copas, ♦ Ouros ou ♣ Paus) e retira do baralho o <strong>Rei (K)</strong>, a <strong>Dama (Q)</strong> e o <strong>Valete (J)</strong> daquele naipe.
            </li>
            <li>
              <strong>Como guardar suas 3 cartas no bolso/mesa:</strong>
              <ul>
                <li>Deixe o <strong>Rei (K)</strong> de pé e visível (é o seu personagem).</li>
                <li>Deixe a <strong>Dama (Q)</strong> de pé ao lado dele (é o seu recurso de emergência).</li>
                <li>Deixe o <strong>Valete (J)</strong> virado para baixo (você começa saudável, sem cicatriz).</li>
              </ul>
            </li>
            <li>
              <strong>O Maço do Mundo (42 cartas):</strong> Junte todas as cartas de <strong>Ás (A) até 10</strong> dos quatro naipes + os <strong>2 Coringas</strong>. Esse é o baralho de onde vocês vão puxar as cenas.
            </li>
          </ol>
        </div>

        <div class="oracle-rule-box">
          <h3>Passo 2: Quem lê o quê na hora do turno?</h3>
          <ol class="oracle-didactic-list">
            <li>
              <strong>Se for a sua vez de abrir a cena (☀ Papel de Vigia):</strong>
              Puxe a <strong>1ª carta de CIMA</strong> do maço. Procure essa carta na tabela abaixo e leia <strong>SOMENTE a coluna "☀ TOPO · O VIGIA"</strong>:
              <ul>
                <li>Espere acontecer o item <strong>1º Observe na rotina</strong> perto de você.</li>
                <li>Quando acontecer, mande mensagem/áudio (ou fale) ao parceiro contando o item <strong>2º Narre ao parceiro</strong>.</li>
              </ul>
            </li>
            <li>
              <strong>Se for a sua vez de responder (☾ Papel de Eco):</strong>
              Quando o Vigia falar com você, puxe a <strong>última carta de BAIXO</strong> do maço. Procure-a na tabela e leia <strong>SOMENTE a coluna "☾ FUNDO · O ECO"</strong>:
              <ul>
                <li>Execute na vida real o item <strong>1º O que você deve fazer agora</strong>.</li>
                <li>Aplique o item <strong>2º Regra de desfecho</strong>.</li>
              </ul>
            </li>
            <li>
              <strong>Se estiver jogando SOZINHO (Modo Solo):</strong>
              Puxe 1 carta de cima (leia o ☀ TOPO como o problema que surgiu) e 1 carta de baixo (leia o ☾ FUNDO como a tarefa que você mesmo deve fazer e registrar no celular/diário).
            </li>
          </ol>
        </div>

        <div class="oracle-rule-box">
          <h3>Passo 3: Como funcionam os Custos, a Dama (Q) e o Valete (J)?</h3>
          <ul class="oracle-didactic-list">
            <li>
              <strong>"Cumpriu a ação?":</strong> Se vocês realizaram a interação pedida no tempo/forma da carta, a cena termina em sucesso!
            </li>
            <li>
              <strong>"Girar a Dama (Q ⟳)":</strong> Sempre que uma carta disser <em>"vire sua Dama (Q ⟳)"</em> (ou quando você não puder cumprir a ação real da carta), gire sua carta de Dama deitada em 90°. Enquanto ela estiver deitada, você não pode usá-la de novo até cumprir a condição de <em>Recarga</em> dela.
            </li>
            <li>
              <strong>"Revelar o Valete (J)":</strong> Se você falhar numa cena e sua Dama (Q) já estiver deitada (ou se preferir guardar a Dama), você vira seu <strong>Valete (J)</strong> para cima. A partir desse momento, você é obrigado a respeitar o <em>Tabu Real</em> descrito no seu Valete!
            </li>
          </ul>
        </div>

        <div class="oracle-rule-box">
          <h3>Passo 4: Cifra do Dia (${escapeHtml(cipher.dateLabel)}) — Para jogar à distância</h3>
          <p>Se cada jogador estiver em sua casa com seu próprio baralho, façam estes 3 passos antes do 1º turno para deixar os dois maços exatamente na mesma ordem:</p>
          <ol class="oracle-didactic-list">
            ${cipher.steps.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}
          </ol>
          <p class="cipher-preview">
            <strong>Conferência rápida:</strong> Após embaralhar hoje, a 1ª carta de cima (☀ Vigia) será <strong>${escapeHtml(cipher.cards[0].playingCardCode)} (${escapeHtml(cipher.cards[0].title)})</strong> e a última de baixo (☾ Eco) será <strong>${escapeHtml(cipher.cards[cipher.cards.length - 1].playingCardCode)} (${escapeHtml(cipher.cards[cipher.cards.length - 1].title)})</strong>.
          </p>
        </div>
      </section>

      <section class="oracle-table-section">
        <h3>Tabela 1: Trio de Personagem no Bolso (12 Figuras: K, Q, J)</h3>
        <p class="subtitle">Consulte aqui as 3 cartas do naipe que você escolheu guardar com você:</p>
        <table class="oracle-table">
          <thead>
            <tr>
              <th>Carta</th>
              <th>Nome &amp; Papel no Bolso</th>
              <th>Instrução Principal (Como usar / O que faz)</th>
              <th>Vantagem de Naipe / Como Recarregar / Tabu Obrigatório</th>
            </tr>
          </thead>
          <tbody>${figureRows}</tbody>
        </table>
      </section>

      <section class="oracle-table-section">
        <h3>Tabela 2: Oráculo do Mundo (40 Cartas de Jornada A–10 + 2 Coringas)</h3>
        <p class="subtitle">Consulte aqui a carta que você puxou de CIMA (leia apenas a coluna ☀ TOPO) ou de BAIXO (leia apenas a coluna ☾ FUNDO):</p>
        <table class="oracle-table">
          <thead>
            <tr>
              <th>Carta</th>
              <th>Título da Cena</th>
              <th>☀ TOPO · O VIGIA (Para quem puxou de CIMA do baralho)</th>
              <th>☾ FUNDO · O ECO (Para quem puxou de BAIXO do baralho)</th>
            </tr>
          </thead>
          <tbody>${worldRows}</tbody>
        </table>
      </section>
    </div>
  `;
}
