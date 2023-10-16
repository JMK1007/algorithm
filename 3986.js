const filePath = process.platform === 'linux' ? '/dev/stdin' : './3986.txt';
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

function solution(n, input) {
  let result = 0;

  input.forEach((str) => {
    const stack = [];
    for (let i = 0; i < str.length; i++) {
      const lastItem = i > 0 ? stack[stack.length - 1] : '';
      if (str[i] === lastItem) {
        stack.pop();
      } else {
        stack.push(str[i]);
      }
    }
    stack.length === 0 && result++;
  });

  console.log(result);
}

solution(Number(n), input);
