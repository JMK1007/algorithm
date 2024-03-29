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

function solution(N, A) {
  let city = Array.from(new Array(N), () => new Array(N).fill(0));
  let result = Infinity;

  function resetCity() {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        city[i][j] = 5;
      }
    }
  }

  function fillCity(y, x, d1, d2) {
    let check = 0;
    for (let r = 0; r < x + d1; r++) {
      if (r >= x) check++;

      for (let c = 0; c <= y - check; c++) {
        city[r][c] = 1;
      }
    }

    check = 0;
    for (let r = 0; r <= x + d2; r++) {
      if (r > x) check++;

      for (let c = y + 1 + check; c < N; c++) {
        city[r][c] = 2;
      }
    }

    check = 0;
    for (let r = x + d1; r < N; r++) {
      if (r <= x + d1 + d2) check++;

      for (let c = 0; c < y - d1 + check - 1; c++) {
        city[r][c] = 3;
      }
    }

    check = 0;

    for (let r = x + d2 + 1; r < N; r++) {
      if (r <= x + d1 + d2 + 1) check++;
      for (let c = y + d2 - check + 1; c < N; c++) {
        city[r][c] = 4;
      }
    }
  }

  function getDiff() {
    const count = {};
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const district = city[i][j];
        count[district] = (count[district] || 0) + A[i][j];
      }
    }

    const max = Math.max(...Object.values(count));
    const min = Math.min(...Object.values(count));
    result = Math.min(max - min, result);
  }

  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      for (let d1 = 1; d1 < N; d1++) {
        for (let d2 = 1; d2 < N; d2++) {
          if (!(x + d1 + d2 <= N - 1 && y - d1 >= 0 && y + d2 <= N - 1))
            continue;
          fillCity(y, x, d1, d2);
          getDiff();
          resetCity();
        }
      }
    }
  }

  return result;
}

const answer = solution(
  Number(n),
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
