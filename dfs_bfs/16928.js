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

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, ...input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(N, M, input) {
  const move = new Map();

  const visited = new Array(101).fill(false);
  const map = new Array(101).fill(100);

  input.forEach(([start, end]) => {
    move.set(start, end);
  });

  const q = new Queue();
  q.enqueue({ cnt: 0, current: 1 });
  while (q.size) {
    const { cnt, current } = q.dequeue();

    if (current === 100) return cnt;

    for (let i = 1; i <= 6; i++) {
      if (visited[current + i]) continue;

      if (move.has(current + i)) {
        const moveTo = move.get(current + i);
        if (!visited[moveTo]) {
          visited[moveTo] = true;
          q.enqueue({ cnt: cnt + 1, current: moveTo });
        }
      } else {
        visited[current + i] = true;
        q.enqueue({ cnt: cnt + 1, current: current + i });
      }
    }
  }
}

const [N, M] = n.split(' ').map(Number);

const answer = solution(
  N,
  M,
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
