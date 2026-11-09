import { buildThemeDeck, type ThemeBlueprint } from './engine-deck';
import type { ThemeDeck } from '../types/card';

export const ZOMBIES_BLUEPRINT: ThemeBlueprint = {
  id: 'zombies',
  name: 'Zona de Quarentena',
  subtitle: 'Apocalipse Zumbi — Sobrevivência Urbana',
  tagline: 'Cada ruído na rua pode atrair a horda. Cada silêncio esconde uma mordida.',
  tom: 'sobrevivência, tenso',
  chefe: {
    nome: 'O Paciente Zero',
    descricao: 'O primeiro infectado ainda pensa. Ele guia a horda até vocês.',
  },
  accentColor: '#84cc16',
  secondaryColor: '#dc2626',
  suits: {
    spades: {
      suit: 'spades',
      symbol: '♠',
      namePt: 'Espadas',
      vocationName: 'Patrulha & Lâmina',
      colorHex: '#94a3b8',
    },
    hearts: {
      suit: 'hearts',
      symbol: '♥',
      namePt: 'Copas',
      vocationName: 'Triagem & Vínculo',
      colorHex: '#ef4444',
    },
    diamonds: {
      suit: 'diamonds',
      symbol: '♦',
      namePt: 'Ouros',
      vocationName: 'Saque & Engenho',
      colorHex: '#f59e0b',
    },
    clubs: {
      suit: 'clubs',
      symbol: '♣',
      namePt: 'Paus',
      vocationName: 'Sombra & Mutação',
      colorHex: '#84cc16',
    },
  },
  figures: {
    spades: {
      king: {
        title: 'O Batedor de Cinzas',
        artGlyph: '🗡️',
        artSubtitle: 'Vigia das Ruas Mortas',
        passive:
          'Passiva na Vida Real: Sempre que entrar num cômodo ou local público hoje, identifique duas rotas de saída antes de se sentar.',
        synergy:
          'Sinergia (♠): Ao sacar uma carta de Espadas, você ignora penalidades de ruído e pode proteger a Dama (Q) do parceiro.',
        flavorText: 'Quem olha para o chão encontra cápsulas vazias; quem olha para os telhados encontra o amanhã.',
      },
      queen: {
        title: 'Rádio de Curto Alcance',
        artGlyph: '📻',
        artSubtitle: 'Frequência Militar Criptografada',
        tapEffect:
          'Virar (⟳ Tap): Cancele imediatamente uma emboscada ou falha de comunicação. Você avisa o parceiro segundos antes do impacto.',
        rechargeRule:
          'Recarga (Untap): Desvire ao cumprir qualquer carta do naipe de ♦ Ouros (A♦ a 10♦) ou ao encontrar o parceiro pessoalmente.',
        flavorText: 'Chiado estático, três cliques no botão de transmissão: o código para "ainda estou respirando".',
      },
      jack: {
        title: 'Mordida Oculta',
        artGlyph: '🩸',
        artSubtitle: 'Manga Abotoada Até o Pulso',
        entryTrigger:
          'Gatilho de Entrada: Revele quando falhar num confronto de ♠ ou recusar pagar o custo de um Eco.',
        realLifeTaboo:
          'Tabu na Vida Real: Você não pode reclamar de cansaço, dor ou fome, nem usar as palavras "ajuda" ou "medo" nas mensagens.',
        flavorText: 'As veias escuras sobem pelo antebraço, mas ninguém no abrigo pode saber antes do amanhecer.',
      },
    },
    hearts: {
      king: {
        title: 'A Médica de Trincheira',
        artGlyph: '🩺',
        artSubtitle: 'Guardiã do Último Antisséptico',
        passive:
          'Passiva na Vida Real: Pergunte genuinamente como o outro está se sentindo antes de responder a qualquer assunto prático.',
        synergy:
          'Sinergia (♥): Ao sacar uma carta de Copas, você pode acalmar um Valete (J) ativo por um turno ou restaurar a confiança da dupla.',
        flavorText: 'Costurar a carne é fácil; difícil é impedir que o sobrevivente desista de acordar.',
      },
      queen: {
        title: 'Soro Experimental',
        artGlyph: '💉',
        artSubtitle: 'Ampola Refrigerada Nível 4',
        tapEffect:
          'Virar (⟳ Tap): Reverta a ativação de um Valete (J) de qualquer jogador ou converta um sacrifício em sucesso pleno.',
        rechargeRule:
          'Recarga (Untap): Desvire ao cumprir qualquer carta do naipe de ♦ Ouros (A♦ a 10♦) ou quando dividirem uma refeição ou bebida real.',
        flavorText: 'Líquido âmbar que queima como gelo nas veias e compra mais vinte e quatro horas de humanidade.',
      },
      jack: {
        title: 'Febre de Contato',
        artGlyph: '🌡️',
        artSubtitle: 'Suor Frio e Pupilas Dilatadas',
        entryTrigger:
          'Gatilho de Entrada: Revele ao falhar em proteger um inocente ou hesitar num Eco de ♥ Copas.',
        realLifeTaboo:
          'Tabu na Vida Real: Suas mensagens ou falas no jogo devem começar com uma pergunta ou confirmação de que o parceiro ainda está lá.',
        flavorText: 'O termômetro quebrou nos 40 graus, e as vozes no corredor parecem chamar seu nome de infância.',
      },
    },
    diamonds: {
      king: {
        title: 'O Saqueador de Telhados',
        artGlyph: '🧗',
        artSubtitle: 'Mestre das Pontes Improvisadas',
        passive:
          'Passiva na Vida Real: Carregue um objeto pequeno inesperado no bolso hoje (moeda, clipe, chave antiga) como amuleto de troca.',
        synergy:
          'Sinergia (♦): Ao sacar uma carta de Ouros, você desvira sua Dama (Q) automaticamente mesmo sem custo adicional.',
        flavorText: 'Para quem sabe ler marquises e tubulações, a cidade trancada ainda é um armazém aberto.',
      },
      queen: {
        title: 'Chave-Mestra',
        artGlyph: '🗝️',
        artSubtitle: 'Gazua de Titânio e Pé-de-Cabra',
        tapEffect:
          'Virar (⟳ Tap): Ignore o requisito de ambiente de qualquer carta de Jornada e substitua por um objeto que esteja ao alcance da sua mão.',
        rechargeRule:
          'Recarga (Untap): Desvire ao cumprir qualquer carta do naipe de ♦ Ouros (A♦ a 10♦), abrir uma porta trancada ou reencontrar o parceiro.',
        flavorText: 'Nenhuma grade do exército resiste a três minutos de alavanca silenciosa.',
      },
      jack: {
        title: 'Mochila Rasgada',
        artGlyph: '🎒',
        artSubtitle: 'Rastro de Suprimentos Perdidos',
        entryTrigger:
          'Gatilho de Entrada: Revele quando perder um prazo de resposta ou falhar num teste de recurso (♦).',
        realLifeTaboo:
          'Tabu na Vida Real: Você só pode enviar respostas curtas de no máximo duas frases ou áudios de até 12 segundos.',
        flavorText: 'A costura cedeu no meio da escada de incêndio; metade das munições ficou para os mortos.',
      },
    },
    clubs: {
      king: {
        title: 'O Paciente Zero Latente',
        artGlyph: '🧬',
        artSubtitle: 'Sangue Híbrido Imune',
        passive:
          'Passiva na Vida Real: Observe pessoas distraídas ao seu redor como se você pudesse ouvir o batimento cardíaco delas à distância.',
        synergy:
          'Sinergia (♣): Ao sacar uma carta de Paus, você pressente a horda e pode escolher resolver o Eco sem sofrer risco de Cicatriz.',
        flavorText: 'Eles passam por mim sem atacar. O que me assusta é que cada dia entendo melhor o que eles murmuram.',
      },
      queen: {
        title: 'Sentido da Horda',
        artGlyph: '👁️',
        artSubtitle: 'Ressonância Neural com os Infectados',
        tapEffect:
          'Virar (⟳ Tap): Espie a próxima carta do Topo ou do Fundo do baralho antes de decidir quem assumirá o turno, ou anule um pânico de ♣.',
        rechargeRule:
          'Recarga (Untap): Desvire ao cumprir qualquer carta do naipe de ♦ Ouros (A♦ a 10♦) ou permanecer em silêncio absoluto com o parceiro por um minuto.',
        flavorText: 'Feche os olhos e sinta a vibração no asfalto: trezentos passos arrastados dobrando a esquina.',
      },
      jack: {
        title: 'Fome Incontrolável',
        artGlyph: '🦷',
        artSubtitle: 'Instinto Predatório Desperto',
        entryTrigger:
          'Gatilho de Entrada: Revele ao falhar numa carta de ♣ Paus ou ao tirar o Coringa Escuro sem proteção.',
        realLifeTaboo:
          'Tabu na Vida Real: Em toda interação, você deve mencionar algo sensorial (um cheiro, um som de respiração, a temperatura ou a luz).',
        flavorText: 'A ração enlatada tem gosto de cinza; o pulso quente no pescoço ao lado brilha como um farol.',
      },
    },
  },
  journeys: {
    spades: [
      {
        rank: 'A',
        title: 'Sirene do Bloqueio Militar',
        artGlyph: '🚨',
        artSubtitle: 'Barricada Norte Rompida',
        topWatcherTrigger:
          'Ao ouvir qualquer sirene, buzina prolongada ou alarme de carro/celular no seu dia.',
        topWatcherEvent:
          'O perímetro do exército caiu a três quadras daqui. Corredores infectados avançam em disparada pelo viaduto.',
        bottomEchoPrompt:
          'Descreva, sem revelar onde você está, um abrigo fictício que protegeria você do perigo.',
        bottomEchoEffect:
          'Sucesso se responder em menos de 10 minutos (ou se seu Rei for ♠). Caso contrário, vire sua Dama (Q ⟳) para conter o avanço.',
        dailyIdea: 'Pode ser o despertador, um alarme de prazo ou uma notificação urgente do trabalho.',
        flavorText: 'Quando a sirene para de tocar, não significa que o perigo passou — significa que o operador morreu.',
      },
      {
        rank: '2',
        title: 'Vidro Estilhaçado no Corredor',
        artGlyph: '🪟',
        artSubtitle: 'Armadilha Sonora no Térreo',
        topWatcherTrigger:
          'Ao pisar em uma superfície barulhenta ou ver uma janela/porta de vidro perto de você.',
        topWatcherEvent:
          'Alguém quebrou a vitrine da farmácia abaixo do esconderijo. Dois estaladores farejam o chão coberto de cacos.',
        bottomEchoPrompt:
          'Escreva uma instrução tática curta, como se sussurrasse o caminho para sair em silêncio.',
        bottomEchoEffect:
          'Se o áudio tiver ruído alto ou hesitação, revele seu Valete (J). Se seu Rei for ♠ ou ♣, você passa invisível.',
        dailyIdea: 'Pode ser um copo quebrado, um barulho no prédio ou um imprevisto logo cedo.',
        flavorText: 'Um único fragmento de cristal sob a bota vale mais que um tiro de escopeta no silêncio.',
      },
      {
        rank: '3',
        title: 'Ronda no Estacionamento Subterrâneo',
        artGlyph: '🔦',
        artSubtitle: 'Faróis Piscando no Escuro',
        topWatcherTrigger:
          'Ao passar perto de carros estacionados, garagem ou rua com pouca iluminação.',
        topWatcherEvent:
          'O alarme de uma caminhonete abandonada dispara sozinho, atraindo silhuetas trôpegas entre as colunas de concreto.',
        bottomEchoPrompt:
          'Descreva um obstáculo fictício que serviria de cobertura nesta cena.',
        bottomEchoEffect:
          'Vire sua Dama (Q ⟳) para neutralizar o perigo sem ser visto (se seu Rei for ♠ Espadas, você resolve sem precisar virar a Dama).',
        dailyIdea: 'Pode ser achar vaga, uma garagem mal iluminada ou a volta pelo estacionamento do mercado.',
        flavorText: 'Nunca entre num carro sem antes olhar o banco de trás.',
      },
      {
        rank: '4',
        title: 'Atirador no Terraço Vizinho',
        artGlyph: '🎯',
        artSubtitle: 'Reflexo de Luneta ao Entardecer',
        topWatcherTrigger:
          'Ao ver o topo de um prédio alto, janela no andar superior ou poste de câmera.',
        topWatcherEvent:
          'Um sobrevivente hostil controla o cruzamento com um rifle de caça e exige pedágio de quem quiser passar.',
        bottomEchoPrompt:
          'Aponte ou fotografe o objeto perto de você que jogaria longe como isca para distrair a ameaça.',
        bottomEchoEffect:
          'Se seu Rei for de ♠ ou ♦, a distração funciona sem custo. Outros naipes precisam virar a Dama (Q ⟳) ou revelar o Valete (J).',
        dailyIdea: 'Pode ser uma avaliação, uma revisão do seu trabalho ou um prazo que vigia você de longe.',
        flavorText: 'Os vivos aprenderam a ser piores que os mortos na segunda semana do surto.',
      },
      {
        rank: '5',
        title: 'Portão de Grade Enferrujada',
        artGlyph: '⛓️',
        artSubtitle: 'Dezenas de Mãos Entre as Barras',
        topWatcherTrigger:
          'Ao ver qualquer portão de ferro, cerca, catraca ou grade de segurança.',
        topWatcherEvent:
          'O peso de vinte infectados está entortando o cadeado principal do refúgio. Os parafusos estão cedendo.',
        bottomEchoPrompt:
          'Diga qual móvel pesado perto de você usaria como barricada contra o perigo.',
        bottomEchoEffect:
          'Se responder rápido, a barricada segura a cena. Se demorar ou recusar, vire sua Dama (Q ⟳) ou revele seu Valete (J).',
        dailyIdea: 'Pode ser a porta de um lugar lotado, a catraca do metrô ou a fila do caixa.',
        flavorText: 'Eles não sentem dor nos dedos quebrados; só empurram até o ferro chorar.',
      },
      {
        rank: '6',
        title: 'Faca Cravada no Mapa',
        artGlyph: '🗺️',
        artSubtitle: 'Rota de Evacuação Riscada a Sangue',
        topWatcherTrigger:
          'Ao olhar para uma placa de rua, tela de GPS, mapa ou letreiro de direção.',
        topWatcherEvent:
          'O posto avançado que era o destino da caminhada foi marcado com o símbolo de "Bio-Perigo Total — Fogo Artilheiro".',
        bottomEchoPrompt:
          'Escolha uma direção nova, Norte, Sul, Leste ou Oeste, para contornar o perigo e diga-a em voz alta ou por escrito.',
        bottomEchoEffect:
          'Muda a rota com segurança. Se o Eco estiver com o Valete (J) aberto, o esforço extra exige virar a Dama (Q ⟳).',
        dailyIdea: 'Pode ser um plano que mudou, um desvio no caminho ou uma agenda que precisa ser refeita.',
        flavorText: 'A ponte segura de ontem é o abatedouro de hoje.',
      },
      {
        rank: '7',
        title: 'Cachorro Latindo para o Vazio',
        artGlyph: '🐕',
        artSubtitle: 'Alerta Instintivo na Esquina',
        topWatcherTrigger:
          'Ao ver ou ouvir um animal (cão, pássaro, gato) na rua, janela ou vizinhança.',
        topWatcherEvent:
          'Um cão magro rosna fixamente para a porta do porão. Há algo rastejando no duto de ventilação.',
        bottomEchoPrompt:
          'Decida em uma frase curta: você parte para o confronto direto ou tranca a passagem para ganhar tempo?',
        bottomEchoEffect:
          'Se confrontar: Rei de ♠ vence sem custo; outros naipes viram a Dama (Q ⟳). Se isolar e recuar: escapam agora, mas na próxima falha você vira a Dama (Q ⟳) e o Valete (J).',
        dailyIdea: 'Pode ser o cachorro do vizinho, um barulho de obra ou um aviso que você quase ignora.',
        flavorText: 'Os animais sabem distinguir quem ainda tem alma a cinquenta metros de distância.',
      },
      {
        rank: '8',
        title: 'Ponte Elevadiça Travada',
        artGlyph: '🌉',
        artSubtitle: 'Manivela Manual Sob Fogo',
        topWatcherTrigger:
          'Ao subir ou descer uma escada, rampa, elevador ou passarela.',
        topWatcherEvent:
          'A passarela metálica emperrou a meio caminho enquanto a maré de infectados sobe pela rampa inferior.',
        bottomEchoPrompt:
          'Segure algo firme por alguns segundos onde estiver e diga: "Segurei a passagem".',
        bottomEchoEffect:
          'Libera a fuga da dupla! Se o seu Rei for de ♠ Espadas, você também pode desvirar a Dama (Q) do seu parceiro.',
        dailyIdea: 'Pode ser um portão que não abre, uma porta emperrada ou um elevador que demora.',
        flavorText: 'Engrenagens cobertas de ferrugem e graxa exigem músculos que a fome já consumiu.',
      },
      {
        rank: '9',
        title: 'Patrulha de Extermínio ("Os Limpadores")',
        artGlyph: '🔥',
        artSubtitle: 'Lança-Chamas no Nevoeiro',
        topWatcherTrigger:
          'Ao sentir cheiro de fumaça, café torrado, escapamento ou ver alguém de uniforme/colete.',
        topWatcherEvent:
          'Soldados renegados em trajes hazmat estão queimando quarteirões inteiros sem checar se há sobreviventes saudáveis.',
        bottomEchoPrompt:
          'Fotografe ou aponte um canto escondido onde você caberia agachado até o perigo passar.',
        bottomEchoEffect:
          'Exige discrição: se você estiver com o Valete (J) aberto, precisa virar sua Dama (Q ⟳) para não denunciar o esconderijo.',
        dailyIdea: 'Pode ser uma faxina geral, uma revisão rigorosa ou uma reunião de cobrança.',
        flavorText: 'Para o protocolo Cinza, qualquer um fora da muralha já consta como baixa biológica.',
      },
      {
        rank: '10',
        title: 'Cerco na Torre de Transmissão',
        artGlyph: '📡',
        artSubtitle: 'Última Munição no Pente',
        topWatcherTrigger:
          'Ao ver uma antena, torre, poste de alta tensão ou o ponto mais alto do horizonte.',
        topWatcherEvent:
          'Centenas de infectados cercam a base da antena enquanto o sinal de resgate tenta chegar ao helicóptero.',
        bottomEchoPrompt:
          'Diga ou escreva, em dez segundos, a transmissão de rádio que coordena o resgate.',
        bottomEchoEffect:
          'Clímax de ♠: Vire sua Dama (Q ⟳) (ou use a sinergia do Rei de ♠) para garantir extração limpa; senão, revele seu Valete (J).',
        dailyIdea: 'Pode ser um dia sem sinal, a última ligação antes de a bateria acabar ou a entrega final.',
        flavorText: 'Suba mais um degrau. Se cairmos, que seja vendo o sol acima da fumaça.',
      },
    ],
    hearts: [
      {
        rank: 'A',
        title: 'Teste de Sangue na Luz da Lanterna',
        artGlyph: '🔬',
        artSubtitle: 'Três Segundos para o Resultado',
        topWatcherTrigger:
          'Ao lavar as mãos, olhar no espelho ou ver um foco de luz direta.',
        topWatcherEvent:
          'O arranhão no ombro parece inflamado. É preciso conferir se o vírus entrou na corrente sanguínea.',
        bottomEchoPrompt:
          'Olhe a palma da mão ou sinta a pulsação no pulso e descreva-a, provando que você ainda está limpo.',
        bottomEchoEffect:
          'Se o Eco tiver um Valete (J) ativo, um jogador de ♥ Copas pode limpá-lo agora virando sua Dama (Q ⟳).',
        dailyIdea: 'Pode ser um exame de rotina, a espera de um resultado ou uma consulta marcada.',
        flavorText: 'Olhe nos meus olhos sob a lanterna. Se a pupila contrair, eu não aperto o gatilho.',
      },
      {
        rank: '2',
        title: 'Fogueira em Lata de Óleo',
        artGlyph: '🔥',
        artSubtitle: 'Cinco Minutos de Trégua no Frio',
        topWatcherTrigger:
          'Ao segurar uma xícara quente, acender uma luz morna ou sentar para descansar.',
        topWatcherEvent:
          'A chuva ácida lá fora dá uma trégua. Pela primeira vez em três dias as botas secam em segurança.',
        bottomEchoPrompt:
          'Diga ou escreva uma lembrança boa de antes da "quarentena" que mantém seu personagem lutando.',
        bottomEchoEffect:
          'Restaura a esperança: se algum dos dois estava com Valete (J) ativo, o fardo do tabu é suspenso pelo próximo turno.',
        dailyIdea: 'Pode ser um café quentinho com alguém, uma pausa no trabalho ou um papo rápido no corredor.',
        flavorText: 'Não é o calor do fogo que impede o congelamento, é ter alguém para dividir a lata de pêssego.',
      },
      {
        rank: '3',
        title: 'Criança Perdida no Supermercado',
        artGlyph: '🧸',
        artSubtitle: 'Choro Baixo Atrás das Prateleiras',
        topWatcherTrigger:
          'Ao ver um brinquedo, desenho, escola ou ouvir vozes jovens ao longe.',
        topWatcherEvent:
          'Uma sobrevivente mirim está encurralada no depósito de alimentos, mas resgatá-la vai atrasar a fuga.',
        bottomEchoPrompt:
          'Diga o que você entregaria das suas mãos ou da mesa para acalmar alguém em pânico sem fazer barulho.',
        bottomEchoEffect:
          'Se ajudar (Rei de ♥ resolve sem custo), outros naipes viram a Dama (Q ⟳); se recusar ajudar, revele seu Valete (J) imediatamente.',
        dailyIdea: 'Pode ser uma ida ao mercado, ajudar alguém a achar algo ou a ligação de quem precisa de você.',
        flavorText: 'Salvar uma vida custa munição; abandonar uma vida custa quem você era.',
      },
      {
        rank: '4',
        title: 'Bandagem Improvisada com Camisa',
        artGlyph: '🩹',
        artSubtitle: 'Estancando a Hemorragia',
        topWatcherTrigger:
          'Ao tocar em tecido, roupa dobrada, guarda-chuva ou bolsa.',
        topWatcherEvent:
          'Estilhaços da última corrida cortaram um braço. O cheiro de sangue fresco viaja rápido pelo vento.',
        bottomEchoPrompt:
          'Descreva a cor da roupa que você está usando e que rasgaria para improvisar um curativo.',
        bottomEchoEffect:
          'Protege a dupla! Se o seu Rei for de ♥ Copas, você também desvira sua Dama (Q).',
        dailyIdea: 'Pode ser um curativo, cuidar de alguém doente ou uma palavra de apoio a quem precisa.',
        flavorText: 'Aperte o nó até doer. Se está doendo, é porque o coração ainda bate.',
      },
      {
        rank: '5',
        title: 'Carta Não Enviada no Correio Morto',
        artGlyph: '✉️',
        artSubtitle: 'Palavras de Despedida no Balcão',
        topWatcherTrigger:
          'Ao ver papel impresso, caderno, livro, recibo ou envelope.',
        topWatcherEvent:
          'Uma mala postal caída guarda dezenas de cartas escritas no dia em que os telefones pararam.',
        bottomEchoPrompt:
          'Escreva duas linhas que seu personagem deixaria gravadas no balcão, para quem passar depois.',
        bottomEchoEffect:
          'Fortalece o vínculo da dupla: desvira a Dama (Q) de um dos jogadores.',
        dailyIdea: 'Pode ser uma mensagem que você não mandou, um e-mail de despedida ou um cartão para alguém.',
        flavorText: 'Prometemos nos encontrar na praça da matriz quando tudo acabar. A praça não existe mais.',
      },
      {
        rank: '6',
        title: 'Dividindo a Última Garrafa de Água',
        artGlyph: '💧',
        artSubtitle: 'Dois Goles para Cada Um',
        topWatcherTrigger:
          'Ao beber água, café, suco ou ver uma garrafa/copo na sua frente.',
        topWatcherEvent:
          'O filtro portátil quebrou e o cantil tem apenas quatro dedos de água potável para atravessar a zona industrial.',
        bottomEchoPrompt:
          'Beba um gole de água agora e descreva como você raciona o suprimento que resta.',
        bottomEchoEffect:
          'Se beber água e confirmar, qualquer Valete (J) aberto tem seu Tabu suspenso durante esta rodada.',
        dailyIdea: 'Pode ser dividir um lanche, um almoço com colegas ou a última fatia do bolo.',
        flavorText: 'A sede transforma amigos em estranhos, ou estranhos em irmãos de sangue.',
      },
      {
        rank: '7',
        title: 'Delírio da Noite em Claro',
        artGlyph: '🌙',
        artSubtitle: 'Sombras que Parecem Rostos Conhecidos',
        topWatcherTrigger:
          'Ao sentir sono, bocejar ou olhar para uma janela quando a luz muda.',
        topWatcherEvent:
          'A privação de sono faz jurar ter visto um antigo amigo caminhando no meio da horda lá embaixo.',
        bottomEchoPrompt:
          'Diga seu próprio nome e responda, em voz alta ou por escrito: "Onde estou agora?".',
        bottomEchoEffect:
          'Ancora a mente e resolve a cena. Se demorar ou falhar, revele seu Valete (J).',
        dailyIdea: 'Pode ser uma noite mal dormida, um plantão ou conversar com alguém que também está acordado.',
        flavorText: 'Não olhe para os rostos deles. A pessoa que você conhecia já saiu daquele corpo há semanas.',
      },
      {
        rank: '8',
        title: 'Velório Silencioso no Jardim',
        artGlyph: '🪦',
        artSubtitle: 'Crachá Pendurado na Cruz de Madeira',
        topWatcherTrigger:
          'Ao ver uma planta, árvore, jardim, vaso de flor ou praça.',
        topWatcherEvent:
          'No jardim está o túmulo improvisado do antigo líder do abrigo, junto com o caderno de anotações médicas dele.',
        bottomEchoPrompt:
          'Olhe ou fotografe uma folha, planta ou objeto calmo perto de você e respire fundo uma vez.',
        bottomEchoEffect:
          'Se seu Rei for de ♥ Copas, desvire sua Dama (Q); outros naipes resolvem a cena sem custo.',
        dailyIdea: 'Pode ser lembrar de alguém que se foi, uma despedida no trabalho ou uma mudança de casa.',
        flavorText: 'Onde as flores nascem sobre o concreto, a terra ainda lembra como curar.',
      },
      {
        rank: '9',
        title: 'Pacto do Último Cartucho',
        artGlyph: '🤝',
        artSubtitle: 'Juramento Contra a Transformação',
        topWatcherTrigger:
          'Ao olhar para o relógio, pulseira, anel ou para as próprias mãos.',
        topWatcherEvent:
          'Encurralados no vagão de metrô, os sobreviventes renovam a promessa mais dura do apocalipse: não deixar ninguém virar um deles.',
        bottomEchoPrompt:
          'Invente a senha secreta que provaria que você ainda é você.',
        bottomEchoEffect:
          'Cria um escudo emocional: permite virar um Valete (J) aberto de volta para baixo (curado) se você virar sua Dama (Q ⟳).',
        dailyIdea: 'Pode ser uma promessa a alguém, um combinado em casa ou um compromisso que você renova.',
        flavorText: 'Se eu esquecer a música que cantávamos na chuva, não hesite.',
      },
      {
        rank: '10',
        title: 'Hospital de Campanha Abandonado',
        artGlyph: '🏥',
        artSubtitle: 'Gerador de Emergência Ligado',
        topWatcherTrigger:
          'Ao ver uma farmácia, consultório, caixa de remédios ou corredor branco.',
        topWatcherEvent:
          'O centro cirúrgico da Cruz Vermelha está intacto, mas as portas magnéticas vão travar em três minutos.',
        bottomEchoPrompt:
          'Diga qual recurso vital você pega primeiro (antibióticos, plasma ou prontuário) e por quê.',
        bottomEchoEffect:
          'Clímax de ♥: Vira para baixo (cura) o Valete (J) de ambos os jogadores se cumprirem a cena!',
        dailyIdea: 'Pode ser visitar alguém doente, uma farmácia de plantão ou um dia cuidando de quem precisa.',
        flavorText: 'Entre macas reviradas, uma única geladeira ainda zumbe com a esperança de um continente.',
      },
    ],
    diamonds: [
      {
        rank: 'A',
        title: 'Cofre do Depósito Farmacêutico',
        artGlyph: '🔐',
        artSubtitle: 'Combinação de Três Dígitos',
        topWatcherTrigger:
          'Ao ver um teclado numérico, fechadura, senha ou código de barras.',
        topWatcherEvent:
          'Atrás do balcão blindado há uma caixa lacrada de suprimentos táticos e baterias de lítio.',
        bottomEchoPrompt:
          'Diga os três últimos dígitos do horário ou da bateria do seu celular: é a combinação do cofre.',
        bottomEchoEffect:
          'Sucesso de ♦ Ouros! Ambos os jogadores podem desvirar suas Damas (Q) imediatamente.',
        dailyIdea: 'Pode ser comprar um remédio, lembrar uma senha ou organizar a caixa de medicamentos.',
        flavorText: 'O gerente levou a senha para o túmulo, mas deixou a data de aniversário no calendário de parede.',
      },
      {
        rank: '2',
        title: 'Gerador a Diesel Engasgado',
        artGlyph: '⛽',
        artSubtitle: 'Fumaça Preta e Correia Frouxa',
        topWatcherTrigger:
          'Ao ouvir o barulho de um motor, ar-condicionado, geladeira ou ventilador.',
        topWatcherEvent:
          'A energia do abrigo está caindo no meio da noite. Sem luz nos holofotes, os sensores de perímetro apagam.',
        bottomEchoPrompt:
          'Aponte ou fotografe um cabo, carregador ou interruptor perto de você para improvisar energia.',
        bottomEchoEffect:
          'Desvira a sua Dama (Q)! Se falhar ou ignorar, você precisa virar sua Dama (Q ⟳) ou revelar o Valete (J).',
        dailyIdea: 'Pode ser um eletrodoméstico com defeito, um carro que não pega ou uma impressora teimosa.',
        flavorText: 'Duas voltas de fita isolante e uma prece mecânica mantêm os monstros do lado de fora.',
      },
      {
        rank: '3',
        title: 'Mochila Militar Presa na Árvore',
        artGlyph: '🎒',
        artSubtitle: 'Paraquedas Rasgado no Segundo Andar',
        topWatcherTrigger:
          'Ao olhar para cima e ver fios elétricos, galhos, marquises ou lâmpadas.',
        topWatcherEvent:
          'Um pacote de suprimentos lançado por drone ficou preso a quatro metros do chão, bem sobre uma poça de óleo.',
        bottomEchoPrompt:
          'Diga qual objeto longo do seu ambiente você usaria para alcançar a mochila à distância, sem se expor.',
        bottomEchoEffect:
          'Resolve a cena e desvira sua Dama (Q)!',
        dailyIdea: 'Pode ser algo guardado num lugar alto, uma encomenda atrasada ou arrumar a mochila.',
        flavorText: 'O paraquedista não teve sorte, mas as rações MRE dele vão nos manter vivos até domingo.',
      },
      {
        rank: '4',
        title: 'Atalho pelos Dutos de Ventilação',
        artGlyph: '🔩',
        artSubtitle: 'Grade Desparafusada com Moeda',
        topWatcherTrigger:
          'Ao ver uma saída de ar, janela estreita, corredor apertado ou fresta.',
        topWatcherEvent:
          'A rua principal está tomada por centenas de vagantes. A única saída é rastejar pelo sistema de ar do shopping.',
        bottomEchoPrompt:
          'Descreva, em uma frase, a passagem lateral que você abre pelos dutos.',
        bottomEchoEffect:
          'Evita qualquer dano neste turno e desvira sua Dama (Q)!',
        dailyIdea: 'Pode ser um atalho no caminho, um parafuso solto para apertar ou um jeito mais rápido de fazer a tarefa.',
        flavorText: 'Não olhe para baixo pelas grelhas; eles sentem o calor da nossa pele.',
      },
      {
        rank: '5',
        title: 'Escambo com o Mercador da Van Blindada',
        artGlyph: '🚐',
        artSubtitle: 'Troca Justa na Zona Neutra',
        topWatcherTrigger:
          'Ao ver uma moeda, carteira, cartão, nota fiscal ou vitrine de loja.',
        topWatcherEvent:
          'Um contrabandista solitário abre a janela gradeada da van: ele tem munição e antibióticos, mas quer algo útil da velha era.',
        bottomEchoPrompt:
          'Fotografe ou descreva o objeto mais curioso da sua mesa ou bolso e diga como o usaria na troca.',
        bottomEchoEffect:
          'O improviso funciona: desvire a Dama (Q) de qualquer um dos dois jogadores!',
        dailyIdea: 'Pode ser uma troca com um vizinho, a venda de algo usado ou um favor trocado por outro.',
        flavorText: 'Dinheiro de papel só serve para acender fogueira; pilhas alcalinas valem ouro puro.',
      },
      {
        rank: '6',
        title: 'Ponte de Tábuas Entre Dois Prédios',
        artGlyph: '🪜',
        artSubtitle: 'Vinte Metros Acima do Asfalto Infectado',
        topWatcherTrigger:
          'Ao atravessar uma porta, corredor, faixa de pedestres ou mudar de cômodo.',
        topWatcherEvent:
          'Os saqueadores instalaram pranchas de andaime ligando dois telhados. O vento balança a madeira a cada passo.',
        bottomEchoPrompt:
          'Dê cinco passos em linha reta onde estiver, ou imagine-os, como quem atravessa uma tábua estreita.',
        bottomEchoEffect:
          'A travessia recarrega (desvira) tanto a sua Dama (Q) quanto a Dama do Vigia!',
        dailyIdea: 'Pode ser uma escada de mão, uma passarela no caminho ou dar conta de dois compromissos colados.',
        flavorText: 'Olhe apenas para os ombros de quem vai à sua frente.',
      },
      {
        rank: '7',
        title: 'Oficina de Recarga de Munição',
        artGlyph: '🔧',
        artSubtitle: 'Bancada de Pólvora e Chumbo',
        topWatcherTrigger:
          'Ao usar uma caneta, ferramenta, teclado ou utensílio de metal.',
        topWatcherEvent:
          'Uma garagem trancada por dentro guarda prensas manuais, ferramentas intactas e lanternas táticas.',
        bottomEchoPrompt:
          'Diga se você melhora agora a arma ou o kit médico, e com qual peça.',
        bottomEchoEffect:
          'Desvira a Dama (Q) de ambos os jogadores!',
        dailyIdea: 'Pode ser carregar o celular, reabastecer a despensa ou preparar as marmitas da semana.',
        flavorText: 'Quem sabe consertar o que quebrou nunca fica sem aliados na quarentena.',
      },
      {
        rank: '8',
        title: 'Vagão de Carga Descarrilado',
        artGlyph: '🚆',
        artSubtitle: 'Contêiner da Defesa Civil Selado',
        topWatcherTrigger:
          'Ao ver um caminhão, ônibus, trem, caixa grande ou armário trancado.',
        topWatcherEvent:
          'Um trem logístico tombou nos trilhos. O contêiner azul ainda tem o lacre de chumbo original, mas o barulho ao abrir será alto.',
        bottomEchoPrompt:
          'Bata duas vezes na mesa, como quem força a porta do contêiner.',
        bottomEchoEffect:
          'Vocês abrem caminho a tempo: desvire sua Dama (Q)!',
        dailyIdea: 'Pode ser uma entrega que chegou errada, uma caixa para abrir ou uma encomenda presa no correio.',
        flavorText: 'Dentro havia trinta caixas de filtros de água e um rádio militar na caixa original.',
      },
      {
        rank: '9',
        title: 'Bateria Solar no Topo da Caixa d’Água',
        artGlyph: '☀️',
        artSubtitle: 'Energia Limpa Acima da Névoa',
        topWatcherTrigger:
          'Ao ver a luz do sol, uma luminária acesa ou o ícone de bateria da tela.',
        topWatcherEvent:
          'As placas fotovoltaicas do prédio vizinho ainda funcionam, mas os cabos foram roídos por corvos e ratos.',
        bottomEchoPrompt:
          'Diga em quantos por cento está a bateria do seu celular: é a carga que sobra no painel solar.',
        bottomEchoEffect:
          'Se a bateria estiver acima de 30% (ou Rei de ♦), desvira sua Dama (Q) e vira seu Valete (J) para baixo! Se <30%, apenas desvira a Dama (Q).',
        dailyIdea: 'Pode ser estender roupa no sol, regar as plantas ou subir ao terraço para pegar algo.',
        flavorText: 'O sol ainda nasce igual todos os dias, indiferente às cidades apagadas.',
      },
      {
        rank: '10',
        title: 'Helicóptero de Carga no Heliponto',
        artGlyph: '🚁',
        artSubtitle: 'Chave na Ignição e Tanque pela Metade',
        topWatcherTrigger:
          'Ao olhar para o céu aberto ou ouvir o som de avião/helicóptero/vento forte.',
        topWatcherEvent:
          'O plano de fuga definitivo está no topo do edifício corporativo, mas o rotor precisa de um reparo hidráulico rápido.',
        bottomEchoPrompt:
          'Descreva em três passos rápidos como você segura a ameaça e liga o helicóptero.',
        bottomEchoEffect:
          'Clímax de ♦: Desvira as Damas (Q) dos dois jogadores e garante fuga limpa da cena!',
        dailyIdea: 'Pode ser abastecer o carro, comprar uma passagem ou deixar tudo pronto para uma viagem.',
        flavorText: 'Quando as hélices girarem, toda a zona sul vai olhar para cima.',
      },
    ],
    clubs: [
      {
        rank: 'A',
        title: 'Esporos Negros no Subsolo',
        artGlyph: '🍄',
        artSubtitle: 'Poeira Bioluminescente no Ar',
        topWatcherTrigger:
          'Ao ver poeira no feixe de luz, mofo, umidade ou entrar num lugar fechado.',
        topWatcherEvent:
          'A cepa fúngica do vírus tomou as paredes da estação. Respirar fundo sem máscara provoca visões da mente coletiva.',
        bottomEchoPrompt:
          'Prenda a respiração por três segundos, como quem atravessa a nuvem de esporos.',
        bottomEchoEffect:
          'Rei de ♣ Paus atravessa sem custo. Outros naipes devem virar a Dama (Q ⟳) ou revelar o Valete (J).',
        dailyIdea: 'Pode ser uma garagem no subsolo, um cheiro de mofo ou um armário que ninguém abre há tempos.',
        flavorText: 'O vírus não quer apenas matar o hospedeiro; ele quer reescrever a floresta dentro dos pulmões.',
      },
      {
        rank: '2',
        title: 'Sussurros no Rádio Desligado',
        artGlyph: '📻',
        artSubtitle: 'Vozes na Frequência Morta',
        topWatcherTrigger:
          'Ao notar um aparelho eletrônico em standby, chiado ou notificação inesperada.',
        topWatcherEvent:
          'Mesmo sem pilha, o comunicador sobre a mesa transmite uma contagem regressiva sussurrada por dezenas de vozes.',
        bottomEchoPrompt:
          'Invente um código de três palavras que avise do perigo sem alertar os inimigos.',
        bottomEchoEffect:
          'Se o parceiro entender o plano, escapam ilesos; se não, vire a Dama (Q ⟳) ou revele o Valete (J).',
        dailyIdea: 'Pode ser um aparelho que liga sozinho, um áudio estranho ou um chiado no fone.',
        flavorText: 'Eles aprenderam a usar nossas próprias torres de repetição para chamar os que têm febre.',
      },
      {
        rank: '3',
        title: 'Camuflagem de Sangue e Cinza',
        artGlyph: '🎭',
        artSubtitle: 'Caminhando Entre os Mortos',
        topWatcherTrigger:
          'Ao passar no meio de várias pessoas ou ver uma rua movimentada.',
        topWatcherEvent:
          'Não há como contornar a avenida. Para atravessar o quarteirão, é preciso andar devagar e imitar o vazio da horda.',
        bottomEchoPrompt:
          'Fotografe sua sombra ou faça uma expressão séria por um instante, sem dizer nada.',
        bottomEchoEffect:
          'Vocês passam invisíveis! Se alguém quebrar o silêncio mandando texto longo, precisa virar a Dama (Q ⟳).',
        dailyIdea: 'Pode ser uma estação lotada, um evento onde você não conhece ninguém ou um dia de passar despercebido.',
        flavorText: 'Não respire rápido, não olhe nos olhos e deixe os ombros caírem como se o mundo já tivesse vencido.',
      },
      {
        rank: '4',
        title: 'Laboratório Clandestino do Paciente Zero',
        artGlyph: '🧪',
        artSubtitle: 'Gaiolas Abertas e Prontuários Queimados',
        topWatcherTrigger:
          'Ao ver garrafas de vidro, produtos de limpeza, cozinha ou telas de computador.',
        topWatcherEvent:
          'Esta é a sala onde o surto começou. Há uma gravação no computador mostrando que a mutação tinha um propósito.',
        bottomEchoPrompt:
          'Diga uma suspeita secreta do seu personagem sobre o que realmente está por trás deste perigo.',
        bottomEchoEffect:
          'Sangue-frio resolve a cena: se seu Rei for de ♣, você também desvira sua Dama (Q).',
        dailyIdea: 'Pode ser uma gaveta de papéis antigos, uma sala fechada no trabalho ou uma receita difícil de ler.',
        flavorText: 'No quadro branco, uma única frase escrita a marcador vermelho: "Eles não estão doentes, estão acordando".',
      },
      {
        rank: '5',
        title: 'O Rei dos Ratos no Esgoto',
        artGlyph: '🐀',
        artSubtitle: 'Ninho Biomassa sob o Asfalto',
        topWatcherTrigger:
          'Ao ver um bueiro na calçada, ralo, grelha de drenagem ou tubulação.',
        topWatcherEvent:
          'Algo imenso e fundido se move nas galerias pluviais sob os seus pés, fazendo o asfalto tremer levemente.',
        bottomEchoPrompt:
          'Fotografe o chão onde você está pisando e diga para que lado você correria.',
        bottomEchoEffect:
          'Se responder rápido, vocês saem do raio de alcance. Se demorar, vire a Dama (Q ⟳) ou revele o Valete (J).',
        dailyIdea: 'Pode ser um bueiro no caminho, um barulho no forro ou o lixo que precisa sair hoje.',
        flavorText: 'Quando mil famintos dividem o mesmo túnel estreito, a carne esquece onde termina um e começa o outro.',
      },
      {
        rank: '6',
        title: 'Marca de Mão Ensanguentada na Porta',
        artGlyph: '🖐️',
        artSubtitle: 'Aviso da Ceita dos Infectados',
        topWatcherTrigger:
          'Ao tocar numa maçaneta, corrimão, interruptor ou porta de entrada.',
        topWatcherEvent:
          'Um grupo de sobreviventes fanáticos que adoram a horda marcou a porta do esconderijo com tinta fosforescente.',
        bottomEchoPrompt:
          'Diga como você apaga seus rastros ou que pista falsa deixa para trás.',
        bottomEchoEffect:
          'Despista o perigo com sucesso! Se você estiver com o Valete (J) aberto, precisa virar sua Dama (Q ⟳) para não deixar vestígios.',
        dailyIdea: 'Pode ser um aviso colado na porta, uma marca na parede ou um recado do condomínio.',
        flavorText: 'Eles pintam os dentes de preto e abrem as trancas dos abrigos durante a madrugada.',
      },
      {
        rank: '7',
        title: 'Chuva Cinzenta de Cinzas Humanas',
        artGlyph: '🌧️',
        artSubtitle: 'Fuligem das Zonas Incineradas',
        topWatcherTrigger:
          'Ao olhar para as nuvens, sentir vento no rosto ou ver chuva/neblina.',
        topWatcherEvent:
          'O céu escurece ao meio-dia com a fuligem dos fornos da quarentena. Os infectados ficam agitados e mais velozes na penumbra.',
        bottomEchoPrompt:
          'Cubra a boca com a mão por um instante e descreva o ar em uma frase.',
        bottomEchoEffect:
          'Evita a contaminação e resolve a cena. Se seu Rei for de ♣ Paus, você também desvira a Dama (Q) do parceiro.',
        dailyIdea: 'Pode ser um dia nublado, poeira na janela ou um céu fechado no fim da tarde.',
        flavorText: 'A neve que cai em novembro não derrete na língua; ela tem gosto de ferro e despedida.',
      },
      {
        rank: '8',
        title: 'Espelho Trincado no Banheiro do Posto',
        artGlyph: '🪞',
        artSubtitle: 'Quem Está Atrás de Você?',
        topWatcherTrigger:
          'Ao ver seu reflexo num espelho, vidro escuro, janela ou tela desligada.',
        topWatcherEvent:
          'Ao lavar o rosto, você percebe pelo reflexo trincado que uma figura parada no canto do banheiro não estava morta de verdade.',
        bottomEchoPrompt:
          'Sem olhar para trás, diga em voz alta ou por escrito: "Saia daí agora!".',
        bottomEchoEffect:
          'Reflexo rápido salva o Vigia sem custo! Se demorar a responder, vire a Dama (Q ⟳) ou revele o Valete (J).',
        dailyIdea: 'Pode ser o banheiro de um restaurante, o espelho do elevador ou a pia antes de dormir.',
        flavorText: 'Os mais perigosos são os que ficam imóveis por dias esperando alguém abaixar a guarda.',
      },
      {
        rank: '9',
        title: 'Mutação Alfa: O Colosso da Avenida',
        artGlyph: '☣️',
        artSubtitle: 'Armadura de Ossos Calcificados',
        topWatcherTrigger:
          'Ao ouvir um barulho pesado (caminhão, obra, trovão, porta batendo forte).',
        topWatcherEvent:
          'Uma variante blindada do vírus derruba um poste de luz inteiro bloqueando a rua. Balas comuns ricocheteiam nele.',
        bottomEchoPrompt:
          'Imagine e descreva uma armadilha fictícia para deter o colosso, sem usar objetos reais.',
        bottomEchoEffect:
          'Exige virar a Dama (Q ⟳) de um dos jogadores (ou ter Rei de ♠ ou ♣) para vencer sem revelar o Valete (J).',
        dailyIdea: 'Pode ser um caminhão no trânsito, uma obra enorme no caminho ou um problema maior do que parece.',
        flavorText: 'A evolução levou milhões de anos para nos erguer, e seis semanas para criar nosso substituto.',
      },
      {
        rank: '10',
        title: 'A Catedral Silenciosa da Mente Colmeia',
        artGlyph: '⛪',
        artSubtitle: 'Canto Coral de Mil Gargantas Roucas',
        topWatcherTrigger:
          'Ao entrar num prédio amplo, ouvir música distante ou notar um silêncio súbito.',
        topWatcherEvent:
          'Milhares de infectados estão parados em círculo perfeito dentro da catedral destelhada, olhando para uma flor que cresce no altar.',
        bottomEchoPrompt:
          'Diga se você guarda a prova do segredo da infecção ou queima tudo.',
        bottomEchoEffect:
          'Clímax de ♣: Revela a verdade da Zona de Quarentena e vira para baixo (cura) qualquer Valete (J) ativo!',
        dailyIdea: 'Pode ser um lugar cheio e calado, uma biblioteca ou a noite em que a casa toda já dorme.',
        flavorText: 'Não era o fim da vida na Terra; era o nascimento doloroso de outra coisa.',
      },
    ],
  },
  jokers: {
    light: {
      title: 'Comboio de Evacuação da ONU',
      artGlyph: '🕊️',
      artSubtitle: 'Sinalizador Verde no Céu Noturno',
      topWatcherTrigger:
        'Ao ver uma luz verde (semáforo, LED, placa de saída) ou um pássaro voando.',
      topWatcherEvent:
        'Um foguete sinalizador verde corta o céu! Uma zona segura flutuante no porto abriu corredor humanitário por uma hora.',
      bottomEchoPrompt:
        'Celebre: diga ou escreva o que você levou da velha vida até o píer.',
      bottomEchoEffect:
        'Presságio Claro (★): Ambos os jogadores desviram suas Damas (Q) e ocultam seus Valetes (J) imediatamente!',
      flavorText: 'O navio-hospital apitou três vezes na baía. Pela primeira vez em meses, o mar parecia infinito.',
    },
    dark: {
      title: 'Bombardeio Termobárico ("Protocolo Tabula Rasa")',
      artGlyph: '☢️',
      artSubtitle: 'Contagem Regressiva dos Caças no Radar',
      topWatcherTrigger:
        'Ao ouvir um avião passando no céu, um estrondo ou ver o pôr do sol vermelho.',
      topWatcherEvent:
        'O alto comando desistiu da cidade. Sirenes de ataque aéreo anunciam a incineração total da Zona de Quarentena em minutos.',
      bottomEchoPrompt:
        'Diga, em voz alta ou por escrito, o que você aceitaria perder para trancar a comporta do bunker.',
      bottomEchoEffect:
        'Cataclismo (💀): Um dos jogadores deve virar sua Dama (Q ⟳) E revelar seu Valete (J) para salvar o parceiro da onda de choque.',
      flavorText: 'Quando o horizonte inteiro virou ouro incandescente, seguramos a porta do abrigo até o aço derreter.',
    },
  },
};

export const ZOMBIES_DECK: ThemeDeck = buildThemeDeck(ZOMBIES_BLUEPRINT);
