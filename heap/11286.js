class Heap {
  constructor() {
    this.values = [];
  }

  insert(element) {
    this.values.push(element);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (Math.abs(element) > Math.abs(this.values[parentIdx])) break;
      if (
        Math.abs(element) === Math.abs(this.values[parentIdx]) &&
        element > this.values[parentIdx]
      ) {
        break;
      }

      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  extract() {
    if (this.values.length === 0) return 0;

    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length === 0) {
      return min;
    }

    this.values[0] = end;
    this.sinkDown();
    return min;
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];

    while (true) {
      const leftChildIdx = idx * 2 + 1;
      const rightChildIdx = idx * 2 + 2;

      const leftChild = this.values[leftChildIdx];
      const rightChild = this.values[rightChildIdx];
      let tmp = null;
      if (leftChildIdx < length) {
        if (Math.abs(leftChild) < Math.abs(element)) {
          tmp = leftChildIdx;
        } else if (
          Math.abs(leftChild) === Math.abs(element) &&
          leftChild < element
        ) {
          tmp = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        if (
          (tmp === null && Math.abs(rightChild) < Math.abs(element)) ||
          (tmp !== null && Math.abs(rightChild) < Math.abs(leftChild))
        ) {
          tmp = rightChildIdx;
        } else if (
          tmp === null &&
          Math.abs(rightChild) === Math.abs(element) &&
          rightChild < element
        ) {
          tmp = rightChildIdx;
        } else if (
          tmp !== null &&
          Math.abs(rightChild) === Math.abs(leftChild) &&
          rightChild < leftChild
        ) {
          tmp = rightChildIdx;
        }
      }

      if (!tmp) break;
      this.values[idx] = this.values[tmp];
      this.values[tmp] = element;
      idx = tmp;
    }
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
  .split('\n')
  .map(Number);

function solution(n, input) {
  const heap = new Heap();

  const result = [];

  input.forEach((n) => {
    if (n === 0) {
      result.push(heap.extract());
    } else {
      heap.insert(n);
    }
  });

  return result.join('\n');
}

const answer = solution(n, input);

console.log(answer);
