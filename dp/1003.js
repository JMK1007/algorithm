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

function solution(N, Arr) {
  const tmp = [...Arr].sort((a, b) => b - a);
  const result = [];

  const table = Array.from(new Array(tmp[0] + 1), () => [0, 0]);

  table[0] = [1, 0];
  table[1] = [0, 1];

  for (let i = 2; i <= tmp[0]; i++) {
    const zero = table[i - 2][0] + table[i - 1][0];
    const one = table[i - 2][1] + table[i - 1][1];
    table[i] = [zero, one];
  }

  Arr.forEach((item) => {
    result.push(table[item]);
  });

  return result.map((r) => r.join(' ')).join('\n');
}

const answer = solution(
  Number(n),
  input.map((r) => Number(r)),
);

console.log(answer);
