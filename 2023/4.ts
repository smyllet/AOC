import fs from "fs";

const input = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

const cardWins = input
  .split("\n")
  .map((l) =>
    l
      .replaceAll("  ", " ")
      .replace(/Card \d+: /, "")
      .split(" | ")
      .map((c) => c.split(" ")),
  )
  .map((c) => c[0].filter((e) => c[1].indexOf(e) > -1));

console.log(
  "Part 1 :",
  cardWins
    .map((e) => (e.length > 0 ? Math.pow(2, e.length - 1) : 0))
    .reduce((a, b) => {
      return a + b;
    }),
);

const processCards = cardWins.map((c, i) => {
  return {
    index: i,
    result: c.length,
    number: 1,
  };
});

processCards.forEach((c, i) => {
  for (let k = 0; k < c.number; k++) {
    for (let j = i + 1; j <= i + c.result; j++) {
      if (j < processCards.length) processCards[j].number++;
    }
  }
});

console.log(
  "Part 2 :",
  processCards.map((e) => e.number).reduce((a, b) => a + b),
);
