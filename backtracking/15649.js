const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
//입력값 1개(1줄)
// const input = require('fs').readFileSync(filePath).toString().trim();

//입력값 여러개 (1줄)
let input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

//입력값 여러 줄
// let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
// const [n, ...input] = require('fs').readFileSync(filePath).toString().trim().split('\n');

function solution(n, m) {
  const numArr = [];
  const visited = new Array(n + 1).fill(false);

  //방문한 값, idx, 개수
  function backtrack(arr, cnt) {
    if (cnt === m) {
      numArr.push([...arr].join(' '));
      return;
    }

    for (let j = 1; j <= n; j++) {
      if (!visited[j]) {
        visited[j] = true;
        backtrack([...arr, j], cnt + 1);
        visited[j] = false;
      }
    }
  }

  backtrack([], 0, 0);
  return numArr.join('\n');
}

const answer = solution(input[0], input[1]);

console.log(answer);
