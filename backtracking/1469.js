const file_path = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, input] = require('fs')
  .readFileSync(file_path)
  .toString()
  .trim()
  .split('\n');

function solution(N, X) {
  X.sort((a, b) => a - b);
  const INITIAL_VALUE = Infinity;
  let s = new Array(N * 2).fill(INITIAL_VALUE);
  const result = [];
  const visited = {};

  function brute(arr) {
    if (arr.length === N) {
      result.push([...s]);
      return;
    }

    for (let i = 0; i < N; i++) {
      const current_val = X[i];
      const current_idx = s.findIndex((data) => data === INITIAL_VALUE);

      if (
        !visited[current_val] &&
        current_idx !== -1 &&
        current_idx + current_val + 1 < 2 * N &&
        s[current_idx + current_val + 1] === INITIAL_VALUE
      ) {
        visited[current_val] = true;
        s[current_idx] = current_val;
        s[current_idx + current_val + 1] = current_val;
        brute([...arr, current_val]);
        s[current_idx] = INITIAL_VALUE;
        s[current_idx + current_val + 1] = INITIAL_VALUE;
        visited[current_val] = false;
      }
    }
  }

  brute([]);

  return result.length ? result[0].join(' ') : -1;
}

const answer = solution(Number(n), input.split(' ').map(Number));

console.log(answer);
