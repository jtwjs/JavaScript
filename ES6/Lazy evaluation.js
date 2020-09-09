/*지연 평가란?
컴퓨터 프로그래밍에서 느긋한 계산법(Lazy evaluation)은 계산의 결과 값이 필요할 때까지 계산을 늦추는 기법이다.
*/

/*# 이터러블 중심 프로그래밍에서의 지연 평가 (Lazy Evaluation)
- 제때 계산법
- 느긋한 계산법
- 제너레이터/이터레이터 프로토콜을 기반으로 구현
*/

const log = console.log;
//## L.map
const L = {};
L.map = function* (f, iter) {
  for (const a of iter) yield f(a);
};
var it = L.map((a) => a + 10, [1, 2, 3]);
log(it.next());
log(it.next());
log(it.next());

//## L.filter
L.filter = function* (f, iter) {
  for (const a of iter) if (f(a)) yield a;
};
var it = L.filter((a) => a % 2, [1, 2, 3, 4]);
log(it.next());
log(it.next());
log(it);

//### range, map filter, take, reduce 중첩 사용
//# 함수모음
const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);
const curry = (f) => (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));

const range = (l) => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

const map = curry((f, iter) => {
  const res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  const res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});

const take = curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length == l) return res;
  }
  return res;
});

/* ##제때 평가 순서
1. 받아온 iterator를 iterable로 만듦
2. next() 수행 done이 될떄까지..
3. array 만들어서 값을 다음 함수에 보냄*/
go(
  range(10),
  map((a) => a + 10),
  filter((a) => a % 2),
  take(2),
  log
);

//### L.range, L.map, L.filter, take, reduce 중첩 사용

//# 함수 모음
L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

L.map = curry(function* (f, iter) {
  for (const a of iter) {
    yield f(a);
  }
});

L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
});

/* ##지연 평가 순서
1. Lazy evaluation들이 값을 평가하지않고 미루어 보냄
2. take에서 받은 iterator를 next()실행 
3. 그 iterator는 전 함수인 L.fitler에서 준 값이기에 L.filter 평가
4. L.filter에서도  next()할 때 받은 iterator은 전 함수인 L.map에서 준것이기에 L.map 평가
5. L.map에서도 next()할때 L.range에서 준것이기에 L.range로 올라가서 평가 (반복)*/

//원하는 결과값 까지만 실행되어 시간단축
go(
  L.range(10),
  L.map((n) => n + 10),
  L.filter((n) => n % 2),
  take(2),
  log
);

/*### map, filter 계열 함수들이 가지는 결합 법칙

- 사용하는 데이터가 무엇이든지
- 사용하는 보조 함수가 순수 함수라면 무엇이든지
- 아래와 같이 결합한다면 둘 다 결과가 같다.

 [[mapping, mapping], [filtering, filtering], [mapping, mapping]]
 =
 [[mapping, filtering, mapping], [mapping, filtering, mapping]*/
