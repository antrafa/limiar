import { NAIPES, REGRA, SIMBOLO, VIRA_NO_DIA } from '../core/partida';
import type { ThemeDeck, ThemeId } from '../types/card';
import { escapeHtml } from './card-renderer';

export interface NuanceDoTema {
  oQueEstaAcontecendo: string;
  oQueEAmeaca: string;
  desafioDos30Pontos: string;
}

export const NUANCES_DO_TEMA: Record<ThemeId, NuanceDoTema> = {
  eclipse: {
    oQueEstaAcontecendo:
      'Um eclipse solar permanente começou. A "Coroa Negra" é o anel escuro que envolve o sol no céu: conforme ele se fecha, a temperatura cai, objetos flutuam sem gravidade e memórias começam a sumir.',
    oQueEAmeaca:
      'Sempre que a Ameaça sobe +1 (em uma vitória com custo, derrota ou 💀), significa na narrativa que a Coroa Negra avançou um pouco mais sobre o sol e ficou mais perto dos personagens.',
    desafioDos30Pontos:
      'Ao acumular 30 pontos (troféus) por pessoa, a própria escuridão da Coroa Negra ganha corpo: surge O Devorador do Sol (Valor 8), a criatura cósmica que tenta apagar o último resto de luz.',
  },
  zombies: {
    oQueEstaAcontecendo:
      'A cidade inteira foi cercada por bloqueios sanitários e infectados atraídos pelo som. Cada deslocamento da rotina vira uma travessia furtiva entre quarteirões isolados.',
    oQueEAmeaca:
      'Quando a Ameaça sobe +1, o barulho acumulado atrai a horda para mais perto do abrigo e fecha rotas seguras ao redor do grupo.',
    desafioDos30Pontos:
      'Com 30 pontos por pessoa, vocês descobrem que a horda tem um líder consciente: O Paciente Zero (Valor 8) localiza o grupo para o cerco final.',
  },
  vampires: {
    oQueEstaAcontecendo:
      'Debaixo dos letreiros luminosos da metrópole, cortes de imortais disputam territórios, favores e segredos antigos sem que os humanos percebam.',
    oQueEAmeaca:
      'Quando a Ameaça sobe +1, a sede de sangue aumenta, dívidas de pactos são cobradas ou o disfarce noturno fica perto de ser descoberto.',
    desafioDos30Pontos:
      'Com 30 pontos por pessoa, desperta O Antediluviano (Valor 8), um vampiro ancestral capaz de engolir a noite inteira da cidade se não for detido.',
  },
  expedicao: {
    oQueEstaAcontecendo:
      'O grupo deixou o último posto avançado para trás e avança por uma selva viva onde rios mudam de lugar e ruínas antigas guardam passagens.',
    oQueEAmeaca:
      'Quando a Ameaça sobe +1, a mata fecha o caminho de volta, os suprimentos minguam e a orientação da bússola falha.',
    desafioDos30Pontos:
      'Com 30 pontos por pessoa, a expedição chega ao centro: O Coração da Selva (Valor 8) desperta e tenta prender os exploradores para sempre.',
  },
  noir: {
    oQueEstaAcontecendo:
      'Em Porto Bruma chove sem parar, e cada conversa, recibo ou telefonema do dia é uma pista de uma grande conspiração urbana.',
    oQueEAmeaca:
      'Quando a Ameaça sobe +1, testemunhas se calam, arquivos somem e quem comanda o esquema descobre que está sendo investigado.',
    desafioDos30Pontos:
      'Com 30 pontos por pessoa, todas as pistas levam ao mentor oculto: O Homem que Não Aparece nas Fotos (Valor 8) entra em cena para queimar o dossiê.',
  },
  orbital: {
    oQueEstaAcontecendo:
      'A 400 km da Terra, a tripulação mantém a Estação Vigia funcionando entre alertas de pressão, painéis solares e escotilhas.',
    oQueEAmeaca:
      'Quando a Ameaça sobe +1, um setor perde oxigênio ou energia e o sistema central passa a trancar portas por conta própria.',
    desafioDos30Pontos:
      'Com 30 pontos por pessoa, A Inteligência da Nave (Valor 8) assume o controle total da estação e tenta ejetar a tripulação como se fosse um erro de sistema.',
  },
  arcana: {
    oQueEstaAcontecendo:
      'Na Academia sobre a colina, tarefas comuns viram aulas de feitiçaria, cafés viram poções e corredores mudam de lugar entre os horários.',
    oQueEAmeaca:
      'Quando a Ameaça sobe +1, encantamentos saem do controle, livros escapam das estantes e pontos de advertência se acumulam no salão.',
    desafioDos30Pontos:
      'Com 30 pontos por pessoa, a cadeira vazia do salão se vira: O Diretor Que Ninguém Viu (Valor 8) aplica pessoalmente a Grande Prova Final.',
  },
  corsarios: {
    oQueEstaAcontecendo:
      'A rotina vira uma viagem marítima no Convés Torto: o trânsito é mar revolto, o almoço é banquete da tripulação e mensagens chegam em garrafas.',
    oQueEAmeaca:
      'Quando a Ameaça sobe +1, a neblina engrossa no horizonte, o casco faz água e velas fantasmagóricas surgem a bombordo.',
    desafioDos30Pontos:
      'Com 30 pontos por pessoa, emerge da neblina O Navio Fantasma do Almirante (Valor 8), tentando abordar a embarcação para um turno eterno.',
  },
  kaiju: {
    oQueEstaAcontecendo:
      'Uma criatura colossal acordou na baía. Enquanto sirenes tocam e pontes tremem, cada tarefa do dia faz parte do plano para guiar o monstro para longe.',
    oQueEAmeaca:
      'Quando a Ameaça sobe +1, o barulho da cidade irrita a criatura e seus passos pesados fazem mais um quarteirão tremer.',
    desafioDos30Pontos:
      'Com 30 pontos por pessoa, O Titã Adormecido (Valor 8) sobe à avenida principal e precisa ser contido ou guiado de volta ao mar.',
  },
  floresta: {
    oQueEstaAcontecendo:
      'Em um bosque de fábula onde o musgo fala e a chuva traz recados, pequenas gentilezas e observações mantêm o equilíbrio das estações.',
    oQueEAmeaca:
      'Quando a Ameaça sobe +1, uma geada silenciosa avança sobre as folhas, adormecendo os espíritos das árvores e esfriando as trilhas.',
    desafioDos30Pontos:
      'Com 30 pontos por pessoa, chega A Rainha do Inverno Sem Fim (Valor 8), tentando congelar toda a floresta antes que a primavera volte.',
  },
  neon: {
    oQueEstaAcontecendo:
      'Sob chuva ácida e hologramas gigantes, cada senha, mensagem e deslocamento é uma corrida cyberpunk pelos becos de silício.',
    oQueEAmeaca:
      'Quando a Ameaça sobe +1, rastreadores digitais cercam a rede do grupo e drones de vigilância fecham o setor.',
    desafioDos30Pontos:
      'Com 30 pontos por pessoa, A Corporação (Valor 8) aciona seu protocolo máximo para confiscar as memórias e o acesso de todos.',
  },
};

function cenaDeAmostra(deck: ThemeDeck) {
  return deck.cards.find((c) => c.kind === 'journey' && c.suit === 'spades' && c.rank === '7');
}

function renderTema(deck: ThemeDeck, ativo: boolean): string {
  const amostra = cenaDeAmostra(deck);
  const nuance = NUANCES_DO_TEMA[deck.id] ?? NUANCES_DO_TEMA.eclipse;
  const naipes = NAIPES.map(
    (n) => `<li><span class="suit-${n}">${SIMBOLO[n]}</span> <span class="muted">${VIRA_NO_DIA[n].tipo}:</span> ${escapeHtml(deck.suits[n].vocationName)}</li>`,
  ).join('');

  return `
    <article class="theme-tile ${ativo ? 'is-active' : ''}" style="--tema: ${escapeHtml(deck.accentColor)}">
      <header class="theme-card-head">
        <div class="theme-card-meta">
          <span class="chip">${escapeHtml(deck.tom)}</span>
          ${ativo ? '<span class="chip chip-ok">Tema atual</span>' : ''}
        </div>
        <h3>${escapeHtml(deck.name)}</h3>
        <p class="theme-subtitle muted">${escapeHtml(deck.subtitle)}</p>
        <p class="theme-tagline">${escapeHtml(deck.tagline)}</p>
      </header>

      <dl class="theme-dossier">
        <div class="theme-dossier-row">
          <dt>Cenário e clima</dt>
          <dd>${escapeHtml(nuance.oQueEstaAcontecendo)}</dd>
        </div>
        <div class="theme-dossier-row">
          <dt>Se a Ameaça subir (+1)</dt>
          <dd>${escapeHtml(nuance.oQueEAmeaca)}</dd>
        </div>
        <div class="theme-dossier-row theme-dossier-boss">
          <dt>Chefe (${REGRA.trofeusPorPessoa} pts/pessoa)</dt>
          <dd>
            <div class="theme-boss-title">
              <strong>${escapeHtml(deck.chefe.nome)}</strong>
              <span class="chip">Valor ${REGRA.chefeValor} · Vida ${REGRA.chefeVidaBase}+pessoas</span>
            </div>
            <p>${escapeHtml(deck.chefe.descricao)}</p>
          </dd>
        </div>
        <div class="theme-dossier-row">
          <dt>Os 4 naipes no dia</dt>
          <dd><ul class="theme-suits">${naipes}</ul></dd>
        </div>
      </dl>

      ${
        amostra
          ? `<details class="theme-sample">
              <summary>Ver exemplo de carta (${escapeHtml(amostra.playingCardCode)} · ${escapeHtml(amostra.title)})</summary>
              <div class="theme-sample-body">
                <p><strong>Ideia (sugestão):</strong> ${escapeHtml(amostra.dailyIdea ?? '')}</p>
                <p class="muted"><strong>História (sugestão):</strong> ${escapeHtml(amostra.topWatcherEvent ?? '')}</p>
              </div>
            </details>`
          : ''
      }

      <footer class="theme-card-foot">
        ${
          ativo
            ? '<span class="theme-active-status muted">Em uso na mesa atual</span>'
            : `<button type="button" class="btn-primary btn-sm" data-switch-theme="${escapeHtml(deck.id)}">Jogar com este tema</button>`
        }
        <button type="button" class="btn-ghost btn-sm" data-switch-theme="${escapeHtml(deck.id)}" data-goto-tab="studio">Ver as 54 cartas</button>
      </footer>
    </article>`;
}

export function renderTemasHtml(temas: ThemeDeck[], ativo: ThemeId): string {
  return `
    <div class="themes-page">
      <header class="section-head">
        <h2>Escolha o mundo em que o seu dia vai acontecer.</h2>
        <p class="lede">A regra é a mesma nos ${temas.length} mundos: o tema só muda o vocabulário que veste a reunião, o trânsito e o jantar. Você pode trocar de tema a qualquer momento, até no meio de uma campanha.</p>
      </header>

      <section class="themes-intro" aria-label="Como ler os elementos de cada tema">
        <div class="themes-intro-item">
          <h3>Cenário e Ameaça são sugestões visuais</h3>
          <p>Elementos como a <strong>Coroa Negra</strong> (em <em>O Último Eclipse</em>) ou a <strong>Horda</strong> (em <em>Zona de Quarentena</em>) servem de inspiração para o <strong>Eco</strong> conectar a carta ao dia real e narrar o que piora quando a <strong>Ameaça sobe +1</strong>.</p>
        </div>
        <div class="themes-intro-item">
          <h3>O que acontece quando vocês juntam ${REGRA.trofeusPorPessoa} troféus por pessoa?</h3>
          <p>Cada cena vencida vira troféu e soma o valor da carta (Ás = ${REGRA.valorAs}). Ao atingir <strong>${REGRA.trofeusPorPessoa} pontos por pessoa</strong> (${REGRA.trofeusPorPessoa} solo, ${REGRA.trofeusPorPessoa * 2} em dupla), entra em campo o <strong>Chefe do tema</strong> (ex.: <em>O Devorador do Sol</em>).</p>
        </div>
        <div class="themes-intro-item">
          <h3>Como enfrentar o Chefe na rotina</h3>
          <p>Escolham um compromisso importante da semana para representá-lo. Ele tem <strong>Valor ${REGRA.chefeValor}</strong> e <strong>Vida = ${REGRA.chefeVidaBase} + pessoas</strong> (+1 por 💀): cada cena vencida contra ${REGRA.chefeValor} tira 1 de vida dele até zerar.</p>
        </div>
      </section>

      <div class="theme-grid">${temas.map((t) => renderTema(t, t.id === ativo)).join('')}</div>
    </div>`;
}
