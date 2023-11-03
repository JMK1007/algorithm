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

function solution(N, M, R, Arr, CalcArr) {
  const functionArr = [
    null,
    (Arr) => [...Arr].reverse(),
    (Arr) => [...Arr].map((r) => r.reverse()),
    (Arr) => three(Arr),
    (Arr) => four(Arr),
    (Arr) => five(Arr),
    (Arr) => six(Arr),
  ];

  //오른쪽 90도
  function three(arr) {
    const R = arr.length;
    const C = arr[0].length;
    const tmpArr = Array.from(new Array(C), () => new Array(R).fill(0));

    for (let i = 0; i < R; i++) {
      for (let j = 0; j < C; j++) {
        const rIdx = j;
        const cIdx = R - 1 - i;
        tmpArr[rIdx][cIdx] = arr[i][j];
      }
    }

    return tmpArr;
  }

  //왼쪽 90도
  function four(arr) {
    return three(three(three(arr)));
  }

  //4등분 오른쪽으로
  function five(arr) {
    let tmpArr;
    const R = arr.length;
    const C = arr[0].length;

    const top = arr.slice(0, R / 2);
    const bottom = arr.slice(R / 2);

    const first = top.map((r) => r.slice(0, C / 2));
    const second = top.map((r) => r.slice(C / 2));
    const third = bottom.map((r) => r.slice(C / 2));
    const fourth = bottom.map((r) => r.slice(0, C / 2));

    tmpArr = [
      ...fourth.map((r, idx) => [...r, ...first[idx]]),
      ...third.map((r, idx) => [...r, ...second[idx]]),
    ];

    return tmpArr;
  }

  //4등분 왼쪽으로
  function six(arr) {
    return five(five(five(arr)));
  }

  CalcArr.forEach((item) => {
    Arr = functionArr[item](Arr);
  });

  return Arr.map((r) => r.join(' ')).join('\n');
}

const sizeArr = n.split(' ').map(Number);

const calcArr = input.splice(-1)[0].split(' ').map(Number);

const answer = solution(
  sizeArr[0],
  sizeArr[1],
  sizeArr[2],
  input.map((r) => r.split(' ').map(Number)),
  calcArr,
);

console.log(answer);
