const filePath = process.platform === 'linux' ? '/dev/stdin' : './4949.txt';

//입력값 1개(1줄)
// const input = require('fs').readFileSync(filePath).toString().trim();

//입력값 여러개 (1줄)
// let input = require('fs').readFileSync(filePath).toString().trim().split(' ');

//입력값 여러 줄
let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
// const [n, input] = require('fs')
//   .readFileSync(filePath)
//   .toString()
//   .trim()
//   .split('\n');

function solution() {
  const result = input.map((str) => {
    const stack = [];
    const strArr = str.split('');
    for (val of strArr) {
      const lastItem = stack[stack.length - 1];
      if (val === '(' || val === '[') {
        stack.push(val);
      } else if (val === ')') {
        if (lastItem !== '(') {
          return 'no';
        }
        stack.pop();
      } else if (val === ']') {
        if (lastItem !== '[') {
          return 'no';
        }
        stack.pop();
      }
    }
    return stack.length === 0 ? 'yes' : 'no';
  });

  console.log(result.slice(0, -1).join('\n'));
}

solution();
