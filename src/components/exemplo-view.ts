import { CLASSES, codigo, NAIPES, REGRA, SIMBOLO, valorDe } from '../core/partida';
import { THEMES } from '../data/index';
import { type CenaEncenada, type DesfechoEncenado, encenarExemplo, type LinhaEncenada } from '../data/partida-exemplo';
import type { ThemeDeck } from '../types/card';
import { cartaDoTema, escapeHtml } from './card-renderer';

interface Minuto {
  titulo: string;
  faca: string;
  pronto: string;
}

function minutos(deck: ThemeDeck): Minuto[] {
  return [
    {
      titulo: 'Escolha a classe',
      faca: `Cada pessoa pega um baralho comum e escolhe um naipe: ${NAIPES.map((n) => `${SIMBOLO[n]} ${CLASSES[n].nome}`).join(', ')}. Separe o Rei, a Dama e o Valete desse naipe: é o seu Trio de Bolso. As outras figuras voltam para a caixa.`,
      pronto: 'o Trio na sua frente, com a Dama em pé.',
    },
    {
      titulo: 'Embaralhe o resto',
      faca: `Ás a 10 dos quatro naipes e os 2 Coringas: 42 cartas, o seu baralho. Anote Fôlego ${REGRA.folego}, e para o grupo: Ameaça 0 e troféus 0.`,
      pronto: 'um monte de 42 cartas e três números anotados.',
    },
    {
      titulo: 'Combine o Eco',
      faca: 'Em dupla, o Eco de uma cena é sempre a outra pessoa. Em grupo, é quem responder primeiro. Sozinho, você faz os dois papéis. A distância, combinem a conversa onde tudo vai acontecer.',
      pronto: 'cada um sabe quem lê e quem vira o desfecho das suas cenas.',
    },
    {
      titulo: 'Abra a primeira cena',
      faca: 'Vire o topo do seu baralho e diga, em uma frase, o que do seu dia aquela carta vai ser. O Eco lê a História da carta e diz onde ela aparece nessa situação: é a leitura.',
      pronto: 'uma coisa real do seu dia virou uma cena da história.',
    },
    {
      titulo: 'Viva e vire o desfecho',
      faca: `Siga o dia. Viu o sinal? Conte ao Eco; quando ele disser o que aquilo é na história, vale +${REGRA.bonusSinal}. Fez o gesto? +${REGRA.bonusGesto}. Quando aquilo acabar, o Eco vira o fundo do baralho dele e narra como terminou. Com ${REGRA.trofeusPorPessoa} troféus por pessoa, ${escapeHtml(deck.chefe.nome)} aparece.`,
      pronto: 'a campanha já está correndo, no ritmo de cada um.',
    },
  ];
}

const COLA: Array<[string, string]> = [
  ['Desfecho', `fundo + bônus contra o topo: passou, vitória; igualou ou ficou até ${REGRA.folgaDoCusto} abaixo, vitória com custo (Ameaça +1); mais abaixo, a cena venceu (−1 Fôlego, Ameaça +1)`],
  ['Bônus', `sinal confirmado +${REGRA.bonusSinal} · gesto +${REGRA.bonusGesto} · Rei +${REGRA.bonusRei} no naipe dele · ajuda +${REGRA.bonusAjuda} (quem ajuda perde 1 de Fôlego) · Valete +${REGRA.bonusValete}, uma vez`],
  ['Valores', `Ás vale ${REGRA.valorAs}; o troféu vale o mesmo que o topo`],
  ['Dama', 'se a cena vencer, o Eco vira outro fundo; também levanta quem cair'],
  ['Campanha', `por pessoa: ${REGRA.trofeusPorPessoa} troféus chamam o chefe; ${REGRA.ameacaPorPessoa} de Ameaça é derrota. Chefe: vida ${REGRA.chefeVidaBase} + número de pessoas, valor ${REGRA.chefeValor}`],
];

function renderTutorial(deck: ThemeDeck): string {
  const passos = minutos(deck)
    .map(
      (m, i) => `
        <li class="minute">
          <span class="minute-tag">Minuto ${i + 1}</span>
          <h4>${m.titulo}</h4>
          <p>${m.faca}</p>
          <p class="minute-done"><strong>Pronto quando:</strong> ${m.pronto}</p>
        </li>`,
    )
    .join('');

  return `
    <section class="tutorial">
      <header class="section-head">
        <span class="eyebrow">Primeira partida</span>
        <h2>Comece em 5 minutos.</h2>
        <p class="lede">Um minuto por passo, com um baralho comum por pessoa. O resto se aprende jogando, e a Referência rápida fica à mão.</p>
      </header>
      <ol class="minute-list">${passos}</ol>
      <div class="cheat">
        <h3>Cola de bolso</h3>
        <dl class="glossary">${COLA.map(([t, d]) => `<dt>${t}</dt><dd>${d}</dd>`).join('')}</dl>
      </div>
      <div class="cta-row">
        <button type="button" class="btn-primary btn-lg" data-goto-tab="playtest">Abrir a mesa</button>
        <button type="button" class="btn-secondary" data-goto-tab="oracle">Referência rápida</button>
      </div>
    </section>
  `;
}

function renderCarta(cena: CenaEncenada): string {
  const tema = cartaDoTema(THEMES.eclipse.cards, cena.topo);
  const linhas: Array<[string, string]> = [
    ['Nome', `<strong>${codigo(cena.topo)} ${escapeHtml(tema?.title ?? '')}</strong>${cena.topo.valor === 1 ? ` (o Ás vale ${REGRA.valorAs})` : ''}`],
    ['Ideia', escapeHtml(tema?.dailyIdea ?? '')],
    ['História', escapeHtml(tema?.topWatcherEvent ?? '')],
    ['Sinal', escapeHtml(tema?.topWatcherTrigger ?? '')],
    ['Gesto', escapeHtml(tema?.bottomEchoPrompt ?? '')],
  ];
  return `
    <div class="scene-block">
      <h4 class="scene-block-title">A carta <span class="muted">(topo do baralho de ${escapeHtml(cena.quem)})</span>
        ${tema ? `<button type="button" class="btn-ghost btn-sm" data-zoom-card-id="${escapeHtml(tema.id)}">Ver a carta</button>` : ''}</h4>
      <table class="data-table card-table"><tbody>
        ${linhas.map(([k, v]) => `<tr><th scope="row">${k}</th><td>${v}</td></tr>`).join('')}
      </tbody></table>
    </div>`;
}

const NOME_DO_DESFECHO = { vitoria: 'Vitória', custo: 'Vitória com custo', derrota: 'A cena venceu' } as const;

function renderDesfecho(d: DesfechoEncenado, hora: string): string {
  const conta = [String(valorDe(d.fundo)), ...d.partes].join(' + ');
  return `
    <li class="msg is-outcome">
      <span class="msg-time num">${escapeHtml(hora)}</span>
      <div class="msg-body">
        <p><strong>${d.novo ? 'Novo desfecho' : 'Desfecho'}</strong> <span class="muted">(fundo do baralho de ${escapeHtml(d.eco)})</span>: <strong class="num">${codigo(d.fundo)}</strong></p>
        <p class="num">${escapeHtml(conta)} = <strong>${d.total}</strong>, contra <strong>${d.alvo}</strong>. <strong class="outcome-${d.desfecho}">${NOME_DO_DESFECHO[d.desfecho]}.</strong></p>
      </div>
    </li>`;
}

function renderLinha(linha: LinhaEncenada): string {
  if (linha.tipo === 'desfecho') return renderDesfecho(linha.resultado, linha.hora);
  if (linha.tipo === 'fora') {
    return `<li class="msg is-offscreen"><span class="msg-time num">${escapeHtml(linha.hora)}</span><div class="msg-body">[${escapeHtml(linha.texto)}]</div></li>`;
  }
  return `
    <li class="msg">
      <span class="msg-time num">${escapeHtml(linha.hora)}</span>
      <div class="msg-body">
        <p><strong>${escapeHtml(linha.quem)}:</strong> “${escapeHtml(linha.texto)}”</p>
        ${linha.nota ? `<span class="msg-note">${escapeHtml(linha.nota)}</span>` : ''}
      </div>
    </li>`;
}

function renderCena(cena: CenaEncenada, indice: number): string {
  return `
    <article class="example-scene">
      <h3 class="day-title">Cena ${indice + 1} · ${escapeHtml(cena.quem)} vive, ${escapeHtml(cena.eco)} é o Eco</h3>
      ${renderCarta(cena)}
      <div class="scene-block">
        <h4 class="scene-block-title">A conversa</h4>
        <ol class="msgs">${cena.linhas.map(renderLinha).join('')}</ol>
      </div>
    </article>`;
}

function renderExemplo(): string {
  const exemplo = encenarExemplo();
  return `
    <section class="example">
      <header class="section-head">
        <span class="eyebrow">Partida de exemplo · ${escapeHtml(THEMES.eclipse.name)}, em dupla</span>
        <h2>Uma segunda-feira inteira, cena por cena.</h2>
        <p class="lede">Lia (♠ Guardião) e Téo (♥ Curandeiro) moram em cidades diferentes e jogam por mensagem. Cada desfecho abaixo foi calculado pelo motor do jogo.</p>
      </header>
      <div class="note">
        <strong>Como ler —</strong> cada cena tem <strong>a carta</strong> (o que vem impresso nela; ninguém inventa isso),
        <strong>a conversa</strong> (só as mensagens, com o nome de quem escreve; o que acontece fora do celular aparece entre colchetes, e em cinza o que aquela mensagem é na regra)
        e <strong>o desfecho</strong> (a carta de baixo do baralho do Eco, e a conta). As cenas correm ao mesmo tempo: enquanto a de Lia está aberta, Téo abre a dele.
      </div>
      ${exemplo.cenas.map(renderCena).join('')}
      <div class="example-end">
        <h3>Fim da segunda-feira</h3>
        <code class="status-code">${escapeHtml(exemplo.status)}</code>
        <p>Nenhum dos dois resolveu nada sozinho, e nenhum dos dois parou o dia para jogar.</p>
        <p><strong>E se Lia jogasse sozinha?</strong> A Cena 1 seria igual, só que Lia faria os dois papéis: leria a História, decidiria que o vão central é a pauta do orçamento, viraria o fundo do próprio baralho depois da reunião e escreveria a narração num caderno ou nas notas do celular.</p>
        <button type="button" class="btn-primary" data-goto-tab="playtest">Começar a sua</button>
      </div>
    </section>
  `;
}

export function renderExemploHtml(deck: ThemeDeck): string {
  return `<div class="first-game">${renderTutorial(deck)}${renderExemplo()}</div>`;
}
