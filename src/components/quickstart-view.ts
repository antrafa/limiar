import { CLASSES, NAIPES, REGRA, SIMBOLO, VIRA_NO_DIA } from '../core/partida';
import type { ThemeDeck } from '../types/card';
import { escapeHtml, renderMagicCardHtml } from './card-renderer';

const PASSOS = [
  {
    titulo: 'Abra uma cena, quando quiser',
    texto: 'Vire a carta do topo do seu baralho. Ela é o que vai acontecer na história. Não há hora marcada: uma cena aberta por pessoa.',
  },
  {
    titulo: 'Diga o que ela é na sua vida',
    texto: 'Em uma frase: o que do seu dia vira aquela carta. <q>A reunião das 14h é a ponte.</q> O naipe ajuda a escolher.',
  },
  {
    titulo: 'O Eco faz a leitura',
    texto: 'O Eco lê a <strong>História</strong> da carta e diz onde ela aparece nessa situação. A cena só começa depois disso.',
  },
  {
    titulo: 'Viva o seu dia',
    texto: `Se o <strong>sinal</strong> da carta aparecer, conte ao Eco; quando ele disser o que aquilo é na história, vale +${REGRA.bonusSinal}. Fez o <strong>gesto</strong> da carta? +${REGRA.bonusGesto}. Os dois são convites, nunca tarefas.`,
  },
  {
    titulo: 'Peça reforço, se precisar',
    texto: `Outra pessoa pode ajudar: perde 1 de Fôlego e a cena ganha +${REGRA.bonusAjuda}. O Valete dá +${REGRA.bonusValete}, uma vez por campanha.`,
  },
  {
    titulo: 'O Eco vira o desfecho',
    texto: `Quando aquilo acabar na vida real, o Eco vira a carta de <strong>baixo do baralho dele</strong>. Fundo + bônus contra o topo: passou, vitória e troféu; até ${REGRA.folgaDoCusto} abaixo, vitória com custo; mais que isso, a cena venceu.`,
  },
  {
    titulo: 'O Eco narra',
    texto: 'Em poucas frases, o que a reunião, o almoço ou o trânsito foram na história. Aí a cena fecha.',
  },
];

export function renderQuickstartGuideHtml(deck: ThemeDeck): string {
  const exemplo = deck.cards.find((c) => c.suit === 'spades' && c.rank === '7') ?? deck.cards[0];
  const trio = ['K', 'Q', 'J'].map((rank) => deck.cards.find((c) => c.suit === 'spades' && c.rank === rank)).filter(Boolean);

  const classes = NAIPES.map(
    (n) => `
      <div class="class-row">
        <span class="class-suit suit-${n}">${SIMBOLO[n]}</span>
        <div>
          <strong>${CLASSES[n].nome}</strong> <span class="muted">· ${escapeHtml(deck.suits[n].vocationName)}</span>
          <p>Ao vencer uma cena de ${SIMBOLO[n]}: ${CLASSES[n].descricao}</p>
        </div>
      </div>`,
  ).join('');

  const naipes = NAIPES.map(
    (n) => `<tr><th scope="row" class="suit-${n} big-suit">${SIMBOLO[n]}</th><td><strong>${VIRA_NO_DIA[n].tipo}</strong></td><td>${VIRA_NO_DIA[n].vira}: ${VIRA_NO_DIA[n].exemplos}</td></tr>`,
  ).join('');

  return `
    <div class="guide">
      <section class="hero">
        <div class="hero-copy">
          <span class="eyebrow">${escapeHtml(deck.name)} · ${escapeHtml(deck.subtitle)}</span>
          <h2>O seu dia é a aventura.</h2>
          <p class="lede">Limiar é um RPG cooperativo de cartas jogado dentro da rotina. Você vira uma carta, escolhe o que do seu dia ela vai ser (a reunião, o trânsito, o jantar) e vive normalmente. Quando aquilo acaba, uma carta diz como a história terminou. Sozinho, em dupla ou em grupo, juntos ou cada um na sua cidade.</p>
          <div class="cta-row">
            <button type="button" class="btn-primary btn-lg" data-goto-tab="exemplo">Começar em 5 minutos</button>
            <button type="button" class="btn-secondary" data-goto-tab="playtest">Abrir a mesa</button>
            <button type="button" class="btn-ghost" data-goto-tab="print">Imprimir cartas</button>
          </div>
        </div>
        <figure class="hero-art">
          <img src="/limiar-banner.png" alt="Arte de Limiar: um portal dourado sobre uma mesa com cartas" loading="eager" />
        </figure>
      </section>

      <section class="scene">
        <div class="scene-copy">
          <span class="eyebrow">Uma cena</span>
          <h3>A reunião das 14h vira ${escapeHtml(exemplo.title)}.</h3>
          <p>De manhã, você vira o 7♠ e manda: <q>a reunião das 14h é isso</q>. O Eco lê a História da carta e responde onde ela aparece na reunião. A partir daí, a reunião é a cena.</p>
          <p>À tarde, o sinal da carta aparece no caminho. Você conta, o Eco diz o que aquilo é na história, e a cena ganha +${REGRA.bonusSinal}. Você faz o gesto da carta: +${REGRA.bonusGesto}.</p>
          <p>A reunião acaba. O Eco vira o fundo do baralho dele, soma os bônus e compara com o 7. Depois narra como a travessia terminou. O jogo não parou o seu dia: mudou o jeito de olhar para ele.</p>
          <p class="muted">Na simulação, quem vê sinal e faz gesto em metade das cenas vence a campanha em cerca de 6 de cada 10 vezes, com qualquer número de pessoas.</p>
        </div>
        <div class="scene-card">${renderMagicCardHtml(exemplo, { interactive: true })}</div>
      </section>

      <section class="steps">
        <header class="section-head">
          <span class="eyebrow">Regra de Bolso v0.4</span>
          <h3>Uma cena, em sete passos</h3>
          <p class="lede">Toda cena tem dois papéis: <strong>quem vive</strong> e <strong>o Eco</strong>. Com duas pessoas ou mais, nada se resolve sozinho.</p>
        </header>
        <ol class="step-list">
          ${PASSOS.map((p) => `<li><h4>${p.titulo}</h4><p>${p.texto}</p></li>`).join('')}
        </ol>
        <table class="data-table">
          <thead><tr><th>Naipe</th><th>Tipo</th><th>Vira na sua vida</th></tr></thead>
          <tbody>${naipes}</tbody>
        </table>
      </section>

      <section class="trio">
        <header class="section-head">
          <span class="eyebrow">O personagem</span>
          <h3>Rei, Dama e Valete</h3>
          <p class="lede">O Rei dá a classe e +${REGRA.bonusRei} nas cenas do seu naipe. A Dama faz o Eco virar outro fundo quando a cena vence, e levanta quem cair. O Valete é a jogada arriscada: +${REGRA.bonusValete} agora, cicatriz para sempre.</p>
        </header>
        <div class="trio-cards">${trio.map((c) => (c ? renderMagicCardHtml(c, { interactive: true }) : '')).join('')}</div>
        <div class="class-list">${classes}</div>
      </section>

      <section class="remote-explainer">
        <header class="section-head">
          <span class="eyebrow">Quantas pessoas</span>
          <h3>Sozinho, em dupla ou em grupo</h3>
        </header>
        <p>Em dupla, o Eco é sempre a outra pessoa. Em grupo, é quem responder primeiro. Sozinho, você faz os dois papéis e escreve a narração num diário. Por pessoa: ${REGRA.trofeusPorPessoa} troféus chamam ${escapeHtml(deck.chefe.nome)}, e ${REGRA.ameacaPorPessoa} de Ameaça é derrota.</p>
        <p>A distância, quem vive manda uma linha quando algo muda, e o Eco responde com o desfecho:</p>
        <pre class="code-line">cena: 7♠ Ponte Pênsil = a reunião das 14h · vi o sinal: subi pela escada · troféus 0/60 · Ameaça 0 · Fôlego 3</pre>
        <p>Juntos, na mesma mesa ou viajando, a regra é a mesma, cara a cara: o Eco vira o fundo na frente de quem vive.</p>
      </section>
    </div>
  `;
}
