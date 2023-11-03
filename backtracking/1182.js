const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
//입력값 1개(1줄)
// const input = require('fs').readFileSync(filePath).toString().trim();

//입력값 여러개 (1줄)
// let input = require('fs').readFileSync(filePath).toString().trim().split(' ');

//입력값 여러 줄
let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
// const [n, ...input] = require('fs').readFileSync(filePath).toString().trim().split('\n');

function solution(n, s, sequence) {
  //조합
  //완전탐색
  //백트래킹

  //모든 부분 수열을 구하고
  //합이 s가 되는 수열 찾기

  let cnt = 0;

  //함수의 정의
  //function tracking(부분수열의 합, 방문할 인덱스값)
  function tracking(sum, idx) {
    //base condition
    if (idx === n) {
      return;
    }

    if (sum + sequence[idx] === s) {
      cnt++;
    }

    //현재 원소 사용하는 사용하는 경우
    //현재 원소 사용 안하는 경우

    tracking(sum + sequence[idx], idx + 1);
    tracking(sum, idx + 1);
  }

  tracking(0, 0);
  return cnt;
}

const first = input[0].split(' ').map(Number);
const second = input[1].split(' ').map(Number);

const answer = solution(first[0], first[1], second);

console.log(answer);
