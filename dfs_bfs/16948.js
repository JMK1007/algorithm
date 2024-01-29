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
const [n, input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(N, pos) {
  const start = [pos[0], pos[1]];
  const end = [pos[2], pos[3]];
  const queue = new Queue();
  const visited = Array.from(new Array(N), () => new Array(N).fill(false));

  const dr = [-2, -2, 0, 0, 2, 2];
  const dc = [-1, 1, -2, 2, -1, 1];
  let result = -1;

  queue.enqueue([0, ...start]);
  while (queue.size) {
    const [cnt, r, c] = queue.dequeue();

    if (r === end[0] && c === end[1]) {
      result = cnt;
      break;
    }

    for (let i = 0; i < 6; i++) {
      const nextR = r + dr[i];
      const nextC = c + dc[i];

      if (
        nextR >= 0 &&
        nextR < N &&
        nextC >= 0 &&
        nextC < N &&
        !visited[nextR][nextC]
      ) {
        visited[nextR][nextC] = true;
        queue.enqueue([cnt + 1, nextR, nextC]);
      }
    }
  }

  return result;
}

const answer = solution(Number(n), input.split(' ').map(Number));

console.log(answer);
