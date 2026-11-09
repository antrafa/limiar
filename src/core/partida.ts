/**
 * Motor da Regra de Bolso v0.4 (ver Limiar_Regra_de_Bolso.md).
 * O dia é a aventura: cada cena é algo da vida real. O topo do baralho de quem vive diz o que ela é na
 * história; o fundo do baralho do Eco diz como terminou. Com duas pessoas ou mais, nada se resolve sozinho.
 * Funções puras: cada ação recebe a partida e devolve uma nova; ação inválida devolve a mesma partida.
 * Os números foram calibrados em docs/simulacao_regra_de_bolso.py — mudar aqui exige rodar a simulação de novo.
 */

export type Naipe = 'spades' | 'hearts' | 'diamonds' | 'clubs';

export interface Carta {
  valor: number; // 1 (Ás) a 10
  naipe: Naipe;
}

export type CartaDoBaralho = Carta | { coringa: 'estrela' | 'caveira' };

export type Desfecho = 'vitoria' | 'custo' | 'derrota';

export interface Cena {
  eco: number;
  topo: Carta | null; // null: a cena é contra o chefe
  alvo: number;
  abertaEm: string;
  declaracao: string;
  leitura: string;
  sinal: string;
  sinalConfirmado: string; // resposta do Eco; vazio = o sinal ainda não vale
  gesto: string;
  ajudaDe: number | null;
  valete: boolean;
  fundos: Carta[]; // dois quando a Dama foi deitada
  desfecho: Desfecho | null;
  pendente: boolean; // a cena venceu, mas a Dama ainda pode mudar isso
  espiada: CartaDoBaralho | null; // poder do Batedor
}

export interface Pessoa {
  nome: string;
  classe: Naipe;
  baralho: CartaDoBaralho[]; // índice 0 é o topo; o último é o fundo
  folego: number;
  folegoMax: number;
  dama: boolean;
  valete: boolean; // ainda guardado
  cena: Cena | null;
  sinalRecebido: string;
}

export interface Partida {
  pessoas: Pessoa[];
  trofeus: number;
  ameaca: number;
  caveiras: number;
  chefe: { vida: number; valor: number } | null;
  resultado: null | 'vitoria' | 'derrota';
  motivoFim: string;
  diario: string[];
}

export const REGRA = {
  folego: 3,
  trofeusPorPessoa: 30,
  ameacaPorPessoa: 5,
  chefeVidaBase: 2,
  chefeValor: 8,
  valorAs: 11,
  bonusSinal: 2,
  bonusGesto: 1,
  bonusRei: 1,
  bonusAjuda: 2,
  bonusValete: 3,
  folgaDoCusto: 2,
  maxPessoas: 4,
} as const;

export const NAIPES: Naipe[] = ['spades', 'hearts', 'diamonds', 'clubs'];
export const SIMBOLO: Record<Naipe, string> = { spades: '♠', hearts: '♥', diamonds: '♦', clubs: '♣' };

/** O que cada naipe vira no dia, em qualquer tema. */
export const VIRA_NO_DIA: Record<Naipe, { tipo: string; vira: string; exemplos: string }> = {
  spades: { tipo: 'Confronto', vira: 'algo que resiste a você', exemplos: 'trânsito, fila, reunião difícil, prova' },
  hearts: { tipo: 'Vínculo', vira: 'um encontro', exemplos: 'um almoço, uma ligação, alguém no caminho' },
  diamonds: { tipo: 'Recurso', vira: 'uma tarefa ou um objeto', exemplos: 'uma conta, uma compra, um conserto' },
  clubs: { tipo: 'Mistério', vira: 'um lugar ou o imprevisto', exemplos: 'um caminho novo, o fim de tarde, a noite' },
};

/** Sinal e gesto do naipe: valem com baralho comum, sem tema. */
export const SINAL_DO_NAIPE: Record<Naipe, string> = {
  spades: 'um barulho forte, uma discussão, uma porta batendo',
  hearts: 'alguém cuidando de alguém, um abraço',
  diamonds: 'dinheiro trocando de mão, uma máquina, um objeto achado',
  clubs: 'um animal, uma sombra, um lugar onde você nunca reparou',
};

export const GESTO_DO_NAIPE: Record<Naipe, string> = {
  spades: 'respire fundo três vezes antes de começar',
  hearts: 'faça um pequeno gesto de cuidado com alguém, ou com você',
  diamonds: 'arrume ou conserte uma coisa pequena',
  clubs: 'descreva um detalhe que você nunca tinha notado',
};

export interface Classe {
  nome: string;
  descricao: string;
}

export const CLASSES: Record<Naipe, Classe> = {
  spades: { nome: 'Guardião', descricao: 'A Ameaça cai 1.' },
  hearts: { nome: 'Curandeiro', descricao: '+1 de Fôlego para quem mais precisa, você inclusive.' },
  diamonds: { nome: 'Engenheiro', descricao: 'Recarrega uma Dama deitada, a sua primeiro.' },
  clubs: { nome: 'Batedor', descricao: 'Espia o fundo do baralho do Eco; se quiser, essa carta vai para o meio.' },
};

export const REGRA_DO_REI = `+${REGRA.bonusRei} nas cenas do seu naipe. Ao vencer uma cena do seu naipe, o poder da classe dispara.`;
export const REGRA_DA_DAMA =
  'Se a cena vencer, deite a Dama: o Eco descarta o fundo e vira outro. Também levanta quem cair. Recarrega com o ★ ou com o Engenheiro.';
export const REGRA_DO_VALETE = `Uma vez por campanha: +${REGRA.bonusValete} numa cena. A cicatriz fica: seu Fôlego máximo cai para ${REGRA.folego - 1}.`;
export const REGRA_DA_ESTRELA = 'O Segundo Sol: o dono do baralho ganha +1 de Fôlego e a Dama dele recarrega.';
export const REGRA_DA_CAVEIRA = 'Totalidade: a Ameaça sobe 1 e o chefe fica mais forte (+1 de vida e +1 de valor).';
export const REGRA_DO_SINAL = `Se o sinal aparecer com a cena aberta, conte ao Eco; quando ele disser o que aquilo é na história, vale +${REGRA.bonusSinal}. Nunca é obrigatório.`;
export const REGRA_DO_GESTO = `Faça o gesto da carta e conte ao Eco: +${REGRA.bonusGesto}. Nunca é obrigatório.`;

export type Acao =
  | { tipo: 'abrir'; quem: number; eco?: number }
  | { tipo: 'declarar'; quem: number; texto: string }
  | { tipo: 'ler'; quem: number; texto: string }
  | { tipo: 'sinal'; quem: number; relato: string }
  | { tipo: 'confirmarSinal'; quem: number; resposta: string }
  | { tipo: 'gesto'; quem: number; relato: string }
  | { tipo: 'ajudar'; quem: number; de: number }
  | { tipo: 'valete'; quem: number }
  | { tipo: 'virarFundo'; quem: number }
  | { tipo: 'deitarDama'; quem: number }
  | { tipo: 'aceitarDerrota'; quem: number }
  | { tipo: 'enterrarEspiada'; quem: number }
  | { tipo: 'narrar'; quem: number; texto: string }
  | { tipo: 'mandarSinal'; de: number; para: number; texto: string };

type Rng = () => number;

export interface OpcoesDaAcao {
  rng?: Rng;
  quando?: string; // HH:MM; padrão: agora
}

export function embaralhar<T>(itens: readonly T[], rng: Rng = Math.random): T[] {
  const copia = [...itens];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export function baralhoNovo(rng: Rng = Math.random): CartaDoBaralho[] {
  const numeradas: CartaDoBaralho[] = NAIPES.flatMap((naipe) =>
    Array.from({ length: 10 }, (_, i) => ({ valor: i + 1, naipe })),
  );
  return embaralhar([...numeradas, { coringa: 'estrela' }, { coringa: 'caveira' }], rng);
}

export function codigo(carta: CartaDoBaralho): string {
  if ('coringa' in carta) return carta.coringa === 'estrela' ? '★' : '💀';
  return `${carta.valor === 1 ? 'A' : carta.valor}${SIMBOLO[carta.naipe]}`;
}

/** Valor da carta no jogo: o Ás vale 11, tanto no topo quanto no fundo. */
export function valorDe(carta: Carta): number {
  return carta.valor === 1 ? REGRA.valorAs : carta.valor;
}

export function metaDeTrofeus(partida: Partida): number {
  return REGRA.trofeusPorPessoa * partida.pessoas.length;
}

export function limiteDeAmeaca(partida: Partida): number {
  return REGRA.ameacaPorPessoa * partida.pessoas.length;
}

export function jogaSozinho(partida: Partida): boolean {
  return partida.pessoas.length === 1;
}

export function ecoPadrao(partida: Partida, quem: number): number {
  return jogaSozinho(partida) ? quem : (quem + 1) % partida.pessoas.length;
}

export function desfechoDe(diferenca: number): Desfecho {
  if (diferenca >= 1) return 'vitoria';
  return diferenca >= -REGRA.folgaDoCusto ? 'custo' : 'derrota';
}

export interface Bonus {
  total: number;
  partes: string[];
}

export function bonusDaCena(partida: Partida, quem: number): Bonus {
  const pessoa = partida.pessoas[quem];
  const cena = pessoa.cena;
  if (!cena) return { total: 0, partes: [] };
  const partes: Array<[boolean, number, string]> = [
    [!!cena.sinalConfirmado, REGRA.bonusSinal, 'sinal'],
    [!!cena.gesto, REGRA.bonusGesto, 'gesto'],
    [cena.topo?.naipe === pessoa.classe, REGRA.bonusRei, `Rei ${SIMBOLO[pessoa.classe]}`],
    [cena.ajudaDe !== null, REGRA.bonusAjuda, `ajuda de ${partida.pessoas[cena.ajudaDe ?? 0]?.nome ?? ''}`],
    [cena.valete, REGRA.bonusValete, 'Valete'],
  ];
  const valendo = partes.filter(([vale]) => vale);
  return {
    total: valendo.reduce((soma, [, valor]) => soma + valor, 0),
    partes: valendo.map(([, valor, nome]) => `${valor} (${nome})`),
  };
}

/** A cena só começa depois que quem vive diz o que ela é e o Eco faz a leitura. */
export function cenaComecou(cena: Cena): boolean {
  return !!cena.declaracao && !!cena.leitura;
}

export function criarPartida(
  config: { jogadores: Array<{ nome: string; classe: Naipe }>; baralhos?: CartaDoBaralho[][] },
  rng: Rng = Math.random,
): Partida {
  const pessoas: Pessoa[] = config.jogadores.slice(0, REGRA.maxPessoas).map((j, i) => ({
    nome: j.nome,
    classe: j.classe,
    baralho: config.baralhos?.[i] ? [...config.baralhos[i]] : baralhoNovo(rng),
    folego: REGRA.folego,
    folegoMax: REGRA.folego,
    dama: true,
    valete: true,
    cena: null,
    sinalRecebido: '',
  }));
  const partida: Partida = {
    pessoas,
    trofeus: 0,
    ameaca: 0,
    caveiras: 0,
    chefe: null,
    resultado: null,
    motivoFim: '',
    diario: [],
  };
  const nomes = pessoas.map((p) => `${p.nome} (${SIMBOLO[p.classe]} ${CLASSES[p.classe].nome})`).join(', ');
  partida.diario.push(`A campanha começou: ${nomes}. Meta: ${metaDeTrofeus(partida)} troféus.`);
  return partida;
}

function horaAgora(): string {
  return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function registrar(partida: Partida, quando: string, texto: string): void {
  partida.diario.push(`${quando} · ${texto}`);
}

function encerrar(partida: Partida, resultado: 'vitoria' | 'derrota', motivo: string, quando: string): void {
  if (partida.resultado) return;
  partida.resultado = resultado;
  partida.motivoFim = motivo;
  registrar(partida, quando, motivo);
}

/** Puxa do topo ou do fundo; Coringas valem para o dono do baralho e puxam outra carta. */
function puxar(partida: Partida, dono: number, lado: 'topo' | 'fundo', quando: string): Carta | null {
  const pessoa = partida.pessoas[dono];
  while (pessoa.baralho.length) {
    const carta = lado === 'topo' ? pessoa.baralho.shift()! : pessoa.baralho.pop()!;
    if (!('coringa' in carta)) return carta;
    resolverCoringa(partida, dono, carta.coringa, quando);
  }
  encerrar(partida, 'derrota', `O baralho de ${pessoa.nome} acabou.`, quando);
  return null;
}

function resolverCoringa(partida: Partida, dono: number, coringa: 'estrela' | 'caveira', quando: string): void {
  const pessoa = partida.pessoas[dono];
  if (coringa === 'estrela') {
    pessoa.folego = Math.min(pessoa.folegoMax, pessoa.folego + 1);
    pessoa.dama = true;
    registrar(partida, quando, `★ no baralho de ${pessoa.nome}: +1 de Fôlego e a Dama recarrega.`);
    return;
  }
  partida.ameaca += 1;
  partida.caveiras += 1;
  if (partida.chefe) {
    partida.chefe.vida += 1;
    partida.chefe.valor += 1;
  }
  registrar(partida, quando, `💀 no baralho de ${pessoa.nome}: a Ameaça sobe e o chefe fica mais forte.`);
}

function abrir(partida: Partida, quem: number, eco: number | undefined, quando: string): boolean {
  const pessoa = partida.pessoas[quem];
  if (pessoa.cena) return false;
  const ecoFinal = eco ?? ecoPadrao(partida, quem);
  const ecoValido = jogaSozinho(partida) ? ecoFinal === quem : ecoFinal !== quem && !!partida.pessoas[ecoFinal];
  if (!ecoValido) return false;

  const base = { eco: ecoFinal, abertaEm: quando, declaracao: '', leitura: '', sinal: '', sinalConfirmado: '', gesto: '' };
  const resto = { ajudaDe: null, valete: false, fundos: [], desfecho: null, pendente: false, espiada: null };
  if (partida.chefe) {
    pessoa.cena = { ...base, ...resto, topo: null, alvo: partida.chefe.valor };
    registrar(partida, quando, `${pessoa.nome} encara o chefe (valor ${partida.chefe.valor}).`);
    return true;
  }
  const topo = puxar(partida, quem, 'topo', quando);
  if (!topo) return true;
  pessoa.cena = { ...base, ...resto, topo, alvo: valorDe(topo) };
  registrar(partida, quando, `${pessoa.nome} abriu uma cena: ${codigo(topo)} (valor ${valorDe(topo)}).`);
  return true;
}

function aplicarDesfecho(partida: Partida, quem: number, quando: string): void {
  const pessoa = partida.pessoas[quem];
  const cena = pessoa.cena!;
  cena.pendente = false;
  if (cena.desfecho === 'derrota') {
    ferir(partida, quem, quando);
  } else {
    vencer(partida, quem, quando);
  }
  if (partida.ameaca >= limiteDeAmeaca(partida)) {
    encerrar(partida, 'derrota', `A Ameaça chegou a ${partida.ameaca}. A campanha está perdida.`, quando);
  }
}

function vencer(partida: Partida, quem: number, quando: string): void {
  const pessoa = partida.pessoas[quem];
  const cena = pessoa.cena!;
  if (cena.desfecho === 'custo') partida.ameaca += 1;
  const custo = cena.desfecho === 'custo' ? ', com custo: a Ameaça sobe 1' : '';

  if (!cena.topo) {
    const chefe = partida.chefe!;
    chefe.vida -= 1;
    registrar(partida, quando, `${pessoa.nome} acertou o chefe${custo}. Vida restante: ${chefe.vida}.`);
    if (chefe.vida <= 0) encerrar(partida, 'vitoria', 'O chefe caiu. Vitória!', quando);
    return;
  }

  partida.trofeus += valorDe(cena.topo);
  registrar(partida, quando, `${pessoa.nome} venceu a cena ${codigo(cena.topo)}${custo}. Troféus: ${partida.trofeus}.`);
  if (cena.topo.naipe === pessoa.classe) dispararPoder(partida, quem, quando);
  if (!partida.chefe && partida.trofeus >= metaDeTrofeus(partida)) {
    partida.chefe = {
      vida: REGRA.chefeVidaBase + partida.pessoas.length + partida.caveiras,
      valor: REGRA.chefeValor + partida.caveiras,
    };
    registrar(partida, quando, `O chefe apareceu: vida ${partida.chefe.vida}, valor ${partida.chefe.valor}.`);
  }
}

function ferir(partida: Partida, quem: number, quando: string): void {
  const pessoa = partida.pessoas[quem];
  pessoa.folego -= 1;
  partida.ameaca += 1;
  registrar(partida, quando, `A cena venceu ${pessoa.nome}: −1 de Fôlego (${pessoa.folego}) e a Ameaça sobe 1.`);
  if (pessoa.folego > 0) return;

  const quemLevanta = partida.pessoas.find((p, i) => i !== quem && p.dama);
  if (!quemLevanta) {
    encerrar(partida, 'derrota', `${pessoa.nome} caiu e ninguém pôde levantar.`, quando);
    return;
  }
  quemLevanta.dama = false;
  pessoa.folego = 1;
  registrar(partida, quando, `${pessoa.nome} caiu; ${quemLevanta.nome} deitou a Dama para levantar.`);
}

function dispararPoder(partida: Partida, quem: number, quando: string): void {
  const pessoa = partida.pessoas[quem];
  const cena = pessoa.cena!;
  const poder = CLASSES[pessoa.classe].nome;

  if (pessoa.classe === 'spades') {
    partida.ameaca = Math.max(0, partida.ameaca - 1);
    registrar(partida, quando, `${poder}: a Ameaça cai para ${partida.ameaca}.`);
    return;
  }
  if (pessoa.classe === 'hearts') {
    const falta = (p: Pessoa): number => p.folegoMax - p.folego;
    const alvo = [pessoa, ...partida.pessoas.filter((p) => p !== pessoa)].reduce((a, b) => (falta(b) > falta(a) ? b : a));
    if (falta(alvo) === 0) return;
    alvo.folego += 1;
    registrar(partida, quando, `${poder}: +1 de Fôlego para ${alvo.nome}.`);
    return;
  }
  if (pessoa.classe === 'diamonds') {
    const alvo = [pessoa, ...partida.pessoas.filter((p) => p !== pessoa)].find((p) => !p.dama);
    if (!alvo) return;
    alvo.dama = true;
    registrar(partida, quando, `${poder}: a Dama de ${alvo.nome} recarrega.`);
    return;
  }
  const baralhoDoEco = partida.pessoas[cena.eco].baralho;
  cena.espiada = baralhoDoEco[baralhoDoEco.length - 1] ?? null;
  if (cena.espiada) registrar(partida, quando, `${poder}: o próximo fundo de ${partida.pessoas[cena.eco].nome} é ${codigo(cena.espiada)}.`);
}

function virarFundo(partida: Partida, quem: number, quando: string): boolean {
  const pessoa = partida.pessoas[quem];
  const cena = pessoa.cena;
  if (!cena || !cenaComecou(cena) || cena.desfecho) return false;
  const fundo = puxar(partida, cena.eco, 'fundo', quando);
  if (!fundo) return true;
  resolverFundo(partida, quem, fundo, quando);
  if (cena.desfecho === 'derrota' && pessoa.dama && !partida.resultado) {
    cena.pendente = true;
    return true;
  }
  aplicarDesfecho(partida, quem, quando);
  return true;
}

function resolverFundo(partida: Partida, quem: number, fundo: Carta, quando: string): void {
  const cena = partida.pessoas[quem].cena!;
  const bonus = bonusDaCena(partida, quem);
  const total = valorDe(fundo) + bonus.total;
  cena.fundos.push(fundo);
  cena.desfecho = desfechoDe(total - cena.alvo);
  const nomes: Record<Desfecho, string> = { vitoria: 'vitória', custo: 'vitória com custo', derrota: 'a cena venceu' };
  const conta = [String(valorDe(fundo)), ...bonus.partes].join(' + ');
  registrar(
    partida,
    quando,
    `${partida.pessoas[cena.eco].nome} virou o fundo: ${codigo(fundo)}. ${conta} = ${total}, contra ${cena.alvo}: ${nomes[cena.desfecho]}.`,
  );
}

function deitarDama(partida: Partida, quem: number, quando: string): boolean {
  const pessoa = partida.pessoas[quem];
  const cena = pessoa.cena;
  if (!cena?.pendente || !pessoa.dama) return false;
  pessoa.dama = false;
  registrar(partida, quando, `${pessoa.nome} deitou a Dama: o fundo é descartado.`);
  const fundo = puxar(partida, cena.eco, 'fundo', quando);
  if (!fundo) return true;
  resolverFundo(partida, quem, fundo, quando);
  aplicarDesfecho(partida, quem, quando);
  return true;
}

function enterrarEspiada(partida: Partida, quem: number, quando: string): boolean {
  const cena = partida.pessoas[quem].cena;
  if (!cena?.espiada) return false;
  const baralho = partida.pessoas[cena.eco].baralho;
  if (baralho[baralho.length - 1] !== cena.espiada) return false;
  baralho.splice(Math.floor(baralho.length / 2), 0, baralho.pop()!);
  registrar(partida, quando, `Batedor: ${codigo(cena.espiada)} foi para o meio do baralho.`);
  cena.espiada = null;
  return true;
}

function ajudar(partida: Partida, quem: number, de: number, quando: string): boolean {
  const cena = partida.pessoas[quem].cena;
  const ajudante = partida.pessoas[de];
  if (!cena || !cenaComecou(cena) || cena.desfecho || cena.ajudaDe !== null) return false;
  if (!ajudante || de === quem || ajudante.folego < 2) return false;
  ajudante.folego -= 1;
  cena.ajudaDe = de;
  registrar(partida, quando, `${ajudante.nome} ajudou ${partida.pessoas[quem].nome}: −1 de Fôlego, +${REGRA.bonusAjuda} na cena.`);
  return true;
}

function usarValete(partida: Partida, quem: number, quando: string): boolean {
  const pessoa = partida.pessoas[quem];
  const cena = pessoa.cena;
  if (!cena || !cenaComecou(cena) || cena.desfecho || !pessoa.valete) return false;
  pessoa.valete = false;
  cena.valete = true;
  pessoa.folegoMax -= 1;
  pessoa.folego = Math.min(pessoa.folego, pessoa.folegoMax);
  registrar(partida, quando, `${pessoa.nome} revelou o Valete: +${REGRA.bonusValete}. O Fôlego máximo cai para ${pessoa.folegoMax}.`);
  return true;
}

/** Texto da cena: só vale enquanto a cena está aberta e antes do desfecho. */
function escreverNaCena(
  partida: Partida,
  quem: number,
  campo: 'declaracao' | 'leitura' | 'sinal' | 'sinalConfirmado' | 'gesto',
  texto: string,
): boolean {
  const cena = partida.pessoas[quem].cena;
  const limpo = texto.trim();
  if (!cena || cena.desfecho || !limpo || cena[campo]) return false;
  const precisaDe: Record<typeof campo, boolean> = {
    declaracao: true,
    leitura: !!cena.declaracao,
    sinal: cenaComecou(cena),
    sinalConfirmado: cenaComecou(cena) && !!cena.sinal,
    gesto: cenaComecou(cena),
  };
  if (!precisaDe[campo]) return false;
  cena[campo] = limpo;
  return true;
}

function narrar(partida: Partida, quem: number, texto: string, quando: string): boolean {
  const pessoa = partida.pessoas[quem];
  const cena = pessoa.cena;
  if (!cena?.desfecho || cena.pendente || !texto.trim()) return false;
  registrar(partida, quando, `${partida.pessoas[cena.eco].nome} narra: “${texto.trim()}”`);
  pessoa.cena = null;
  return true;
}

function falas(partida: Partida, acao: Acao, quando: string): boolean {
  if (!('quem' in acao)) return false;
  const pessoa = partida.pessoas[acao.quem];
  const cena = pessoa?.cena;
  if (!cena) return false;
  const eco = partida.pessoas[cena.eco].nome;

  switch (acao.tipo) {
    case 'declarar':
      if (!escreverNaCena(partida, acao.quem, 'declaracao', acao.texto)) return false;
      registrar(partida, quando, `${pessoa.nome}: “${cena.declaracao}”`);
      return true;
    case 'ler':
      if (!escreverNaCena(partida, acao.quem, 'leitura', acao.texto)) return false;
      registrar(partida, quando, `${eco} (leitura): “${cena.leitura}”`);
      return true;
    case 'sinal':
      if (!escreverNaCena(partida, acao.quem, 'sinal', acao.relato)) return false;
      registrar(partida, quando, `${pessoa.nome} viu o sinal: “${cena.sinal}”`);
      if (jogaSozinho(partida)) cena.sinalConfirmado = cena.sinal;
      return true;
    case 'confirmarSinal':
      if (!escreverNaCena(partida, acao.quem, 'sinalConfirmado', acao.resposta)) return false;
      registrar(partida, quando, `${eco} confirmou o sinal: “${cena.sinalConfirmado}” (+${REGRA.bonusSinal})`);
      return true;
    case 'gesto':
      if (!escreverNaCena(partida, acao.quem, 'gesto', acao.relato)) return false;
      registrar(partida, quando, `${pessoa.nome} fez o gesto: “${cena.gesto}” (+${REGRA.bonusGesto})`);
      return true;
    default:
      return false;
  }
}

function mandarSinal(partida: Partida, de: number, para: number, texto: string, quando: string): boolean {
  const origem = partida.pessoas[de];
  const destino = partida.pessoas[para];
  if (!origem || !destino || de === para || !texto.trim()) return false;
  destino.sinalRecebido = texto.trim();
  registrar(partida, quando, `${origem.nome} mandou um sinal para ${destino.nome}: “${destino.sinalRecebido}”`);
  return true;
}

function executar(partida: Partida, acao: Acao, quando: string): boolean {
  switch (acao.tipo) {
    case 'abrir':
      return abrir(partida, acao.quem, acao.eco, quando);
    case 'ajudar':
      return ajudar(partida, acao.quem, acao.de, quando);
    case 'valete':
      return usarValete(partida, acao.quem, quando);
    case 'virarFundo':
      return virarFundo(partida, acao.quem, quando);
    case 'deitarDama':
      return deitarDama(partida, acao.quem, quando);
    case 'aceitarDerrota': {
      const cena = partida.pessoas[acao.quem]?.cena;
      if (!cena?.pendente) return false;
      aplicarDesfecho(partida, acao.quem, quando);
      return true;
    }
    case 'enterrarEspiada':
      return enterrarEspiada(partida, acao.quem, quando);
    case 'narrar':
      return narrar(partida, acao.quem, acao.texto, quando);
    case 'mandarSinal':
      return mandarSinal(partida, acao.de, acao.para, acao.texto, quando);
    default:
      return falas(partida, acao, quando);
  }
}

/** Depois do fim, só resta narrar as cenas que ficaram abertas. */
export function agir(partida: Partida, acao: Acao, opcoes: OpcoesDaAcao = {}): Partida {
  if (partida.resultado && acao.tipo !== 'narrar') return partida;
  if ('quem' in acao && !partida.pessoas[acao.quem]) return partida;
  const nova = structuredClone(partida);
  return executar(nova, acao, opcoes.quando ?? horaAgora()) ? nova : partida;
}

/** Linha para colar na conversa quando se joga a distância. */
export function linhaDeStatus(partida: Partida): string {
  const pessoas = partida.pessoas.map((p) => {
    const partes = [`Fôlego ${p.folego}/${p.folegoMax}`, `Dama ${p.dama ? 'pronta' : 'deitada'}`];
    if (!p.valete) partes.push('Valete usado');
    if (p.cena) partes.push(`cena ${p.cena.topo ? codigo(p.cena.topo) : 'chefe'}${p.cena.declaracao ? ` = ${p.cena.declaracao}` : ''}`);
    return `${p.nome}: ${partes.join(', ')}`;
  });
  const chefe = partida.chefe ? ` · chefe: vida ${partida.chefe.vida}, valor ${partida.chefe.valor}` : '';
  return [`troféus ${partida.trofeus}/${metaDeTrofeus(partida)} · Ameaça ${partida.ameaca}/${limiteDeAmeaca(partida)}${chefe}`, ...pessoas].join(' · ');
}
