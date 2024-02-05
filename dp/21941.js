const file_path = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
//입력값 1개(1줄)
// const input = require('fs').readFileSync(file_path).toString().trim();

//입력값 여러개 (1줄)
// let input = require('fs').readFileSync(file_path).toString().trim().split(' ');

//입력값 여러 줄
// let input = require('fs').readFileSync(file_path).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [S, M, ...A] = require('fs')
  .readFileSync(file_path)
  .toString()
  .trim()
  .split('\n');

function solution(S, M, A) {
  S.unshift(0);
  const dp = new Array(S.length).fill(0);

  //S를 한칸씩 돌면서 최대값을 갱신함
  for (let i = 1; i < S.length; i++) {
    //모든 A문자열을 순회하면서
    //현재 칸과 A문자열의 시작이 같은 것을 찾음
    for (const [a, x] of A) {
      if (a[0] === S[i]) {
        const tmp_str = S.slice(i, i + a.length).join('');

        //같다면 A문자열을 삭제할 수 있는지 확인
        //삭제가능한 문자열이 끝나는 위치의 최대값을 갱신해줌
        if (tmp_str === a && i + a.length - 1 < dp.length) {
          dp[i + a.length - 1] = Math.max(dp[i - 1] + x, dp[i + a.length - 1]);
        }
      }
    }
    //현재 위치의 최대값을 갱신해줌
    //dp[i]= Math.max(dp[i-1]+1, dp[i])
    dp[i] = Math.max(dp[i - 1] + 1, dp[i]);
  }

  return dp[S.length - 1];
}

const answer = solution(
  S.split(''),
  Number(M),
  A.map((str) => {
    const [a, x] = str.split(' ');
    return [a, Number(x)];
  }),
);

console.log(answer);
