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

function solution(n, m, maze) {
  //최소거리 bfs
  const queue = [];
  const dx = [0, 0, -1, 1];
  const dy = [1, -1, 0, 0];
  let max = 0;

  //[row, col, count=이동한 거리];
  queue.push([0, 0, 1]);

  while (queue.length) {
    const [row, col, count] = queue.shift();
    max = count;
    if (row === n - 1 && col === m - 1) {
      break;
    }

    for (let i = 0; i < 4; i++) {
      if (
        row + dy[i] >= 0 &&
        row + dy[i] < n &&
        col + dx[i] >= 0 &&
        col + dx[i] < m &&
        maze[row + dy[i]][col + dx[i]]
      ) {
        queue.push([row + dy[i], col + dx[i], count + 1]);
        //방문한 곳은 0으로
        maze[row + dy[i]][col + dx[i]] = 0;
      }
    }
  }

  return max;
}

const nArr = n.split(' ').map(Number);

const answer = solution(
  nArr[0],
  nArr[1],
  input.map((r) => r.split('').map(Number)),
);
console.log(answer);
