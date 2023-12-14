import fs from "fs";

const input = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

const rocks = input.split("\n").map((l) => l.split(""));

rocks.forEach((l, li) => {
  l.forEach((c, ci) => {
    let distance = li;
    let haveCube = false;
    while (rocks[li][ci] === "." && distance < rocks.length && !haveCube) {
      if (rocks[distance][ci] === "#") {
        haveCube = true;
      } else if (rocks[distance][ci] === "O") {
        rocks[li][ci] = "O";
        rocks[distance][ci] = ".";
      }
      distance++;
    }
  });
});

let load = rocks
  .flatMap((l, li) => l.map((c) => (c === "O" ? rocks.length - li : 0)))
  .reduce((a, b) => a + b);

console.log(load);
