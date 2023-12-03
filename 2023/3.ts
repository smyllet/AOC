import fs from "fs";

const input = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

const splitInput = input.split("\n");

const validNumbers: number[] = [];
const gearParts: { id: string; ratio: number[] }[] = [];

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
      const number = Number.parseInt(currentValue);

      // Check adjacent symbol
      const startExtract = Math.max(cIndex - currentValue.length - 1, 0);
      for (
        let i = Math.max(lIndex - 1, 0);
        i <= Math.min(lIndex + 1, splitInput.length - 1);
        i++
      ) {
        let extract = splitInput[i].substring(startExtract, cIndex + 1);
        if (extract.match(/[^(\d|\.)]/)) isValid = true;

        const gear = extract.indexOf("*");

        if (gear > -1) {
          let id = `${i}-${startExtract + gear}`;
          let gFind = gearParts.find((g) => g.id == id);
          if (gFind) gFind.ratio.push(number);
          else {
            gearParts.push({
              id: id,
              ratio: [number],
            });
          }
        }
      }

      if (isValid) {
        validNumbers.push(number);
      }

      currentValue = "";
    }
  });
});

console.log(
  "Part 1 :",
  validNumbers.reduce((a, b) => {
    return a + b;
  }),
);

console.log(
  "Part 2 :",
  gearParts
    .filter((gear) => gear.ratio.length === 2)
    .flatMap((gear) => gear.ratio[0] * gear.ratio[1])
    .reduce((a, b) => {
      return a + b;
    }),
);
