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

function solution(N, Days) {
  const DP = new Array(N).fill(0);

  //DP[k]=얻을 수 있는 최대 수익
  //뒤에서부터 탐색!
  //1. K에 일하는 경우
  //3. K에 일 안하는 경우

  //마지막날
  const [term, profit] = Days[N - 1];
  if (term === 1) {
    DP[N - 1] = profit;
  }

  for (let i = N - 2; i >= 0; i--) {
    const [term, profit] = Days[i];

    //일정이 퇴사 이후라서 오늘 일 못하는 경우
    if (i + term > N) {
      DP[i] = DP[i + 1];
      continue;
    }

    const workToday = profit + (i + term < N ? DP[i + term] : 0);
    const notWorkToday = DP[i + 1];

    DP[i] = Math.max(workToday, notWorkToday);
  }

  return DP[0];
}

const answer = solution(
  Number(n),
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
