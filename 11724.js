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
    const newNode = new Node(val);
    if (!this.front) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    return ++this.size;
  }

  dequeue() {
    if (!this.front) return null;

    const tmp = this.front;

    if (this.front === this.rear) {
      this.rear = null;
    }

    this.front = this.front.next;
    this.size--;

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

function solution(N, M, vertexes) {
  const visited = new Array(N + 1).fill(false);
  visited[0] = true;
  const obj = {};
  let cnt = 0;
  const queue = new Queue();

  vertexes.forEach(([v1, v2]) => {
    //메모리 초과났던 코드
    //obj[v1]=[...(obj[v1]||[]), v2]
    //obj[v2]=[...(obj[v2]||[]), v1]
    //계속 스프레드 연산자로 추가해줘서 메모리 초과 난 듯,,,
    if (!obj[v1]) obj[v1] = [];
    if (!obj[v2]) obj[v2] = [];
    obj[v1].push(v2);
    obj[v2].push(v1);
  });

  for (let i = 1; i <= N; i++) {
    if (visited[i]) continue;

    queue.enqueue(i);
    visited[i] = true;
    cnt++;

    while (queue.size) {
      const v = queue.dequeue();
      const list = obj[v];

      //인접한 정점이 없을 수도 있으니까 list 옵셔널로 순회
      list?.forEach((v2) => {
        if (visited[v2]) return;

        queue.enqueue(v2);
        visited[v2] = true;
      });
    }
  }

  return cnt;
}

const arr = n.split(' ').map(Number);
const answer = solution(
  arr[0],
  arr[1],
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
