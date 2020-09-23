//## 지연 평가 + Promise = L.map, map, take
const log = console.log;
const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);
const curry = (f) => (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));
const go1 = (a, f) => (a instanceof promise ? a.then(f) : f(a));
const L = {};

L.map = curry(function* (f, iter) {
  for (const a of iter) {
    yield go1(a, f);
  }
});

const take = curry((l, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  return (function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      if (a instanceof promise) return a.then((a) => ((res.push(a), res).length == l ? res : recur()));
      res.push(a);
      if (res.length == l) return res;
    }
    return res;
  })();
});
const takeAll = take(Infinity);

go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  L.map((a) => Promise.resolve(a + 10)),
  take(2),
  log
);

//## Kleisli Composition - L.filter, filter, nop, take

const nop = Symbol("nop");

L.filter = curry(function* (a, iter) {
  for (const a of iter) {
    const b = go1(a, f);
    if (b instanceof Promise) yield b.then((b) => (b ? a : Promise.reject(nop)));
    else if (b) yield a;
  }
});

const take = curry((l, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  return (function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      if (a instanceof Promise) {
        return a.then((a) => ((res.push(a), res).length == l ? res : recur())).catch((e) => (e == nop ? recur() : Promise.reject(e)));
      }
      res.push(a);
      if (res.length == l) return res;
    }
    return res;
  })();
});

go(
  [1, 2, 3, 4, 5, 6],
  L.map((a) => Promise.resolve(a * a)),
  L.filter((a) => {
    log(a);
    return a % 2;
  }),
  take(2),
  log
);

//## reduce에서 nop 지원

const reduceF = (acc, a, f) =>
  a instanceof Promise
    ? a.then(
        (a) => f(acc, a),
        (e) => (e == nop ? acc : Promise.reject(e))
      ) //then의 두번째 인자로 reject를 전달 가능
    : f(acc, a);

const head = (iter) => go1(take(1, iter), ([h]) => h);

const reduce = curry((f, acc, iter) => {
  if (!iter) return reduce(f, head((iter = acc[Symbol.iterator]())), iter);

  iter = iter[Symbol.iterator]();
  return go1(acc, function recur(acc) {
    let cur;
    while (!(cur = iter.next()).done) {
      acc = reduceF(acc, cur.value, f);
      if (acc instanceof Promise) return acc.then(recur);
    }
    return acc;
  });
});
