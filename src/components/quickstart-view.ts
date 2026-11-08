import { splitPocketAndWorld } from '../data/engine-deck';
import type { ThemeDeck } from '../types/card';
import { escapeHtml, renderMagicCardHtml } from './card-renderer';

export function renderQuickstartGuideHtml(deck: ThemeDeck): string {
  const { figures, worldDeck } = splitPocketAndWorld(deck);

  const sampleTopCard = worldDeck.find((c) => c.playingCardCode === '6♣') ?? worldDeck[0];
  const sampleBottomCard = worldDeck.find((c) => c.playingCardCode === '7♠') ?? worldDeck[worldDeck.length - 1];
  const sampleKing = figures.find((c) => c.rank === 'K' && c.suit === 'spades') ?? figures[0];
  const sampleQueen = figures.find((c) => c.rank === 'Q' && c.suit === 'spades') ?? figures[1];
  const sampleJack = figures.find((c) => c.rank === 'J' && c.suit === 'spades') ?? figures[2];

  return `
    <div class="quickstart-container">
      <section class="quickstart-hero">
        <div class="quickstart-hero-grid">
          <div class="quickstart-hero-copy">
            <span class="quickstart-kicker">Manual Revisado · Edição 1.1 · Guia Rápido em 5 Minutos</span>
            <h2>LIMIAR — Como Começar a Jogar</h2>
            <p class="quickstart-lead-slogan">
              <em>"O jogo que acontece na sua realidade — O Jogo que Ultrapassa a Mesa."</em>
            </p>
            <p>
              <strong>Limiar</strong> é um RPG narrativo cooperativo de bolso em que sinais do cotidiano disparam cenas de uma aventura compartilhada.
              Um jogador observa e narra (<strong>☀ Vigia</strong>); o outro reage (<strong>☾ Eco</strong>). A história continua entre uma rodada e outra, dentro do ritmo normal da vida — usando qualquer baralho de 54 cartas ou cartas impressas no tamanho padrão de Magic/Poker (63mm × 88mm) no universo <strong>${escapeHtml(deck.name)}</strong>.
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
          <figure class="quickstart-hero-artwork">
            <img
              src="/limiar-banner.png"
              alt="Limiar — O Jogo que Ultrapassa a Mesa: três portais para Zona de Quarentena, Sangue & Néon e O Último Eclipse"
              loading="eager"
            />
            <figcaption>Arte Oficial · Limiar: O Jogo que Ultrapassa a Mesa (3 Universos · 162 Cartas)</figcaption>
          </figure>
        </div>
      </section>

      <section class="quickstart-steps-grid">
        <article class="quickstart-step-card">
          <div class="step-number">Passo 1</div>
          <h3>1. Escolha seu Material</h3>
          <p>Limiar pode ser jogado em três formatos (e o aplicativo é opcional):</p>
          <ul class="quickstart-list">
            <li>
              <strong>1. Baralho comum (54 cartas):</strong> Um baralho tradicional (52 cartas + 2 coringas). Use as tabelas da aba <em>Guia de Oráculo</em> para consultar os efeitos.
            </li>
            <li>
              <strong>2. Cartas impressas (63×88mm):</strong> Imprima as 6 páginas da aba <em>Print &amp; Play A4</em> no tamanho padrão de pôquer/Magic, com frente temática e identificação clara do naipe e valor.
            </li>
            <li>
              <strong>3. Digital (Web):</strong> Use a aba <em>Mesa de Jogo</em> direto no celular ou computador.
            </li>
          </ul>
        </article>

        <article class="quickstart-step-card">
          <div class="step-number">Passo 2</div>
          <h3>2. Separe seu Trio de Bolso (K, Q, J)</h3>
          <p>
            Retire do baralho as 12 figuras (os quatro Reis, Damas e Valetes). Cada jogador escolhe um naipe que representa sua vocação
            (<strong>♠ Espadas</strong>, <strong>♥ Copas</strong>, <strong>♦ Ouros</strong> ou <strong>♣ Paus</strong>)
            e recebe as <strong>3 figuras desse naipe</strong>:
          </p>
          <ul class="quickstart-list">
            <li>
              <strong>Rei (K) — Identidade (${escapeHtml(sampleKing.title)}):</strong> Fica aberto durante toda a campanha. Oferece um convite narrativo para a rotina (não obrigatório) e concede a sinergia descrita na carta.
            </li>
            <li>
              <strong>Dama (Q) — Proteção (${escapeHtml(sampleQueen.title)}):</strong> Começa aberta e pronta (em pé). Pode ser virada 90° (⟳) para ativar seu poder ou evitar uma consequência. Uma Dama deitada está esgotada até ser recarregada (cumprindo uma carta de ♦ Ouros).
            </li>
            <li>
              <strong>Valete (J) — Cicatriz (${escapeHtml(sampleJack.title)}):</strong> Começa fechado (face para baixo). Quando revelado por uma falha grave sem Dama pronta, ativa o tabu descrito na carta somente dentro das interações do jogo.
            </li>
          </ul>
        </article>

        <article class="quickstart-step-card">
          <div class="step-number">Passo 3</div>
          <h3>3. Embaralhe o Deck do Mundo</h3>
          <p>
            As <strong>42 cartas restantes</strong> (Ás a 10 dos quatro naipes + Coringa Claro ★ e Coringa Escuro 💀) formam o <strong>Deck do Mundo</strong>. As 12 figuras não entram nesse deck.
          </p>
          <ul class="quickstart-list">
            <li>
              <strong>Partida presencial:</strong> Embaralhem livremente as 42 cartas e coloquem o maço no centro da mesa. Um único baralho é suficiente.
            </li>
            <li>
              <strong>Partida à distância (Baralhos Livres):</strong> Não é preciso sincronizar a ordem das cartas! Cada jogador simplesmente <strong>embaralha normalmente o seu próprio maço de 42 cartas</strong> (ou clica em <em>Embaralhar Novo Maço</em> na Mesa).
            </li>
            <li>
              <strong>Ritmo combinado:</strong> Combinem de jogar 1 rodada a cada hora durante um passeio, ou 1 a 3 rodadas ao longo do dia por mensagem/áudio.
            </li>
          </ul>
        </article>

        <article class="quickstart-step-card">
          <div class="step-number">Passo 4</div>
          <h3>4. Topo (Cena) vs. Fundo (Reação Imprevisível)</h3>
          <p>
            Em dupla, cada rodada combina <strong>duas cartas diferentes</strong> (uma para abrir a cena e outra para definir a reação) garantindo 100% de surpresa:
          </p>
          <div class="turn-roles-summary">
            <div class="role-box role-box-vigia">
              <strong>☀ Primeiro Papel: Vigia (Topo — A Cena)</strong>
              <p>Retira uma carta do topo e lê somente a coluna <strong>☀ TOPO</strong>. Aguarda o gatilho por <strong>até 2 horas</strong> (ou usa um gatilho substituto simples e seguro) e envia ao parceiro uma mensagem curta narrando o evento ficcional.</p>
            </div>
            <div class="role-box role-box-eco">
              <strong>☾ Segundo Papel: Eco (Fundo — A Reação)</strong>
              <p>Depois de receber a cena, retira uma carta do fundo e lê somente a coluna <strong>☾ FUNDO</strong>. Aplica a ação sugerida à cena narrada pelo Vigia (toda ação física pode ser substituída por narração/decisão).</p>
            </div>
          </div>
          <p class="quickstart-note">
            <strong>Alternância:</strong> Na rodada seguinte, os papéis se invertem (quem foi Vigia vira Eco; quem foi Eco vira Vigia).
          </p>
        </article>
      </section>

      <section class="quickstart-walkthrough">
        <div class="walkthrough-header">
          <div>
            <h3>Simulação Prática: Exemplo de Rodada em ${escapeHtml(deck.name)}</h3>
            <p class="subtitle">
              Veja como duas cartas sorteadas livremente no tema <strong>${escapeHtml(deck.name)}</strong> se conectam na prática (clique em qualquer carta para ampliar a leitura):
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
                <strong>O saque no horário combinado:</strong> Imagine que você (Jogador A) e seu parceiro (Jogador B) combinaram uma rodada pela manhã e outra à noite (ou a cada hora num passeio). Você começa como <strong>☀ Vigia</strong>: retira a 1ª carta de cima do seu baralho (<strong>${escapeHtml(sampleTopCard.playingCardCode)} — ${escapeHtml(sampleTopCard.title)}</strong>) e lê apenas a parte <strong>☀ TOPO</strong>.
              </li>
              <li>
                <strong>O sinal acontece na rotina (Prazo de até 2h):</strong> A carta pede o gatilho: <em>"${escapeHtml(sampleTopCard.topWatcherTrigger ?? '')}"</em>. Você aguarda até 2 horas na sua rotina normal (se não acontecer, pode usar um gatilho substituto seguro ou adiar a carta sem penalidade). Quando notar o sinal, envie uma mensagem curta narrando o evento ficcional: <em>"${escapeHtml(sampleTopCard.topWatcherEvent ?? '')}"</em>.
              </li>
              <li>
                <strong>A resposta imprevisível do parceiro (Carta do Fundo):</strong> Ao receber a cena, o Jogador B age como <strong>☾ Eco</strong>: ele retira a última carta de baixo do próprio baralho (<strong>${escapeHtml(sampleBottomCard.playingCardCode)} — ${escapeHtml(sampleBottomCard.title)}</strong>) e lê apenas a coluna <strong>☾ FUNDO</strong>. Ele aplica a reação diretamente à cena que você narrou: <em>"${escapeHtml(sampleBottomCard.bottomEchoPrompt ?? '')}"</em> (lembrando que fotos, áudios ou gestos são opcionais e podem ser substituídos por narração escrita).
              </li>
              <li>
                <strong>Ordem de Prioridade e Alternância:</strong> Vocês resolvem o desfecho (<em>"${escapeHtml(sampleBottomCard.bottomEchoEffect ?? '')}"</em>) verificando a Sinergia do <strong>Rei (K)</strong>, o uso opcional da <strong>Dama (Q ⟳)</strong> ou a revelação do <strong>Valete (J)</strong>. Na rodada seguinte, vocês invertem os papéis!
              </li>
            </ol>
          </article>

          <article class="real-life-narrative-card">
            <h4>E como funciona no Modo Solo (Diário / Oráculo)?</h4>
            <ol class="narrative-timeline">
              <li>
                <strong>1. Retire uma carta do topo:</strong> No modo solo, você controla o protagonista e o narrador. Retire 1 carta do topo e leia apenas a coluna <strong>☀ TOPO</strong> (<strong>${escapeHtml(sampleTopCard.playingCardCode)}</strong>).
              </li>
              <li>
                <strong>2. Aguarde o gatilho por até 2 horas:</strong> Espere o gatilho acontecer normalmente na sua rotina (<em>"${escapeHtml(sampleTopCard.topWatcherTrigger ?? '')}"</em>) ou escolha um substituto seguro.
              </li>
              <li>
                <strong>3. Quando a cena for ativada, retire do fundo:</strong> Só depois que a cena do Topo disparar, retire 1 carta do fundo do baralho (<strong>${escapeHtml(sampleBottomCard.playingCardCode)}</strong>) e leia a coluna <strong>☾ FUNDO</strong>.
              </li>
              <li>
                <strong>4. Responda em voz, texto ou diário e resolva:</strong> Adapte qualquer instrução dirigida ao parceiro para uma escolha narrativa ou registro de uma ou duas frases no seu diário de campanha, resolvendo o efeito com seu Trio de Bolso (<strong>K, Q, J</strong>).
              </li>
            </ol>
          </article>
        </div>

        <div class="walkthrough-figures-explainer">
          <div class="figures-explainer-header">
            <h4>Como o Rei (K), a Dama (Q) e o Valete (J) entram em ação nessa rodada?</h4>
            <p class="subtitle">
              Em <strong>Limiar</strong>, as 3 Figuras do seu Naipe ficam sempre com você e funcionam como identidade, proteção e cicatriz (clique em qualquer carta para ampliar):
            </p>
          </div>

          <div class="figures-explainer-grid">
            <article class="figure-role-card">
              <div class="figure-role-badge badge-king">Rei (K) · Identidade · Sempre Aberto</div>
              <h5>Qual a importância do Rei (K)?</h5>
              <p class="figure-role-lead">
                O Rei fica aberto durante toda a campanha. Ele representa a vocação do personagem e possui duas regras:
              </p>
              <ul class="figure-role-points">
                <li>
                  <strong>1. Convite Narrativo na Rotina (Passiva):</strong> Sugere uma pequena interpretação temática para o seu dia. <em>Importante (v1.1):</em> as atitudes sugeridas pelo Rei são <strong>convites narrativos, não obrigações</strong> — não precisam ser realizadas se forem inconvenientes, inseguras ou inadequadas ao contexto.
                  <span class="figure-example-quote">Exemplo (${escapeHtml(sampleKing.playingCardCode)} — ${escapeHtml(sampleKing.title)}): "${escapeHtml(sampleKing.figurePassiveOrRule ?? '')}"</span>
                </li>
                <li>
                  <strong>2. Sinergia de Naipe:</strong> Quando a condição de naipe da rodada é atendida, você aplica gratuitamente a habilidade do seu Rei! (O Rei de Ouros K♦ possui recarga automática aplicada apenas ao seu portador).
                  <span class="figure-example-quote">Exemplo: "${escapeHtml(sampleKing.figureSpecialOrTaboo ?? '')}"</span>
                </li>
              </ul>
              <div class="figure-card-mini-preview">
                ${renderMagicCardHtml(sampleKing, { interactive: true })}
              </div>
            </article>

            <article class="figure-role-card">
              <div class="figure-role-badge badge-queen">Dama (Q ⟳) · Proteção · Começa Pronta</div>
              <h5>Qual é o efeito da Dama (Q)?</h5>
              <p class="figure-role-lead">
                A Dama é um recurso individual e limitado de proteção. Ela não transforma automaticamente qualquer tentativa em vitória: só produz o efeito descrito na sua carta ou na regra que autorizou seu uso.
              </p>
              <ul class="figure-role-points">
                <li>
                  <strong>1. Ativação (Gire 90° ⟳):</strong> Para ativá-la, gire-a 90° e aplique o efeito descrito na própria carta, ou gaste-a quando uma carta permitir evitar uma consequência. Uma Dama deitada está esgotada e não pode ser ativada novamente até ser recarregada.
                  <span class="figure-example-quote">Exemplo (${escapeHtml(sampleQueen.playingCardCode)} — ${escapeHtml(sampleQueen.title)}): "${escapeHtml(sampleQueen.figurePassiveOrRule ?? '')}"</span>
                </li>
                <li>
                  <strong>2. Recarga-Base com ♦ Ouros (Untap):</strong> Como regra-base, <strong>cumprir com sucesso uma carta de Ouros (♦, de Ás a 10)</strong> recarrega a Dama do jogador que realizou a ação (além das condições específicas descritas na carta).
                  <span class="figure-example-quote">Exemplo: "${escapeHtml(sampleQueen.figureSpecialOrTaboo ?? '')}"</span>
                </li>
              </ul>
              <div class="figure-card-mini-preview">
                ${renderMagicCardHtml(sampleQueen, { interactive: true })}
              </div>
            </article>

            <article class="figure-role-card">
              <div class="figure-role-badge badge-jack">Valete (J) · Cicatriz &amp; Colapso</div>
              <h5>Qual é o efeito do Valete (J)?</h5>
              <p class="figure-role-lead">
                O Valete começa fechado (face para baixo) e é revelado quando o jogador sofre uma falha grave sem ter uma Dama pronta para absorver a consequência, ou quando um efeito determina sua revelação.
              </p>
              <ul class="figure-role-points">
                <li>
                  <strong>1. Tabu Somente Dentro do Jogo:</strong> Quando aberto, aplique o tabu escrito na carta <strong>somente dentro das interações do jogo</strong> até que uma carta ou habilidade o cure. Quebrar um tabu não é falha de caráter nem gera punição real (comunicação urgente, trabalho e necessidades reais têm sempre prioridade).
                  <span class="figure-example-quote">Gatilho (${escapeHtml(sampleJack.playingCardCode)} — ${escapeHtml(sampleJack.title)}): "${escapeHtml(sampleJack.figurePassiveOrRule ?? '')}"</span>
                </li>
                <li>
                  <strong>2. Regra de Colapso:</strong> Um personagem entra em <strong>Colapso</strong> (estado puramente ficcional) quando uma nova falha exigiria revelar ou agravar um Valete já ativo e sua Dama está esgotada. Em partida cooperativa, o parceiro pode evitar o Colapso gastando a própria Dama pronta (se ela permitir essa proteção); caso contrário, a campanha termina em derrota narrativa e o grupo pode escrever um epílogo.
                  <span class="figure-example-quote">Tabu no Jogo: "${escapeHtml(sampleJack.figureSpecialOrTaboo ?? '')}"</span>
                </li>
              </ul>
              <div class="figure-card-mini-preview">
                ${renderMagicCardHtml(sampleJack, { interactive: true })}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="quickstart-v11-rules-section">
        <div class="v11-section-header">
          <span class="quickstart-kicker">Referência Oficial · Edição Revisada 1.1</span>
          <h3>Regras de Resolução, Campanha e Segurança na Vida Real</h3>
          <p class="subtitle">
            As regras desta edição foram organizadas para reduzir ambiguidades, facilitar o primeiro jogo e proteger a rotina e a segurança dos participantes.
          </p>
        </div>

        <div class="v11-rules-grid">
          <article class="v11-rule-card">
            <h4>⚖️ 1.5. Ordem de Prioridade na Resolução (7 Passos)</h4>
            <p>Quando a ação do Eco for concluída, resolvam os efeitos exatamente nesta ordem:</p>
            <ol class="quickstart-mini-ol">
              <li><strong>Segurança e limites reais:</strong> qualquer jogador pode adaptar, substituir ou ignorar uma ação insegura, invasiva ou inconveniente, sem penalidade.</li>
              <li><strong>Ação do Eco:</strong> o jogador declara o que seu personagem tenta fazer (decisão narrada ou mensagem resolve a cena).</li>
              <li><strong>Efeito específico da carta:</strong> leiam o desfecho na carta do Eco e verifiquem se a condição foi cumprida (<em>Sucesso</em>, <em>Sucesso com custo</em> ou <em>Falha</em>).</li>
              <li><strong>Sinergia do Rei (K):</strong> aplique a habilidade do Rei envolvido, se a condição de naipe for atendida.</li>
              <li><strong>Dama (Q ⟳):</strong> o jogador pode ativar uma Dama pronta se o texto da carta ou a regra permitir.</li>
              <li><strong>Consequência:</strong> se a condição não foi cumprida e nenhuma proteção foi usada, aplique a falha indicada.</li>
              <li><strong>Valete (J) e Colapso:</strong> revele o Valete ou verifique o Colapso, quando aplicável.</li>
            </ol>
          </article>

          <article class="v11-rule-card">
            <h4>🏆 1.9. Duração da Campanha, Marcos e Encerramento</h4>
            <p>Não é necessário esgotar as 42 cartas. Escolha a duração da campanha antes de começar:</p>
            <ul class="quickstart-list">
              <li><strong>Campanha curta (6 rodadas — 3 cenas cada):</strong> Ao concluir, cada jogador escolhe uma <em>frase de título</em> para seu personagem (ex.: "O Sobrevivente do Viaduto").</li>
              <li><strong>Campanha padrão (12 rodadas):</strong> Cada jogador escolhe uma <em>habilidade narrativa pequena</em>, aprovada pelo grupo, usada uma única vez na próxima campanha.</li>
              <li><strong>Campanha longa (18 rodadas):</strong> O grupo desbloqueia um <em>epílogo especial</em> ou cria uma <em>carta de memória</em> para a próxima campanha.</li>
            </ul>
            <div class="v11-closing-questions">
              <strong>Ao fim da campanha, cada jogador responde:</strong>
              <ol class="quickstart-mini-ol">
                <li>Qual foi a cena mais marcante?</li>
                <li>Qual escolha mudou a história?</li>
                <li>Qual personagem ou ameaça merece voltar em outra campanha?</li>
              </ol>
            </div>
          </article>

          <article class="v11-rule-card">
            <h4>🛡️ 1.8. Segurança, Privacidade e Acessibilidade</h4>
            <p><strong>Limiar deve caber na vida real, não colocar a vida real em risco:</strong></p>
            <ul class="quickstart-list">
              <li>Nunca jogue enquanto dirige, pedala, atravessa ruas, opera máquinas ou realiza tarefas que exijam atenção.</li>
              <li>Não corra, suba em lugares, toque em objetos perigosos, mexa em instalações elétricas, abra portas desconhecidas ou se aproxime de pessoas/animais por causa de uma carta.</li>
              <li>Não fotografe nem grave terceiros sem consentimento. Não compartilhe endereço, localização em tempo real, placas ou dados privados.</li>
              <li>Não faça desafios que envolvam prender a respiração, ingerir substâncias, consumir alimentos, gastar dinheiro ou alterar medicação.</li>
              <li><strong>"Pausa" ou "Passo":</strong> Qualquer jogador pode dizer "pausa" ou "passo" a qualquer momento, sem punição.</li>
              <li><strong>Ficção em 1º lugar:</strong> Toda ação física (foto, áudio, toque, deslocamento) é apenas ambientação opcional. Narrar ou escrever o que o personagem faria sempre valida a jogada. Prazos curtos (ex.: 10 min) são ritmo ficcional e não se sobrepõem ao prazo-base de até 2 horas.</li>
            </ul>
          </article>

          <article class="v11-rule-card">
            <h4>⚡ A.4. Resumo Rápido para Ensinar em 5 Minutos</h4>
            <ol class="quickstart-mini-ol">
              <li>Escolha um universo e um naipe.</li>
              <li>Pegue seu Rei, Dama e Valete daquele naipe.</li>
              <li>Monte o Deck do Mundo com 40 cartas numeradas e 2 coringas.</li>
              <li>O <strong>Vigia</strong> compra do topo e lê a parte do topo.</li>
              <li>Quando o gatilho acontecer, narra a cena ao parceiro.</li>
              <li>O <strong>Eco</strong> compra do fundo, lê a parte do fundo e responde à cena.</li>
              <li>Resolva o efeito usando o Rei, a Dama e o Valete.</li>
              <li>Na rodada seguinte, troquem os papéis.</li>
              <li>Se algo não for seguro ou conveniente, adaptem ou pulem sem penalidade.</li>
              <li>Joguem seis rodadas e conversem sobre o que funcionou.</li>
            </ol>
          </article>
        </div>
      </section>
    </div>
  `;
}
