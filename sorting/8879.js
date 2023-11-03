const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
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

function solution(N, K, nations) {
  let find;

  for (let i = 0; i < nations.length; i++) {
    if (nations[i][0] === K) {
      find = nations[i];
      break;
    }
  }

  nations.sort((a, b) => {
    if (a[1] > b[1]) return -1;
    if (a[1] < b[1]) return 1;
    if (a[2] > b[2]) return -1;
    if (a[2] < b[2]) return 1;
    if (a[3] > b[3]) return -1;
    if (a[3] < b[3]) return 1;

    return 0;
  });

  for (let i = 0; i < nations.length; i++) {
    if (nations[i].slice(1).join('') === find.slice(1).join('')) {
      return i + 1;
    }
  }
}

const arr = n.split(' ').map(Number);

const answer = solution(
  arr[0],
  arr[1],
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
