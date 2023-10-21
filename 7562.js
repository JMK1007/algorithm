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

    const tmp = this.front.val;
    if (this.front === this.rear) {
      this.rear = null;
    }

    this.front = this.front.next;
    this.size--;
    return tmp;
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

function solution(n, testCase) {
  const answer = [];

  const move = [
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-2, -1],
    [-1, -2],
  ];
  const queue = new Queue();

  for (let i = 0; i < n; i++) {
    const size = testCase[i][0][0];
    const start = testCase[i][1];
    const end = testCase[i][2];
    const visited = Array.from(new Array(size), () =>
      new Array(size).fill(false),
    );

    queue.enqueue([...start, 0]);
    visited[start[0]][start[1]] = true;

    while (queue.size) {
      const [r, c, cnt] = queue.dequeue();
      if (end[0] === r && end[1] === c) {
        answer.push(cnt);
      }

      for (let j = 0; j < 8; j++) {
        dr = move[j][0];
        dc = move[j][1];

        if (
          r + dr >= 0 &&
          r + dr < size &&
          c + dc >= 0 &&
          c + dc < size &&
          !visited[r + dr][c + dc]
        ) {
          visited[r + dr][c + dc] = true;
          queue.enqueue([r + dr, c + dc, cnt + 1]);
        }
      }
    }
  }

  return answer.join('\n');
}

const caseArr = [];

for (let i = 0; i < Number(n); i++) {
  const tmp = [];
  for (let j = 0; j < 3; j++) {
    tmp.push(input[i * 3 + j].split(' ').map(Number));
  }
  caseArr.push(tmp);
}

const answer = solution(Number(n), caseArr);
console.log(answer);
