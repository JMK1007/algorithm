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

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
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
const [n, m, ...input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(N, M, Routes, SE) {
  //최소값배열
  const minArr = new Array(N + 1).fill(Infinity);

  //경로 탐색 - 이전 노드
  const pre = new Array(N + 1).fill(0);
  const pq = new PriorityQueue();
  const adjacencyList = {};
  const [start, end] = SE;
  const answerRoute = [];

  Routes.forEach(([start, end, weight]) => {
    if (!adjacencyList[start]) adjacencyList[start] = [];
    if (!adjacencyList[end]) adjacencyList[end] = [];

    adjacencyList[start].push({ end, weight });
  });

  minArr[start] = 0;
  pq.enqueue(start, 0);

  while (pq.values.length) {
    const { val, priority } = pq.dequeue();

    if (minArr[val] < priority) continue;
    minArr[val] = priority;

    adjacencyList[val]?.forEach((item) => {
      const { end, weight } = item;
      if (priority + weight < minArr[end]) {
        minArr[end] = priority + weight;
        pre[end] = val;
        pq.enqueue(end, minArr[end]);
      }
    });
  }

  function findPre(start, end) {
    answerRoute.push(end);
    if (start === end) return;

    return findPre(start, pre[end]);
  }

  findPre(start, end);

  return [
    minArr[end],
    answerRoute.length,
    answerRoute.reverse().join(' '),
  ].join('\n');
}

const depArr = input.splice(-1);
const answer = solution(
  Number(n),
  Number(m),
  input.map((item) => item.split(' ').map(Number)),
  depArr[0].split(' ').map(Number),
);

console.log(answer);
