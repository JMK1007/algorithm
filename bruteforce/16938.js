const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [input, A] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(input, A) {
  const [N, L, R, X] = input.split(' ').map(Number);
  let result = 0;

  function brute(arr, idx) {
    if (idx > N) {
      const sum = arr.reduce((prev, cur) => prev + cur, 0);
      const diff = Math.max(...arr) - Math.min(...arr);
      if (sum >= L && sum <= R && diff >= X && arr.length > 1) {
        result++;
      }
      return;
    }

    brute([...arr, A[idx]], idx + 1);
    brute([...arr], idx + 1);
  }

  brute([], 0);
  return result;
}

const answer = solution(input, A.split(' ').map(Number));

console.log(answer);
