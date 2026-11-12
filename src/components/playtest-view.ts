import {
  bonusDaCena,
  type Cena,
  CLASSES,
  cenaComecou,
  codigo,
  type Carta,
  DESAFIOS_MASTER,
  desafioMasterDaCarta,
  ehDesafioMaster,
  estagioDeAmeaca,
  GESTO_DO_NAIPE,
  jogaSozinho,
  limiteDeAmeaca,
  linhaDeStatus,
  marcoAlcancado,
  marcoPendente,
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
import { syncEstadoDoMundo } from '../core/storage';
import type { ThemeDeck } from '../types/card';
import { cartaDoTema, escapeHtml } from './card-renderer';
import { NUANCES_DO_TEMA } from './temas-view';

export interface PreparacaoMesa {
  jogadores: Array<{ nome: string; classe: Naipe }>;
  metaPorPessoa?: number;
}

export function preparacaoPadrao(): PreparacaoMesa {
  return {
    jogadores: [
      { nome: 'Jogador 1', classe: 'spades' },
      { nome: 'Jogador 2', classe: 'hearts' },
    ],
    metaPorPessoa: REGRA.trofeusPorPessoa,
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
  const nuance = NUANCES_DO_TEMA[deck.id] ?? NUANCES_DO_TEMA.eclipse;
  const porPessoa = preparo.metaPorPessoa ?? REGRA.trofeusPorPessoa;
  const metaTrofeus = porPessoa * n;
  const vidaChefe = REGRA.chefeVidaBase + n;
  const estadoSalvo = syncEstadoDoMundo(deck.id, null);

  return `
    <section class="setup">
      <header class="section-head">
        <span class="eyebrow">Nova campanha · ${escapeHtml(deck.name)}</span>
        <h2>Quem vai jogar?</h2>
        <p class="lede">${quem} Juntem ${metaTrofeus} troféus (${porPessoa} por pessoa), derrubem ${escapeHtml(deck.chefe.nome)} e não deixem a Ameaça chegar a ${REGRA.ameacaPorPessoa * n}.</p>
      </header>

      <div class="setup-theme-brief">
        <div>
          <span class="field-label">Cenário e nuances · ${escapeHtml(deck.name)}</span>
          <p>${escapeHtml(nuance.oQueEstaAcontecendo)}</p>
          <p class="muted"><strong>Se a Ameaça subir (+1):</strong> ${escapeHtml(nuance.oQueEAmeaca)}</p>
        </div>
        <div>
          <span class="field-label">Desafio aos ${metaTrofeus} pontos (${porPessoa} por pessoa) · ${escapeHtml(deck.chefe.nome)}</span>
          <p><strong>Quem é:</strong> ${escapeHtml(deck.chefe.descricao)}</p>
          <p class="muted"><strong>Como funciona:</strong> ao somar ${metaTrofeus} pontos em troféus, ${escapeHtml(deck.chefe.nome)} entra na mesa com <strong>valor ${REGRA.chefeValor}</strong> e <strong>vida ${vidaChefe}</strong>. No meio do baralho, as cartas <strong>8, 9 e 10</strong> trazem <strong>Desafios Master</strong> (missões saudáveis rápidas que dão +${REGRA.bonusDesafioMaster}).</p>
        </div>
      </div>

      <div class="setup-controls-bar">
        <div class="setup-count">
          <span>Pessoas: <strong class="num">${n}</strong></span>
          <button type="button" class="btn-ghost btn-sm" data-acao-mesa="menosPessoa" ${n <= 1 ? 'disabled' : ''}>Remover</button>
          <button type="button" class="btn-secondary btn-sm" data-acao-mesa="maisPessoa" ${n >= REGRA.maxPessoas ? 'disabled' : ''}>Mais uma pessoa</button>
        </div>
        <div class="setup-pace" role="group" aria-label="Duração da campanha">
          <span class="field-label">Duração da partida:</span>
          <button type="button" class="btn-sm ${porPessoa === REGRA.trofeusSprintPorPessoa ? 'btn-primary' : 'btn-ghost'}" data-ritmo-mesa="${REGRA.trofeusSprintPorPessoa}">
            Partida Rápida (${REGRA.trofeusSprintPorPessoa} pts/pessoa · 1 dia)
          </button>
          <button type="button" class="btn-sm ${porPessoa === REGRA.trofeusPorPessoa ? 'btn-primary' : 'btn-ghost'}" data-ritmo-mesa="${REGRA.trofeusPorPessoa}">
            Campanha Padrão (${REGRA.trofeusPorPessoa} pts/pessoa)
          </button>
        </div>
      </div>

      ${
        estadoSalvo.notaDoMundo || estadoSalvo.cenasConcluidas > 0
          ? `<div class="world-memory-banner">
              <span class="field-label">Memória deste mundo salva no navegador · ${escapeHtml(deck.name)}</span>
              <p class="muted">Último registro: ${escapeHtml(estadoSalvo.ultimoEvento)}${estadoSalvo.notaDoMundo ? ` · Nota do mundo: “${escapeHtml(estadoSalvo.notaDoMundo)}”` : ''}</p>
            </div>`
          : ''
      }

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

const ROTULO_ESTAGIO = {
  calmo: 'Estágio 1 · Mundo Calmo',
  atencao: 'Estágio 2 · Cerco Apertando',
  critico: 'Estágio 3 · Alerta Crítico',
  chefe: 'Estágio 4 · Chefe em Campo',
} as const;

function renderMarcoPendente(deck: ThemeDeck, partida: Partida): string {
  const pendente = marcoPendente(partida);
  if (!pendente || partida.resultado) return '';
  const titulo =
    pendente === 1
      ? `Marco 1 alcançado (1/3 da meta) · Primeiro Presságio de ${escapeHtml(deck.chefe.nome)}`
      : `Marco 2 alcançado (2/3 da meta) · A Sombra de ${escapeHtml(deck.chefe.nome)}`;
  return `
    <div class="milestone-banner" role="region" aria-label="Marco da campanha alcançado">
      <div>
        <span class="chip chip-ok">Marco desbloqueado!</span>
        <strong>${titulo}</strong>
        <p class="muted">Vocês avançaram firme na jornada! Escolham uma recompensa imediata para o grupo:</p>
      </div>
      <div class="inline wrap">
        <button type="button" class="btn-primary btn-sm" data-acao="resgatarMarco" data-marco="${pendente}" data-escolha="folego">+1 Fôlego para todo o grupo</button>
        <button type="button" class="btn-secondary btn-sm" data-acao="resgatarMarco" data-marco="${pendente}" data-escolha="dama">Recarregar 1 Dama deitada</button>
        <button type="button" class="btn-secondary btn-sm" data-acao="resgatarMarco" data-marco="${pendente}" data-escolha="ameaca">Baixar Ameaça em 1</button>
      </div>
    </div>`;
}

function renderPlacar(deck: ThemeDeck, partida: Partida): string {
  const meta = metaDeTrofeus(partida);
  const porPessoa = partida.metaPorPessoa ?? REGRA.trofeusPorPessoa;
  const limite = limiteDeAmeaca(partida);
  const nuance = NUANCES_DO_TEMA[deck.id] ?? NUANCES_DO_TEMA.eclipse;
  const estagio = estagioDeAmeaca(partida);
  const alcancado = marcoAlcancado(partida);
  const estadoMundo = syncEstadoDoMundo(deck.id, partida);
  const marco1Pts = Math.ceil(meta / 3);
  const marco2Pts = Math.ceil((meta * 2) / 3);

  const chefe = partida.chefe
    ? `<strong>${escapeHtml(deck.chefe.nome)}</strong> em campo · vida <span class="num">${partida.chefe.vida}</span> · valor <span class="num">${partida.chefe.valor}</span><br /><span class="muted">${escapeHtml(deck.chefe.descricao)}</span>`
    : `<strong>${escapeHtml(deck.chefe.nome)}</strong> aparece com ${meta} troféus (${porPessoa} por pessoa)<br /><span class="muted">${escapeHtml(deck.chefe.descricao)}</span>`;

  return `
    <section class="scoreboard ${partida.chefe ? 'boss-phase' : ''}">
      <div class="score-main">
        <span class="eyebrow">${jogaSozinho(partida) ? 'Campanha solo' : `Campanha com ${partida.pessoas.length} pessoas`} · ${porPessoa === REGRA.trofeusSprintPorPessoa ? 'Partida Rápida' : 'Ritmo livre'}</span>
        <div class="score-line">
          <span class="num score-big">${partida.trofeus}</span><span class="score-of">/ ${meta} em troféus</span>
        </div>
        ${medidor(partida.trofeus, meta)}
        <div class="score-milestones">
          <span class="chip ${alcancado >= 1 ? 'chip-ok' : ''}">Marco 1: ${marco1Pts} pts (Presságio)</span>
          <span class="chip ${alcancado >= 2 ? 'chip-ok' : ''}">Marco 2: ${marco2Pts} pts (Sombra)</span>
          <span class="chip ${partida.chefe ? 'chip-warn' : ''}">Chefe: ${meta} pts</span>
        </div>
        <div class="score-line score-threat">
          <span>Ameaça <strong class="num">${partida.ameaca}</strong> / ${limite}</span>
          <span class="chip ${estagio === 'critico' || estagio === 'chefe' ? 'chip-warn' : estagio === 'calmo' ? 'chip-ok' : ''}">${ROTULO_ESTAGIO[estagio]}</span>
        </div>
        ${medidor(partida.ameaca, limite, 'is-danger')}
        <p class="muted score-nuance">${escapeHtml(nuance.oQueEAmeaca)}</p>
        ${renderMarcoPendente(deck, partida)}
      </div>
      <div class="score-side">
        <div class="score-item">${chefe}</div>
        <div class="score-item">💀 reveladas: <span class="num">${partida.caveiras}</span>${partida.caveiras ? ' · o chefe virá mais forte' : ''}</div>
        <div class="score-item world-status-box" data-world-status>
          <span class="field-label">Status do mundo atual (salvo no navegador)</span>
          <p class="muted">Cenas narradas: <strong class="num">${estadoMundo.cenasConcluidas}</strong> · Desafios Master: <strong class="num">${estadoMundo.desafiosMasterConcluidos}</strong></p>
          <div class="inline">
            <input type="text" maxlength="140" value="${escapeHtml(estadoMundo.notaDoMundo)}" placeholder="Anote como está o mundo hoje (ex.: Setor norte sem luz)" data-nota-mundo aria-label="Nota do status do mundo" />
            <button type="button" class="btn-ghost btn-sm" data-acao-mesa="salvarMundo">Salvar status</button>
          </div>
        </div>
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
  const master = ehDesafioMaster(cena.topo);
  return `
    <article class="threat-card suit-${naipe} ${master ? 'is-master-challenge' : ''}" ${tema ? `data-zoom-card-id="${escapeHtml(tema.id)}"` : ''}>
      <span class="threat-code">${codigo(cena.topo)} · ${VIRA_NO_DIA[naipe].tipo} · valor ${cena.alvo}${master ? ' · ⚔ DESAFIO MASTER' : ''} · aberta às ${escapeHtml(cena.abertaEm)}</span>
      <h4>${escapeHtml(tema?.title ?? 'Cena')}</h4>
      <dl class="scene-card-text">
        ${tema?.dailyIdea ? `<dt>Ideia · sugestão</dt><dd>${escapeHtml(tema.dailyIdea)}</dd>` : ''}
        <dt>História · sugestão</dt><dd>${escapeHtml(tema?.topWatcherEvent ?? `Vira ${VIRA_NO_DIA[naipe].vira}.`)}</dd>
        <dt>Sinal +${REGRA.bonusSinal}</dt><dd>${escapeHtml(tema?.topWatcherTrigger || SINAL_DO_NAIPE[naipe])}</dd>
        <dt>Gesto +${REGRA.bonusGesto}</dt><dd>${escapeHtml(tema?.bottomEchoPrompt || GESTO_DO_NAIPE[naipe])}</dd>
        ${master ? `<dt>Desafio Master +${REGRA.bonusDesafioMaster}</dt><dd><strong>Encontro intenso no baralho:</strong> ${escapeHtml(desafioMasterDaCarta(cena.topo))}</dd>` : ''}
      </dl>
    </article>`;
}

function chipsDeSugestao(acao: string, quem: number, opcoes: string[]): string {
  const validas = opcoes.map((o) => o.trim()).filter(Boolean);
  if (!validas.length) return '';
  const botoes = validas
    .map(
      (texto) =>
        `<button type="button" class="quick-chip" data-sugestao-campo="${acao}" data-sugestao-quem="${quem}" data-sugestao-texto="${escapeHtml(texto)}">${escapeHtml(texto)}</button>`,
    )
    .join('');
  return `<div class="quick-chips" aria-label="Sugestões rápidas para clicar"><span class="quick-chips-label">1 clique:</span>${botoes}</div>`;
}

function campo(acao: string, quem: number, placeholder: string, botao: string, classe = 'btn-secondary', sugestoes: string[] = []): string {
  return `
    <div class="field-with-chips">
      <div class="inline">
        <input type="text" maxlength="240" placeholder="${escapeHtml(placeholder)}" data-campo="${acao}" data-quem="${quem}" aria-label="${escapeHtml(placeholder)}" />
        <button type="button" class="${classe}" data-acao="${acao}" data-quem="${quem}">${botao}</button>
      </div>
      ${chipsDeSugestao(acao, quem, sugestoes)}
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
  const tema = cena.topo ? cartaDoTema(deck.cards, cena.topo) : undefined;
  const ideia = tema?.dailyIdea;
  const tituloCarta = tema?.title ?? deck.chefe.nome;
  const sugestao = !cena.topo
    ? 'Decidam juntos o que o chefe é na vida real.'
    : ideia
      ? `Sugestão da carta (opcional): ${escapeHtml(ideia)}`
      : `${SIMBOLO[cena.topo.naipe]} vira ${VIRA_NO_DIA[cena.topo.naipe].vira}: ${VIRA_NO_DIA[cena.topo.naipe].exemplos}.`;

  const sugestoesDeclarar = !cena.topo
    ? [`Resolver a principal pendência do dia é encarar ${deck.chefe.nome}`, `A tarefa mais difícil de hoje é o confronto contra ${deck.chefe.nome}`]
    : [
        `A tarefa de agora vira ${tituloCarta}`,
        `Meu próximo compromisso do dia é ${tituloCarta}`,
        `O trajeto / conversa de hoje vira ${tituloCarta}`,
      ];

  const sugestoesLer = [
    `Na aventura, isso é ${tituloCarta}: precisamos atravessar com cuidado`,
    tema?.topWatcherEvent ? tema.topWatcherEvent.slice(0, 140) : `O obstáculo surge diante do grupo como ${tituloCarta}`,
    `Cada passo concluído hoje enfraquece o perigo ao redor de ${tituloCarta}`,
  ];

  const sugestoesNarrar =
    cena.desfecho === 'vitoria'
      ? [
          `Superamos ${tituloCarta} com sucesso e garantimos o troféu!`,
          `O grupo atravessou o obstáculo sem deixar rastros.`,
        ]
      : cena.desfecho === 'custo'
        ? [
            `Vencemos ${tituloCarta}, mas o esforço atraiu perigo (+1 Ameaça).`,
            `Passamos no limite, deixando o cenário mais tenso.`,
          ]
        : [
            `${tituloCarta} resistiu desta vez; recuamos para recuperar o fôlego.`,
            `O obstáculo fechou o caminho e forçou uma retirada estratégica.`,
          ];

  const declarar = cena.declaracao
    ? passo(`${escapeHtml(pessoa.nome)} diz o que é`, 'feito', fala(pessoa.nome, cena.declaracao))
    : passo(
        `${escapeHtml(pessoa.nome)} diz o que é`,
        'agora',
        `<p class="muted">Em uma frase: o que do seu dia vira esta carta? ${sugestao}</p>${campo('declarar', quem, 'Ex.: a reunião das 14h é a ponte', 'Dizer', 'btn-secondary', sugestoesDeclarar)}`,
      );

  const ler = cena.leitura
    ? passo(`Leitura · ${nomeDoEco}`, 'feito', fala(sozinho ? pessoa.nome : eco.nome, cena.leitura))
    : passo(
        `Leitura · ${nomeDoEco}`,
        cena.declaracao ? 'agora' : 'depois',
        cena.declaracao
          ? `<p class="muted">A <strong>História</strong> da carta é apenas uma sugestão de fantasia (não precisa repetir o texto igual). Use a ideia dela para dizer, em uma frase, o que essa situação do dia virou na aventura. A cena só começa depois disso.</p>${campo('ler', quem, 'Ex.: o vão central da ponte é a pauta do orçamento', 'Ler', 'btn-secondary', sugestoesLer)}`
          : '',
      );

  return `
    <div class="threat">
      ${renderCartaDaCena(deck, partida, cena)}
      <ol class="scene-steps">
        ${declarar}
        ${ler}
        ${passo('Viver o dia', cena.desfecho ? 'feito' : comecou ? 'agora' : 'depois', comecou ? renderViver(deck, partida, pessoa, cena, quem, sozinho) : '')}
        ${passo(`Desfecho · ${nomeDoEco}`, cena.desfecho ? 'feito' : comecou ? 'agora' : 'depois', comecou ? renderDesfecho(partida, cena, quem, encerrada) : '')}
        ${cena.desfecho && !cena.pendente ? passo(`Narração · ${nomeDoEco}`, 'agora', `<p class="muted">Em poucas frases: o que isso foi na história?</p>${campo('narrar', quem, 'Como terminou na história', 'Narrar e fechar a cena', 'btn-primary', sugestoesNarrar)}`) : ''}
      </ol>
    </div>
  `;
}

function renderDesafioMasterSub(pessoa: Pessoa, cena: Cena, quem: number, aberto: boolean): string {
  const naipe = cena.topo?.naipe ?? pessoa.classe;
  const master = ehDesafioMaster(cena.topo) || !cena.topo;
  const missoes = DESAFIOS_MASTER[naipe];

  if (cena.desafioMaster) {
    return `
      <div class="scene-sub master-challenge-sub is-done">
        <span class="field-label">⚔ Desafio Master · missão cumprida</span>
        ${fala(pessoa.nome, cena.desafioMaster)}
        <span class="chip chip-ok">Desafio Master +${REGRA.bonusDesafioMaster}</span>
      </div>`;
  }

  if (!aberto) return '';

  const botoesMissoes = missoes
    .map(
      (m) =>
        `<button type="button" class="btn-secondary btn-sm master-mission-btn" data-acao="desafioMaster" data-quem="${quem}" data-missao="${escapeHtml(m)}">✓ ${escapeHtml(m)} (+${REGRA.bonusDesafioMaster})</button>`,
    )
    .join('');

  return `
    <div class="scene-sub master-challenge-sub ${master ? 'is-featured' : ''}">
      <span class="field-label">${master ? '⚔ Desafio Master da Carta (Encontro Intenso · +2 na cena)' : '⚔ Desafio Master opcional (+2 na cena)'}</span>
      <p class="muted">${master ? 'Esta é uma carta alta de encontro! Cumpra 1 ação saudável e simples agora no seu dia para ganhar +2 no desfecho:' : 'Quer um impulso extra? Cumpra 1 micro-missão saudável no seu dia para somar +2:'}</p>
      <div class="master-missions-grid">${botoesMissoes}</div>
    </div>`;
}

function renderViver(deck: ThemeDeck, partida: Partida, pessoa: Pessoa, cena: Cena, quem: number, sozinho: boolean): string {
  const eco = partida.pessoas[cena.eco];
  const aberto = !cena.desfecho;
  const tema = cena.topo ? cartaDoTema(deck.cards, cena.topo) : undefined;
  const recebido = pessoa.sinalRecebido ? `<p class="muted">Também vale o sinal que você recebeu: “${escapeHtml(pessoa.sinalRecebido)}”.</p>` : '';

  const sugestoesSinal = [
    ...(pessoa.sinalRecebido ? [pessoa.sinalRecebido] : []),
    tema?.topWatcherTrigger ? `Vi no dia: ${tema.topWatcherTrigger}` : `Notei um sinal de ${SIMBOLO[cena.topo?.naipe ?? pessoa.classe]} no caminho`,
    'Apareceu um detalhe inesperado bem na hora da tarefa',
  ];
  const sugestoesConfirmar = [
    'Isso é um presságio abrindo caminho na cena',
    'Na história, é a pista que faltava para avançarmos',
  ];
  const sugestoesGesto = [
    tema?.bottomEchoPrompt ? `Fiz: ${tema.bottomEchoPrompt}` : GESTO_DO_NAIPE[cena.topo?.naipe ?? pessoa.classe],
    'Respirei fundo três vezes e mantive a calma',
  ];

  let sinal = '';
  if (!cena.sinal) {
    sinal = aberto ? `${recebido}${campo('sinal', quem, 'O que você viu, em uma frase', 'Vi o sinal', 'btn-secondary', sugestoesSinal)}` : '<p class="muted">Sem sinal nesta cena.</p>';
  } else if (!cena.sinalConfirmado) {
    sinal = `${fala(pessoa.nome, cena.sinal)}<p class="muted">${escapeHtml(eco.nome)} confirma dizendo o que isso é na história.</p>${aberto ? campo('confirmarSinal', quem, `${eco.nome}: o que isso é na história?`, 'Confirmar', 'btn-secondary', sugestoesConfirmar) : ''}`;
  } else {
    sinal = `${fala(pessoa.nome, cena.sinal)}${sozinho ? '' : fala(eco.nome, cena.sinalConfirmado)}<span class="chip chip-ok">sinal +${REGRA.bonusSinal}</span>`;
  }

  const gesto = cena.gesto
    ? `${fala(pessoa.nome, cena.gesto)}<span class="chip chip-ok">gesto +${REGRA.bonusGesto}</span>`
    : aberto
      ? campo('gesto', quem, 'O gesto que você fez', 'Fiz o gesto', 'btn-ghost', sugestoesGesto)
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
    ${renderDesafioMasterSub(pessoa, cena, quem, aberto)}
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
  const facanha = cena.desfecho === 'vitoria' && (total - cena.alvo >= 4 || cena.alvo >= 8);
  const badgeFacanha = facanha
    ? `<span class="chip chip-ok">★ Façanha! Vitória brilhante${cena.topo ? ` (+${valorDe(cena.topo)} troféus)` : ''}</span>`
    : '';
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
      <div>
        <p><span class="num">${valorDe(ultimo)} + ${bonus.total} = ${total}</span>, contra <span class="num">${cena.alvo}</span>: <strong class="outcome-${cena.desfecho}">${nomes[cena.desfecho]}</strong></p>
        ${badgeFacanha}
      </div>
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
