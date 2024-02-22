const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, ...input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(N, nodeList, S) {
  //트리를 만들기 위해 연결된 정점끼리 연결리스트를 만듦
  //재귀적으로 노드들을 방문함
  //이때 방문한 노드들을 체크하면서 부모노드를 자식노드로 방문하지 않게끔 함
  //left는 처음 방문했을 당시 횟수고 말단노드의 경우 right=left+1

  const adjacencyList = new Map();
  const result = [];

  nodeList.forEach((row) => {
    const [node, ...connectedNodeList] = row;
    adjacencyList.set(node, connectedNodeList.slice(0, -1));
  });

  function traversal(node, parent, idx) {
    const inIdx = idx;
    let outIdx = idx + 1;
    const connectedNodeList = adjacencyList.get(node).sort((a, b) => a - b);
    connectedNodeList.forEach((connectedNode) => {
      if (connectedNode !== parent) {
        outIdx = traversal(connectedNode, node, outIdx);
      }
    });

    result.push([node, inIdx, outIdx]);
    return outIdx + 1;
  }

  traversal(S, S, 1);

  return result
    .sort((a, b) => a[0] - b[0])
    .map((r) => r.join(' '))
    .join('\n');
}

const answer = solution(
  Number(n),
  input.slice(0, -1).map((r) => r.split(' ').map(Number)),
  Number(input[input.length - 1]),
);

console.log(answer);

/**
 * 다른 풀이
 * 오일러 경로 테크닉
 * 
 * const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, ...input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(N, nodeList, S) {

  const adjacencyList = {};
  const result = [];

  const s = new Array(N + 1).fill(0);
  const e = new Array(N + 1).fill(0);
  let cnt = 0;

  nodeList.forEach((row) => {
    const node = row[0];
    const nodeList = [];
    for (let i = 1; i < row.length; i++) {
      if (row[i] === -1) break;
      nodeList.push(row[i]);
    }
    adjacencyList[node] = nodeList.sort((a, b) => a - b);
  });

  function dfs(node, parent) {
    s[node] = ++cnt;

    const nodeList = adjacencyList[node];

    nodeList.forEach((connectedNode) => {
      if (connectedNode !== parent) {
        dfs(connectedNode, node);
      }
    });

    e[node] = ++cnt;
  }

  dfs(S, S);

  for (let i = 1; i <= N; i++) {
    result.push([i, s[i], e[i]]);
  }

  return result
    .sort((a, b) => a[0] - b[0])
    .map((r) => r.join(' '))
    .join('\n');
}

const answer = solution(
  Number(n),
  input.slice(0, -1).map((r) => r.trim().split(' ').map(Number)),
  Number(input[input.length - 1]),
);

console.log(answer);
 * 
 */
