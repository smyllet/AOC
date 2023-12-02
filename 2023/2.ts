import fs from "fs";

const input = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

const bag = {
  red: 12,
  green: 13,
  blue: 14,
};

// Parsing game
const games = input.split("\n").map((line) => {
  return {
    id: Number.parseInt(/Game (\d+)/.exec(line)?.[1] ?? "0"),
    sets: line
      .replace(/Game (\d+): /, "")
      .split(";")
      .map((setLine) => {
        return {
          red: Number.parseInt(/(\d+) red/.exec(setLine)?.[1] ?? "0"),
          green: Number.parseInt(/(\d+) green/.exec(setLine)?.[1] ?? "0"),
          blue: Number.parseInt(/(\d+) blue/.exec(setLine)?.[1] ?? "0"),
        };
      }),
  };
});

// Filter games
const possibleGames = games.filter((game) => {
  return game.sets.every((set) => {
    return set.red <= bag.red && set.green <= bag.green && set.blue <= bag.blue;
  });
});

console.log(
  possibleGames
    .map((game) => game.id)
    .reduce((a, b) => {
      return a + b;
    }),
);
