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
    var newNode = new Node(val);
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

    var temp = this.first;
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return temp.value;
  }
}

const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, ...input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(n, m, box) {
  const queue = new Queue();

  let min = 0;
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];

  //안 익은 토마토 개수
  let allCnt = 0;

  //박스를 돌면서 익은 토마토들 위치 구하기
  //안 익은 토마토 개수도 체크
  box.forEach((row, rIdx) => {
    row.forEach((col, cIdx) => {
      if (col === 1) {
        queue.enqueue([rIdx, cIdx, 0]);
      } else if (col === 0) {
        allCnt++;
      }
    });
  });

  //익은 토마토가 없으면 return -1
  if (queue.size === 0) return -1;

  while (queue.size) {
    //r=row idx, c= column idx, cnt=지금 토마토가 익는데 걸리는 날짜
    const [r, c, cnt] = queue.dequeue();

    min = Math.max(cnt, min);

    for (let i = 0; i < 4; i++) {
      if (
        r + dy[i] >= 0 &&
        r + dy[i] < m &&
        c + dx[i] >= 0 &&
        c + dx[i] < n &&
        box[r + dy[i]][c + dx[i]] === 0
      ) {
        //안 익은 토마토 개수 --;
        //안 익은 토마토는 큐에 넣고 1++;
        allCnt--;
        box[r + dy[i]][c + dx[i]] = 1;
        queue.enqueue([r + dy[i], c + dx[i], cnt + 1]);
      }
    }
  }

  //안 익은 토마토가 없을 경우,
  return allCnt === 0 ? min : -1;
}

const nArr = n.split(' ').map(Number);

const answer = solution(
  nArr[0],
  nArr[1],
  input.map((row) => row.split(' ').map(Number)),
);

console.log(answer);
