import { Peer, type DataConnection } from 'peerjs';
import type { Partida } from './partida';
import type { ThemeId } from '../types/card';

export interface MensagemP2P {
  tipo: 'sync' | 'pedirSync' | 'salaEncerrada' | 'parceiroSaiu';
  temaId: ThemeId;
  partida: Partida | null;
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

  try {
    const peer = new Peer(idPeerAlvo);
    peerInstancia = peer;

    peer.on('open', () => {
      onSucesso(codigoSala.toUpperCase());
    });

    peer.on('connection', (conn) => {
      configurarConexao(conn);
    });

    peer.on('error', (err: any) => {
      onErro(err.message || 'Não foi possível criar a sala.');
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

  const idPeerAlvo = gerarPrefixoSala(codigoSala);
  let conectadoComSucesso = false;

  try {
    const peerCliente = new Peer();
    peerInstancia = peerCliente;

    peerCliente.on('open', () => {
      const conn = peerCliente.connect(idPeerAlvo, { reliable: true });

      const timeout = setTimeout(() => {
        if (!conectadoComSucesso) {
          onErro('A sala não respondeu. Verifique se o código está correto e se o parceiro está com a mesa aberta.');
          desconectarP2P();
        }
      }, 7000);

      conn.on('open', () => {
        conectadoComSucesso = true;
        clearTimeout(timeout);
        configurarConexao(conn);
        onSucesso(codigoSala.toUpperCase());
        // Pede imediatamente o estado da partida para o criador da sala
        conn.send({ tipo: 'pedirSync' });
      });

      conn.on('error', () => {
        clearTimeout(timeout);
        onErro('Falha na conexão com a sala.');
      });
    });

    peerCliente.on('error', (err: any) => {
      onErro(err.message || 'Erro ao conectar à rede P2P.');
    });
  } catch (e: any) {
    onErro(e?.message || 'Falha ao iniciar cliente P2P.');
  }
}

function configurarConexao(conn: DataConnection): void {
  conexoesAtivas.add(conn);
  onStatusConexaoCallback?.(temParceiroConectado());

  conn.on('data', (dados: any) => {
    if (!dados || typeof dados !== 'object') return;
    onReceberMensagemCallback?.(dados as MensagemP2P);
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

export function enviarEstadoParaSala(temaId: ThemeId, partida: Partida): void {
  const msg: MensagemP2P = {
    tipo: 'sync',
    temaId,
    partida,
    enviadoEm: Date.now(),
  };

  for (const conn of conexoesAtivas) {
    if (conn.open) {
      conn.send(msg);
    }
  }
}

export function avisarSalaEncerrada(): void {
  const msg: MensagemP2P = {
    tipo: 'salaEncerrada',
    temaId: '' as any,
    partida: null,
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
    temaId: '' as any,
    partida: null,
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
