const log = console.log;

const L = {};

const curry = (f) => (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));

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

const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const range = (l) => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

const take = curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length == l) return res;
  }
  return res;
});

// ## L.map + tae로 map 만들기
const takeAll = take(Infinity);

L.map = curry(function* (f, iter) {
  for (const a of iter) {
    yield f(a);
  }
});

const map = curry(pipe(L.map, takeAll));

log(map((a) => a + 10, L.range(4)));

// ## L.filter + take로 filter 만들기

L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
});

const filter = curry(pipe(L.filter, takeAll));

log(filter((a) => a % 2, range(4)));
