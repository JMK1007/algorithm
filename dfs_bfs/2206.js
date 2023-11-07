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

function solution(N, M, Map) {
  const queue = new Queue();
  const dr = [1, -1, 0, 0];
  const dc = [0, 0, 1, -1];
  let result = -1;

  const visitedBreak = [...Map.map((r) => [...r])];
  visitedBreak[0][0] = 1;

  queue.enqueue({ isBreak: false, pos: [0, 0], cnt: 1 });
  Map[0][0] = 1;

  while (queue.size) {
    const { isBreak, pos, cnt } = queue.dequeue();

    if (pos[0] === N - 1 && pos[1] === M - 1) {
      result = cnt;
      break;
    }

    for (let i = 0; i < 4; i++) {
      const nextR = pos[0] + dr[i];
      const nextC = pos[1] + dc[i];

      if (nextR >= 0 && nextR < N && nextC >= 0 && nextC < M) {
        if (!isBreak && Map[nextR][nextC] === 0) {
          Map[nextR][nextC] = -1;
          visitedBreak[nextR][nextC] = -1;
          queue.enqueue({ isBreak, pos: [nextR, nextC], cnt: cnt + 1 });
        }

        if (isBreak && visitedBreak[nextR][nextC] === 0) {
          visitedBreak[nextR][nextC] = -1;
          queue.enqueue({
            isBreak,
            pos: [nextR, nextC],
            cnt: cnt + 1,
          });
        }

        if (!isBreak && Map[nextR][nextC] === 1) {
          queue.enqueue({ isBreak: true, pos: [nextR, nextC], cnt: cnt + 1 });
        }
      }
    }
  }

  return result;
}

const arr = n.split(' ').map(Number);

const answer = solution(
  arr[0],
  arr[1],
  input.map((r) => r.split('').map(Number)),
);

console.log(answer);
