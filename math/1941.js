const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

//입력값 여러 줄
let input = require('fs').readFileSync(filePath).toString().trim().split('\n');

function solution(map) {
  const combinationR = Array.from(new Array(25), (_, idx) =>
    Math.floor(idx / 5),
  );
  const combinationC = Array.from(new Array(25), (_, idx) =>
    Math.floor(idx % 5),
  );
  let isVisited = Array.from(new Array(5), () => new Array(5).fill(false));

  const dr = [0, 0, 1, -1];
  const dc = [1, -1, 0, 0];
  let result = 0;

  //5x5배열에서 7개를 고르는 조합을 구함
  function combination(numArr, num) {
    if (num > 25) return;

    if (numArr.length === 7) {
      bfs(numArr);
      isVisited = Array.from(new Array(5), () => new Array(5).fill(false));
      return;
    }

    combination([...numArr, num], num + 1);
    combination([...numArr], num + 1);
  }

  //구한 조합이 모두 인접해있는지, S가 4이상인지 확인함
  function bfs(numArr) {
    const q = [];
    const start = numArr[0];
    const r = combinationR[start];
    const c = combinationC[start];
    let checkCnt = 1;
    let sCnt = 0;

    q.push(start);
    isVisited[r][c] = true;
    if (map[r][c] === 'S') sCnt++;

    while (q.length) {
      const current = q.shift();
      const r = combinationR[current];
      const c = combinationC[current];

      if (checkCnt === 7) {
        if (sCnt >= 4) {
          result++;
        }
        break;
      }

      for (let i = 0; i < 4; i++) {
        const nextR = r + dr[i];
        const nextC = c + dc[i];

        if (
          nextR >= 0 &&
          nextR < 5 &&
          nextC >= 0 &&
          nextC < 5 &&
          !isVisited[nextR][nextC] &&
          numArr.includes(nextR * 5 + nextC)
        ) {
          if (map[nextR][nextC] === 'S') sCnt++;
          checkCnt++;
          isVisited[nextR][nextC] = true;
          q.push(nextR * 5 + nextC);
        }
      }
    }
  }

  combination([], 0);

  return result;
}

const answer = solution(input.map((r) => r.split('')));

console.log(answer);
