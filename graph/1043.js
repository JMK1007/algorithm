const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, know, ...input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(N, M, know, parties) {
  const knowSet = new Set();
  const doTheyKnow = new Array(M).fill(false);
  for (let i = 1; i < know.length; i++) {
    knowSet.add(know[i]);
  }

  if (knowSet.size === 0) return M;

  //사실을 알고있는 사람들의 수만큼 반복, 반복문이 진행되면서 수가 점점 커짐
  for (let i = 0; i < knowSet.size; i++) {
    //파티의 수만큼 반복
    for (let j = 0; j < M; j++) {
      //사실을 알고있는 사람들의 참여여부가 불확실한 파티만 재확인
      if (!doTheyKnow[j]) {
        //파티 참여자 중에 사실을 알고있는 사람이 있으면 그 파티의 모든 이들을 set에 추가
        if (parties[j].slice(1).some((item) => knowSet.has(item))) {
          for (k = 1; k < parties[j].length; k++) {
            knowSet.add(parties[j][k]);
          }
          //해당 파티의 사실 여부를 true로 변경
          doTheyKnow[j] = true;
        }
      }
    }
  }

  const filter = doTheyKnow.filter((item) => item === false);
  return filter.length;
}

const [N, M] = n.split(' ').map(Number);
const answer = solution(
  N,
  M,
  know.split(' ').map(Number),
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
