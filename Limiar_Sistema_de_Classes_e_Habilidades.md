# Limiar --- Sistema de Classes, Habilidades e Progressão

> **Documento de design --- versão de trabalho**
>
> Este documento consolida as decisões e propostas desenvolvidas para o
> redesign de Limiar. Os conceitos estruturais estão definidos como
> direção de design; os valores numéricos das habilidades ainda são
> provisórios e precisam ser validados em playtests.

## 1. Visão geral do redesign

Limiar está sendo redesenhado como um RPG cooperativo híbrido para dois
jogadores, com foco principal em aventura. A experiência combina
narrativa, personagens, decisões, combate tático, inimigos, atributos,
recursos, equipamentos, evolução e risco real de derrota.

O sistema deve conduzir a aventura por meio de cartas e regras, sem
exigir que um dos jogadores assuma o papel de mestre. O cotidiano
continua conectando os jogadores à ficção, mas nunca pode bloquear o
avanço da campanha nem exigir ações perigosas, invasivas ou
inconvenientes na vida real.

### Princípio central de design

**O sistema apresenta problemas. Os jogadores criam soluções. As cartas
determinam como essas soluções alteram a aventura.**

### As quatro camadas de Limiar

1.  **Campanha:** missão, capítulos, antagonista, objetivo final,
    vitória e derrota.
2.  **Sistema de aventura:** baralho, encontros, eventos, inimigos,
    obstáculos, descobertas e reviravoltas.
3.  **Personagens:** Rei, Dama, Valete, habilidades, recursos,
    equipamentos e especializações.
4.  **Mundo real:** gatilhos cotidianos, mensagens e observações que
    conectam a vida dos jogadores à ficção.

A camada do cotidiano é complementar. Se nenhum gatilho acontecer, a
campanha continua normalmente.

------------------------------------------------------------------------

## 2. Estrutura do personagem: Trio de Bolso

Cada jogador escolhe um naipe e recebe as três figuras correspondentes
desse naipe:

-   **Rei (K):** define a classe do personagem e sua habilidade passiva.
-   **Dama (Q):** representa uma habilidade especial de uso limitado.
-   **Valete (J):** representa uma complicação, fraqueza ou cicatriz
    pessoal.

### Decisão de design: o naipe do Rei determina a classe

A classe não é escolhida separadamente. O naipe do Rei define o
arquétipo mecânico:

  Naipe do Rei   Classe       Função principal
  -------------- ------------ -------------------------------------
  ♠ Espadas      Guardião     Defesa e combate
  ♣ Paus         Explorador   Mobilidade, estratégia e exploração
  ♥ Copas        Médico       Suporte e recuperação
  ♦ Ouros        Engenheiro   Recursos, equipamentos e preparação

Os arquétipos são universais em termos mecânicos. A aparência, o
vocabulário, a ficção e a interpretação das habilidades podem mudar de
acordo com o universo de Limiar.

### Dama: habilidade especial limitada

A Dama começa pronta. Ao ativar sua habilidade, fica esgotada. A
recuperação segue a regra-base do Trio de Bolso: cumprir uma carta de
Ouros recarrega a Dama.

A habilidade da Dama deve representar um momento especial: uma defesa
heroica, uma recuperação emergencial ou uma solução extraordinária.

### Valete: complicação pessoal

O Valete representa uma cicatriz, fraqueza ou complicação persistente.
Pode ser revelado por uma falha grave sem a Dama pronta ou por efeito de
uma carta. A complicação deve ter impacto ficcional e mecânico
interessante, sem funcionar apenas como punição.

As condições de recuperação do Valete ainda precisam ser detalhadas.

### Segurança no uso dos gatilhos e complicações

Ações, desafios e tabus devem acontecer dentro da ficção. Nenhuma regra
pode obrigar o jogador a realizar algo inseguro, invasivo ou
inconveniente na vida real, nem interromper trabalho, direção, cuidados,
sono ou outras responsabilidades.

------------------------------------------------------------------------

## 3. Atributos

A proposta atual utiliza quatro atributos:

  Atributo      Abrange
  ------------- ------------------------------------------------------
  **Força**     Potência física, resistência e combate corpo a corpo
  **Técnica**   Precisão, armas, equipamentos e mecanismos
  **Astúcia**   Percepção, estratégia, furtividade e exploração
  **Vontade**   Coragem, liderança e resistência mental

Atributos principais sugeridos por classe:

  Classe       Atributos principais
  ------------ ----------------------
  Guardião     Força e Vontade
  Explorador   Astúcia e Técnica
  Médico       Técnica e Vontade
  Engenheiro   Técnica e Astúcia

Os valores iniciais dos atributos ainda não estão definidos.

------------------------------------------------------------------------

## 4. Resolução de ações e testes

A proposta provisória de resolução é:

**Resultado = valor da carta + atributo + bônus**

O resultado é comparado à Defesa do inimigo ou à dificuldade do
obstáculo.

Exemplo: uma carta de valor 6, com atributo Técnica 2 e bônus 1, produz
resultado 9. Se a Defesa do alvo for 7, a ação é bem-sucedida.

Os naipes podem gerar efeitos secundários coerentes com suas funções:

-   **♠ Espadas:** combate, ataque, defesa e confronto.
-   **♥ Copas:** relações, moral, influência e recuperação.
-   **♦ Ouros:** equipamentos, recursos, preparação e progresso.
-   **♣ Paus:** exploração, furtividade, conhecimento e perigos.

Faixas provisórias de valor das cartas:

  -----------------------------------------------------------------------
  Cartas                              Tendência de uso
  ----------------------------------- -----------------------------------
  Ás                                  Evento decisivo ou ameaça especial

  2--4                                Encontros leves ou oportunidades

  5--7                                Desafios intermediários

  8--10                               Grandes ameaças ou situações de
                                      alto risco

  Coringas                            Eventos extraordinários, mudanças
                                      de cenário e catástrofes
  -----------------------------------------------------------------------

A fórmula e as faixas ainda precisam de playtest e calibração.

------------------------------------------------------------------------

## 5. As quatro classes

Todas as classes devem conseguir atacar, defender, explorar e interagir
com o cenário. A classe oferece vantagens e identidade, mas não deve
tornar ações exclusivas nem ser requisito obrigatório para concluir uma
campanha.

Classes repetidas são permitidas. O sistema deverá ajustar encontros,
quantidade de inimigos ou resistência das ameaças para manter o desafio
adequado a dois jogadores.

### 5.1 ♠ Guardião --- Defesa e combate

**Papel principal:** proteger o parceiro, absorver consequências e
controlar inimigos.

-   Protege o grupo e mantém posições.
-   Controla ameaças e ajuda a administrar o campo de batalha.
-   Causa dano consistente.
-   Atributos principais: Força e Vontade.

#### Rei --- Presença Protetora (passiva)

Uma vez por rodada, quando o parceiro sofre dano de um ataque, o
Guardião pode reduzir esse dano em 1 ponto, desde que esteja em posição
de ajudá-lo.

#### Dama --- Interposição (especial)

Quando um aliado sofre um ataque, o Guardião pode assumir o golpe em seu
lugar. O dano recebido pelo Guardião é reduzido em 2 pontos.

A Dama fica esgotada após a ativação.

#### Nível 2 --- Provocar

O Guardião desafia um inimigo. Até o próximo turno dele, esse inimigo
prioriza atacar o Guardião, em vez do parceiro, sempre que puder
alcançá-lo.

#### Nível 3 --- Especialização

-   **Protetor:** melhora a redução de dano e consegue proteger os dois
    jogadores em situações críticas.
-   **Destruidor:** ganha ataques mais fortes contra inimigos que já
    tenham sido feridos ou estejam vulneráveis.

#### Nível 4 --- Última Fortaleza

Uma vez no confronto final, o Guardião pode impedir que um ataque ou
efeito derrube os dois personagens simultaneamente. Ele assume a
consequência principal e permanece de pé com 1 ponto de vida.

------------------------------------------------------------------------

### 5.2 ♣ Explorador --- Mobilidade e estratégia

**Papel principal:** descobrir fraquezas, encontrar oportunidades e
manipular posicionamento.

-   Descobre fraquezas e oportunidades.
-   Manipula posicionamento e terreno.
-   Evita perigos e ataca com precisão.
-   Atributos principais: Astúcia e Técnica.

#### Rei --- Olho Clínico (passiva)

Ao encontrar um inimigo ou obstáculo importante, o Explorador pode
descobrir uma informação útil: uma fraqueza, uma característica, uma
rota ou uma oportunidade tática.

#### Dama --- Ponto Fraco (especial)

O Explorador identifica e marca uma vulnerabilidade de um inimigo. O
próximo ataque de qualquer jogador contra esse alvo recebe +2 no teste.

#### Nível 2 --- Movimento Tático

O Explorador pode mudar de posição sem sofrer a reação de um inimigo e
recebe vantagem em uma ação de exploração ou evasão nessa movimentação.

#### Nível 3 --- Especialização

-   **Caçador:** recebe bônus contra inimigos marcados e consegue
    explorar melhor suas fraquezas.
-   **Infiltrador:** destaca-se em furtividade, armadilhas e ações
    realizadas antes de um confronto.

#### Nível 4 --- Caçada Perfeita

O Explorador identifica uma abertura decisiva em um inimigo. O próximo
ataque bem-sucedido dos jogadores contra ele ignora parte de sua Defesa
e causa dano adicional.

------------------------------------------------------------------------

### 5.3 ♥ Médico --- Suporte e recuperação

**Papel principal:** manter o grupo vivo e recuperar personagens.

-   Recupera vida e remove condições.
-   Mantém o grupo funcionando em combates longos.
-   Ajuda aliados em situações críticas.
-   Atributos principais: Técnica e Vontade.

#### Rei --- Conhecimento de Campo (passiva)

Uma vez por rodada, ao ajudar um aliado, o Médico pode melhorar o
resultado da ação ou reduzir uma consequência física leve.

#### Dama --- Primeiros Socorros (especial)

O Médico recupera 3 pontos de vida de um personagem ou remove uma
condição negativa simples.

#### Nível 2 --- Estabilizar

Quando um personagem chega a zero de vida, o Médico pode impedir que ele
seja derrotado imediatamente, desde que consiga agir antes da resolução
final da ameaça.

#### Nível 3 --- Especialização

-   **Cirurgião:** melhora curas e consegue tratar condições mais
    graves.
-   **Inspirador:** fortalece o parceiro, melhora sua resistência e
    ajuda a superar efeitos mentais ou emocionais.

#### Nível 4 --- Recusa da Morte

Uma vez no confronto final, o Médico pode recuperar um personagem
derrotado, devolvendo-o à luta com uma pequena quantidade de vida. A
habilidade deve ter um custo ou uma condição importante, para que não
elimine todas as consequências da derrota.

------------------------------------------------------------------------

### 5.4 ♦ Engenheiro --- Recursos e preparação

**Papel principal:** transformar recursos e elementos do ambiente em
vantagens.

-   Cria ferramentas, armadilhas e proteções.
-   Aproveita recursos do ambiente.
-   Muda as condições de um encontro.
-   Atributos principais: Técnica e Astúcia.

#### Rei --- Improvisação (passiva)

Uma vez por rodada, o Engenheiro pode aproveitar um elemento do ambiente
ou um equipamento disponível para receber +1 em uma ação coerente com
sua especialidade.

#### Dama --- Solução Improvisada (especial)

O Engenheiro cria uma vantagem imediata usando os recursos disponíveis:
uma proteção temporária, uma armadilha simples, uma distração ou uma
ferramenta para superar um obstáculo.

#### Nível 2 --- Preparação Tática

Antes de um confronto, o Engenheiro pode preparar um dispositivo. Ele
pode servir para causar dano, reduzir dano recebido ou restringir a
movimentação de um inimigo.

#### Nível 3 --- Especialização

-   **Inventor:** desenvolve equipamentos e dispositivos mais poderosos.
-   **Estrategista:** prepara o campo de batalha, controla ameaças e
    cria vantagens para o grupo.

#### Nível 4 --- Plano de Contingência

Uma vez no confronto final, o Engenheiro revela uma solução preparada
anteriormente para neutralizar uma habilidade especial do chefe ou mudar
radicalmente as condições da batalha.

------------------------------------------------------------------------

## 6. Regras comuns para as habilidades

As regras abaixo são propostas iniciais para limitar a frequência de uso
e preservar decisões táticas.

1.  **Passivas do Rei:** ficam sempre disponíveis, respeitando seus
    gatilhos e limites, como uma vez por rodada.
2.  **Habilidade da Dama:** só pode ser usada quando a Dama estiver
    pronta. Depois da ativação, fica esgotada e segue a regra de
    recuperação por cartas de Ouros.
3.  **Habilidades de nível 2:** podem ser usadas uma vez por encontro.
4.  **Especialização de nível 3:** concede uma característica permanente
    e uma habilidade própria.
5.  **Habilidade de nível 4:** é um recurso extraordinário, utilizável
    uma vez no confronto final.

Essas limitações ainda precisam ser testadas junto com as regras de
combate e recuperação.

------------------------------------------------------------------------

## 7. Progressão de personagem

A progressão proposta tem quatro níveis:

  -----------------------------------------------------------------------
  Nível                   Nome                    Desenvolvimento
  ----------------------- ----------------------- -----------------------
  1                       Recruta                 Habilidade passiva do
                                                  Rei, habilidade
                                                  especial da Dama e
                                                  atributos iniciais

  2                       Especialista            Aprende uma nova
                                                  habilidade da classe

  3                       Veterano                Escolhe uma
                                                  especialização

  4                       Lenda                   Desbloqueia uma
                                                  habilidade
                                                  extraordinária
  -----------------------------------------------------------------------

### Marcos de progressão em uma campanha de seis capítulos

-   Início da campanha: nível 1.
-   Após o capítulo 2: nível 2.
-   Após o capítulo 4: nível 3.
-   Antes do confronto final: nível 4.

A evolução deve acontecer por marcos da história, objetivos, desafios
superados e cooperação significativa. Não deve depender de derrotar cada
inimigo ou repetir ações para acumular experiência.

------------------------------------------------------------------------

## 8. Combate e encontros

O combate deve ser tático e estratégico. Os inimigos podem ter:

-   **Vida:** quanto dano suportam.
-   **Defesa:** dificuldade para acertá-los ou superar suas defesas.
-   **Ataque:** dano ou intensidade de suas ações.
-   **Habilidade especial:** comportamento ou efeito que os diferencia.
-   **Fraqueza:** oportunidade que os jogadores podem descobrir e
    explorar.

Exemplo provisório de inimigo:

**Brutamontes** - Vida: 6 - Defesa: 7 - Ataque: 2 - Habilidade:
Investida - Fraqueza: articulações

### Estrutura provisória de uma rodada

1.  O inimigo anuncia sua intenção.
2.  Turno do jogador A.
3.  Turno do jogador B.
4.  Turno dos inimigos.
5.  Atualização de dano, efeitos e recursos.

Os jogadores conhecem a intenção inimiga antes de agir e podem planejar
em conjunto.

O sistema deve gerar encontros e reviravoltas sem exigir um mestre. As
cartas e regras conduzem a sequência de situações e desafios.

------------------------------------------------------------------------

## 9. Equipamentos

A proposta inicial organiza os equipamentos em quatro categorias:

-   **Armas:** ampliam ou modificam capacidades ofensivas.
-   **Proteções:** reduzem ou evitam consequências de ataques.
-   **Ferramentas:** ajudam a superar obstáculos e interagir com o
    ambiente.
-   **Artefatos:** oferecem efeitos especiais ou vantagens incomuns.

Qualquer classe pode usar qualquer item quando fizer sentido na ficção.
As classes podem ter sinergias específicas com determinados
equipamentos, sem exclusividade obrigatória.

------------------------------------------------------------------------

## 10. Estrutura sugerida de campanha

Uma campanha pode ser organizada em seis capítulos:

  Capítulo   Foco                           Objetivo narrativo
  ---------- ------------------------------ ----------------------------
  1          Introdução e primeiro perigo   Descobrir a missão
  2          Exploração e recursos          Encontrar uma rota
  3          Combate e sobrevivência        Superar uma ameaça
  4          Revelação e escolha            Descobrir uma verdade
  5          Grande obstáculo               Preparar o confronto
  6          Chefe final                    Cumprir ou perder a missão

Cada capítulo pode conter várias cenas. As cartas determinam situações e
o sistema controla o ritmo e a dificuldade.

------------------------------------------------------------------------

## 11. Princípios de equilíbrio

O balanceamento das classes deve respeitar alguns princípios:

-   O Guardião não pode ser tão resistente que torne a derrota
    improvável.
-   O Médico não pode recuperar tanta vida que elimine a pressão dos
    combates.
-   O Explorador e o Engenheiro precisam contribuir diretamente para a
    vitória, não apenas preparar o terreno para outro personagem.
-   Nenhuma combinação de classes deve ser obrigatória para vencer a
    campanha.
-   Classes repetidas devem continuar viáveis.
-   Todas as classes precisam ter oportunidades relevantes de decisão
    durante exploração, combate e resolução de obstáculos.

Os valores de cura, redução de dano e bônus apresentados neste documento
são números iniciais para playtest, não parâmetros finais.

------------------------------------------------------------------------

## 12. Próximas decisões e pontos em aberto

A estrutura de classes está definida como direção de design, mas ainda
há decisões mecânicas importantes a fechar:

1.  Definir os valores iniciais dos quatro atributos e como são
    distribuídos.
2.  Definir a vida inicial dos personagens e como ela evolui.
3.  Definir dano básico, Defesa dos inimigos e dificuldade dos testes.
4.  Especificar exatamente o que significa "vantagem" e como ela
    funciona.
5.  Definir o funcionamento de posicionamento, alcance, movimento e
    reações.
6.  Definir limites e custos das habilidades de nível 2 e das
    especializações.
7.  Determinar o custo ou a condição da habilidade de nível 4 do Médico.
8.  Definir como o Engenheiro obtém e consome recursos para improvisar e
    preparar dispositivos.
9.  Detalhar as complicações do Valete e suas condições de recuperação.
10. Fazer playtests com diferentes combinações de classes, incluindo
    classes repetidas.

### Próximo passo recomendado

Construir fichas mecânicas completas das quatro classes, com atributos,
vida, habilidades e recursos definidos. Em seguida, testar um combate
curto com duas classes diferentes e outro com classes repetidas. Isso
permitirá avaliar se cada classe tem decisões interessantes e se o risco
de derrota continua presente.
