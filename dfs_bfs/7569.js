class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.start = null;
    this.end = null;
    this.size = 0;
  }

  enqueue(val) {
    const newNode = new Node(val);
    if (!this.start) {
      this.start = newNode;
      this.end = newNode;
    } else {
      this.end.next = newNode;
      this.end = newNode;
    }
    return ++this.size;
  }

  dequeue() {
    if (!this.start) return null;

    const tmp = this.start;
    if (this.start === this.end) {
      this.end === null;
    }
    this.start = this.start.next;
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

function solution(M, N, H, box) {
  //BFS!!!

  const boxes = [];
  const queue = new Queue();

  const dh = [1, -1];
  const dr = [1, -1, 0, 0];
  const dc = [0, 0, 1, -1];
  let max = 0;
  let tomatoes = 0;

  //박스 3차원 배열로 초기화
  for (let i = 0; i < H; i++) {
    const tmp = [];
    for (let j = 0; j < N; j++) {
      tmp.push([...box[i * N + j]]);
    }
    boxes.push(tmp);
  }

  //3차원 배열 돌면서 익은 토마토는 큐에 넣기
  //안 익은 토마토 개수 세기
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k < M; k++) {
        if (boxes[i][j][k] === 1) {
          //큐에는 토마토가 담긴 박스 정보 H, N, M와
          //해당 토마토가 익기까지 필요한 최소 일자를 넣어줌
          queue.enqueue([i, j, k, 0]);
        } else if (boxes[i][j][k] === 0) {
          tomatoes++;
        }
      }
    }
  }

  //큐가 빌 때까지 반복
  while (queue.size) {
    const val = queue.dequeue();

    //토마토 위치 H, R, C, 최소 일자
    const [h, r, c, cnt] = val;
    max = Math.max(max, cnt);

    //위아래 확인
    //익은 토마토와 인접하고 아직 안 익은 토마토만 큐에 넣어줌
    for (let i = 0; i < 2; i++) {
      if (h + dh[i] >= 0 && h + dh[i] < H && boxes[h + dh[i]][r][c] === 0) {
        boxes[h + dh[i]][r][c] = 1;
        queue.enqueue([h + dh[i], r, c, cnt + 1]);
        tomatoes--;
      }
    }

    //상하좌우 확인
    //익은 토마토와 인접하고 아직 안 익은 토마토만 큐에 넣어줌
    for (let j = 0; j < 4; j++) {
      if (
        r + dr[j] >= 0 &&
        r + dr[j] < N &&
        c + dc[j] >= 0 &&
        c + dc[j] < M &&
        boxes[h][r + dr[j]][c + dc[j]] === 0
      ) {
        boxes[h][r + dr[j]][c + dc[j]] = 1;
        queue.enqueue([h, r + dr[j], c + dc[j], cnt + 1]);
        tomatoes--;
      }
    }
  }

  //안 익은 토마토가 남아있으면 -1, 아니면 일자 출력
  return tomatoes > 0 ? -1 : max;
}

const nArr = n.split(' ').map(Number);

const answer = solution(
  nArr[0],
  nArr[1],
  nArr[2],
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
