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

function solution(N, paper) {
  let zero = 0;
  let positive = 0;
  let negative = 0;

  //r=행 시작 인덱스, c=열 시작 인덱스, n=크기
  function recursive(r, c, n) {
    if (n === 1) {
      if (paper[r][c] === 0) zero++;
      if (paper[r][c] === -1) negative++;
      if (paper[r][c] === 1) positive++;
      return;
    }

    let flag = true;
    for (let i = r; i < r + n && flag; i++) {
      for (let j = c; j < c + n; j++) {
        if (paper[i][j] !== paper[r][c]) {
          flag = false;
          break;
        }
      }
    }

    if (flag) {
      if (paper[r][c] === 0) zero++;
      if (paper[r][c] === -1) negative++;
      if (paper[r][c] === 1) positive++;
      return;
    }

    recursive(r, c, n / 3);
    recursive(r, c + n / 3, n / 3);
    recursive(r, c + (n / 3) * 2, n / 3);

    recursive(r + n / 3, c, n / 3);
    recursive(r + n / 3, c + n / 3, n / 3);
    recursive(r + n / 3, c + (n / 3) * 2, n / 3);

    recursive(r + (n / 3) * 2, c, n / 3);
    recursive(r + (n / 3) * 2, c + n / 3, n / 3);
    recursive(r + (n / 3) * 2, c + (n / 3) * 2, n / 3);
  }

  recursive(0, 0, N);

  return [negative, zero, positive].join('\n');
}

const answer = solution(
  Number(n),
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
