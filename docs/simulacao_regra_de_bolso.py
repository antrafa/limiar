"""Simulação Monte Carlo da Regra de Bolso v0.4 (Limiar como lente do dia).

Uso: python3 docs/simulacao_regra_de_bolso.py
Cada cena tem dois donos: quem vive vira o topo do PRÓPRIO baralho; o Eco vira o fundo do baralho DELE (o desfecho).
diferença = fundo + bônus - topo:  >= 1 vitória · -2..0 vitória com custo · <= -3 derrota.
"""
import random
from itertools import combinations_with_replacement

NAIPES = "♠♥♦♣"
REGRA = dict(
    folego=3, ameaca_por_pessoa=5, meta_por_pessoa=30,
    sinal=2, gesto=1, rei=1, ajuda=2, valete=3,
    chefe_vida_base=2, chefe_valor=8,
)


def baralho():
    cartas = [(v, n) for n in NAIPES for v in range(2, 12)]  # Ás vale 11
    cartas += [("★", None), ("💀", None)]
    random.shuffle(cartas)
    return cartas


class Frente:
    def __init__(self, classe):
        self.classe, self.cartas = classe, baralho()
        self.folego, self.folego_max = REGRA["folego"], REGRA["folego"]
        self.dama, self.valete = True, True


class Jogo:
    def __init__(self, classes, p_sinal, p_gesto):
        self.f = [Frente(c) for c in classes]
        self.n = len(self.f)
        self.meta = REGRA["meta_por_pessoa"] * self.n
        self.ameaca_max = REGRA["ameaca_por_pessoa"] * self.n
        self.p_sinal, self.p_gesto = p_sinal, p_gesto
        self.ameaca = self.trofeus = self.caveiras = 0
        self.ajudas = self.cenas = 0

    def puxar(self, f, de_baixo):
        """Puxa do topo ou do fundo; Coringas resolvem na hora e puxam outra."""
        while f.cartas:
            carta = f.cartas.pop() if de_baixo else f.cartas.pop(0)
            if carta[0] == "★":
                f.folego = min(f.folego_max, f.folego + 1)
                f.dama = True
            elif carta[0] == "💀":
                self.ameaca += 1
                self.caveiras += 1
            else:
                return carta
        return None

    def bonus_do_dia(self):
        b = REGRA["sinal"] if random.random() < self.p_sinal else 0
        return b + (REGRA["gesto"] if random.random() < self.p_gesto else 0)

    def eco(self, i):
        """Quem vira o desfecho: outra pessoa; sozinho, o próprio baralho."""
        return self.f[i] if self.n == 1 else self.f[(i + 1) % self.n]

    def pedir_ajuda(self, i, alvo):
        outros = [f for j, f in enumerate(self.f) if j != i and f.folego >= 2]
        if alvo < 8 or not outros:
            return 0
        par = max(outros, key=lambda f: f.folego)
        par.folego -= 1
        self.ajudas += 1
        return REGRA["ajuda"]

    def usar_valete(self, f, alvo):
        if not f.valete or alvo < 10:
            return 0
        f.valete = False
        f.folego_max -= 1
        f.folego = min(f.folego, f.folego_max)
        return REGRA["valete"]

    def desfecho(self, i, alvo, bonus):
        """O Eco vira o fundo do baralho dele. Devolve 'vitoria', 'custo', 'derrota' ou None."""
        f, eco = self.f[i], self.eco(i)
        fundo = self.puxar(eco, de_baixo=True)
        if fundo is None:
            return None
        d = fundo[0] + bonus - alvo
        if d <= -3 and f.dama:
            f.dama = False
            fundo = self.puxar(eco, de_baixo=True)
            if fundo is None:
                return None
            d = fundo[0] + bonus - alvo
        if d >= 1:
            return "vitoria"
        return "custo" if d >= -2 else "derrota"

    def ferir(self, i):
        f = self.f[i]
        f.folego -= 1
        self.ameaca += 1
        if f.folego > 0:
            return True
        quem_levanta = [o for j, o in enumerate(self.f) if j != i and o.dama]
        if not quem_levanta:
            return False
        quem_levanta[0].dama = False
        f.folego = 1
        return True

    def poder(self, i):
        f, par = self.f[i], self.eco(i)
        if f.classe == "♠":
            self.ameaca = max(0, self.ameaca - 1)
        elif f.classe == "♥":
            alvo = f if f.folego <= par.folego else par
            alvo.folego = min(alvo.folego_max, alvo.folego + 1)
        elif f.classe == "♦":
            alvo = f if not f.dama else par
            alvo.dama = True
        elif f.classe == "♣" and len(par.cartas) >= 2:
            # o parceiro conta o próprio fundo; fundo baixo vai para o meio do baralho
            fundo = par.cartas[-1]
            if fundo[1] and fundo[0] <= 5:
                par.cartas.insert(random.randrange(len(par.cartas) - 1), par.cartas.pop())

    def cena(self, i):
        f = self.f[i]
        topo = self.puxar(f, de_baixo=False)
        if topo is None:
            return False
        valor, naipe = topo
        self.cenas += 1
        bonus = self.bonus_do_dia() + (REGRA["rei"] if naipe == f.classe else 0)
        bonus += self.pedir_ajuda(i, valor) + self.usar_valete(f, valor)
        res = self.desfecho(i, valor, bonus)
        if res is None:
            return False
        if res == "derrota":
            return self.ferir(i)
        self.trofeus += valor
        if res == "custo":
            self.ameaca += 1
        if naipe == f.classe:
            self.poder(i)
        return True

    def chefe(self):
        vida = REGRA["chefe_vida_base"] + self.n + self.caveiras
        valor = REGRA["chefe_valor"] + self.caveiras
        i = 0
        while vida > 0:
            if self.ameaca >= self.ameaca_max:
                return False
            bonus = self.bonus_do_dia() + self.pedir_ajuda(i, valor)
            res = self.desfecho(i, valor, bonus)
            if res is None:
                return False
            if res == "derrota":
                if not self.ferir(i):
                    return False
            else:
                vida -= 1
                if res == "custo":
                    self.ameaca += 1
            i = (i + 1) % self.n
        return True

    def jogar(self):
        i = 0
        while self.trofeus < self.meta:
            if not self.cena(i) or self.ameaca >= self.ameaca_max:
                return False
            i = random.randrange(self.n)  # ritmo livre: qualquer um abre a próxima cena
        return self.chefe()


def taxa(classes, p_sinal, p_gesto, n=4000):
    vitorias = cenas = ajudas = 0
    for _ in range(n):
        j = Jogo(classes, p_sinal, p_gesto)
        vitorias += j.jogar()
        cenas += j.cenas
        ajudas += j.ajudas
    return vitorias / n, cenas / n, ajudas / n


def por_grupo(n, p_sinal, p_gesto, partidas=6000):
    vitorias = cenas = 0
    for _ in range(partidas):
        j = Jogo([random.choice(NAIPES) for _ in range(n)], p_sinal, p_gesto)
        vitorias += j.jogar()
        cenas += j.cenas
    return vitorias / partidas, cenas / partidas


if __name__ == "__main__":
    random.seed(4)
    print("pessoas | corrido | normal | atento | cenas (normal)")
    for n in (1, 2, 3, 4):
        linha = [por_grupo(n, p, p) for p in (0.2, 0.5, 0.8)]
        print(f"{n:7} | " + " | ".join(f"{v:.0%}" for v, _ in linha) + f" | {linha[1][1]:.1f}")
    print("\npor dupla de classes (dia normal):")
    for d in combinations_with_replacement(NAIPES, 2):
        print("".join(d), f"{taxa(d, 0.5, 0.5, 3000)[0]:.0%}")
