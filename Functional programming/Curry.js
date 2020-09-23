/*curry:  함수를 값으로 다루면서 받아둔 함수를 원하는 시점에 평가 시키는 함수
(우선 함수를 받아서 함수를 리턴하고 인자를 받아서 인자가 원하는 갯수만큼의 인자가 들어왔을 때
받아두었던 함수를 나중에 평가시키는 함수)*/
const log = console.log;

const curry = (f) => (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));

const mult = curry((a, b) => a * b);

log(mult);
log(mult(1));
log(mult(1, 2));

// go + curry 를 사용하여 더 읽기 좋은 코드로 만들기

const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  let res = [];
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
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

const add = (a, b) => a + b;

const go = (...args) => reduce((a, f) => f(a), args);

//## 1. 기본 코드
console.log(
  reduce(
    add,
    map(
      (a) => a.price,
      filter((a) => a.price > 20000, products)
    )
  )
);

//## 2. go함수를 통해서 순서를 반대로 뒤집음
go(
  products,
  (products) => filter((p) => p.price > 20000, products),
  (products) => map((p) => p.price, products),
  (price) => reduce(add, price),
  log
);

/*## 3. curry를 통해서 보다 간결한 표현을 만듦 (함수를 부분적으로 실행) 
함수를 값으로 다루는 여러가지 함수들을 이용해서 더 표현력이 높고 깔끔한 코드를 얻을수 있다.*/
go(
  products,
  filter((p) => p.price > 20000),
  map((p) => p.price),
  reduce(add),
  log
);

/*💋 a => f(a) 라는 함수는 그냥 f와 하는일이 같다
    const add1 = a => a + 1;

    const f1 = a => add1(a);

    const f2 = add1;
    모두 같다.
*/

//## 함수 조합으로 함수 만들기
//파이프라인으로 만들어진 코드를 쉽게 조합하여 중복을 제거할수 있다.
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

const total_price = pipe(
  map((p) => p.price),
  reduce(add)
);

const base_total_price = (predi) => pipe(filter(predi), total_price);

go(
  products,
  base_total_price((p) => p.price < 20000),
  log
);

go(
  products,
  base_total_price((p) => p.price >= 20000),
  log
);
