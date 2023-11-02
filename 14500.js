class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.length = 0;
  }

  enqueue(val) {
    const newNode = new Node(val);
    if (!this.front) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    return ++this.length;
  }

  dequeue() {
    if (!this.front) return null;

    const tmp = this.front;
    if (this.front === this.rear) {
      this.rear = null;
    }

    this.front = this.front.next;
    this.length--;

    return tmp.val;
  }
}

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

function solution(N, M, Map) {
  //bfs, 완전탐색

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];
  const fdr = [2, 2, -1, 1];
  const fdc = [-1, 1, 2, 2];

  const queue = new Queue();
  const visited = Array.from(new Array(N), () => new Array(M).fill(false));

  let max = 0;

  function bfs(start, visited) {
    const [startR, startC] = start;

    visited[startR][startC] = true;
    queue.enqueue([visited, [startR, startC], 1, Map[startR][startC]]);

    while (queue.length) {
      const current = queue.dequeue();
      const [visited, pos, cnt, sum] = current;

      if (cnt === 4) {
        max = Math.max(max, sum);
        continue;
      }

      const [r, c] = pos;

      for (let i = 0; i < 4; i++) {
        const nextR = r + dr[i];
        const nextC = c + dc[i];
        if (
          nextR >= 0 &&
          nextR < N &&
          nextC >= 0 &&
          nextC < M &&
          !visited[nextR][nextC]
        ) {
          visited[nextR][nextC] = true;
          queue.enqueue([
            [...visited.map((r) => [...r])],
            [nextR, nextC],
            cnt + 1,
            sum + Map[nextR][nextC],
          ]);
        }
      }
    }
  }

  function dfs(start, cnt, sum) {
    if (cnt === 4) {
      max = Math.max(max, sum);
      return;
    }

    const [startR, startC] = start;

    for (let i = 0; i < 4; i++) {
      const nextR = startR + dr[i];
      const nextC = startC + dc[i];
      if (
        nextR >= 0 &&
        nextR < N &&
        nextC >= 0 &&
        nextC < M &&
        !visited[nextR][nextC]
      ) {
        visited[nextR][nextC] = true;
        dfs([nextR, nextC], cnt + 1, sum + Map[nextR][nextC]);
        visited[nextR][nextC] = false;
      }
    }
  }

  //'ㅗ'모양 완전 탐색
  function searchF(start) {
    const [startR, startC] = start;

    for (let i = 0; i < 4; i++) {
      const nextR = startR + fdr[i];
      const nextC = startC + fdc[i];
      if (nextR >= 0 && nextR < N && nextC >= 0 && nextC < M) {
        let sum = Map[startR][startC];
        if (i === 0 || i === 1)
          sum +=
            Map[startR + 1][startC] +
            Map[nextR][startC] +
            Map[startR + 1][nextC];
        if (i === 2 || i === 3)
          sum +=
            Map[startR][startC + 1] +
            Map[startR][nextC] +
            Map[nextR][startC + 1];
        max = Math.max(max, sum);
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      visited[i][j] = true;
      // bfs([i, j], [...visited.map((r) => [...r])]);
      dfs([i, j], 1, Map[i][j]);
      visited[i][j] = false;
      searchF([i, j]);
    }
  }

  return max;
}

const arr = n.split(' ').map(Number);

const answer = solution(
  arr[0],
  arr[1],
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
