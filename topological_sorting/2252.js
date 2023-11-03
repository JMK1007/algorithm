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

function solution(N, M, list) {
  const adj = {};
  const indegree = new Array(N + 1).fill(0);
  const queue = new Queue();
  const result = [];

  list.forEach(([v1, v2]) => {
    if (!adj[v2]) adj[v2] = [];

    //그래프 연결리스트 만들고
    //indegree 배열 채우기
    adj[v2].push(v1);
    indegree[v1]++;
  });

  //indegree 0인 정점들 큐에 넣기
  indegree.forEach((v, idx) => {
    if (idx !== 0 && v === 0) {
      queue.enqueue(idx);
      result.push(idx);
    }
  });

  while (queue.length) {
    const v = queue.dequeue();

    //모든 정점들의 indegree 값 -1
    adj[v]?.forEach((v2) => {
      if (indegree[v2] !== 0) {
        indegree[v2]--;

        //indegree값이 0이라면 큐에 넣어줌
        if (indegree[v2] === 0) {
          result.push(v2);
          queue.enqueue(v2);
        }
      }
    });
  }

  return result.reverse().join(' ');
}

const arr = n.split(' ').map(Number);
const answer = solution(
  arr[0],
  arr[1],
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
