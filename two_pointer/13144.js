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

function solution(N, Arr) {
  let cnt = 0;
  let obj = {};

  for (let start = 0, end = 0; start < N; start++) {
    while (!obj[Arr[end]] && end < N) {
      obj[Arr[end]] = 1;
      cnt += end - start + 1;
      end++;
    }
    delete obj[Arr[start]];
  }

  return cnt;
}

const answer = solution(Number(n), input.split(' ').map(Number));

console.log(answer);
