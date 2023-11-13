const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
//입력값 1개(1줄)
// const input = require('fs').readFileSync(filePath).toString().trim();

//입력값 여러개 (1줄)
// let input = require('fs').readFileSync(filePath).toString().trim().split(' ');

//입력값 여러 줄
let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
// const [n, ...input] = require('fs').readFileSync(filePath).toString().trim().split('\n');

function solution(N, M, Seq) {
  const result = [];
  Seq.sort((a, b) => a - b);

  function back(arr, idx) {
    if (arr.length === M) {
      result.push(arr.join(' '));
      return;
    }

    if (idx >= N) {
      return;
    }

    //중복되는 수 o
    //조합
    back([...arr, Seq[idx]], idx);
    back([...arr], idx + 1);
  }

  back([], 0);

  return result.join('\n');
}

const [N, M] = input[0].split(' ').map(Number);

const Seq = input[1].split(' ').map(Number);

const answer = solution(N, M, Seq);

console.log(answer);
