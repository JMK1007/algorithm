const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

//입력값 여러 줄
let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

function solution(input) {
  const [N, M] = input[0].split(' ').map(Number);
  const routes = input.slice(1, -1).map((r) => r.split(' ').map(Number));
  const [S, E] = input.at(-1).split(' ').map(Number);
  const adjacentList = {};

  //visited[node][0] = 방문 여부, visited[node][1] = 최단거리 경로 저장한 것
  let visited = Array.from(new Array(N + 1), () => [false, []]);
  let queue = [];
  let result = 0;

  //인접리스트
  routes.forEach(([s, e]) => {
    if (!adjacentList[s]) adjacentList[s] = [];
    if (!adjacentList[e]) adjacentList[e] = [];

    adjacentList[s].push(e);
    adjacentList[e].push(s);
  });

  //정렬
  function sortList() {
    for (arr in adjacentList) {
      adjacentList[arr].sort((a, b) => a - b);
    }
  }

  //bfs로 S->E, E->S 최단 거리 구하기
  function bfs(start, end) {
    queue.push(start);
    visited[start][0] = true;

    while (queue.length) {
      const cur = queue.shift();
      visited[cur][1].push(cur);

      if (cur === end) {
        result += visited[cur][1].length - 1;
        break;
      }

      adjacentList[cur].forEach((node) => {
        if (!visited[node][0]) {
          visited[node][0] = true;
          visited[node][1] = [...visited[cur][1]];
          queue.push(node);
        }
      });
    }

    queue = [];
  }

  sortList();
  bfs(S, E);
  //S->E 최단거리를 구한 다음
  //시작, 끝 노드를 제외한 최단거리 노드들은 다시 방문해서는 안되므로 true처리
  const shorted = [...visited[E][1]];
  visited = Array.from(new Array(N + 1), () => [false, []]);
  for (node of shorted) {
    visited[node][0] = true;
  }

  visited[S][0] = false;
  visited[E][0] = false;

  bfs(E, S);

  return result;
}

const answer = solution(input);

console.log(answer);
