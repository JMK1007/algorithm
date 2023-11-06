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
const [n, start, ...input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(V, E, Start, Edges) {
  const adjacencyList = {};
  const previous = {};
  let pq = new PriorityQueue();
  let distance = {};
  const result = [];

  Edges.forEach((edge) => {
    const [u, v, w] = edge;
    if (!adjacencyList[u]) adjacencyList[u] = [];
    if (!adjacencyList[v]) adjacencyList[v] = [];

    adjacencyList[u].push({ node: v, weight: w });
  });

  for (vertex in Array.from(Array(V + 1), (_, idx) => idx)) {
    if (vertex === 0) continue;

    if (vertex == Start) {
      distance[Start] = 0;
      pq.enqueue({ node: Start, weight: 0 }, 0);
    } else {
      distance[vertex] = Infinity;
    }
  }

  while (pq.values.length) {
    const smallest = pq.dequeue().val;

    adjacencyList[smallest.node]?.forEach((neighbor) => {
      const nextWeight = distance[smallest.node] + neighbor.weight;
      if (nextWeight < distance[neighbor.node]) {
        distance[neighbor.node] = nextWeight;
        previous[neighbor.node] = smallest.node;
        pq.enqueue({ node: neighbor.node, weight: nextWeight }, nextWeight);
      }
    });
  }

  for (let i = 1; i <= V; i++) {
    result.push(distance[i] === Infinity ? 'INF' : distance[i]);
  }

  return result.join('\n');
}

const [V, E] = n.split(' ').map(Number);

const answer = solution(
  V,
  E,
  Number(start),
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
