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

function solution(n, r, c) {
  //함수의 정의
  //함수의 base condition(종료조건)
  //재귀식
  function recursive(n, r, c) {
    if (n === 0) return 0;

    const middle = 1 << (n - 1);

    if (r < middle && c < middle) {
      return recursive(n - 1, r, c);
    } else if (r < middle && c >= middle) {
      return middle * middle + recursive(n - 1, r, c - middle);
    } else if (r >= middle && c < middle) {
      return 2 * middle * middle + recursive(n - 1, r - middle, c);
    } else {
      return 3 * middle * middle + recursive(n - 1, r - middle, c - middle);
    }
  }

  return recursive(n, r, c);
}

const answer = solution(input[0], input[1], input[2]);

console.log(answer);
