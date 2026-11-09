import qrcode from 'qrcode-generator';
import type { GameCard, Suit } from '../types/card';
import { escapeHtml } from './card-renderer';

/**
 * O código impresso na carta diz só qual é a carta (valor e naipe), nunca o tema:
 * ao escanear, ela abre no tema que estiver ativo no app.
 */
const PREFIXO = 'LIMIAR:';
const LETRA_DO_NAIPE: Record<Exclude<Suit, 'joker'>, string> = { spades: 'S', hearts: 'H', diamonds: 'D', clubs: 'C' };
const NAIPE_DA_LETRA: Record<string, Exclude<Suit, 'joker'>> = { S: 'spades', H: 'hearts', D: 'diamonds', C: 'clubs' };

export function codigoDaCarta(card: GameCard): string {
  // Coringas usam X1/X2: JL e JD colidiriam com o Valete de Ouros (J♦ = JD).
  if (card.suit === 'joker') return `${PREFIXO}${card.rank === 'JOKER_LIGHT' ? 'X1' : 'X2'}`;
  return `${PREFIXO}${card.rank}${LETRA_DO_NAIPE[card.suit]}`;
}

export function cartaPeloCodigo(cards: GameCard[], texto: string): GameCard | undefined {
  const limpo = texto.trim().toUpperCase();
  if (!limpo.startsWith(PREFIXO)) return undefined;
  const codigo = limpo.slice(PREFIXO.length);
  if (codigo === 'X1' || codigo === 'X2') {
    return cards.find((c) => c.suit === 'joker' && c.rank === (codigo === 'X1' ? 'JOKER_LIGHT' : 'JOKER_DARK'));
  }
  const naipe = NAIPE_DA_LETRA[codigo.slice(-1)];
  const rank = codigo.slice(0, -1);
  return cards.find((c) => c.suit === naipe && c.rank === rank);
}

/** SVG do QR, escalável: o tamanho físico vem do CSS da carta impressa. */
export function qrDaCartaSvg(card: GameCard): string {
  const qr = qrcode(0, 'M');
  qr.addData(codigoDaCarta(card));
  qr.make();
  return qr.createSvgTag({ cellSize: 1, margin: 1, scalable: true });
}

const VALORES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const NAIPES_DO_TECLADO: Array<[string, string]> = [
  ['S', '♠'],
  ['H', '♥'],
  ['D', '♦'],
  ['C', '♣'],
];

export function renderEscaneadorHtml(nomeDoTema: string): string {
  const valores = VALORES.map((v) => `<button type="button" class="key" data-scan-valor="${v}">${v}</button>`).join('');
  const naipes = NAIPES_DO_TECLADO.map(
    ([l, s]) => `<button type="button" class="key key-suit ${l === 'H' || l === 'D' ? 'is-red' : ''}" data-scan-naipe="${l}">${s}</button>`,
  ).join('');

  return `
    <div class="scanner">
      <header class="zoom-modal-header">
        <div>
          <span class="eyebrow">Escanear carta · ${escapeHtml(nomeDoTema)}</span>
          <h2 id="zoom-dialog-title">Aponte a câmera para o código da carta</h2>
        </div>
        <form method="dialog"><button type="submit" class="btn-secondary" autofocus>Fechar</button></form>
      </header>
      <div class="scanner-camera">
        <video class="scanner-video" playsinline muted></video>
        <span class="scanner-mira" aria-hidden="true"></span>
      </div>
      <p class="scanner-status muted" role="status">Abrindo a câmera…</p>
      <div class="scanner-teclado">
        <span class="field-label">Ou toque a carta</span>
        <div class="keys">${valores}</div>
        <div class="keys">${naipes}
          <button type="button" class="key" data-scan-codigo="X1" title="Coringa ★">★</button>
          <button type="button" class="key" data-scan-codigo="X2" title="Coringa 💀">💀</button>
        </div>
      </div>
    </div>`;
}

interface BarcodeDetectorLike {
  detect(fonte: CanvasImageSource): Promise<Array<{ rawValue: string }>>;
}

type BarcodeDetectorCtor = new (opcoes: { formats: string[] }) => BarcodeDetectorLike;

/**
 * Liga a câmera e procura um código do Limiar. Chama `aoAchar` com o texto lido.
 * Devolve a função que desliga a câmera. Sem leitor nativo ou sem câmera, avisa e fica só o teclado.
 */
export function iniciarEscaneador(raiz: HTMLElement, aoAchar: (texto: string) => void): () => void {
  const status = raiz.querySelector<HTMLElement>('.scanner-status');
  const video = raiz.querySelector<HTMLVideoElement>('.scanner-video');
  const camera = raiz.querySelector<HTMLElement>('.scanner-camera');
  const avisar = (texto: string): void => {
    if (status) status.textContent = texto;
  };
  let ativo = true;
  let fluxo: MediaStream | null = null;
  const parar = (): void => {
    ativo = false;
    fluxo?.getTracks().forEach((t) => t.stop());
  };

  const Detector = (globalThis as { BarcodeDetector?: BarcodeDetectorCtor }).BarcodeDetector;
  const semCamera = (motivo: string): void => {
    camera?.classList.add('is-off');
    const titulo = raiz.querySelector<HTMLElement>('#zoom-dialog-title');
    if (titulo) titulo.textContent = 'Qual carta você tem?';
    avisar(`${motivo} Use o teclado abaixo.`);
  };
  if (!Detector) {
    semCamera('Este navegador não lê códigos pela câmera (funciona no Chrome do Android).');
    return parar;
  }
  if (!navigator.mediaDevices?.getUserMedia || !video) {
    semCamera('A câmera só abre em endereço seguro (https ou localhost).');
    return parar;
  }

  const detector = new Detector({ formats: ['qr_code'] });
  const procurar = async (): Promise<void> => {
    if (!ativo) return;
    try {
      const achados = await detector.detect(video);
      const texto = achados.find((a) => a.rawValue.toUpperCase().startsWith(PREFIXO))?.rawValue;
      if (texto) {
        parar();
        aoAchar(texto);
        return;
      }
    } catch {
      // quadro ainda sem imagem: tenta no próximo
    }
    window.setTimeout(() => void procurar(), 250);
  };

  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: 'environment' }, audio: false })
    .then(async (stream) => {
      if (!ativo) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      fluxo = stream;
      video.srcObject = stream;
      await video.play();
      avisar('Procurando o código no canto da arte da carta…');
      void procurar();
    })
    .catch(() => semCamera('Não deu para abrir a câmera.'));

  return parar;
}
