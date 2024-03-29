const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, ...input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(folderNum, fileNum, input) {
  const tree = {};
  const result = [];
  let fileSet = new Set();
  let fileCnt = 0;

  //트리를 만들고
  for (let i = 0; i < folderNum + fileNum; i++) {
    const [parent, child, isFolder] = input[i].split(' ');
    if (!tree[parent]) tree[parent] = [];
    tree[parent].push({ isFolder: Number(isFolder), child });
  }

  //dfs로 자식 노드 순회하면서 파일 개수와 종류 추가
  for (let i = folderNum + fileNum + 1; i < input.length; i++) {
    fileSet = new Set();
    fileCnt = 0;

    const arr = input[i].split('/');
    const folder = arr.at(-1);
    dfs(folder);

    result.push(`${fileSet.size} ${fileCnt}`);
  }

  function dfs(parent) {
    tree[parent]?.forEach(({ child, isFolder }) => {
      if (isFolder) {
        dfs(child);
      } else {
        fileCnt++;
        fileSet.add(child);
      }
    });
  }

  return result.join('\n');
}

const [folderNum, fileNum] = n.split(' ').map(Number);

const answer = solution(folderNum, fileNum, input);

console.log(answer);
