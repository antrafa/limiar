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
      ? 'Convite narrativo na rotina (não obrigatório):'
      : c.kind === 'trump_queen'
        ? 'Quando girar esta carta 90° (Ativar Dama ⟳):'
        : 'Quando revelar esta carta (Gatilho de Entrada):';

  const labelSecondary =
    c.kind === 'archetype_king'
      ? 'Sinergia quando sair carta deste naipe:'
      : c.kind === 'trump_queen'
        ? 'Como recarregar para usar de novo (Regra-base: ♦ Ouros A–10):'
        : 'Tabu enquanto aberto (somente nas interações do jogo):';

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
        <h2>📖 Guia de Oráculo Didático (Limiar v1.1) — ${escapeHtml(deck.name)}</h2>
        <p>${escapeHtml(deck.tagline)}</p>
        <p class="oracle-hero-helper">
          Use esta página para jogar <strong>Limiar</strong> com <strong>qualquer baralho comum de 54 cartas</strong> (52 cartas + 2 Coringas) sem precisar imprimir nada. Basta procurar abaixo a carta que você tirou na mão e seguir as instruções numeradas. <strong>Lembre-se da regra de ouro (Edição 1.1):</strong> toda ação física, foto, áudio ou toque é opcional e pode ser substituído por uma simples narração ou decisão em texto, e qualquer jogador pode dizer <em>"pausa"</em> ou <em>"passo"</em> sem penalidade.
        </p>
      </header>

      <section class="oracle-rules-grid">
        <div class="oracle-rule-box">
          <h3>1. Preparação: Seu Trio de Bolso (K, Q, J)</h3>
          <ol class="oracle-didactic-list">
            <li>
              <strong>Escolha sua Vocação (Naipe):</strong> Retire as 12 figuras do baralho. Cada jogador escolhe um naipe (♠ Espadas, ♥ Copas, ♦ Ouros ou ♣ Paus) e recebe o <strong>Rei (K)</strong>, a <strong>Dama (Q)</strong> e o <strong>Valete (J)</strong> daquele naipe.
            </li>
            <li>
              <strong>Como funcionam as 3 figuras (Edição 1.1):</strong>
              <ul>
                <li><strong>Rei (K) — Identidade:</strong> Fica aberto durante toda a campanha. As atitudes de rotina sugeridas são <em>convites narrativos, não obrigações</em>, e concede a sinergia de naipe.</li>
                <li><strong>Dama (Q ⟳) — Proteção:</strong> Começa aberta e pronta. Gire-a 90° para ativar seu efeito ou evitar uma consequência quando permitido. Recarrega ao cumprir com sucesso qualquer carta de <strong>♦ Ouros (Ás a 10)</strong>.</li>
                <li><strong>Valete (J) — Cicatriz:</strong> Começa fechado (face para baixo). Quando revelado por falha grave sem Dama pronta, ativa o tabu <em>somente dentro das interações do jogo</em> até ser curado.</li>
              </ul>
            </li>
            <li>
              <strong>Deck do Mundo (42 cartas):</strong> As 40 cartas numeradas (Ás a 10) + 1 Coringa Claro (★) + 1 Coringa Escuro (💀).
            </li>
          </ol>
        </div>

        <div class="oracle-rule-box">
          <h3>2. Rodada (Vigia &amp; Eco) e Prazo dos Gatilhos</h3>
          <ol class="oracle-didactic-list">
            <li>
              <strong>Primeiro papel — ☀ Vigia (Topo):</strong>
              Retira a carta disponível no <strong>topo</strong> do próprio baralho e lê <strong>somente a coluna "☀ TOPO · O VIGIA"</strong>:
              <ul>
                <li><strong>Prazo de até 2 horas:</strong> Aguarde o gatilho do item <strong>1º Observe na rotina</strong> por até 2h. Se não acontecer, escolha um <em>gatilho substituto simples e seguro</em> ou <em>adie a carta sem penalidade</em>.</li>
                <li>Quando ativar, envie uma mensagem curta narrando o evento do item <strong>2º Narre ao parceiro</strong> (sem consultar a carta do fundo).</li>
              </ul>
            </li>
            <li>
              <strong>Segundo papel — ☾ Eco (Fundo):</strong>
              Depois de receber a cena, retira a carta disponível no <strong>fundo</strong> do próprio baralho e lê <strong>somente a coluna "☾ FUNDO · O ECO"</strong>:
              <ul>
                <li>Aplica a reação do item <strong>1º O que você deve fazer agora</strong> à cena do Vigia. <em>Toda ação física (foto, áudio, toque, deslocamento) é opcional e pode ser substituída por uma descrição ou escolha narrada.</em></li>
                <li>Na rodada seguinte, os papéis se invertem.</li>
              </ul>
            </li>
            <li>
              <strong>Modo Solo:</strong>
              Retire 1 carta do topo (aguarde o gatilho até 2h ou use substituto seguro) e, quando ativar, retire 1 carta do fundo, respondendo em voz, texto ou diário.
            </li>
          </ol>
        </div>

        <div class="oracle-rule-box">
          <h3>3. Ordem de Prioridade (7 Passos), Colapso e Campanha</h3>
          <ol class="oracle-didactic-list">
            <li><strong>1º Segurança e limites reais:</strong> Qualquer jogador pode dizer <em>"pausa"</em> ou <em>"passo"</em>, adaptar ou substituir qualquer ação insegura/inconveniente sem penalidade.</li>
            <li><strong>2º Ação do Eco</strong> → <strong>3º Efeito específico da carta</strong> (Sucesso, Sucesso com custo, Falha ou Escolha narrativa).</li>
            <li><strong>4º Sinergia do Rei (K)</strong> → <strong>5º Dama (Q ⟳)</strong> → <strong>6º Consequência</strong> → <strong>7º Valete (J) e Colapso</strong>.</li>
            <li><strong>Colapso:</strong> Ocorre quando uma nova falha exigiria revelar/agravar um Valete já ativo e sua Dama está esgotada. O parceiro pode evitar o Colapso gastando a própria Dama pronta (se ela permitir).</li>
            <li><strong>Campanha e Marcos:</strong> Curta (<strong>6 rodadas</strong> → título), Padrão (<strong>12 rodadas</strong> → habilidade narrativa única) ou Longa (<strong>18 rodadas</strong> → epílogo/carta de memória).</li>
          </ol>
        </div>

        <div class="oracle-rule-box">
          <h3>4. Cifra do Dia (${escapeHtml(cipher.dateLabel)}) — Sincronia à Distância</h3>
          <p>Sincroniza a ordem inicial de dois baralhos independentes (cada jogador retira de uma extremidade diferente conforme os turnos):</p>
          <ol class="oracle-didactic-list">
            ${cipher.steps.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}
          </ol>
          <p class="cipher-preview">
            <strong>Conferência rápida:</strong> Após a Cifra de hoje, a 1ª carta de cima (☀ Vigia) será <strong>${escapeHtml(cipher.cards[0].playingCardCode)} (${escapeHtml(cipher.cards[0].title)})</strong> e a última de baixo (☾ Eco) será <strong>${escapeHtml(cipher.cards[cipher.cards.length - 1].playingCardCode)} (${escapeHtml(cipher.cards[cipher.cards.length - 1].title)})</strong>.
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
