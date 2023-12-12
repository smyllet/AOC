import fs from "fs";

const input = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

const games: { card: string; schema: number[]; results: string[] }[] = input
  .split("\n")
  .map((l) => {
    const sl = l.split(" ");

    return {
      card: sl[0],
      schema: sl[1].split(",").map((e) => Number.parseInt(e)),
      results: [],
    };
  });

games.forEach((game) => {
  const nbOption = game.card.match(/\?/g)?.length ?? 0;

  for (let i = 0; i < 2 ** nbOption; i++) {
    const splitCard = game.card.split("");
    let current = 2 ** (nbOption - 1);
    let value = i;

    splitCard.forEach((c, j) => {
      if (c === "?") {
        if (value - current > -1) {
          splitCard[j] = "#";
          value -= current;
        } else {
          splitCard[j] = ".";
        }
        current /= 2;
      }
    });

    game.results.push(splitCard.join(""));
  }
});

console.log(
  "Part 1 :",
  games
    .map((game) => {
      const re = new RegExp(
        "^\\.*" + game.schema.map((s) => `#{${s}}`).join("\\.+") + "\\.*$",
      );

      game.results = game.results.filter((r) => r.match(re));

      return game.results.length;
    })
    .reduce((a, b) => a + b),
);
