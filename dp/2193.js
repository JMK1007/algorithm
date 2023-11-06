const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
//입력값 1개(1줄)
const input = require('fs').readFileSync(filePath).toString().trim();

//입력값 여러개 (1줄)
// let input = require('fs').readFileSync(filePath).toString().trim().split(' ');

//입력값 여러 줄
// let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
// const [n, ...input] = require('fs').readFileSync(filePath).toString().trim().split('\n');

function solution(N) {
  const DP = [];
  DP[0] = 0n;
  DP[1] = 1n;
  DP[2] = 1n;
  DP[3] = 2n;

  for (let i = 4; i <= N; i++) {
    DP[i] = DP[i - 1] + DP[i - 2];
  }

  return DP[N].toString();
}

const answer = solution(Number(input));

console.log(answer);
