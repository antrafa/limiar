import { buildThemeDeck, type ThemeBlueprint } from './engine-deck';
import type { ThemeDeck } from '../types/card';

export const VAMPIRES_BLUEPRINT: ThemeBlueprint = {
  id: 'vampires',
  name: 'Sangue & Néon',
  subtitle: 'Vampiros — Crônica da Noite Eterna',
  tagline: 'Sob os letreiros de néon, pactos antigos cobram seu preço em sangue e segredos.',
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
          'Recarga (Untap): Desvire ao selar um contrato de ♦ Ouros ou encontrar seu parceiro de coterie pessoalmente.',
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
          'Recarga (Untap): Desvire ao cumprir uma carta de ♦ Ouros ou quando brindarem com uma bebida vermelha ou escura.',
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
          'Recarga (Untap): Desvire ao concluir qualquer negociação de ♦ Ouros ou receber um presente/objeto real do parceiro.',
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
          'Recarga (Untap): Desvire ao cumprir uma carta de ♦ Ouros ou enviar uma mensagem a partir de um ambiente totalmente à meia-luz.',
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
          'Fotografe uma saída discreta, escada ou porta lateral onde você está e ordene que o parceiro apague os rastros.',
        bottomEchoEffect:
          'Se for ♠ Espadas, você abate os batedores. Outros naipes devem virar a Dama (Q ⟳) ou assumir a Marca (Valete J).',
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
          'Um ancilla rival da corte desafia sua coterie pelo direito de caça no território central da cidade.',
        bottomEchoPrompt:
          'Segure um objeto metálico na mão, mande foto ou descreva sua guarda e diga qual é a primeira estocada.',
        bottomEchoEffect:
          'Vence o duelo e impõe respeito na Corte. Se hesitar por mais de 15 minutos, vire sua Dama (Q ⟳).',
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
          'Mande uma mensagem rápida explicando como vocês confiscam o aparelho ou plantam a versão de que era um efeito de cinema.',
        bottomEchoEffect:
          'Apaga o rastro digital. Se falhar, o Príncipe impõe o Valete (J) sobre o Vigia da rodada.',
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
          'Feche uma janela/porta ou apague uma luz perto de você agora e mande o veredito do traidor para o parceiro.',
        bottomEchoEffect:
          'Neutraliza a traição a tempo. Jogadores de ♠ ou ♣ interrogam o servo e descobrem quem pagou.',
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
          'Envie um áudio curto com voz firme e controlada ordenando recuo imediato para o concreto iluminado da cidade.',
        bottomEchoEffect:
          'Apenas o aço de ♠ ou virar uma Dama (Q ⟳) detém a fúria lupina sem deixar Cicatrizes (Valete J).',
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
          'A Harpia da corte acusa sua dupla de invadir o domínio de um Primógeno durante a caçada da noite passada.',
        bottomEchoPrompt:
          'Escreva uma defesa curta e impecavelmente formal de duas linhas transferindo a culpa para um inimigo em comum.',
        bottomEchoEffect:
          'Se a defesa for convincente (ou tiver apoio de ♥/♠), o Príncipe absolve vocês; senão, ative o Valete (J).',
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
          'Respire fundo e descreva algo frio (pedra, gelo, metal, vento noturno) que você toca agora para dominar o pânico.',
        bottomEchoEffect:
          'Domina o Rötschreck. Se o Eco já estiver com Valete (J) ativo, deve virar a Dama (Q ⟳) para não fugir em fúria.',
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
          'Os sinos da meia-noite tocaram três vezes: uma Caçada de Sangue foi aberta contra um aliado próximo de vocês.',
        bottomEchoPrompt:
          'Decida com o parceiro: vocês escondem o fugitivo no próprio refúgio ou entregam a localização dele ao Carrasco?',
        bottomEchoEffect:
          'Esconder exige coragem (teste de ♠/♥ ou virar Q ⟳); entregar garante segurança imediata mas pesa na alma.',
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
          'Para recuperar a relíquia roubada, vocês precisam invadir o ático vigiado por gárgulas e guardas armados.',
        bottomEchoPrompt:
          'Mande uma mensagem coordenando a entrada: quem distrai os guardas na porta e quem quebra a claraboia?',
        bottomEchoEffect:
          'Ação sincronizada garante a relíquia e limpa um Valete (J) de combate.',
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
          'O comandante da célula de caçadores atraiu vocês para uma armadilha de luz ultravioleta no altar principal.',
        bottomEchoPrompt:
          'Grave um áudio curto ou escreva seu golpe final declarando por que a noite pertence à sua coterie.',
        bottomEchoEffect:
          'Clímax de ♠: Vitória épica sobre os caçadores! Desvira a Dama (Q) da dupla para o desfecho da crônica.',
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
          'Toda a aristocracia vampírica da cidade está reunida no salão subterrâneo do museu. Todos os olhares se voltam para vocês.',
        bottomEchoPrompt:
          'Descreva o traje de gala noturno do seu personagem e faça um brinde dedicado ao seu parceiro de coterie.',
        bottomEchoEffect:
          'Encanta a corte: se for ♥ Copas, você desvira uma Dama (Q); qualquer Valete (J) fica suprimido durante o baile.',
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
          'Diga ao parceiro em que momento exato você para de beber para não tirar a vida do mortal.',
        bottomEchoEffect:
          'Sacia a sede e remove o Valete de Sede Rubra (J♥). Se exagerar na descrição, a Fera exige virar a Dama (Q ⟳).',
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
          'Tome um gole da sua bebida agora e confesse ao parceiro um sentimento ou segredo que seu vampiro jamais admitiria a outro.',
        bottomEchoEffect:
          'Laço formado: pelo resto da sessão, um jogador pode virar sua própria Dama (Q ⟳) para pagar custos no lugar do outro.',
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
          'Na exposição privada, há uma pintura a óleo de 1840 retratando alguém idêntico a um de vocês dois.',
        bottomEchoPrompt:
          'Fotografe uma imagem/quadro perto de você (ou descreva a cena) e conte qual era o seu nome naquela vida passada.',
        bottomEchoEffect:
          'Desperta memórias humanas: cura 1 estado de Valete (J) se a resposta emocionar o parceiro.',
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
          'Um boato malicioso sobre a lealdade do seu parceiro está se espalhando pelos sofás de couro do clube.',
        bottomEchoPrompt:
          'Envie uma mensagem defendendo a reputação do seu parceiro com uma frase espirituosa que humilhe o fofoqueiro.',
        bottomEchoEffect:
          'Vence o duelo social! Jogadores de ♥ Copas ganham um favor da Corte (desvira a Dama Q).',
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
          'Diga ao parceiro se você observa das sombras em silêncio ou se deixa um objeto anônimo na mesa antes de partir.',
        bottomEchoEffect:
          'Preserva a Humanidade da dupla. Impede que o próximo Valete (J) se ative automaticamente.',
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
          'Compartilhe o nome de uma música real (ou cante/assobie um trecho em áudio) que represente a noite de hoje.',
        bottomEchoEffect:
          'A Fera adormece: oculte imediatamente qualquer Valete (J) ativo de ambos os jogadores!',
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
          'O Eco deve decidir pela dupla: vocês cometem o pecado proibido pelo poder ou resistem à tentação?',
        bottomEchoEffect:
          'Se beberem: desvira ambas as Damas (Q), mas ativa o Valete (J). Se resistirem: mantém a honra e protege a Humanidade.',
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
          'A noite passou rápido demais. Vocês estão longe do refúgio principal e o horizonte já começa a clarear em tons de violeta.',
        bottomEchoPrompt:
          'Fotografe o canto mais escuro e fechado do seu ambiente agora e chame o parceiro para dividir o abrigo diurno.',
        bottomEchoEffect:
          'Se responderem a tempo, adormecem em segurança e recarregam energias. Atraso custa virar a Dama (Q ⟳).',
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
          'Com a queda do antigo Príncipe, os clãs aguardam no salão de cristal para jurar fidelidade à aliança de vocês dois.',
        bottomEchoPrompt:
          'Pronuncie a primeira lei do novo reinado de vocês em uma mensagem solene para o parceiro.',
        bottomEchoEffect:
          'Clímax de ♥: Triunfo político absoluto! Desvira todas as Damas (Q) e limpa qualquer Valete (J).',
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
          'Mostre ou descreva o item mais valioso/elegante perto de você como lance para arrematar o lote principal.',
        bottomEchoEffect:
          'Sucesso de ♦ Ouros: Desvira a Dama (Q) de ambos os jogadores imediatamente!',
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
          'O contato de vocês no banco de sangue separou um lote raro tipo O Negativo sem registro nas planilhas oficiais.',
        bottomEchoPrompt:
          'Pegue algo frio ou tire foto da geladeira/copo e confirme que o carregamento chegou intacto ao refúgio.',
        bottomEchoEffect:
          'Recarrega (Untap) sua Dama (Q) e acalma qualquer Valete (J) de fome pelo resto do turno.',
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
          'Invente e envie ao parceiro o novo nome falso e profissão mortal que vocês usarão nesta década.',
        bottomEchoEffect:
          'Desvira a Dama (Q) do Eco e remove a Marca de Caçado (Valete J♠) se estiver ativa.',
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
          'Vocês garantem acesso à suíte blindada do hotel mais antigo da metrópole, onde nenhum combate é permitido pelas leis da Corte.',
        bottomEchoPrompt:
          'Mostre uma chave na mão ou diga o número de uma porta próxima para trancar o refúgio seguro.',
        bottomEchoEffect:
          'Refúgio Seguro (♦): Desvira sua Dama (Q) e garante imunidade a emboscadas na próxima rodada.',
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
          'Mande uma mensagem avisando o destino da corrida e convidando o parceiro para o banco de couro.',
        bottomEchoEffect:
          'Desvira sua Dama (Q) e permite ignorar o gatilho ambiental da próxima carta se desejarem.',
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
          'O mestre das harpias entrega a vocês uma ficha de marfim gravada: a cobrança de uma Dívida de Vida que pode salvar a coterie.',
        bottomEchoPrompt:
          'Fotografe um objeto circular pequeno perto de você para registrar a posse da Moeda de Favor.',
        bottomEchoEffect:
          'Desvira a Dama (Q) e remove imediatamente o Valete de Dívida de Sangue (J♦) ou qualquer outro Valete ativo.',
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
          'Vocês interceptam o contêiner arqueológico que toda a cidade buscava. O poder que emana da pedra faz o sangue ferver.',
        bottomEchoPrompt:
          'Decida em dupla: vocês trancam o sarcófago no fundo do oceano ou guardam a chave para governar nas sombras?',
        bottomEchoEffect:
          'Clímax de ♦: Riqueza e poder supremos na crônica! Restaura todas as Damas (Q) e Valetes (J).',
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
          'Mande uma mensagem como se fosse um terminal criptografado revelando onde o inimigo da coterie se esconde.',
        bottomEchoEffect:
          'Se for ♣ Paus, você hackeia o segredo e desvira a Dama (Q). Outros naipes atravessam o túnel em segurança.',
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
          'Junte três palavras que você está vendo escritas no seu ambiente agora e monte uma profecia para o parceiro.',
        bottomEchoEffect:
          'A profecia previne a próxima emboscada: no próximo turno, vocês ignoram qualquer efeito negativo do Topo.',
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
          'Dezenas de aves noturnas pousam em silêncio ao redor do quarteirão; alguém está espionando vocês através dos olhos delas.',
        bottomEchoPrompt:
          'Olhe pela janela ou para o teto e mande um sinal discreto avisando o parceiro que vocês estão sendo observados.',
        bottomEchoEffect:
          'Se for ♣ Paus, você inverte o vínculo e descobre o espião; outros naipes mantêm a guarda alta.',
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
          'Espíritos inquietos das vítimas da Corte cercam vocês dois, apontando dedos translúcidos para o verdadeiro culpado.',
        bottomEchoPrompt:
          'Envie um áudio em tom grave ou sussurrado respondendo aos mortos que a justiça da noite será cumprida.',
        bottomEchoEffect:
          'Os espíritos abrem passagem secreta e acalmam um Valete (J) ativo na mesa.',
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
          'Um estranho elegante caminha ao seu lado na recepção, mas quando vocês passam pela vitrine, apenas você aparece no vidro.',
        bottomEchoPrompt:
          'Tire uma foto de um vidro ou espelho mostrando apenas metade do enquadramento (ou um objeto sem você) e alerte o parceiro.',
        bottomEchoEffect:
          'Vocês percebem o infiltrado antes do bote! Evita virar a Dama (Q ⟳).',
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
          'Aquela gárgula no topo do prédio não existia ontem. Ela gira o pescoço de granito lentamente na direção da sua dupla.',
        bottomEchoPrompt:
          'Fique completamente imóvel por 10 segundos antes de digitar: "Não se mexa, ela só vê movimento".',
        bottomEchoEffect:
          'Vocês passam despercebidos sob o olhar de pedra. Se houver atraso, vire a Dama (Q ⟳).',
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
          'Desenhe um símbolo imaginário na mesa com o dedo e descreva ao parceiro como você quebra o círculo místico.',
        bottomEchoEffect:
          'Rompe o rastreamento de sangue e limpa a Marca de Caçado (Valete J).',
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
          'Peça ao parceiro que chame seu nome e lembre pelo que vocês dois estão lutando nesta noite.',
        bottomEchoEffect:
          'O chamado do parceiro impede o torpor! Se não houver resposta, o Valete (J) se revela.',
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
          'Nas profundezas esquecidas, vocês traduzem o fragmento original que revela como quebrar a maldição do sangue.',
        bottomEchoPrompt:
          'Escreva a revelação final da sua crônica em uma mensagem mística para o parceiro.',
        bottomEchoEffect:
          'Clímax de ♣: Domínio supremo dos mistérios da noite! Remove todos os Valetes (J) e restaura as Damas (Q).',
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
        'Por uma única noite sagrada, a Fera interior silencia por completo. Vocês sentem o coração bater quente como se estivessem vivos outra vez.',
      bottomEchoPrompt:
        'Compartilhem uma mensagem sincera de gratidão ou afeto real entre vocês dois, fora das máscaras da Corte.',
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
        'Escolha dramática: quem de vocês oferece o próprio vitae ou segredo supremo para proteger o parceiro do julgamento final?',
      bottomEchoEffect:
        'Cataclismo (💀): Um jogador deve virar sua Dama (Q ⟳) E revelar seu Valete (J) para que a dupla sobreviva à Gehenna.',
      flavorText: 'Quando os pais do sangue se levantam do pó, os príncipes da noite viram apenas o banquete de entrada.',
    },
  },
};

export const VAMPIRES_DECK: ThemeDeck = buildThemeDeck(VAMPIRES_BLUEPRINT);
