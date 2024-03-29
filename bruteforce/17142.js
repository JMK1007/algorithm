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

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, ...input] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, M] = n.split(" ").map(Number);
const table = input.map((r) => r.split(" ").map(Number));

function solution(N, M, table) {
  const dr = [0, 0, -1, 1];
  const dc = [1, -1, 0, 0];
  let zeroCnt = 0;

  const viruses = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (table[r][c] === 2) {
        viruses.push({ r, c });
      }

      if (table[r][c] === 0) {
        zeroCnt++;
      }
    }
  }

  let minTime = Infinity;
  let newTable = Array.from({ length: N }, (_, idx) => [...table[idx]]);

  function getMinTime(arr) {
    let maxCnt = 0;
    const q = new Queue();
    let zeroCntTmp = zeroCnt;

    arr.forEach((item) => {
      const { r, c } = item;
      q.enqueue({ cnt: 0, item });
      table[r][c] = -1;
    });

    while (q.size) {
      const {
        cnt,
        item: { r, c },
      } = q.dequeue();
      if (zeroCntTmp === 0) break;

      for (let i = 0; i < 4; i++) {
        const nextR = r + dr[i];
        const nextC = c + dc[i];

        if (nextR >= 0 && nextR < N && nextC >= 0 && nextC < N) {
          if (table[nextR][nextC] === 0 || table[nextR][nextC] === 2) {
            table[nextR][nextC] === 0 && zeroCntTmp--;
            table[nextR][nextC] = -1;
            maxCnt = cnt + 1;
            q.enqueue({ cnt: cnt + 1, item: { r: nextR, c: nextC } });
          }
        }
      }
    }

    return zeroCntTmp === 0 ? maxCnt : Infinity;
  }

  function getCombination(arr, idx) {
    if (idx > viruses.length) {
      return;
    }

    if (arr.length === M) {
      minTime = Math.min(minTime, getMinTime(arr));
      table = Array.from({ length: N }, (_, idx) => [...newTable[idx]]);
      return;
    }

    getCombination([...arr, viruses[idx]], idx + 1);
    getCombination([...arr], idx + 1);
  }
  getCombination([], 0);

  if (zeroCnt === 0) return 0;
  return minTime !== Infinity ? minTime : -1;
}

const answer = solution(N, M, table);

console.log(answer);
