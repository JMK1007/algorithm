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

function solution(N, map) {
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];
  const queue = new Queue();

  const result = [];
  let cnt = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] !== 0) {
        cnt++;
        queue.enqueue([i, j]);
        map[i][j] = 0;
      }

      while (queue.length) {
        const [r, c] = queue.dequeue();

        for (let k = 0; k < 4; k++) {
          const tmpR = r + dr[k];
          const tmpC = c + dc[k];

          if (
            tmpR >= 0 &&
            tmpR < N &&
            tmpC >= 0 &&
            tmpC < N &&
            map[tmpR][tmpC] !== 0
          ) {
            cnt++;
            map[tmpR][tmpC] = 0;
            queue.enqueue([tmpR, tmpC]);
          }
        }
      }

      if (cnt !== 0) {
        result.push(cnt);
        cnt = 0;
      }
    }
  }

  return [result.length, ...result.sort((a, b) => a - b)].join('\n');
}

const answer = solution(
  Number(n),
  input.map((r) => r.split('').map(Number)),
);

console.log(answer);
