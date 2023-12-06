import fs from "fs";

const input = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

function convertValue(value: number, parsedBloc: number[][]) {
  let result = value;
  parsedBloc.forEach((l) => {
    if (value >= l[0] && value < l[0] + l[2]) {
      result = l[1] + (value - l[0]);
    }
  });
  return result;
}

let seeds =
  /seeds: ([^\n]*)/
    .exec(input)?.[1]
    .split(" ")
    .map((e) => Number.parseInt(e)) ?? [];

const blocs = input.split("\n\n");

let result;
let i = 0;
let tryValue = 0;

let intervales: { start: number; stop: number }[] = [];

for (let j = 0; j < seeds.length; j += 2) {
  intervales.push({
    start: seeds[j],
    stop: seeds[j] + seeds[j + 1],
  });
}

console.log(intervales);

blocs.reverse();

const blocsParsed = blocs
  .filter((e) => !e.startsWith("seeds:"))
  .map((bloc) => {
    return bloc
      .replace(/.*\n/, "")
      .split("\n")
      .map((e) => e.split(" ").map((j) => Number.parseInt(j)));
  });

while (!result) {
  let tryValue = i;
  blocsParsed.forEach((bloc) => {
    tryValue = convertValue(tryValue, bloc);
  });

  if (i % 1000000 === 0) console.log(i);

  if (
    intervales.find((inte) => tryValue >= inte.start && tryValue < inte.stop)
  ) {
    result = i;
  } else {
    i++;
    tryValue = i;
  }
}

console.log(result);
