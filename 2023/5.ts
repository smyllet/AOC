import fs from "fs";

const input = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

function convertValue(value: number, parsedBloc: number[][]) {
  let result = value;
  parsedBloc.forEach((l) => {
    if (value >= l[1] && value < l[1] + l[2]) {
      result = l[0] + (value - l[1]);
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

blocs.forEach((bloc) => {
  if (bloc.startsWith("seeds:")) return;
  const parsedBloc = bloc
    .replace(/.*\n/, "")
    .split("\n")
    .map((e) => e.split(" ").map((j) => Number.parseInt(j)));

  seeds = seeds.map((s) => convertValue(s, parsedBloc));
});

console.log(Math.min(...seeds));
