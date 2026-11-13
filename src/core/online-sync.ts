import { Peer, type DataConnection } from 'peerjs';
import type { Naipe, Partida } from './partida';
import type { ThemeId } from '../types/card';

export interface PreparoSala {
  jogadores: Array<{ nome: string; classe: Naipe }>;
  metaPorPessoa?: number;
}

export interface MensagemP2P {
  tipo: 'sync' | 'pedirSync' | 'salaEncerrada' | 'parceiroSaiu';
  temaId: ThemeId;
  preparo: PreparoSala | null;
  partida: Partida | null;
  versao: number;
  enviadoEm: number;
}

let peerInstancia: Peer | null = null;
const conexoesAtivas: Set<DataConnection> = new Set();
let onReceberMensagemCallback: ((msg: MensagemP2P) => void) | null = null;
let onStatusConexaoCallback: ((online: boolean) => void) | null = null;

function gerarPrefixoSala(codigo: string): string {
  const limpo = codigo.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `limiar-sala-${limpo}`;
}

export function gerarCodigoSalaAleatorio(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let res = '';
  for (let i = 0; i < 6; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return res;
}

export function registrarCallbacksP2P(
  onMsg: (msg: MensagemP2P) => void,
  onStatus: (online: boolean) => void,
): void {
  onReceberMensagemCallback = onMsg;
  onStatusConexaoCallback = onStatus;
}

export function temParceiroConectado(): boolean {
  for (const conn of conexoesAtivas) {
    if (conn.open) return true;
  }
  return false;
}

/**
 * Cria a sala como HOST (proprietário).
 */
export function criarSalaHost(
  codigoSala: string,
  onSucesso: (codigoExibicao: string) => void,
  onErro: (err: string) => void,
): void {
  desconectarP2P();

  const idPeerAlvo = gerarPrefixoSala(codigoSala);
  let aberto = false;

  try {
    const peer = new Peer(idPeerAlvo);
    peerInstancia = peer;

    peer.on('open', () => {
      aberto = true;
      onSucesso(codigoSala.toUpperCase());
    });

    peer.on('connection', (conn) => {
      configurarConexao(conn, true);
    });

    peer.on('error', (err: any) => {
      if (!aberto) {
        desconectarP2P();
      }
      const msg =
        err?.type === 'unavailable-id'
          ? 'Esse código de sala já está em uso. Tente criar novamente.'
          : err?.message || 'Não foi possível criar a sala.';
      onErro(msg);
    });
  } catch (e: any) {
    onErro(e?.message || 'Falha ao iniciar Peer.');
  }
}

/**
 * Entra na sala como CLIENTE (convidado).
 */
export function entrarSalaCliente(
  codigoSala: string,
  onSucesso: (codigoExibicao: string) => void,
  onErro: (err: string) => void,
): void {
  desconectarP2P();

  const limpo = codigoSala.trim().toUpperCase();
  if (!limpo) {
    onErro('Digite um código de sala válido.');
    return;
  }

  const idPeerAlvo = gerarPrefixoSala(limpo);
  let finalizado = false;
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const falhar = (mensagem: string): void => {
    if (finalizado) return;
    finalizado = true;
    if (timeout) clearTimeout(timeout);
    desconectarP2P();
    onErro(mensagem);
  };

  try {
    const peerCliente = new Peer();
    peerInstancia = peerCliente;

    timeout = setTimeout(() => {
      falhar('A sala não respondeu. Verifique se o código está correto e se o anfitrião está com a mesa aberta.');
    }, 8000);

    peerCliente.on('open', () => {
      const conn = peerCliente.connect(idPeerAlvo, { reliable: true });

      conn.on('open', () => {
        if (finalizado) return;
        finalizado = true;
        if (timeout) clearTimeout(timeout);
        configurarConexao(conn, false);
        onSucesso(limpo);
        // Pede imediatamente o estado atual da sala (preparação ou partida)
        conn.send({
          tipo: 'pedirSync',
          temaId: 'eclipse',
          preparo: null,
          partida: null,
          versao: 0,
          enviadoEm: Date.now(),
        } satisfies MensagemP2P);
      });

      conn.on('error', () => {
        falhar('Falha na conexão com a sala.');
      });
    });

    peerCliente.on('error', (err: any) => {
      const msg =
        err?.type === 'peer-unavailable'
          ? 'Sala não encontrada. Confira o código e se o anfitrião está com a mesa aberta.'
          : err?.message || 'Erro ao conectar à rede P2P.';
      falhar(msg);
    });
  } catch (e: any) {
    falhar(e?.message || 'Falha ao iniciar cliente P2P.');
  }
}

function configurarConexao(conn: DataConnection, retransmitirComoHost: boolean): void {
  conexoesAtivas.add(conn);
  onStatusConexaoCallback?.(temParceiroConectado());

  conn.on('open', () => {
    onStatusConexaoCallback?.(temParceiroConectado());
  });

  conn.on('data', (dados: any) => {
    if (!dados || typeof dados !== 'object') return;
    const msg = dados as MensagemP2P;

    // Se o host recebeu um sync de um convidado, retransmite para os demais convidados (3-4 pessoas)
    if (retransmitirComoHost && msg.tipo === 'sync') {
      for (const outra of conexoesAtivas) {
        if (outra !== conn && outra.open) {
          try {
            outra.send(msg);
          } catch {}
        }
      }
    }

    onReceberMensagemCallback?.(msg);
  });

  conn.on('close', () => {
    conexoesAtivas.delete(conn);
    onStatusConexaoCallback?.(temParceiroConectado());
  });

  conn.on('error', () => {
    conexoesAtivas.delete(conn);
    onStatusConexaoCallback?.(temParceiroConectado());
  });
}

export function enviarEstadoParaSala(
  temaId: ThemeId,
  preparo: PreparoSala,
  partida: Partida | null,
  versao: number,
): void {
  const msg: MensagemP2P = {
    tipo: 'sync',
    temaId,
    preparo,
    partida,
    versao,
    enviadoEm: Date.now(),
  };

  for (const conn of conexoesAtivas) {
    if (conn.open) {
      try {
        conn.send(msg);
      } catch {}
    }
  }
}

export function avisarSalaEncerrada(): void {
  const msg: MensagemP2P = {
    tipo: 'salaEncerrada',
    temaId: 'eclipse',
    preparo: null,
    partida: null,
    versao: 0,
    enviadoEm: Date.now(),
  };

  for (const conn of conexoesAtivas) {
    if (conn.open) {
      try {
        conn.send(msg);
      } catch {}
    }
  }
}

export function avisarSaidaDaSala(): void {
  const msg: MensagemP2P = {
    tipo: 'parceiroSaiu',
    temaId: 'eclipse',
    preparo: null,
    partida: null,
    versao: 0,
    enviadoEm: Date.now(),
  };

  for (const conn of conexoesAtivas) {
    if (conn.open) {
      try {
        conn.send(msg);
      } catch {}
    }
  }
}

export function desconectarP2P(): void {
  for (const conn of conexoesAtivas) {
    try {
      conn.close();
    } catch {}
  }
  conexoesAtivas.clear();

  if (peerInstancia) {
    try {
      peerInstancia.destroy();
    } catch {}
    peerInstancia = null;
  }
  onStatusConexaoCallback?.(false);
}
