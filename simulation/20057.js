const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, ...arr] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(n, desert) {
  //1,1 2,2 3,3 4,4
  //같은 수가 2개씩 반복
  //해당 수만큼 같은 방향
  //서->남->동->북

  let initialSand = desert
    .map((r) => r.reduce((prev, cur) => (prev += cur), 0))
    .reduce((prev, cur) => (prev += cur), 0);

  const west = [
    [-2, 0],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -2],
    [1, -1],
    [1, 0],
    [1, 1],
    [2, 0],
    [0, -1],
  ];

  const east = [
    [-2, 0],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, 2],
    [1, 1],
    [1, 0],
    [1, -1],
    [2, 0],
    [0, 1],
  ];

  const south = [
    [0, -2],
    [1, -1],
    [0, -1],
    [-1, -1],
    [2, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [0, 2],
    [1, 0],
  ];

  const north = [
    [0, -2],
    [-1, -1],
    [0, -1],
    [1, -1],
    [-2, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [0, 2],
    [-1, 0],
  ];

  const ratio = [0.02, 0.1, 0.07, 0.01, 0.05, 0.1, 0.07, 0.01, 0.02, 0.55];

  let current = [Math.floor(n / 2), Math.floor(n / 2)];
  let directionCnt = 1;
  let isDone = false;
  while (!isDone) {
    if (directionCnt % 2 === 1) {
      isDone = moveTornado('w', directionCnt);
      isDone = moveTornado('s', directionCnt);
    } else if (directionCnt % 2 === 0) {
      isDone = moveTornado('e', directionCnt);
      isDone = moveTornado('n', directionCnt);
    }

    directionCnt++;
  }

  function moveTornado(direction, cnt) {
    let [currentR, currentC] = current;

    for (let i = 0; i < cnt; i++) {
      if (isDone) return isDone;

      switch (direction) {
        case 'e':
          currentC += 1;
          break;
        case 'w':
          currentC -= 1;
          break;
        case 's':
          currentR += 1;
          break;
        case 'n':
          currentR -= 1;
          break;
      }

      if (currentR === 0 && currentC === 0) {
        isDone = true;
      }

      let currentSend = desert[currentR][currentC];
      for (let j = 0; j < ratio.length; j++) {
        let nextR = currentR;
        let nextC = currentC;

        switch (direction) {
          case 'e':
            nextR += east[j][0];
            nextC += east[j][1];
            break;
          case 'w':
            nextR += west[j][0];
            nextC += west[j][1];
            break;
          case 's':
            nextR += south[j][0];
            nextC += south[j][1];
            break;
          case 'n':
            nextR += north[j][0];
            nextC += north[j][1];
            break;
        }

        const sendAmountMoved = Math.floor(
          desert[currentR][currentC] * ratio[j],
        );

        if (nextR >= 0 && nextR < n && nextC >= 0 && nextC < n) {
          if (j === ratio.length - 1) {
            desert[nextR][nextC] += currentSend;
            continue;
          }

          desert[nextR][nextC] += sendAmountMoved;
        }
        currentSend -= sendAmountMoved;
      }

      desert[currentR][currentC] = 0;
      current = [currentR, currentC];
    }
  }

  let remainSand = desert
    .map((r) => r.reduce((prev, cur) => (prev += cur), 0))
    .reduce((prev, cur) => (prev += cur), 0);

  return initialSand - remainSand;
}

const answer = solution(
  Number(n),
  arr.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
