const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
//입력값 1개(1줄)
// const input = require('fs').readFileSync(filePath).toString().trim();

//입력값 여러개 (1줄)
// let input = require('fs').readFileSync(filePath).toString().trim().split(' ');

//입력값 여러 줄
// let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(N, buildings) {
  const cntArr = new Array(N).fill(0);
  //완전 탐색
  for (let i = 0; i < N; i++) {
    let maxSlope = -Infinity;
    for (let j = i + 1; j < N; j++) {
      let slope = (buildings[j] - buildings[i]) / (j - i);
      if (slope > maxSlope) {
        cntArr[i]++;
        cntArr[j]++;
        maxSlope = slope;
      }
    }
  }

  return Math.max(...cntArr);
}

const answer = solution(
  Number(n),
  input.split(' ').map((r) => Number(r)),
);

console.log(answer);
