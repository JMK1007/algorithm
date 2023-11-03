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

function solution(N, R, Q, Edges, Roots) {
  const obj = {};
  const parentArr = new Array(N + 1).fill(0);
  const childrenArr = Array.from(new Array(N + 1), () => []);
  const size = new Array(N + 1).fill(0);
  let result = [];
  let cnt = 0;

  Edges.forEach(([v1, v2]) => {
    if (!obj[v1]) obj[v1] = [];
    if (!obj[v2]) obj[v2] = [];

    obj[v1].push(v2);
    obj[v2].push(v1);
  });

  function dfs(parent) {
    const children = obj[parent];

    children?.forEach((v) => {
      if (parentArr[parent] === v) return;

      parentArr[v] = parent;
      childrenArr[parent].push(v);
      dfs(v);
    });
  }

  dfs(R);

  function traversal(root) {
    let cnt = 1;
    if (childrenArr[root].length === 0) {
      size[root] = cnt;
      return cnt;
    }

    childrenArr[root]?.forEach((v) => {
      const tmp = traversal(v);
      cnt += tmp;
    });

    size[root] = cnt;
    return cnt;
  }

  traversal(R);

  Roots.forEach((r) => {
    result.push(size[r]);
  });

  return result.join('\n');
}

const arr = n.split(' ').map(Number);
const edges = input.slice(0, -arr[2]);
const roots = input.slice(-arr[2]);

const answer = solution(
  arr[0],
  arr[1],
  arr[2],
  edges.map((r) => r.split(' ').map(Number)),
  roots.map(Number),
);

console.log(answer);
