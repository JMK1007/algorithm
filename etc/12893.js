const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, ...input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(N, M, list) {
  const parent = Array.from(new Array(N + 1), (_, idx) => idx);
  const enemy = new Array(N + 1).fill(0);

  function getParent(node) {
    if (parent[node] === node) return node;
    return (parent[node] = getParent(parent[node]));
  }

  function union(node1, node2) {
    node1 = getParent(node1);
    node2 = getParent(node2);

    if (node1 < node2) parent[node2] = node1;
    if (node2 < node1) parent[node1] = node2;
  }

  //적군의 적군 = 아군
  //아군 그룹을 만들고
  //적대 관계의 노드들이 아군에 포함되어있으면 reutrn 0;
  for (const [a, b] of list) {
    if (getParent(a) === getParent(b)) {
      return 0;
    }

    //a의 적군이 있다면
    //a의 적군들의 집합에 현재 적대관계를 추가해줌
    //적군이 없다면 적군에 추가해줌
    if (enemy[a]) {
      union(b, enemy[a]);
    } else {
      enemy[a] = b;
    }

    //b도 마찬가지
    if (enemy[b]) {
      union(a, enemy[b]);
    } else {
      enemy[b] = a;
    }
  }

  return 1;
}

const [N, M] = n.split(' ').map(Number);

const list = input.map((r) => r.split(' ').map(Number));

const answer = solution(N, M, list);

console.log(answer);
