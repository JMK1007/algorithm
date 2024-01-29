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

function solution(N, T) {
  const NUM = 1000000009;
  const DP = new Array(N + 1).fill(0);
  DP[1] = 1;
  DP[2] = 2;
  DP[3] = 4;
  const result = [];

  const max = Math.max(...T);
  for (let i = 4; i <= max; i++) {
    DP[i] = ((DP[i - 3] % NUM) + (DP[i - 2] % NUM) + (DP[i - 1] % NUM)) % NUM;
  }

  T.forEach((val) => result.push(DP[val]));

  return result.join('\n');
}

const answer = solution(Number(n), input.map(Number));

console.log(answer);
