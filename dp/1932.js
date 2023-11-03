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

function solution(N, Triangle) {
  //삼각형 크기만큼 table을 만들어서 최대값 계속 갱신
  const table = new Array(N).fill(0);

  table[0] = Triangle[0][0];
  for (let i = 1; i < N; i++) {
    const prev = [...table];
    const row = Triangle[i];

    for (let j = 0; j < i; j++) {
      table[j] = Math.max(table[j], prev[j] + row[j]);
      table[j + 1] = Math.max(table[j + 1], prev[j] + row[j + 1]);
    }
  }

  return Math.max(...table);
}

const answer = solution(
  Number(n),
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
