# AGENTS.md — Guia de Arquitetura e Convenções do Projeto Limiar

Este documento descreve a arquitetura, regras do jogo (Regra de Bolso v0.4), estrutura de arquivos e padrões técnicos do projeto **Limiar — O Jogo que Ultrapassa a Mesa** (*anteriormente nome de trabalho: Sinaleiro*). Agentes de IA e pessoas desenvolvedoras devem seguir estas diretrizes ao modificar o repositório.

---

## 1. Visão Geral do Domínio

**Limiar** é um RPG cooperativo de cartas jogado dentro da rotina, para 1 a 4 pessoas, ao vivo ou a distância. A regra vigente é a **Regra de Bolso v0.4** (`Limiar_Regra_de_Bolso.md`); o motor fica em `src/core/partida.ts`.

### Invariantes
1. **O dia é a aventura.** Uma cena é algo da vida real: o topo do baralho de quem vive diz o que ela é na história; o fundo do baralho do Eco diz como terminou. Não há mão de cartas nem compra.
2. **Nada se resolve sozinho.** Com 2+ pessoas, o desfecho exige a frase de quem vive (`declarar`) e a leitura do Eco (`ler`); o sinal só vale depois que o Eco confirma (`confirmarSinal`). Sozinho, a pessoa é o próprio Eco.
3. **Regra universal, tema só nomeia.** Classes, números e efeitos vivem em `partida.ts`. Um tema (`src/data/theme-*.ts`) dá nome, tom (`tom`), Ideia (`dailyIdea`), História (`topWatcherEvent`), Sinal (`topWatcherTrigger`), Gesto (`bottomEchoPrompt`) e o chefe (`chefe`). Tema novo: crie o arquivo seguindo `theme-eclipse.ts`, acrescente o id em `ThemeId` e registre em `src/data/index.ts`; `tests/deck.test.ts` confere as 54 cartas e a neutralidade do texto.
4. **Texto de carta neutro.** História, Sinal e Gesto servem a qualquer número de pessoas: não falam de parceiro, dupla ou "vocês". A interface também não pressupõe quem são os jogadores.
5. **Números calibrados.** `REGRA` em `partida.ts` espelha `docs/simulacao_regra_de_bolso.py`. Mudou um número? Rode a simulação e atualize a regra em markdown.
6. **Motor puro.** `agir(partida, acao, { quando })` devolve uma nova partida; ação inválida devolve a mesma referência. A UI só despacha ações (`data-acao`) e redesenha.
7. **Exemplo sempre válido.** O exemplo (`src/data/partida-exemplo.ts`) roda no motor; se uma regra mudar e o roteiro quebrar, `tests/exemplo.test.ts` falha. Ajuste o roteiro e o markdown, não o teste.
8. Os campos `bottomEchoEffect`, `figurePassiveOrRule` e `figureSpecialOrTaboo` dos temas são da regra antiga e não aparecem na interface.

---

## 2. Estrutura do Repositório

```text
src/
├── types/card.ts              # GameCard, ThemeDeck (com chefe)
├── core/
│   ├── partida.ts             # Motor da Regra de Bolso v0.4: cenas, papéis, desfecho, classes, textos de regra
│   └── storage.ts             # localStorage: overrides de cartas, tema ativo, partida em andamento, JSON
├── data/                      # engine-deck.ts + 11 temas de 54 cartas, registrados em index.ts (padrão: eclipse, `DEFAULT_THEME_ID`)
│   └── partida-exemplo.ts     # Roteiro da partida de exemplo, encenado pelo motor (validado em tests/exemplo.test.ts)
├── components/
│   ├── card-renderer.ts       # Carta 63×88mm (cena com valor, História, Sinal e Gesto; figuras com a regra da classe) + modal
│   ├── quickstart-view.ts     # Como jogar
│   ├── temas-view.ts          # Temas: catálogo dos mundos com tom, naipes, chefe e escolha
│   ├── exemplo-view.ts        # Primeira partida: tutorial de 5 minutos + exemplo cena a cena (carta, conversa, desfecho)
│   ├── playtest-view.ts       # Mesa de jogo: 1 a 4 pessoas, cena passo a passo, chefe, diário e linha de status
│   ├── oracle-view.ts         # Referência rápida para jogar com cartas físicas
│   ├── studio-view.ts         # Cartas e editor
│   ├── print-view.ts          # Folhas A4 3×3 com marcas de corte, régua, calibração, fundos e frente e verso
│   └── scanner.ts             # Código QR da carta (valor e naipe, sem tema) e escaneador pela câmera
├── styles/                    # main.css (app), card-magic.css (carta), print.css (A4)
└── main.ts                    # Estado do app e ligação de eventos
tests/                         # partida (motor), exemplo, deck, storage, renderer, app-integration
docs/simulacao_regra_de_bolso.py  # Simulação Monte Carlo usada para calibrar a regra
```

---

## 3. Diretrizes de UI, CSS e Impressão

- **Estética Visual:** Manter visual **limpo, neutro e sóbrio** (tons de papel/pedra `#f5f4f0`, superfícies brancas `#ffffff`, tinta grafite `#18181b`, cartas em marfim `#faf9f5` com borda fosca `#27272a`). Não utilizar temas neon ou fundos escuros pesados. Os tokens vivem no `:root` de `main.css`: o bronze `--accent` marca só progresso e decisão (placar, rótulo, ajuda); a fonte Cinzel fica restrita à marca e aos títulos de página, o resto é Inter.
- **Segurança HTML:** Todo texto vindo de `GameCard` (já que o usuário pode editá-lo no Estúdio ou importar JSON) deve passar por `escapeHtml()` antes de ser interpolado em templates HTML.
- **Modal de Leitura (`<dialog>`):**
  - Usar sempre o elemento nativo `<dialog id="card-zoom-dialog" closedby="any" aria-labelledby="zoom-dialog-title">` aberto via `.showModal()`.
  - Manter o fallback de `pointerdown` + `pointerup` com `getBoundingClientRect()` em `src/main.ts` para navegadores sem suporte nativo a `closedBy`.
  - Manter `overscroll-behavior: contain` em `dialog:modal` e `overflow: hidden; overscroll-behavior: contain;` em `dialog::backdrop`.
- **Código da carta:** `LIMIAR:<valor><naipe>` (ex.: `LIMIAR:7S`), coringas `LIMIAR:X1`/`X2`. Nunca leva o tema: a carta escaneada abre no tema ativo. Única dependência de produção: `qrcode-generator` (gera o QR; o navegador não tem gerador nativo). A leitura usa o `BarcodeDetector` nativo, com teclado de valor e naipe quando ele não existe.
- **Impressão A4 (`@media print`):**
  - Cada `.folha-a4` (210 × 297 mm) tem no máximo **9 cartas (3 × 3)** de exatos `63mm × 88mm`, encostadas e centralizadas, com 16 marcas de corte fora da grade e a régua de 5 cm no rodapé.
  - No modo frente e verso, a folha de fundos espelha as colunas (vira pela borda longa) e só tem fundo onde há carta na frente.
  - Elementos de navegação e controles devem possuir a classe `.no-print`.

---

## 4. Fluxo de Trabalho e Verificação

Antes de concluir qualquer alteração ou realizar um commit:

1. Execute os testes automatizados:
   ```bash
   npm test -- --run
   ```
2. Verifique a tipagem TypeScript e o bundle de produção:
   ```bash
   npm run build
   ```
3. Toda nova funcionalidade de visualização ou regra de baralho deve vir acompanhada de testes em `tests/`.
