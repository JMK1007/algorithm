class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

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
    return min;
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

function solution(N, M, X, Routes) {
  let minArr = new Array(N + 1).fill(Infinity);
  const answerArr = new Array(N + 1).fill(0);
  const adjacencyList = {};

  const pq = new PriorityQueue();

  Routes.forEach(([s, e, p]) => {
    if (!adjacencyList[s]) adjacencyList[s] = [];
    if (!adjacencyList[e]) adjacencyList[e] = [];

    adjacencyList[s].push({ val: e, priority: p });
  });

  for (let i = 1; i <= N; i++) {
    answerArr[i] += findMin(i, X);
    answerArr[i] += findMin(X, i);
  }

  function findMin(start, end) {
    pq.enqueue(start, 0);

    while (pq.values.length) {
      const current = pq.dequeue();
      const currentNode = current.val;
      const currentP = current.priority;

      if (minArr[currentNode] < currentP) continue;
      minArr[currentNode] = currentP;

      adjacencyList[currentNode]?.forEach((node) => {
        const nextNode = node.val;
        const nextP = currentP + node.priority;
        if (minArr[nextNode] < nextP) return;
        minArr[nextNode] = nextP;
        pq.enqueue(nextNode, nextP);
      });
    }

    const min = minArr[end];
    minArr = new Array(N + 1).fill(Infinity);

    return min;
  }

  return Math.max(...answerArr);
}

const [N, M, X] = n.split(' ').map(Number);

const answer = solution(
  N,
  M,
  X,
  input.map((route) => route.split(' ').map(Number)),
);

console.log(answer);
