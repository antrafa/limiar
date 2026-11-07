# Sinaleiro — RPG de Cartas na Vida Real (63×88mm)

**Sinaleiro** é um RPG de cartas *pervasivo* (jogado misturado à rotina da vida real, presencialmente ou à distância) projetado para um baralho de **54 cartas** (52 tradicionais + 2 Coringas) no formato clássico de Magic/Poker (**63mm × 88mm**), acompanhado de um **Estúdio Web, Mesa Digital Sincronizada, Guia de Oráculo e Gerador Print & Play A4**.

---

## Como o Jogo Funciona ("Sinaleiro & Relógio")

O baralho de 54 cartas é dividido antes da partida em duas partes:

### 1. Seu Trio de Bolso (12 Figuras: `K`, `Q`, `J`)
Cada jogador escolhe um naipe que define sua vocação (`♠ Espadas`, `♥ Copas`, `♦ Ouros` ou `♣ Paus`) e separa as **3 Figuras daquele naipe** para levar consigo:
- **Rei (`K`) — O Arquétipo (Sempre aberto):** É a sua identidade no jogo. Traz um **Hábito Passivo na Vida Real** para manter durante o dia e uma **Sinergia de Naipe** (vantagem automática sempre que sair uma carta do seu naipe).
- **Dama (`Q ⟳`) — O Trunfo (Começa em pé):** É o seu recurso de emergência. Se você não puder cumprir a tarefa de uma rodada na vida real ou quiser cancelar um perigo/custo, **vire sua Dama em 90° (`⟳ Tap`)** para ativar seu efeito especial e vencer a cena sem punição. Ela volta a ficar em pé (`Untap`) quando você cumprir sua regra de recarga na rotina.
- **Valete (`J`) — A Cicatriz (Começa virado para baixo):** Se você falhar numa rodada e sua Dama já estiver gasta (deitada), você revela seu Valete. Enquanto ele estiver aberto, você carrega um **Tabu na Vida Real** (uma restrição real de fala ou comportamento nas interações). Se quebrar o Tabu ou falhar novamente com a Dama deitada e o Valete aberto, seu personagem entra em colapso na cena e precisa ser salvo pela Dama (`Q ⟳`) do parceiro.

### 2. O Deck do Mundo (42 Cartas: `Ás` a `10` + 2 Coringas)
As 40 cartas numéricas e os 2 Coringas (`★ Presságio da Luz` e `💀 Cataclismo`) formam o baralho de eventos.

- **Sincronia Fria (Cifra do Dia `DD/MM`):** Quando dois jogadores estão longe um do outro, ambos ordenam o Deck do Mundo e aplicam um embaralhamento determinístico de 3 passos baseado no dia e mês atuais (ou usam a mesma data na aba **Mesa & Cifra do Dia**). Os dois baralhos ficam exatamente na mesma ordem sem precisar de mestre ou internet constante.
- **Dupla Câmara (`☀ Topo · Vigia` vs. `☾ Fundo · Eco`):**
  - **☀ Jogador A (Vigia):** Puxa a **1ª carta do TOPO** e lê apenas o bloco superior. Quando o **Gatilho Real** acontecer ao seu redor na rotina, ele narra o evento ao parceiro.
  - **☾ Jogador B (Eco):** Puxa a **última carta do FUNDO** e lê apenas o bloco inferior. Ele realiza a **Interação Real** proposta para socorrer o Vigia e aplica o desfecho.
  - Na rodada seguinte (próxima hora ou próximo turno do dia), os papéis se invertem.
- **Modo Solo (Diário / Oráculo):** Um único jogador saca simultaneamente **1 carta do TOPO** (o gatilho e o evento do mundo) e **1 carta do FUNDO** (a reação prática que precisa cumprir e registrar em seu diário/notas de voz).

---

## Temas Inclusos (54 Cartas Completas em Português)

1. **Zona de Quarentena (`zombies`):** Apocalipse Zumbi — Sobrevivência Urbana.
2. **Sangue & Veludo (`vampires`):** Vampiros na Metrópole — Intriga Gótica e Sede.
3. **Crônicas do Eclipse (`eclipse`):** Fantasia Sombria — Magia Antiga Infiltrada no Mundo Moderno.

Todas as 54 cartas de cada tema podem ser editadas ao vivo no **Estúdio**, salvas automaticamente no navegador (`localStorage`) e exportadas/importadas em JSON.

---

## Funcionalidades da Aplicação Web

- **Como Começar (Guia Rápido):** Passo a passo em 4 etapas + simulação prática com as cartas do dia (Em Dupla, Modo Solo e explicação detalhada de `K`, `Q` e `J`).
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
