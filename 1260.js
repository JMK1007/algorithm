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
// let input = require('fs').readFileSync(filePath).toString().trim().split(' ');

//입력값 여러 줄
// let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, ...input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(N, M, V, edges) {
  const obj = {};
  let visited = new Array(N + 1).fill(false);
  visited[0] = true;
  const queue = new Queue();
  const stack = [];
  const dfsResult = [];
  const bfsResult = [];

  edges.forEach(([v1, v2]) => {
    if (!obj[v1]) obj[v1] = [];
    if (!obj[v2]) obj[v2] = [];

    obj[v1].push(v2);
    obj[v2].push(v1);
  });

  function bfs() {
    queue.enqueue(V);
    visited[V] = true;

    while (queue.length) {
      const v = queue.dequeue();
      bfsResult.push(v);
      const list = obj[v]?.sort((a, b) => a - b);

      list?.forEach((v2) => {
        if (visited[v2]) return;
        queue.enqueue(v2);
        visited[v2] = true;
      });
    }
  }

  function dfs(v) {
    if (visited[v]) return;
    visited[v] = true;
    dfsResult.push(v);

    const list = obj[v]?.sort((a, b) => a - b);
    list?.forEach((v2) => {
      if (visited[v2]) return;
      dfs(v2);
    });
  }

  bfs();

  visited = new Array(N + 1).fill(false);

  dfs(V);

  return [dfsResult.join(' '), bfsResult.join(' ')].join('\n');
}

const arr = n.split(' ').map(Number);
const answer = solution(
  arr[0],
  arr[1],
  arr[2],
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
