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

//bfs
//인접한 좌표를 큐에 넣고 탐색

function solution(n, m, input) {
  let cnt = 0;
  let maxSize = 0;
  const dr = [1, -1, 0, 0];
  const dc = [0, 0, -1, 1];
  const queue = [];

  const row = input.length;
  const col = input[0].length;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (input[i][j]) {
        input[i][j] = 0;
        cnt++;
        queue.push([i, j]);
      }

      let size = 0;
      while (queue.length) {
        const [r, c] = queue.shift();
        size++;

        for (let k = 0; k < 4; k++) {
          if (
            r + dr[k] >= 0 &&
            r + dr[k] < n &&
            c + dc[k] >= 0 &&
            c + dc[k] < m &&
            input[r + dr[k]][c + dc[k]]
          ) {
            input[r + dr[k]][c + dc[k]] = 0;
            queue.push([r + dr[k], c + dc[k]]);
          }
        }
      }

      maxSize = Math.max(maxSize, size);
    }
  }

  return [cnt, maxSize];
}

const size = n.split(' ').map(Number);
const result = solution(
  size[0],
  size[1],
  input.map((c) => c.trim().split(' ').map(Number)),
);

console.log(result.join('\n'));
