import { Peer, type DataConnection } from 'peerjs';
import type { Partida } from './partida';
import type { ThemeId } from '../types/card';

export interface MensagemP2P {
  tipo: 'sync' | 'pedirSync';
  temaId: ThemeId;
  partida: Partida | null;
  enviadoEm: number;
}

let peerInstancia: Peer | null = null;
const conexoesAtivas: Set<DataConnection> = new Set();
let onReceberMensagemCallback: ((msg: MensagemP2P) => void) | null = null;

function gerarPrefixoSala(codigo: string): string {
  // Padroniza um ID amigável sem caracteres especiais (ex: limiar-mesa-xyz123)
  const limpo = codigo.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `limiar-mesa-${limpo}`;
}

export function gerarCodigoSalaAleatorio(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let res = '';
  for (let i = 0; i < 6; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return res;
}

export function registrarCallbackMensagem(callback: (msg: MensagemP2P) => void): void {
  onReceberMensagemCallback = callback;
}

export function conectarOuHospedarSala(
  codigoSala: string,
  onConectado: (codigoExibicao: string) => void,
  onErro: (err: string) => void,
): void {
  desconectarP2P();

  const idPeerAlvo = gerarPrefixoSala(codigoSala);

  try {
    // 1. Tenta criar o Peer com o ID da sala (atuando como criador da sala)
    const peer = new Peer(idPeerAlvo);
    peerInstancia = peer;

    peer.on('open', () => {
      onConectado(codigoSala.toUpperCase());
    });

    peer.on('connection', (conn) => {
      configurarConexao(conn);
    });

    peer.on('error', (err: any) => {
      // Se o ID já existir ('unavailable-id'), significa que a sala já foi criada pelo parceiro!
      // Conecta como convidado na mesma sala:
      if (err.type === 'unavailable-id') {
        conectarComoCliente(idPeerAlvo, codigoSala, onConectado, onErro);
      } else {
        onErro(err.message || 'Erro de conexão online');
      }
    });
  } catch (e: any) {
    onErro(e?.message || 'Falha ao iniciar conexão online');
  }
}

function conectarComoCliente(
  idPeerAlvo: string,
  codigoSalaOriginal: string,
  onConectado: (codigoExibicao: string) => void,
  onErro: (err: string) => void,
): void {
  desconectarP2P();

  const peerCliente = new Peer();
  peerInstancia = peerCliente;

  peerCliente.on('open', () => {
    const conn = peerCliente.connect(idPeerAlvo, { reliable: true });

    conn.on('open', () => {
      configurarConexao(conn);
      onConectado(codigoSalaOriginal.toUpperCase());
      // Pede o estado atual da mesa para o anfitrião
      conn.send({ tipo: 'pedirSync' });
    });

    conn.on('error', () => {
      onErro('Não foi possível conectar à sala informada.');
    });
  });

  peerCliente.on('error', (e: any) => {
    onErro(e?.message || 'Erro na conexão com a sala');
  });
}

function configurarConexao(conn: DataConnection): void {
  conexoesAtivas.add(conn);

  conn.on('data', (dados: any) => {
    if (!dados || typeof dados !== 'object') return;
    if (dados.tipo === 'pedirSync') {
      onReceberMensagemCallback?.({
        tipo: 'pedirSync',
        temaId: '' as any,
        partida: null,
        enviadoEm: Date.now(),
      });
      return;
    }
    if (dados.tipo === 'sync' && dados.partida) {
      onReceberMensagemCallback?.(dados as MensagemP2P);
    }
  });

  conn.on('close', () => {
    conexoesAtivas.delete(conn);
  });

  conn.on('error', () => {
    conexoesAtivas.delete(conn);
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
}
