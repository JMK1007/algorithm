const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [weightCnt, weights, beadCnt, beads] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(weightCnt, weights, beadCnt, beads) {
  const dp = Array.from(new Array(31), () => new Array(15001).fill(false));
  const result = [];

  findWeight(0, 0);

  for (const bead of beads) {
    if (bead > 15000) result.push('N');
    else if (dp[weightCnt][bead]) result.push('Y');
    else result.push('N');
  }

  //추를 순서대로 올리면서 구할 수 있는 구슬의 무게를 찾는다
  //1. 구슬과 반대 방향에 올릴지 : weightSum + weights[idx]
  //2. 구슬과 같이 올릴지 : Math.abs(weightSum - weights[idx])
  //3. 이번 추는 올리지 않고 넘어갈지 : weightSum
  //3가지를 고려하면서 값을 갱신해나간다.
  function findWeight(idx, weightSum) {
    if (idx > weightCnt || dp[idx][weightSum]) return;
    dp[idx][weightSum] = true;
    findWeight(idx + 1, weightSum + weights[idx]);
    findWeight(idx + 1, Math.abs(weightSum - weights[idx]));
    findWeight(idx + 1, weightSum);
  }

  return result.join(' ');
}

const answer = solution(
  Number(weightCnt),
  weights.split(' ').map(Number),
  Number(beadCnt),
  beads.split(' ').map(Number),
);

console.log(answer);
