# LIMIAR — O Jogo que Ultrapassa a Mesa (Edição Revisada 1.1 · 63×88mm)

![Limiar — O Jogo que Ultrapassa a Mesa](./public/limiar-banner.png)

**Limiar** (*anteriormente nome de trabalho: Sinaleiro*) é um RPG narrativo cooperativo na vida real (*pervasive tabletop card game*) em que sinais do cotidiano disparam cenas de uma aventura compartilhada. Um jogador observa e narra (**☀ Vigia**); o outro reage (**☾ Eco**). A história continua entre uma rodada e outra, dentro do ritmo normal da vida — usando qualquer baralho de **54 cartas** (52 tradicionais + 2 Coringas) ou cartas impressas no tamanho padrão de Magic/Poker (**63mm × 88mm**), acompanhado de um **Estúdio Web, Mesa Digital Sincronizada, Guia de Oráculo e Gerador Print & Play A4**.

> 📖 **Quer o manual completo (Edição Revisada 1.1) em um único arquivo?** Consulte [**LIVRO_COMPLETO_LIMIAR.md**](./LIVRO_COMPLETO_LIMIAR.md) (ou [**LIVRO_COMPLETO_SINALEIRO.md**](./LIVRO_COMPLETO_SINALEIRO.md)) — com todas as regras revisadas 1.1, ordem de prioridade de 7 passos, segurança na vida real, marcos de campanha e os **3 Oráculos Completos (162 cartas)**.

---

## Como o Jogo Funciona (Edição Revisada 1.1)

O baralho de 54 cartas é dividido antes da partida em duas partes:

### 1. Seu Trio de Bolso (12 Figuras: `K`, `Q`, `J`)
Cada jogador escolhe um naipe que define sua vocação (`♠ Espadas`, `♥ Copas`, `♦ Ouros` ou `♣ Paus`) e separa as **3 Figuras daquele naipe** para levar consigo:
- **Rei (`K`) — Identidade (Sempre aberto):** Fica aberto durante toda a campanha. Oferece uma interpretação temática para a rotina (**convite narrativo, não obrigação**) e concede a **Sinergia de Naipe** descrita na carta.
- **Dama (`Q ⟳`) — Proteção (Começa aberta e pronta):** Recurso individual e limitado. Gire-a 90° (`⟳ Tap`) para ativar seu efeito ou evitar uma consequência quando permitido. Uma Dama deitada está esgotada até ser recarregada — como regra-base, **cumprir com sucesso qualquer carta de `♦ Ouros` (de Ás a 10)** recarrega a Dama do jogador que realizou a ação.
- **Valete (`J`) — Cicatriz e Colapso (Começa fechado):** Revelado ao sofrer uma falha grave sem Dama pronta (ou quando um efeito determinar). Quando aberto, ativa um **Tabu somente dentro das interações do jogo** até ser curado. Se uma nova falha exigir revelar/agravar um Valete já ativo enquanto sua Dama está esgotada, o personagem entra em **Colapso** (podendo ser salvo pela Dama pronta do parceiro em jogo cooperativo).

### 2. O Deck do Mundo (42 Cartas: `Ás` a `10` + 2 Coringas)
As 40 cartas numeradas e os 2 Coringas (`★ Coringa Claro` e `💀 Coringa Escuro`) formam o baralho de eventos.

- **Partida à Distância (Cifra do Dia `DD/MM`):** Sincroniza a ordem inicial de dois baralhos independentes em 3 passos (Ordem-base → Corte do Dia em 3 montes → Corte do Mês em 2 montes) sem precisar de aplicativo ou chamada de vídeo.
- **Dupla Câmara (`☀ Topo · Vigia` vs. `☾ Fundo · Eco`):**
  - **☀ Primeiro Papel — Vigia (Topo):** Retira a carta do topo do próprio baralho e lê apenas a coluna **☀ Topo**. Aguarda o gatilho por **até 2 horas** (ou usa um gatilho substituto simples e seguro; ou adia sem penalidade) e narra o evento ficcional ao parceiro.
  - **☾ Segundo Papel — Eco (Fundo):** Retira a carta disponível no fundo do próprio baralho e lê apenas a coluna **☾ Fundo**. Aplica a reação sugerida à cena narrada pelo Vigia.
  - **Ficção em 1º Lugar & Segurança:** Toda ação física (foto, áudio, toque, deslocamento) é opcional de ambientação e pode ser substituída por uma descrição ou escolha narrada. Qualquer jogador pode dizer **"pausa"** ou **"passo"** a qualquer momento sem penalidade.
  - **Alternância:** Na rodada seguinte, os papéis se invertem.

---

## Três Universos Inclusos (162 Cartas em Português)

1. **Zona de Quarentena (`zombies`):** Apocalipse Zumbi — Sobrevivência Urbana (54 cartas).
2. **Sangue & Néon (`vampires`):** Vampiros — Crônica da Noite Eterna (54 cartas).
3. **O Último Eclipse (`eclipse`):** Fim do Mundo — Crônica da Coroa Solar (54 cartas).

Todas as 54 cartas de cada tema podem ser editadas ao vivo no **Estúdio**, salvas automaticamente no navegador (`localStorage`) e exportadas/importadas em JSON.

---

## Funcionalidades da Aplicação Web

- **Como Começar (Manual v1.1 + Guia Rápido):** Arte oficial de **Limiar**, passo a passo de início, simulação prática com as cartas do dia (Em Dupla e Modo Solo), explicação detalhada de `K`, `Q` e `J`, Ordem de Prioridade (7 passos), Duração de Campanha (6, 12 ou 18 rodadas) e Regras de Segurança.
- **Mesa & Cifra do Dia:** Simulador sincronizado para jogar pelo celular/computador (em dupla ou solo), com controle de virar Dama (`Q ⟳`), ativar Valete (`J`), sacar do Topo/Fundo e histórico de turnos.
- **Estúdio & Editor (63×88mm):** Galeria das 54 cartas com filtro por naipe e editor ao vivo. Clicar em qualquer carta selecionada abre o **Modal de Leitura Ampliada**.
- **Guia de Oráculo (Baralho Comum):** Tabelas didáticas passo a passo para jogar usando qualquer baralho físico tradicional de 54 cartas.
- **Print & Play A4:** Paginação automática em grades `3 × 3` (9 cartas por folha A4, 6 páginas no total) nas medidas exatas `63mm × 88mm` com marcas de corte para impressão (`Ctrl+P` / `Cmd+P`).

---

## Desenvolvimento

### Pré-requisitos
- Node.js 18+ e npm

### Comandos

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento (Vite)
npm run dev

# Executar suíte de testes automatizados (Vitest)
npm test

# Gerar build de produção (TypeScript + Vite)
npm run build
```
