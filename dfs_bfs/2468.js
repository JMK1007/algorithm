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
    this.size = 0;
  }

  enqueue(val) {
    const node = new Node(val);
    if (!this.front) {
      this.front = node;
      this.rear = node;
    } else {
      this.rear.next = node;
      this.rear = node;
    }

    return ++this.size;
  }

  dequeue() {
    if (!this.front) return null;

    const tmp = this.front;

    if (this.front === this.rear) {
      this.rear = null;
    }

    this.front = this.front.next;
    this.size--;

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

function solution(N, Map) {
  /**
   * 1. 배열의 제일 큰 수 찾기
   * 2. 1부터 max까지 bfs로 영역 갯수 찾기
   */

  const max = Math.max(...[...Map.map((r) => [...r])].flat(1));
  let result = 0;
  const dr = [1, -1, 0, 0];
  const dc = [0, 0, 1, -1];

  function bfs(rain) {
    const queue = new Queue();

    const visited = Array.from(new Array(N), () => new Array(N).fill(false));
    let cnt = 0;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (Map[i][j] <= rain || visited[i][j]) {
          visited[i][j] = true;
          continue;
        }

        cnt++;
        queue.enqueue([i, j]);
        visited[i][j] = true;

        while (queue.size) {
          const [currentR, currentC] = queue.dequeue();

          for (let k = 0; k < 4; k++) {
            const nextR = currentR + dr[k];
            const nextC = currentC + dc[k];

            if (
              nextR >= 0 &&
              nextR < N &&
              nextC >= 0 &&
              nextC < N &&
              Map[nextR][nextC] > rain &&
              !visited[nextR][nextC]
            ) {
              queue.enqueue([nextR, nextC]);
              visited[nextR][nextC] = true;
            }
          }
        }
      }
    }

    result = Math.max(result, cnt);
  }

  for (let i = 0; i < max; i++) {
    bfs(i);
  }
  return result;
}

const answer = solution(
  Number(n),
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
