import fs from "fs";

const input = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

const numbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

console.log(
  input
    .split("\n")
    .map((value) => {
      return `${/(\d|one|two|three|four|five|six|seven|eight|nine).*/.exec(
        value,
      )?.[1]}${/.*(\d|one|two|three|four|five|six|seven|eight|nine)/.exec(
        value,
      )?.[1]}`;
    })
    .map((value) => {
      numbers.forEach((number, index) => {
        value = value.replaceAll(number, `${index + 1}`);
      });
      return Number.parseInt(value);
    })
    .reduce((a, b) => a + b),
);
