const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
//입력값 1개(1줄)
const input = require('fs').readFileSync(filePath).toString().trim();

//입력값 여러개 (1줄)
// let input = require('fs').readFileSync(filePath).toString().trim().split(' ');

//입력값 여러 줄
// let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
// const [n, ...input] = require('fs').readFileSync(filePath).toString().trim().split('\n');

function solution(N) {
  const result = [`어느 한 컴퓨터공학과 학생이 유명한 교수님을 찾아가 물었다.`];
  const q = [
    `"재귀함수가 뭔가요?"`,
    `"잘 들어보게. 옛날옛날 한 산 꼭대기에 이세상 모든 지식을 통달한 선인이 있었어.`,
    `마을 사람들은 모두 그 선인에게 수많은 질문을 했고, 모두 지혜롭게 대답해 주었지.`,
    `그의 답은 대부분 옳았다고 하네. 그런데 어느 날, 그 선인에게 한 선비가 찾아와서 물었어."`,
  ];
  const last = [
    `"재귀함수가 뭔가요?"`,
    `"재귀함수는 자기 자신을 호출하는 함수라네"`,
  ];

  const a = [`라고 답변하였지.`];

  function recursive(n) {
    const bar = new Array(n).fill('____').join('');

    if (n === N) {
      last.forEach((l) => {
        result.push(bar + l);
      });
      result.push(bar + a[0]);
      return;
    }
    q.forEach((q) => {
      result.push(bar + q);
    });
    recursive(n + 1);
    result.push(bar + a[0]);
  }

  recursive(0);

  return result.join('\n');
}

const answer = solution(Number(input));

console.log(answer);
