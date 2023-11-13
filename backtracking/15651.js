const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
//입력값 1개(1줄)
const input = require('fs').readFileSync(filePath).toString().trim();

//입력값 여러개 (1줄)
// let input = require('fs').readFileSync(filePath).toString().trim().split(' ');

//입력값 여러 줄
// let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
// const [n, ...input] = require('fs')
//   .readFileSync(filePath)
//   .toString()
//   .trim()
//   .split('\n');

function solution(N, M) {
  const result = [];

  //배열, 현재 값
  function brute(arr, num) {
    if (num > N) {
      return;
    }
    if (arr.length === M) {
      result.push(arr.join(' '));
      return;
    }

    brute([...arr, num], 1);
    brute([...arr], num + 1);
  }

  brute([], 1);

  return result.sort().join('\n');
}

const [N, M] = input.split(' ').map(Number);

const answer = solution(N, M);

console.log(answer);
