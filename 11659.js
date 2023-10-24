const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
//입력값 1개(1줄)
// const input = require('fs').readFileSync(filePath).toString().trim();

//입력값 여러개 (1줄)
// let input = require('fs').readFileSync(filePath).toString().trim().split(' ');

//입력값 여러 줄
// let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [first, second, ...input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(f, table, input) {
  const sum = new Array(f[0] + 1).fill(0);
  const tmpTable = [0, ...table];

  const result = [];

  for (let i = 1; i <= f[0]; i++) {
    sum[i] = sum[i - 1] + tmpTable[i];
  }

  input.forEach((r) => {
    const [start, end] = r;
    result.push(sum[end] - sum[start - 1]);
  });

  return result.join('\n');
}

const answer = solution(
  first.split(' ').map(Number),
  second.split(' ').map(Number),
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
