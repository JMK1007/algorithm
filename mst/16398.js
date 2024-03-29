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

function solution(N, W) {
  const priceArr = [];
  const parent = Array.from(new Array(N + 1), (_, idx) => idx);
  let total = 0;
  let edges = N - 1;

  W.forEach((row, idx) => {
    row.forEach((price, end) => {
      if (price === 0) return;
      priceArr.push({ start: idx + 1, end: end + 1, price });
    });
  });

  priceArr.sort((a, b) => a.price - b.price);

  function getParent(v) {
    if (v === parent[v]) return v;
    return (parent[v] = getParent(parent[v]));
  }

  function unionParent(v1, v2) {
    v1 = getParent(v1);
    v2 = getParent(v2);
    if (v1 < v2) parent[v2] = v1;
    else parent[v1] = v2;
  }

  function isSameParent(v1, v2) {
    const p1 = getParent(v1);
    const p2 = getParent(v2);
    return p1 === p2;
  }

  for (let i = 0; i < N * N - N; i++) {
    const { start, end, price } = priceArr[i];

    if (!isSameParent(start, end)) {
      total += price;
      unionParent(start, end);
      edges--;
      if (!edges) break;
    }
  }

  return total;
}

const answer = solution(
  Number(n),
  input.map((arr) => arr.split(' ').map(Number)),
);

console.log(answer);
