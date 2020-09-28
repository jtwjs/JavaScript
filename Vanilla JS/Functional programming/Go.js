/*Go: 함수들과 인자를 전달해서 즉시 어떤 값을 평가하는 것에 사용*/

/*## 코드를 값으로 다루어 표현력 높이기*/
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

go(
  0,
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100,
  log
);
// 111

//### go를 사용하여 읽기 좋은 코드로 만들기
const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
};

const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

const add = (a, b) => a + b;

log(
  reduce(
    add,
    map(
      (a) => a.price,
      filter((a) => a.price > 20000, products)
    )
  )
);

log(
  reduce(
    add,
    filter(
      (n) => n > 20000,
      map((a) => a.price, products)
    )
  )
);

//#### go로 다듬기
go(
  products,
  (products) => filter((p) => p.price > 20000, products),
  (products) => map((p) => p.price, products),
  (price) => reduce(add, price),
  log
);
