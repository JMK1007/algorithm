const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, ...input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(r, c, map) {
  let result = 0;

  const dr = [0, 0, 1, -1];
  const dc = [1, -1, 0, 0];
  const dp = Array.from({ length: r }, () => new Array(c).fill(0));
  const visited = Array.from({ length: r }, () => new Array(c).fill(false));

  dp[0][0] = dfs(0, 0);

  function dfs(currentR, currentC) {
    if (currentR === r - 1 && currentC === c - 1) return 1;
    if (visited[currentR][currentC]) return dp[currentR][currentC];
    visited[currentR][currentC] = true;

    const current = map[currentR][currentC];
    for (let i = 0; i < 4; i++) {
      const nextR = currentR + dr[i];
      const nextC = currentC + dc[i];

      if (
        nextR >= 0 &&
        nextR < r &&
        nextC >= 0 &&
        nextC < c &&
        map[nextR][nextC] < current
      ) {
        dp[currentR][currentC] += dfs(nextR, nextC);
      }
    }

    return dp[currentR][currentC];
  }

  return dp[0][0];
}

const [r, c] = n.split(' ').map(Number);

const answer = solution(
  r,
  c,
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
