import fs from "fs";

const input = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

const patterns = [
  [5],
  [4, 1],
  [3, 2],
  [3, 1, 1],
  [2, 2, 1],
  [2, 1, 1, 1],
  [1, 1, 1, 1, 1],
];

const cards = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];

const games = input.split("\n").map((e) => {
  const es = e.split(" ");
  return {
    id: Number.parseInt(es[1]),
    cards: es[0],
    score: 0,
  };
});

games.map((game) => {
  const cardsPatternAfterSort = game.cards
    .split("")
    .reduce(
      (count: Record<string, number>, item) => (
        (count[item] = count[item] + 1 || 1), count
      ),
      {},
    );

  const joker = cardsPatternAfterSort["J"] ?? 0;
  delete cardsPatternAfterSort.J;

  const cardsPattern = Object.values(cardsPatternAfterSort)
    .sort((a, b) => a - b)
    .reverse();

  cardsPattern[0] = cardsPattern[0] + joker;

  const rank = patterns.findIndex(
    (p) => p.toString() == cardsPattern.toString(),
  );
  game.score = Number.parseInt(
    rank +
      game.cards
        .split("")
        .map((card) =>
          cards
            .indexOf(card)
            .toLocaleString("en-US", { minimumIntegerDigits: 2 }),
        )
        .join(""),
  );
});

console.log(
  games
    .sort((a, b) => b.score - a.score)
    .map((c, i) => c.id * (i + 1))
    .reduce((a, b) => a + b),
);
