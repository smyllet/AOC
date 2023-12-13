import fs from "fs";

const input = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

function transpose(matrix: string[][]) {
  return matrix.reduce(
    (prev, next) => next.map((item, i) => (prev[i] || []).concat(next[i])),
    [] as string[][],
  );
}

const patterns = input
  .split("\n\n")
  .map((pattern) => pattern.split("\n").map((line) => line.split("")));

function getArraySymetryIndex(
  list: string[],
  lastOptions: number[] | undefined,
) {
  const options = [];
  for (let i = 0; i < list.length - 1; i++) {
    if (!lastOptions || lastOptions.includes(i)) {
      let a = list.slice(0, i + 1);
      let b = list.slice(i + 1);

      if (a.length > b.length) a = a.slice(a.length - b.length);
      if (b.length > a.length) b = b.slice(0, a.length);

      b = b.reverse();

      if (a.toString() === b.toString()) options.push(i);
    }
  }
  return options;
}

console.log(
  "Part 1 :",
  patterns
    .map((pattern) => {
      let verticalOptions: number[] | undefined;
      pattern.forEach((list) => {
        verticalOptions = getArraySymetryIndex(list, verticalOptions);
      });
      verticalOptions = verticalOptions?.map((o) => o + 1) ?? [];

      let horizontalOptions: number[] | undefined;
      transpose(pattern).forEach((list) => {
        horizontalOptions = getArraySymetryIndex(list, horizontalOptions);
      });
      horizontalOptions =
        horizontalOptions?.map((o) => {
          return (o + 1) * 100;
        }) ?? [];

      return Math.max(...verticalOptions.concat(horizontalOptions), 0);
    })
    .reduce((a, b) => a + b),
);
