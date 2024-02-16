const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, ...input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(N, univ_arr) {
  let result = 0;
  const map = new Map();
  const usable_arr = [];

  if (N === 0) return result;

  //map에 날짜별로 강연료를 추가함
  univ_arr.forEach(([p, d]) => {
    const p_arr = map.get(d) || [];
    p_arr.push(p);
    map.set(d, p_arr);
  });

  //가장 큰 날짜부터 0까지 순회
  for (let i = Math.max(...map.keys()); i > 0; i--) {
    //map에 현재 날짜가 존재하면 usable_arr에 넣고 오름차순 정렬
    if (map.has(i)) {
      usable_arr.push(...map.get(i));
      usable_arr.sort((prev, cur) => {
        return prev - cur;
      });
      map.delete(i);
    }
    //usable_arr의 가장 마지막 원소를 result에 추가
    result += usable_arr.pop() || 0;
  }

  return result;
}

const answer = solution(
  Number(n),
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
