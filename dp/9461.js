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

function solution(Nums) {
  const max = Math.max(...Nums);
  const table = new Array(max + 1).fill(0);

  table[1] = 1;
  table[2] = 1;
  table[3] = 1;
  table[4] = 2;
  table[5] = 2;

  // for (let i = 4; i <= max; i++) {
  //   table[i] = table[i - 2] + table[i - 3];
  // }

  for (let i = 6; i <= max; i++) {
    table[i] = table[i - 1] + table[i - 5];
  }

  return Nums.map((num) => table[num]).join('\n');
}

const answer = solution(input.map(Number));

console.log(answer);
