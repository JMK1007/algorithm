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

function solution(T, N, A, M, B) {
  const sumA = {};
  let result = 0;

  for (let i = 0; i < N; i++) {
    let sum = 0n;
    for (let j = i; j < N; j++) {
      sum += A[j];
      sumA[sum] = (sumA[sum] || 0) + 1;
    }
  }

  for (let i = 0; i < M; i++) {
    let sum = 0n;
    for (let j = i; j < M; j++) {
      sum += B[j];
      result += sumA[T - sum] || 0;
    }
  }

  return result;
}

const [N, A, M, B] = input;

const answer = solution(
  BigInt(n),
  Number(N),
  A.split(' ').map(BigInt),
  Number(M),
  B.split(' ').map(BigInt),
);

console.log(answer);
