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

function solution(N, M, K, edges) {
  let parent = Array.from(new Array(N + 1), (_, i) => i);
  const result = [];

  edges.forEach((item, idx) => item.push(idx + 1));

  function findParent(v) {
    if (parent[v] === v) return v;
    return (parent[v] = findParent(parent[v]));
  }

  function unionParent(v1, v2) {
    v1 = findParent(v1);
    v2 = findParent(v2);
    if (v1 < v2) parent[v2] = v1;
    else parent[v1] = v2;
  }

  function isSameTree(v1, v2) {
    return findParent(v1) === findParent(v2);
  }

  for (let i = 0; i < K; i++) {
    let edgeCnt = 0;
    let minIdx = 0;
    let sum = 0;
    for (let j = 0; j < edges.length; j++) {
      const [v1, v2, w] = edges[j];

      if (!isSameTree(v1, v2)) {
        unionParent(v1, v2);
        edgeCnt++;
        sum += w;
        if (edgeCnt === 1) minIdx = j;
        if (edgeCnt === N - 1) break;
      }
    }

    if (edgeCnt === N - 1) {
      result.push(sum);
      edges.splice(minIdx, 1);
    } else {
      //아예 MST가 존재하지 않으면 모든 턴에 0을 리턴
      if (i === 0) return new Array(K).fill(0).join(' ');
      result.push(0);
    }

    parent = Array.from(new Array(N + 1), (_, i) => i);
  }

  return result.join(' ');
}

const [N, M, K] = n.split(' ').map(Number);

const answer = solution(
  N,
  M,
  K,
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
