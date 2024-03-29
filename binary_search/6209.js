const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [first, ...rocks] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(d, n, m, rocks) {
  let left = 0;
  let right = d;
  let answer = 0;

  rocks.sort((a, b) => a - b);

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let prev = 0;
    let cnt = 0;

    for (const rock of rocks) {
      if (rock - prev < mid) cnt += 1;
      else prev = rock;
    }
    if (cnt <= m) {
      left = mid + 1;
      answer = mid;
    } else right = mid - 1;
  }

  return answer;
}

const [d, n, m] = first.split(' ').map(Number);

const answer = solution(d, n, m, rocks.map(Number));

console.log(answer);
