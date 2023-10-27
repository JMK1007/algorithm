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

function solution(K, L, arr) {
  const result = [];
  const obj = {};

  arr.forEach((s) => {
    if (!obj[s]) obj[s] = 0;
    obj[s]++;
  });

  for (let i = 0; i < L; i++) {
    if (result.length === K) break;
    const cnt = obj[arr[i]];
    if (cnt === 1) result.push(arr[i]);
    else obj[arr[i]]--;
  }

  return result.join('\n');
}

const arr = n.split(' ').map(Number);

const answer = solution(arr[0], arr[1], input);

console.log(answer);
