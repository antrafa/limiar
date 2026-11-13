import { describe, expect, it } from 'vitest';
import { loadThemeWithOverrides } from '../src/core/storage';
import { agir, criarPartida } from '../src/core/partida';
import { renderStudioGalleryHtml } from '../src/components/studio-view';
import { preparacaoPadrao, renderPlaytestTableHtml } from '../src/components/playtest-view';
import { renderQuickstartGuideHtml } from '../src/components/quickstart-view';
import { renderOracleGuideHtml } from '../src/components/oracle-view';
import { renderTemasHtml } from '../src/components/temas-view';
import { ALL_THEME_IDS } from '../src/data/index';

describe('Telas do app', () => {
  it('Como jogar explica a cena, onde está o desafio, como contar história juntos e os dois papéis', () => {
    const deck = loadThemeWithOverrides('eclipse');
    const html = renderQuickstartGuideHtml(deck);
    expect(html).toContain('O seu dia é a aventura.');
    expect(html).toContain('Onde está o desafio? E como contar a história juntos sem ficar subjetivo?');
    expect(html).toContain('Coroa Negra');
    expect(html).toContain('O Devorador do Sol');
    expect(html).toContain('Uma cena, em sete passos');
    expect(html).toContain('O Eco faz a leitura');
    expect(html).toContain('Sozinho, em dupla ou em grupo');
    expect(html).not.toMatch(/irmão/i);
    expect(html).toContain(deck.chefe.nome);
    expect(html).toContain('data-goto-tab="playtest"');
  });

  it('a Referência rápida traz desfecho, número de pessoas e as cenas com sinal e gesto', () => {
    const deck = loadThemeWithOverrides('eclipse');
    const html = renderOracleGuideHtml(deck);
    expect(html).toContain('Quantas pessoas');
    expect(html).toContain('Vitória com custo');
    const cena = deck.cards.find((c) => c.kind === 'journey' && c.suit === 'spades' && c.rank === '7')!;
    expect(html).toContain(cena.title);
  });

  it('o editor tem História, Sinal e Gesto nas cenas', () => {
    const deck = loadThemeWithOverrides('eclipse');
    const cena = deck.cards.find((c) => c.kind === 'journey')!;
    const html = renderStudioGalleryHtml(deck, cena, 'spades');
    expect(html).toContain('edit-topWatcherEvent');
    expect(html).toContain('edit-topWatcherTrigger');
    expect(html).toContain('edit-bottomEchoPrompt');
    expect(html).toContain('edit-dailyIdea');
  });

  it('sem sala ativa, a aba de mesa exige criar ou entrar em uma sala antes de mostrar a mesa', () => {
    const deck = loadThemeWithOverrides('vampires');
    const html = renderPlaytestTableHtml(deck, null, preparacaoPadrao(), null);
    expect(html).toContain('Criar ou entrar em uma sala');
    expect(html).toContain('data-acao-online="criar"');
    expect(html).toContain('data-acao-online="entrar"');
    expect(html).toContain('data-campo-sala');
    expect(html).not.toContain('Embaralhar e começar');
    expect(html).not.toContain('data-acao-mesa="maisPessoa"');
  });

  it('a preparação dentro da sala permite de 1 a 4 pessoas com classes', () => {
    const deck = loadThemeWithOverrides('vampires');
    const html = renderPlaytestTableHtml(deck, null, preparacaoPadrao(), 'SALA12');
    expect(html).toContain('SALA12');
    expect(html).toContain('data-acao-mesa="maisPessoa"');
    expect(html).toContain('Guardião');
    expect(html).toContain('Embaralhar e começar');
  });

  it('a cena aberta mostra a carta do tema e pede primeiro a frase de quem vive', () => {
    const deck = loadThemeWithOverrides('zombies');
    let partida = criarPartida({
      jogadores: [
        { nome: '<b>Jogador 1</b>', classe: 'spades' },
        { nome: 'Jogador 2', classe: 'clubs' },
      ],
    });
    partida.pessoas[0].baralho = [{ valor: 7, naipe: 'spades' }, { valor: 3, naipe: 'hearts' }];
    partida = agir(partida, { tipo: 'abrir', quem: 0 });
    const html = renderPlaytestTableHtml(deck, partida, preparacaoPadrao(), 'SALA12');
    const tema = deck.cards.find((c) => c.suit === 'spades' && c.rank === '7')!;
    expect(html.match(/class="front /g)).toHaveLength(2);
    expect(html).toContain(tema.title);
    expect(html).toContain('data-acao="declarar"');
    expect(html).not.toContain('data-acao="virarFundo"');
    expect(html).toContain('&lt;b&gt;Jogador 1&lt;/b&gt;');
    expect(html).not.toContain('<b>Jogador 1</b>');
  });

  it('depois da leitura, a cena oferece sinal, gesto, ajuda e o desfecho', () => {
    const deck = loadThemeWithOverrides('eclipse');
    let partida = criarPartida({
      jogadores: [
        { nome: 'A', classe: 'spades' },
        { nome: 'B', classe: 'hearts' },
      ],
    });
    partida = agir(partida, { tipo: 'abrir', quem: 0 });
    partida = agir(partida, { tipo: 'declarar', quem: 0, texto: 'a reunião' });
    partida = agir(partida, { tipo: 'ler', quem: 0, texto: 'a ponte' });
    const html = renderPlaytestTableHtml(deck, partida, preparacaoPadrao(), 'SALA12');
    expect(html).toContain('data-acao="sinal"');
    expect(html).toContain('data-acao="gesto"');
    expect(html).toContain('data-acao="ajudar"');
    expect(html).toContain('data-acao="virarFundo"');
    expect(html).toContain('data-linha-status');
  });

  it('sozinho, a pessoa é o próprio Eco e a mesa mantém o contexto do tema visível', () => {
    const deck = loadThemeWithOverrides('eclipse');
    const partida = criarPartida({ jogadores: [{ nome: 'Ana', classe: 'hearts' }] });
    const html = renderPlaytestTableHtml(deck, partida, preparacaoPadrao(), 'SALA12');
    expect(html).toContain('Você é o próprio Eco.');
    expect(html).toContain('Campanha solo');
    expect(html).not.toContain('Mandar um sinal');
    expect(html).toContain(deck.name);
    expect(html).toContain(deck.tom);
    expect(html).toContain('Coroa Negra');
  });

  it('a página de Temas explica as nuances do mundo, o desafio dos 30 pontos, mostra todos os temas e oferece a troca', () => {
    const temas = ALL_THEME_IDS.map((id) => loadThemeWithOverrides(id));
    const html = renderTemasHtml(temas, 'noir');
    expect(html.match(/class="theme-tile/g)).toHaveLength(ALL_THEME_IDS.length);
    expect(html.match(/Tema atual/g)).toHaveLength(1);
    expect(html).toContain('data-switch-theme="arcana"');
    expect(html).toContain('O que acontece quando vocês juntam 30 troféus por pessoa?');
    expect(html).toContain('Coroa Negra');
    for (const t of temas) {
      expect(html).toContain(t.chefe.nome.replace(/&/g, '&amp;'));
      expect(html).toContain(t.chefe.descricao.replace(/&/g, '&amp;'));
    }
  });
});
