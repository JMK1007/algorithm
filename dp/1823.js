const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
//입력값 1개(1줄)
// const input = require('fs').readFileSync(filePath).toString().trim();

//입력값 여러개 (1줄)
// let input = require('fs').readFileSync(filePath).toString().trim().split(' ');

//입력값 여러 줄
// let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, ...input] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(N, fields) {
  let dp = Array.from({ length: 2001 }, () => new Array(2001).fill(0));

  function getDp(left, right, count) {
    if (left > right) return 0;
    if (dp[left][right] !== 0) return dp[left][right];

    return (dp[left][right] = Math.max(
      getDp(left + 1, right, count + 1) + fields[left] * count,
      getDp(left, right - 1, count + 1) + fields[right] * count,
    ));
  }
  fields.unshift(0);
  return getDp(1, N, 1);
}

const answer = solution(
  Number(n),
  input.map((r) => Number(r)),
);

console.log(answer);
