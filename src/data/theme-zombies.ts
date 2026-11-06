import { buildThemeDeck, type ThemeBlueprint } from './engine-deck';
import type { ThemeDeck } from '../types/card';

export const ZOMBIES_BLUEPRINT: ThemeBlueprint = {
  id: 'zombies',
  name: 'Zona de Quarentena',
  subtitle: 'Apocalipse Zumbi — Sobrevivência Urbana',
  tagline: 'Cada ruído na rua pode atrair a horda. Cada silêncio esconde uma mordida.',
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
          'Recarga (Untap): Desvire ao cumprir um desafio de ♦ Ouros ou ao encontrar o parceiro pessoalmente.',
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
          'Recarga (Untap): Desvire ao cumprir um desafio de ♦ Ouros ou quando dividirem uma refeição ou bebida real.',
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
          'Recarga (Untap): Desvire ao abrir uma porta trancada, encontrar um suprimento de ♦ Ouros ou reencontrar o parceiro.',
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
          'Recarga (Untap): Desvire ao concluir um desafio de ♦ Ouros ou permanecer em silêncio absoluto com o parceiro por um minuto.',
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
          'Mande uma foto do ponto mais protegido ou elevado onde você está agora e diga como vai trancar a entrada.',
        bottomEchoEffect:
          'Sucesso se responder em menos de 10 minutos (ou se for ♠). Caso contrário, vire sua Dama (Q ⟳) para conter a porta.',
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
          'Envie um áudio sussurrando uma instrução tática curta sem fazer nenhum barulho de fundo.',
        bottomEchoEffect:
          'Se o áudio tiver ruído alto ou hesitação, revele seu Valete (J). Se for ♠ ou ♣, você passa invisível.',
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
          'Descreva ou fotografe o veículo ou obstáculo mais próximo que serviria de escudo para vocês dois.',
        bottomEchoEffect:
          'Gaste a ativação da Dama (Q ⟳) para desligar a bateria sem ser visto, ou faça um teste de ♠ explicando seu golpe.',
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
          'Um sobrevivente hostil controla o cruzamento com um rifle de caça e exige pedágio para deixar vocês passarem.',
        bottomEchoPrompt:
          'Aponte para o parceiro qual objeto você deixaria cair como isca para distrair a mira do atirador.',
        bottomEchoEffect:
          'Jogadores de ♠ ou ♦ cruzam sem perdas. Outros naipes precisam virar a Dama (Q ⟳) ou aceitar o Valete (J).',
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
          'Mande uma mensagem rápida dizendo qual móvel ou estrutura perto de você usaria para escorar o portão agora.',
        bottomEchoEffect:
          'Se ambos responderem coordenados no turno, a grade aguenta. Se demorar, o Vigia vira sua Dama (Q ⟳).',
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
          'O posto avançado para onde vocês caminhavam foi marcado com o símbolo de "Bio-Perigo Total — Fogo Artilheiro".',
        bottomEchoPrompt:
          'Escolha uma direção nova (Norte, Sul, Leste ou Oeste) ou uma rua real próxima e convosque o parceiro para mudar a rota.',
        bottomEchoEffect:
          'Muda a rota com segurança. Se o Eco tiver Valete (J) ativo, a caminhada extra exige virar a Dama (Q ⟳).',
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
          'Diga em uma frase curta se você ataca primeiro no escuro ou se tranca a escotilha deixando o que quer que seja lá embaixo.',
        bottomEchoEffect:
          'Se escolher atacar (vantagem para ♠), resolva na coragem; se trancar, o próximo turno começa sob tensão dobrada.',
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
          'Faça uma pausa física de 15 segundos onde estiver, segure algo firme e mande o sinal: "Destravei, pula agora!".',
        bottomEchoEffect:
          'Libera a passagem para a dupla. Se for de ♠ Espadas, você também recupera o fôlego do parceiro.',
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
          'Fotografe uma sombra ou canto escondido onde vocês dois caberiam agachados até o caminhão passar.',
        bottomEchoEffect:
          'Exige discrição total: se algum jogador estiver com Valete (J) ativo, deve virar a Dama (Q ⟳) para não tossir na fumaça.',
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
          'Centenas de infectados cercam a base da antena enquanto vocês tentam enviar o sinal de resgate para o helicóptero.',
        bottomEchoPrompt:
          'Grave um áudio de 10 segundos como se fosse sua transmissão final de resistência pelo rádio para o parceiro.',
        bottomEchoEffect:
          'Clímax de ♠: Se sua Dama (Q) estiver de pé, vire-a (⟳) para garantir extração heroica; senão, teste sua lealdade.',
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
          'O arranhão no ombro do seu parceiro parece inflamado. Vocês precisam conferir se o vírus entrou na corrente sanguínea.',
        bottomEchoPrompt:
          'Mostre a palma da mão ou o pulso em uma foto (ou descreva sua pulsação agora) provando que você ainda está limpo.',
        bottomEchoEffect:
          'Se o Eco tiver um Valete (J) ativo, um jogador de ♥ Copas pode limpá-lo agora virando sua Dama (Q ⟳).',
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
          'A chuva ácida lá fora dá uma trégua. Pela primeira vez em três dias vocês conseguem secar as botas em segurança.',
        bottomEchoPrompt:
          'Conte ao parceiro uma lembrança real boa de antes da "quarentena" que mantém seu personagem lutando.',
        bottomEchoEffect:
          'Restaura a esperança: se algum dos dois estava com Valete (J) ativo, o fardo do tabu é suspenso pelo próximo turno.',
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
          'Uma sobrevivente mirim está encurralada no depósito de alimentos, mas resgatá-la vai atrasar a fuga da dupla.',
        bottomEchoPrompt:
          'Diga imediatamente o que você entrega das suas mãos ou mesa para acalmar a criança sem fazer barulho.',
        bottomEchoEffect:
          'Se ajudar (padrão ♥), vire sua Dama (Q ⟳) ou assuma o risco; se recusar ajudar, revele seu Valete (J) imediatamente.',
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
          'Estilhaços da última corrida cortaram o braço de um de vocês. O cheiro de sangue fresco viaja rápido pelo vento.',
        bottomEchoPrompt:
          'Descreva a cor da peça de roupa que você está usando agora e que rasgaria para fazer o torniquete do parceiro.',
        bottomEchoEffect:
          'Cura ferimentos leves. Se o Eco for ♥ Copas, não há penalidade; outros naipes precisam confirmar o cuidado em 5 min.',
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
          'Vocês encontram uma mala postal caída com dezenas de cartas escritas no dia em que os telefones pararam.',
        bottomEchoPrompt:
          'Escreva uma frase de duas linhas que seu personagem deixaria escrita na parede do abrigo caso não voltasse hoje.',
        bottomEchoEffect:
          'Fortalece o vínculo da dupla: no próximo turno, o Vigia pode escolher sacar do Topo ou do Fundo.',
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
          'Beba um gole de água agora na vida real e mande uma mensagem cedendo a metade restante da garrafa ao parceiro.',
        bottomEchoEffect:
          'Se ambos beberem água e confirmarem, qualquer Valete (J) de febre ou exaustão perde o efeito neste turno.',
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
          'A privação de sono faz um de vocês jurar que viu um antigo amigo caminhando no meio da horda lá embaixo.',
        bottomEchoPrompt:
          'Chame o parceiro pelo nome e faça uma pergunta simples de ancoragem ("Onde você está sentado agora?") para trazê-lo de volta.',
        bottomEchoEffect:
          'Ancora a mente. Se o Eco demorar a responder, a ilusão cobra seu preço e ativa o Valete (J).',
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
          'Vocês encontram o túmulo improvisado do antigo líder do abrigo, junto com o caderno de anotações médicas dele.',
        bottomEchoPrompt:
          'Mande a foto de uma folha, planta ou pedaço de natureza próximo como tributo aos que caíram.',
        bottomEchoEffect:
          'Jogadores de ♥ Copas desviram sua Dama (Q) ao honrar a memória; outros ganham imunidade a pânico neste turno.',
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
          'Encurralados no vagão de metrô, vocês precisam renovar a promessa mais dura do apocalipse: não deixar o outro virar um deles.',
        bottomEchoPrompt:
          'Envie uma mensagem curta cravando a promessa do seu personagem: qual é o sinal secreto para saber que você ainda é você?',
        bottomEchoEffect:
          'Cria um escudo emocional: na próxima vez que um Valete (J) causaria Ruptura, o parceiro pode virar a Dama (Q ⟳) para salvá-lo.',
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
          'Vocês alcançam o centro cirúrgico intacto da Cruz Vermelha, mas as portas magnéticas vão travar em três minutos.',
        bottomEchoPrompt:
          'Diga qual suprimento vital você salva primeiro (antibióticos, plasma ou o dossiê da cura) e por quê.',
        bottomEchoEffect:
          'Clímax de ♥: Remove completamente a Cicatriz do Valete (J) de ambos os jogadores se cumprirem a cena.',
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
          'Envie os 3 últimos dígitos do horário ou da bateria do seu celular agora para destravar o cofre.',
        bottomEchoEffect:
          'Sucesso de ♦ Ouros! Ambos os jogadores podem desvirar suas Damas (Q) imediatamente.',
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
          'Fotografe qualquer cabo, tomada, carregador ou interruptor perto de você para "reconectar a força".',
        bottomEchoEffect:
          'Desvira a Dama (Q) do jogador Eco. Se falhar ou ignorar, o turno seguinte começa no escuro (sem sinergia de naipe).',
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
          'Diga qual ferramenta ou objeto longo do seu ambiente você usaria como vara para puxar a carga sem subir.',
        bottomEchoEffect:
          'Recupera o suprimento e desvira sua Dama (Q). Jogadores de ♦ ganham direito de espiar a próxima carta.',
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
          'Mande uma mensagem descrevendo o som metálico do duto e confirme que você passou a bolsa para o parceiro.',
        bottomEchoEffect:
          'Evita qualquer combate neste turno e recarrega (Untap) a Dama (Q) se você for de ♦ Ouros.',
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
          'Tire foto ou descreva o objeto mais curioso na sua mesa/bolso agora e diga pelo que você o trocaria.',
        bottomEchoEffect:
          'O negócio é fechado: desvire uma Dama (Q) virada de qualquer um dos dois jogadores.',
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
          'Caminhe cinco passos em linha reta onde você estiver agora e avise o parceiro que chegou ao outro lado.',
        bottomEchoEffect:
          'A travessia recarrega a Dama (Q) do Vigia. Se algum jogador tiver Valete (J) ativo, precisa do apoio do outro.',
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
          'Vocês encontram uma garagem trancada por dentro com prensas manuais, ferramentas intactas e lanternas táticas.',
        bottomEchoPrompt:
          'Escolha melhorar o equipamento de ataque (♠) ou o kit médico (♥) da dupla e avise o parceiro.',
        bottomEchoEffect:
          'Desvira a Dama (Q) de ambos os jogadores! A oficina garante fôlego total para o próximo arco.',
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
          'Bata duas vezes na mesa (ou mande dois emojis de martelo/chave) no mesmo minuto que o parceiro responder.',
        bottomEchoEffect:
          'Vocês abrem o lacre e fogem antes da horda chegar: desvire sua Dama (Q) e remova penalidades leves.',
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
          'Diga em quantos por cento está a bateria do seu aparelho agora: se estiver acima de 30%, você transfere carga para a base.',
        bottomEchoEffect:
          'Se >30% (ou se for ♦ Ouros), desvira sua Dama (Q) e limpa um Valete (J). Se <30%, apenas recarrega a Dama.',
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
          'Vocês descobrem o plano de fuga definitivo no topo do edifício corporativo, mas o rotor precisa de um reparo hidráulico rápido.',
        bottomEchoPrompt:
          'Descreva em três passos rápidos como sua dupla divide a tarefa entre segurar a porta do terraço e dar a partida.',
        bottomEchoEffect:
          'Clímax de ♦: Desvira todas as Damas (Q) e garante rota de fuga limpa para o final da crônica.',
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
          'Prenda a respiração por 5 segundos antes de enviar um áudio curto dizendo o que você viu na escuridão.',
        bottomEchoEffect:
          'Jogadores de ♣ Paus absorvem a visão sem dano. Outros devem virar a Dama (Q ⟳) ou ativar o Valete (J).',
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
          'Envie uma mensagem contendo um código misterioso de três palavras que só seu parceiro entenderia.',
        bottomEchoEffect:
          'Se o parceiro decifrar o sentido, vocês evitam a armadilha psíquica; se não, o Valete (J) desperta.',
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
          'Não há como contornar a avenida. Para atravessar o quarteirão, vocês precisam andar devagar e imitar o vazio da horda.',
        bottomEchoPrompt:
          'Mande uma foto com o rosto neutro/sério ou da sua sombra no chão, sem nenhuma palavra, apenas o ícone ♣.',
        bottomEchoEffect:
          'Vocês atravessam a multidão ilesos. Se alguém quebrar o silêncio com texto longo, vira a Dama (Q ⟳).',
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
          'Vocês encontram a sala onde o surto começou. Há uma gravação no computador mostrando que a mutação tinha um propósito.',
        bottomEchoPrompt:
          'Revele ao parceiro uma suspeita secreta do seu personagem sobre a origem da infecção.',
        bottomEchoEffect:
          'Conhecimento proibido: jogadores de ♣ podem desvirar sua Dama (Q); outros sentem o calafrio da verdade.',
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
          'Fotografe o chão onde você está pisando agora e avise o parceiro para não parar de se mover.',
        bottomEchoEffect:
          'Se responder rápido, vocês saem do raio de alcance. Se demorar, vire a Dama (Q ⟳) para escapar do puxão.',
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
          'Um grupo de sobreviventes fanáticos que adoram a horda marcou a porta do esconderijo de vocês com tinta fosforescente.',
        bottomEchoPrompt:
          'Diga como você apaga a marca ou que símbolo falso desenha por cima para enganar os cultistas.',
        bottomEchoEffect:
          'Anula a invasão noturna. Se o Eco tiver Valete (J) ativo, a tensão exige ajuda do Vigia.',
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
          'Cubra a boca/nariz com a gola ou mão por um instante e mande uma mensagem curta descrevendo o cheiro do ar.',
        bottomEchoEffect:
          'Evita a contaminação aérea. Se for ♣ Paus, seus sentidos ficam aguçados e você protege a dupla.',
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
          'Sem olhar para trás onde você está agora, mande uma mensagem instantânea dizendo: "Saia daí agora!".',
        bottomEchoEffect:
          'Reflexo rápido salva o Vigia! Caso contrário, vire a Dama (Q ⟳) ou receba a Cicatriz do Valete (J).',
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
          'Combine com o parceiro uma armadilha usando eletricidade, fogo ou queda livre usando elementos do ambiente de vocês.',
        bottomEchoEffect:
          'Exige virar uma Dama (Q ⟳) de qualquer jogador (ou ser Rei de ♠/♣) para abater o Alfa sem sofrer Valete (J).',
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
          'Envie um áudio ou texto poético descrevendo se vocês colhem a amostra genética do altar ou se deixam o santuário em paz.',
        bottomEchoEffect:
          'Clímax de ♣: Revela o segredo final da Zona de Quarentena e purifica qualquer Valete (J) ativo.',
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
        'Celebre com o parceiro: mandem juntos uma mensagem confirmando que alcançaram o píer e o que levaram da velha vida.',
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
        'Decisão imediata de sacrifício: um de vocês precisa trancar a comporta do bunker pelo lado de fora ou gastar seu último recurso.',
      bottomEchoEffect:
        'Cataclismo (💀): Um dos jogadores deve virar sua Dama (Q ⟳) E revelar seu Valete (J) para salvar o parceiro da onda de choque.',
      flavorText: 'Quando o horizonte inteiro virou ouro incandescente, seguramos a porta do abrigo até o aço derreter.',
    },
  },
};

export const ZOMBIES_DECK: ThemeDeck = buildThemeDeck(ZOMBIES_BLUEPRINT);
