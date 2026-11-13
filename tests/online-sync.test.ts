import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  criarSalaHost,
  desconectarP2P,
  entrarSalaCliente,
  enviarEstadoParaSala,
  registrarCallbacksP2P,
  temParceiroConectado,
  type MensagemP2P,
} from '../src/core/online-sync';

const { FakeDataConnection, FakePeer } = vi.hoisted(() => {
  type Handler = (...args: any[]) => void;

  class FakeDataConnection {
    open = false;
    sent: any[] = [];
    private handlers = new Map<string, Handler[]>();

    on(event: string, fn: Handler): void {
      const list = this.handlers.get(event) ?? [];
      list.push(fn);
      this.handlers.set(event, list);
    }

    emit(event: string, ...args: any[]): void {
      for (const fn of this.handlers.get(event) ?? []) {
        fn(...args);
      }
    }

    send(data: any): void {
      this.sent.push(data);
    }

    close(): void {
      this.open = false;
    }
  }

  class FakePeer {
    static instances: FakePeer[] = [];
    id?: string;
    lastConn?: FakeDataConnection;
    private handlers = new Map<string, Handler[]>();

    constructor(id?: string) {
      this.id = id;
      FakePeer.instances.push(this);
    }

    on(event: string, fn: Handler): void {
      const list = this.handlers.get(event) ?? [];
      list.push(fn);
      this.handlers.set(event, list);
    }

    emit(event: string, ...args: any[]): void {
      for (const fn of this.handlers.get(event) ?? []) {
        fn(...args);
      }
    }

    connect(): FakeDataConnection {
      const conn = new FakeDataConnection();
      this.lastConn = conn;
      return conn;
    }

    destroy(): void {}
  }

  return { FakeDataConnection, FakePeer };
});

vi.mock('peerjs', () => ({
  Peer: FakePeer,
}));

describe('online-sync P2P', () => {
  afterEach(() => {
    desconectarP2P();
    FakePeer.instances = [];
    vi.useRealTimers();
  });

  it('host detecta parceiro online assim que conn.on("open") dispara', () => {
    const statusChanges: boolean[] = [];
    registrarCallbacksP2P(() => {}, (online) => statusChanges.push(online));

    let salaCriada = '';
    criarSalaHost('abc123', (cod) => (salaCriada = cod), () => {});

    const hostPeer = FakePeer.instances[0];
    hostPeer.emit('open');
    expect(salaCriada).toBe('ABC123');

    const conn = new FakeDataConnection();
    conn.open = false;
    hostPeer.emit('connection', conn);
    expect(temParceiroConectado()).toBe(false);

    conn.open = true;
    conn.emit('open');
    expect(temParceiroConectado()).toBe(true);
    expect(statusChanges[statusChanges.length - 1]).toBe(true);
  });

  it('host retransmite sync de um convidado para os demais sem ecoar para o remetente', () => {
    const recebidas: MensagemP2P[] = [];
    registrarCallbacksP2P((msg) => recebidas.push(msg), () => {});

    criarSalaHost('SALA99', () => {}, () => {});
    const hostPeer = FakePeer.instances[0];
    hostPeer.emit('open');

    const connA = new FakeDataConnection();
    connA.open = true;
    const connB = new FakeDataConnection();
    connB.open = true;

    hostPeer.emit('connection', connA);
    hostPeer.emit('connection', connB);

    const payload: MensagemP2P = {
      tipo: 'sync',
      temaId: 'eclipse',
      preparo: { jogadores: [{ nome: 'Ana', classe: 'spades' }], metaPorPessoa: 30 },
      partida: null,
      versao: 2,
      enviadoEm: Date.now(),
    };

    connA.emit('data', payload);

    expect(recebidas).toHaveLength(1);
    expect(recebidas[0].versao).toBe(2);
    expect(connA.sent).toHaveLength(0);
    expect(connB.sent).toHaveLength(1);
    expect(connB.sent[0]).toEqual(payload);
  });

  it('enviarEstadoParaSala envia preparo e partida null quando voltando à preparação', () => {
    registrarCallbacksP2P(() => {}, () => {});
    criarSalaHost('SALA01', () => {}, () => {});
    const hostPeer = FakePeer.instances[0];
    hostPeer.emit('open');

    const conn = new FakeDataConnection();
    conn.open = true;
    hostPeer.emit('connection', conn);

    enviarEstadoParaSala(
      'noir',
      { jogadores: [{ nome: 'Leo', classe: 'hearts' }], metaPorPessoa: 10 },
      null,
      4,
    );

    expect(conn.sent).toHaveLength(1);
    expect(conn.sent[0]).toMatchObject({
      tipo: 'sync',
      temaId: 'noir',
      partida: null,
      versao: 4,
    });
  });

  it('cliente envia pedirSync ao abrir conexão e não dispara erro duplicado após falha', () => {
    vi.useFakeTimers();
    const erros: string[] = [];
    let sucesso = '';

    entrarSalaCliente(
      'sala77',
      (cod) => (sucesso = cod),
      (err) => erros.push(err),
    );

    const clientPeer = FakePeer.instances[0];
    clientPeer.emit('error', { type: 'peer-unavailable', message: 'unavailable' });
    vi.advanceTimersByTime(9000);

    expect(sucesso).toBe('');
    expect(erros).toHaveLength(1);
    expect(erros[0]).toContain('Sala não encontrada');
  });
});
