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

function solution(N, testCase) {
  const result = [];
  testCase.reverse();

  for (let i = 0; i < N; i++) {
    const [state, airPlane] = testCase.pop();
    result.push(state - 1);
    for (let j = 0; j < airPlane; j++) testCase.pop();
  }
  return result.join('\n');
}

const answer = solution(
  Number(n),
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
