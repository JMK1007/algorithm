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

function solution(n, steps) {
  const table = Array.from(new Array(n + 1), () => new Array(3).fill(0));

  //table[k][1]=max(table[k-2][1],table[k-2][2])+steps[k];
  //table[k][2] = table[k-1][1]+steps[k]

  table[0][1] = steps[0];
  table[1][1] = steps[1];
  table[1][2] = table[0][1] + steps[1];

  for (let i = 2; i < n; i++) {
    table[i][1] = Math.max(table[i - 2][1], table[i - 2][2]) + steps[i];
    table[i][2] = table[i - 1][1] + steps[i];
  }

  return Math.max(table[n - 1][1], table[n - 1][2]);
}

const answer = solution(Number(n), input.map(Number));

console.log(answer);
