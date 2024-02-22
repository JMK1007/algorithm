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

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [N, friends, M, ...input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(n, friends, m, lands) {
  const result = new Array(n + 1).fill(Infinity);
  let minArr = new Array(n + 1).fill(Infinity);
  const pq = new PriorityQueue();
  const adjacencyList = {};
  let max = 1;

  lands.forEach(([node1, node2, weight]) => {
    if (!adjacencyList[node1]) adjacencyList[node1] = [];
    if (!adjacencyList[node2]) adjacencyList[node2] = [];

    adjacencyList[node1].push({ end: node2, weight });
    adjacencyList[node2].push({ end: node1, weight });
  });

  //A,B,C 세 점에서 각 정점들의 최단 거리 구하기
  //다익스트라
  for (let i = 0; i < 3; i++) {
    minArr = new Array(n + 1).fill(Infinity);
    const start = friends[i];
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
          pq.enqueue(end, minArr[end]);
        }
      });
    }

    //각 정점들 A,B,C 중 최단거리 갱신
    for (let i = 1; i <= n; i++) {
      if (minArr[i] < result[i]) result[i] = minArr[i];
    }
  }

  //최단 거리 중에서 제일 먼 거리의 정점 구하기
  for (let i = 1; i <= n; i++) {
    if (result[i] !== Infinity && result[max] < result[i]) {
      max = i;
    }
  }

  return max;
}
const answer = solution(
  Number(N),
  friends.split(' ').map(Number),
  Number(M),
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
