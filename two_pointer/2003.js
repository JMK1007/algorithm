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

function solution(N, M, arr) {
  let sum = arr[0];
  let cnt = 0;
  //투포인터

  for (let start = 0, end = 0; start < N; start++) {
    while (sum < M && end < N) {
      end++;
      if (end < arr.length) sum += arr[end];
    }

    if (end === N) break;

    if (sum === M) cnt++;

    sum -= arr[start];
  }

  return cnt;
}

const arr = n.split(' ').map(Number);

const answer = solution(arr[0], arr[1], input.split(' ').map(Number));

console.log(answer);
