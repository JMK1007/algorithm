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

function solution(N, tree) {
  const parentArr = new Array(N + 1).fill(0);
  const lcObj = {};
  const rcObj = {};
  const preOrder = [];
  const inOrder = [];
  const postOrder = [];

  function convert(alphabet) {
    return alphabet.charCodeAt(0) - 'A'.charCodeAt(0);
  }

  tree.forEach(([n, l, r]) => {
    if (l !== '.') lcObj[n] = l;
    if (r !== '.') rcObj[n] = r;
  });

  function dfsPre(parent) {
    if (!parent) return;
    preOrder.push(parent);
    dfsPre(lcObj[parent]);
    dfsPre(rcObj[parent]);
  }

  function dfsIn(parent) {
    if (!parent) return;
    dfsIn(lcObj[parent]);
    inOrder.push(parent);
    dfsIn(rcObj[parent]);
  }

  function dfsPost(parent) {
    if (!parent) return;
    dfsPost(lcObj[parent]);
    dfsPost(rcObj[parent]);
    postOrder.push(parent);
  }

  dfsPre('A');
  dfsIn('A');
  dfsPost('A');

  return [preOrder.join(''), inOrder.join(''), postOrder.join('')].join('\n');
}

const answer = solution(
  Number(n),
  input.map((r) => r.split(' ')),
);

console.log(answer);
