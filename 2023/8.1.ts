import fs from "fs";

const input = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

let path: ("L" | "R")[] = /[A-Z]*/.exec(input)![0].split("") as ("L" | "R")[];
const gps = input
  .split("\n")
  .slice(2)
  .map((e) => {
    const reg = /([A-Z]*) = \(([A-Z]*), ([A-Z]*)\)/.exec(e);

    return {
      id: reg![1],
      L: reg![2],
      R: reg![3],
    };
  });

let current = gps.find((e) => e.id == "AAA")!;
let iteration = 0;

do {
  const direction = path.shift()!;
  path.push(direction);

  iteration++;

  current = gps.find((e) => current[direction] === e.id)!;
} while (current.id != "ZZZ");

console.log(iteration);
