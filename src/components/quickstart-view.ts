import { applyDailyCipher } from '../core/cipher';
import { splitPocketAndWorld } from '../data/engine-deck';
import type { ThemeDeck } from '../types/card';
import { escapeHtml, renderMagicCardHtml } from './card-renderer';

export function renderQuickstartGuideHtml(deck: ThemeDeck, dateSeed: string): string {
  const { figures, worldDeck } = splitPocketAndWorld(deck);
  const cipher = applyDailyCipher(worldDeck, dateSeed);

  const sampleTopCard = cipher.cards[0];
  const sampleBottomCard = cipher.cards[cipher.cards.length - 1];
  const sampleKing = figures.find((c) => c.rank === 'K' && c.suit === 'spades') ?? figures[0];
  const sampleQueen = figures.find((c) => c.rank === 'Q' && c.suit === 'spades') ?? figures[1];
  const sampleJack = figures.find((c) => c.rank === 'J' && c.suit === 'spades') ?? figures[2];

  return `
    <div class="quickstart-container">
      <section class="quickstart-hero">
        <div class="quickstart-hero-copy">
          <span class="quickstart-kicker">Guia Rápido de Início · 3 Minutos</span>
          <h2>Como Começar a Jogar</h2>
          <p>
            <strong>Sinaleiro</strong> é um RPG de bolso que acontece misturado à sua rotina real.
            Você e outra pessoa (ou você sozinho, no modo diário) sacam cartas em momentos combinados
            — <strong>uma por hora</strong> durante um passeio/encontro, ou <strong>uma a três vezes por dia</strong>
            à distância — transformando sinais do cotidiano em cenas do tema <strong>${escapeHtml(deck.name)}</strong>.
          </p>
          <div class="quickstart-cta-row">
            <button type="button" class="btn-primary" data-goto-tab="playtest">
              Abrir a Mesa e Sacar a 1ª Carta
            </button>
            <button type="button" class="btn-secondary" data-goto-tab="oracle">
              Jogar com Baralho Comum (Oráculo)
            </button>
            <button type="button" class="btn-ghost" data-goto-tab="print">
              Imprimir Folhas A4 (63×88mm)
            </button>
          </div>
        </div>
      </section>

      <section class="quickstart-steps-grid">
        <article class="quickstart-step-card">
          <div class="step-number">Passo 1</div>
          <h3>1. Escolha seu Material</h3>
          <p>Você pode jogar agora mesmo de três formas (e misturá-las entre os jogadores):</p>
          <ul class="quickstart-list">
            <li>
              <strong>Na tela (Zero preparo):</strong> Use a aba <em>Mesa &amp; Cifra do Dia</em> no celular ou computador.
            </li>
            <li>
              <strong>Com um baralho comum (54 cartas):</strong> Pegue qualquer baralho tradicional (52 cartas + 2 Coringas) e consulte a aba <em>Guia de Oráculo</em> para ler o significado da carta sacada.
            </li>
            <li>
              <strong>Com cartas impressas (63×88mm):</strong> Imprima as 6 páginas da aba <em>Print &amp; Play A4</em> e coloque cada recorte dentro de um sleeve padrão de Magic na frente de uma carta comum.
            </li>
          </ul>
        </article>

        <article class="quickstart-step-card">
          <div class="step-number">Passo 2</div>
          <h3>2. Separe seu Trio de Bolso (K, Q, J)</h3>
          <p>
            Antes de embaralhar, cada jogador escolhe um naipe que define sua vocação
            (<strong>♠ Espadas</strong>, <strong>♥ Copas</strong>, <strong>♦ Ouros</strong> ou <strong>♣ Paus</strong>)
            e separa para a sua carteira ou mão as <strong>3 Figuras daquele naipe</strong>:
          </p>
          <ul class="quickstart-list">
            <li>
              <strong>Rei (K) — O Arquétipo:</strong> Fica sempre aberto. É quem você é (${escapeHtml(sampleKing.title)}) e traz um hábito simples para você manter no dia.
            </li>
            <li>
              <strong>Dama (Q) — O Trunfo (${escapeHtml(sampleQueen.title)}):</strong> Começa em pé. Se uma cena apertar, <strong>vire-a 90° (⟳)</strong> para escapar do custo ou socorrer o parceiro.
            </li>
            <li>
              <strong>Valete (J) — A Cicatriz (${escapeHtml(sampleJack.title)}):</strong> Começa virado para baixo. Só entra em jogo se você sofrer um dano ou falhar sem usar sua Dama, impondo um pequeno <em>Tabu na Vida Real</em>.
            </li>
          </ul>
        </article>

        <article class="quickstart-step-card">
          <div class="step-number">Passo 3</div>
          <h3>3. Combine o Ritmo e a Cifra</h3>
          <p>
            As <strong>42 cartas restantes</strong> (Ás a 10 dos quatro naipes + os 2 Coringas) formam o <strong>Deck do Mundo</strong>.
          </p>
          <ul class="quickstart-list">
            <li>
              <strong>Juntos no mesmo lugar:</strong> Usem um único maço na mesa ou no bolso. Combinem de sacar a cada hora cheia (ou a cada mudança de lugar).
            </li>
            <li>
              <strong>Longe um do outro (Sincronia Fria):</strong> Para que dois baralhos físicos em casas diferentes fiquem na mesma ordem sem precisar de mestre, façam a <strong>Cifra do Dia (${escapeHtml(cipher.dateLabel)})</strong> em 30 segundos:
              <ol class="quickstart-mini-ol">
                <li>Organizem de Ás a 10 na ordem ♠, ♥, ♦, ♣ com os 2 Coringas no fim.</li>
                <li>Cortem <strong>${cipher.dayCut}</strong> cartas (dia) e distribuam em 3 montes alternados (juntando Centro → Esquerda → Direita).</li>
                <li>Cortem <strong>${cipher.monthCut}</strong> cartas (mês) e distribuam em 2 montes alternados (Esquerda sobre Direita).</li>
              </ol>
            </li>
          </ul>
        </article>

        <article class="quickstart-step-card">
          <div class="step-number">Passo 4</div>
          <h3>4. Exemplo Real de 1 Rodada</h3>
          <p>
            Para que os dois jogadores nunca leiam o mesmo texto mesmo tendo baralhos idênticos, um puxa de cima e o outro puxa de baixo:
          </p>
          <div class="turn-roles-summary">
            <div class="role-box role-box-vigia">
              <strong>☀ Jogador A: O Vigia (Saca a 1ª do TOPO)</strong>
              <p>Lê apenas a caixa <strong>☀ TOPO · VIGIA</strong> da carta que tirou. Espera o gatilho real acontecer ao seu redor e inicia a interação (pessoalmente ou mandando mensagem/foto).</p>
            </div>
            <div class="role-box role-box-eco">
              <strong>☾ Jogador B: O Eco (Saca a última do FUNDO)</strong>
              <p>Lê apenas a caixa <strong>☾ FUNDO · ECO</strong> da carta de baixo do maço. Responde ao parceiro cumprindo a ação proposta e aplica o efeito da rodada.</p>
            </div>
          </div>
          <p class="quickstart-note">
            Na rodada seguinte (próxima hora ou próximo turno do dia), vocês <strong>invertem os papéis</strong>: quem foi Vigia vira Eco!
          </p>
        </article>
      </section>

      <section class="quickstart-walkthrough">
        <div class="walkthrough-header">
          <div>
            <h3>Simulação Prática: Como seria a 1ª Rodada de Hoje (${escapeHtml(cipher.dateLabel)})</h3>
            <p class="subtitle">
              Veja as duas cartas que saem no topo e no fundo hoje no tema <strong>${escapeHtml(deck.name)}</strong> (clique em qualquer carta para ampliar a leitura):
            </p>
          </div>
          <button type="button" class="btn-primary" data-goto-tab="playtest">
            Jogar Esta Rodada na Mesa
          </button>
        </div>

        <div class="walkthrough-cards-row">
          <div class="walkthrough-column">
            <div class="walkthrough-step-tag">1º Movimento · Jogador no Papel de ☀ Vigia (Topo)</div>
            <div class="walkthrough-card-wrap">
              ${renderMagicCardHtml(sampleTopCard, { interactive: true, highlightRole: 'vigia' })}
            </div>
            <div class="walkthrough-dialogue">
              <strong>O que o Jogador A lê (${escapeHtml(sampleTopCard.playingCardCode)} — ${escapeHtml(sampleTopCard.title)}):</strong>
              <p>
                Observa o gatilho <em>"${escapeHtml(sampleTopCard.topWatcherTrigger ?? '')}"</em> e conta ao parceiro:
                "${escapeHtml(sampleTopCard.topWatcherEvent ?? '')}"
              </p>
            </div>
          </div>

          <div class="walkthrough-column">
            <div class="walkthrough-step-tag">2º Movimento · Jogador no Papel de ☾ Eco (Fundo)</div>
            <div class="walkthrough-card-wrap">
              ${renderMagicCardHtml(sampleBottomCard, { interactive: true, highlightRole: 'eco' })}
            </div>
            <div class="walkthrough-dialogue">
              <strong>Como o Jogador B responde (${escapeHtml(sampleBottomCard.playingCardCode)} — ${escapeHtml(sampleBottomCard.title)}):</strong>
              <p>
                Cumpre a interação <em>"${escapeHtml(sampleBottomCard.bottomEchoPrompt ?? '')}"</em> e resolve:
                "${escapeHtml(sampleBottomCard.bottomEchoEffect ?? '')}"
              </p>
            </div>
          </div>
        </div>

        <div class="walkthrough-real-life-grid">
          <article class="real-life-narrative-card">
            <h4>Como essa rodada acontece na vida real (Em Dupla)</h4>
            <ol class="narrative-timeline">
              <li>
                <strong>O saque no horário combinado:</strong> Imagine que você (Jogador A) e seu parceiro (Jogador B) combinaram de jogar às 14h (ou a cada hora num passeio). Às 14h, você é o <strong>☀ Vigia</strong>: você puxa a 1ª carta de cima do seu baralho (<strong>${escapeHtml(sampleTopCard.playingCardCode)} — ${escapeHtml(sampleTopCard.title)}</strong>) e olha apenas a parte <strong>☀ TOPO</strong>.
              </li>
              <li>
                <strong>O sinal acontece na rotina:</strong> A carta pede o gatilho: <em>"${escapeHtml(sampleTopCard.topWatcherTrigger ?? '')}"</em>. Assim que você notar isso acontecendo onde você está (no trabalho, na rua, num café ou em casa), você puxa assunto ou manda um áudio/mensagem para o Jogador B incorporando o local real à cena: <em>"${escapeHtml(sampleTopCard.topWatcherEvent ?? '')}"</em>.
              </li>
              <li>
                <strong>A resposta do parceiro:</strong> Ao receber seu aviso, o Jogador B age como <strong>☾ Eco</strong>: ele puxa a última carta de baixo do baralho dele (<strong>${escapeHtml(sampleBottomCard.playingCardCode)} — ${escapeHtml(sampleBottomCard.title)}</strong>) e lê apenas a caixa <strong>☾ FUNDO</strong>. Para ajudar você na história, ele cumpre na vida real a tarefa: <em>"${escapeHtml(sampleBottomCard.bottomEchoPrompt ?? '')}"</em>.
              </li>
              <li>
                <strong>Desfecho, Trio de Bolso e troca de papéis:</strong> Vocês conferem a resolução: <em>"${escapeHtml(sampleBottomCard.bottomEchoEffect ?? '')}"</em>. Se a carta for do naipe do seu <strong>Rei (K)</strong>, você ganha o bônus dele na hora. Se alguém não pôde cumprir a interação na rotina real, pode girar a <strong>Dama (Q ⟳)</strong> em 90° como salva-vidas ou, se a Dama já estiver gasta, virar o <strong>Valete (J)</strong> para cima e assumir seu Tabu (veja o detalhamento logo abaixo!). No próximo horário, o Jogador B será o Vigia e você será o Eco!
              </li>
            </ol>
          </article>

          <article class="real-life-narrative-card">
            <h4>E como funciona no Modo Solo (Diário / Oráculo)?</h4>
            <ol class="narrative-timeline">
              <li>
                <strong>Saque duplo num único movimento:</strong> Jogando sozinho, você usa um único baralho (físico ou na aba <em>Mesa</em> clicando no botão <strong>Modo Solo</strong>). No horário que você escolheu para o seu turno, você puxa <strong>1 carta do TOPO</strong> e <strong>1 carta do FUNDO</strong> ao mesmo tempo.
              </li>
              <li>
                <strong>A Carta do Topo é o Mundo ao seu redor:</strong> Você lê o bloco <strong>☀ TOPO</strong> da carta de cima (<strong>${escapeHtml(sampleTopCard.playingCardCode)}</strong>). Quando o gatilho real (<em>"${escapeHtml(sampleTopCard.topWatcherTrigger ?? '')}"</em>) acontecer diante de você hoje, o evento ficcional se instala no seu caminho.
              </li>
              <li>
                <strong>A Carta do Fundo é o seu Desafio Pessoal:</strong> Em vez de esperar outra pessoa, você mesmo lê o bloco <strong>☾ FUNDO</strong> da carta de baixo (<strong>${escapeHtml(sampleBottomCard.playingCardCode)}</strong>) como a reação que seu personagem precisa executar sozinho.
              </li>
              <li>
                <strong>Registro de Sobrevivente:</strong> Quando a interação pedir para "enviar ao parceiro" (uma foto, áudio ou decisão), no Modo Solo você registra isso como seu <strong>Diário de Campanha</strong> — tirando a foto no celular, gravando uma nota de voz de 15 segundos ou anotando duas linhas num bloco de notas. Se não conseguir realizar antes do próximo turno, você gira sua <strong>Dama (Q ⟳)</strong> ou ativa seu <strong>Valete (J)</strong>!
              </li>
            </ol>
          </article>
        </div>

        <div class="walkthrough-figures-explainer">
          <div class="figures-explainer-header">
            <h4>Como o Rei (K), a Dama (Q) e o Valete (J) entram em ação nessa rodada?</h4>
            <p class="subtitle">
              Enquanto as cartas de cima e de baixo contam o que acontece no mundo, as <strong>3 Figuras do seu Naipe</strong> ficam sempre com você e funcionam como sua ficha viva de personagem, seu equipamento de emergência e sua barra de ferimentos (clique em qualquer uma para ampliar):
            </p>
          </div>

          <div class="figures-explainer-grid">
            <article class="figure-role-card">
              <div class="figure-role-badge badge-king">Rei (K) · Sempre Aberto</div>
              <h5>Qual a importância do Rei (K)?</h5>
              <p class="figure-role-lead">
                O Rei é a sua <strong>identidade e bússola durante todo o dia</strong>. Ele nunca é descartado e tem duas funções práticas:
              </p>
              <ul class="figure-role-points">
                <li>
                  <strong>1. Hábito na Vida Real (Passiva):</strong> Ele dá uma pequena atitude real para você praticar ao longo do dia, mantendo você no clima do personagem mesmo quando não está sacando cartas.
                  <span class="figure-example-quote">Exemplo (${escapeHtml(sampleKing.playingCardCode)} — ${escapeHtml(sampleKing.title)}): "${escapeHtml(sampleKing.figurePassiveOrRule ?? '')}"</span>
                </li>
                <li>
                  <strong>2. Vantagem Automática de Naipe (Sinergia):</strong> Toda vez que a carta sacada na rodada for do <strong>mesmo naipe do seu Rei</strong>, seu personagem domina a situação e ativa um bônus imediato!
                  <span class="figure-example-quote">Exemplo: "${escapeHtml(sampleKing.figureSpecialOrTaboo ?? '')}"</span>
                </li>
              </ul>
              <div class="figure-card-mini-preview">
                ${renderMagicCardHtml(sampleKing, { interactive: true })}
              </div>
            </article>

            <article class="figure-role-card">
              <div class="figure-role-badge badge-queen">Dama (Q ⟳) · Começa em Pé</div>
              <h5>Qual é o efeito da Dama (Q)?</h5>
              <p class="figure-role-lead">
                A Dama é o seu <strong>Trunfo de Emergência (salva-vidas)</strong>. Na vida real, imprevistos acontecem: às vezes você está ocupado e não consegue cumprir a tarefa do Eco, ou a carta exige um custo pesado demais.
              </p>
              <ul class="figure-role-points">
                <li>
                  <strong>1. Virar em 90° para Salvar a Rodada (⟳ Tap):</strong> Quando não puder cumprir o desafio da carta (ou quiser anular um perigo), você <strong>deita a sua Dama em 90°</strong> e ativa o efeito especial dela. A rodada é vencida na hora, sem punição!
                  <span class="figure-example-quote">Exemplo (${escapeHtml(sampleQueen.playingCardCode)} — ${escapeHtml(sampleQueen.title)}): "${escapeHtml(sampleQueen.figurePassiveOrRule ?? '')}"</span>
                </li>
                <li>
                  <strong>2. Recarregar na Rotina (Untap):</strong> Enquanto estiver deitada, a Dama está "gasta" e não pode ser usada de novo. Para colocá-la em pé novamente, basta cumprir na vida real a condição de recarga dela:
                  <span class="figure-example-quote">Exemplo: "${escapeHtml(sampleQueen.figureSpecialOrTaboo ?? '')}"</span>
                </li>
              </ul>
              <div class="figure-card-mini-preview">
                ${renderMagicCardHtml(sampleQueen, { interactive: true })}
              </div>
            </article>

            <article class="figure-role-card">
              <div class="figure-role-badge badge-jack">Valete (J) · Começa Virado para Baixo</div>
              <h5>Qual é o efeito do Valete (J)?</h5>
              <p class="figure-role-lead">
                O Valete é a sua <strong>Cicatriz (penalidade)</strong>. Ele começa <strong>fechado (inativo)</strong>, e o seu objetivo é evitar que ele vire para cima!
              </p>
              <ul class="figure-role-points">
                <li>
                  <strong>1. Quando ele entra em jogo:</strong> Se você falhar na missão de uma rodada (ou recusar pagar o custo da carta) e <strong>sua Dama (Q) já estiver gasta/deitada</strong>, você é obrigado a revelar seu Valete para cima.
                  <span class="figure-example-quote">Gatilho (${escapeHtml(sampleJack.playingCardCode)} — ${escapeHtml(sampleJack.title)}): "${escapeHtml(sampleJack.figurePassiveOrRule ?? '')}"</span>
                </li>
                <li>
                  <strong>2. O Tabu na Vida Real:</strong> Enquanto o Valete estiver virado para cima, seu personagem está ferido ou traumatizado. Você passa a ter uma <strong>proibição real de fala ou comportamento</strong> em todas as interações com o parceiro (ou no seu diário solo)! Se você esquecer e quebrar o Tabu, ou se falhar de novo com o Valete já aberto, o Relógio da dupla perde <strong>-1 ponto</strong>.
                  <span class="figure-example-quote">Tabu Real: "${escapeHtml(sampleJack.figureSpecialOrTaboo ?? '')}"</span>
                </li>
              </ul>
              <div class="figure-card-mini-preview">
                ${renderMagicCardHtml(sampleJack, { interactive: true })}
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  `;
}
