/*## take: 인자를 두개(limit, iterable) 받고 limit까지 짜름*/
const log = console.log;
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

const add = (a, b) => a + b;

const range = (l) => {
  let i = -1;
  let res = [];

  while (++i < l) {
    res.push(i);
  }
  return res;
};

const L = {};
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

log(take(5, range(10000)));
log(take(5, L.range(10000))); //L.range는 실제로 100000만큼의 값을만들지않고 5개만만듦
//무한수열(Infinity)를 써도 똑같음

console.time("");
go(range(10000), take(5), log);
console.timeEnd("");

console.time("");
go(L.range(Infinity), take(5), reduce(add), log);
console.timeEnd("");
