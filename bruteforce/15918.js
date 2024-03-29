const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
//입력값 1개(1줄)
const input = require('fs').readFileSync(filePath).toString().trim();

function solution(n, x, y) {
  const arr = new Array(n * 2 + 1).fill(0);
  arr[0] = -1;
  let cnt = 0;

  const init = y - x - 1;
  arr[x] = init;
  arr[y] = init;
  const visited = new Array(n + 1).fill(false);
  visited[0] = true;
  visited[init] = true;

  function brute() {
    const currentIdx = arr.findIndex((v) => v === 0);

    if (currentIdx === -1) {
      cnt++;
      return;
    }

    for (let idx = 1; idx <= n; idx++) {
      const nextIdx = currentIdx + idx + 1;
      if (!visited[idx] && nextIdx < arr.length && arr[nextIdx] === 0) {
        visited[idx] = true;
        arr[currentIdx] = idx;
        arr[nextIdx] = idx;
        brute();
        visited[idx] = false;
        arr[currentIdx] = 0;
        arr[nextIdx] = 0;
      }
    }
  }

  brute();
  return cnt;
}

const [n, x, y] = input.split(' ').map(Number);

const answer = solution(n, x, y);

console.log(answer);
