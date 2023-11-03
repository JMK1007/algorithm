const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
//입력값 1개(1줄)
const input = require('fs').readFileSync(filePath).toString().trim();

//입력값 여러개 (1줄)
// let input = require('fs').readFileSync(filePath).toString().trim().split(' ');

//입력값 여러 줄
// let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
// const [n, ...input] = require('fs').readFileSync(filePath).toString().trim().split('\n');

function solution(k) {
  const arr = [];
  let cnt = 0;
  //재귀는 귀납적 사고 방식!

  //n-1 원판을 (6-시작장대-도착장대)로 옮기기
  //n 원판을 도착장대로 옮기기
  //n-1원판을 도착장대로 옮기기

  //시작 장대, 도착장대, 원판 개수
  function move(s, d, n) {
    cnt++;
    if (n === 1) {
      arr.push([s, d]);
      return;
    }
    move(s, 6 - s - d, n - 1);
    arr.push([s, d]);
    move(6 - s - d, d, n - 1);
  }

  move(1, 3, k);
  return [cnt, arr.map((item) => item.join(' ')).join('\n')];
}

const answer = solution(Number(input));

console.log(answer.join('\n'));
