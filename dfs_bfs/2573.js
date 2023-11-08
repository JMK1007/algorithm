class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }

  enqueue(val) {
    const node = new Node(val);
    if (!this.front) {
      this.front = node;
      this.rear = node;
    } else {
      this.rear.next = node;
      this.rear = node;
    }

    return ++this.size;
  }

  dequeue() {
    if (!this.front) return null;

    const tmp = this.front;
    if (this.front === this.rear) {
      this.rear = null;
    }

    this.front = this.front.next;
    this.size--;
    return tmp.val;
  }
}

module.exports = Queue;

const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';

// 입력값이 첫 번째 줄에는 입력 값의 길이(n), n개의 줄에 걸쳐서 한 줄에 하나의 입력값이 주어질 때
const [n, ...input] = require('fs')
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n');

/**
 * 접근법
 * 1. 햇수를 계산한다
 *  1-1. 매년 빙산의 개수를 저장한다 iceCnt
 *  1-2. 빙산의 높이를 바꿔줄 때마다 빙산의 개수 -1 해주고(iceCnt--)
 *  1-3. 바꿔야 할 빙산이 남지 않았을 때, 새로운 해가 시작되는 것으로 간주한다(year++)
 *
 * 2. 모든 빙산이 녹을 때까지 빙산의 높이를 조절한다.(bfs사용)
 *  2-1. 빙산의 높이를 가지고 있는 배열은 2개를 사용한다
 *    *  배열을 1개만 사용하여 업데이트 해줄 경우, 같은 해에 녹아서 0이 된 빙산이 인접 빙산의 높이를 조절할 때 바다로 카운트 되기 때문에
 *  2-2. 오리지널 배열(=새해가 시작되고 아직 빙산이 녹지 않은 배열)기준으로 인접 바다를 탐색하면서 임시 배열에 변한 빙산의 높이를 업데이트 해준다(bfs사용)
 *  2-3. 높이가 0보다 크면 다시 큐에 넣어준다
 *  2-4. 바꿔야 할 빙산이 남지 않았을 때, 오리지널 배열에 임시 배열의 값은 복사해준다
 *
 * 3. 빙산이 2개로 나뉘었는지 확인한다.
 *  3-1. 빙산의 높이를 모두 바꾸고 시간(년)을 +1 해주기 전에 빙산이 2 덩어리로 나뉘었는지 확인한다.
 *  3-2. check함수의 인자로는 큐에 들어가있는 첫 번째 빙산의 [row index,column index]와 남아있는 빙산(큐에 들어가 있는 빙산)의 개수를 전달한다.
 *  3-3. dfs를 사용해서 해당 원소에서부터 한 덩어리를 이루는 원소들의 개수(cnt)를 구한다
 *  3-4. 큐에 들어있는 값과 cnt의 값이 같지 않으면 2덩어리로 분리된 것임으로 year를 리턴해준다
 */

function solution(N, M, Map) {
  const ice = new Queue();

  //빙산의 개수
  let iceCnt;

  //시간
  let year = 1;

  const dr = [1, -1, 0, 0];
  const dc = [0, 0, 1, -1];

  //임시 배열
  const tmpMap = [...Map.map((r) => [...r])];

  //지도를 돌면서 빙산이 있는 부분의 인덱스를 큐에 넣어준다
  Map.forEach((r, rIdx) => {
    r.forEach((c, cIdx) => {
      if (c !== 0) {
        ice.enqueue([rIdx, cIdx]);
      }
    });
  });

  //빙하의 개수를 업데이트 해준다
  iceCnt = ice.size;

  //빙하가 다 녹을 때까지 반복한다
  while (ice.size) {
    //모든 빙하의 높이를 조절했을 때
    if (iceCnt === 0) {
      //오리지널 배열에 임시배열의 값을 복사해준다
      Map = [...tmpMap.map((r) => [...r])];

      //2덩어리로 나뉘었는지 확인한다
      const [r, c] = ice.front.val;
      if (check(r, c, ice.size)) return year;

      year++;
      iceCnt = ice.size;
    }

    const [r, c] = ice.dequeue();

    //인접 바다 개수
    let sea = 0;

    for (let i = 0; i < 4; i++) {
      const nextR = r + dr[i];
      const nextC = c + dc[i];
      if (
        nextR >= 0 &&
        nextR < N &&
        nextC >= 0 &&
        nextC < M &&
        !Map[nextR][nextC]
      ) {
        sea++;
      }
    }

    //조절한 빙산의 높이가 0보다 크면 큐에 다시 넣어준다
    if (Map[r][c] - sea > 0) {
      ice.enqueue([r, c]);
      tmpMap[r][c] -= sea;
    } else {
      tmpMap[r][c] = 0;
    }

    //높이 조절해야 하는 빙산의 개수 -1
    iceCnt--;
  }

  function check(r, c, size) {
    const visited = Array.from(new Array(N), () => new Array(M).fill(false));
    let cnt = 0;
    cnt++;
    visited[r][c] = true;
    dfs(r, c);

    function dfs(r, c) {
      for (let i = 0; i < 4; i++) {
        const nextR = r + dr[i];
        const nextC = c + dc[i];
        if (
          nextR >= 0 &&
          nextR < N &&
          nextC >= 0 &&
          nextC < M &&
          Map[nextR][nextC] &&
          !visited[nextR][nextC]
        ) {
          cnt++;
          visited[nextR][nextC] = true;
          dfs(nextR, nextC);
        }
      }
    }

    return cnt !== size;
  }

  return 0;
}

const arr = n.split(' ').map(Number);

const answer = solution(
  arr[0],
  arr[1],
  input.map((r) => r.split(' ').map(Number)),
);

console.log(answer);
