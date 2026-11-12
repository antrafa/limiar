import { describe, expect, it } from 'vitest';
import {
  type Acao,
  agir,
  bonusDaCena,
  type Carta,
  type CartaDoBaralho,
  criarPartida,
  desfechoDe,
  linhaDeStatus,
  type Partida,
} from '../src/core/partida';

const c = (valor: number, naipe: Carta['naipe']): Carta => ({ valor, naipe });
const enchimento = (n: number): CartaDoBaralho[] => Array.from({ length: n }, () => c(5, 'clubs'));

/** Baralho com topos em ordem e fundos em ordem (o primeiro fundo é o primeiro a sair de baixo). */
function baralho(topos: CartaDoBaralho[], fundos: CartaDoBaralho[] = []): CartaDoBaralho[] {
  return [...topos, ...enchimento(20), ...[...fundos].reverse()];
}

function dupla(lia: CartaDoBaralho[], teo: CartaDoBaralho[]): Partida {
  return criarPartida({
    jogadores: [
      { nome: 'Lia', classe: 'spades' },
      { nome: 'Téo', classe: 'hearts' },
    ],
    baralhos: [lia, teo],
  });
}

function jogar(partida: Partida, ...acoes: Acao[]): Partida {
  return acoes.reduce((p, acao) => {
    const proxima = agir(p, acao, { quando: '10:00' });
    if (proxima === p) throw new Error(`ação recusada: ${JSON.stringify(acao)}`);
    return proxima;
  }, partida);
}

const comecar = (quem: number): Acao[] => [
  { tipo: 'abrir', quem },
  { tipo: 'declarar', quem, texto: 'a reunião' },
  { tipo: 'ler', quem, texto: 'a ponte' },
];

describe('desfecho', () => {
  it('passar do topo vence; até 2 abaixo vence com custo; 3 ou mais abaixo, a cena vence', () => {
    expect(desfechoDe(1)).toBe('vitoria');
    expect(desfechoDe(0)).toBe('custo');
    expect(desfechoDe(-2)).toBe('custo');
    expect(desfechoDe(-3)).toBe('derrota');
  });
});

describe('uma cena em dupla', () => {
  it('o fundo sai do baralho do Eco, e sinal, gesto e Rei somam', () => {
    let p = dupla(baralho([c(7, 'spades')]), baralho([], [c(5, 'diamonds')]));
    p = jogar(
      p,
      ...comecar(0),
      { tipo: 'sinal', quem: 0, relato: 'subi de escada' },
      { tipo: 'confirmarSinal', quem: 0, resposta: 'as cordas da ponte' },
      { tipo: 'gesto', quem: 0, relato: 'pulei de pedra em pedra' },
    );
    expect(bonusDaCena(p, 0).total).toBe(4);
    p = jogar(p, { tipo: 'virarFundo', quem: 0 });
    expect(p.pessoas[0].cena?.fundos[0]).toEqual(c(5, 'diamonds'));
    expect(p.pessoas[0].cena?.desfecho).toBe('vitoria');
    expect(p.trofeus).toBe(7);
  });

  it('nada se resolve sozinho: sem a leitura do Eco não há sinal nem desfecho', () => {
    let p = jogar(dupla(baralho([c(7, 'spades')]), baralho([])), { tipo: 'abrir', quem: 0 }, { tipo: 'declarar', quem: 0, texto: 'a reunião' });
    expect(agir(p, { tipo: 'virarFundo', quem: 0 })).toBe(p);
    expect(agir(p, { tipo: 'sinal', quem: 0, relato: 'escada' })).toBe(p);
    p = jogar(p, { tipo: 'ler', quem: 0, texto: 'a ponte' }, { tipo: 'sinal', quem: 0, relato: 'escada' });
    expect(bonusDaCena(p, 0).total).toBe(1); // só o Rei: o sinal ainda não foi confirmado
  });

  it('o sinal só vale depois que o Eco responde', () => {
    const p = jogar(dupla(baralho([c(3, 'hearts')]), baralho([])), ...comecar(0), { tipo: 'sinal', quem: 0, relato: 'escada' });
    expect(p.pessoas[0].cena?.sinalConfirmado).toBe('');
    const q = jogar(p, { tipo: 'confirmarSinal', quem: 0, resposta: 'as cordas' });
    expect(bonusDaCena(q, 0).total).toBe(2);
  });

  it('a cena só fecha com a narração', () => {
    let p = jogar(dupla(baralho([c(2, 'hearts')]), baralho([], [c(9, 'clubs')])), ...comecar(0), { tipo: 'virarFundo', quem: 0 });
    expect(agir(p, { tipo: 'abrir', quem: 0 })).toBe(p);
    p = jogar(p, { tipo: 'narrar', quem: 0, texto: 'a vela não apagou' });
    expect(p.pessoas[0].cena).toBeNull();
  });

  it('vitória com custo dá o troféu e sobe a Ameaça', () => {
    const p = jogar(dupla(baralho([c(9, 'clubs')]), baralho([], [c(7, 'spades')])), ...comecar(0), { tipo: 'virarFundo', quem: 0 });
    expect(p.pessoas[0].cena?.desfecho).toBe('custo');
    expect(p.trofeus).toBe(9);
    expect(p.ameaca).toBe(1);
  });

  it('ajuda custa 1 de Fôlego de quem ajuda e soma 2', () => {
    const p = jogar(dupla(baralho([c(9, 'clubs')]), baralho([])), ...comecar(0), { tipo: 'ajudar', quem: 0, de: 1 });
    expect(p.pessoas[1].folego).toBe(2);
    expect(bonusDaCena(p, 0).total).toBe(2);
    expect(agir(p, { tipo: 'ajudar', quem: 0, de: 1 })).toBe(p);
  });

  it('a Dama troca um fundo que perdeu', () => {
    let p = dupla(baralho([c(1, 'spades')]), baralho([], [c(2, 'diamonds'), c(8, 'hearts')]));
    p = jogar(p, ...comecar(0), { tipo: 'virarFundo', quem: 0 });
    expect(p.pessoas[0].cena?.pendente).toBe(true);
    p = jogar(p, { tipo: 'deitarDama', quem: 0 });
    expect(p.pessoas[0].dama).toBe(false);
    expect(p.pessoas[0].cena?.fundos).toHaveLength(2);
  });

  it('aceitar a derrota custa Fôlego e sobe a Ameaça', () => {
    let p = dupla(baralho([c(10, 'clubs')]), baralho([], [c(2, 'diamonds')]));
    p = jogar(p, ...comecar(0), { tipo: 'virarFundo', quem: 0 }, { tipo: 'aceitarDerrota', quem: 0 });
    expect(p.pessoas[0].folego).toBe(2);
    expect(p.ameaca).toBe(1);
    expect(p.trofeus).toBe(0);
  });

  it('o Valete soma 3 e baixa o Fôlego máximo', () => {
    const p = jogar(dupla(baralho([c(1, 'spades')]), baralho([])), ...comecar(1 - 1), { tipo: 'valete', quem: 0 });
    expect(p.pessoas[0].folegoMax).toBe(2);
    expect(bonusDaCena(p, 0).total).toBe(4); // Valete 3 + Rei 1
  });
});

describe('classes', () => {
  it('Guardião: vencer uma cena de ♠ baixa a Ameaça', () => {
    let p = dupla(baralho([c(9, 'clubs'), c(2, 'spades')]), baralho([], [c(7, 'spades'), c(9, 'hearts')]));
    p = jogar(p, ...comecar(0), { tipo: 'virarFundo', quem: 0 }, { tipo: 'narrar', quem: 0, texto: 'ok' });
    expect(p.ameaca).toBe(1);
    p = jogar(p, ...comecar(0), { tipo: 'virarFundo', quem: 0 });
    expect(p.ameaca).toBe(0);
  });

  it('Batedor: espia o fundo do Eco e pode mandar para o meio', () => {
    let p = criarPartida({
      jogadores: [
        { nome: 'A', classe: 'clubs' },
        { nome: 'B', classe: 'hearts' },
      ],
      baralhos: [baralho([c(2, 'clubs')]), baralho([], [c(9, 'hearts'), c(1, 'diamonds')])],
    });
    p = jogar(p, ...comecar(0), { tipo: 'virarFundo', quem: 0 });
    expect(p.pessoas[0].cena?.espiada).toEqual(c(1, 'diamonds'));
    p = jogar(p, { tipo: 'enterrarEspiada', quem: 0 });
    expect(p.pessoas[1].baralho.at(-1)).not.toEqual(c(1, 'diamonds'));
  });
});

describe('sozinho', () => {
  it('a pessoa é o próprio Eco: o fundo sai do próprio baralho e o sinal vale ao ser contado', () => {
    let p = criarPartida({ jogadores: [{ nome: 'Ana', classe: 'diamonds' }], baralhos: [baralho([c(6, 'hearts')], [c(5, 'spades')])] });
    p = jogar(p, ...comecar(0), { tipo: 'sinal', quem: 0, relato: 'um café' });
    expect(p.pessoas[0].cena?.eco).toBe(0);
    expect(bonusDaCena(p, 0).total).toBe(2);
    p = jogar(p, { tipo: 'virarFundo', quem: 0 });
    expect(p.pessoas[0].cena?.desfecho).toBe('vitoria');
  });

  it('cair sozinho perde a campanha', () => {
    let p = criarPartida({
      jogadores: [{ nome: 'Ana', classe: 'diamonds' }],
      baralhos: [baralho([c(10, 'clubs'), c(10, 'clubs'), c(10, 'clubs'), c(10, 'clubs')], [c(2, 'spades'), c(2, 'spades'), c(2, 'spades'), c(2, 'spades'), c(2, 'spades')])],
    });
    // com a Dama já deitada, a derrota vale na hora: não há o que aceitar
    const perder = (q: Partida, comDama: boolean): Partida =>
      jogar(q, ...comecar(0), { tipo: 'virarFundo', quem: 0 }, ...(comDama ? [{ tipo: 'deitarDama', quem: 0 } as Acao] : []));
    p = jogar(perder(p, true), { tipo: 'narrar', quem: 0, texto: '.' });
    p = jogar(perder(p, false), { tipo: 'narrar', quem: 0, texto: '.' });
    expect(p.pessoas[0].folego).toBe(1);
    p = perder(p, false);
    expect(p.resultado).toBe('derrota');
  });
});

describe('campanha', () => {
  it('a meta e o limite de Ameaça crescem com o número de pessoas', () => {
    const trio = criarPartida({
      jogadores: [
        { nome: 'A', classe: 'spades' },
        { nome: 'B', classe: 'hearts' },
        { nome: 'C', classe: 'clubs' },
      ],
    });
    expect(linhaDeStatus(trio)).toContain('troféus 0/90 · Ameaça 0/15');
  });

  it('o chefe aparece na meta e cai quando a vida zera', () => {
    let p = dupla(baralho([c(1, 'clubs')], [c(10, 'hearts')]), baralho([], [c(10, 'clubs')]));
    p.trofeus = 55;
    p = jogar(p, ...comecar(0), { tipo: 'virarFundo', quem: 0 }, { tipo: 'narrar', quem: 0, texto: '.' });
    expect(p.chefe).toEqual({ vida: 4, valor: 8 });
    p.chefe = { vida: 1, valor: 8 };
    p = jogar(p, ...comecar(1), { tipo: 'virarFundo', quem: 1 });
    expect(p.resultado).toBe('vitoria');
  });

  it('a 💀 sobe a Ameaça; a ★ devolve Fôlego e a Dama', () => {
    let p = dupla(baralho([{ coringa: 'caveira' }, { coringa: 'estrela' }, c(3, 'hearts')]), baralho([]));
    p.pessoas[0].dama = false;
    p = jogar(p, { tipo: 'abrir', quem: 0 });
    expect(p.ameaca).toBe(1);
    expect(p.caveiras).toBe(1);
    expect(p.pessoas[0].dama).toBe(true);
    expect(p.pessoas[0].cena?.topo).toEqual(c(3, 'hearts'));
  });

  it('mandar um sinal fica guardado para quem recebe', () => {
    const p = jogar(dupla(baralho([]), baralho([])), { tipo: 'mandarSinal', de: 0, para: 1, texto: 'o primeiro cachorro' });
    expect(p.pessoas[1].sinalRecebido).toBe('o primeiro cachorro');
  });

  it('permite escolher duração rápida (15 troféus/pessoa)', () => {
    const rapida = criarPartida({
      jogadores: [
        { nome: 'Lia', classe: 'spades' },
        { nome: 'Téo', classe: 'hearts' },
      ],
      metaPorPessoa: 15,
    });
    expect(linhaDeStatus(rapida)).toContain('troféus 0/30');
  });

  it('cartas 8, 9 e 10 ativam Desafio Master e dão bônus saudável de +2', () => {
    let p = dupla(baralho([c(8, 'spades')]), baralho([], [c(6, 'diamonds')]));
    p = jogar(
      p,
      ...comecar(0),
      { tipo: 'desafioMaster', quem: 0, missao: 'Dar 200 passos seguidos' },
    );
    expect(bonusDaCena(p, 0).total).toBe(3); // Desafio Master (+2) + Rei spades (+1)
    p = jogar(p, { tipo: 'virarFundo', quem: 0 });
    expect(p.pessoas[0].cena?.desfecho).toBe('vitoria'); // 6 + 3 = 9 contra 8 -> vitória!
  });

  it('atingir marcos (33% e 66%) permite resgatar recompensas imediatas', () => {
    let p = dupla(baralho([c(10, 'spades')]), baralho([], [c(10, 'diamonds')]));
    p.trofeus = 20; // 33% de 60
    p.ameaca = 2;
    p = jogar(p, { tipo: 'resgatarMarco', marco: 1, escolha: 'ameaca' });
    expect(p.ameaca).toBe(1);
    expect(p.marcosResgatados).toEqual([1]);
  });
});
