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

  //DP[k]=k번째 날 얻을 수 있는 최대 수익
  // DP[k]= 이전에 얻을 수 있는 최대 수익+ 오늘 수익

  for (let i = 0; i < N; i++) {
    const [term, profit] = Days[i];

    if (i + term > N) continue;

    DP[i] += profit;
    for (let j = i + term; j < N; j++) {
      DP[j] = Math.max(DP[i], DP[j]);
    }
  }

  return Math.max(...DP);
}

const answer = solution(
  Number(n),
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
