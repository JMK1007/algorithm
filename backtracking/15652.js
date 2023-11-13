const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
//입력값 1개(1줄)
const input = require('fs').readFileSync(filePath).toString().trim();

//입력값 여러개 (1줄)
// let input = require('fs').readFileSync(filePath).toString().trim().split(' ');

//입력값 여러 줄
// let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
// const [n, ...input] = require('fs').readFileSync(filePath).toString().trim().split('\n');

function solution(N, M) {
  const result = [];

  function backtracking(arr, n) {
    if (arr.length === M) {
      result.push(arr.join(' '));
      return;
    }

    if (n > N) {
      return;
    }

    //중복되는 수 o
    //조합
    backtracking([...arr, n], n);
    backtracking([...arr], n + 1);
  }

  backtracking([], 1);

  return result.join('\n');
}

const arr = input.split(' ').map(Number);
const answer = solution(arr[0], arr[1]);

console.log(answer);
