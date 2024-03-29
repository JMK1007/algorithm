const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, ...input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(n, allPlayerList) {
  let score = 0;

  const visited = new Array(9).fill(false);

  function dfs(arr) {
    if (arr.length === 8) {
      getScore([...arr.slice(0, 3), 0, ...arr.slice(3)]);
      return;
    }
    for (let i = 1; i < 9; i++) {
      if (!visited[i]) {
        visited[i] = true;
        dfs([...arr, i]);
        visited[i] = false;
      }
    }
  }

  function getScore(playerTurnArr) {
    let tmpScore = 0;
    let currentIdx = 0;

    for (let i = 0; i < n; i++) {
      const players = allPlayerList[i];
      let out = 0;
      let base1 = 0;
      let base2 = 0;
      let base3 = 0;

      while (out < 3) {
        if (currentIdx === 9) currentIdx = 0;

        const hit = players[playerTurnArr[currentIdx]];

        switch (hit) {
          case 0:
            out++;
            break;
          case 1:
            tmpScore += base3;
            base3 = base2;
            base2 = base1;
            base1 = 1;
            break;
          case 2:
            tmpScore += base3 + base2;
            base3 = base1;
            base2 = 1;
            base1 = 0;
            break;
          case 3:
            tmpScore += base3 + base2 + base1;
            base1 = base2 = 0;
            base3 = 1;
            break;
          default:
            tmpScore += base3 + base2 + base1 + 1;
            base1 = base2 = base3 = 0;
        }

        currentIdx++;
      }
    }

    score = Math.max(score, tmpScore);
  }

  dfs([]);
  return score;
}

const answer = solution(
  Number(n),
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
