/*## range: 숫자 하나를 받고 그 크기만한 배열을 리턴받는 함수 */
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

const add = (a, b) => a + b;

const range = (l) => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

let list = range(4);
log(list);
log(reduce(add, list));

//### 느긋한 L.range
const L = {};
L.range = function* (l) {
  let i = -1;

  while (++i < l) {
    yield i;
  }
};

let list2 = L.range(4);
log(list);
log(reduce(add, list2));

//## range아 느슨한 L.range의 차이점
/*1. 그냥 range는 range를 실행했을때 이미 모든 코드 부분이 평가되어 값이 만들어짐
L.range는 실제로 값이 필요해서 써먹을때까지 기다렷다가 평가가 이루어짐

2. 그냥 range는 array를 만들어서 배열로 전달되서 동작됨
L.range는 array를 만들지않고 하나씩 값을 꺼내기만함*/

/*#### 그냥 arange
1. array만듦
2. array를 iterator로 만듦
3. 그다음 next()하면서 순회함

*/

/*#### L.range
1. 실행됬을 때 iterator 만듦
2. 그 iterator은 자기 자신을 리턴하는 iterable임
3. 해당하는 함수를 실행하면 이미 만들어진 iterator을 리턴만하고 순회함
4. 조금더 효율적임
*/

//## TEST
function test(name, time, f) {
  console.time(name);
  while (time--) f();
  console.timeEnd(name);
}

test("range", 10, () => reduce(add, range(100000)));
test("L.range", 10, () => reduce(add, L.range(100000)));
