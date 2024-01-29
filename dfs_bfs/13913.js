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
let input = require('fs').readFileSync(filePath).toString().trim().split(' ');

//입력값 여러 줄
// let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
// const [n, ...input] = require('fs').readFileSync(filePath).toString().trim().split('\n');

function solution(N, K) {
  const visitedArr = new Array(200001).fill(false);
  const prevArr = new Array(200001).fill(-1);
  const queue = new Queue();
  const dx = [2, 1, -1];

  visitedArr[N] = true;
  prevArr[N] = null;
  queue.enqueue([null, N]);

  while (queue.size) {
    const [prev, cur] = queue.dequeue();
    if (cur === K) {
      visitedArr[K] = true;
      prevArr[cur] = prev;
    }

    for (let i = 0; i < 3; i++) {
      let next = cur;
      i === 0 ? (next *= dx[i]) : (next += dx[i]);

      if (next >= 0 && next < 200001 && !visitedArr[next]) {
        visitedArr[next] = true;
        prevArr[next] = cur;
        queue.enqueue([cur, next]);
      }
    }
  }

  const result = [];
  let cur = K;

  while (1) {
    if (prevArr[cur] === null) {
      break;
    }

    result.push(prevArr[cur]);
    cur = prevArr[cur];
  }

  return [result.length, [K, ...result].reverse().join(' ')].join('\n');
}

const answer = solution(Number(input[0]), Number(input[1]));

console.log(answer);
