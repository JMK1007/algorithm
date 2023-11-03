const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
//입력값 1개(1줄)
const input = require('fs').readFileSync(filePath).toString().trim();

//입력값 여러개 (1줄)
// let input = require('fs').readFileSync(filePath).toString().trim().split(' ');

//입력값 여러 줄
// let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
// const [n, ...input] = require('fs').readFileSync(filePath).toString().trim().split('\n');

function solution(N) {
  const minTable = new Array(N + 1).fill(0);
  const prevTable = new Array(N + 1).fill(0);
  const result = [];

  for (let i = 2; i <= N; i++) {
    let min = Infinity;
    let minIdx = 0;

    if (i % 3 === 0) {
      if (minTable[i / 3] + 1 < min) {
        min = minTable[i / 3] + 1;
        minIdx = i / 3;
      }
    }

    if (i % 2 === 0) {
      if (minTable[i / 2] + 1 < min) {
        min = minTable[i / 2] + 1;
        minIdx = i / 2;
      }
    }

    if (minTable[i - 1] + 1 < min) {
      min = minTable[i - 1] + 1;
      minIdx = i - 1;
    }

    minTable[i] = min;
    prevTable[i] = minIdx;
  }

  result.push(N);
  for (let i = N; i > 1; ) {
    result.push(prevTable[i]);
    i = prevTable[i];
  }

  return [minTable[N], result.join(' ')].join('\n');
}

const answer = solution(Number(input));

console.log(answer);
