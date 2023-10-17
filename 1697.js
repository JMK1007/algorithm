class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = null;
  }

  enqueue(val) {
    const newNode = new Node(val);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    return ++this.size;
  }

  dequeue() {
    if (!this.first) return null;
    const tmp = this.first;
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return tmp.val;
  }
}

const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

//입력값 여러개 (1줄)
let input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

function solution(n, k) {
  const arr = new Array(100001).fill(0);

  const queue = new Queue();
  arr[n] = Infinity;
  queue.enqueue([n, 0]);

  while (queue.size) {
    const [idx, cnt] = queue.dequeue();
    if (idx === k) {
      return cnt;
    }

    if (idx - 1 >= 0 && idx - 1 < 100001 && arr[idx - 1] === 0) {
      arr[idx - 1] = cnt + 1;
      queue.enqueue([idx - 1, cnt + 1]);
    }

    if (idx + 1 >= 0 && idx - 1 < 100001 && arr[idx + 1] === 0) {
      arr[idx + 1] = cnt + 1;
      queue.enqueue([idx + 1, cnt + 1]);
    }

    if (2 * idx >= 0 && 2 * idx < 100001 && arr[2 * idx] === 0) {
      arr[2 * idx] = cnt + 1;
      queue.enqueue([2 * idx, cnt + 1]);
    }
  }
}

const answer = solution(input[0], input[1]);

console.log(answer);
