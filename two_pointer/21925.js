const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');
function solution(n, arr) {
  let start = 0;
  let end = 2;
  let cnt = 0;

  //투포인터
  //start, end = 부분 배열의 시작과 끝을 저장
  //부분 수열의 길이가 짝수여야 하므로 end는 2씩 증가함
  //[start ~ end] 배열을 이등분해서 왼쪽 배열(left)과 오른쪽 배열(right)이 좌우 반전되는지 확인함
  //만약 전체 배열의 마지막에 도달했는데 부분 수열이 팰린드롬을 만족하지 못한다면 -1
  while (end <= n) {
    const left = arr.slice(start, start + (end - start) / 2).join('-');
    const right = arr
      .slice(start + (end - start) / 2, end)
      .reverse()
      .join('-');

    if (end === n && left !== right) {
      cnt = 0;
    }

    if (left === right) {
      cnt++;
      start = end;
    }

    end += 2;
  }

  return cnt ? cnt : -1;
}

const answer = solution(Number(n), input.split(' ').map(Number));

console.log(answer);
