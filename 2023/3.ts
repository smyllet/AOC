import fs from "fs";

const input = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

const splitInput = input.split("\n");

const validNumbers: number[] = [];

splitInput.forEach((line, lIndex) => {
  let currentValue = "";
  line.split("").forEach((c, cIndex) => {
    if (c.match(/\d/)) {
      currentValue += c;
    }
    // If end of line or end of number
    if (
      (cIndex + 1 == line.length || !c.match(/\d/)) &&
      currentValue.length > 0
    ) {
      let isValid = false;

      // Check adjacent symbol
      for (
        let i = Math.max(lIndex - 1, 0);
        i <= Math.min(lIndex + 1, splitInput.length - 1);
        i++
      ) {
        let extract = splitInput[i].substring(
          Math.max(cIndex - currentValue.length - 1, 0),
          cIndex + 1,
        );
        if (extract.match(/[^(\d|\.)]/)) isValid = true;
      }

      if (isValid) {
        validNumbers.push(Number.parseInt(currentValue));
      }

      currentValue = "";
    }
  });
});

console.log(
  validNumbers.reduce((a, b) => {
    return a + b;
  }),
);
