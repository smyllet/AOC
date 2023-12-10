import fs from "fs";

const input = await fs.promises.readFile("./input.txt", {
  encoding: "utf-8",
});

const DIRECTION: Record<
  string,
  Record<string, { x: number; y: number; direction: string }> | undefined
> = {
  "-": {
    LEFT: {
      x: 0,
      y: 1,
      direction: "LEFT",
    },
    RIGHT: {
      x: 0,
      y: -1,
      direction: "RIGHT",
    },
  },
  "|": {
    TOP: {
      x: 1,
      y: 0,
      direction: "TOP",
    },
    BOTTOM: {
      x: -1,
      y: 0,
      direction: "BOTTOM",
    },
  },
  "7": {
    LEFT: {
      x: 1,
      y: 0,
      direction: "TOP",
    },
    BOTTOM: {
      x: 0,
      y: -1,
      direction: "RIGHT",
    },
  },
  J: {
    LEFT: {
      x: -1,
      y: 0,
      direction: "BOTTOM",
    },
    TOP: {
      x: 0,
      y: -1,
      direction: "RIGHT",
    },
  },
  F: {
    RIGHT: {
      x: 1,
      y: 0,
      direction: "TOP",
    },
    BOTTOM: {
      x: 0,
      y: 1,
      direction: "LEFT",
    },
  },
  L: {
    TOP: {
      x: 0,
      y: 1,
      direction: "LEFT",
    },
    RIGHT: {
      x: -1,
      y: 0,
      direction: "BOTTOM",
    },
  },
};

const maze: { box: string; step: number | undefined }[][] = input
  .split("\n")
  .map((l) => l.split("").map((b) => ({ box: b, step: undefined })));

let startX = 0;
let startY = 0;

maze.forEach((l, li) =>
  l.forEach((c, ci) => {
    if (c.box == "S") {
      startX = li;
      startY = ci;
    }
  }),
);

const tasks: { x: number; y: number; step: number; direction: string }[] = [
  {
    x: startX,
    y: startY,
    step: 0,
    direction: "TOP",
  },
];

while (tasks.length > 0) {
  const task = tasks.shift()!;

  if (task.step > 6600) break;

  solveMaze(task.x, task.y, task.step, task.direction);
}

function solveMaze(x: number, y: number, step: number, direction: string) {
  if (x < 0 || y < 0 || x >= maze.length || y >= maze[0].length) return;

  if (maze[x][y].step != undefined && maze[x][y].step! <= step) return;

  let box = maze[x][y].box;

  if (box == "S") {
    tasks.push({
      x: x,
      y: y + 1,
      step: step + 1,
      direction: "LEFT",
    });
    tasks.push({
      x: x + 1,
      y: y,
      step: step + 1,
      direction: "TOP",
    });
    tasks.push({
      x: x - 1,
      y: y,
      step: step + 1,
      direction: "RIGHT",
    });
    tasks.push({
      x: x - 1,
      y: y,
      step: step + 1,
      direction: "BOTTOM",
    });
    maze[x][y].step = step;
  } else {
    const d = DIRECTION[box]?.[direction];
    if (d) {
      tasks.push({
        x: x + d.x,
        y: y + d.y,
        step: step + 1,
        direction: d.direction,
      });
      maze[x][y].step = step;
    }
  }
}

// console.log(
//   maze
//     .map((l) =>
//       l
//         .map((c) =>
//           c.step != undefined
//             ? c.step.toLocaleString("en-GB", {
//                 minimumIntegerDigits: 2,
//               })
//             : " " + c.box,
//         )
//         .join(" "),
//     )
//     .join("\n\n"),
// );

console.log(
  "Part 1 :",
  Math.max(
    ...maze.flatMap((l) => l.map((c) => c.step ?? 0)).filter((b) => b > 0),
  ),
);
