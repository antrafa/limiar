import { describe, expect, it } from 'vitest';
import { ALL_THEME_IDS, getDefaultTheme } from '../src/data/index';
import { renderCardModalContentHtml, renderMagicCardHtml } from '../src/components/card-renderer';
import { configDeImpressaoPadrao, renderPrintSheetsHtml } from '../src/components/print-view';
import { renderOracleGuideHtml } from '../src/components/oracle-view';

describe('Cartas, impressão e referência', () => {
  const deck = getDefaultTheme('zombies');

  it('a carta de cena mostra valor, História, Sinal, Gesto e o quadro de arte', () => {
    const cena = deck.cards.find((c) => c.rank === '7' && c.suit === 'spades')!;
    const html = renderMagicCardHtml(cena);
    expect(html).toContain('Cena · Confronto · valor 7');
    expect(html).toContain('class="mtg-heading"');
    expect(html).toContain('mtg-art-frame--scene');
    expect(html).toContain('class="mtg-rules"');
    expect(html).toContain(cena.topWatcherEvent!);
    expect(html).toContain('Sinal · +2');
    expect(html).toContain('Gesto · +1');
    expect(html).toContain(cena.bottomEchoPrompt!);
  });

  it('toda carta de cena traz, na arte, uma ideia do que ela pode ser no dia', () => {
    for (const tema of ALL_THEME_IDS) {
      const cenas = getDefaultTheme(tema).cards.filter((c) => c.kind === 'journey');
      expect(cenas).toHaveLength(40);
      for (const cena of cenas) {
        expect(cena.dailyIdea?.trim()).toBeTruthy();
        expect(cena.dailyIdea).not.toMatch(/parceir|vocês|dupla/i);
        expect(renderMagicCardHtml(cena)).toContain('mtg-art-idea');
      }
    }
  });

  it('o Ás vale 11', () => {
    const as = deck.cards.find((c) => c.rank === 'A' && c.suit === 'hearts')!;
    expect(renderMagicCardHtml(as)).toContain('valor 11');
  });

  it('o Rei mostra a regra universal da classe e o quadro dedicado de arte', () => {
    const rei = deck.cards.find((c) => c.rank === 'K' && c.suit === 'clubs')!;
    const html = renderMagicCardHtml(rei);
    expect(html).toContain('Rei · Batedor');
    expect(html).toContain('Espia o fundo do baralho do Eco');
    expect(html).toContain('mtg-art-frame--figure');
  });

  it('renderiza a ilustração da carta quando artUrl é informada e bloqueia URLs inseguras', () => {
    const cena = deck.cards.find((c) => c.rank === '7' && c.suit === 'spades')!;
    const comArte = renderMagicCardHtml({ ...cena, artUrl: '/limiar-banner.png' });
    expect(comArte).toContain('has-art');
    expect(comArte).toContain('src="/limiar-banner.png"');

    const insegura = renderMagicCardHtml({ ...cena, artUrl: 'javascript:alert(1)' });
    expect(insegura).not.toContain('javascript:');
    expect(insegura).not.toContain('has-art');
  });

  it('o modal ampliado traz título acessível, identifica História e Ideia como sugestão e ensina como usar', () => {
    const cena = deck.cards.find((c) => c.rank === '7' && c.suit === 'spades')!;
    const html = renderCardModalContentHtml(cena);
    expect(html).toContain('id="zoom-dialog-title"');
    expect(html).toContain('<h4>História</h4>');
    expect(html).toContain('Sugestão para contar a história');
    expect(html).toContain('Como usar na partida:');
    expect(html).toContain('Sugestão de rotina');
    expect(renderMagicCardHtml(cena)).toContain('História · sugestão');
    expect(renderMagicCardHtml(cena)).toContain('Ideia · sugestão');
  });

  it('imprime 9 cartas por folha A4, com 16 marcas de corte e régua de calibração', () => {
    const folhas = (conjunto: 'mission' | 'figures' | 'all', frenteEVerso = false) =>
      renderPrintSheetsHtml(deck, { ...configDeImpressaoPadrao(), conjunto, frenteEVerso }).match(/class="folha-a4 /g)?.length;
    expect(folhas('mission')).toBe(5);
    expect(folhas('figures')).toBe(2);
    expect(folhas('all')).toBe(6);
    expect(folhas('mission', true)).toBe(10);
    const html = renderPrintSheetsHtml(deck, { ...configDeImpressaoPadrao(), frenteEVerso: false });
    const primeira = html.split('class="folha-a4 ')[1];
    expect(primeira.match(/class="marca /g)).toHaveLength(16);
    expect(primeira.match(/class="folha-slot /g)).toHaveLength(9);
    expect(primeira).toContain('class="regua"');
  });

  it('a folha de fundos espelha as colunas e só tem fundo onde há carta na frente', () => {
    const html = renderPrintSheetsHtml(deck, { ...configDeImpressaoPadrao(), conjunto: 'mission', frenteEVerso: true });
    const folhas = html.split('class="folha-a4 ').slice(1);
    const ultimaFrente = folhas[8];
    const ultimoVerso = folhas[9];
    expect(ultimaFrente).toContain('folha-a4--frente');
    // 42 cartas: a última folha tem 6 cartas (2 linhas cheias), então os fundos também ocupam 6 posições
    expect(ultimoVerso.match(/class="verso /g)).toHaveLength(6);
    expect(ultimoVerso.match(/class="verso-arte"/g)).toHaveLength(6);
    const slots = ultimoVerso.split('class="folha-slot').slice(1);
    expect(slots.slice(6).every((s) => s.startsWith(' is-vazio'))).toBe(true);
  });

  it('o calibrador amplia cartas e grade em 3,63%', () => {
    const html = renderPrintSheetsHtml(deck, { ...configDeImpressaoPadrao(), escala: 1.0363 });
    expect(html).toContain('repeat(3,65.29mm)');
    expect(html).toContain('Pré-compensada');
  });

  it('suporta tamanho Bridge (57×87 mm), A4 com sangria (40 marcas) e PDF Card-a-Card empilhado', () => {
    const a4BridgeSangria = renderPrintSheetsHtml(deck, {
      ...configDeImpressaoPadrao(),
      tamanho: 'bridge',
      formato: 'a4-sangria',
      frenteEVerso: false,
    });
    expect(a4BridgeSangria).toContain('tamanho-bridge');
    expect(a4BridgeSangria).toContain('repeat(3,61mm)');
    const primeiraFolha = a4BridgeSangria.split('class="folha-a4 ')[1];
    expect(primeiraFolha.match(/class="marca /g)).toHaveLength(40);

    const cardIntercalado = renderPrintSheetsHtml(deck, {
      ...configDeImpressaoPadrao(),
      conjunto: 'figures',
      tamanho: 'bridge',
      formato: 'card-intercalado',
      frenteEVerso: true,
    });
    expect(cardIntercalado).toContain('@page { size: 61mm 91mm; margin: 0; }');
    expect(cardIntercalado.match(/class="folha-card-grafica /g)).toHaveLength(24); // 12 figuras × (frente + verso)

    const cardLotePoker = renderPrintSheetsHtml(deck, {
      ...configDeImpressaoPadrao(),
      conjunto: 'figures',
      tamanho: 'poker',
      formato: 'card-lote',
      frenteEVerso: true,
    });
    expect(cardLotePoker).toContain('@page { size: 67mm 92mm; margin: 0; }');
    expect(cardLotePoker.match(/class="folha-card-grafica /g)).toHaveLength(13); // 12 frentes + 1 verso final
  });

  it('permite imprimir o Kit de Dinamismo com 9 cartas de suporte e desafios', () => {
    const html = renderPrintSheetsHtml(deck, {
      ...configDeImpressaoPadrao(),
      conjunto: 'dinamismo',
      frenteEVerso: false,
    });
    expect(html).toContain('Desafio Master');
    expect(html).toContain('Oráculo Rápido');
    expect(html).toContain('Status do Mundo');
    expect(html.match(/class="folha-slot /g)).toHaveLength(9);
  });

  it('a referência rápida tem o desfecho, as classes e as 40 cenas do tema', () => {
    const html = renderOracleGuideHtml(deck);
    expect(html).toContain('Desfecho');
    expect(html).toContain('Engenheiro');
    expect(html.match(/class="threat-row"/g)).toHaveLength(40);
    expect(html).toContain(deck.chefe.nome);
  });
});

describe('Escaneador', () => {
  it('o código de cada carta volta para a mesma carta, em qualquer tema', async () => {
    const { codigoDaCarta, cartaPeloCodigo } = await import('../src/components/scanner');
    const eclipse = getDefaultTheme('eclipse');
    const noir = getDefaultTheme('noir');
    for (const carta of eclipse.cards) {
      const codigo = codigoDaCarta(carta);
      expect(cartaPeloCodigo(eclipse.cards, codigo)?.id).toBe(carta.id);
      const noOutroTema = cartaPeloCodigo(noir.cards, codigo);
      expect([noOutroTema?.suit, noOutroTema?.rank]).toEqual([carta.suit, carta.rank]);
    }
    expect(cartaPeloCodigo(eclipse.cards, 'https://exemplo.com')).toBeUndefined();
  });

  it('a carta impressa leva o QR no lugar do ícone da arte, se a opção estiver ligada', async () => {
    const { configDeImpressaoPadrao, renderPrintSheetsHtml } = await import('../src/components/print-view');
    const deck = getDefaultTheme('eclipse');
    const com = renderPrintSheetsHtml(deck, { ...configDeImpressaoPadrao(), frenteEVerso: false });
    expect(com.match(/class="mtg-art-qr"/g)).toHaveLength(42);
    const sem = renderPrintSheetsHtml(deck, { ...configDeImpressaoPadrao(), frenteEVerso: false, codigo: false });
    expect(sem).not.toContain('mtg-art-qr');
  });

  it('o escaneador oferece o teclado de valor e naipe', async () => {
    const { renderEscaneadorHtml } = await import('../src/components/scanner');
    const html = renderEscaneadorHtml('O Último Eclipse');
    expect(html.match(/data-scan-valor=/g)).toHaveLength(13);
    expect(html.match(/data-scan-naipe=/g)).toHaveLength(4);
    expect(html).toContain('data-scan-codigo="X2"');
  });
});
