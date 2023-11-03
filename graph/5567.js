const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
//입력값 1개(1줄)
// const input = require('fs').readFileSync(filePath).toString().trim();

//입력값 여러개 (1줄)
// let input = require('fs').readFileSync(filePath).toString().trim().split(' ');

//입력값 여러 줄
// let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, m, ...input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(N, M, arr) {
  const obj = {};
  let cnt = 0;
  const visited = new Array(N + 1).fill(false);

  const stack = [];

  visited[0] = true;
  visited[1] = true;

  arr.forEach(([v1, v2]) => {
    if (!obj[v1]) obj[v1] = [];
    if (!obj[v2]) obj[v2] = [];

    obj[v1].push(v2);
    obj[v2].push(v1);
  });

  stack.push([1, 0]);
  while (stack.length) {
    const [v, depth] = stack.pop();
    if (depth >= 2) continue;

    obj[v]?.forEach((v2) => {
      if (!visited[v2]) {
        visited[v2] = true;
        cnt++;
        stack.push([v2, depth + 1]);
      }
    });
  }

  return cnt;
}

const answer = solution(
  Number(n),
  Number(m),
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
