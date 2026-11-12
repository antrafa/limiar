import { DESAFIOS_MASTER, REGRA } from '../core/partida';
import type { GameCard, ThemeDeck } from '../types/card';
import { escapeHtml, isFigure, renderMagicCardHtml } from './card-renderer';
import { qrDaCartaSvg } from './scanner';
import { NUANCES_DO_TEMA } from './temas-view';

export type PrintFilterMode = 'mission' | 'figures' | 'dinamismo' | 'all';
export type EstampaDoVerso = 'portal' | 'tema' | 'papel';
export type TamanhoDaCarta = 'poker' | 'bridge';
export type FormatoDeImpressao = 'a4' | 'a4-sangria' | 'card-intercalado' | 'card-lote';

export interface ConfigDeImpressao {
  conjunto: PrintFilterMode;
  verso: EstampaDoVerso;
  frenteEVerso: boolean;
  escala: number; // 1 = tamanho real; 1.0363 compensa impressoras que reduzem para 96,5%
  codigo: boolean; // QR no lugar do ícone da arte, para o escaneador
  tamanho?: TamanhoDaCarta; // 'poker' (63 × 88 mm) | 'bridge' (57 × 87 mm)
  formato?: FormatoDeImpressao; // 'a4' | 'a4-sangria' | 'card-intercalado' | 'card-lote'
}

export function configDeImpressaoPadrao(): ConfigDeImpressao {
  return {
    conjunto: 'mission',
    verso: 'portal',
    frenteEVerso: true,
    escala: 1,
    codigo: true,
    tamanho: 'poker',
    formato: 'a4',
  };
}

export const DIMENSOES_CARTA: Record<
  TamanhoDaCarta,
  { nome: string; rotuloCurto: string; largura: number; altura: number; sangria: number }
> = {
  poker: {
    nome: 'Poker (63 × 88 mm)',
    rotuloCurto: 'Poker 63 × 88 mm',
    largura: 63,
    altura: 88,
    sangria: 2,
  },
  bridge: {
    nome: 'Bridge (57 × 87 mm)',
    rotuloCurto: 'Bridge 57 × 87 mm',
    largura: 57,
    altura: 87,
    sangria: 2,
  },
};

const A4 = { largura: 210, altura: 297 } as const;
const POR_FOLHA = 9;

const CONJUNTOS: Array<{ id: PrintFilterMode; label: string }> = [
  { id: 'mission', label: 'Cenas e Coringas (42 cartas · 5 folhas)' },
  { id: 'figures', label: 'Trio de Bolso dos 4 naipes (12 cartas · 2 folhas)' },
  { id: 'dinamismo', label: 'Kit de Dinamismo: Desafios Master, Marcos e Oráculo (9 cartas · 1 folha)' },
  { id: 'all', label: 'Tudo (54 cartas · 6 folhas)' },
];

const TAMANHOS: Array<{ id: TamanhoDaCarta; label: string }> = [
  { id: 'poker', label: 'Poker — 63 × 88 mm (c/ sangria: 67 × 92 mm)' },
  { id: 'bridge', label: 'Bridge — 57 × 87 mm (c/ sangria: 61 × 91 mm)' },
];

const FORMATOS: Array<{ id: FormatoDeImpressao; grupo: string; label: string }> = [
  { id: 'a4', grupo: 'Folhas A4 (Grade 3×3)', label: 'A4 Rente (16 marcas de corte contínuas)' },
  { id: 'a4-sangria', grupo: 'Folhas A4 (Grade 3×3)', label: 'A4 c/ Sangria 2 mm (40 guias de corte)' },
  { id: 'card-intercalado', grupo: 'PDF Uma Embaixo da Outra (Card-a-Card)', label: 'Card-a-Card: Frente + Verso intercalados' },
  { id: 'card-lote', grupo: 'PDF Uma Embaixo da Outra (Card-a-Card)', label: 'Card-a-Card: Lote de Frentes + 1 Verso no final' },
];

const ESTAMPAS: Array<{ id: EstampaDoVerso; nome: string; descricao: string }> = [
  { id: 'portal', nome: 'Rosa do Eclipse', descricao: 'Ardósia e ouro velho com a rosa dos ventos do banner.' },
  { id: 'tema', nome: 'Cor do tema', descricao: 'Rosa astral na cor e com o nome do tema ativo.' },
  { id: 'papel', nome: 'Papel', descricao: 'Marfim com traço fino de astrolábio. Economiza tinta.' },
];

export function gerarCartasDeDinamismo(deck: ThemeDeck): GameCard[] {
  const nuance = NUANCES_DO_TEMA[deck.id] ?? NUANCES_DO_TEMA.eclipse;
  const base = (
    idx: number,
    code: string,
    suit: GameCard['suit'],
    title: string,
    glyph: string,
    idea: string,
    historia: string,
    sinal: string,
    gesto: string,
  ): GameCard => ({
    id: `${deck.id}-din-${idx}`,
    collectorNumber: 54 + idx,
    themeId: deck.id,
    suit,
    rank: '8',
    playingCardCode: code,
    kind: 'journey',
    typeLine: 'Cena · Dinamismo',
    title,
    artGlyph: glyph,
    artSubtitle: 'Carta de Dinamismo',
    flavorText: '',
    dailyIdea: idea,
    topWatcherEvent: historia,
    topWatcherTrigger: sinal,
    bottomEchoPrompt: gesto,
  });

  return [
    base(
      1,
      '8♠',
      'spades',
      'Desafio Master · Corpo e Energia',
      '⚔',
      'Use nas cartas 8♠, 9♠ e 10♠ ou quando quiser destravar uma cena difícil (+2).',
      `Encontro de Confronto em ${deck.name}. Escolha 1 missão saudável rápida para somar +${REGRA.bonusDesafioMaster} no desfecho:`,
      `• ${DESAFIOS_MASTER.spades[0]} • ${DESAFIOS_MASTER.spades[1]}`,
      `• ${DESAFIOS_MASTER.spades[2]} (vale +${REGRA.bonusDesafioMaster} na cena)`,
    ),
    base(
      2,
      '8♥',
      'hearts',
      'Desafio Master · Gentileza e Vínculo',
      '♥',
      'Use nas cartas 8♥, 9♥ e 10♥ ou para fortalecer o grupo no dia (+2).',
      `Encontro de Vínculo em ${deck.name}. Escolha 1 missão leve de conexão humana para somar +${REGRA.bonusDesafioMaster}:`,
      `• ${DESAFIOS_MASTER.hearts[0]} • ${DESAFIOS_MASTER.hearts[1]}`,
      `• ${DESAFIOS_MASTER.hearts[2]} (vale +${REGRA.bonusDesafioMaster} na cena)`,
    ),
    base(
      3,
      '8♦',
      'diamonds',
      'Desafio Master · Hidratação e Ordem',
      '♦',
      'Use nas cartas 8♦, 9♦ e 10♦ ou como pausa revigorante (+2).',
      `Encontro de Recurso em ${deck.name}. Escolha 1 missão saudável de cuidado prático para somar +${REGRA.bonusDesafioMaster}:`,
      `• ${DESAFIOS_MASTER.diamonds[0]} • ${DESAFIOS_MASTER.diamonds[1]}`,
      `• ${DESAFIOS_MASTER.diamonds[2]} (vale +${REGRA.bonusDesafioMaster} na cena)`,
    ),
    base(
      4,
      '8♣',
      'clubs',
      'Desafio Master · Respiração e Foco',
      '♣',
      'Use nas cartas 8♣, 9♣ e 10♣ ou quando o dia estiver corrido (+2).',
      `Encontro de Mistério em ${deck.name}. Escolha 1 missão rápida de presença para somar +${REGRA.bonusDesafioMaster}:`,
      `• ${DESAFIOS_MASTER.clubs[0]} • ${DESAFIOS_MASTER.clubs[1]}`,
      `• ${DESAFIOS_MASTER.clubs[2]} (vale +${REGRA.bonusDesafioMaster} na cena)`,
    ),
    base(
      5,
      '2♠',
      'spades',
      'Oráculo Rápido · Quem Vive a Cena',
      '💬',
      'Sem tempo para inventar? Escolha uma frase pronta em 5 segundos:',
      '1. “Esta reunião/tarefa de agora vira a carta.” 2. “O trajeto até lá é a travessia.” 3. “Resolver esta pendência é o obstáculo.”',
      'Para o Sinal (+2): “Vi na rua um detalhe parecido com o da carta.”',
      'Para o Gesto (+1): “Fiz a pausa/ação sugerida antes de terminar.”',
    ),
    base(
      6,
      '2♥',
      'hearts',
      'Oráculo Rápido · Leitura do Eco',
      '🔮',
      'Moldes prontos para o Eco conectar o dia ao tema sem travar:',
      '1. “Na história, essa tarefa é a passagem vigiada do nosso cenário.” 2. “Cada etapa concluída afasta o perigo por mais uma hora.”',
      'Vitória: “Passamos limpo e guardamos o troféu.”',
      'Com custo / Derrota: “Conseguimos, mas o cerco apertou (+1 Ameaça).”',
    ),
    base(
      7,
      '3♦',
      'diamonds',
      'Marco 1 · Primeiro Presságio (33%)',
      '⚑',
      'Ative ao atingir 1/3 da meta de troféus (10 pts/pessoa na padrão ou 5 na rápida).',
      `O mundo reage: os primeiros sinais de ${deck.chefe.nome} aparecem no horizonte.`,
      'Recompensa do grupo (escolha 1): Todo mundo recupera +1 de Fôlego;',
      'OU recarreguem 1 Dama deitada; OU reduzam a Ameaça em 1.',
    ),
    base(
      8,
      '6♦',
      'diamonds',
      'Marco 2 · Sombra do Chefe (66%)',
      '⚡',
      'Ative ao atingir 2/3 da meta de troféus (20 pts/pessoa na padrão ou 10 na rápida).',
      `A presença de ${deck.chefe.nome} já domina o cenário: falta pouco para o confronto final!`,
      'Recompensa do grupo (escolha 1): Reduzam a Ameaça em 1;',
      'OU todo mundo recupera +1 de Fôlego; OU recarreguem 1 Dama.',
    ),
    base(
      9,
      'A♠',
      'spades',
      `Status do Mundo · ${deck.name}`,
      '🌍',
      'Use um clipe ou moeda na borda desta carta para marcar a tensão atual da campanha:',
      `[1] Calmo (início) → [2] Atenção (40% da Ameaça) → [3] Crítico (a 2 do limite) → [4] Chefe: ${deck.chefe.nome}.`,
      `Se a Ameaça subir: ${nuance.oQueEAmeaca}`,
      `Chefe (Valor ${REGRA.chefeValor} · Vida ${REGRA.chefeVidaBase}+pessoas): ${deck.chefe.descricao}`,
    ),
  ];
}

export function filterCardsForPrint(deck: ThemeDeck, filterMode: PrintFilterMode): GameCard[] {
  if (filterMode === 'figures') return deck.cards.filter(isFigure);
  if (filterMode === 'mission') return deck.cards.filter((c) => !isFigure(c));
  if (filterMode === 'dinamismo') return gerarCartasDeDinamismo(deck);
  return deck.cards;
}

interface Geometria {
  tamanho: TamanhoDaCarta;
  comSangria: boolean;
  sangriaMm: number;
  corte: { largura: number; altura: number };
  carta: { largura: number; altura: number };
  grade: { largura: number; altura: number; topo: number; esquerda: number };
}

function geometria(config: ConfigDeImpressao): Geometria {
  const tamanho: TamanhoDaCarta = config.tamanho ?? 'poker';
  const formato: FormatoDeImpressao = config.formato ?? 'a4';
  const dim = DIMENSOES_CARTA[tamanho];
  const comSangria = formato === 'a4-sangria' || formato === 'card-intercalado' || formato === 'card-lote';
  const escala = formato === 'card-intercalado' || formato === 'card-lote' ? 1 : config.escala;
  const sangriaBase = comSangria ? dim.sangria : 0;
  const sangriaMm = +(sangriaBase * escala).toFixed(2);
  const largBase = dim.largura + 2 * sangriaBase;
  const altBase = dim.altura + 2 * sangriaBase;
  const largura = +(largBase * escala).toFixed(2);
  const altura = +(altBase * escala).toFixed(2);
  return {
    tamanho,
    comSangria,
    sangriaMm,
    corte: { largura: dim.largura, altura: dim.altura },
    carta: { largura, altura },
    grade: {
      largura: +(3 * largura).toFixed(2),
      altura: +(3 * altura).toFixed(2),
      topo: +((A4.altura - 3 * altura) / 2).toFixed(2),
      esquerda: +((A4.largura - 3 * largura) / 2).toFixed(2),
    },
  };
}

/**
 * Marcas de corte fora da grade:
 * - Sem sangria: 16 marcas contínuas (4 linhas verticais e 4 horizontais).
 * - Com sangria (2 mm): 40 marcas (16 limites tracejados vermelhos + 24 linhas sólidas de corte final).
 */
function marcasDeCorte(g: Geometria): string {
  const marcas: string[] = [];
  if (!g.comSangria) {
    for (let i = 0; i <= 3; i++) {
      const x = (i * g.carta.largura).toFixed(2);
      const y = (i * g.carta.altura).toFixed(2);
      marcas.push(`<span class="marca marca--topo" style="left:${x}mm"></span>`, `<span class="marca marca--base" style="left:${x}mm"></span>`);
      marcas.push(`<span class="marca marca--esq" style="top:${y}mm"></span>`, `<span class="marca marca--dir" style="top:${y}mm"></span>`);
    }
    return marcas.join('');
  }

  for (let i = 0; i <= 3; i++) {
    const xLim = (i * g.carta.largura).toFixed(2);
    const yLim = (i * g.carta.altura).toFixed(2);
    marcas.push(
      `<span class="marca marca--topo marca--limite-sangria" style="left:${xLim}mm" title="Limite da sangria (${xLim} mm)"></span>`,
      `<span class="marca marca--base marca--limite-sangria" style="left:${xLim}mm" title="Limite da sangria (${xLim} mm)"></span>`,
      `<span class="marca marca--esq marca--limite-sangria" style="top:${yLim}mm" title="Limite da sangria (${yLim} mm)"></span>`,
      `<span class="marca marca--dir marca--limite-sangria" style="top:${yLim}mm" title="Limite da sangria (${yLim} mm)"></span>`,
    );
  }
  for (let c = 0; c < 3; c++) {
    const xEsq = (c * g.carta.largura + g.sangriaMm).toFixed(2);
    const xDir = ((c + 1) * g.carta.largura - g.sangriaMm).toFixed(2);
    const yTop = (c * g.carta.altura + g.sangriaMm).toFixed(2);
    const yBot = ((c + 1) * g.carta.altura - g.sangriaMm).toFixed(2);
    marcas.push(
      `<span class="marca marca--topo marca--sangria" style="left:${xEsq}mm" title="Corte final (${xEsq} mm)"></span>`,
      `<span class="marca marca--base marca--sangria" style="left:${xEsq}mm" title="Corte final (${xEsq} mm)"></span>`,
      `<span class="marca marca--topo marca--sangria" style="left:${xDir}mm" title="Corte final (${xDir} mm)"></span>`,
      `<span class="marca marca--base marca--sangria" style="left:${xDir}mm" title="Corte final (${xDir} mm)"></span>`,
      `<span class="marca marca--esq marca--sangria" style="top:${yTop}mm" title="Corte final (${yTop} mm)"></span>`,
      `<span class="marca marca--dir marca--sangria" style="top:${yTop}mm" title="Corte final (${yTop} mm)"></span>`,
      `<span class="marca marca--esq marca--sangria" style="top:${yBot}mm" title="Corte final (${yBot} mm)"></span>`,
      `<span class="marca marca--dir marca--sangria" style="top:${yBot}mm" title="Corte final (${yBot} mm)"></span>`,
    );
  }
  return marcas.join('');
}

function estiloDaGrade(g: Geometria): string {
  return `top:${g.grade.topo}mm;left:${g.grade.esquerda}mm;width:${g.grade.largura}mm;height:${g.grade.altura}mm;grid-template-columns:repeat(3,${g.carta.largura}mm);grid-template-rows:repeat(3,${g.carta.altura}mm)`;
}

export function renderVersoHtml(deck: ThemeDeck, estampa: EstampaDoVerso): string {
  return `
    <div class="verso verso--${estampa}" style="--tema:${escapeHtml(deck.accentColor)}">
      <svg class="verso-arte" viewBox="0 0 126 176" fill="none" aria-hidden="true">
        <!-- Moldura dupla e cantoneiras de astrolábio -->
        <rect x="6.5" y="6.5" width="113" height="163" rx="5" stroke="currentColor" stroke-width="1.2" />
        <rect x="10" y="10" width="106" height="156" rx="3" stroke="currentColor" stroke-opacity="0.45" stroke-width="0.7" />
        <path d="M10 22h7v-7h5v-5M116 22h-7v-7h-5v-5M10 154h7v7h5v5M116 154h-7v7h-5v5" stroke="currentColor" stroke-width="0.9" stroke-opacity="0.8" />

        <!-- Losangos cardinais na moldura -->
        <path d="M63 7.8 65.2 10 63 12.2 60.8 10ZM63 163.8l2.2 2.2-2.2 2.2-2.2-2.2ZM10 85.8 12.2 88 10 90.2 7.8 88ZM116 85.8l2.2 2.2-2.2 2.2-2.2-2.2Z" fill="currentColor" />

        <!-- Arcos de eclipse espelhados (simetria 180°) -->
        <path d="M31 44c8-13 20-18.5 32-18.5S87 31 95 44c-9-9.5-20-14-32-14s-23 4.5-32 14Z" fill="currentColor" />
        <path d="M31 132c8 13 20 18.5 32 18.5S87 145 95 132c-9 9.5-20 14-32 14s-23-4.5-32-14Z" fill="currentColor" />

        <!-- Meridiano da fenda e estrelas de guarda -->
        <line x1="63" y1="15" x2="63" y2="161" stroke="currentColor" stroke-opacity="0.32" stroke-width="0.7" />
        <line x1="15" y1="88" x2="111" y2="88" stroke="currentColor" stroke-opacity="0.32" stroke-width="0.7" />
        <path d="M63 17.5 64.8 21 63 24.5 61.2 21ZM63 151.5l1.8 3.5-1.8 3.5-1.8-3.5Z" fill="currentColor" />

        <!-- Anéis graduados da bússola -->
        <circle cx="63" cy="88" r="35" stroke="currentColor" stroke-width="1" />
        <circle cx="63" cy="88" r="31.5" stroke="currentColor" stroke-opacity="0.5" stroke-width="0.6" stroke-dasharray="1.6 2.5" />
        <circle cx="63" cy="88" r="21" stroke="currentColor" stroke-opacity="0.4" stroke-width="0.6" />

        <!-- 4 pontas diagonais da rosa dos ventos -->
        <path d="M63 88 83 68 67.5 88 63 83.5ZM63 88 83 108 63 92.5 67.5 88ZM63 88 43 108 58.5 88 63 92.5ZM63 88 43 68 63 83.5 58.5 88Z" fill="currentColor" fill-opacity="0.45" />
        <path d="M83 68 63 83.5 43 68 58.5 88 43 108 63 92.5 83 108 67.5 88Z" stroke="currentColor" stroke-width="0.7" />

        <!-- 4 pontas cardinais facetadas (N, S, L, O) -->
        <path d="M63 44 68.5 82.5 63 88V44ZM63 132 57.5 93.5 63 88v44ZM102 88 68.5 93.5 63 88h39ZM24 88l33.5-5.5L63 88H24Z" fill="currentColor" />
        <path d="M63 44 57.5 82.5 63 88 68.5 82.5ZM63 132l5.5-38.5L63 88l-5.5 5.5ZM102 88 68.5 82.5 63 88l5.5 5.5ZM24 88l33.5 5.5L63 88l-5.5-5.5Z" stroke="currentColor" stroke-width="0.85" />

        <!-- Losango central do Limiar -->
        <circle cx="63" cy="88" r="6.5" fill="var(--verso-fundo)" stroke="currentColor" stroke-width="0.9" />
        <path d="M63 83.2 66.4 88 63 92.8 59.6 88Z" fill="currentColor" />
      </svg>
      ${estampa === 'tema' ? `<span class="verso-tema">${escapeHtml(deck.name)}</span>` : ''}
    </div>`;
}

interface Folha {
  lado: 'frente' | 'verso';
  slots: Array<string | null>; // HTML de cada uma das 9 posições; null = vazio
}

function montarFolhas(deck: ThemeDeck, config: ConfigDeImpressao): Folha[] {
  const cartas = filterCardsForPrint(deck, config.conjunto);
  const verso = renderVersoHtml(deck, config.verso);
  const folhas: Folha[] = [];
  for (let i = 0; i < cartas.length; i += POR_FOLHA) {
    const pagina = cartas.slice(i, i + POR_FOLHA);
    const frentes = Array.from({ length: POR_FOLHA }, (_, k) =>
      pagina[k] ? renderMagicCardHtml(pagina[k], config.codigo ? { qr: qrDaCartaSvg(pagina[k]) } : {}) : null,
    );
    folhas.push({ lado: 'frente', slots: frentes });
    if (!config.frenteEVerso) continue;
    // Na impressão frente e verso a folha vira pela borda longa: a coluna da esquerda cai na direita.
    const versos = frentes.map((_, k) => {
      const linha = Math.floor(k / 3);
      const colunaDaFrente = 2 - (k % 3);
      return frentes[linha * 3 + colunaDaFrente] ? verso : null;
    });
    folhas.push({ lado: 'verso', slots: versos });
  }
  return folhas;
}

function renderFolhaA4(deck: ThemeDeck, config: ConfigDeImpressao, folha: Folha, numero: number, total: number): string {
  const g = geometria(config);
  const compensada = config.escala !== 1;
  const aviso = compensada
    ? 'Pré-compensada +3,63% para impressoras que reduzem para 96,5%'
    : 'Imprima em tamanho real (escala 100%), sem “Ajustar à página”';
  const estiloSlot = g.comSangria ? ` style="padding:${g.sangriaMm}mm"` : '';
  const slots = folha.slots
    .map((html) => `<div class="folha-slot ${html ? '' : 'is-vazio'}${g.comSangria ? ' com-sangria' : ''}"${html ? estiloSlot : ''}>${html ?? ''}</div>`)
    .join('');

  const infoMedidas = g.comSangria
    ? `${g.carta.largura} × ${g.carta.altura} mm c/ sangria 2 mm → corte em ${g.corte.largura} × ${g.corte.altura} mm`
    : `${g.corte.largura} × ${g.corte.altura} mm`;

  return `
    <section class="folha-a4 folha-a4--${folha.lado}${g.comSangria ? ' folha-a4--com-sangria' : ''}">
      <div class="folha-info">${escapeHtml(deck.name)} · página ${numero} de ${total} · ${folha.lado === 'frente' ? 'frente' : 'verso (colunas espelhadas)'} · ${infoMedidas}</div>
      <div class="folha-marcas${g.comSangria ? ' folha-marcas--com-sangria' : ''}" style="top:${g.grade.topo}mm;left:${g.grade.esquerda}mm;width:${g.grade.largura}mm;height:${g.grade.altura}mm">${marcasDeCorte(g)}</div>
      <div class="folha-grade" style="${estiloDaGrade(g)}">${slots}</div>
      <div class="folha-regua">
        <span>${aviso}</span>
        <span class="regua" style="width:${(50 * config.escala).toFixed(2)}mm" title="No papel, esta barra deve medir 5 cm">
          <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5 cm</span>
        </span>
      </div>
    </section>`;
}

function renderCartasEmpilhadas(deck: ThemeDeck, config: ConfigDeImpressao): string {
  const g = geometria(config);
  const formato = config.formato ?? 'card-intercalado';
  const cartas = filterCardsForPrint(deck, config.conjunto);
  const verso = renderVersoHtml(deck, config.verso);
  const paginas: string[] = [];
  let numPagina = 1;

  for (const carta of cartas) {
    const htmlFrente = renderMagicCardHtml(carta, config.codigo ? { qr: qrDaCartaSvg(carta) } : {});
    paginas.push(`
      <section class="folha-card-grafica folha-card-grafica--frente" data-pagina="${numPagina++}" data-card-id="${escapeHtml(carta.id)}" style="width:${g.carta.largura}mm;height:${g.carta.altura}mm;padding:${g.sangriaMm}mm">
        ${htmlFrente}
      </section>`);

    if (config.frenteEVerso && formato === 'card-intercalado') {
      paginas.push(`
        <section class="folha-card-grafica folha-card-grafica--verso" data-pagina="${numPagina++}" style="width:${g.carta.largura}mm;height:${g.carta.altura}mm;padding:${g.sangriaMm}mm">
          ${verso}
        </section>`);
    }
  }

  if (config.frenteEVerso && formato === 'card-lote' && cartas.length > 0) {
    paginas.push(`
      <section class="folha-card-grafica folha-card-grafica--verso" data-pagina="${numPagina++}" style="width:${g.carta.largura}mm;height:${g.carta.altura}mm;padding:${g.sangriaMm}mm">
        ${verso}
      </section>`);
  }

  return paginas.join('');
}

function renderEstampas(deck: ThemeDeck, atual: EstampaDoVerso): string {
  return ESTAMPAS.map(
    (e) => `
      <button type="button" class="estampa ${e.id === atual ? 'is-active' : ''}" data-print-verso="${e.id}" aria-pressed="${e.id === atual}">
        <span class="estampa-amostra">${renderVersoHtml(deck, e.id)}</span>
        <strong>${e.nome}</strong>
        <span class="muted">${e.descricao}</span>
      </button>`,
  ).join('');
}

export function renderPrintSheetsHtml(deck: ThemeDeck, config: ConfigDeImpressao = configDeImpressaoPadrao()): string {
  const tamanho: TamanhoDaCarta = config.tamanho ?? 'poker';
  const formato: FormatoDeImpressao = config.formato ?? 'a4';
  const isCardACard = formato === 'card-intercalado' || formato === 'card-lote';
  const g = geometria(config);
  const dim = DIMENSOES_CARTA[tamanho];

  const conjuntos = CONJUNTOS.map(
    (o) => `<option value="${o.id}" ${config.conjunto === o.id ? 'selected' : ''}>${o.label}</option>`,
  ).join('');

  const tamanhos = TAMANHOS.map(
    (t) => `<option value="${t.id}" ${tamanho === t.id ? 'selected' : ''}>${t.label}</option>`,
  ).join('');

  const formatos = FORMATOS.map(
    (f) => `<option value="${f.id}" ${formato === f.id ? 'selected' : ''}>${f.label}</option>`,
  ).join('');

  const pageCss = isCardACard
    ? `@page { size: ${g.carta.largura}mm ${g.carta.altura}mm; margin: 0; }`
    : `@page { size: A4 portrait; margin: 0; }`;

  const conteudoImpressao = isCardACard
    ? renderCartasEmpilhadas(deck, config)
    : (() => {
        const folhas = montarFolhas(deck, config);
        return folhas.map((f, i) => renderFolhaA4(deck, config, f, i + 1, folhas.length)).join('');
      })();

  const subtitulo = isCardACard
    ? `Modo Card-a-Card (${dim.rotuloCurto} c/ sangria de 2 mm → página ${g.carta.largura} × ${g.carta.altura} mm): as cartas ficam uma embaixo da outra, 1 por página no PDF.`
    : `Imprima em papel A4, retrato, escala 100% e margens “nenhuma”, com “gráficos de segundo plano” ligado (${dim.rotuloCurto}). Confira a régua de 5 cm no rodapé antes de cortar.`;

  return `
    <div class="print-studio-wrapper tamanho-${tamanho} formato-${formato}">
      <style class="print-page-rule">${pageCss}</style>
      <div class="print-controls no-print">
        <header class="section-head">
          <span class="eyebrow">Imprimir · ${escapeHtml(deck.name)} · ${dim.rotuloCurto}</span>
          <h2>${isCardACard ? 'Exportação PDF Card-a-Card (uma embaixo da outra)' : 'Folhas A4 com 9 cartas e marcas de corte'}</h2>
          <p class="lede">${subtitulo}</p>
        </header>
        <div class="print-options">
          <label class="field"><span class="field-label">O que imprimir</span>
            <select id="print-filter-select" class="select">${conjuntos}</select>
          </label>
          <label class="field"><span class="field-label">Tamanho da carta</span>
            <select id="print-tamanho-select" class="select">${tamanhos}</select>
          </label>
          <label class="field"><span class="field-label">Formato de saída / PDF</span>
            <select id="print-formato-select" class="select">${formatos}</select>
          </label>
          <label class="field" ${isCardACard ? 'style="display:none"' : ''}><span class="field-label">Calibração A4</span>
            <select id="print-escala-select" class="select">
              <option value="1" ${config.escala === 1 ? 'selected' : ''}>Tamanho real (${dim.largura} × ${dim.altura} mm)</option>
              <option value="1.0363" ${config.escala !== 1 ? 'selected' : ''}>Compensar impressora +3,63%</option>
            </select>
          </label>
          <label class="check"><input type="checkbox" id="print-duplex" ${config.frenteEVerso ? 'checked' : ''} /> Frente e verso (${isCardACard ? (formato === 'card-lote' ? '1 verso no final do lote' : 'verso intercalado após cada carta') : 'folha de fundos espelhada após cada frente'})</label>
          <label class="check"><input type="checkbox" id="print-codigo" ${config.codigo ? 'checked' : ''} /> Código QR para o escaneador</label>
          <button id="btn-trigger-print" type="button" class="btn-primary">${isCardACard ? 'Exportar PDF Card-a-Card (Ctrl+P)' : 'Imprimir ou salvar PDF'}</button>
        </div>
        <div class="print-backs">
          <span class="field-label">Fundo das cartas</span>
          <div class="estampas">${renderEstampas(deck, config.verso)}</div>
          <p class="muted">${isCardACard ? 'Na janela de impressão, escolha “Salvar como PDF” com margens “Nenhuma” e escala 100%: cada página terá exatamente 1 carta.' : 'Na impressora, escolha “frente e verso, virar pela borda longa”. As folhas de fundo já vêm com as colunas espelhadas para cair atrás da carta certa.'}</p>
        </div>
      </div>
      <div class="print-sheets-container ${isCardACard ? 'is-card-a-card' : ''}">${conteudoImpressao}</div>
    </div>`;
}
