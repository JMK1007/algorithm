const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [first, ...carrots] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(n, t, carrots) {
  let sum = 0n;

  carrots.sort((a, b) => {
    const aPowerUp = a[1];
    const bPowerUp = b[1];

    if (aPowerUp < bPowerUp) return -1;
    if (aPowerUp === bPowerUp) return 0;
    return 1;
  });

  for (let i = n - 1, d = t - 1n; i >= 0; i--, d--) {
    const [originalPower, powerUp] = carrots[i];
    sum += originalPower + powerUp * (d > 0n ? d : 0n);
  }

  return sum.toString();
}

const [n, t] = first.split(' ');

const answer = solution(
  Number(n),
  BigInt(t),
  carrots.map((r) => r.split(' ').map(BigInt)),
);

console.log(answer);
