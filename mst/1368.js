const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, ...input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(N, self, field) {
  const result = [];
  const array = [];
  const parent = Array.from(new Array(N + 1), (_, idx) => idx);

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      array.push([i, j, field[i][j]]);
    }
  }

  self.forEach((v, idx) => {
    array.push([idx, N, v]);
  });

  array.sort((a, b) => a[2] - b[2]);

  function getParent(v) {
    if (parent[v] === v) return v;
    return (parent[v] = getParent(parent[v]));
  }

  function unionParent(v1, v2) {
    v1 = getParent(v1);
    v2 = getParent(v2);
    if (v1 < v2) parent[v2] = v1;
    else parent[v1] = v2;
  }

  function isSameGraph(v1, v2) {
    const p1 = getParent(v1);
    const p2 = getParent(v2);
    return p1 === p2;
  }

  for (let i = 0; i < array.length && result.length < N; i++) {
    const [v1, v2, e] = array[i];

    if (!isSameGraph(v1, v2)) {
      unionParent(v1, v2);
      result.push(e);
    }
  }

  return result.reduce((prev, cur) => (prev += cur), 0);
}

const self = input.splice(0, Number(n));

const answer = solution(
  Number(n),
  self.map(Number),
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
