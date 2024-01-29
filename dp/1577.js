const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

const [size, k, ...k_List] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

const [N, M] = size.split(' ').map(Number);
function solution(N, M, K_List) {
  const DP = Array.from(new Array(N + 1), () => new Array(M + 1).fill(0n));
  DP[0][0] = 1n;

  const dr = [0, 1];
  const dc = [1, 0];

  const construction = new Set();
  K_List.forEach(([a, b, c, d]) => {
    if (a < c || b < d) construction.add(`${a},${b},${c},${d}`);
    else construction.add(`${c},${d},${a},${b}`);
  });

  for (let i = 0; i <= N; i++) {
    for (let j = 0; j <= M; j++) {
      for (let k = 0; k < 2; k++) {
        const prevR = i - dr[k];
        const prevC = j - dc[k];
        if (prevR >= 0 && prevC >= 0) {
          if (!construction.has(`${prevR},${prevC},${i},${j}`)) {
            DP[i][j] += DP[prevR][prevC];
          }
        }
      }
    }
  }

  return DP[N][M].toString();
}

const answer = solution(
  N,
  M,
  k_List.map((k) => k.split(' ').map(Number)),
);

console.log(answer);
