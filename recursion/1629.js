const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
//입력값 1개(1줄)
// const input = require('fs').readFileSync(filePath).toString().trim();

//입력값 여러개 (1줄)
let input = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(' ')
  .map(BigInt);

//입력값 여러 줄
// let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
// const [n, ...input] = require('fs').readFileSync(filePath).toString().trim().split('\n');

function solution(a, b, c) {
  //a^b%c = ((a^b/2 %c)*2)%c

  function recursive(a, b, c) {
    if (b === 1n) {
      return a % c;
    }

    const mid = b / 2n;

    let val = recursive(a, mid, c);
    val *= val;
    val %= c;

    if (b % 2n === 0n) {
      return val;
    }
    return (val * a) % c;
  }

  return recursive(a, b, c);
}

const answer = solution(input[0], input[1], input[2]);

console.log(answer.toString().split('n')[0]);
