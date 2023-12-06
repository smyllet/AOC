import fs from "fs";

const input = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

const splitInput = input.split("\n").map((l) =>
  l
    .replace(/^.*:\s*/, "")
    .split(" ")
    .filter((l) => l.length > 0)
    .map((v) => Number.parseInt(v)),
);

const result: { time: number; distance: number; win: number }[] = [];

splitInput[0].forEach((time, i) => {
  let win = 0;
  const distance = splitInput[1][i];

  for (let j = 1; j < time; j++) {
    if (j * (time - j) > distance) win++;
  }

  result.push({
    time: time,
    distance: distance,
    win: win,
  });
});

console.log(result.map((r) => r.win).reduce((a, b) => a * b));
