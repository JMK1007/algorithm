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

function solution(N, M) {
  const result = [];

  function findSequence(arr, i) {
    const newArr = [...arr, i];

    if (i > N || newArr.length > M) {
      return;
    }

    if (newArr.length === M) {
      result.push(newArr.join(' '));
    }

    findSequence([...arr, i], i + 1);
    findSequence([...arr], i + 1);
  }

  findSequence([], 1);

  return result.join('\n');
}

const answer = solution(input[0], input[1]);

console.log(answer);
