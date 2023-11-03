const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
//입력값 1개(1줄)
const input = require('fs').readFileSync(filePath).toString().trim();

//입력값 여러개 (1줄)
// let input = require('fs').readFileSync(filePath).toString().trim().split(' ');

//입력값 여러 줄
// let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
// const [n, ...input] = require('fs').readFileSync(filePath).toString().trim().split('\n');

function solution(n) {
  const table = new Array(n + 1).fill(Infinity);
  table[0] = 0;
  table[1] = 0;

  for (let i = 2; i <= n; i++) {
    let min = Infinity;
    if (i % 3 === 0) {
      min = Math.min(min, table[i / 3]);
    }
    if (i % 2 === 0) {
      min = Math.min(min, table[i / 2]);
    }
    min = Math.min(min, table[i - 1]);
    table[i] = min + 1;
  }

  return table[n];
}

const answer = solution(Number(input));

console.log(answer);
