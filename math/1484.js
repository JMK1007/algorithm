const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
//입력값 1개(1줄)
const input = require('fs').readFileSync(filePath).toString().trim();

function solution(G) {
  const result = [];
  //구해야 하는 값 = 현재
  //G=현재^2-과거^2
  //모두 자연수여야 함

  for (let current = 1; current < 1000000; current++) {
    const prev = Math.sqrt(current ** 2 - G);
    if (prev > 0 && current !== prev && prev === Math.floor(prev))
      result.push(current);
  }

  return result.length === 0 ? '-1' : result.join('\n');
}

const answer = solution(Number(input));

console.log(answer);
