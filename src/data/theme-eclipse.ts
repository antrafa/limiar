import { buildThemeDeck, type ThemeBlueprint } from './engine-deck';
import type { ThemeDeck } from '../types/card';

export const ECLIPSE_BLUEPRINT: ThemeBlueprint = {
  id: 'eclipse',
  name: 'O Último Eclipse',
  subtitle: 'Fim do Mundo — Crônica da Coroa Solar',
  tagline: 'O sol está sendo engolido pela coroa negra. As leis da gravidade e da memória começam a falhar.',
  tom: 'fim do mundo, melancólico',
  chefe: {
    nome: 'O Devorador do Sol',
    descricao: 'A coroa negra ganhou forma e fome. Quando terminar o sol, virá a terra.',
  },
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
          'Recarga (Untap): Desvire ao cumprir qualquer carta do naipe de ♦ Ouros (A♦ a 10♦) ou quando você e seu parceiro se encontrarem pessoalmente no mesmo ambiente iluminado.',
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
          'Recarga (Untap): Desvire ao cumprir qualquer carta do naipe de ♦ Ouros (A♦ a 10♦) ou ao trocar um áudio de voz com o parceiro.',
        flavorText: 'Lado A: o som das ondas em janeiro. Lado B: nossas risadas antes de o céu parar.',
      },
      jack: {
        title: 'Esquecimento',
        artGlyph: '🌫️',
        artSubtitle: 'Nomes e Datas Desbotando das Fotografias',
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
          'Recarga (Untap): Desvire ao cumprir qualquer carta do naipe de ♦ Ouros (A♦ a 10♦) ou ao alinhar dois objetos lado a lado em cima da mesa.',
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
          'Recarga (Untap): Desvire ao cumprir qualquer carta do naipe de ♦ Ouros (A♦ a 10♦) ou quando o relógio real marcar horas ou meias-horas exatas (ex.: 14:00 ou 14:30).',
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
          'O céu, uma lâmpada circular ou o reflexo da luz numa lente.',
        topWatcherEvent:
          'A temperatura cai dez graus em um minuto. As sombras das árvores ficam nítidas como lâminas de obsidiana no chão.',
        bottomEchoPrompt:
          'Acenda uma luz perto de você, ou fotografe a fonte de luz mais próxima.',
        bottomEchoEffect:
          'Se for ♠ Espadas, sua vigília mantém o calor. Caso contrário, responda rápido ou vire a Dama (Q ⟳).',
        dailyIdea: 'Pode ser uma noite de estudo, um prazo apertado ou a última tarefa antes de dormir.',
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
          'Suba um degrau ou tire os pés do chão por um instante, buscando terreno alto.',
        bottomEchoEffect:
          'Evita ser arrastado pela maré astral. Se tiver Valete (J) ativo, precisa do apoio do parceiro.',
        dailyIdea: 'Pode ser uma chuva no caminho, uma rua cheia ou uma pilha de louça que não para de crescer.',
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
          'Ilumine uma sombra perto de você com a tela do celular até ela sumir.',
        bottomEchoEffect:
          'Dissipa as silhuetas. Jogadores de ♠ ou ♣ ganham vantagem no próximo turno.',
        dailyIdea: 'Pode ser uma pendência que te persegue, uma mensagem sem resposta ou um cansaço que não larga.',
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
          'Toque em algo de madeira ou tecido e descreva, em uma frase, como você protege seus equipamentos da estática.',
        bottomEchoEffect:
          'Protege o rádio e a lanterna. Se falhar, sua Dama (Q) vira (⟳) pela sobrecarga magnética.',
        dailyIdea: 'Pode ser a internet caindo, um computador travado ou uma chamada de vídeo cheia de falhas.',
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
          'Um grupo em pânico tenta forçar a entrada do observatório que serve de abrigo contra o frio cósmico.',
        bottomEchoPrompt:
          'Diga, em voz alta ou por escrito, se você impõe respeito na porta ou divide parte do seu calor com os saqueadores.',
        bottomEchoEffect:
          'Ambos os caminhos resolvem a crise sem violência se o Eco responder com convicção.',
        dailyIdea: 'Pode ser uma fila no mercado, o último lugar no ônibus ou a bateria do celular acabando.',
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
          'Olhe apenas para as suas mãos por cinco segundos, com o visor abaixado.',
        bottomEchoEffect:
          'Evita o Valete de Olhos de Cinza (J♠). Se já estiver ativo, um jogador de ♥ pode aliviá-lo.',
        dailyIdea: 'Pode ser uma tela que prende seu olhar, uma espera parada ou uma tarefa que paralisa.',
        flavorText: 'Eles parecem em paz, apontando para o céu como se tivessem visto o rosto de Deus.',
      },
      {
        rank: '7',
        title: 'Ponte Pênsil Partida ao Meio',
        artGlyph: '🌉',
        artSubtitle: 'Blocos de Concreto Flutuando no Ar',
        topWatcherTrigger:
          'Uma escada, um corredor comprido, um viaduto ou uma divisão no piso.',
        topWatcherEvent:
          'A gravidade falhou no vão central da ponte: carros e pedaços de asfalto flutuam imóveis a três metros do chão.',
        bottomEchoPrompt:
          'Descreva, em uma frase, como a travessia é feita de pedra em pedra.',
        bottomEchoEffect:
          'Travessia surreal concluída! Se for ♠ ou ♦, você desvira a Dama (Q) do parceiro no salto.',
        dailyIdea: 'Pode ser uma reunião tensa, uma conversa que pode desandar ou uma travessia demorada no trânsito.',
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
          'Diga, em voz alta ou por escrito, se você embarca no trem temporal ou segue a pé pelos trilhos.',
        bottomEchoEffect:
          'Embarcar avança a jornada rapidamente, mas exige que uma Dama (Q) esteja de pé para ancorar a descida.',
        dailyIdea: 'Pode ser o ônibus ou o metrô da volta, o horário de pico ou uma condução que atrasa.',
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
          'Diga ou escreva a frase que sua voz levaria através da nevasca.',
        bottomEchoEffect:
          'Mantém o contato da dupla intacto e limpa penalidades de isolamento.',
        dailyIdea: 'Pode ser uma faxina pesada, uma caixa de entrada lotada ou uma pilha de papéis acumulados.',
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
          'A lanterna mestra do penhasco está ao alcance. Ativar o espelho parabólico enviará o sinal para todos os sobreviventes do hemisfério.',
        bottomEchoPrompt:
          'Escreva, em uma frase, a mensagem final que o farol transmite para o mundo que escurece.',
        bottomEchoEffect:
          'Clímax de ♠: O farol brilha contra o eclipse! Desvira todas as Damas (Q) e dissipa qualquer Valete (J).',
        dailyIdea: 'Pode ser uma prova, uma entrega importante ou a apresentação que fecha a semana.',
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
          'Descreva em palavras uma foto real que você ama, guardando-a na memória antes que suma.',
        bottomEchoEffect:
          'Salva a memória! Se for ♥ Copas, desvira sua Dama (Q) e remove o Valete de Esquecimento (J♥).',
        dailyIdea: 'Pode ser uma visita a alguém mais velho, uma foto antiga no celular ou uma conversa de lembranças.',
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
          'Diga qual música está tocando agora, ou qual você poria para tocar nos últimos cinco minutos da Terra.',
        bottomEchoEffect:
          'Acalma o coração da dupla: qualquer Valete (J) ativo perde sua penalidade durante este turno.',
        dailyIdea: 'Pode ser uma música no caminho, uma playlist com alguém ou um áudio que você recebe.',
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
          'Atenda o chamado: diga ou escreva o conselho que você daria a si mesmo de cinco anos atrás.',
        bottomEchoEffect:
          'Reconcilia o passado e o presente, fortalecendo o escudo emocional da dupla.',
        dailyIdea: 'Pode ser uma ligação inesperada, uma mensagem de alguém sumido ou um contato antigo que reaparece.',
        flavorText: 'A linha cruzou com uma tarde de domingo em que a única preocupação era a chuva.',
      },
      {
        rank: '4',
        title: 'Jantar à Luz de Velas no Fim dos Tempos',
        artGlyph: '🕯️',
        artSubtitle: 'Mesa Posta Enquanto o Céu Gira',
        topWatcherTrigger:
          'Uma refeição, um lanche ou um café durante o dia.',
        topWatcherEvent:
          'Um restaurante pequeno abriu as portas de graça, servindo os melhores pratos que restavam na despensa sob luz de velas.',
        bottomEchoPrompt:
          'Fotografe ou descreva o que você está comendo ou bebendo e faça um brinde à jornada.',
        bottomEchoEffect:
          'Desvira a Dama (Q) se você for ♥ Copas e remove a exaustão da caminhada.',
        dailyIdea: 'Pode ser uma refeição de hoje, um café com alguém ou um lanche no meio da tarde.',
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
          'O frio da coroa solar embaça todas as vidraças da rua. Nome que não for escrito no vidro, a névoa apaga da memória.',
        bottomEchoPrompt:
          'Escreva com o dedo, num vidro ou numa tela, o nome de alguém que você não quer esquecer.',
        bottomEchoEffect:
          'Ancora a identidade de ambos: anula imediatamente o Valete de Esquecimento (J♥) ou Eco de Outra Vida (J♣).',
        dailyIdea: 'Pode ser um bilhete deixado em casa, um recado na geladeira ou um bom-dia a quem você vê sempre.',
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
          'Diga ou escreva uma coisa sincera e bonita que seu personagem sempre quis dizer desde o começo da jornada.',
        bottomEchoEffect:
          'A verdade liberta: desvira uma Dama (Q) virada de qualquer um dos dois jogadores.',
        dailyIdea: 'Pode ser um desabafo, uma conversa franca ou uma mensagem que você vem adiando.',
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
        dailyIdea: 'Pode ser uma brincadeira com uma criança, um passeio no parque ou um momento leve com alguém.',
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
          'Uma caixa de metal hermética espera, pronta para ser lacrada nas raízes de uma figueira centenária.',
        bottomEchoPrompt:
          'Escolha um objeto real que está com você agora para deixar dentro da cápsula como testemunho da humanidade.',
        bottomEchoEffect:
          'O legado está salvo! Jogadores de ♥ ou ♦ desviram sua Dama (Q).',
        dailyIdea: 'Pode ser arrumar lembranças, plantar uma muda ou guardar um presente para alguém.',
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
          'Imagine a última valsa e descreva, em uma frase, a música que tocaria nela.',
        bottomEchoEffect:
          'Remove qualquer Valete (J) ativo na mesa e sincroniza os corações da dupla.',
        dailyIdea: 'Pode ser uma caminhada com alguém, uma música dividida ou o fim de tarde com quem você gosta.',
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
          'A Fita Cassete com a crônica completa precisa chegar ao cofre de quartzo do observatório antes que a coroa se feche.',
        bottomEchoPrompt:
          'Dê um título poético para o livro que conta a sua história nesta jornada.',
        bottomEchoEffect:
          'Clímax de ♥: Amor e memória vencem o apagamento! Restaura todas as Damas (Q) e Valetes (J).',
        dailyIdea: 'Pode ser um almoço em família, uma conversa longa ou uma visita a quem conta boas histórias.',
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
          'Descreva um objeto redondo perto de você como se calibrasse um telescópio.',
        bottomEchoEffect:
          'Sucesso de ♦ Ouros: Desvira a Dama (Q) de ambos os jogadores imediatamente!',
        dailyIdea: 'Pode ser medir algo para uma compra, ajustar um horário ou planejar o caminho do dia.',
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
        dailyIdea: 'Pode ser medir a febre, tomar um remédio na hora ou conferir a temperatura do forno.',
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
          'Gire o celular ou incline a cabeça e descreva como o ambiente fica de lado, como num labirinto.',
        bottomEchoEffect:
          'Vocês decifram a dobra! Desvira a Dama (Q) do Vigia e remove o Valete de Vertigem (J♦).',
        dailyIdea: 'Pode ser um formulário sem fim, um sistema confuso ou subir escadas com sacolas pesadas.',
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
          'Um receptor artesanal feito com fio de cobre e pedra galena consegue furar a interferência solar e captar vozes distantes.',
        bottomEchoPrompt:
          'Bata duas vezes na mesa e diga: "Câmbio, frequência estabilizada".',
        bottomEchoEffect:
          'Reconexão perfeita (♦): Desvira sua Dama (Q) na hora.',
        dailyIdea: 'Pode ser consertar um fone, achar o carregador ou ajustar o wi-fi de casa.',
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
          'Um cartão perfurado dá acesso ao abrigo científico construído para suportar a inversão dos polos.',
        bottomEchoPrompt:
          'Segure uma chave ou cartão real e invente o código de abertura do bunker.',
        bottomEchoEffect:
          'Desvira a Dama (Q) de qualquer jogador que estiver virada.',
        dailyIdea: 'Pode ser uma chave perdida, uma senha esquecida ou trancar a casa antes de sair.',
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
          'Imagine uma porta e diga para qual lugar do mundo você abriria essa passagem.',
        bottomEchoEffect:
          'Teletransporte poético concluído! Desvira a Dama (Q) da dupla.',
        dailyIdea: 'Pode ser um aplicativo de mapas, um atalho no caminho ou resolver duas tarefas de uma vez.',
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
          'Narre como seu personagem devolve o movimento à sala.',
        bottomEchoEffect:
          'Recarrega (Untap) sua Dama (Q) e impede qualquer atraso temporal neste turno.',
        dailyIdea: 'Pode ser um relógio que atrasou, uma fila de banco ou um processo que não anda.',
        flavorText: 'Por quatro segundos inteiros, o planeta esqueceu para que lado costumava girar.',
      },
      {
        rank: '8',
        title: 'Prisma que Decompõe a Luz Negra',
        artGlyph: '💎',
        artSubtitle: 'Sete Cores que Nunca Existiram Antes',
        topWatcherTrigger:
          'Ao ver um reflexo colorido em vidro, água, tela ou óculos.',
        topWatcherEvent:
          'Passando o feixe da coroa solar por um cristal de lustre, surge uma frequência luminosa que afasta o esquecimento.',
        bottomEchoPrompt:
          'Fotografe um reflexo de luz em qualquer vidro ou superfície brilhante perto de você.',
        bottomEchoEffect:
          'Luz restauradora (♦): Desvira ambas as Damas (Q) e limpa o Valete de Olhos de Cinza (J♠).',
        dailyIdea: 'Pode ser escolher uma roupa, separar o lixo reciclável ou organizar algo por cor.',
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
          'Descreva, em uma frase, como você recarrega a reserva de energia com um recurso seguro da história.',
        bottomEchoEffect:
          'Desvira sua Dama (Q) e concede vantagem automática na próxima carta do Deck do Mundo.',
        dailyIdea: 'Pode ser uma conta de luz, um aparelho para ligar na tomada ou trocar uma lâmpada.',
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
          'Trace a coordenada final: diga para qual novo mundo ou amanhecer você aponta o leme.',
        bottomEchoEffect:
          'Clímax de ♦: Rota de salvação descoberta! Desvira todas as Damas (Q) e limpa qualquer Valete (J).',
        dailyIdea: 'Pode ser a compra do mês, fazer uma mala ou guardar tudo que importa num só lugar.',
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
        dailyIdea: 'Pode ser um barulho estranho em casa, o silêncio da madrugada ou uma intuição que não sai da cabeça.',
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
          'Diga ou escreva duas vezes a mesma frase curta, mudando só a última palavra na segunda vez.',
        bottomEchoEffect:
          'Domina o loop temporal! Permite evitar a ativação de qualquer Valete (J) nesta rodada.',
        dailyIdea: 'Pode ser uma rotina repetida, o caminho de sempre ou uma conversa que parece já ter acontecido.',
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
          'As nuvens acima da cidade giram em uma espiral matemática perfeita, centrada exatamente sobre o telhado mais próximo.',
        bottomEchoPrompt:
          'Desenhe uma espiral no ar com o dedo e descreva o que haveria no centro do redemoinho.',
        bottomEchoEffect:
          'Alinha a dupla com o olho do furacão (calmaria total no próximo turno).',
        dailyIdea: 'Pode ser o céu do fim da tarde, uma janela com vista ou uma pausa olhando para longe.',
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
          'Pela fenda da penumbra, outra versão sua caminha do outro lado da rua, sob um dia ensolarado.',
        bottomEchoPrompt:
          'Descreva o que sua versão daquele outro mundo parecia estar dizendo.',
        bottomEchoEffect:
          'Cura o Valete de Eco de Outra Vida (J♣) e inspira coragem na dupla.',
        dailyIdea: 'Pode ser seu reflexo numa vitrine, uma foto sua antiga ou um momento sozinho pensando na vida.',
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
          'Aponte três pontos de luz no seu ambiente e dê um nome à nova constelação que guia você.',
        bottomEchoEffect:
          'Bênção astral: se uma Dama (Q) estiver virada, ela pode ser desvirada no início do próximo turno.',
        dailyIdea: 'Pode ser um dia nublado, um cômodo escuro ao meio-dia ou uma ideia que surge do nada.',
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
          'Descreva ou escreva a nota que ressoa na cena.',
        bottomEchoEffect:
          'Harmoniza a frequência e protege contra o Valete (J) da rodada.',
        dailyIdea: 'Pode ser um alarme que toca, uma campainha inesperada ou o sino de uma igreja no caminho.',
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
          'Diga ou escreva uma frase curta de respeito ao presságio da natureza.',
        bottomEchoEffect:
          'Jogadores de ♣ ou ♥ purificam qualquer tensão acumulada na mesa.',
        dailyIdea: 'Pode ser uma praça com pombos, um parque no caminho ou um quintal ao amanhecer.',
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
          'Descreva o que você faz enquanto caminha entre as gotas paradas no ar.',
        bottomEchoEffect:
          'Instante eterno: permite resolver o turno sem gastar recursos nem virar Damas (Q).',
        dailyIdea: 'Pode ser uma pausa no meio da tarefa, uma chuva que você espera passar ou um minuto de silêncio.',
        flavorText: 'Toquei uma gota suspensa e vi dentro dela o reflexo de todas as manhãs da minha vida.',
      },
      {
        rank: '9',
        title: 'A Porta de Luz Branca no Horizonte',
        artGlyph: '🚪',
        artSubtitle: 'Onde o Espaço e o Tempo se Encontram',
        topWatcherTrigger:
          'Uma porta iluminada, um corredor claro ou a saída de um prédio.',
        topWatcherEvent:
          'No fim da avenida escura, uma fenda vertical de luz morna se abre, convidando os que mantiveram a memória intacta.',
        bottomEchoPrompt:
          'Diga, em voz alta ou por escrito, quem você não deixaria para trás.',
        bottomEchoEffect:
          'Prepara a travessia final: limpa qualquer Valete (J) ativo na dupla.',
        dailyIdea: 'Pode ser uma consulta, uma resposta que você espera ou a saída de um lugar onde passou o dia.',
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
          'Na borda da lua negra, uma única gota de fogo solar explode como um diamante celeste sobre quem ainda resiste.',
        bottomEchoPrompt:
          'Diga qual é o último desejo ou visão que você crava no instante exato da Totalidade.',
        bottomEchoEffect:
          'Clímax de ♣: Transcendência completa! Todas as Damas (Q) desviram e a crônica atinge a iluminação.',
        dailyIdea: 'Pode ser o último minuto do dia, a hora de apagar a luz ou o momento antes de uma notícia.',
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
        'Contra todos os cálculos dos profetas, a lua negra começa a se afastar! Um feixe quente de ouro novo toca o rosto dos sobreviventes.',
      bottomEchoPrompt:
        'Comemore o novo amanhecer: diga ou escreva a primeira coisa que fará agora que o mundo ganhou mais um dia.',
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
        'O anel do eclipse se fecha por completo. O chão desaparece sob os pés e apenas aquilo que for segurado com força continuará existindo.',
      bottomEchoPrompt:
        'Feche os olhos por um instante e diga, em voz alta ou por escrito, a lembrança que você guardaria se tudo mais se apagasse.',
      bottomEchoEffect:
        'Cataclismo (💀): Um jogador deve virar sua Dama (Q ⟳) E revelar seu Valete (J) para ancorar a existência do parceiro.',
      flavorText: 'Quando as estrelas se apagaram, segurei sua mão tão forte que nos tornamos nossa própria constelação.',
    },
  },
};

export const ECLIPSE_DECK: ThemeDeck = buildThemeDeck(ECLIPSE_BLUEPRINT);
