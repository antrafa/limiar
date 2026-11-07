# AGENTS.md — Guia de Arquitetura e Convenções do Projeto Sinaleiro

Este documento descreve a arquitetura, regras de negócio, estrutura de arquivos e padrões técnicos do projeto **Sinaleiro**. Agentes de IA e pessoas desenvolvedoras devem seguir estas diretrizes ao modificar o repositório.

---

## 1. Visão Geral do Domínio

**Sinaleiro** é um RPG de cartas na vida real (*pervasive tabletop card game*) baseado em um baralho de **54 cartas** no formato padrão de Magic/Poker (`63mm × 88mm`).

### Invariantes do Sistema de Jogo ("Trio de Bolso & Dupla Câmara")
1. **54 Cartas por Tema (`ThemeDeck`):**
   - **12 Figuras de Bolso (`K, Q, J` de `♠, ♥, ♦, ♣`):**
     - `K` (`archetype_king`): Sempre aberto; define a **Passiva na Vida Real** (`figurePassiveOrRule`) e a **Sinergia de Naipe** (`figureSpecialOrTaboo`).
     - `Q` (`trump_queen`): Começa em pé; pode ser virada em 90° (`⟳ Tap`, `figurePassiveOrRule`) para anular falhas/custos e recarrega via condição real (`Untap`, `figureSpecialOrTaboo`).
     - `J` (`scar_jack`): Começa virado para baixo; entra em jogo ao falhar sem Dama disponível (`figurePassiveOrRule`) e impõe um **Tabu na Vida Real** (`figureSpecialOrTaboo`).
   - **40 Cartas de Jornada (`A` a `10` de `♠, ♥, ♦, ♣`, `kind: 'journey'`) + 2 Coringas (`★` e `💀`, `kind: 'joker'`):**
     - Formam o **Deck do Mundo (42 cartas)**.
     - Cada carta do Deck do Mundo possui **Dupla Câmara**:
       - `topWatcherTrigger` + `topWatcherEvent`: Lidos apenas por quem saca do **TOPO (`☀ Vigia`)**.
       - `bottomEchoPrompt` + `bottomEchoEffect`: Lidos apenas por quem saca do **FUNDO (`☾ Eco`)**.
2. **Cifra do Dia (`applyDailyCipher`):**
   - Deve ser **100% determinística e sem dependências externas**: a mesma lista de 42 cartas e a mesma string de data (`YYYY-MM-DD` ou `DD/MM`) devem produzir exatamente a mesma permutação e os mesmos cortes (`dayCut` de `1..31` em 3 montes; `monthCut` de `1..12` em 2 montes).

---

## 2. Estrutura do Repositório

```text
src/
├── types/
│   └── card.ts                # Tipos centrais (GameCard, ThemeDeck, PlaySessionState, CipherResult)
├── core/
│   ├── cipher.ts              # Algoritmo determinístico da Cifra do Dia (3 passos)
│   └── storage.ts             # Persistência localStorage (overrides de cartas, sessão, JSON import/export)
├── data/
│   ├── engine-deck.ts         # Construtor de baralho de 54 cartas + splitPocketAndWorld()
│   ├── theme-zombies.ts       # Tema 1: Zona de Quarentena (54 cartas pt-BR)
│   ├── theme-vampires.ts      # Tema 2: Sangue & Veludo (54 cartas pt-BR)
│   ├── theme-eclipse.ts       # Tema 3: Crônicas do Eclipse (54 cartas pt-BR)
│   └── index.ts               # Registro e busca dos temas
├── components/
│   ├── card-renderer.ts       # Renderizador da carta 63×88mm + conteúdo do modal ampliado
│   ├── quickstart-view.ts     # Aba "Como Começar" (passo a passo + simulação Dupla/Solo + K/Q/J)
│   ├── playtest-view.ts       # Aba "Mesa & Cifra do Dia" (Trio de Bolso, Topo vs. Fundo, Modo Solo)
│   ├── studio-view.ts         # Aba "Estúdio & Editor" (galeria de 54 cartas + form ao vivo)
│   ├── oracle-view.ts         # Aba "Guia de Oráculo" (tabelas didáticas para baralho comum)
│   └── print-view.ts          # Aba "Print & Play A4" (paginação em folhas de 9 cartas 3×3)
├── styles/
│   ├── main.css               # Estética editorial limpa/sóbria, layout das abas e <dialog> modal
│   ├── card-magic.css         # Frame 63mm × 88mm estilo Magic/editorial em marfim (#faf9f5)
│   └── print.css              # Regras @media print para corte exato em folha A4
└── main.ts                    # Estado da aplicação, eventos de UI e controle do <dialog> de zoom
tests/
├── cipher.test.ts             # Testes unitários da Cifra do Dia
├── deck.test.ts               # Validação estrutural das 54 cartas nos 3 temas
├── storage.test.ts            # Testes de customização, reset e exportação/importação JSON
├── renderer.test.ts           # Testes de renderização de cartas, modal, paginação A4 e Oráculo
└── app-integration.test.ts    # Testes de integração das views (Quickstart, Studio, Playtest)
```

---

## 3. Diretrizes de UI, CSS e Impressão

- **Estética Visual:** Manter visual **limpo, neutro e sóbrio** (tons de papel/pedra `#f5f4f0`, superfícies brancas `#ffffff`, tinta grafite `#18181b`, cartas em marfim `#faf9f5` com borda fosca `#27272a`). Não utilizar temas neon ou fundos escuros pesados.
- **Segurança HTML:** Todo texto vindo de `GameCard` (já que o usuário pode editá-lo no Estúdio ou importar JSON) deve passar por `escapeHtml()` antes de ser interpolado em templates HTML.
- **Modal de Leitura (`<dialog>`):**
  - Usar sempre o elemento nativo `<dialog id="card-zoom-dialog" closedby="any" aria-labelledby="zoom-dialog-title">` aberto via `.showModal()`.
  - Manter o fallback de `pointerdown` + `pointerup` com `getBoundingClientRect()` em `src/main.ts` para navegadores sem suporte nativo a `closedBy`.
  - Manter `overscroll-behavior: contain` em `dialog:modal` e `overflow: hidden; overscroll-behavior: contain;` em `dialog::backdrop`.
- **Impressão A4 (`@media print`):**
  - Cada folha `.print-sheet` deve conter no máximo **9 cartas (`3 colunas × 3 linhas`)** com dimensões físicas exatas de `63mm × 88mm`.
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
