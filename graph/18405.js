class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    let newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element.priority >= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }
  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min.val;
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
//입력값 1개(1줄)
// const input = require('fs').readFileSync(filePath).toString().trim();

//입력값 여러개 (1줄)
// let input = require('fs').readFileSync(filePath).toString().trim().split(' ');

//입력값 여러 줄
// let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, ...input] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const table = input.map((r) => r.split(" ").map(Number));

function solution(n, s, table) {
  const [N, K] = n.split(" ").map(Number);
  const [S, X, Y] = s;

  const dr = [0, 0, 1, -1];
  const dc = [1, -1, 0, 0];

  for (let i = 0; i < S; i++) {
    if (table[X - 1][Y - 1] !== 0) break;

    const pq = new PriorityQueue();
    table.forEach((row, rIdx) => {
      row.forEach((item, cIdx) => {
        if (item !== 0) pq.enqueue({ r: rIdx, c: cIdx, type: item }, item);
      });
    });

    while (pq.values.length) {
      const { r, c, type } = pq.dequeue();

      for (let i = 0; i < 4; i++) {
        const nextR = r + dr[i];
        const nextC = c + dc[i];

        if (
          nextR >= 0 &&
          nextR < N &&
          nextC >= 0 &&
          nextC < N &&
          table[nextR][nextC] === 0
        ) {
          table[nextR][nextC] = type;
        }
      }
    }
  }

  return table[X - 1][Y - 1];
}

const answer = solution(n, table.slice(-1)[0], table.slice(0, -1));

console.log(answer);
