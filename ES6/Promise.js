const log = console.log;
/*# 비동기 처리란?
자바스크립트의 비동기 처리란 특정 코드의 연산이 끝날 떄까지 
코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 
자바스크립트의 특성을 의미
*/

//## 일급

/*### 콜백함수란?
함수 안에서 어떤 특정한 시점에 호출되는 함수를 말함
보통 콜백 함수는 함수의 매개변수로 전달하여 특정 시점에서 콜백함수를 호출함
*/
function add10(a, callback) {
  setTimeout(() => callback(a + 10), 100);
}

add10(5, (res) => {
  add10(res, (res) => {
    add10(res, (res) => {});
  });
});

/*### 프로미스란?
비동기 작업이 맞이할 미래의 완료 또는 실패와 그 결과 값을 나타낸다.
프로미스가 콜백과 다른 차이를 가지는점은 비동기상황을 일급 값으로 다룬다는점에서 가장중요한 차이를 가짐
대기와 성공과 실패를 다루는 일급 값으로 이루어짐 (콜백과 가장 다른 가장 중요한점)
비동기로 일어난 상황에 대해서 (값으로 다룰 수 있다. => 일급이란 얘기)
*/

function add20(a) {
  return new Promise((resolve) => setTimeout(() => resolve(a + 20), 100));
}

add20(5).then(add20).then(add20).then();

/*## 일급 활용 
어떤 일을 한 결과의 상황을 일급 값으로 만들어서 지속적으로 어떤 일들을 
연결해 나갈수있는 것들이 프로미스의 가장 중요한 특징 중 하나
*/
const delay100 = (a) => new Promise((resolve) => setTimeout(() => resolve(a), 100));

const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));
const add5 = (a) => a + 5;

const n1 = 10;
//go1(go1(n1, add5), log);

const n2 = delay100(10);
//go1(go1(n2, add5), log);

/*Composition
프로미스는 비동기상황에서 합성함수을 안전하게 하기 위한 도구
어떠한 값들이 들어올지 모르는 상황에서 안전하게 합성하도록 하는 도구가 모나드*/

// f . g
// f(g(x))

const g = (a) => a + 1;
const f = (a) => a * a;

log(f(g(1)));
log(f(g()));

/*어떤 박스 안의 효과가 있는지 없는지에 따라서 함수합성을 안전하게 하고있다는 얘기
 어떤특정상황들은 안전하게 함수합성을 하기위한 도구이고 그런것들을 모나드라고 부름
 */
[1]
  .map(g)
  .map(f)
  .forEach((r) => log(r));
[]
  .map(g)
  .map(f)
  .forEach((r) => log(r));

Array.of(1)
  .map(g)
  .map(f)
  .forEach((r) => log(r));

/*프로미스는 합성관점에서 봣을때 첫번째로 비동기상황(얼마만큼의 딜레이가 필요한 상황)에서도 
 함수를 적절한 시점에 평가해서 합성시키기 위한 도구로서 프로미스를 바라볼수 있다.
 프로미스는 빈값이 들어갔을 때를 위한 안전한 합성을 하는것이 아닌 대기상황에 대해 안전하게 합성을 하기위한 도구   */
Promise.resolve(1)
  .then(g)
  .then(f)
  .then((r) => log(r));

new Promise((resolve) => setTimeout(() => resolve(2), 1000))
  .then(g)
  .then(f)
  .then((r) => log(r));

/*## Kleisli Composition 관점에서의 Promise
오류가 있는 상황에서의 함수 합성을 할 수 있는 하나의 규칙
들어오는 인자가 잘못된 인자여서 함수에서 오류가 나거나
정확한 인자가 들어왔더라도 의존하고 있는 외부상황에 따라 
오류가 날수있는 상황에서 함수를 합성할 수 있다.
/@수학적인 함수합성
 f . g
 f(g(x)) = f(g(x))
/@ 실무에서의 함수 합성
외부요인 혹은 인자에 따라 g에 값이 변화가 가능할수 있기 때문에
f(g(x)) = f(g(x))가 성립하지 않을 수 있다.
g에서 에러가 날 경우 혹은 f가 제데로 동작하지 않을 경우 아래의 식이 성립할수있다.
f(g(x)) = g(x)
*/
const users = [
  { id: 1, name: "aa" },
  { id: 2, name: "bb" },
  { id: 3, name: "cc" },
];

/*const getUserById = (id) => find((u) => u.id == id, users);

const f = ({ name }) => name;
const g = getUserById;

const fg = (id) => f(g(id));
const c = fg(2);
log(c);
users.pop();
users.pop();

const c2 = fg(2);
log(c2); //에러남
*/

const getUserById = (id) => find((u) => u.id == id, users) || Promise.reject("없어요");

const f = ({ name }) => name;
// name이 들어간 객체를 받았을 경우에만 정상도작
const g = getUserById;
// users가 존재할 때만 정상동작

const fg = (id) =>
  Promise.resolve(id)
    .then(g)
    .then(f)
    .catch((a) => a);
//resolve가 reject면 그다음 수행되는 것들을 수행안함

fg(2).then(log); // bb

//실 프로그래밍에서는 users가 변할 수 있다.
users.pop();
users.pop();
g(2); //Promise {<reject>:"없어요!"}
fg(2).then(log); //없어요!

//## go, pipe, reduce에서 비동기 제어
const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

// reduce만 수정해주면 go, pipe, reduce에서 비동기 처리 가능
const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }

  return go1(acc, function recur(acc) {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      acc = f(acc, a);
      if (acc instanceof Promise) return acc.then(recur);
    }
    return acc;
  });
});

go(
  Promise.resolve(1),
  (a) => a + 10,
  (a) => Promise.reject("error!"),
  (a) => log("---"), //실행X
  (a) => a + 1000,
  (a) => a + 10000,
  log
).catch((a) => log(a)); //error!

/*## Promise.then의 중요한 규칙
Promise에서 then으로 꺼낸 것은 Promise가 아니다.
*/
Promise.resolve(Promise.resolve(Promise.resolve(1))).then(log);
// 1
// then으로 꺼낸 것은 Promise가 아니다.

new Promise((resolve) => resolve(new Promise((resolve) => resolve(1)))).then(log);
//언제든 Promise안에 있는 값을 then으로 한번에 꺼낼 수 있다.
