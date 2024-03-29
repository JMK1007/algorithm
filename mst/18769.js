const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, ...input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(n, input) {
  let i = 0;
  const result = [];
  let parent;

  function findParent(v) {
    if (parent[v] === v) return v;
    return (parent[v] = findParent(parent[v]));
  }

  function union(v1, v2) {
    v1 = findParent(v1);
    v2 = findParent(v2);
    if (v1 === v2) return true;
    if (v1 < v2) parent[v2] = v1;
    else parent[v1] = v2;
  }

  function isSameParent(v1, v2) {
    return findParent(v1) === findParent(v2);
  }

  while (i < input.length) {
    const [r, c] = input[i];
    const rGraph = input.slice(i + 1, i + r + 1);
    const cGraph = input.slice(i + r + 1, i + r * 2);
    parent = Array.from(new Array(r * c), (_, idx) => idx);
    const weightList = [];
    i += r + r;
    let edgeCnt = r * c - 1;
    let weightSum = 0;

    for (let rIdx = 0; rIdx < r; rIdx++) {
      for (let cIdx = 0; cIdx < c - 1; cIdx++) {
        weightList.push({
          v1: rIdx * c + cIdx,
          v2: rIdx * c + cIdx + 1,
          weight: rGraph[rIdx][cIdx],
        });
      }
    }

    for (let rIdx = 0; rIdx < r - 1; rIdx++) {
      for (let cIdx = 0; cIdx < c; cIdx++) {
        weightList.push({
          v1: rIdx * c + cIdx,
          v2: (rIdx + 1) * c + cIdx,
          weight: cGraph[rIdx][cIdx],
        });
      }
    }

    weightList.sort((a, b) => b.weight - a.weight);

    while (edgeCnt !== 0) {
      const { v1, v2, weight } = weightList.pop();
      if (!isSameParent(v1, v2)) {
        union(v1, v2);
        edgeCnt--;
        weightSum += weight;
      }
    }

    result.push(weightSum);
  }

  return result.join('\n');
}

const answer = solution(
  Number(n),
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
