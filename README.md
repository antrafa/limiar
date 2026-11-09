# Limiar

![Limiar](./public/limiar-banner.png)

**Limiar** é um RPG cooperativo de cartas jogado dentro da rotina. O seu dia é a aventura: você vira uma carta, escolhe o que do seu dia ela vai ser (a reunião, o trânsito, o jantar) e vive normalmente. Quando aquilo acaba, uma carta diz como a história terminou. Sozinho, em dupla ou em grupo de até 4, juntos ou a distância, sem hora marcada.

A regra completa: [**Limiar_Regra_de_Bolso.md**](./Limiar_Regra_de_Bolso.md) (v0.4), com um dia de exemplo.

## Como se joga, em resumo

1. **Um baralho comum por pessoa.** O Rei, a Dama e o Valete do naipe da sua classe são o Trio de Bolso; Ás a 10 e os 2 Coringas são o seu baralho.
2. **Toda cena tem dois papéis:** quem **vive** e o **Eco** (em dupla, a outra pessoa; em grupo, quem responder primeiro; sozinho, você mesmo). Com duas pessoas ou mais, nada se resolve sozinho.
3. **Abra uma cena quando quiser:** vire o topo e diga o que do seu dia ela é. O Eco lê a História da carta e liga à sua situação (a leitura).
4. **Viva:** o sinal da carta vale +2 quando o Eco confirma; o gesto vale +1. Os dois são convites, nunca tarefas.
5. **Desfecho:** quando aquilo acaba, o Eco vira o fundo do baralho dele. Fundo + bônus contra o topo: vitória, vitória com custo ou a cena vence. O Eco narra.
6. **Campanha:** 30 troféus por pessoa chamam o chefe do tema; 5 de Ameaça por pessoa é derrota.

Os números foram calibrados com `docs/simulacao_regra_de_bolso.py`: quando sinal e gesto aparecem em metade das cenas, o grupo vence cerca de 6 em cada 10 campanhas, com qualquer número de pessoas.

## O app

- **Como jogar:** a regra explicada a partir de uma cena.
- **Temas:** os 11 mundos, com tom, naipes, chefe e uma cena de amostra; escolha um para jogar.
- **Primeira partida:** tutorial de 5 minutos, cola de bolso e uma segunda-feira inteira de exemplo, cena por cena (a carta, a conversa e o desfecho), encenada pelo motor do jogo.
- **Mesa de jogo:** campanha de 1 a 4 pessoas. Cada cena avança passo a passo (declarar, leitura, sinal confirmado, gesto, ajuda, desfecho, narração), com diário e linha de status para colar na conversa.
- **Referência rápida:** desfecho, bônus, número de pessoas, classes e as 40 cenas do tema, para jogar com baralho comum.
- **Cartas e editor:** as 54 cartas do tema, com editor de nome, História, Sinal, Gesto e ambientação.
- **Imprimir:** folhas A4 com 9 cartas de 63 × 88 mm encostadas, 16 marcas de corte contínuas, régua de 5 cm para conferir a escala e calibração +3,63% para impressoras que reduzem. Fundo das cartas em 3 estampas (Portal, Cor do tema, Papel) e modo frente e verso, com a folha de fundos espelhada. Cada carta pode levar um código QR para o escaneador.
- **Escanear carta** (botão no topo): a câmera lê o código da carta impressa e abre a carta no tema ativo. Usa o leitor nativo do navegador (Chrome no Android, em endereço https); sem ele, um teclado de valor e naipe faz o mesmo.

Onze temas vêm prontos, escolhidos na página **Temas**: O Último Eclipse (fim do mundo, o padrão), Zona de Quarentena (zumbis), Sangue & Néon (vampiros), Expedição ao Desconhecido, Noir de Cidade Chuvosa, Estação Orbital, Academia de Artes Arcanas, Mar de Corsários, Kaiju na Cidade, Contos da Floresta Antiga e Neon e Silício. Um tema só dá nome às coisas: o motor conhece naipes e números.

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
