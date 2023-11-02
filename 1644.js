const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
//입력값 1개(1줄)
const input = require('fs').readFileSync(filePath).toString().trim();

//입력값 여러개 (1줄)
// let input = require('fs').readFileSync(filePath).toString().trim().split(' ');

//입력값 여러 줄
// let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
// const [n, ...input] = require('fs').readFileSync(filePath).toString().trim().split('\n');

function solution(n) {
  // 투포인터
  // n이하의 소수 테이블을 채움
  // 투포인터로 합이 나올 수 있는지 확인

  const table = [];
  let start = 0;
  let end = 0;
  let sum = 0;
  let cnt = 0;

  for (let i = 2; i <= n; i++) {
    if (isPrime(i)) table.push(i);
  }

  function isPrime(num) {
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }

    return true;
  }

  if (n < 2) return 0;

  sum = table[0];
  for (; start < table.length; start++) {
    while (sum < n && end < table.length) {
      end++;
      if (end < table.length) sum += table[end];
    }

    if (end === table.length) break;

    if (sum === n) cnt++;
    sum -= table[start];
  }

  return cnt;
}

const answer = solution(Number(input));

console.log(answer);
