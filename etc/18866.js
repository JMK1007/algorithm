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

function solution(N, years) {
  let k = -1;

  const young = Array.from(new Array(N), () => [0, 0]);
  const old = Array.from(new Array(N), () => [0, 0]);

  //젋은날 min행복 > 늙은날 max행복
  //젊은날 max 피로< 늙은날 min피로
  let min_happy = Infinity;
  let max_tired = -Infinity;

  for (let i = 0; i < N; i++) {
    const [happy, tired] = years[i];
    if (happy < min_happy && happy !== 0) min_happy = happy;
    if (tired > max_tired && tired !== 0) max_tired = tired;

    young[i][0] = min_happy;
    young[i][1] = max_tired;
  }

  //젋은날 min행복 > 늙은날 max행복
  //젊은날 max 피로< 늙은날 min피로
  let max_happy = -Infinity;
  let min_tired = Infinity;

  for (let i = N - 1; i >= 0; i--) {
    const [happy, tired] = years[i];
    if (happy > max_happy && happy !== 0) max_happy = happy;
    if (tired < min_tired && tired !== 0) min_tired = tired;

    old[i][0] = max_happy;
    old[i][1] = min_tired;
  }

  //젋은날 min행복 > 늙은날 max행복
  //젊은날 max 피로< 늙은날 min피로

  for (let i = 0; i < N - 1; i++) {
    if (young[i][0] > old[i + 1][0] && young[i][1] < old[i + 1][1]) {
      k = i + 1;
    }
  }

  return k;
}

const answer = solution(
  Number(n),
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
