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
const input = require('fs').readFileSync(filePath).toString().trim();

//입력값 여러개 (1줄)
// let input = require('fs').readFileSync(filePath).toString().trim().split(' ');

//입력값 여러 줄
// let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
// const [n, ...input] = require('fs').readFileSync(filePath).toString().trim().split('\n');

function solution(N, K) {
  const queue = new Queue();
  const visited = new Array(100001).fill(Infinity);
  const dr = [2, 1, -1];

  queue.enqueue({ cnt: 0, pos: N });
  visited[N] = 0;

  while (queue.size) {
    const { cnt, pos } = queue.dequeue();

    if (pos === K) {
      return visited[K];
    }

    for (let i = 0; i < 3; i++) {
      const nextPos = i > 0 ? pos + dr[i] : pos * dr[i];
      const nextCnt = i > 0 ? cnt + 1 : cnt;

      if (nextPos >= 0 && nextPos < 100001 && nextCnt < visited[nextPos]) {
        queue.enqueue({ cnt: nextCnt, pos: nextPos });
        visited[nextPos] = nextCnt;
      }
    }
  }
}

const [N, K] = input.split(' ').map(Number);
const answer = solution(N, K);

console.log(answer);
