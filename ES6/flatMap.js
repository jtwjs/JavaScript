const log = console.log;
const L = {};

/*## flatMap: 매핑함수를 사용해 각 엘리먼트에 대해 map 수행 후, 결과를 새로운 배열로 평탄화
flat과 map을 하나로 병합할 때 조금 더 효율적이여서 탄생
*/
log(
  [
    [1, 2],
    [3, 4],
    [5, 6, 7],
  ].flatMap((a) => a)
);

log(
  [
    [1, 2],
    [3, 4],
    [5, 6, 7],
  ].flatMap((a) => a.map((a) => a * a))
);

log(
  flatten(
    [
      [1, 2],
      [3, 4],
      [5, 6, 7],
    ].map((a) => a.map((a) => a * a))
  )
);

L.flatMap = curry(pipe(L.map, L.flatten));
const flatMap = pipe(L.flatMap, take(Infinity));
//const flatMap = curry(pipe(L.map, flatten));

var it = L.flatMap((a) => a * a, [[1, 2, 3, 4], 5, [6, 7]]);
log([...it]);
