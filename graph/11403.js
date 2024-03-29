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

    const returnNode = this.front;
    if (this.front === this.rear) {
      this.rear = null;
    }

    this.front = this.front.next;
    this.size--;
    return returnNode.val;
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

function solution(N, AdjacencyMatrix) {
  const graphMap = new Map();
  const answerGraph = Array.from(new Array(N), () => new Array(N).fill(0));
  const q = new Queue();

  for (let i = 0; i < N; i++) {
    const tmpSet = new Set();
    getGraph(i, tmpSet);
    graphMap.set(i, tmpSet);
  }

  for (let i = 0; i < N; i++) {
    const tmpSet = graphMap.get(i);
    Array.from(tmpSet.values()).forEach((av) => {
      answerGraph[i][av] = 1;
    });
  }

  function getGraph(startV, set) {
    const q = new Queue();
    const tmpGraph = Array.from(new Array(N), () => new Array(N).fill(false));
    q.enqueue(startV);

    while (q.size) {
      const v = q.dequeue();
      AdjacencyMatrix[v].forEach((isConnected, v2) => {
        if (isConnected && !tmpGraph[v][v2]) {
          tmpGraph[v][v2] = true;
          set.add(v2);
          q.enqueue(v2);
        }
      });
    }
  }

  return answerGraph.map((r) => r.join(' ')).join('\n');
}

const answer = solution(
  Number(n),
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
