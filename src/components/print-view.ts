import type { GameCard, ThemeDeck } from '../types/card';
import { escapeHtml, isFigure, renderMagicCardHtml } from './card-renderer';
import { qrDaCartaSvg } from './scanner';

export type PrintFilterMode = 'mission' | 'figures' | 'all';
export type EstampaDoVerso = 'portal' | 'tema' | 'papel';

export interface ConfigDeImpressao {
  conjunto: PrintFilterMode;
  verso: EstampaDoVerso;
  frenteEVerso: boolean;
  escala: number; // 1 = tamanho real; 1.0363 compensa impressoras que reduzem para 96,5%
  codigo: boolean; // QR no lugar do ícone da arte, para o escaneador
}

export function configDeImpressaoPadrao(): ConfigDeImpressao {
  return { conjunto: 'mission', verso: 'portal', frenteEVerso: true, escala: 1, codigo: true };
}

const CARTA = { largura: 63, altura: 88 } as const;
const A4 = { largura: 210, altura: 297 } as const;
const POR_FOLHA = 9;

const CONJUNTOS: Array<{ id: PrintFilterMode; label: string }> = [
  { id: 'mission', label: 'Cenas e Coringas (42 cartas · 5 folhas)' },
  { id: 'figures', label: 'Trio de Bolso dos 4 naipes (12 cartas · 2 folhas)' },
  { id: 'all', label: 'Tudo (54 cartas · 6 folhas)' },
];

const ESTAMPAS: Array<{ id: EstampaDoVerso; nome: string; descricao: string }> = [
  { id: 'portal', nome: 'Portal', descricao: 'Grafite com o portal do Limiar. O mais bonito.' },
  { id: 'tema', nome: 'Cor do tema', descricao: 'Na cor e com o nome do tema ativo.' },
  { id: 'papel', nome: 'Papel', descricao: 'Claro e com traço fino. Economiza tinta.' },
];

export function filterCardsForPrint(deck: ThemeDeck, filterMode: PrintFilterMode): GameCard[] {
  if (filterMode === 'figures') return deck.cards.filter(isFigure);
  if (filterMode === 'mission') return deck.cards.filter((c) => !isFigure(c));
  return deck.cards;
}

interface Geometria {
  carta: { largura: number; altura: number };
  grade: { largura: number; altura: number; topo: number; esquerda: number };
}

function geometria(escala: number): Geometria {
  const largura = +(CARTA.largura * escala).toFixed(2);
  const altura = +(CARTA.altura * escala).toFixed(2);
  return {
    carta: { largura, altura },
    grade: {
      largura: +(3 * largura).toFixed(2),
      altura: +(3 * altura).toFixed(2),
      topo: +((A4.altura - 3 * altura) / 2).toFixed(2),
      esquerda: +((A4.largura - 3 * largura) / 2).toFixed(2),
    },
  };
}

/** 16 marcas contínuas: 4 linhas de corte verticais e 4 horizontais, marcadas fora da grade. */
function marcasDeCorte(g: Geometria): string {
  const marcas: string[] = [];
  for (let i = 0; i <= 3; i++) {
    const x = (i * g.carta.largura).toFixed(2);
    const y = (i * g.carta.altura).toFixed(2);
    marcas.push(`<span class="marca marca--topo" style="left:${x}mm"></span>`, `<span class="marca marca--base" style="left:${x}mm"></span>`);
    marcas.push(`<span class="marca marca--esq" style="top:${y}mm"></span>`, `<span class="marca marca--dir" style="top:${y}mm"></span>`);
  }
  return marcas.join('');
}

function estiloDaGrade(g: Geometria): string {
  return `top:${g.grade.topo}mm;left:${g.grade.esquerda}mm;width:${g.grade.largura}mm;height:${g.grade.altura}mm;grid-template-columns:repeat(3,${g.carta.largura}mm);grid-template-rows:repeat(3,${g.carta.altura}mm)`;
}

export function renderVersoHtml(deck: ThemeDeck, estampa: EstampaDoVerso): string {
  return `
    <div class="verso verso--${estampa}" style="--tema:${escapeHtml(deck.accentColor)}">
      <div class="verso-moldura">
        <span class="verso-portal" aria-hidden="true"><span>L</span></span>
        <span class="verso-marca">LIMIAR</span>
        ${estampa === 'tema' ? `<span class="verso-tema">${escapeHtml(deck.name)}</span>` : ''}
      </div>
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

function renderFolha(deck: ThemeDeck, config: ConfigDeImpressao, folha: Folha, numero: number, total: number): string {
  const g = geometria(config.escala);
  const compensada = config.escala !== 1;
  const aviso = compensada
    ? 'Pré-compensada +3,63% para impressoras que reduzem para 96,5%'
    : 'Imprima em tamanho real (escala 100%), sem “Ajustar à página”';
  const slots = folha.slots
    .map((html) => `<div class="folha-slot ${html ? '' : 'is-vazio'}">${html ?? ''}</div>`)
    .join('');

  return `
    <section class="folha-a4 folha-a4--${folha.lado}">
      <div class="folha-info">${escapeHtml(deck.name)} · página ${numero} de ${total} · ${folha.lado === 'frente' ? 'frente' : 'verso (colunas espelhadas)'} · ${CARTA.largura} × ${CARTA.altura} mm</div>
      <div class="folha-marcas" style="top:${g.grade.topo}mm;left:${g.grade.esquerda}mm;width:${g.grade.largura}mm;height:${g.grade.altura}mm">${marcasDeCorte(g)}</div>
      <div class="folha-grade" style="${estiloDaGrade(g)}">${slots}</div>
      <div class="folha-regua">
        <span>${aviso}</span>
        <span class="regua" style="width:${(50 * config.escala).toFixed(2)}mm" title="No papel, esta barra deve medir 5 cm">
          <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5 cm</span>
        </span>
      </div>
    </section>`;
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
  const folhas = montarFolhas(deck, config);
  const conjuntos = CONJUNTOS.map(
    (o) => `<option value="${o.id}" ${config.conjunto === o.id ? 'selected' : ''}>${o.label}</option>`,
  ).join('');

  return `
    <div class="print-studio-wrapper">
      <div class="print-controls no-print">
        <header class="section-head">
          <span class="eyebrow">Imprimir · ${escapeHtml(deck.name)}</span>
          <h2>Folhas A4 com 9 cartas e marcas de corte</h2>
          <p class="lede">Imprima em papel A4, retrato, escala 100% e margens “nenhuma”, com “gráficos de segundo plano” ligado. Confira a régua de 5 cm no rodapé antes de cortar. Corte primeiro as 4 linhas verticais, de ponta a ponta, e depois as horizontais.</p>
        </header>
        <div class="print-options">
          <label class="field"><span class="field-label">O que imprimir</span>
            <select id="print-filter-select" class="select">${conjuntos}</select>
          </label>
          <label class="field"><span class="field-label">Calibração</span>
            <select id="print-escala-select" class="select">
              <option value="1" ${config.escala === 1 ? 'selected' : ''}>Tamanho real (63 × 88 mm)</option>
              <option value="1.0363" ${config.escala !== 1 ? 'selected' : ''}>Compensar impressora +3,63%</option>
            </select>
          </label>
          <label class="check"><input type="checkbox" id="print-duplex" ${config.frenteEVerso ? 'checked' : ''} /> Frente e verso (uma folha de fundos depois de cada folha de frentes)</label>
          <label class="check"><input type="checkbox" id="print-codigo" ${config.codigo ? 'checked' : ''} /> Código para o escaneador (no lugar do ícone da arte)</label>
          <button id="btn-trigger-print" type="button" class="btn-primary">Imprimir ou salvar PDF</button>
        </div>
        <div class="print-backs">
          <span class="field-label">Fundo das cartas</span>
          <div class="estampas">${renderEstampas(deck, config.verso)}</div>
          <p class="muted">Na impressora, escolha “frente e verso, virar pela borda longa”. As folhas de fundo já vêm com as colunas espelhadas para cair atrás da carta certa.</p>
        </div>
      </div>
      <div class="print-sheets-container">${folhas.map((f, i) => renderFolha(deck, config, f, i + 1, folhas.length)).join('')}</div>
    </div>
  `;
}
