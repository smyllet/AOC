import fs from "fs";

const input = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

let univers = input.split("\n").map((l) => l.split(""));

const voidLine: number[] = [];
univers.forEach((l, li) => {
  if (l.every((s) => s === ".")) {
    voidLine.push(li);
  }
});

const voidColumn: number[] = [];
for (let j = 0; j < univers[0].length; j++) {
  let isVoid = true;

  univers.forEach((l, i) => {
    if (univers[i][j] != ".") isVoid = false;
  });

  if (isVoid) {
    voidColumn.push(j);
  }
}

const galaxys: { x: number; y: number }[] = [];

univers.forEach((l, li) => {
  l.forEach((c, ci) => {
    if (univers[li][ci] === "#") {
      galaxys.push({
        x: li,
        y: ci,
      });
    }
  });
});

function getUniversPaths(galaxyOffset: number) {
  const paths: { g1: number; g2: number; path: number }[] = [];

  galaxys.forEach((galaxy, i) => {
    for (let j = i + 1; j < galaxys.length; j++) {
      const g1x = galaxy.x;
      const g1y = galaxy.y;
      const g2x = galaxys[j].x;
      const g2y = galaxys[j].y;
      const xOffset =
        voidLine.filter(
          (ln) => Math.min(g1x, g2x) < ln && Math.max(g1x, g2x) > ln,
        ).length *
        (galaxyOffset - 1);
      const yOffset =
        voidColumn.filter(
          (ln) => Math.min(g1y, g2y) < ln && Math.max(g1y, g2y) > ln,
        ).length *
        (galaxyOffset - 1);
      paths.push({
        g1: i + 1,
        g2: j + 1,
        path: Math.abs(g1x - g2x) + xOffset + Math.abs(g1y - g2y) + yOffset,
      });
    }
  });

  return paths;
}

console.log(
  "Part 1 :",
  getUniversPaths(2)
    .map((p) => p.path)
    .reduce((a, b) => a + b),
);

console.log(
  "Part 2 :",
  getUniversPaths(1000000)
    .map((p) => p.path)
    .reduce((a, b) => a + b),
);
