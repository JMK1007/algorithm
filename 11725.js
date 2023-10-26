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

function solution(N, arr) {
  const adj = {};
  const parent = new Array(N + 1).fill(0);
  const result = [];
  const queue = new Queue();

  arr.forEach(([v1, v2]) => {
    if (!adj[v1]) adj[v1] = [];
    if (!adj[v2]) adj[v2] = [];

    adj[v1].push(v2);
    adj[v2].push(v1);
  });

  function dfs(parentNode) {
    const children = adj[parentNode];

    children?.forEach((item) => {
      if (parent[item] !== parentNode) {
        parent[item] = parentNode;
        dfs(item);
      }
    });
  }

  function bfs() {
    queue.enqueue(1);

    while (queue.length) {
      const parentNode = queue.dequeue();
      const children = adj[parentNode];
      console.log(children);
      children?.forEach((item) => {
        if (parent[item] !== parentNode) {
          parent[item] = parentNode;
          queue.enqueue(item);
        }
      });
    }
  }

  // dfs(1);
  bfs();

  for (let i = 2; i <= N; i++) {
    result.push(parent[i]);
  }

  return result.join('\n');
}

const answer = solution(
  Number(n),
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
