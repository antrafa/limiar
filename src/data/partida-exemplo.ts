/**
 * Partida de exemplo da Regra de Bolso v0.4: a segunda-feira de Lia e Téo no Último Eclipse.
 * Cada fala que muda o jogo carrega a ação do motor; `encenarExemplo` roda tudo pelo motor e falha se a regra
 * recusar alguma jogada (ver tests/exemplo.test.ts). Os baralhos são arrumados para o dia sair igual ao da regra.
 */
import {
  type Acao,
  agir,
  bonusDaCena,
  type Carta,
  type CartaDoBaralho,
  criarPartida,
  type Desfecho,
  linhaDeStatus,
  type Partida,
  valorDe,
} from '../core/partida';

const c = (valor: number, naipe: Carta['naipe']): Carta => ({ valor, naipe });
const enchimento = (n: number): CartaDoBaralho[] => Array.from({ length: n }, () => c(6, 'clubs'));

/** Topos de cima para baixo; fundos na ordem em que saem de baixo. */
function baralho(topos: Carta[], fundos: Carta[]): CartaDoBaralho[] {
  return [...topos, ...enchimento(30), ...[...fundos].reverse()];
}

export const PESSOAS_DO_EXEMPLO = [
  { nome: 'Lia', classe: 'spades' as const },
  { nome: 'Téo', classe: 'hearts' as const },
];

const BARALHOS = [
  baralho([c(7, 'spades'), c(4, 'hearts')], [c(3, 'spades'), c(2, 'diamonds'), c(8, 'hearts')]),
  baralho([c(9, 'clubs'), c(1, 'spades')], [c(5, 'diamonds'), c(2, 'clubs')]),
];

export type LinhaDoRoteiro =
  | { tipo: 'fala'; hora: string; quem: string; texto: string; nota?: string; acoes?: Acao[] }
  | { tipo: 'fora'; hora: string; texto: string }
  | { tipo: 'desfecho'; hora: string; acao: Acao };

export interface CenaDoRoteiro {
  quem: number;
  linhas: LinhaDoRoteiro[];
}

const LIA = 0;
const TEO = 1;

export const ROTEIRO: CenaDoRoteiro[] = [
  {
    quem: LIA,
    linhas: [
      { tipo: 'fala', hora: '08:10', quem: 'Lia', texto: 'Abri o 7♠, a Ponte Pênsil. A reunião das 14h é a ponte.', nota: 'quem vive diz o que é', acoes: [{ tipo: 'abrir', quem: LIA }, { tipo: 'declarar', quem: LIA, texto: 'A reunião das 14h é a ponte.' }] },
      { tipo: 'fala', hora: '08:12', quem: 'Téo', texto: 'O vão central, onde a gravidade falhou, é a pauta do orçamento. É ali que tudo fica solto no ar.', nota: 'a leitura: Téo pegou a História da carta e ligou à reunião', acoes: [{ tipo: 'ler', quem: LIA, texto: 'O vão central, onde a gravidade falhou, é a pauta do orçamento.' }] },
      { tipo: 'fora', hora: '13:50', texto: 'O elevador está cheio e Lia sobe pela escada.' },
      { tipo: 'fala', hora: '13:50', quem: 'Lia', texto: 'Sinal: subindo de escada.', acoes: [{ tipo: 'sinal', quem: LIA, relato: 'subindo de escada' }] },
      { tipo: 'fala', hora: '13:51', quem: 'Téo', texto: 'São as cordas da ponte. Não olha pra baixo.', nota: 'sinal confirmado: +2', acoes: [{ tipo: 'confirmarSinal', quem: LIA, resposta: 'São as cordas da ponte.' }] },
      { tipo: 'fala', hora: '13:55', quem: 'Lia', texto: 'Vou pisar só nos pedaços de asfalto que ainda flutuam, um de cada vez, sem parar no meio.', nota: 'o gesto da carta: +1', acoes: [{ tipo: 'gesto', quem: LIA, relato: 'pisar só nos pedaços de asfalto que ainda flutuam' }] },
      { tipo: 'fala', hora: '15:20', quem: 'Lia', texto: 'Acabou a reunião. Vira o desfecho.' },
      { tipo: 'desfecho', hora: '15:21', acao: { tipo: 'virarFundo', quem: LIA } },
      { tipo: 'fala', hora: '15:22', quem: 'Téo', texto: 'Quando chegou a pauta do orçamento, os pedaços de asfalto começaram a cair. Você atravessou no último que flutuava, e do outro lado alguém concordou com você.', nota: 'a narração', acoes: [{ tipo: 'narrar', quem: LIA, texto: 'Você atravessou no último pedaço que flutuava.' }] },
    ],
  },
  {
    quem: TEO,
    linhas: [
      { tipo: 'fala', hora: '09:30', quem: 'Téo', texto: 'Abri o 9♣, a Porta de Luz Branca. A consulta das 17h é a porta.', acoes: [{ tipo: 'abrir', quem: TEO }, { tipo: 'declarar', quem: TEO, texto: 'A consulta das 17h é a porta.' }] },
      { tipo: 'fala', hora: '09:34', quem: 'Lia', texto: 'A fenda de luz é o consultório. Só passa quem lembra direito do que sentiu nesses dias: anota antes de ir.', nota: 'a leitura', acoes: [{ tipo: 'ler', quem: TEO, texto: 'A fenda de luz é o consultório.' }] },
      { tipo: 'fala', hora: '09:35', quem: 'Lia', texto: 'E o sinal que eu te mando hoje: o primeiro cachorro que você vir é um guia.', nota: 'não está na carta: é o “mandar um sinal”, inventado por Lia', acoes: [{ tipo: 'mandarSinal', de: LIA, para: TEO, texto: 'O primeiro cachorro que você vir é um guia.' }] },
      { tipo: 'fora', hora: '16:40', texto: 'Na saída do prédio, um vira-lata atravessa a calçada iluminada.' },
      { tipo: 'fala', hora: '16:40', quem: 'Téo', texto: 'Sinal: um vira-lata na saída do prédio, bem na luz.', acoes: [{ tipo: 'sinal', quem: TEO, relato: 'um vira-lata na saída do prédio' }] },
      { tipo: 'fala', hora: '16:42', quem: 'Lia', texto: 'É o guia. Ele sabe o caminho até a fenda.', nota: 'sinal confirmado: +2', acoes: [{ tipo: 'confirmarSinal', quem: TEO, resposta: 'É o guia.' }] },
      { tipo: 'fala', hora: '16:50', quem: 'Téo', texto: 'Essa consulta tá com cara de ruim. Me ajuda?' },
      { tipo: 'fala', hora: '16:51', quem: 'Lia', texto: 'Tô contigo.', nota: 'ajuda: Lia perde 1 de Fôlego e a cena ganha +2', acoes: [{ tipo: 'ajudar', quem: TEO, de: LIA }] },
      { tipo: 'fala', hora: '17:45', quem: 'Téo', texto: 'Saí. Vira o desfecho.' },
      { tipo: 'desfecho', hora: '17:46', acao: { tipo: 'virarFundo', quem: TEO } },
      { tipo: 'fala', hora: '17:47', quem: 'Lia', texto: 'A fenda se abriu e a resposta veio, mas a luz cobrou o preço: a coroa negra ficou um pouco mais perto. Atrás de você, o cachorro sumiu sem deixar pegada.', nota: 'a narração', acoes: [{ tipo: 'narrar', quem: TEO, texto: 'A fenda se abriu, mas a luz cobrou o preço.' }] },
    ],
  },
  {
    quem: LIA,
    linhas: [
      { tipo: 'fala', hora: '19:05', quem: 'Lia', texto: 'Abri o 4♥, o Jantar à Luz de Velas. É o meu jantar de hoje.', acoes: [{ tipo: 'abrir', quem: LIA }, { tipo: 'declarar', quem: LIA, texto: 'O meu jantar de hoje.' }] },
      { tipo: 'fala', hora: '19:07', quem: 'Téo', texto: 'A sua cozinha é o restaurante que abriu de graça. O que tiver na geladeira é o melhor prato que restou na despensa.', nota: 'a leitura', acoes: [{ tipo: 'ler', quem: LIA, texto: 'A sua cozinha é o restaurante que abriu de graça.' }] },
      { tipo: 'fala', hora: '19:20', quem: 'Lia', texto: 'Sinal: tô jantando. [manda a foto do prato] Um brinde à jornada.', acoes: [{ tipo: 'sinal', quem: LIA, relato: 'tô jantando' }, { tipo: 'gesto', quem: LIA, relato: 'foto do prato e um brinde à jornada' }] },
      { tipo: 'fala', hora: '19:21', quem: 'Téo', texto: 'A vela da mesa é de fogo frio. Brinde aceito.', nota: 'sinal confirmado: +2; gesto: +1', acoes: [{ tipo: 'confirmarSinal', quem: LIA, resposta: 'A vela da mesa é de fogo frio.' }] },
      { tipo: 'fala', hora: '19:40', quem: 'Lia', texto: 'Jantei. Vira.' },
      { tipo: 'desfecho', hora: '19:41', acao: { tipo: 'virarFundo', quem: LIA } },
      { tipo: 'fala', hora: '19:42', quem: 'Téo', texto: 'O vento entrou pela janela e a vela não apagou. O resto da despensa vai durar mais uma noite.', nota: 'a narração', acoes: [{ tipo: 'narrar', quem: LIA, texto: 'A vela não apagou.' }] },
    ],
  },
  {
    quem: TEO,
    linhas: [
      { tipo: 'fala', hora: '21:30', quem: 'Téo', texto: 'Abri o A♠, o Primeiro Anel. É a noite de estudo pra prova de amanhã.', acoes: [{ tipo: 'abrir', quem: TEO }, { tipo: 'declarar', quem: TEO, texto: 'A noite de estudo pra prova de amanhã.' }] },
      { tipo: 'fala', hora: '21:32', quem: 'Lia', texto: 'O frio que cai em um minuto é o sono. As sombras afiadas são as matérias que você ainda não revisou.', nota: 'a leitura', acoes: [{ tipo: 'ler', quem: TEO, texto: 'O frio é o sono; as sombras são as matérias atrasadas.' }] },
      { tipo: 'fala', hora: '21:40', quem: 'Téo', texto: 'Sinal: a luminária da escrivaninha é redonda.', acoes: [{ tipo: 'sinal', quem: TEO, relato: 'a luminária da escrivaninha é redonda' }] },
      { tipo: 'fala', hora: '21:41', quem: 'Lia', texto: 'É o farol da sua mesa.', nota: 'sinal confirmado: +2', acoes: [{ tipo: 'confirmarSinal', quem: TEO, resposta: 'É o farol da sua mesa.' }] },
      { tipo: 'fala', hora: '21:45', quem: 'Téo', texto: 'Contra um Ás, vou de Valete.', nota: '+3; o Fôlego máximo de Téo cai para 2', acoes: [{ tipo: 'valete', quem: TEO }] },
      { tipo: 'fala', hora: '23:50', quem: 'Téo', texto: 'Fechei o caderno. Vira.' },
      { tipo: 'desfecho', hora: '23:50', acao: { tipo: 'virarFundo', quem: TEO } },
      { tipo: 'fala', hora: '23:51', quem: 'Téo', texto: 'Deito a Dama.', nota: 'a Dama de Téo fica deitada, e Lia vira outro fundo' },
      { tipo: 'desfecho', hora: '23:51', acao: { tipo: 'deitarDama', quem: TEO } },
      { tipo: 'fala', hora: '23:53', quem: 'Lia', texto: 'O frio chegou, mas a luminária segurou as sombras longe do caderno até a última página.', nota: 'a narração', acoes: [{ tipo: 'narrar', quem: TEO, texto: 'A luminária segurou as sombras até a última página.' }] },
    ],
  },
];

export interface DesfechoEncenado {
  eco: string;
  fundo: Carta;
  bonus: number;
  partes: string[];
  total: number;
  alvo: number;
  desfecho: Desfecho;
  novo: boolean; // desfecho depois da Dama
}

export type LinhaEncenada =
  | Exclude<LinhaDoRoteiro, { tipo: 'desfecho' }>
  | { tipo: 'desfecho'; hora: string; resultado: DesfechoEncenado };

export interface CenaEncenada {
  quem: string;
  eco: string;
  topo: Carta;
  linhas: LinhaEncenada[];
}

export interface ExemploEncenado {
  cenas: CenaEncenada[];
  final: Partida;
  status: string;
}

function aplicar(partida: Partida, acao: Acao, hora: string): Partida {
  const proxima = agir(partida, acao, { quando: hora });
  if (proxima === partida) throw new Error(`O roteiro do exemplo tem uma jogada que a regra recusa: ${JSON.stringify(acao)}`);
  return proxima;
}

function encenarDesfecho(antes: Partida, depois: Partida, quem: number): DesfechoEncenado {
  const cena = depois.pessoas[quem].cena!;
  const fundo = cena.fundos[cena.fundos.length - 1];
  const bonus = bonusDaCena(depois, quem);
  return {
    eco: depois.pessoas[cena.eco].nome,
    fundo,
    bonus: bonus.total,
    partes: bonus.partes,
    total: valorDe(fundo) + bonus.total,
    alvo: cena.alvo,
    desfecho: cena.desfecho!,
    novo: (antes.pessoas[quem].cena?.fundos.length ?? 0) > 0,
  };
}

export function encenarExemplo(): ExemploEncenado {
  let partida = criarPartida({ jogadores: PESSOAS_DO_EXEMPLO, baralhos: BARALHOS });
  const cenas: CenaEncenada[] = [];

  for (const roteiro of ROTEIRO) {
    const linhas: LinhaEncenada[] = [];
    let topo: Carta | null = null;
    let eco = '';
    for (const linha of roteiro.linhas) {
      if (linha.tipo === 'desfecho') {
        const antes = partida;
        partida = aplicar(partida, linha.acao, linha.hora);
        linhas.push({ tipo: 'desfecho', hora: linha.hora, resultado: encenarDesfecho(antes, partida, roteiro.quem) });
        continue;
      }
      for (const acao of (linha.tipo === 'fala' && linha.acoes) || []) partida = aplicar(partida, acao, linha.hora);
      const cena = partida.pessoas[roteiro.quem].cena;
      if (cena && !topo) {
        topo = cena.topo;
        eco = partida.pessoas[cena.eco].nome;
      }
      linhas.push(linha);
    }
    if (!topo) throw new Error('Cena do exemplo sem carta no topo.');
    cenas.push({ quem: partida.pessoas[roteiro.quem].nome, eco, topo, linhas });
  }

  return { cenas, final: partida, status: linhaDeStatus(partida) };
}
