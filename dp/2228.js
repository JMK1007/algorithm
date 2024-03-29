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

function solution(N, M, numbers) {
  const sum = new Array(N + 1).fill(0);
  const dp = Array.from(new Array(N + 1), () =>
    new Array(M + 1).fill(-Infinity),
  );
  const visited = Array.from(new Array(N + 1), () =>
    new Array(M + 1).fill(false),
  );

  numbers.unshift(0);
  for (let i = 1; i <= N; i++) {
    sum[i] = sum[i - 1] + numbers[i];
  }

  function getSum(num, section) {
    if (section === 0) return 0;
    if (num < 0) return -Infinity;
    if (visited[num][section]) return dp[num][section];

    visited[num][section] = true;
    dp[num][section] = getSum(num - 1, section);

    for (let i = num; i >= 1; i--) {
      dp[num][section] = Math.max(
        dp[num][section],
        sum[num] - sum[i - 1] + getSum(i - 2, section - 1),
      );
    }
    return dp[num][section];
  }

  return getSum(N, M);
}

const [N, M] = n.split(' ').map(Number);

const answer = solution(
  N,
  M,
  input.map((r) => Number(r)),
);

console.log(answer);
