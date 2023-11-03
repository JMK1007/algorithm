class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  enqueue(val) {
    const newNode = new Node(val);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    return ++this.size;
  }

  dequeue() {
    if (!this.first) return null;

    const tmp = this.first;
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return tmp.value;
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

function solution(row, col, maze) {
  const queue = new Queue();
  const fireQueue = new Queue();

  const dr = [1, -1, 0, 0];
  const dc = [0, 0, 1, -1];

  let min = Infinity;

  const fireMaze = [];
  maze.forEach((row) => {
    fireMaze.push([...row]);
  });

  let start = null;
  let fire = null;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (maze[i][j] === 'J') {
        start = { r: i, c: j, cnt: 0 };
      } else if (maze[i][j] === 'F') {
        fire = { r: i, c: j, cnt: 0 };
        fireQueue.enqueue({ r: i, c: j, cnt: 0 });
      }
    }
  }

  //바로 탈출 가능한 조건
  if (
    start.r === 0 ||
    start.r === row - 1 ||
    start.c === 0 ||
    start.c === col - 1
  ) {
    return 1;
  }

  //불이 번지는 속도 bfs로 먼저 구하기
  while (fireQueue.size) {
    const { r, c, cnt } = fireQueue.dequeue();

    for (let i = 0; i < 4; i++) {
      if (
        r + dr[i] >= 0 &&
        r + dr[i] < row &&
        c + dc[i] >= 0 &&
        c + dc[i] < col &&
        fireMaze[r + dr[i]][c + dc[i]] === '.'
      ) {
        const tmp = { r: r + dr[i], c: c + dc[i], cnt: (cnt || 0) + 1 };
        fireMaze[r + dr[i]][c + dc[i]] = tmp.cnt;
        fireQueue.enqueue({ ...tmp });
      }
    }
  }

  //지훈이 탈출 bfs 구하기
  queue.enqueue(start);
  while (queue.size) {
    const { r, c, cnt } = queue.dequeue();

    for (let i = 0; i < 4; i++) {
      if (
        r + dr[i] >= 0 &&
        r + dr[i] < row &&
        c + dc[i] >= 0 &&
        c + dc[i] < col &&
        maze[r + dr[i]][c + dc[i]] === '.'
      ) {
        const tmp = { r: r + dr[i], c: c + dc[i], cnt: cnt + 1 };

        //불이 없는 경우
        if (!fire) {
          maze[r + dr[i]][c + dc[i]] = { ...tmp };
          queue.enqueue({ ...tmp });
        }
        //불이 있는데 벽에 막혀서 영향을 미치지 않는 경우, 불이 영향을 미치는 경우
        else if (
          fireMaze[tmp.r][tmp.c] === '.' ||
          tmp.cnt < fireMaze[tmp.r][tmp.c]
        ) {
          maze[r + dr[i]][c + dc[i]] = { ...tmp };
          queue.enqueue({ ...tmp });
        }
      }
    }
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (
        typeof maze[i][j] === 'object' &&
        (i === 0 || i === row - 1 || j === 0 || j === col - 1)
      ) {
        min = Math.min(min, maze[i][j]['cnt']);
      }
    }
  }

  return min !== Infinity ? min + 1 : 'IMPOSSIBLE';
}

const nArr = n.split(' ').map(Number);

const answer = solution(
  nArr[0],
  nArr[1],
  input.map((row) => row.split('')),
);

console.log(answer);
