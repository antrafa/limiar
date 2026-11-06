# Design Spec: "SINALEIRO" — Card Game RPG da Vida Real & Estúdio de Cartas

**Data:** 2026-11-06  
**Escopo:** Sistema de RPG de bolso baseado em baralho de 54 cartas no formato Magic/Poker (`63×88mm`) + Aplicação Web (Estúdio de Cartas, Folhas de Impressão A4 Print & Play, Guia de Oráculo para Baralho Comum e Simulador Sincronizado).

---

## 1. Visão Geral e Objetivo

**Sinaleiro** é um RPG da vida real (*pervasive tabletop card game*) jogado ao longo da rotina diária (1 carta por dia ou em janelas fixas) ou durante encontros presenciais (1 carta por hora), em **dupla** (presencial ou à distância) ou **solo**.

O sistema foi desenhado sobre três pilares:
1. **Dupla Compatibilidade Física:** Cada baralho temático possui **54 cartas** mapeadas diretamente para um baralho tradicional (`Ás a Rei` de `♠, ♥, ♦, ♣` + `2 Coringas`). Pode ser jogado com as cartas customizadas impressas em tamanho **Magic (`63×88mm`)** ou com qualquer baralho comum acompanhado do **Guia de Oráculo**.
2. **Personagem no Bolso (`K, Q, J`):** As 12 cartas de Realeza funcionam como fichas de personagem, recursos viráveis (*Tap ⟳*, estilo Magic) e condições/tabus na vida real.
3. **Sincronia Sem Mestre ("Cifra do Dia" + Eixo Sol & Lua):** Dois jogadores em locais diferentes podem deixar seus baralhos físicos na mesma sequência usando uma receita determinística de embaralhamento baseada na data, interagindo sem colisão porque um saca do **Topo (☀ Vigia — Evento)** e o outro saca do **Fundo (☾ Eco — Reação)**.

---

## 2. Mecânica Central do Jogo ("Sinaleiro & Relógio")

### 2.1. Anatomia das 54 Cartas

Cada tema contém exatamente **54 cartas**, divididas em 3 grupos:

#### A. O Trio de Personagem no Bolso (12 Figuras: `K, Q, J` de `♠, ♥, ♦, ♣`)
Cada naipe representa uma **Vocação / Linhagem** temática:
- **♠ Espadas (Força / Lâmina):** Combate, vigilância, confronto direto.
- **♥ Copas (Sangue / Vínculo):** Empatia, medicina, sedução, liderança emocional.
- **♦ Ouros (Engenho / Recurso):** Saque, tecnologia, improviso, rotas.
- **♣ Paus (Sombra / Oculto):** Furtividade, presságio, infecção latente, mistério.

No início de uma crônica, cada jogador escolhe um naipe e separa para seu bolso/carteira as **3 cartas de Figura** daquele naipe:
1. **Rei (`K`) — O Arquétipo (Identidade):**
   - Sempre visível. Define o nome da classe, sua **Passiva na Vida Real** (um comportamento sutil de roleplay durante o dia/hora) e sua **Sinergia de Naipe** (bônus quando uma carta do mesmo naipe é sacada no Deck do Mundo).
2. **Dama (`Q`) — O Trunfo (Artefato / Dom Virável `⟳`):**
   - Começa **de pé (preparada)**.
   - O jogador pode **virá-la em 90° (`⟳ Tap`)** para anular uma consequência grave, converter uma falha em sucesso parcial ou acionar seu efeito especial de socorro ao parceiro.
   - **Recarga (`Untap`):** Desvira quando os jogadores se encontram pessoalmente ou quando cumprem o desafio de uma carta do naipe de **♦ Ouros**.
3. **Valete (`J`) — A Cicatriz (Fardo / Condição):**
   - Começa **virada para baixo (inativa)**.
   - Quando um jogador falha em um evento ou recusa o custo de uma carta, ele **revela seu Valete (`J`)**.
   - Enquanto ativo, o Valete impõe um **Tabu na Vida Real** (ex.: proibição de certas palavras, restrição de tempo de resposta ou obrigação comportamental). Sofrer um novo dano com o Valete já ativo causa uma **Ruptura** (derrota pessoal ou traição dramática no clímax).

#### B. O Deck do Mundo (40 Cartas de Jornada: `Ás a 10` de `♠, ♥, ♦, ♣`)
Formam o maço principal de saque. Cada carta no formato Magic (`63×88mm`) possui duas caixas de regras na sua área de texto:
- **☀ Câmara Superior — O Vigia (Topo / Evento):**
  - Contém um **Gatilho do Mundo Real** (*"Ao ver...", "Ao ouvir...", "No ambiente onde você está..."*) + o **Evento Ficcional** que irrompe na história.
- **☾ Câmara Inferior — O Eco (Fundo / Reação):**
  - Contém uma **Interação Real** (enviar uma foto específica, gravar um áudio curto no personagem, fazer uma pergunta ou realizar uma micro-ação no local) + a **Resolução Mecânica** (custo, teste de naipe ou impacto na Dama `Q` / Valete `J`).

#### C. Os Eventos de Virada (2 Coringas)
- **Coringa Claro (`★ Presságio`):** Uma oportunidade rara ou revelação; permite recuperar uma Dama (`Q`) virada ou remover a Cicatriz de um Valete (`J`) se os jogadores cumprirem um ritual conjunto.
- **Coringa Escuro (`💀 Cataclismo`):** Acelera o fim do mundo; exige uma decisão imediata de sacrifício entre os dois jogadores.

---

### 2.2. O Ritual de Sincronia ("Cifra do Dia") e Modos de Jogo

#### Como sincronizar dois baralhos físicos à distância:
1. Os dois jogadores começam com as **42 cartas do Deck do Mundo** (`A–10` na ordem `♠, ♥, ♦, ♣` + os `2 Coringas` no final).
2. Usando a data do início da crônica (ex.: dia `DD` e mês `MM`):
   - **Passo 1 (Corte do Dia):** Cortar `DD` cartas do topo para o fundo.
   - **Passo 2 (Entrelaçamento / Faro Manual):** Distribuir as cartas uma a uma alternadamente em **3 pilhas** (Esquerda, Centro, Direita) e empilhar `Centro → Esquerda → Direita`.
   - **Passo 3 (Corte do Mês):** Cortar `MM` cartas do topo para o fundo e repetir a distribuição em **2 pilhas** alternadas, juntando `Esquerda sobre Direita`.
3. Os dois baralhos físicos ficam exatamente na mesma ordem permutada. No Estúdio Web, a ferramenta **"Cifra do Dia"** calcula e exibe exatamente a ordem resultante para conferência ou saque digital.

#### Dinâmica do Turno (Por Hora ou Por Dia):
- **Jogador Sol (Vigia):** Saca a **1ª carta do TOPO** do seu maço e lê o bloco **☀ TOPO (Vigia)**. Ele inicia a cena no mundo real (presencialmente ou mandando a primeira mensagem/foto/áudio).
- **Jogador Lua (Eco):** Saca a **última carta do FUNDO** do seu maço e lê o bloco **☾ FUNDO (Eco)**. Ele responde à cena cumprindo a interação proposta e resolvendo o efeito.
- **Alternância:** No turno seguinte (próxima hora ou próximo dia), os papéis de Vigia e Eco se invertem.
- **Modo Baralho Único (Presencial):** Os dois usam um único maço na mesa/bolso; um puxa de cima e o outro puxa de baixo.
- **Modo Solo (Diário / Oráculo):** O jogador saca 1 carta do topo (Evento) e 1 carta do fundo (Como ele reage/complicação) a cada janela de tempo.

---

## 3. Os 3 Temas Completos (54 Cartas cada)

O sistema será entregue com **3 temas completos** (totalizando **162 cartas** geradas de forma determinística e rica, além de editáveis no Estúdio):

1. **🧟 Apocalipse Zumbi — *"Zona de Quarentena"***
   - **Tom:** Sobrevivência urbana, escassez, tensão silenciosa e desconfiança.
   - **Vocações (`K/Q/J`):**
     - `♠` *O Batedor de Cinzas* (Rádio de Curto Alcance / Mordida Oculta)
     - `♥` *A Médica de Trincheira* (Soro Experimental / Febre de Contato)
     - `♦` *O Saqueador de Telhados* (Chave-Mestra / Mochila Rasgada)
     - `♣` *O Paciente Zero Latente* (Sentido da Horda / Fome Incontrolável)

2. **🧛 Vampiros — *"Sangue & Néon (Noite Eterna)"***
   - **Tom:** Intriga gótica urbana, sede, pactos, caçadores da Inquisição e máscara social.
   - **Vocações (`K/Q/J`):**
     - `♠` *O Carrasco da Corte* (Lâmina de Prata Consagrada / Marca de Caçado)
     - `♥` *A Musa do Elísio* (Olhar Hipnótico / Sede Rubra)
     - `♦` *O Mercador de Memórias* (Frasco de Vitae Antigo / Dívida de Sangue)
     - `♣` *O Oráculo Nosferatu* (Manto de Sombras / Vozes do Abismo)

3. **🌑 Fim do Mundo — *"O Último Eclipse"***
   - **Tom:** Surrealismo apocalíptico, anomalias gravitacionais, memórias se apagando e despedida poética antes do colapso solar.
   - **Vocações (`K/Q/J`):**
     - `♠` *O Guardião do Farol* (Lanterna de Fogo Frio / Olhos de Cinza)
     - `♥` *A Cronista das Últimas Horas* (Fita Cassete Intacta / Esquecimento)
     - `♦` *O Cartógrafo da Fenda* (Bússola de Mercúrio / Vertigem Temporal)
     - `♣` *O Profeta da Estrela Negra* (Relógio Quebrado / Eco de Outra Vida)

---

## 4. Arquitetura do Estúdio Web & Entregáveis

Construiremos uma aplicação web moderna (Vite + TypeScript + HTML/CSS com estética escura de TCG/Mesa de Jogo, zero dependência de backend externo e persistência em `localStorage` + exportação/importação JSON) organizada em **4 módulos principais**:

### 4.1. Módulo 1: Galeria & Editor de Cartas (Formato Magic `63×88mm`)
- Seletor dos **3 Temas** (*Zona de Quarentena*, *Sangue & Néon*, *O Último Eclipse*) + opção de criar/duplicar tema customizado.
- Filtro por tipo de carta: **Trio de Bolso (`K, Q, J`)**, **Cartas de Jornada (`A–10` por naipe)** e **Coringas**.
- **Renderizador Fiel `63×88mm` (Frame Magic):**
  - Barra de título com nome da carta + custo/índice de baralho (`7♠`, `K♥`).
  - Ilustração vetorial/procedural temática (SVG dinâmico por naipe, valor e tema, mais suporte a URL/upload de imagem customizada).
  - Linha de tipo (*Carta de Jornada — Ameaça* ou *Lenda — Arquétipo*).
  - Caixa de texto dividida claramente entre **☀ Topo (Vigia)** e **☾ Fundo (Eco)** (ou regras de `K/Q/J`).
  - Rodapé de colecionador com código do tema, numeração (`01/54`) e ícone de raridade.
- **Painel de Edição ao Vivo:** Clicar em qualquer carta permite editar título, gatilho real, evento, reação, texto de sabor (*flavor text*) e arte, salvando instantaneamente no navegador ou exportando o deck em `.json`.

### 4.2. Módulo 2: Mesa de Jogo & "Cifra do Dia" (Simulador Sincronizado)
- **Gerador da Cifra do Dia:** Insira uma data (ou palavra-semente) para ver:
  1. As instruções passo a passo de como embaralhar o baralho físico para igualar com o parceiro.
  2. A mesa interativa onde você escolhe seu Arquétipo (`♠, ♥, ♦, ♣`), controla o estado da sua **Dama (`Q` — De pé / Virada `⟳`)** e do seu **Valete (`J` — Oculto / Ativo)**, e pode **Sacar do Topo (☀ Vigia)** ou **Sacar do Fundo (☾ Eco)** com histórico da partida.

### 4.3. Módulo 3: Estúdio de Impressão (Print & Play A4 `63×88mm`)
- Folhas prontas para impressão (`@media print` calibrado em milímetros reais):
  - **Grid 3×3 por página A4** (9 cartas por folha no tamanho exato `63mm × 88mm` com marcas de corte e borda de sangria para colocar em sleeves de Magic na frente de uma carta comum).
  - Opção de imprimir **Apenas o Trio de Personagem (`K/Q/J`)**, **Um Naipe específico** ou o **Baralho Completo de 54 cartas (6 páginas A4)** + verso opcional.

### 4.4. Módulo 4: Guia de Oráculo & Livro de Regras (Para Jogar com Baralho Comum)
- Visualização compacta em formato de **Manual de Bolso / Zine**:
  - Resumo completo das regras de jogo, ritmos (1/hora vs. 1/dia) e ritual de sincronia.
  - **Tabela de Oráculo Rápida (`A–K` + Coringas):** Permite que dois jogadores usando apenas um baralho tradicional de R$ 10 consultem rapidamente no celular ou em uma folha impressa o significado de qualquer carta sacada.

---

## 5. Estrutura de Arquivos do Projeto

```text
/Users/antoniorafael/workspace/projects/cardgame/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── main.ts                 # Inicialização e navegação entre os 4 módulos
│   ├── types/
│   │   └── card.ts             # Tipos de Carta, Tema, Estado de Jogo e Cifra
│   ├── data/
│   │   ├── engine-deck.ts      # Construtor determinístico de baralhos de 54 cartas
│   │   ├── theme-zombies.ts    # Tema 1 completo: Apocalipse Zumbi (54 cartas)
│   │   ├── theme-vampires.ts   # Tema 2 completo: Vampiros / Noite Eterna (54 cartas)
│   │   └── theme-eclipse.ts    # Tema 3 completo: Fim do Mundo / Eclipse (54 cartas)
│   ├── core/
│   │   ├── cipher.ts           # Algoritmo da "Cifra do Dia" (seed física + digital)
│   │   └── storage.ts          # Persistência localStorage + Import/Export JSON
│   ├── components/
│   │   ├── card-renderer.ts    # Renderizador HTML/SVG do Frame Magic (63x88mm)
│   │   ├── studio-view.ts      # Galeria, filtros e editor ao vivo de cartas
│   │   ├── playtest-view.ts    # Mesa de jogo, controle K/Q/J e saque Topo vs. Fundo
│   │   ├── print-view.ts       # Folhas A4 3x3 (63x88mm) com marcas de corte
│   │   └── oracle-view.ts      # Livro de regras + Guia de referência para baralho comum
│   └── styles/
│       ├── main.css            # Tema visual dark TCG + layout do estúdio
│       ├── card-magic.css      # Geometria 63x88mm, molduras por naipe e tipografia
│       └── print.css           # Regras @media print exatas em milímetros (A4 3x3)
└── tests/
    ├── cipher.test.ts          # Testes de determinismo da Cifra do Dia e cortes
    └── deck.test.ts            # Validação de integridade das 54 cartas dos 3 temas
```

---

## 6. Critérios de Sucesso e Verificação

1. **Integridade dos Baralhos:** Cada um dos 3 temas deve conter exatamente 54 cartas únicas (`40 de Jornada` + `12 Figuras K/Q/J` + `2 Coringas`), todas com gatilho real, evento de topo e reação de fundo preenchidos em português.
2. **Sincronia Determinística:** Dois jogadores aplicando a mesma data na `Cifra do Dia` devem obter exatamente a mesma sequência de 42 cartas no Deck do Mundo.
3. **Precisão Física (`63×88mm`):** O modo Print & Play deve gerar páginas de 9 cartas (`3×3`) dimensionadas em `63mm × 88mm` no CSS de impressão (`@media print`), ocultando menus e controles da interface.
4. **Edição e Persistência:** Qualquer alteração feita numa carta dentro do Estúdio deve refletir imediatamente na Galeria, na Folha de Impressão, no Guia de Oráculo e na Mesa de Jogo, persistindo após recarregar a página.
