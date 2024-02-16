const file_path = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
//입력값 1개(1줄)
// const input = require('fs').readFileSync(file_path).toString().trim();

//입력값 여러개 (1줄)
// let input = require('fs').readFileSync(file_path).toString().trim().split(' ');

//입력값 여러 줄
// let input = require('fs').readFileSync(file_path).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, ...input] = require('fs')
  .readFileSync(file_path)
  .toString()
  .trim()
  .split('\n');

function solution(N, node_list) {
  let cnt = 0;
  const tree = {};
  let root = 1;
  let last_node = 1;

  node_list.forEach(([parent, left_child, right_child]) => {
    tree[parent] = [left_child, right_child];
  });

  let parent = 1;

  //중위 순회 마지막 노드는 가장 오른쪽 노드
  while (1) {
    const right_child = tree[parent][1];
    if (right_child === -1) {
      last_node = parent;
      break;
    }
    parent = right_child;
  }

  function traversal(parent) {
    const [left_child, right_child] = tree[parent];

    //왼쪽 자식노드 있으면 방문
    //왕복 +1, +1
    if (left_child !== -1) {
      cnt++;
      if (traversal(left_child)) return true;
      cnt++;
    }

    //오른쪽 자식노드 있으면 방문
    //왕복 +1, +1
    if (right_child !== -1) {
      cnt++;
      if (traversal(right_child)) return true;
      cnt++;
    }

    //마지막노드면 return true하고 재귀함수 종료
    if (parent !== 1 && parent === last_node) return true;

    return false;
  }

  traversal(root);

  return cnt;
}

const answer = solution(
  Number(n),
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
