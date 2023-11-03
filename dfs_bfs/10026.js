class Node {
  constructor(val) {
    this.val = val;
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

function solution(picture) {
  const dr = [1, -1, 0, 0];
  const dc = [0, 0, -1, 1];

  const weakVisited = [];
  const notWeakVisited = [];

  picture.forEach((row) => {
    weakVisited.push(new Array(row.length).fill(false));
    notWeakVisited.push(new Array(row.length).fill(false));
  });

  let weak = 0;
  let notWeak = 0;

  const weakQueue = new Queue();
  const notWeakQueue = new Queue();

  for (let i = 0; i < picture.length; i++) {
    for (let j = 0; j < picture[0].length; j++) {
      if (weakVisited[i][j]) {
        continue;
      }

      weak++;
      weakQueue.enqueue([i, j]);

      while (weakQueue.size) {
        const [r, c] = weakQueue.dequeue();

        for (let k = 0; k < 4; k++) {
          if (
            r + dr[k] >= 0 &&
            r + dr[k] < picture.length &&
            c + dc[k] >= 0 &&
            c + dc[k] < picture[0].length &&
            !weakVisited[r + dr[k]][c + dc[k]]
          ) {
            if (
              (picture[r][c] === 'R' || picture[r][c] === 'G') &&
              (picture[r + dr[k]][c + dc[k]] === 'R' ||
                picture[r + dr[k]][c + dc[k]] === 'G')
            ) {
              weakVisited[r + dr[k]][c + dc[k]] = true;
              weakQueue.enqueue([r + dr[k], c + dc[k]]);
            } else if (
              picture[r][c] === 'B' &&
              picture[r + dr[k]][c + dc[k]] === 'B'
            ) {
              weakVisited[r + dr[k]][c + dc[k]] = true;
              weakQueue.enqueue([r + dr[k], c + dc[k]]);
            }
          }
        }
      }
    }
  }

  for (let i = 0; i < picture.length; i++) {
    for (let j = 0; j < picture[0].length; j++) {
      if (notWeakVisited[i][j]) {
        continue;
      }

      notWeak++;
      notWeakQueue.enqueue([i, j]);

      while (notWeakQueue.size) {
        const [r, c] = notWeakQueue.dequeue();

        for (let k = 0; k < 4; k++) {
          if (
            r + dr[k] >= 0 &&
            r + dr[k] < picture.length &&
            c + dc[k] >= 0 &&
            c + dc[k] < picture[0].length &&
            !notWeakVisited[r + dr[k]][c + dc[k]]
          ) {
            if (
              picture[r][c] === 'R' &&
              picture[r + dr[k]][c + dc[k]] === 'R'
            ) {
              notWeakVisited[r + dr[k]][c + dc[k]] = true;
              notWeakQueue.enqueue([r + dr[k], c + dc[k]]);
            } else if (
              picture[r][c] === 'G' &&
              picture[r + dr[k]][c + dc[k]] === 'G'
            ) {
              notWeakVisited[r + dr[k]][c + dc[k]] = true;
              notWeakQueue.enqueue([r + dr[k], c + dc[k]]);
            } else if (
              picture[r][c] === 'B' &&
              picture[r + dr[k]][c + dc[k]] === 'B'
            ) {
              notWeakVisited[r + dr[k]][c + dc[k]] = true;
              notWeakQueue.enqueue([r + dr[k], c + dc[k]]);
            }
          }
        }
      }
    }
  }

  return [notWeak, weak];
}

const answer = solution(input.map((row) => row.split('')));

console.log(answer.join(' '));
