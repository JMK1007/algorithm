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
let input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

//입력값 여러 줄
// let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
// const [n, ...input] = require('fs').readFileSync(filePath).toString().trim().split('\n');

function solution(F, S, G, U, D) {
  let answer = null;
  const visited = new Array(F + 1).fill(Infinity);

  const queue = new Queue();

  queue.enqueue(S);
  visited[S] = 0;

  if (S === G) return 0;

  while (queue.length) {
    const floor = queue.dequeue();
    const cnt = visited[floor];

    if (floor === G) {
      answer = cnt;
      break;
    }

    const up = floor + U;
    const down = floor - D;
    if (up > 0 && up <= F && visited[up] === Infinity) {
      visited[up] = cnt + 1;
      queue.enqueue(up);
    }
    if (down > 0 && down <= F && visited[down] === Infinity) {
      visited[down] = cnt + 1;
      queue.enqueue(down);
    }
  }

  return answer || 'use the stairs';
}

const answer = solution(...input);

console.log(answer);
