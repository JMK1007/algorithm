const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
//입력값 1개(1줄)
// const input = require('fs').readFileSync(filePath).toString().trim();

//입력값 여러개 (1줄)
// let input = require('fs').readFileSync(filePath).toString().trim().split(' ');

//입력값 여러 줄
// let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, ...input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(n, costs) {
  //R,G,B
  //D[k][0]=Min(D[k-1][1], D[k-1][2])+costs[k][0];
  //D[k][1]=Min(D[k-1][0], D[k-1][2])+costs[k][1];
  //D[k][2]=Min(D[k-1][0], D[k-1][1])+costs[k][2];

  const table = Array.from(new Array(n), () => new Array(3).fill(Infinity));

  table[0][0] = costs[0][0];
  table[0][1] = costs[0][1];
  table[0][2] = costs[0][2];

  for (let i = 1; i < n; i++) {
    table[i][0] = Math.min(table[i - 1][1], table[i - 1][2]) + costs[i][0];
    table[i][1] = Math.min(table[i - 1][0], table[i - 1][2]) + costs[i][1];
    table[i][2] = Math.min(table[i - 1][0], table[i - 1][1]) + costs[i][2];
  }

  return Math.min(table[n - 1][0], table[n - 1][1], table[n - 1][2]);
}

const answer = solution(
  Number(n),
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
