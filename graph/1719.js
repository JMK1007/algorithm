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
const [n, ...input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(vertexCnt, edgeCnt, edges) {
  let minArr = new Array(vertexCnt + 1).fill(Infinity);
  let pre = new Array(vertexCnt + 1).fill(0);
  let pq = new PriorityQueue();
  let adjacencyiList = {};
  const answer = Array.from({ length: vertexCnt }, () =>
    Array(vertexCnt).fill('-'),
  );

  edges.sort((a, b) => a[2] - b[2]);
  edges.forEach(([s, e, w]) => {
    if (!adjacencyiList[s]) adjacencyiList[s] = [];
    if (!adjacencyiList[e]) adjacencyiList[e] = [];

    adjacencyiList[s].push({ end: e, weight: w });
    adjacencyiList[e].push({ end: s, weight: w });
  });

  function getFirstItem(start, end) {
    if (pre[start] === end) return start;
    return getFirstItem(pre[start], end);
  }

  for (let i = 1; i <= vertexCnt; i++) {
    pq.enqueue(i, 0);
    minArr[i] = 0;
    pre[i] = i;

    while (pq.values.length) {
      const { val, priority } = pq.dequeue();

      if (minArr[val] < priority) continue;
      minArr[val] = priority;

      adjacencyiList[val]?.forEach((item) => {
        const { end, weight } = item;
        if (priority + weight < minArr[end]) {
          pre[end] = val;
          minArr[end] = priority + weight;
          pq.enqueue(end, minArr[end]);
        }
      });
    }

    for (let j = 1; j <= vertexCnt; j++) {
      if (j !== i) answer[i - 1][j - 1] = getFirstItem(j, i);
    }

    pre = new Array(vertexCnt).fill(0);
    pq = new PriorityQueue();
    minArr = new Array(vertexCnt + 1).fill(Infinity);
  }

  return answer.map((r) => r.join(' ')).join('\n');
}

const [vertexCnt, edgeCnt] = n.split(' ').map(Number);

const answer = solution(
  vertexCnt,
  edgeCnt,
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
