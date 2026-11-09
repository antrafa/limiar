import { describe, expect, it } from 'vitest';
import { encenarExemplo } from '../src/data/partida-exemplo';

describe('Partida de exemplo', () => {
  it('toda jogada do roteiro é aceita pela regra e o dia termina como na Regra de Bolso', () => {
    const { final, status } = encenarExemplo();
    expect(final.trofeus).toBe(31);
    expect(final.ameaca).toBe(1);
    expect(status).toContain('Lia: Fôlego 2/3, Dama pronta');
    expect(status).toContain('Téo: Fôlego 2/2, Dama deitada, Valete usado');
    expect(final.pessoas.every((p) => p.cena === null)).toBe(true);
  });

  it('os desfechos saem do baralho do Eco, com a conta da regra', () => {
    const { cenas } = encenarExemplo();
    const desfechos = cenas.flatMap((c) => c.linhas.filter((l) => l.tipo === 'desfecho').map((l) => (l.tipo === 'desfecho' ? l.resultado : null)));
    expect(desfechos.map((d) => [d?.eco, d?.total, d?.alvo, d?.desfecho])).toEqual([
      ['Téo', 9, 7, 'vitoria'],
      ['Lia', 7, 9, 'custo'],
      ['Téo', 5, 4, 'vitoria'],
      ['Lia', 7, 11, 'derrota'],
      ['Lia', 13, 11, 'vitoria'],
    ]);
  });
});

describe('Página Primeira partida', () => {
  it('tem o tutorial de 5 minutos e as quatro cenas com carta, conversa e desfecho', async () => {
    const { renderExemploHtml } = await import('../src/components/exemplo-view');
    const { getDefaultTheme } = await import('../src/data/index');
    const html = renderExemploHtml(getDefaultTheme('eclipse'));
    expect(html.match(/class="minute"/g)).toHaveLength(5);
    expect(html).toContain('Comece em 5 minutos.');
    expect(html.match(/class="example-scene"/g)).toHaveLength(4);
    expect(html).toContain('Ponte Pênsil Partida ao Meio');
    expect(html).toContain('Descreva, em uma frase, como a travessia é feita de pedra em pedra.');
    expect(html).toContain('Pode ser uma reunião tensa, uma conversa que pode desandar ou uma travessia demorada no trânsito.');
    expect(html).toContain('Novo desfecho');
    expect(html).toContain('E se Lia jogasse sozinha?');
  });

  it('o tema padrão é o de fim do mundo', async () => {
    const { DEFAULT_THEME_ID, ALL_THEME_IDS } = await import('../src/data/index');
    expect(DEFAULT_THEME_ID).toBe('eclipse');
    expect(ALL_THEME_IDS[0]).toBe('eclipse');
  });
});
