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

function solution(N, M, nums) {
  nums.sort((a, b) => a - b);

  let min = Infinity;
  let front = 0;
  let rear = 1;

  if (nums.length === 1) {
    return nums[0];
  }

  while (rear < nums.length) {
    const diff = nums[rear] - nums[front];
    if (diff >= M) {
      min = Math.min(min, diff);
      front++;
    } else {
      rear++;
    }
  }

  while (front <= rear) {
    const diff = nums[rear] - nums[front];
    if (diff >= M) {
      min = Math.min(min, diff);
      front++;
    }
    front++;
  }

  return min;
}

const arr = n.split(' ').map(Number);

const answer = solution(
  arr[0],
  arr[1],
  input.map((r) => Number(r)),
);

console.log(answer);
