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

function solution(N, SerialList) {
  const makeSum = (prev, cur) => {
    if (!isNaN(Number(cur))) {
      return prev + Number(cur);
    }
    return prev + 0;
  };

  const sortFunc = (a, b) => {
    if (a.length < b.length) return -1;
    if (a.length > b.length) return 1;

    const sumA = a.split('').reduce(makeSum, 0);
    const sumB = b.split('').reduce(makeSum, 0);

    if (sumA < sumB) return -1;
    if (sumA > sumB) return 1;
    return a < b ? -1 : 1;
  };

  SerialList.sort(sortFunc);

  return SerialList.join('\n');
}

const answer = solution(Number(n), input);

console.log(answer);
