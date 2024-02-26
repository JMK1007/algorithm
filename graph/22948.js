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

  peek() {
    return this.values[0].val;
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

const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, ...input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(n, circles, startCircle, endCircle) {
  const result = [];
  const adjacencyList = {};
  const pq = new PriorityQueue();
  pq.enqueue(0, -Infinity);
  pq.enqueue(0, Infinity);

  adjacencyList[0] = [];
  circles.forEach(([circleNum, x, r]) => {
    const leftX = x - r;
    const rightX = x + r;
    pq.enqueue(circleNum, leftX);
    pq.enqueue(circleNum, rightX);
    adjacencyList[circleNum] = [];
  });

  makeTree(-1);

  const visited = new Array(n + 1).fill(false);
  visited[startCircle] = true;

  function dfs(current, arr) {
    if (current === endCircle) {
      result.push(...arr, current);
      return true;
    }

    adjacencyList[current]?.forEach((next) => {
      if (visited[next]) return;
      visited[next] = true;
      if (dfs(next, [...arr, current])) return;
      visited[next] = false;
    });
  }

  dfs(startCircle, []);

  return `${result.length}\n${result.join(' ')}`;

  function makeTree(parent) {
    const current = pq.dequeue();

    if (parent !== -1) {
      adjacencyList[parent].push(current);
      adjacencyList[current].push(parent);
    }
    while (current !== pq.peek()) {
      makeTree(current);
    }

    pq.dequeue();
  }
}

const circles = input.map((r) => r.split(' ').map(Number));
const [circleA, circleB] = circles.pop();

const answer = solution(Number(n), circles, circleA, circleB);

console.log(answer);
