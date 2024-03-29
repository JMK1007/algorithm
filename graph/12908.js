const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [s, e, ...teleport] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(s, e, teleport) {
  const distance = [s, e, ...teleport];

  const table = Array.from({ length: 8 }, () => new Array(8).fill(Infinity));

  table[0][1] = table[1][0] =
    Math.abs(distance[0][0] - distance[1][0]) +
    Math.abs(distance[0][1] - distance[1][1]);

  for (let i = 2; i < 8; i += 2) {
    table[i][i + 1] = table[i + 1][i] = 10;
  }

  for (let start = 0; start < 8; start++) {
    for (let end = 0; end < 8; end++) {
      if (start == end) {
        continue;
      }

      table[start][end] = table[end][start] = Math.min(
        table[start][end],
        Math.abs(distance[start][0] - distance[end][0]) +
          Math.abs(distance[start][1] - distance[end][1]),
      );
    }
  }

  for (let middle = 0; middle < 8; middle++) {
    for (let start = 0; start < 8; start++) {
      for (let end = 0; end < 8; end++) {
        table[start][end] = Math.min(
          table[start][end],
          table[start][middle] + table[middle][end],
        );
      }
    }
  }

  return table[1][0];
}

const list = [];
for (let r of teleport) {
  const [sx, sy, ex, ey] = r.split(" ").map(Number);
  list.push([sx, sy], [ex, ey]);
}

const answer = solution(
  s.split(" ").map(Number),
  e.split(" ").map(Number),
  list,
);

console.log(answer);
