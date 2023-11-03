const { reverse } = require('dns');

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

function solution(record) {
  const obj = {};

  record.forEach((r) => {
    const [name, status] = r;
    if (status === 'enter') obj[name] = 0;
    if (status === 'leave') delete obj[name];
  });

  return Object.keys(obj).sort().reverse().join('\n');
}

const answer = solution(input.map((r) => r.split(' ')));

console.log(answer);
