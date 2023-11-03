const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
//입력값 1개(1줄)
const input = require('fs').readFileSync(filePath).toString().trim();

//입력값 여러개 (1줄)
// let input = require('fs').readFileSync(filePath).toString().trim().split(' ');

//입력값 여러 줄
// let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
// const [n, ...input] = require('fs').readFileSync(filePath).toString().trim().split('\n');

function solution(n) {
  //한 행씩 내려가면서 놓을 수 있는 자리 탐색
  //같은 열과 행, 대각선에 놓여있으면 안됨

  let total = 0;
  const isColUsed = new Array(n).fill(false);
  const isLRUsed = new Array(n * 2).fill(false);
  const isRLUsed = new Array(n * 2).fill(false);

  function backtracking(r, cnt) {
    if (cnt === n) {
      total++;
      return;
    }
    if (r === n) return;

    for (let i = 0; i < n; i++) {
      if (isColUsed[i] || isLRUsed[r + i] || isRLUsed[r - i + n + 1]) continue;

      isColUsed[i] = true;
      isLRUsed[r + i] = true;
      isRLUsed[r - i + n + 1] = true;
      backtracking(r + 1, cnt + 1);
      isColUsed[i] = false;
      isLRUsed[r + i] = false;
      isRLUsed[r - i + n + 1] = false;
    }
  }

  backtracking(0, 0);

  return total;
}
const answer = solution(Number(input));

console.log(answer);
