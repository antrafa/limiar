import {
  bonusDaCena,
  type Cena,
  CLASSES,
  cenaComecou,
  codigo,
  type Carta,
  GESTO_DO_NAIPE,
  jogaSozinho,
  limiteDeAmeaca,
  linhaDeStatus,
  metaDeTrofeus,
  NAIPES,
  type Naipe,
  type Partida,
  type Pessoa,
  REGRA,
  SIMBOLO,
  SINAL_DO_NAIPE,
  valorDe,
  VIRA_NO_DIA,
} from '../core/partida';
import type { ThemeDeck } from '../types/card';
import { cartaDoTema, escapeHtml } from './card-renderer';

export interface PreparacaoMesa {
  jogadores: Array<{ nome: string; classe: Naipe }>;
}

export function preparacaoPadrao(): PreparacaoMesa {
  return {
    jogadores: [
      { nome: 'Jogador 1', classe: 'spades' },
      { nome: 'Jogador 2', classe: 'hearts' },
    ],
  };
}

export function renderPlaytestTableHtml(deck: ThemeDeck, partida: Partida | null, preparo: PreparacaoMesa): string {
  return partida ? renderPartida(deck, partida) : renderPreparacao(deck, preparo);
}

// ---------- Preparação ----------

function renderPreparacao(deck: ThemeDeck, preparo: PreparacaoMesa): string {
  const n = preparo.jogadores.length;
  const jogadores = preparo.jogadores.map((j, i) => renderEscolhaDeJogador(deck, j, i)).join('');
  const quem = n === 1 ? 'Você joga sozinho e faz os dois papéis: vive a cena e é o próprio Eco.' : 'Cada cena tem quem vive e um Eco, que lê a carta, confirma os sinais, vira o desfecho e narra.';

  return `
    <section class="setup">
      <header class="section-head">
        <span class="eyebrow">Nova campanha · ${escapeHtml(deck.name)}</span>
        <h2>Quem vai jogar?</h2>
        <p class="lede">${quem} Juntem ${REGRA.trofeusPorPessoa * n} troféus, derrubem ${escapeHtml(deck.chefe.nome)} e não deixem a Ameaça chegar a ${REGRA.ameacaPorPessoa * n}.</p>
      </header>

      <div class="setup-count">
        <span>Pessoas: <strong class="num">${n}</strong></span>
        <button type="button" class="btn-ghost btn-sm" data-acao-mesa="menosPessoa" ${n <= 1 ? 'disabled' : ''}>Remover</button>
        <button type="button" class="btn-secondary btn-sm" data-acao-mesa="maisPessoa" ${n >= REGRA.maxPessoas ? 'disabled' : ''}>Mais uma pessoa</button>
      </div>

      <div class="setup-players">${jogadores}</div>

      <div class="setup-actions">
        <button type="button" class="btn-primary btn-lg" data-acao-mesa="comecar">Embaralhar e começar</button>
        <p class="muted">A distância, uma pessoa guarda a mesa e cola a linha de status na conversa; ou cada um joga com baralho comum e usa a Referência rápida.</p>
      </div>
    </section>
  `;
}

function renderEscolhaDeJogador(deck: ThemeDeck, jogador: { nome: string; classe: Naipe }, indice: number): string {
  const classes = NAIPES.map((naipe) => {
    const ativo = jogador.classe === naipe;
    return `
      <button type="button" class="class-tile suit-${naipe} ${ativo ? 'is-active' : ''}" aria-pressed="${ativo}" data-jogador="${indice}" data-classe="${naipe}">
        <span class="class-suit">${SIMBOLO[naipe]}</span>
        <span class="class-name">${CLASSES[naipe].nome}</span>
        <span class="class-vocation">${escapeHtml(deck.suits[naipe].vocationName)}</span>
        <span class="class-power">${CLASSES[naipe].descricao}</span>
      </button>
    `;
  }).join('');

  return `
    <div class="setup-player">
      <label class="field">
        <span class="field-label">Nome da pessoa ${indice + 1}</span>
        <input type="text" maxlength="24" value="${escapeHtml(jogador.nome)}" data-nome-jogador="${indice}" />
      </label>
      <div class="class-grid">${classes}</div>
    </div>
  `;
}

// ---------- Campanha ----------

function renderPartida(deck: ThemeDeck, partida: Partida): string {
  const pessoas = partida.pessoas.map((p, i) => renderPessoa(deck, partida, p, i)).join('');
  return `
    <div class="table">
      ${renderPlacar(deck, partida)}
      ${renderResultado(deck, partida)}
      <div class="fronts fronts-${partida.pessoas.length}">${pessoas}</div>
      <div class="status-line">
        <code data-linha-status>${escapeHtml(linhaDeStatus(partida))}</code>
        <button type="button" class="btn-secondary" data-acao-mesa="copiar">Copiar para a conversa</button>
      </div>
      ${renderDiario(partida)}
    </div>
  `;
}

function medidor(valor: number, total: number, classe = ''): string {
  const pct = Math.min(100, Math.round((valor / total) * 100));
  return `<div class="meter ${classe}" aria-hidden="true"><span style="width:${pct}%"></span></div>`;
}

function renderPlacar(deck: ThemeDeck, partida: Partida): string {
  const meta = metaDeTrofeus(partida);
  const limite = limiteDeAmeaca(partida);
  const chefe = partida.chefe
    ? `<strong>${escapeHtml(deck.chefe.nome)}</strong> em campo · vida <span class="num">${partida.chefe.vida}</span> · valor <span class="num">${partida.chefe.valor}</span>`
    : `<strong>${escapeHtml(deck.chefe.nome)}</strong> aparece com ${meta} troféus`;

  return `
    <section class="scoreboard ${partida.chefe ? 'boss-phase' : ''}">
      <div class="score-main">
        <span class="eyebrow">${jogaSozinho(partida) ? 'Campanha solo' : `Campanha com ${partida.pessoas.length} pessoas`} · ritmo livre</span>
        <div class="score-line">
          <span class="num score-big">${partida.trofeus}</span><span class="score-of">/ ${meta} em troféus</span>
        </div>
        ${medidor(partida.trofeus, meta)}
        <div class="score-line score-threat">
          <span>Ameaça <strong class="num">${partida.ameaca}</strong> / ${limite}</span>
        </div>
        ${medidor(partida.ameaca, limite, 'is-danger')}
      </div>
      <div class="score-side">
        <div class="score-item">${chefe}</div>
        <div class="score-item">💀 reveladas: <span class="num">${partida.caveiras}</span>${partida.caveiras ? ' · o chefe virá mais forte' : ''}</div>
        <div class="score-item"><button type="button" class="btn-ghost btn-sm" data-acao-mesa="abandonar">Nova campanha</button></div>
      </div>
    </section>
  `;
}

function renderResultado(deck: ThemeDeck, partida: Partida): string {
  if (!partida.resultado) return '';
  const vitoria = partida.resultado === 'vitoria';
  return `
    <section class="result ${vitoria ? 'is-win' : 'is-loss'}">
      <span class="eyebrow">${vitoria ? 'Vitória' : 'Derrota'}</span>
      <h2>${vitoria ? `${escapeHtml(deck.chefe.nome)} caiu.` : escapeHtml(partida.motivoFim)}</h2>
      <button type="button" class="btn-primary" data-acao-mesa="abandonar">Jogar de novo</button>
    </section>
  `;
}

function renderPessoa(deck: ThemeDeck, partida: Partida, pessoa: Pessoa, indice: number): string {
  return `
    <section class="front ${pessoa.cena ? 'has-threat' : ''}">
      <header class="front-head">
        <div>
          <h3>${escapeHtml(pessoa.nome)}</h3>
          <span class="front-class suit-${pessoa.classe}">${SIMBOLO[pessoa.classe]} ${CLASSES[pessoa.classe].nome} · ${escapeHtml(deck.suits[pessoa.classe].vocationName)}</span>
        </div>
        <div class="chips">
          <span class="chip ${pessoa.folego <= 1 ? 'chip-warn' : ''}" title="Fôlego">Fôlego ${pessoa.folego}/${pessoa.folegoMax}</span>
          <span class="chip ${pessoa.dama ? 'chip-ok' : 'chip-off'}">Q ${pessoa.dama ? 'pronta' : 'deitada'}</span>
          <span class="chip ${pessoa.valete ? '' : 'chip-warn'}">J ${pessoa.valete ? 'guardado' : 'usado'}</span>
        </div>
      </header>
      <div class="front-counts"><span>Baralho <strong class="num">${pessoa.baralho.length}</strong></span></div>
      ${pessoa.cena ? renderCena(deck, partida, pessoa, pessoa.cena, indice) : renderSemCena(deck, partida, pessoa, indice)}
    </section>
  `;
}

function renderSemCena(deck: ThemeDeck, partida: Partida, pessoa: Pessoa, indice: number): string {
  if (partida.resultado) return '';
  const outros = partida.pessoas.map((p, i) => ({ p, i })).filter(({ i }) => i !== indice);
  const escolhaDoEco =
    outros.length > 1
      ? `<label class="field inline-field"><span class="field-label">Eco desta cena</span>
          <select data-eco-de="${indice}">${outros.map(({ p, i }) => `<option value="${i}">${escapeHtml(p.nome)}</option>`).join('')}</select>
        </label>`
      : `<span class="muted">${outros.length ? `Eco: ${escapeHtml(outros[0].p.nome)}` : 'Você é o próprio Eco.'}</span>`;
  const rotulo = partida.chefe ? `Encarar ${escapeHtml(deck.chefe.nome)}` : 'Abrir uma cena';
  const recebido = pessoa.sinalRecebido ? `<p class="muted">Sinal recebido: “${escapeHtml(pessoa.sinalRecebido)}”. Vale como sinal numa cena aberta.</p>` : '';

  const mandar = outros.length
    ? `<div class="send-signal">
        <span class="field-label">Mandar um sinal para o dia de ${outros.length > 1 ? 'alguém' : escapeHtml(outros[0].p.nome)}</span>
        <div class="inline">
          ${outros.length > 1 ? `<select data-sinal-para="${indice}" aria-label="Para quem">${outros.map(({ p, i }) => `<option value="${i}">${escapeHtml(p.nome)}</option>`).join('')}</select>` : ''}
          <input type="text" maxlength="160" placeholder="Ex.: o primeiro cachorro que você vir é um guia" data-campo="mandarSinal" data-quem="${indice}" aria-label="Sinal" />
          <button type="button" class="btn-ghost" data-acao="mandarSinal" data-quem="${indice}">Mandar</button>
        </div>
      </div>`
    : '';

  return `
    <div class="threat-empty">
      <button type="button" class="btn-primary btn-lg" data-acao="abrir" data-quem="${indice}">${rotulo}</button>
      <div class="threat-empty-text">
        ${escolhaDoEco}
        <span class="muted">Quando quiser. A carta do topo diz o que algo do seu dia vai ser na história.</span>
        ${recebido}
      </div>
    </div>
    ${mandar}
  `;
}

function renderCartaDaCena(deck: ThemeDeck, partida: Partida, cena: Cena): string {
  if (!cena.topo) {
    return `
      <article class="threat-card is-boss">
        <span class="threat-code">CHEFE · aberta às ${escapeHtml(cena.abertaEm)}</span>
        <h4>${escapeHtml(deck.chefe.nome)}</h4>
        <p>${escapeHtml(deck.chefe.descricao)}</p>
        <span class="muted">Valor ${cena.alvo} · vida ${partida.chefe?.vida ?? 0} · o Rei não vale contra ele</span>
      </article>`;
  }
  const tema = cartaDoTema(deck.cards, cena.topo);
  const naipe = cena.topo.naipe;
  return `
    <article class="threat-card suit-${naipe}" ${tema ? `data-zoom-card-id="${escapeHtml(tema.id)}"` : ''}>
      <span class="threat-code">${codigo(cena.topo)} · ${VIRA_NO_DIA[naipe].tipo} · valor ${cena.alvo} · aberta às ${escapeHtml(cena.abertaEm)}</span>
      <h4>${escapeHtml(tema?.title ?? 'Cena')}</h4>
      <dl class="scene-card-text">
        ${tema?.dailyIdea ? `<dt>Ideia</dt><dd>${escapeHtml(tema.dailyIdea)}</dd>` : ''}
        <dt>História</dt><dd>${escapeHtml(tema?.topWatcherEvent ?? `Vira ${VIRA_NO_DIA[naipe].vira}.`)}</dd>
        <dt>Sinal +${REGRA.bonusSinal}</dt><dd>${escapeHtml(tema?.topWatcherTrigger || SINAL_DO_NAIPE[naipe])}</dd>
        <dt>Gesto +${REGRA.bonusGesto}</dt><dd>${escapeHtml(tema?.bottomEchoPrompt || GESTO_DO_NAIPE[naipe])}</dd>
      </dl>
    </article>`;
}

function campo(acao: string, quem: number, placeholder: string, botao: string, classe = 'btn-secondary'): string {
  return `
    <div class="inline">
      <input type="text" maxlength="240" placeholder="${escapeHtml(placeholder)}" data-campo="${acao}" data-quem="${quem}" aria-label="${escapeHtml(placeholder)}" />
      <button type="button" class="${classe}" data-acao="${acao}" data-quem="${quem}">${botao}</button>
    </div>`;
}

function fala(quem: string, texto: string, nota = ''): string {
  return `<p class="scene-line"><strong>${escapeHtml(quem)}:</strong> “${escapeHtml(texto)}”${nota ? ` <span class="chip">${nota}</span>` : ''}</p>`;
}

function passo(titulo: string, estado: 'feito' | 'agora' | 'depois', corpo: string): string {
  return `<li class="scene-step is-${estado}"><span class="scene-step-title">${titulo}</span>${corpo}</li>`;
}

function renderCena(deck: ThemeDeck, partida: Partida, pessoa: Pessoa, cena: Cena, quem: number): string {
  const eco = partida.pessoas[cena.eco];
  const sozinho = jogaSozinho(partida);
  const nomeDoEco = sozinho ? 'Você, como Eco' : escapeHtml(eco.nome);
  const comecou = cenaComecou(cena);
  const encerrada = !!partida.resultado;
  const ideia = cena.topo ? cartaDoTema(deck.cards, cena.topo)?.dailyIdea : undefined;
  const sugestao = !cena.topo
    ? 'Decidam juntos o que o chefe é na vida real.'
    : ideia
      ? `Ideia da carta: ${escapeHtml(ideia)}`
      : `${SIMBOLO[cena.topo.naipe]} vira ${VIRA_NO_DIA[cena.topo.naipe].vira}: ${VIRA_NO_DIA[cena.topo.naipe].exemplos}.`;

  const declarar = cena.declaracao
    ? passo(`${escapeHtml(pessoa.nome)} diz o que é`, 'feito', fala(pessoa.nome, cena.declaracao))
    : passo(
        `${escapeHtml(pessoa.nome)} diz o que é`,
        'agora',
        `<p class="muted">Em uma frase: o que do seu dia vira esta carta? ${sugestao}</p>${campo('declarar', quem, 'Ex.: a reunião das 14h é a ponte', 'Dizer')}`,
      );

  const ler = cena.leitura
    ? passo(`Leitura · ${nomeDoEco}`, 'feito', fala(sozinho ? pessoa.nome : eco.nome, cena.leitura))
    : passo(
        `Leitura · ${nomeDoEco}`,
        cena.declaracao ? 'agora' : 'depois',
        cena.declaracao
          ? `<p class="muted">Leia a História da carta e diga, em uma frase, onde ela aparece nessa situação. A cena só começa depois disso.</p>${campo('ler', quem, 'Ex.: o vão central da ponte é a pauta do orçamento', 'Ler')}`
          : '',
      );

  return `
    <div class="threat">
      ${renderCartaDaCena(deck, partida, cena)}
      <ol class="scene-steps">
        ${declarar}
        ${ler}
        ${passo('Viver o dia', cena.desfecho ? 'feito' : comecou ? 'agora' : 'depois', comecou ? renderViver(partida, pessoa, cena, quem, sozinho) : '')}
        ${passo(`Desfecho · ${nomeDoEco}`, cena.desfecho ? 'feito' : comecou ? 'agora' : 'depois', comecou ? renderDesfecho(partida, cena, quem, encerrada) : '')}
        ${cena.desfecho && !cena.pendente ? passo(`Narração · ${nomeDoEco}`, 'agora', `<p class="muted">Em poucas frases: o que isso foi na história?</p>${campo('narrar', quem, 'Como terminou na história', 'Narrar e fechar a cena', 'btn-primary')}`) : ''}
      </ol>
    </div>
  `;
}

function renderViver(partida: Partida, pessoa: Pessoa, cena: Cena, quem: number, sozinho: boolean): string {
  const eco = partida.pessoas[cena.eco];
  const aberto = !cena.desfecho;
  const recebido = pessoa.sinalRecebido ? `<p class="muted">Também vale o sinal que você recebeu: “${escapeHtml(pessoa.sinalRecebido)}”.</p>` : '';

  let sinal = '';
  if (!cena.sinal) {
    sinal = aberto ? `${recebido}${campo('sinal', quem, 'O que você viu, em uma frase', 'Vi o sinal')}` : '<p class="muted">Sem sinal nesta cena.</p>';
  } else if (!cena.sinalConfirmado) {
    sinal = `${fala(pessoa.nome, cena.sinal)}<p class="muted">${escapeHtml(eco.nome)} confirma dizendo o que isso é na história.</p>${aberto ? campo('confirmarSinal', quem, `${eco.nome}: o que isso é na história?`, 'Confirmar') : ''}`;
  } else {
    sinal = `${fala(pessoa.nome, cena.sinal)}${sozinho ? '' : fala(eco.nome, cena.sinalConfirmado)}<span class="chip chip-ok">sinal +${REGRA.bonusSinal}</span>`;
  }

  const gesto = cena.gesto
    ? `${fala(pessoa.nome, cena.gesto)}<span class="chip chip-ok">gesto +${REGRA.bonusGesto}</span>`
    : aberto
      ? campo('gesto', quem, 'O gesto que você fez', 'Fiz o gesto', 'btn-ghost')
      : '';

  const ajudantes = partida.pessoas
    .map((p, i) => ({ p, i }))
    .filter(({ p, i }) => i !== quem && p.folego >= 2);
  const reforcos = aberto
    ? [
        ...(cena.ajudaDe === null
          ? ajudantes.map(({ p, i }) => `<button type="button" class="btn-secondary" data-acao="ajudar" data-quem="${quem}" data-de="${i}">${escapeHtml(p.nome)} ajuda (+${REGRA.bonusAjuda}, −1 Fôlego)</button>`)
          : []),
        pessoa.valete ? `<button type="button" class="btn-secondary" data-acao="valete" data-quem="${quem}">Revelar o Valete (+${REGRA.bonusValete})</button>` : '',
      ].join('')
    : '';

  return `
    <div class="scene-sub"><span class="field-label">Sinal</span>${sinal}</div>
    <div class="scene-sub"><span class="field-label">Gesto</span>${gesto}</div>
    ${reforcos ? `<div class="inline wrap">${reforcos}</div>` : ''}
  `;
}

function renderDesfecho(partida: Partida, cena: Cena, quem: number, encerrada: boolean): string {
  const bonus = bonusDaCena(partida, quem);
  const eco = partida.pessoas[cena.eco];

  if (!cena.desfecho) {
    const precisa = cena.alvo - bonus.total + 1;
    const dica = precisa <= 2 ? 'qualquer fundo vence' : `um fundo de ${precisa} ou mais vence; ${precisa - REGRA.folgaDoCusto - 1} ou mais vence com custo`;
    return `
      <p class="muted">Quando aquilo acabar na vida real, ${jogaSozinho(partida) ? 'vire a carta de baixo do seu baralho' : `${escapeHtml(eco.nome)} vira a carta de baixo do baralho dele`}.</p>
      <p>Bônus agora: <strong class="num">+${bonus.total}</strong>${bonus.partes.length ? ` <span class="muted">= ${bonus.partes.join(' + ')}</span>` : ''}. Contra ${cena.alvo}: ${dica}.</p>
      ${encerrada ? '' : `<button type="button" class="btn-primary" data-acao="virarFundo" data-quem="${quem}">Virar o fundo</button>`}`;
  }

  const fundos = cena.fundos.map((f, i) => renderFundo(f, i < cena.fundos.length - 1)).join('');
  const ultimo = cena.fundos[cena.fundos.length - 1];
  const total = valorDe(ultimo) + bonus.total;
  const nomes = { vitoria: 'Vitória', custo: 'Vitória com custo', derrota: 'A cena venceu' } as const;
  const pendente = cena.pendente
    ? `<div class="inline wrap">
        <button type="button" class="btn-secondary" data-acao="deitarDama" data-quem="${quem}">Deitar a Dama e virar outro fundo</button>
        <button type="button" class="btn-ghost danger" data-acao="aceitarDerrota" data-quem="${quem}">Aceitar (−1 Fôlego, Ameaça +1)</button>
      </div>`
    : '';
  const espiada = cena.espiada
    ? `<div class="inline wrap"><span class="muted">Batedor: o próximo fundo de ${escapeHtml(eco.nome)} é <strong>${codigo(cena.espiada)}</strong>.</span>
        <button type="button" class="btn-ghost" data-acao="enterrarEspiada" data-quem="${quem}">Mandar para o meio</button></div>`
    : '';

  return `
    <div class="scene-outcome">${fundos}
      <p><span class="num">${valorDe(ultimo)} + ${bonus.total} = ${total}</span>, contra <span class="num">${cena.alvo}</span>: <strong class="outcome-${cena.desfecho}">${nomes[cena.desfecho]}</strong></p>
    </div>
    ${pendente}${espiada}`;
}

function renderFundo(carta: Carta, descartado: boolean): string {
  const vermelha = carta.naipe === 'hearts' || carta.naipe === 'diamonds';
  return `
    <div class="pcard ${vermelha ? 'is-red' : ''} ${descartado ? 'is-discarded' : ''}" title="${descartado ? 'Descartado pela Dama' : 'Fundo'}">
      <span class="pcard-corner">${carta.valor === 1 ? 'A' : carta.valor}<br />${SIMBOLO[carta.naipe]}</span>
      <span class="pcard-pip">${SIMBOLO[carta.naipe]}</span>
    </div>`;
}

function renderDiario(partida: Partida): string {
  return `
    <details class="log" open>
      <summary>Diário da campanha <span class="muted">(${partida.diario.length})</span></summary>
      <ol>${partida.diario.map((l) => `<li>${escapeHtml(l)}</li>`).join('')}</ol>
    </details>
  `;
}
