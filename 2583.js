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

function solution(M, N, K, rects) {
  const visited = Array.from(new Array(M), () => new Array(N).fill(false));
  const queue = new Queue();

  let result = [];

  const dr = [1, -1, 0, 0];
  const dc = [0, 0, -1, 1];

  rects.forEach((r) => {
    const [sc, sr, ec, er] = r;
    for (let i = sr; i < er; i++) {
      for (let j = sc; j < ec; j++) {
        visited[i][j] = true;
      }
    }
  });

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j]) {
        let size = 1;
        queue.enqueue([i, j]);
        visited[i][j] = true;

        while (queue.length) {
          const [r, c] = queue.dequeue();

          for (let k = 0; k < 4; k++) {
            if (
              r + dr[k] >= 0 &&
              r + dr[k] < M &&
              c + dc[k] >= 0 &&
              c + dc[k] < N &&
              !visited[r + dr[k]][c + dc[k]]
            ) {
              size++;
              visited[r + dr[k]][c + dc[k]] = true;
              queue.enqueue([r + dr[k], c + dc[k]]);
            }
          }
        }
        result.push(size);
      }
    }
  }

  return [result.length, result.sort((a, b) => a - b).join(' ')].join('\n');
}

const arr = n.split(' ').map(Number);
const answer = solution(
  arr[0],
  arr[1],
  arr[2],
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
