/*Pipe: Go 함수와 다르게 함수를 리턴하는 함수
함수들이 나열되어있는 합성된 함수를 만드는 함수
내부에서 Go를 사용하는 함수로 볼수 있다.*/
const log = console.log;

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};

const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const add = (a, b) => a + b;

go(
  add(0, 1),
  (a) => a + 10,
  (a) => a + 100,
  log
);

const f = pipe(
  (a, b) => a + b,
  (a) => a + 10,
  (a) => a + 100
);

log(f(0, 1));
