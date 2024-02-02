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

function solution(T, test_case_list) {
  let result = [];

  //놓친 부분
  //1. 사이클을 어떻게 처리하느냐!
  //팀이 이뤄지지 않는 경우는 다시 방문 false처리 했더니 방문했던 노드들을 재방문 하게 되어서 메모리 초과 발생함
  //중요한건 방문 처리와 사이클 처리를 이중으로 하는 것이었다..
  //참고 블로그: https://jaimemin.tistory.com/674

  for (let i = 0; i < T; i++) {
    const N = Number(test_case_list[i * 2]);
    const test_case = [
      Infinity,
      ...test_case_list[i * 2 + 1].split(' ').map(Number),
    ];
    const visited = new Array(N + 1).fill(false);
    const done = new Array(N + 1).fill(false);
    let include_cnt = 0;

    for (let j = 1; j <= N; j++) {
      dfs(j);

      function dfs(next) {
        if (!visited[next]) {
          visited[next] = true;
          dfs(test_case[next]);
        } else if (!done[next]) {
          for (let k = test_case[next]; k !== next; k = test_case[k]) {
            include_cnt++;
          }
          include_cnt++;
        }
        done[next] = true;
      }
    }

    result.push(test_case.length - include_cnt - 1);
  }

  return result.join('\n');
}

const answer = solution(Number(n), input);

console.log(answer);
