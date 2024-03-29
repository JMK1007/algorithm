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

function solution(T, W, P) {
  const dp = Array.from(new Array(3), () =>
    Array.from(new Array(T + 1), () => new Array(W + 2).fill(0)),
  );

  P.unshift(0);

  for (let i = 1; i <= W + 1; i++) {
    for (let j = 1; j <= T; j++) {
      if (P[j] === 1) {
        dp[1][j][i] = Math.max(dp[1][j - 1][i] + 1, dp[2][j - 1][i - 1] + 1);
        dp[2][j][i] = Math.max(dp[1][j - 1][i], dp[2][j - 1][i]);
      } else if (P[j] === 2) {
        dp[1][j][i] = Math.max(dp[1][j - 1][i], dp[2][j - 1][i]);

        if (i === 1) continue;
        dp[2][j][i] = Math.max(dp[1][j - 1][i - 1] + 1, dp[2][j - 1][i] + 1);
      }
    }
  }

  return Math.max(...dp.flat(3));
}

const [T, W] = n.split(' ').map(Number);

const answer = solution(T, W, input.map(Number));

console.log(answer);
