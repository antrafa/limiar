import { buildThemeDeck, type ThemeBlueprint } from './engine-deck';
import type { ThemeDeck } from '../types/card';

export const VAMPIRES_BLUEPRINT: ThemeBlueprint = {
  id: 'vampires',
  name: 'Sangue & Néon',
  subtitle: 'Vampiros — Crônica da Noite Eterna',
  tagline: 'Sob os letreiros de néon, pactos antigos cobram seu preço em sangue e segredos.',
  tom: 'horror urbano, gótico',
  chefe: {
    nome: 'O Antediluviano',
    descricao: 'O ancião desperto que bebe cidades inteiras numa única noite.',
  },
  accentColor: '#e11d48',
  secondaryColor: '#9333ea',
  suits: {
    spades: {
      suit: 'spades',
      symbol: '♠',
      namePt: 'Espadas',
      vocationName: 'Lâmina & Inquisição',
      colorHex: '#cbd5e1',
    },
    hearts: {
      suit: 'hearts',
      symbol: '♥',
      namePt: 'Copas',
      vocationName: 'Sedução & Elísio',
      colorHex: '#e11d48',
    },
    diamonds: {
      suit: 'diamonds',
      symbol: '♦',
      namePt: 'Ouros',
      vocationName: 'Pactos & Vitae',
      colorHex: '#eab308',
    },
    clubs: {
      suit: 'clubs',
      symbol: '♣',
      namePt: 'Paus',
      vocationName: 'Abismo & Nosferatu',
      colorHex: '#a855f7',
    },
  },
  figures: {
    spades: {
      king: {
        title: 'O Carrasco da Corte',
        artGlyph: '⚔️',
        artSubtitle: 'Xerife Imortal do Domínio',
        passive:
          'Passiva na Vida Real: Mantenha postura impecável e nunca peça desculpas por chegar ou falar; você fala em nome da Lei da Noite.',
        synergy:
          'Sinergia (♠): Ao sacar uma carta de Espadas, você elimina caçadores ou rivais sem precisar virar sua Dama (Q).',
        flavorText: 'A Tradição da Máscara não é um pedido; é a linha que separa sua garganta do sol.',
      },
      queen: {
        title: 'Lâmina de Prata Consagrada',
        artGlyph: '🗡️',
        artSubtitle: 'Relíquia Roubada de um Caçador',
        tapEffect:
          'Virar (⟳ Tap): Anule um ataque da Segunda Inquisição ou vença um duelo de honra instantaneamente em favor da dupla.',
        rechargeRule:
          'Recarga (Untap): Desvire ao cumprir qualquer carta do naipe de ♦ Ouros (A♦ a 10♦) ou ao encontrar seu parceiro pessoalmente.',
        flavorText: 'Queima a mão de quem a empunha, mas reduz um ancião a cinzas antes que ele pronuncie uma maldição.',
      },
      jack: {
        title: 'Marca de Caçado',
        artGlyph: '✝️',
        artSubtitle: 'Dossiê Vermelho nas Mãos do Vaticano',
        entryTrigger:
          'Gatilho de Entrada: Revele quando quebrar a Máscara em público ou falhar num confronto de ♠ Espadas.',
        realLifeTaboo:
          'Tabu na Vida Real: Você não pode enviar fotos do seu próprio rosto nem mencionar o nome exato do bairro ou prédio onde está.',
        flavorText: 'As câmeras térmicas da cidade aprenderam que você não tem temperatura corporal.',
      },
    },
    hearts: {
      king: {
        title: 'A Musa do Elísio',
        artGlyph: '🍷',
        artSubtitle: 'Soberana dos Salões de Veludo',
        passive:
          'Passiva na Vida Real: Faça pelo menos um elogio hipnótico ou comentário elegante e poético em cada interação do turno.',
        synergy:
          'Sinergia (♥): Ao sacar Copas, mortais obedecem ao seu fascínio e você pode acalmar a Fera (Valete J) do parceiro.',
        flavorText: 'Eles oferecem o pescoço sorrindo e ainda agradecem pelo privilégio da vertigem.',
      },
      queen: {
        title: 'Olhar Hipnótico',
        artGlyph: '👁️',
        artSubtitle: 'Domínio da Presença Soberana',
        tapEffect:
          'Virar (⟳ Tap): Apague a memória de qualquer testemunha mortal ou converta uma falha social em um favor devoto.',
        rechargeRule:
          'Recarga (Untap): Desvire ao cumprir qualquer carta do naipe de ♦ Ouros (A♦ a 10♦) ou quando brindarem com uma bebida vermelha ou escura.',
        flavorText: 'Olhe para a chama do meu isqueiro. Quando ela apagar, você nunca esteve neste beco.',
      },
      jack: {
        title: 'Sede Rubra',
        artGlyph: '🩸',
        artSubtitle: 'A Fera Arranhando por Dentro',
        entryTrigger:
          'Gatilho de Entrada: Revele quando recusar alimentar-se ou falhar num teste de autocontrole de ♥ Copas.',
        realLifeTaboo:
          'Tabu na Vida Real: Em todas as mensagens, você deve usar pelo menos uma palavra ligada a sangue, pulso, sede, rubi, calor ou veia.',
        flavorText: 'A música da boate desaparece; tudo o que resta é o tambor arterial de duzentas gargantas dançando.',
      },
    },
    diamonds: {
      king: {
        title: 'O Mercador de Memórias',
        artGlyph: '⚖️',
        artSubtitle: 'Banqueiro das Dívidas de Vitae',
        passive:
          'Passiva na Vida Real: Trate cada favor, informação ou resposta como uma transação valiosa registrada num livro invisível.',
        synergy:
          'Sinergia (♦): Ao sacar Ouros, você desvira sua Dama (Q) e também pode recarregar a Dama do seu parceiro.',
        flavorText: 'O ouro perde valor a cada crise; um segredo da década de 1920 compra um senador inteiro.',
      },
      queen: {
        title: 'Frasco de Vitae Antigo',
        artGlyph: '🧪',
        artSubtitle: 'Sangue de Quinta Geração Lacrado em Cera',
        tapEffect:
          'Virar (⟳ Tap): Beba o selo ancestral para curar instantaneamente um Valete (J) ativo ou realizar uma façanha sobrenatural.',
        rechargeRule:
          'Recarga (Untap): Desvire ao cumprir qualquer carta do naipe de ♦ Ouros (A♦ a 10♦) ou ao entregar/receber um objeto real nas mãos do parceiro.',
        flavorText: 'Denso como licor de romã, guardado desde a queda de Constantinopla.',
      },
      jack: {
        title: 'Dívida de Sangue',
        artGlyph: '📜',
        artSubtitle: 'Promissória Assinada ao Príncipe',
        entryTrigger:
          'Gatilho de Entrada: Revele ao falhar numa carta de ♦ Ouros ou pedir socorro à Corte para escapar de um perigo.',
        realLifeTaboo:
          'Tabu na Vida Real: Você não pode dizer "não" diretamente a nenhum pedido do parceiro até que esta cicatriz seja limpa.',
        flavorText: 'Na sociedade dos imortais, um favor não pago cobra juros na própria carne.',
      },
    },
    clubs: {
      king: {
        title: 'O Oráculo Nosferatu',
        artGlyph: '🦇',
        artSubtitle: 'Tecelão da Rede Subterrânea',
        passive:
          'Passiva na Vida Real: Repare nos detalhes que ninguém vê (fios, câmeras, sombras, conversas paralelas) e comente sobre eles.',
        synergy:
          'Sinergia (♣): Ao sacar Paus, você se funde às sombras e resolve qualquer emboscada ou mistério oculto automaticamente.',
        flavorText: 'Vocês reinam nas coberturas de vidro; nós somos donos dos cabos de fibra óptica sob os seus pés.',
      },
      queen: {
        title: 'Manto de Sombras',
        artGlyph: '🌑',
        artSubtitle: 'Ofuscação e Passo Abissal',
        tapEffect:
          'Virar (⟳ Tap): Torne a dupla completamente invisível a olhos mortais, câmeras e feitiços de rastreamento por toda a cena.',
        rechargeRule:
          'Recarga (Untap): Desvire ao cumprir qualquer carta do naipe de ♦ Ouros (A♦ a 10♦) ou enviar uma mensagem a partir de um ambiente totalmente à meia-luz.',
        flavorText: 'A sombra não é a ausência de luz; é uma porta que só abre para quem perdeu o reflexo.',
      },
      jack: {
        title: 'Vozes do Abismo',
        artGlyph: '🕸️',
        artSubtitle: 'Ecos da Loucura Malkaviana',
        entryTrigger:
          'Gatilho de Entrada: Revele ao encarar o oculto sem preparo em ♣ Paus ou ao puxar o Coringa Escuro.',
        realLifeTaboo:
          'Tabu na Vida Real: Suas respostas devem incluir uma metáfora enigmática ou profecia sobre o que vai acontecer mais tarde.',
        flavorText: 'O espelho falou comigo ontem à noite e disse que você já morreu há três invernos.',
      },
    },
  },
  journeys: {
    spades: [
      {
        rank: 'A',
        title: 'Emboscada da Segunda Inquisição',
        artGlyph: '🔥',
        artSubtitle: 'Lasers Verdes na Chuva Noturna',
        topWatcherTrigger:
          'Ao ver uma viatura, carro preto, câmera de segurança ou guarda.',
        topWatcherEvent:
          'Agentes caçadores com munição incendiária fecharam as duas pontes do quarteirão procurando por assinaturas térmicas frias.',
        bottomEchoPrompt:
          'Fotografe ou aponte uma saída discreta, escada ou porta lateral perto de você.',
        bottomEchoEffect:
          'Se for ♠ Espadas, você abate os batedores. Outros naipes devem virar a Dama (Q ⟳) ou assumir a Marca (Valete J).',
        dailyIdea: 'Pode ser uma cobrança inesperada, mensagens chegando à noite ou uma pergunta difícil numa reunião.',
        flavorText: 'Eles não carregam cruzes de madeira; carregam rifles de fósforo branco e drones militares.',
      },
      {
        rank: '2',
        title: 'Duelo de Sangue no Terraço Molhado',
        artGlyph: '⚔️',
        artSubtitle: 'Honra Cobrada ao Luar',
        topWatcherTrigger:
          'Ao ver o reflexo da água no chão, uma varanda ou um objeto metálico afiado (faca, chave, tesoura).',
        topWatcherEvent:
          'Um ancilla rival da corte exige o direito de caça no território central da cidade.',
        bottomEchoPrompt:
          'Segure uma chave ou colher e descreva a sua guarda diante do rival.',
        bottomEchoEffect:
          'Vence o confronto e impõe respeito na Corte. Se hesitar ou demorar, vire sua Dama (Q ⟳).',
        dailyIdea: 'Pode ser uma discussão educada, uma negociação difícil ou uma partida de algum jogo.',
        flavorText: 'Entre imortais, a educação termina exatamente onde a lâmina toca a clavícula.',
      },
      {
        rank: '3',
        title: 'Quebra da Máscara na Avenida',
        artGlyph: '📱',
        artSubtitle: 'Vídeo Viralizando na Rede Mortal',
        topWatcherTrigger:
          'Ao ver alguém filmando com o celular ou tirando selfie perto de você.',
        topWatcherEvent:
          'Um mortal gravou um vampiro saltando do terceiro andar sem se ferir. O Xerife deu vinte minutos para sumirem com a prova.',
        bottomEchoPrompt:
          'Descreva, em uma frase, a versão falsa que você conta às testemunhas para salvar a Máscara.',
        bottomEchoEffect:
          'Apaga qualquer rastro mortal! Se falhar, revele seu Valete (J).',
        dailyIdea: 'Pode ser uma mensagem enviada por engano, um vídeo que circula ou um segredo prestes a escapar.',
        flavorText: 'No século XXI, o maior inimigo dos filhos de Caim tem câmera tripla e conexão 5G.',
      },
      {
        rank: '4',
        title: 'Carniçal Traidor no Refúgio',
        artGlyph: '🗡️',
        artSubtitle: 'Cortinas Abertas Antes da Aurora',
        topWatcherTrigger:
          'Ao ver uma cortina, persiana ou porta entreaberta deixando entrar claridade.',
        topWatcherEvent:
          'O servo mortal que guardava o refúgio diurno foi subornado por um clã rival e destrancou as janelas voltadas para o leste.',
        bottomEchoPrompt:
          'Feche uma cortina ou apague uma luz perto de você e diga como pune o carniçal traidor.',
        bottomEchoEffect:
          'Neutraliza a ameaça a tempo! Se seu Rei for de ♠ ou ♣, você também desvira sua Dama (Q).',
        dailyIdea: 'Pode ser a cortina aberta cedo demais, um despertador fora de hora ou um plano que vazou antes.',
        flavorText: 'Dar seu sangue a um mortal cria um escravo leal, até o dia em que a inveja supera o vício.',
      },
      {
        rank: '5',
        title: 'Cães de Guerra Lupinos no Parque',
        artGlyph: '🐺',
        artSubtitle: 'Uivo Selvagem Entre as Árvores Urbanas',
        topWatcherTrigger:
          'Ao passar perto de árvores densas, praça arborizada ou ouvir um latido feroz.',
        topWatcherEvent:
          'Metamorfos territoriais farejaram vitae vampírico nos limites da reserva ecológica e iniciaram uma caçada implacável.',
        bottomEchoPrompt:
          'Diga, com voz firme ou por escrito, a ordem de recuo para um lugar seguro.',
        bottomEchoEffect:
          'Se seu Rei for de ♠ Espadas, recuam sem custo; outros naipes devem virar a Dama (Q ⟳) ou revelar o Valete (J).',
        dailyIdea: 'Pode ser uma caminhada no parque, cachorros barulhentos na rua ou um treino puxado.',
        flavorText: 'Contra garras que rasgam blindagem, a única sabedoria de um vampiro é correr para o trânsito.',
      },
      {
        rank: '6',
        title: 'Julgamento Diante do Trono de Mármore',
        artGlyph: '👑',
        artSubtitle: 'Acusação Formal no Elísio',
        topWatcherTrigger:
          'Ao entrar num prédio imponente, recepção, banco ou sala de reunião.',
        topWatcherEvent:
          'A Harpia da corte acusa intrusos de invadir o domínio de um Primógeno durante a caçada da noite passada.',
        bottomEchoPrompt:
          'Escreva uma justificativa curta e elegante, de duas linhas, que culpe um clã rival.',
        bottomEchoEffect:
          'A manobra política funciona (se seu Rei for ♥ ou ♠, desvira sua Dama Q); se recusar, revele o Valete (J).',
        dailyIdea: 'Pode ser uma entrevista, uma avaliação de desempenho ou uma conversa séria com a chefia.',
        flavorText: 'Na corte de veludo, uma frase mal colocada corta mais fundo que uma guilhotina.',
      },
      {
        rank: '7',
        title: 'Barricada de Fogo na Ponte Velha',
        artGlyph: '🔥',
        artSubtitle: 'O Terror Vermelho de Rötschreck',
        topWatcherTrigger:
          'Ao ver uma chama real (isqueiro, fogão, vela) ou luz alaranjada intensa.',
        topWatcherEvent:
          'Anarquistas incendiaram carros na saída do clube subterrâneo. O pavor ancestral do fogo ameaça fazer a Fera assumir o controle.',
        bottomEchoPrompt:
          'Toque em algo frio, como vidro, pedra ou metal, e descreva a sensação em uma frase.',
        bottomEchoEffect:
          'Domina a Fera interior! Se você estiver com o Valete (J) aberto, precisa virar a Dama (Q ⟳) para manter o controle.',
        dailyIdea: 'Pode ser cozinhar com pressa, um medo que trava você ou uma ponte congestionada.',
        flavorText: 'Mesmo após trezentos anos, uma simples faísca lembra à carne morta que ela é feita de cinzas secas.',
      },
      {
        rank: '8',
        title: 'Caçada de Sangue Decretada',
        artGlyph: '🩸',
        artSubtitle: 'Sinal de Extermínio nos Telhados',
        topWatcherTrigger:
          'Ao ouvir sirenes distantes à noite ou ver luzes vermelhas de freio no trânsito.',
        topWatcherEvent:
          'Os sinos da meia-noite tocaram três vezes: uma Caçada de Sangue foi aberta contra um aliado próximo.',
        bottomEchoPrompt:
          'Decida em uma frase: você enfrenta a caçada de frente ou sacrifica um peão para escapar?',
        bottomEchoEffect:
          'Se enfrentar: Rei de ♠ ou ♥ vence sem custo; outros viram a Dama (Q ⟳). Se sacrificar um peão: escapam sem custo, mas na próxima falha revelam o Valete (J).',
        dailyIdea: 'Pode ser uma lista de tarefas atrasadas, uma cobrança em cima da hora ou a busca por algo perdido.',
        flavorText: 'Quando o Príncipe vira a ampulheta vermelha, toda a cidade ganha permissão para beber sua alma.',
      },
      {
        rank: '9',
        title: 'Invasão na Cobertura do Primógeno',
        artGlyph: '🏙️',
        artSubtitle: 'Vidros Blindados a Trinta Andares do Chão',
        topWatcherTrigger:
          'Ao olhar pela janela de um andar alto ou ver um edifício espelhado.',
        topWatcherEvent:
          'Para recuperar a relíquia roubada, é preciso invadir o ático vigiado por gárgulas e guardas armados.',
        bottomEchoPrompt:
          'Descreva, em uma frase, a distração que você cria antes de dar o bote.',
        bottomEchoEffect:
          'Ação sincronizada resolve a cena e vira para baixo (cura) um Valete (J) ativo!',
        dailyIdea: 'Pode ser um andar alto no trabalho, um elevador lotado ou uma reunião com quem decide.',
        flavorText: 'O vento no quadragésimo andar cheira a ozônio, champanhe caro e pólvora.',
      },
      {
        rank: '10',
        title: 'A Queda do Inquisidor-Mor',
        artGlyph: '⚜️',
        artSubtitle: 'Confronto Final na Catedral Gótica',
        topWatcherTrigger:
          'Ao ver uma igreja, cruz, vitral ou arquitetura antiga de pedra.',
        topWatcherEvent:
          'O comandante da célula de caçadores armou uma emboscada de luz ultravioleta no altar principal.',
        bottomEchoPrompt:
          'Diga ou escreva o golpe de mestre com que você derruba o Inquisidor-Mor.',
        bottomEchoEffect:
          'Clímax de ♠: Vitória épica! Desvira a Dama (Q) de ambos os jogadores.',
        dailyIdea: 'Pode ser a conversa decisiva da semana, uma prova final ou resolver de vez um problema antigo.',
        flavorText: 'Ele rezava pela alvorada, mas o relógio da torre ainda marcava três da manhã.',
      },
    ],
    hearts: [
      {
        rank: 'A',
        title: 'Valsa de Veludo no Elísio',
        artGlyph: '🥂',
        artSubtitle: 'Taças de Cristal com Sangue Aquecido',
        topWatcherTrigger:
          'Ao ouvir música ambiente, ver taças/copos de vidro ou luzes de festa.',
        topWatcherEvent:
          'Toda a aristocracia vampírica da cidade está reunida no salão subterrâneo do museu. Todos os olhares se voltam para a porta.',
        bottomEchoPrompt:
          'Descreva o traje de gala do seu personagem e faça um brinde à noite eterna.',
        bottomEchoEffect:
          'Encanta a corte: se for ♥ Copas, você desvira uma Dama (Q); qualquer Valete (J) fica suprimido durante o baile.',
        dailyIdea: 'Pode ser uma festa, um jantar arrumado ou um encontro com amigos depois do trabalho.',
        flavorText: 'Sorria mostrando apenas o suficiente das presas para que pensem ser charme.',
      },
      {
        rank: '2',
        title: 'O Beijo na Escada de Incêndio',
        artGlyph: '💋',
        artSubtitle: 'Êxtase e Vertigem sob o Néon Rosa',
        topWatcherTrigger:
          'Ao ver um letreiro luminoso, luz rosa/vermelha ou um beco silencioso.',
        topWatcherEvent:
          'A fome aperta no meio da noite. Um mortal solitário oferece o pulso nos fundos de um clube de jazz, hipnotizado pela sua presença.',
        bottomEchoPrompt:
          'Diga em que momento exato você para de beber para não tirar a vida do mortal.',
        bottomEchoEffect:
          'Sacia a sede e remove o Valete de Sede Rubra (J♥). Se exagerar na descrição, a Fera exige virar a Dama (Q ⟳).',
        dailyIdea: 'Pode ser um encontro romântico, um abraço demorado ou uma conversa na escada do prédio.',
        flavorText: 'O Beijo é a única mentira em que tanto o predador quanto a presa acreditam no paraíso.',
      },
      {
        rank: '3',
        title: 'Laço de Sangue a Três Goles',
        artGlyph: '🍷',
        artSubtitle: 'Devoção Eterna e Perigosa',
        topWatcherTrigger:
          'Ao tomar qualquer bebida (café, chá, vinho, suco) durante o seu turno.',
        topWatcherEvent:
          'Para selar a aliança contra o Príncipe, seus personagens compartilham vitae diretamente do pulso pela terceira noite.',
        bottomEchoPrompt:
          'Tome um gole da sua bebida e diga ou escreva um segredo que seu vampiro jamais admitiria.',
        bottomEchoEffect:
          'Laço formado: pelo resto da sessão, um jogador pode virar sua própria Dama (Q ⟳) para pagar custos no lugar do outro.',
        dailyIdea: 'Pode ser uma amizade antiga, alguém que depende de você ou uma promessa difícil de quebrar.',
        flavorText: 'No primeiro gole, respeito; no segundo, desejo; no terceiro, uma corrente que nem a morte quebra.',
      },
      {
        rank: '4',
        title: 'Galeria de Arte da Meia-Noite',
        artGlyph: '🖼️',
        artSubtitle: 'Retrato Pintado há Dois Séculos',
        topWatcherTrigger:
          'Ao ver um quadro, pôster, fotografia na parede ou escultura.',
        topWatcherEvent:
          'Na exposição privada, há uma pintura a óleo de 1840 retratando alguém idêntico a você.',
        bottomEchoPrompt:
          'Fotografe uma imagem/quadro perto de você (ou descreva a cena) e conte qual era o seu nome naquela vida passada.',
        bottomEchoEffect:
          'Desperta memórias humanas: cura 1 estado de Valete (J) se a resposta emocionar o parceiro.',
        dailyIdea: 'Pode ser uma exposição, um retrato antigo em casa ou a visita a um museu com alguém.',
        flavorText: 'A tinta craquela e amarela; nossos olhos continuam presos na mesma tempestade.',
      },
      {
        rank: '5',
        title: 'Sussurro da Harpia no Camarote',
        artGlyph: '🎭',
        artSubtitle: 'Veneno Social Entre Risadas',
        topWatcherTrigger:
          'Ao ouvir pessoas conversando baixo ou rindo perto de você.',
        topWatcherEvent:
          'Um boato malicioso sobre uma lealdade antiga está se espalhando pelos sofás de couro do clube.',
        bottomEchoPrompt:
          'Invente uma frase espirituosa que cale a harpia fofoqueira.',
        bottomEchoEffect:
          'Vence o duelo social! Jogadores de ♥ Copas ganham um favor da Corte (desvira a Dama Q).',
        dailyIdea: 'Pode ser uma fofoca no trabalho, uma conversa cheia de indiretas ou um comentário que incomoda.',
        flavorText: 'Uma estaca no coração apenas paralisa; o ridículo no Elísio destrói um clã inteiro.',
      },
      {
        rank: '6',
        title: 'Mortal da Vida Passada no Café',
        artGlyph: '☕',
        artSubtitle: 'Alguém que Envelheceu Enquanto Você Ficou',
        topWatcherTrigger:
          'Ao passar por uma cafeteria, restaurante iluminado ou ver alguém esperando na janela.',
        topWatcherEvent:
          'Através do vidro embaçado pela chuva, você vê um descendente ou antigo amor mortal da época em que você ainda respirava.',
        bottomEchoPrompt:
          'Diga se você observa das sombras em silêncio ou deixa um objeto anônimo na mesa antes de partir.',
        bottomEchoEffect:
          'Preserva a Humanidade da dupla. Impede que o próximo Valete (J) se ative automaticamente.',
        dailyIdea: 'Pode ser um café com alguém do passado, rever um colega antigo ou uma foto dos tempos de escola.',
        flavorText: 'Os cabelos dela ficaram brancos como a neve, mas o jeito de girar a colher na xícara é o mesmo.',
      },
      {
        rank: '7',
        title: 'Concerto de Violoncelo na Cripta',
        artGlyph: '🎻',
        artSubtitle: 'Melodia que Faz Pedras Chorarem',
        topWatcherTrigger:
          'Ao ouvir uma música instrumental, canção melancólica ou som de chuva.',
        topWatcherEvent:
          'Uma anciã Toreador toca sozinha num teatro abandonado. A música acalma a Fera interior de todos que ouvem.',
        bottomEchoPrompt:
          'Diga o nome de uma música, ou cantarole um trecho, que represente a noite de hoje.',
        bottomEchoEffect:
          'A Fera adormece: oculte imediatamente qualquer Valete (J) ativo de ambos os jogadores!',
        dailyIdea: 'Pode ser uma música que emociona, um ensaio ou um vídeo de concerto antes de dormir.',
        flavorText: 'Enquanto a última nota vibrar nas colunas de mármore, ainda não somos monstros por completo.',
      },
      {
        rank: '8',
        title: 'Tentação de Diablerie',
        artGlyph: '🖤',
        artSubtitle: 'Beber a Própria Alma de um Ancião',
        topWatcherTrigger:
          'Ao sentir fome real ou ver uma cor vermelha muito intensa.',
        topWatcherEvent:
          'Um vampiro inimigo mais velho está em torpor aos seus pés. Beber o sangue do coração dele daria poder imenso, mas mancharia sua aura.',
        bottomEchoPrompt:
          'Diga, em voz alta ou por escrito, se você comete o pecado proibido pelo poder ou resiste à tentação.',
        bottomEchoEffect:
          'Se beberem: desvira ambas as Damas (Q), mas ativa o Valete (J). Se resistirem: mantém a honra e protege a Humanidade.',
        dailyIdea: 'Pode ser um doce fora da dieta, uma compra por impulso ou a vontade de levar o crédito sozinho.',
        flavorText: 'Veios negros na aura denunciam quem roubou a eternidade de outro imortal.',
      },
      {
        rank: '9',
        title: 'Alvorada Iminente nas Cortinas de Seda',
        artGlyph: '🌅',
        artSubtitle: 'Dez Minutos Antes do Primeiro Raio Solar',
        topWatcherTrigger:
          'Ao notar a luz do dia forte lá fora ou olhar para o relógio marcando o fim de um ciclo.',
        topWatcherEvent:
          'A noite passou rápido demais. O refúgio principal está longe e o horizonte já começa a clarear em tons de violeta.',
        bottomEchoPrompt:
          'Fotografe ou aponte o canto mais escuro do seu ambiente: é o seu abrigo para o dia.',
        bottomEchoEffect:
          'Se responderem a tempo, adormecem em segurança e recarregam energias. Atraso custa virar a Dama (Q ⟳).',
        dailyIdea: 'Pode ser acordar cedo com alguém, uma despedida antes do trabalho ou o sol batendo na janela.',
        flavorText: 'O sol é um deus ciumento que não perdoa quem aprendeu a viver sem ele.',
      },
      {
        rank: '10',
        title: 'Coroação de Sangue na Cobertura',
        artGlyph: '👑',
        artSubtitle: 'Os Novos Senhores da Cidade Noturna',
        topWatcherTrigger:
          'Ao ver as luzes da cidade à noite ou o ponto mais elegante do lugar onde está.',
        topWatcherEvent:
          'Com a queda do antigo Príncipe, os clãs aguardam no salão de cristal para jurar fidelidade à nova aliança.',
        bottomEchoPrompt:
          'Pronuncie, em voz alta ou por escrito, a primeira lei do seu novo reinado.',
        bottomEchoEffect:
          'Clímax de ♥: Triunfo político absoluto! Desvira todas as Damas (Q) e limpa qualquer Valete (J).',
        dailyIdea: 'Pode ser uma comemoração, a conquista de alguém próximo ou um aniversário.',
        flavorText: 'Eles se ajoelham não pelo medo da espada, mas porque ninguém resiste ao nosso nome.',
      },
    ],
    diamonds: [
      {
        rank: 'A',
        title: 'Leilão Clandestino no Banco Central',
        artGlyph: '💎',
        artSubtitle: 'Cofre Subterrâneo dos Ventrue',
        topWatcherTrigger:
          'Ao usar cartão, fazer um pagamento, ver um caixa eletrônico ou cofre.',
        topWatcherEvent:
          'No subsolo blindado do distrito financeiro, relíquias ocultas e territórios de caça estão sendo leiloados por favores de sangue.',
        bottomEchoPrompt:
          'Aponte ou descreva o item mais elegante perto de você como lance pelo lote principal.',
        bottomEchoEffect:
          'Sucesso de ♦ Ouros: Desvira a Dama (Q) de ambos os jogadores imediatamente!',
        dailyIdea: 'Pode ser uma ida ao banco, um pagamento importante ou uma compra que pede pesquisa de preço.',
        flavorText: 'Mortais negociam ações na bolsa; nós negociamos quem será o dono do banco pelos próximos cem anos.',
      },
      {
        rank: '2',
        title: 'Bolsa de Plasma do Hospital Privado',
        artGlyph: '🩸',
        artSubtitle: 'Contrabando Noturno na Ambulância',
        topWatcherTrigger:
          'Ao abrir a geladeira, armário ou pegar algo gelado para beber/comer.',
        topWatcherEvent:
          'Um contato no banco de sangue separou um lote raro tipo O Negativo sem registro nas planilhas oficiais.',
        bottomEchoPrompt:
          'Toque em algo frio, ou fotografe a geladeira, e declare que o carregamento chegou intacto.',
        bottomEchoEffect:
          'Recarrega (Untap) sua Dama (Q) e acalma qualquer Valete (J) de fome pelo resto do turno.',
        dailyIdea: 'Pode ser doar sangue, buscar um exame ou uma ida à farmácia no fim do dia.',
        flavorText: 'Frio e com gosto de plástico hospitalar, mas mantém a Fera calada sem deixar corpos nas ruas.',
      },
      {
        rank: '3',
        title: 'Passaportes Falsos e Identidades Novas',
        artGlyph: '🪪',
        artSubtitle: 'Apagando um Século de Registros Civis',
        topWatcherTrigger:
          'Ao ver um documento, crachá, carteira de motorista ou assinatura.',
        topWatcherEvent:
          'A Receita e a polícia mortal notaram que o dono do seu imóvel tem a mesma assinatura desde 1954. É hora de "herdar" de si mesmo.',
        bottomEchoPrompt:
          'Invente o nome falso e a profissão mortal que você usará nesta década.',
        bottomEchoEffect:
          'Desvira a Dama (Q) do Eco e remove a Marca de Caçado (Valete J♠) se estiver ativa.',
        dailyIdea: 'Pode ser renovar um documento, tirar uma foto 3x4 ou atualizar um cadastro.',
        flavorText: 'Morrer no papel a cada trinta anos é o imposto obrigatório da imortalidade.',
      },
      {
        rank: '4',
        title: 'Chave do Hotel Histórico Suite 606',
        artGlyph: '🗝️',
        artSubtitle: 'Território Neutro Consagrado',
        topWatcherTrigger:
          'Ao segurar um molho de chaves, cartão magnético ou abrir uma porta trancada.',
        topWatcherEvent:
          'A suíte blindada do hotel mais antigo da metrópole abre suas portas: ali nenhum combate é permitido pelas leis da Corte.',
        bottomEchoPrompt:
          'Segure uma chave ou diga o número de uma porta próxima para trancar o refúgio seguro.',
        bottomEchoEffect:
          'Refúgio Seguro (♦): Desvira sua Dama (Q) e garante imunidade a emboscadas na próxima rodada.',
        dailyIdea: 'Pode ser a chave de casa, um crachá de acesso ou uma reserva para uma viagem.',
        flavorText: 'O concierge conhece nosso segredo desde que o avô dele carregava nossos baús do navio.',
      },
      {
        rank: '5',
        title: 'Grimório Tremere Lacrado a Fogo',
        artGlyph: '📕',
        artSubtitle: 'Rituais de Taumaturgia Proibida',
        topWatcherTrigger:
          'Ao ver um livro grosso, agenda, biblioteca ou estante.',
        topWatcherEvent:
          'Um pacote entregue por um mensageiro mudo contém páginas arrancadas da Capela de Viena com selos herméticos de sangue.',
        bottomEchoPrompt:
          'Abra qualquer livro ou texto perto de você e leia a primeira frase que seus olhos encontrarem como se fosse um encantamento.',
        bottomEchoEffect:
          'O ritual funciona: desvire a Dama (Q) de um jogador à sua escolha!',
        dailyIdea: 'Pode ser um manual de instruções, um livro difícil ou uma receita de família.',
        flavorText: 'Para os feiticeiros do sangue, a vitae não é apenas sustento — é tinta condutora de poder.',
      },
      {
        rank: '6',
        title: 'Suborno na Delegacia do Distrito',
        artGlyph: '💼',
        artSubtitle: 'Inquérito Arquivado Antes do Amanhecer',
        topWatcherTrigger:
          'Ao ver uma pasta, mochila, envelope ou prédio público.',
        topWatcherEvent:
          'Um detetive mortal curioso demais juntou fotos das suas aparições noturnas. Um envelope grosso pode convencê-lo a tirar férias.',
        bottomEchoPrompt:
          'Diga quanto (ou qual segredo tentador) seu personagem coloca na mesa do detetive para queimar a pasta.',
        bottomEchoEffect:
          'Limpa o rastro policial e desvira a Dama (Q) do Vigia.',
        dailyIdea: 'Pode ser resolver uma burocracia, um boleto atrasado ou um protocolo que precisa sair hoje.',
        flavorText: 'Todo homem tem um preço; para os que não aceitam ouro, oferecemos mais dez anos de vida para quem eles amam.',
      },
      {
        rank: '7',
        title: 'Coleção de Relógios de Ouro Parados',
        artGlyph: '⌚',
        artSubtitle: 'Hora Exata do Abraço de Cada Ancião',
        topWatcherTrigger:
          'Ao olhar as horas no relógio de pulso, parede ou celular.',
        topWatcherEvent:
          'No antiquário de um aliado, cada relógio parado guarda uma joia e o segredo da fraqueza de um membro do conselho.',
        bottomEchoPrompt:
          'Informe o minuto exato em que você leu esta carta: esse número é a chave do cofre secreto do antiquário.',
        bottomEchoEffect:
          'Recompensa de ♦ Ouros: Ambos os jogadores desviram suas Damas (Q)!',
        dailyIdea: 'Pode ser trocar a pilha do relógio, ajustar um alarme ou conferir datas no calendário.',
        flavorText: 'Meu relógio parou às 23h42 de uma terça-feira chuvosa; desde então, todos os ponteiros mentem.',
      },
      {
        rank: '8',
        title: 'Frota de Limusines com Insulfilm Triplo',
        artGlyph: '🚘',
        artSubtitle: 'Transporte Seguro Mesmo ao Meio-Dia',
        topWatcherTrigger:
          'Ao entrar num carro, ônibus, metrô ou ver veículos com vidros escuros.',
        topWatcherEvent:
          'Seu contato logístico disponibilizou um veículo com blindagem UV completa para atravessar a cidade sem depender de túneis.',
        bottomEchoPrompt:
          'Diga para onde vai a corrida e descreva o banco de couro da limusine.',
        bottomEchoEffect:
          'Desvira sua Dama (Q) e permite ignorar o gatilho ambiental da próxima carta se desejarem.',
        dailyIdea: 'Pode ser chamar um carro por aplicativo, uma carona combinada ou planejar o transporte do dia.',
        flavorText: 'Lá fora o trânsito buzina sob o sol de verão; cá dentro faz o frio silencioso de uma câmara real.',
      },
      {
        rank: '9',
        title: 'Moeda de Marfim da Boate Subterrânea',
        artGlyph: '🪙',
        artSubtitle: 'Ficha de Favor Maior ("Major Boon")',
        topWatcherTrigger:
          'Ao tocar numa moeda, botão redondo, anel ou chaveiro metálico.',
        topWatcherEvent:
          'O mestre das harpias entrega uma ficha de marfim gravada: a cobrança de uma Dívida de Vida que pode salvar a noite.',
        bottomEchoPrompt:
          'Fotografe um objeto circular pequeno perto de você para registrar a posse da Moeda de Favor.',
        bottomEchoEffect:
          'Desvira a Dama (Q) e remove imediatamente o Valete de Dívida de Sangue (J♦) ou qualquer outro Valete ativo.',
        dailyIdea: 'Pode ser um favor que você deve, um cupom guardado ou o troco esquecido no bolso.',
        flavorText: 'Segure esta ficha como se fosse seu próprio coração; quem a possui ordena até aos mortos.',
      },
      {
        rank: '10',
        title: 'O Sarcófago do Antediluviano',
        artGlyph: '⚰️',
        artSubtitle: 'Relíquia Milenar no Porto Seco',
        topWatcherTrigger:
          'Ao ver uma caixa trancada, pedra antiga, escadaria de subsolo ou museu.',
        topWatcherEvent:
          'O contêiner arqueológico que toda a cidade buscava foi interceptado. O poder que emana da pedra faz o sangue ferver.',
        bottomEchoPrompt:
          'Decida: você tranca o sarcófago no fundo do oceano ou guarda a chave para governar nas sombras?',
        bottomEchoEffect:
          'Clímax de ♦: Riqueza e poder supremos na crônica! Restaura todas as Damas (Q) e Valetes (J).',
        dailyIdea: 'Pode ser uma caixa pesada para carregar, mudar um móvel de lugar ou um objeto antigo da família.',
        flavorText: 'Alguns deuses não morreram no dilúvio; apenas dormem esperando alguém tolo o bastante para girar a chave.',
      },
    ],
    clubs: [
      {
        rank: 'A',
        title: 'Labirinto de Cabos dos Nosferatu',
        artGlyph: '🕸️',
        artSubtitle: 'Servidores Ocultos nas Catacumbas',
        topWatcherTrigger:
          'Ao ver fios de computador, roteador, luzes piscando ou grade de rua.',
        topWatcherEvent:
          'Cem metros abaixo do asfalto, a SchreckNET guarda todos os segredos sujos de mortais e imortais da metrópole.',
        bottomEchoPrompt:
          'Escreva, como num terminal criptografado, onde o inimigo se esconde.',
        bottomEchoEffect:
          'Se for ♣ Paus, você hackeia o segredo e desvira a Dama (Q). Outros naipes atravessam o túnel em segurança.',
        dailyIdea: 'Pode ser um emaranhado de fios, um sistema confuso no trabalho ou a rede de casa que caiu.',
        flavorText: 'A beleza desapareceu do nosso rosto para que pudéssemos enxergar a verdade nua no escuro.',
      },
      {
        rank: '2',
        title: 'Tentáculos de Tenebrosidade',
        artGlyph: '🌑',
        artSubtitle: 'A Sombra que Cria Vida Própria',
        topWatcherTrigger:
          'Ao ver sua própria sombra projetada na parede ou no chão.',
        topWatcherEvent:
          'A escuridão no canto da sala não obedece às leis da física; braços de puro Abismo se erguem para testar sua coragem.',
        bottomEchoPrompt:
          'Fotografe uma sombra comprida perto de você e diga qual ordem seu personagem sussurra para a escuridão.',
        bottomEchoEffect:
          'Jogadores de ♣ dominam a sombra; outros devem virar a Dama (Q ⟳) ou aceitar os Sussurros do Valete (J).',
        dailyIdea: 'Pode ser um cômodo escuro, sombras no corredor à noite ou um mau humor que se espalha.',
        flavorText: 'Apague a luz se quiser, mas lembre-se de que no escuro é a sombra quem vê você.',
      },
      {
        rank: '3',
        title: 'Presságio na Teia da Loucura',
        artGlyph: '👁️',
        artSubtitle: 'Padrões Ocultos nos Outdoors da Cidade',
        topWatcherTrigger:
          'Ao ler placas aleatórias na rua, manchetes ou números repetidos.',
        topWatcherEvent:
          'Todas as propagandas e semáforos da rua parecem formar uma frase secreta avisando sobre uma traição iminente na Corte.',
        bottomEchoPrompt:
          'Junte três palavras que você vê escritas ao seu redor e monte uma profecia.',
        bottomEchoEffect:
          'A profecia previne a próxima emboscada: no próximo turno, vocês ignoram qualquer efeito negativo do Topo.',
        dailyIdea: 'Pode ser um anúncio no caminho, uma placa que chama atenção ou uma coincidência do dia.',
        flavorText: 'Chamam-nos de loucos porque lemos as legendas do mundo antes que a cena aconteça.',
      },
      {
        rank: '4',
        title: 'Corvos Vigias nos Fios de Alta Tensão',
        artGlyph: '🐦‍⬛',
        artSubtitle: 'Olhos Emprestados pelo Animalismo',
        topWatcherTrigger:
          'Ao ver pássaros no céu/janela ou ouvir o som da rua lá fora.',
        topWatcherEvent:
          'Dezenas de aves noturnas pousam em silêncio ao redor do quarteirão; alguém está espionando através dos olhos delas.',
        bottomEchoPrompt:
          'Olhe pela janela ou para o teto e descreva, em uma frase, quem está observando você.',
        bottomEchoEffect:
          'Se for ♣ Paus, você inverte o vínculo e descobre o espião; outros naipes mantêm a guarda alta.',
        dailyIdea: 'Pode ser pássaros nos fios, a vista de uma janela alta ou uma volta pelo bairro ao entardecer.',
        flavorText: 'O corvo não trabalha de graça; ele cobra um gole de sangue morno no parapeito da janela.',
      },
      {
        rank: '5',
        title: 'Sussurros dos Fantasmas no Necrotério',
        artGlyph: '👻',
        artSubtitle: 'O Véu da Morte Fica Fino à Meia-Noite',
        topWatcherTrigger:
          'Ao sentir uma corrente de ar frio ou entrar num corredor silencioso.',
        topWatcherEvent:
          'Espíritos inquietos das vítimas da Corte cercam o necrotério, apontando dedos translúcidos para o verdadeiro culpado.',
        bottomEchoPrompt:
          'Diga, em tom grave ou sussurrado, que a justiça da noite será cumprida.',
        bottomEchoEffect:
          'Os espíritos abrem passagem secreta e acalmam um Valete (J) ativo na mesa.',
        dailyIdea: 'Pode ser um corredor vazio à noite, um prédio silencioso ou uma lembrança que volta à meia-noite.',
        flavorText: 'Os mortos não odeiam quem os matou; odeiam quem prometeu vingá-los e esqueceu.',
      },
      {
        rank: '6',
        title: 'O Espelho Que Não Reflete Ninguém',
        artGlyph: '🪞',
        artSubtitle: 'Maldição do Clã Lasombra',
        topWatcherTrigger:
          'Ao passar diante de um espelho, vitrine ou vidro reflexivo.',
        topWatcherEvent:
          'Um estranho elegante caminha ao seu lado na recepção, mas na vitrine apenas você aparece no vidro.',
        bottomEchoPrompt:
          'Fotografe um vidro ou espelho mostrando só metade do enquadramento, ou um objeto sem você.',
        bottomEchoEffect:
          'Vocês percebem o infiltrado antes do bote! Evita virar a Dama (Q ⟳).',
        dailyIdea: 'Pode ser um espelho embaçado, uma vitrine escura ou uma foto em que você não aparece.',
        flavorText: 'Quando a alma é entregue ao Abismo, a luz se recusa a desenhar nosso rosto.',
      },
      {
        rank: '7',
        title: 'Estátua Viva na Cornija da Catedral',
        artGlyph: '🗿',
        artSubtitle: 'Asas de Pedra sob a Chuva Ácida',
        topWatcherTrigger:
          'Ao ver uma fachada de pedra, estátua, coluna ou escada antiga.',
        topWatcherEvent:
          'Aquela gárgula no topo do prédio não existia ontem. Ela gira o pescoço de granito lentamente na direção da rua.',
        bottomEchoPrompt:
          'Fique imóvel por dez segundos e então diga: "Não se mexa, ela só vê movimento".',
        bottomEchoEffect:
          'Vocês passam despercebidos sob o olhar de pedra. Se houver atraso, vire a Dama (Q ⟳).',
        dailyIdea: 'Pode ser uma igreja no caminho, uma fachada antiga ou uma tarde de chuva olhando pela janela.',
        flavorText: 'Esculpidas pela feitiçaria para guardar criptas, elas esqueceram que já foram humanas.',
      },
      {
        rank: '8',
        title: 'Ritual do Círculo de Giz Vermelho',
        artGlyph: '🕯️',
        artSubtitle: 'Velas Negras no Chão do Teatro',
        topWatcherTrigger:
          'Ao ver uma mesa redonda, tapete, lâmpada pendente ou vela.',
        topWatcherEvent:
          'Ocultistas da noite estão realizando um ritual para rastrear o sangue da sua linhagem através da cidade inteira.',
        bottomEchoPrompt:
          'Desenhe um símbolo imaginário na mesa com o dedo e descreva como você quebra o círculo.',
        bottomEchoEffect:
          'Rompe o rastreamento de sangue e limpa a Marca de Caçado (Valete J).',
        dailyIdea: 'Pode ser uma peça de teatro, desenhos de giz na calçada ou acender uma vela quando a luz acaba.',
        flavorText: 'Três gotas de vitae num mapa queimam como farol para quem conhece as palavras em aramaico.',
      },
      {
        rank: '9',
        title: 'Toque do Torpor Ancestral',
        artGlyph: '🥀',
        artSubtitle: 'O Peso de Quinhentos Invernos',
        topWatcherTrigger:
          'Ao sentir cansaço, frio nas mãos ou ver uma folha seca.',
        topWatcherEvent:
          'Uma onda psíquica de um Matusalém adormecido sob a cidade faz o sangue nas suas veias gelar e ficar pesado como chumbo.',
        bottomEchoPrompt:
          'Diga seu próprio nome e lembre, em voz alta ou por escrito, pelo que você luta nesta noite.',
        bottomEchoEffect:
          'O chamado do parceiro impede o torpor! Se não houver resposta, o Valete (J) se revela.',
        dailyIdea: 'Pode ser um cochilo da tarde, um cansaço pesado ou a cama no fim do dia.',
        flavorText: 'A eternidade cansa; chega um século em que fechar os olhos parece mais doce que reinar.',
      },
      {
        rank: '10',
        title: 'A Verdade Oculta no Livro de Nod',
        artGlyph: '📜',
        artSubtitle: 'Tabuleta de Argila da Primeira Cidade',
        topWatcherTrigger:
          'Ao ver a lua no céu, uma estrela ou ler algo em outra língua/símbolo.',
        topWatcherEvent:
          'Nas profundezas esquecidas, o fragmento original do livro revela como quebrar a maldição do sangue.',
        bottomEchoPrompt:
          'Escreva a revelação final da sua crônica em uma frase mística.',
        bottomEchoEffect:
          'Clímax de ♣: Domínio supremo dos mistérios da noite! Remove todos os Valetes (J) e restaura as Damas (Q).',
        dailyIdea: 'Pode ser um livro antigo, uma pesquisa que vira a noite ou uma verdade que você descobre hoje.',
        flavorText: 'No princípio havia apenas a noite, e ela não pedia permissão ao sol para existir.',
      },
    ],
  },
  jokers: {
    light: {
      title: 'O Golconda — A Alvorada sem Cinzas',
      artGlyph: '✨',
      artSubtitle: 'O Milagre da Redenção Imortal',
      topWatcherTrigger:
        'Ao ver um raio de luz suave atravessando a janela ou sentir paz repentina.',
      topWatcherEvent:
        'Por uma única noite sagrada, a Fera interior silencia por completo. O coração bate quente como se estivesse vivo outra vez.',
      bottomEchoPrompt:
        'Diga ou escreva uma mensagem sincera de gratidão, fora das máscaras da Corte.',
      bottomEchoEffect:
        'Presságio Claro (★): Graça da Golconda! Ambos desviram suas Damas (Q) e purificam permanentemente seus Valetes (J).',
      flavorText: 'Dizem as lendas que aquele que perdoa o próprio monstro pode ver o nascer do sol uma última vez sem queimar.',
    },
    dark: {
      title: 'Gehenna — A Noite da Lua de Sangue',
      artGlyph: '🌑',
      artSubtitle: 'Os Antediluvianos Despertam famintos',
      topWatcherTrigger:
        'Ao ver o céu totalmente escuro, uma nuvem vermelha ou ouvir trovão/vento forte.',
      topWatcherEvent:
        'A Lua fica cor de rubi sobre os arranha-céus. Os fundadores milenares acordaram sob a terra e o sangue de todos os vampiros os chama.',
      bottomEchoPrompt:
        'Diga, em voz alta ou por escrito, qual segredo supremo você ofereceria para escapar do julgamento final.',
      bottomEchoEffect:
        'Cataclismo (💀): Um jogador deve virar sua Dama (Q ⟳) E revelar seu Valete (J) para que a dupla sobreviva à Gehenna.',
      flavorText: 'Quando os pais do sangue se levantam do pó, os príncipes da noite viram apenas o banquete de entrada.',
    },
  },
};

export const VAMPIRES_DECK: ThemeDeck = buildThemeDeck(VAMPIRES_BLUEPRINT);
