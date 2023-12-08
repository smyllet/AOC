import fs from "fs";

function gcd(a: number, b: number): number {
  return a ? gcd(b % a, a) : b;
}
function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

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

const iterations: number[] = [];

gps
  .filter((e) => e.id.endsWith("A"))
  .forEach((e) => {
    let current = e;
    let iteration = 0;
    let localPath = path;
    do {
      const direction = localPath.shift()!;
      localPath.push(direction);

      iteration++;

      current = gps.find((e) => current[direction] === e.id)!;
    } while (!current.id.endsWith("Z"));

    iterations.push(iteration);
  });

console.log(iterations.reduce(lcm));
