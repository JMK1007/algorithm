const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, ...input] = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function solution(alphabetArr) {
  const pointMap = new Map();
  const numberMap = new Map();
  let result = 0;

  for (const row of alphabetArr) {
    for (let i = 0; i < row.length; i++) {
      let num = pointMap.get(row[i]) || 0;
      num += Math.pow(10, row.length - 1 - i);
      pointMap.set(row[i], num);
    }
  }

  Array.from(pointMap.entries())
    .sort((a, b) => {
      return b[1] - a[1];
    })
    .forEach(([key], idx) => {
      numberMap.set(key, 9 - idx);
    });

  for (const row of alphabetArr) {
    let str = [];
    for (let i = 0; i < row.length; i++) {
      str.push(numberMap.get(row[i]));
    }
    result += Number(str.join(""));
  }

  return result;
}

const answer = solution(input.map((r) => r.split("")));

console.log(answer);
