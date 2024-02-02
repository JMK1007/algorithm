const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, ...input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

function solution(N, M, table) {
  /**
   * 예전에 못 풀었던 문제였습니다
   * 씨씨티비 탐색해야 하는 구간이 다른데
   * 그걸 어떻게 해야 할지 잘 모르겠더라구요
   * 결국 다른 분의 풀이를 참고했습니다
   * https://heytech.tistory.com/373
   * 혼자 힘으로 못 푸는 문제가 너무 많네요
   */
  const camera_list = [];
  let total = Infinity;

  const DIRECTION = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const CCTV = [
    [],
    [[0], [1], [2], [3]],
    [
      [0, 1],
      [2, 3],
    ],
    [
      [0, 2],
      [0, 3],
      [1, 2],
      [1, 3],
    ],
    [
      [0, 2, 3],
      [0, 1, 2],
      [0, 1, 3],
      [1, 2, 3],
    ],
    [[0, 1, 2, 3]],
  ];

  table.forEach((r, r_idx) => {
    r.forEach((type, c_idx) => {
      if (type !== 0 && type !== 6) {
        camera_list.push([r_idx, c_idx, type]);
      }
    });
  });

  //dfs 모든 경우의 수 탐색
  function dfs(camera_idx) {
    //탈출 조건 = 모든 카메라를 확인했을 때
    if (camera_idx === camera_list.length) {
      total = Math.min(total, check_bline_spot());
      return;
    }

    const [r, c, cctv_type] = camera_list[camera_idx];
    const prev_table = table.map((r) => [...r]);

    for (direction_type of CCTV[cctv_type]) {
      check(r, c, direction_type);
      dfs(camera_idx + 1);
      table = prev_table.map((r) => [...r]);
    }
  }

  function check(r, c, direction_type) {
    for (const d of direction_type) {
      let next_r = r + DIRECTION[d][0];
      let next_c = c + DIRECTION[d][1];

      while (next_r >= 0 && next_r < N && next_c >= 0 && next_c < M) {
        if (table[next_r][next_c] === 6) break;
        if (table[next_r][next_c] === 0) table[next_r][next_c] = '#';
        next_r += DIRECTION[d][0];
        next_c += DIRECTION[d][1];
      }
    }
  }

  function check_bline_spot() {
    let cnt = 0;
    table.forEach((r) => {
      r.forEach((c) => {
        if (c === 0) {
          cnt++;
        }
      });
    });

    return cnt;
  }

  dfs(0);

  return total;
}

const [N, M] = n.split(' ').map(Number);

const answer = solution(
  N,
  M,
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
