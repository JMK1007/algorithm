const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
//입력값 1개(1줄)
const input = require('fs').readFileSync(filePath).toString().trim();

function solution(input) {
  //모음 , L. L 제외한 자음
  //1. 현재 문자가 '_'일 때,
  //1. 이전에 연속된 모음이 2개이상이면 모음 안됨
  //2. 이전에 연속된 자음이 2개이상이면 자음 안됨 - 자음은 L을 포함하지 않는 경우
  const VOWEL_CNT = 5n;
  const CONSONANT_CNT = 20n;

  let result = 0n;

  function dfs(idx, vowelCnt, consonantCnt, isL, cnt) {
    if (idx === input.length) {
      if (isL) result += cnt;
      return;
    }

    const current = input[idx];
    if (current === '_') {
      if (vowelCnt < 2) dfs(idx + 1, vowelCnt + 1, 0, isL, cnt * VOWEL_CNT);
      if (consonantCnt < 2) {
        dfs(idx + 1, 0, consonantCnt + 1, true, cnt);
        dfs(idx + 1, 0, consonantCnt + 1, isL, cnt * CONSONANT_CNT);
      }
    } else if (['A', 'E', 'I', 'O', 'U'].includes(current)) {
      if (vowelCnt === 2) return;
      dfs(idx + 1, vowelCnt + 1, 0, isL, cnt);
    } else {
      if (consonantCnt === 2) return;
      if (current === 'L') dfs(idx + 1, 0, consonantCnt + 1, true, cnt);
      else dfs(idx + 1, 0, consonantCnt + 1, isL, cnt);
    }
  }

  dfs(0, 0, 0, false, 1n);

  return result.toString();
}

const answer = solution(input.split(''));

console.log(answer);
