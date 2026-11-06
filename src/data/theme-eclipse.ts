import { buildThemeDeck, type ThemeBlueprint } from './engine-deck';
import type { ThemeDeck } from '../types/card';

export const ECLIPSE_BLUEPRINT: ThemeBlueprint = {
  id: 'eclipse',
  name: 'O Último Eclipse',
  subtitle: 'Fim do Mundo — Crônica da Coroa Solar',
  tagline: 'O sol está sendo engolido pela coroa negra. As leis da gravidade e da memória começam a falhar.',
  accentColor: '#f59e0b',
  secondaryColor: '#38bdf8',
  suits: {
    spades: {
      suit: 'spades',
      symbol: '♠',
      namePt: 'Espadas',
      vocationName: 'Vigília & Farol',
      colorHex: '#94a3b8',
    },
    hearts: {
      suit: 'hearts',
      symbol: '♥',
      namePt: 'Copas',
      vocationName: 'Memória & Despedida',
      colorHex: '#fb7185',
    },
    diamonds: {
      suit: 'diamonds',
      symbol: '♦',
      namePt: 'Ouros',
      vocationName: 'Fenda & Bússola',
      colorHex: '#fbbf24',
    },
    clubs: {
      suit: 'clubs',
      symbol: '♣',
      namePt: 'Paus',
      vocationName: 'Presságio & Estrela Negra',
      colorHex: '#38bdf8',
    },
  },
  figures: {
    spades: {
      king: {
        title: 'O Guardião do Farol',
        artGlyph: '🗼',
        artSubtitle: 'Sentinela da Última Fronteira Luminosa',
        passive:
          'Passiva na Vida Real: Sempre que entrar num ambiente hoje, acenda uma luz ou posicione-se perto de uma janela/lâmpada como ponto de ancoragem.',
        synergy:
          'Sinergia (♠): Ao sacar Espadas, sua firmeza repele as criaturas da penumbra e protege a integridade física da dupla.',
        flavorText: 'Mesmo que o próprio sol desista do céu, minha lente continuará girando sobre o mar de cinzas.',
      },
      queen: {
        title: 'Lanterna de Fogo Frio',
        artGlyph: '🏮',
        artSubtitle: 'Chama Azul que Não Consome Oxigênio',
        tapEffect:
          'Virar (⟳ Tap): Dissipe instantaneamente uma anomalia gravitacional ou ameaça de ♠/♣, iluminando o caminho seguro.',
        rechargeRule:
          'Recarga (Untap): Desvire ao recalibrar um instrumento de ♦ Ouros ou quando estiverem sob a mesma luz.',
        flavorText: 'Dentro do bulbo de vidro sopra o último suspiro de uma estrela que morreu há mil anos.',
      },
      jack: {
        title: 'Olhos de Cinza',
        artGlyph: '👁️‍🗨️',
        artSubtitle: 'Cegueira Gradual da Coroa Solar',
        entryTrigger:
          'Gatilho de Entrada: Revele ao encarar diretamente uma falha de ♠ Espadas ou perder a vigília do turno.',
        realLifeTaboo:
          'Tabu na Vida Real: Você não pode usar nomes de cores nas suas mensagens (tudo para você agora é claro, escuro, brasa ou cinza).',
        flavorText: 'Quem olhou para o anel negro do eclipse nunca mais viu o azul do mesmo jeito.',
      },
    },
    hearts: {
      king: {
        title: 'A Cronista das Últimas Horas',
        artGlyph: '🎙️',
        artSubtitle: 'Colecionadora de Vozes Antes do Silêncio',
        passive:
          'Passiva na Vida Real: Guarde uma frase dita pelo parceiro hoje e repita-a mais tarde como se estivesse gravando para a eternidade.',
        synergy:
          'Sinergia (♥): Ao sacar Copas, sua lembrança impede que o mundo apague os sentimentos da dupla e restaura Valetes (J).',
        flavorText: 'Se não restar ninguém para ler os livros, que as próprias pedras decorem nossa história.',
      },
      queen: {
        title: 'Fita Cassete Intacta',
        artGlyph: '📼',
        artSubtitle: 'Gravação Magnética Imune ao Esquecimento',
        tapEffect:
          'Virar (⟳ Tap): Rebobine os últimos minutos da cena: anule uma falha recém-ocorrida ou recupere uma memória apagada pelo Valete (J).',
        rechargeRule:
          'Recarga (Untap): Desvire ao resolver uma carta de ♦ Ouros ou trocar um áudio de voz com o parceiro.',
        flavorText: 'Lado A: o som das ondas em janeiro. Lado B: nossas risadas antes de o céu parar.',
      },
      jack: {
        title: 'Esquecimento',
        artGlyph: '🌫️',
        artSubtitle: 'Nomes eDatas Desbotando das Fotografias',
        entryTrigger:
          'Gatilho de Entrada: Revele ao falhar numa carta de ♥ Copas ou deixar uma pergunta do parceiro sem resposta emocional.',
        realLifeTaboo:
          'Tabu na Vida Real: Você não pode usar verbos no passado nem mencionar dias anteriores; fale apenas do instante presente.',
        flavorText: 'Sei que amei alguém com o seu rosto, mas a névoa levou o nome da cidade onde nascemos.',
      },
    },
    diamonds: {
      king: {
        title: 'O Cartógrafo da Fenda',
        artGlyph: '🧭',
        artSubtitle: 'Navegador das Ruas que Mudam de Lugar',
        passive:
          'Passiva na Vida Real: Observe ângulos, distâncias e relógios; comente quando o tempo parecer passar rápido ou devagar demais.',
        synergy:
          'Sinergia (♦): Ao sacar Ouros, você estabiliza a geometria do local e desvira sua Dama (Q) automaticamente.',
        flavorText: 'A avenida principal agora dobra para dentro do oceano; precisamos atualizar o mapa a cada quinze minutos.',
      },
      queen: {
        title: 'Bússola de Mercúrio',
        artGlyph: '🧭',
        artSubtitle: 'Agulha Líquida que Aponta para Quem Você Procura',
        tapEffect:
          'Virar (⟳ Tap): Ignore qualquer distância ou barreira espacial do evento e conecte sua posição diretamente à do parceiro.',
        rechargeRule:
          'Recarga (Untap): Desvire ao completar uma coordenada de ♦ Ouros ou alinhar dois objetos em cima da mesa.',
        flavorText: 'O norte magnético morreu na terça-feira; agora a agulha só aponta para o calor da sua mão.',
      },
      jack: {
        title: 'Vertigem Temporal',
        artGlyph: '🌀',
        artSubtitle: 'Gravidade Inclinada a Quarenta Graus',
        entryTrigger:
          'Gatilho de Entrada: Revele ao se perder numa anomalia de ♦ Ouros ou atrasar o sincronismo do turno.',
        realLifeTaboo:
          'Tabu na Vida Real: Suas mensagens escritas devem começar pelo fim (a conclusão primeiro, a explicação depois).',
        flavorText: 'A chuva está caindo do asfalto em direção às nuvens, e meus passos chegam antes de mim.',
      },
    },
    clubs: {
      king: {
        title: 'O Profeta da Estrela Negra',
        artGlyph: '🪐',
        artSubtitle: 'Intérprete da Harmonia Cósmica Final',
        passive:
          'Passiva na Vida Real: Trate coincidências banais do dia (um número, um pássaro, uma música) como sinais solenes do universo.',
        synergy:
          'Sinergia (♣): Ao sacar Paus, você compreende o sussurro do eclipse e converte o medo em revelação.',
        flavorText: 'Não tenham medo da escuridão que desce; o universo está apenas fechando as pálpebras para sonhar de novo.',
      },
      queen: {
        title: 'Relógio Quebrado',
        artGlyph: '🕰️',
        artSubtitle: 'Ponteiros Cravados no Segundo Zero',
        tapEffect:
          'Virar (⟳ Tap): Congele o avanço do cataclismo por um turno inteiro, anulando qualquer custo de ♣ ou do Coringa Escuro.',
        rechargeRule:
          'Recarga (Untap): Desvire ao resolver uma carta de ♦ Ouros ou quando o relógio real marcar horas ou meias-horas exatas.',
        flavorText: 'Se os ponteiros não se movem, a última hora nunca termina de chegar.',
      },
      jack: {
        title: 'Eco de Outra Vida',
        artGlyph: '👥',
        artSubtitle: 'Dupla Sobreposição de Linhas do Tempo',
        entryTrigger:
          'Gatilho de Entrada: Revele ao falhar numa visão de ♣ Paus ou encarar a Fenda sem proteção.',
        realLifeTaboo:
          'Tabu na Vida Real: Fale sempre na primeira pessoa do plural ("nós vimos", "nós estamos"), como se suas versões de outros mundos falassem juntas.',
        flavorText: 'Em outra linha do tempo o eclipse nunca aconteceu, e nós dois estamos tomando café naquela padaria da esquina.',
      },
    },
  },
  journeys: {
    spades: [
      {
        rank: 'A',
        title: 'O Primeiro Anel da Coroa Negra',
        artGlyph: '🌑',
        artSubtitle: 'O Sol Diminui para um Fio de Ouro',
        topWatcherTrigger:
          'Ao olhar para o céu, para uma lâmpada circular ou para o reflexo da luz numa lente.',
        topWatcherEvent:
          'A temperatura cai dez graus em um minuto. As sombras das árvores ficam nítidas como lâminas de obsidiana no chão.',
        bottomEchoPrompt:
          'Acenda uma luz perto de você (ou fotografe a fonte de luz mais próxima) para manter a penumbra afastada da dupla.',
        bottomEchoEffect:
          'Se for ♠ Espadas, sua vigília mantém o calor. Caso contrário, responda rápido ou vire a Dama (Q ⟳).',
        flavorText: 'Os pássaros pararam de cantar às duas da tarde, confusos com a noite que chegou sem crepúsculo.',
      },
      {
        rank: '2',
        title: 'Maré Alta no Meio da Avenida',
        artGlyph: '🌊',
        artSubtitle: 'Atração Lunar Descontrolada',
        topWatcherTrigger:
          'Ao ver água corrente, torneira, chuva, garrafa cheia ou poça na calçada.',
        topWatcherEvent:
          'O alinhamento gravitacional puxou o oceano para dentro dos bueiros da cidade. Uma lâmina de água espelhada cobre o asfalto.',
        bottomEchoPrompt:
          'Suba um degrau ou coloque os pés fora do chão por um instante e avise o parceiro para buscar terreno alto.',
        bottomEchoEffect:
          'Evita ser arrastado pela maré astral. Se tiver Valete (J) ativo, precisa do apoio do parceiro.',
        flavorText: 'O mar subiu as escadas do metrô procurando pela lua que o hipnotizou.',
      },
      {
        rank: '3',
        title: 'Cães de Sombra Alongada',
        artGlyph: '🐺',
        artSubtitle: 'Silhuetas que Caminham Sem Corpo',
        topWatcherTrigger:
          'Ao ver sombras compridas no fim da tarde ou sob postes de rua.',
        topWatcherEvent:
          'As sombras projetadas pelos postes de luz se descolaram dos objetos e rondam a calçada como cães famintos por calor.',
        bottomEchoPrompt:
          'Elimine uma sombra perto de você iluminando-a com a tela do celular e mande o aviso: "Caminho limpo".',
        bottomEchoEffect:
          'Dissipa as silhuetas. Jogadores de ♠ ou ♣ ganham vantagem no próximo turno.',
        flavorText: 'Enquanto houver uma vela acesa entre nós dois, elas não podem tocar nossos calcanhares.',
      },
      {
        rank: '4',
        title: 'Vento Estático nas Linhas de Transmissão',
        artGlyph: '⚡',
        artSubtitle: 'Faíscas Azuis Dançando nos Fios',
        topWatcherTrigger:
          'Ao ouvir o zumbido de aparelhos elétricos, vento na janela ou tocar em metal.',
        topWatcherEvent:
          'Uma tempestade geomagnética faz os postes da rua cantarem como harpas de alta tensão. O ar cheira a ozônio puro.',
        bottomEchoPrompt:
          'Toque em algo de madeira ou tecido (isolante) e diga ao parceiro como você protege os equipamentos da dupla.',
        bottomEchoEffect:
          'Protege o rádio e a lanterna. Se falhar, sua Dama (Q) vira (⟳) pela sobrecarga magnética.',
        flavorText: 'As auroras boreais desceram até a linha do equador para assistir ao fim do espetáculo.',
      },
      {
        rank: '5',
        title: 'Saqueadores do Último Inverno',
        artGlyph: '🧥',
        artSubtitle: 'Desesperados Buscando Lenha e Baterias',
        topWatcherTrigger:
          'Ao ver pessoas apressadas na rua, agasalhos pesados ou portas trancadas.',
        topWatcherEvent:
          'Um grupo em pânico tenta forçar a entrada do observatório onde vocês se abrigam do frio cósmico.',
        bottomEchoPrompt:
          'Escolha: você impõe respeito na porta (♠) ou divide parte do seu calor com eles (♥)? Diga ao parceiro.',
        bottomEchoEffect:
          'Ambos os caminhos resolvem a crise sem violência se o Eco responder com convicção.',
        flavorText: 'Não há vilões no último dia do mundo, apenas pessoas com medo de ficar no escuro sozinhas.',
      },
      {
        rank: '6',
        title: 'Estátuas de Sal na Praça Central',
        artGlyph: '🗿',
        artSubtitle: 'Aqueles que Olharam Para Cima Sem Filtro',
        topWatcherTrigger:
          'Ao ver pessoas paradas na fila, manequins de vitrine ou estátuas.',
        topWatcherEvent:
          'Quem encarou o núcleo aberto do eclipse ficou paralisado no tempo como escultura de cinza branca.',
        bottomEchoPrompt:
          'Olhe apenas para baixo ou para as mãos por 5 segundos e lembre o parceiro de manter o visor abaixado.',
        bottomEchoEffect:
          'Evita o Valete de Olhos de Cinza (J♠). Se já estiver ativo, um jogador de ♥ pode aliviá-lo.',
        flavorText: 'Eles parecem em paz, apontando para o céu como se tivessem visto o rosto de Deus.',
      },
      {
        rank: '7',
        title: 'Ponte Pênsil Partida ao Meio',
        artGlyph: '🌉',
        artSubtitle: 'Blocos de Concreto Flutuando no Ar',
        topWatcherTrigger:
          'Ao ver uma escada, corredor comprido, viaduto ou divisão no piso.',
        topWatcherEvent:
          'A gravidade falhou no vão central da ponte: carros e pedaços de asfalto flutuam imóveis a três metros do chão.',
        bottomEchoPrompt:
          'Descreva como vocês saltam de pedra em pedra flutuante segurando a mão um do outro.',
        bottomEchoEffect:
          'Travessia surreal concluída! Se for ♠ ou ♦, você desvira a Dama (Q) do parceiro no salto.',
        flavorText: 'Caminhar no ar é fácil; o difícil é convencer o coração de que não vamos cair.',
      },
      {
        rank: '8',
        title: 'O Trem Fantasma das 18h15',
        artGlyph: '🚊',
        artSubtitle: 'Vagões Iluminados Sem Maquinista',
        topWatcherTrigger:
          'Ao ver um ônibus, trem, metrô ou ouvir o barulho de rodas no asfalto.',
        topWatcherEvent:
          'Uma composição inteira passa pelos trilhos vazios com as luzes acesas, repetindo em loop a última viagem de ontem.',
        bottomEchoPrompt:
          'Diga ao parceiro se vocês embarcam no trem temporal para ganhar distância ou se seguem a pé pelos trilhos.',
        bottomEchoEffect:
          'Embarcar avança a jornada rapidamente, mas exige que uma Dama (Q) esteja de pé para ancorar a descida.',
        flavorText: 'Os passageiros lá dentro leem o jornal de terça-feira sem saber que a quarta-feira nunca veio.',
      },
      {
        rank: '9',
        title: 'Nevasca de Cinza Estelar',
        artGlyph: '❄️',
        artSubtitle: 'Flocos Mornos que Brilham no Escuro',
        topWatcherTrigger:
          'Ao sentir frio, vento ou ver poeira/partículas suspensas na luz.',
        topWatcherEvent:
          'Do anel do eclipse começa a cair uma neve silenciosa e morna que apaga os sons da rua em um raio de cem metros.',
        bottomEchoPrompt:
          'Mande um áudio falando bem perto do microfone para que sua voz alcance o parceiro através da nevasca.',
        bottomEchoEffect:
          'Mantém o contato da dupla intacto e limpa penalidades de isolamento.',
        flavorText: 'Peguei um floco na luva: não era gelo, era poeira de ouro gasto.',
      },
      {
        rank: '10',
        title: 'A Cúpula do Último Farol',
        artGlyph: '🗼',
        artSubtitle: 'O Feixe que Corta a Escuridão Total',
        topWatcherTrigger:
          'Ao chegar ao lugar mais alto do seu dia ou acender a luz principal da sala.',
        topWatcherEvent:
          'Vocês alcançam a lanterna mestra do penhasco. Ativar o espelho parabólico enviará o sinal para todos os sobreviventes do hemisfério.',
        bottomEchoPrompt:
          'Envie a mensagem luminosa final que o farol de vocês transmite para o mundo que escurece.',
        bottomEchoEffect:
          'Clímax de ♠: O farol brilha contra o eclipse! Desvira todas as Damas (Q) e dissipa qualquer Valete (J).',
        flavorText: 'Não acendemos a luz para salvar o sol; acendemos para que o sol saiba onde estávamos.',
      },
    ],
    hearts: [
      {
        rank: 'A',
        title: 'Álbum de Fotografias que Desbotam',
        artGlyph: '📷',
        artSubtitle: 'Rostos Sumindo do Papel Fotográfico',
        topWatcherTrigger:
          'Ao abrir a galeria de fotos do celular ou ver um porta-retratos.',
        topWatcherEvent:
          'O eclipse está devorando os registros visuais primeiro. As fotos antigas na mochila estão ficando brancas pelas bordas.',
        bottomEchoPrompt:
          'Descreva em palavras uma foto ou imagem real que você ama, gravando-a na memória do parceiro antes que suma.',
        bottomEchoEffect:
          'Salva a memória! Se for ♥ Copas, desvira sua Dama (Q) e remove o Valete de Esquecimento (J♥).',
        flavorText: 'O papel pode ficar em branco, mas ninguém apaga o que eu decorei de olhos fechados.',
      },
      {
        rank: '2',
        title: 'A Última Música no Rádio FM',
        artGlyph: '📻',
        artSubtitle: 'O Locutor Se Despede da Cidade',
        topWatcherTrigger:
          'Ao ouvir qualquer música tocando hoje (no fone, no carro, numa loja).',
        topWatcherEvent:
          'A última estação de rádio no ar coloca uma canção antiga para tocar em repetição antes de o transmissor desligar.',
        bottomEchoPrompt:
          'Diga ao parceiro qual música real está tocando (ou qual você colocaria para tocar nos últimos cinco minutos da Terra).',
        bottomEchoEffect:
          'Acalma o coração da dupla: qualquer Valete (J) ativo perde sua penalidade durante este turno.',
        flavorText: '"Obrigado pela companhia nestes sessenta anos no ar. Fiquem perto de quem vocês amam."',
      },
      {
        rank: '3',
        title: 'Telefone Público Tocando Sozinho',
        artGlyph: '☎️',
        artSubtitle: 'Uma Ligação de Cinco Anos Atrás',
        topWatcherTrigger:
          'Ao receber uma notificação, vibração de celular ou ouvir um toque.',
        topWatcherEvent:
          'Um orelhão desconectado na esquina toca. Do outro lado da linha está a sua própria voz gravada num dia feliz do passado.',
        bottomEchoPrompt:
          'Atenda o chamado: mande uma mensagem dizendo que conselho você daria ao seu "eu" de cinco anos atrás.',
        bottomEchoEffect:
          'Reconcilia o passado e o presente, fortalecendo o escudo emocional da dupla.',
        flavorText: 'A linha cruzou com uma tarde de domingo em que a única preocupação era a chuva.',
      },
      {
        rank: '4',
        title: 'Jantar à Luz de Velas no Fim dos Tempos',
        artGlyph: '🕯️',
        artSubtitle: 'Mesa Posta Enquanto o Céu Gira',
        topWatcherTrigger:
          'Ao fazer uma refeição, lanche ou tomar café durante o dia.',
        topWatcherEvent:
          'Um restaurante pequeno abriu as portas de graça, servindo os melhores pratos que restavam na despensa sob luz de velas.',
        bottomEchoPrompt:
          'Fotografe ou descreva o que você está comendo/bebendo agora e faça um brinde com o parceiro pela jornada.',
        bottomEchoEffect:
          'Desvira a Dama (Q) se você for ♥ Copas e remove a exaustão da caminhada.',
        flavorText: 'O vinho nunca teve um sabor tão doce quanto na véspera do infinito.',
      },
      {
        rank: '5',
        title: 'Nome Escrito no Vidro Embaçado',
        artGlyph: '🪟',
        artSubtitle: 'Prova de que Estivemos Aqui',
        topWatcherTrigger:
          'Ao ver uma janela de vidro, espelho ou tela.',
        topWatcherEvent:
          'O frio da coroa solar embaça todas as vidraças da rua. Se você não escrever o nome do parceiro, a névoa pode fazê-lo esquecer.',
        bottomEchoPrompt:
          'Escreva o nome ou apelido do seu parceiro numa mensagem acompanhada de três palavras que definem a parceria de vocês.',
        bottomEchoEffect:
          'Ancora a identidade de ambos: anula imediatamente o Valete de Esquecimento (J♥) ou Eco de Outra Vida (J♣).',
        flavorText: 'Enquanto uma única pessoa lembrar do seu nome, você ainda existe no universo.',
      },
      {
        rank: '6',
        title: 'Caixa de Correio Cheia de Confissões',
        artGlyph: '📮',
        artSubtitle: 'Segredos que Não Podem Morrer Guardados',
        topWatcherTrigger:
          'Ao ver uma caixa, gaveta, bolsa ou envelope fechado.',
        topWatcherEvent:
          'As pessoas da cidade deixaram bilhetes sinceros nas portas e bancos de praça dizendo tudo o que calaram a vida inteira.',
        bottomEchoPrompt:
          'Conte ao parceiro uma coisa sincera e bonita que seu personagem sempre quis dizer desde o começo da jornada.',
        bottomEchoEffect:
          'A verdade liberta: desvira uma Dama (Q) virada de qualquer um dos dois jogadores.',
        flavorText: 'No fim do mundo, a timidez parece a maior perda de tempo da história humana.',
      },
      {
        rank: '7',
        title: 'Criança Soltando Pipa na Gravidade Zero',
        artGlyph: '🪁',
        artSubtitle: 'Linha Branca Subindo Até as Estrelas',
        topWatcherTrigger:
          'Ao ver algo voando (pássaro, folha ao vento, nuvem) ou uma cor viva.',
        topWatcherEvent:
          'No topo do morro, uma pipa de papel colorido sobe sem precisar de vento, puxada suavemente pela maré gravitacional do eclipse.',
        bottomEchoPrompt:
          'Aponte um detalhe pequeno de beleza ou leveza que você consegue ver ao seu redor agora mesmo.',
        bottomEchoEffect:
          'Protege a esperança da dupla contra qualquer efeito de desespero na próxima carta.',
        flavorText: 'Mesmo quando os planetas saem dos trilhos, alguém ainda lembra como brincar.',
      },
      {
        rank: '8',
        title: 'Cápsula do Tempo Enterrada sob a Árvore',
        artGlyph: '🌱',
        artSubtitle: 'Para Quem Encontrar a Terra Depois de Nós',
        topWatcherTrigger:
          'Ao ver terra, jardim, vaso de planta ou chão de pedra.',
        topWatcherEvent:
          'Vocês encontram uma caixa de metal hermética pronta para ser lacrada nas raízes de uma figueira centenária.',
        bottomEchoPrompt:
          'Escolha um objeto real que está com você agora para deixar dentro da cápsula como testemunho da humanidade.',
        bottomEchoEffect:
          'O legado está salvo! Jogadores de ♥ ou ♦ desviram sua Dama (Q).',
        flavorText: 'Colocamos um relógio de pulso, duas moedas, uma fita cassete e a foto de nós dois.',
      },
      {
        rank: '9',
        title: 'Dança Lenta no Asfalto Vazio',
        artGlyph: '💃',
        artSubtitle: 'Faróis de Carro Como Palco Improvisado',
        topWatcherTrigger:
          'Ao ver uma rua vazia, corredor livre ou ouvir uma batida de música.',
        topWatcherEvent:
          'Os semáforos piscam em amarelo intermitente na avenida deserta. Não há mais pressa para chegar a lugar nenhum.',
        bottomEchoPrompt:
          'Pare por 10 segundos onde estiver, feche os olhos e mande uma mensagem convidando o parceiro para essa última valsa.',
        bottomEchoEffect:
          'Remove qualquer Valete (J) ativo na mesa e sincroniza os corações da dupla.',
        flavorText: 'O mundo inteiro parou o trânsito só para que tivéssemos salão suficiente.',
      },
      {
        rank: '10',
        title: 'A Biblioteca das Memórias Salvas',
        artGlyph: '📚',
        artSubtitle: 'Cada Livro Brilha com uma Vida Inteira',
        topWatcherTrigger:
          'Ao ver uma estante de livros, caderno aberto ou tela cheia de texto.',
        topWatcherEvent:
          'Vocês depositam a Fita Cassete com a crônica completa no cofre de quartzo do observatório antes que a coroa se feche.',
        bottomEchoPrompt:
          'Dê um título poético para o livro que conta a história de vocês dois neste jogo.',
        bottomEchoEffect:
          'Clímax de ♥: Amor e memória vencem o apagamento! Restaura todas as Damas (Q) e Valetes (J).',
        flavorText: 'As estrelas podem apagar uma por uma; nossa história já foi escrita fora do tempo.',
      },
    ],
    diamonds: [
      {
        rank: 'A',
        title: 'Sextante de Latão no Observatório',
        artGlyph: '🔭',
        artSubtitle: 'Calculando o Ângulo da Fenda Solar',
        topWatcherTrigger:
          'Ao ver óculos, lente de câmera, janela redonda ou instrumento de medida.',
        topWatcherEvent:
          'Na cúpula astronômica, as lentes de cristal revelam uma coordenada segura onde a gravidade permanecerá estável.',
        bottomEchoPrompt:
          'Enquadre algo redondo numa foto ou descreva a vista da sua janela para calibrar o telescópio da dupla.',
        bottomEchoEffect:
          'Sucesso de ♦ Ouros: Desvira a Dama (Q) de ambos os jogadores imediatamente!',
        flavorText: 'A matemática não mente, mesmo quando o céu decide dobrar sobre si mesmo.',
      },
      {
        rank: '2',
        title: 'Gotas de Mercúrio Subindo no Ar',
        artGlyph: '🌡️',
        artSubtitle: 'Termômetros Quebrados Flutuando como Pérolas',
        topWatcherTrigger:
          'Ao ver um copo de água, gotas na pia ou objeto prateado/metálico.',
        topWatcherEvent:
          'Pequenas esferas prateadas flutuam na altura do peito, apontando o fluxo magnético que leva ao abrigo subterrâneo.',
        bottomEchoPrompt:
          'Fotografe ou toque em um objeto prateado/metálico perto de você para seguir a trilha magnética.',
        bottomEchoEffect:
          'Desvira a Dama (Q) do jogador Eco e estabiliza o caminho do turno.',
        flavorText: 'Quando o chumbo aprende a voar, basta seguir a direção para onde ele sobe.',
      },
      {
        rank: '3',
        title: 'Escadaria que Termina no Teto',
        artGlyph: '🪜',
        artSubtitle: 'Geometria de Escher no Prédio Central',
        topWatcherTrigger:
          'Ao subir ou descer degraus, olhar para o teto ou ver um corredor.',
        topWatcherEvent:
          'O segundo andar do prédio dobrou espacialmente: quem sobe a escada norte sai caminhando de cabeça para baixo no salão sul.',
        bottomEchoPrompt:
          'Gire o celular ou mande uma foto com ângulo inclinado/invertido para guiar o parceiro pelo labirinto espacial.',
        bottomEchoEffect:
          'Vocês decifram a dobra! Desvira a Dama (Q) do Vigia e remove o Valete de Vertigem (J♦).',
        flavorText: '"Embaixo" e "em cima" são apenas convenções sociais que o eclipse cancelou.',
      },
      {
        rank: '4',
        title: 'Rádio de Cristal de Quartzo',
        artGlyph: '📻',
        artSubtitle: 'Sintonizador Sem Bateria que Capta Ecos',
        topWatcherTrigger:
          'Ao usar fones de ouvido, caixa de som ou microfone.',
        topWatcherEvent:
          'Um receptor artesanal feito com fio de cobre e pedra galena consegue furar a interferência solar para conectar vocês dois.',
        bottomEchoPrompt:
          'Mande um áudio curto batendo duas vezes no microfone antes de falar: "Câmbio, frequência estabilizada".',
        bottomEchoEffect:
          'Reconexão perfeita (♦): Desvira sua Dama (Q) na hora.',
        flavorText: 'Quando os satélites caem, a velha física dos anos 1920 volta a salvar o mundo.',
      },
      {
        rank: '5',
        title: 'Chave do Bunker Geodésico',
        artGlyph: '🗝️',
        artSubtitle: 'Esfera de Titânio Sob a Montanha',
        topWatcherTrigger:
          'Ao pegar suas chaves, abrir uma tranca ou ver uma porta reforçada.',
        topWatcherEvent:
          'Vocês encontram o cartão perfurado de acesso ao abrigo científico construído para suportar a inversão dos polos.',
        bottomEchoPrompt:
          'Mostre uma chave ou cartão real e confirme o código de abertura com o parceiro.',
        bottomEchoEffect:
          'Desvira a Dama (Q) de qualquer jogador que estiver virada.',
        flavorText: 'Três metros de chumbo e granito separam esta porta do silêncio cósmico.',
      },
      {
        rank: '6',
        title: 'Mapa Dobrado em Quatro Dimensões',
        artGlyph: '🗺️',
        artSubtitle: 'Atalho Através de Duas Portas Distantes',
        topWatcherTrigger:
          'Ao atravessar uma porta entre dois cômodos ou dobrar uma folha de papel.',
        topWatcherEvent:
          'Abrindo a porta do armário da esquina no segundo exato, ela dá diretamente para a praia a cinquenta quilômetros dali.',
        bottomEchoPrompt:
          'Toque no batente de uma porta perto de você e diga para qual lugar do mundo você abriria essa passagem com o parceiro.',
        bottomEchoEffect:
          'Teletransporte poético concluído! Desvira a Dama (Q) da dupla.',
        flavorText: 'Se você dobrar o mapa até os dois pontos se tocarem, não precisa caminhar a linha entre eles.',
      },
      {
        rank: '7',
        title: 'Pêndulo de Foucault Parado no Ar',
        artGlyph: '⚖️',
        artSubtitle: 'A Rotação da Terra Desacelera',
        topWatcherTrigger:
          'Ao ver algo pendurado (luminária, cordão, chaveiro, planta pendente).',
        topWatcherEvent:
          'O grande pêndulo de bronze do museu parou no ponto mais alto da oscilação, provando que o planeta prendeu a respiração.',
        bottomEchoPrompt:
          'Balance levemente um objeto pendurado (ou sua mão) e avise o parceiro que você devolveu o movimento à sala.',
        bottomEchoEffect:
          'Recarrega (Untap) sua Dama (Q) e impede qualquer atraso temporal neste turno.',
        flavorText: 'Por quatro segundos inteiros, o planeta esqueceu para que lado costumava girar.',
      },
      {
        rank: '8',
        title: 'Prisma queDecompõe a Luz Negra',
        artGlyph: '💎',
        artSubtitle: 'Sete Cores que Nunca Existiram Antes',
        topWatcherTrigger:
          'Ao ver um reflexo colorido em vidro, água, tela ou óculos.',
        topWatcherEvent:
          'Passando o feixe da coroa solar por um cristal de lustre, vocês descobrem uma frequência luminosa que afasta o esquecimento.',
        bottomEchoPrompt:
          'Fotografe um reflexo de luz em qualquer vidro ou superfície brilhante perto de você.',
        bottomEchoEffect:
          'Luz restauradora (♦): Desvira ambas as Damas (Q) e limpa o Valete de Olhos de Cinza (J♠).',
        flavorText: 'Depois do violeta existe uma oitava cor que só aparece quando o sol se despede.',
      },
      {
        rank: '9',
        title: 'Trilhos de Cobre da Torre Tesla',
        artGlyph: '⚡',
        artSubtitle: 'Gerador Atmosférico Carregado',
        topWatcherTrigger:
          'Ao colocar o celular para carregar ou ver uma tomada/interruptor.',
        topWatcherEvent:
          'As bobinas de cobre captam a própria carga estática do eclipse para alimentar os aquecedores e luzes do refúgio.',
        bottomEchoPrompt:
          'Conecte ou toque num cabo/carregador e confirme que a reserva de energia da dupla está em 100%.',
        bottomEchoEffect:
          'Desvira sua Dama (Q) e concede vantagem automática na próxima carta do Deck do Mundo.',
        flavorText: 'Usamos a própria tempestade que veio nos apagar para manter as lâmpadas acesas.',
      },
      {
        rank: '10',
        title: 'A Arca da Linha do Horizonte',
        artGlyph: '🚀',
        artSubtitle: 'Navio Que Navega Entre Estrelas e Mar',
        topWatcherTrigger:
          'Ao olhar para o horizonte distante, uma janela ampla ou estrada.',
        topWatcherEvent:
          'No cais onde o mar encontra o céu invertido, a embarcação blindada aguarda com as coordenadas completas da Fenda.',
        bottomEchoPrompt:
          'Trace a coordenada final com o parceiro: para qual novo mundo ou amanhecer vocês apontam o leme?',
        bottomEchoEffect:
          'Clímax de ♦: Rota de salvação descoberta! Desvira todas as Damas (Q) e limpa qualquer Valete (J).',
        flavorText: 'Quando o mar e o céu se tornam um só oceano, qualquer barco vira uma nave estelar.',
      },
    ],
    clubs: [
      {
        rank: 'A',
        title: 'Sussurro da Coroa Solar',
        artGlyph: '🌑',
        artSubtitle: 'Frequência Grave que Vibra nos Ossos',
        topWatcherTrigger:
          'Ao notar o silêncio de uma sala ou sentir uma vibração grave.',
        topWatcherEvent:
          'O eclipse emite um acorde harmônico subaudível. Quem escuta com atenção percebe que a estrela está tentando dizer algo.',
        bottomEchoPrompt:
          'Traduza em uma frase curta e misteriosa o que o sol murmurou antes de fechar o anel negro.',
        bottomEchoEffect:
          'Se for ♣ Paus, você compreende o presságio e desvira sua Dama (Q). Outros naipes sentem o assombro cósmico.',
        flavorText: 'O sol nunca foi mudo; nós é que fazíamos barulho demais durante o dia para ouvi-lo.',
      },
      {
        rank: '2',
        title: 'Déjà Vu de Três Segundos',
        artGlyph: '⏳',
        artSubtitle: 'Esta Cena Já Aconteceu Antes',
        topWatcherTrigger:
          'Ao repetir um gesto cotidiano (abrir porta, pegar copo, olhar celular).',
        topWatcherEvent:
          'O tempo soluça: uma xícara que cai volta para a mesa inteira, e você tem certeza absoluta de que já viveu este minuto.',
        bottomEchoPrompt:
          'Envie duas vezes seguidas a mesma frase curta para o parceiro, mudando apenas a última palavra na segunda vez.',
        bottomEchoEffect:
          'Domina o loop temporal! Permite evitar a ativação de qualquer Valete (J) nesta rodada.',
        flavorText: 'Na primeira vez nós erramos o caminho; desta vez você segurou meu braço na esquina certa.',
      },
      {
        rank: '3',
        title: 'Nuvens em Espiral de Fibonacci',
        artGlyph: '🌀',
        artSubtitle: 'Geometria Sagrada no Céu Crepuscular',
        topWatcherTrigger:
          'Ao olhar para as nuvens, fumaça de café ou espuma na xícara.',
        topWatcherEvent:
          'As nuvens acima da cidade giram em uma espiral matemática perfeita centrada exatamente sobre o telhado onde vocês estão.',
        bottomEchoPrompt:
          'Desenhe uma espiral com o dedo ou mande uma foto do céu/teto descrevendo o centro do redemoinho.',
        bottomEchoEffect:
          'Alinha a dupla com o olho do furacão (calmaria total no próximo turno).',
        flavorText: 'No centro exato do ciclone não venta; há apenas o silêncio de um jardim suspenso.',
      },
      {
        rank: '4',
        title: 'Visita do Seu Eu de Outro Mundo',
        artGlyph: '👥',
        artSubtitle: 'Alguém com Seu Rosto na Outra Calçada',
        topWatcherTrigger:
          'Ao ver seu reflexo num vidro ou cruzar com um desconhecido parecido.',
        topWatcherEvent:
          'Pela fenda da penumbra, você vê outra versão sua e do seu parceiro caminhando do outro lado da rua sob um dia ensolarado.',
        bottomEchoPrompt:
          'Acene discretamente e conte ao parceiro o que as versões de vocês daquele outro mundo pareciam estar conversando.',
        bottomEchoEffect:
          'Cura o Valete de Eco de Outra Vida (J♣) e inspira coragem na dupla.',
        flavorText: 'Eles olharam para nós através da chuva, sorriram e desejaram boa sorte na travessia.',
      },
      {
        rank: '5',
        title: 'Constelações ao Meio-Dia',
        artGlyph: '✨',
        artSubtitle: 'Estrelas Desconhecidas no Céu Escuro',
        topWatcherTrigger:
          'Ao ver pontos de luz no teto, LEDs ou estrelas no céu.',
        topWatcherEvent:
          'Com o sol encoberto em pleno dia, constelações que não pertencem ao nosso hemisfério brilham intensamente sobre os prédios.',
        bottomEchoPrompt:
          'Aponte três pontos de luz no seu ambiente e dê um nome para a nova constelação que guia a dupla.',
        bottomEchoEffect:
          'Bênção astral: se uma Dama (Q) estiver virada, ela pode ser desvirada no início do próximo turno.',
        flavorText: 'Quando a luz grande se apaga, descobrimos que o céu sempre esteve cheio de pequenas fogueiras.',
      },
      {
        rank: '6',
        title: 'Sinos que Tocam Sem Vento',
        artGlyph: '🔔',
        artSubtitle: 'Badaladas de Bronze na Cidade Silenciosa',
        topWatcherTrigger:
          'Ao ouvir um sino, notificação metálica, talher batendo ou som de vidro.',
        topWatcherEvent:
          'Todos os sinos e cristais da cidade vibram na mesma nota lá menor, anunciando que metade do disco solar já foi coberta.',
        bottomEchoPrompt:
          'Faça soar um som leve (bater num copo ou metal) ou descreva a nota que ressoa onde você está.',
        bottomEchoEffect:
          'Harmoniza a frequência e protege contra o Valete (J) da rodada.',
        flavorText: 'O bronze reconhece o fim de uma era antes mesmo dos astrônomos.',
      },
      {
        rank: '7',
        title: 'Pássaros Brancos Pousados no Asfalto',
        artGlyph: '🕊️',
        artSubtitle: 'Centenas de Aves Olhando para o Oeste',
        topWatcherTrigger:
          'Ao ver aves, animais ou folhas paradas no chão.',
        topWatcherEvent:
          'Uma revoada inteira pousou em silêncio absoluto no cruzamento, esperando o segundo do Anel de Diamante.',
        bottomEchoPrompt:
          'Fique em silêncio por alguns segundos e envie apenas uma frase curta de respeito ao presságio da natureza.',
        bottomEchoEffect:
          'Jogadores de ♣ ou ♥ purificam qualquer tensão acumulada na mesa.',
        flavorText: 'Eles não estão com medo; estão apenas esperando o sinal para voar através da aurora.',
      },
      {
        rank: '8',
        title: 'Chuva que Para no Meio da Queda',
        artGlyph: '💧',
        artSubtitle: 'Milhares de Cristais Suspensos no Ar',
        topWatcherTrigger:
          'Ao ver água, vidro, gelo ou gotas na janela.',
        topWatcherEvent:
          'O tempo congela por um instante: as gotas de chuva ficam paradas na altura dos olhos como um cortinado de diamantes.',
        bottomEchoPrompt:
          'Descreva o que você faz enquanto caminha entre as gotas paradas no ar ao lado do seu parceiro.',
        bottomEchoEffect:
          'Instante eterno: permite resolver o turno sem gastar recursos nem virar Damas (Q).',
        flavorText: 'Toquei uma gota suspensa e vi dentro dela o reflexo de todas as manhãs da minha vida.',
      },
      {
        rank: '9',
        title: 'A Porta de Luz Branca no Horizonte',
        artGlyph: '🚪',
        artSubtitle: 'Onde o Espaço e o Tempo se Encontram',
        topWatcherTrigger:
          'Ao ver uma porta iluminada, corredor claro ou saída de prédio.',
        topWatcherEvent:
          'No fim da avenida escura, uma fenda vertical de luz morna se abre, convidando os que mantiveram a memória intacta.',
        bottomEchoPrompt:
          'Chame o parceiro pela mão em sua mensagem e confirme que nenhum dos dois ficará para trás.',
        bottomEchoEffect:
          'Prepara a travessia final: limpa qualquer Valete (J) ativo na dupla.',
        flavorText: 'O fim de um mundo é apenas o batente da porta para o próximo.',
      },
      {
        rank: '10',
        title: 'O Segundo do Anel de Diamante',
        artGlyph: '💍',
        artSubtitle: 'O Último Clarão Antes da Totalidade',
        topWatcherTrigger:
          'Ao ver um brilho intenso de luz, sol na janela ou reflexo dourado.',
        topWatcherEvent:
          'Na borda da lua negra, uma única gota de fogo solar explode como um diamante celeste sobre vocês dois.',
        bottomEchoPrompt:
          'Diga qual é o último desejo ou visão que vocês cravam juntos no instante exato da Totalidade.',
        bottomEchoEffect:
          'Clímax de ♣: Transcendência completa! Todas as Damas (Q) desviram e a crônica atinge a iluminação.',
        flavorText: 'Um único segundo de luz verdadeira basta para justificar a existência do universo inteiro.',
      },
    ],
  },
  jokers: {
    light: {
      title: 'O Segundo Sol — O Despertar da Aurora',
      artGlyph: '☀️',
      artSubtitle: 'A Sombra Passa e o Céu Renasce Dourado',
      topWatcherTrigger:
        'Ao sentir calor do sol, ver luz dourada ou um sorriso inesperado.',
      topWatcherEvent:
        'Contra todos os cálculos dos profetas, a lua negra começa a se afastar! Um feixe quente de ouro novo toca o rosto de vocês.',
      bottomEchoPrompt:
        'Comemorem o novo amanhecer: enviem uma mensagem dizendo qual é a primeira coisa que farão agora que o mundo ganhou mais um dia.',
      bottomEchoEffect:
        'Presságio Claro (★): Milagre Solar! Ambos desviram suas Damas (Q) e removem todos os Valetes (J) imediatamente.',
      flavorText: 'Abrimos as janelas do farol e choramos vendo a grama voltar a ser verde sob a manhã.',
    },
    dark: {
      title: 'Totalidade Eterna — O Colapso da Gravidade',
      artGlyph: '🕳️',
      artSubtitle: 'O Horizonte Se Dobra em Silêncio Absoluto',
      topWatcherTrigger:
        'Ao apagar a luz de um cômodo ou olhar para a noite fechada.',
      topWatcherEvent:
        'O anel do eclipse se fecha por completo. O chão desaparece sob os pés e apenas aquilo que vocês segurarem juntos continuará existindo.',
      bottomEchoPrompt:
        'Ato final de sacrifício: um de vocês entrega sua última âncora temporal (Dama Q + Valete J) para manter a memória da dupla viva.',
      bottomEchoEffect:
        'Cataclismo (💀): Um jogador deve virar sua Dama (Q ⟳) E revelar seu Valete (J) para ancorar a existência do parceiro.',
      flavorText: 'Quando as estrelas se apagaram, segurei sua mão tão forte que nos tornamos nossa própria constelação.',
    },
  },
};

export const ECLIPSE_DECK: ThemeDeck = buildThemeDeck(ECLIPSE_BLUEPRINT);
