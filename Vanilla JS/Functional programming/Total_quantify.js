const log = console.log;

const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);
const curry = (f) => (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));

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

const products = [
  { name: "반팔티", price: 15000, quantify: 1 },
  { name: "긴팔티", price: 20000, quantify: 2 },
  { name: "핸드폰케이스", price: 15000, quantify: 3 },
  { name: "후드티", price: 30000, quantify: 4 },
  { name: "바지", price: 25000, quantify: 5 },
];

const add = (a, b) => a + b;

const sum = curry((f, iter) => go(iter, map(f), reduce(add)));

//총 가격

const total_price = sum((p) => p.quantify * p.price);
log(total_price(products));

log(sum((p) => p.quantify * p.price, products));

//총 수량
const total_quantify = sum((p) => p.quantify);

log(total_quantify(products));

log(sum((p) => p.quantify, products));
