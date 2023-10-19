const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
//입력값 1개(1줄)
// const input = require('fs').readFileSync(filePath).toString().trim();

//입력값 여러개 (1줄)
let input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

//입력값 여러 줄
// let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
// const [n, ...input] = require('fs').readFileSync(filePath).toString().trim().split('\n');

function solution(H, W, N, M) {
  //가로에 앉을 수 있는 수 * 세로에 앉을 수 있는 수

  const r = parseInt(W / (M + 1)) + (W % (M + 1) > 0 ? 1 : 0);
  const c = parseInt(H / (N + 1)) + (H % (N + 1) > 0 ? 1 : 0);

  return r * c;
}

const answer = solution(...input);

console.log(answer);
