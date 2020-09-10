const log = console.log;
const L = {};

//## flatten: 동적으로 array들을 한번에 펼쳐서 한 depts를 가진 1차원 배열로 변형한 iterator을 리턴하는 하뭇

const isIterable = (a) => a && a[Symbol.iterator];

L.flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) for (const b of a) yield b;
    else yield a;
  }
};
/*yield *
yield *iterable 은 for (const val of iterable) yield val; 와 같다. 

L.flatten = function* (iter) {
    for (const a of iter) {
        if(isIterable(a)) yield *a;
        else yield a;
    }
};
*/

/*L.deepFlat
만일 깊은 iterator을 모두 펼치고 싶다면 아래와 같이 L.deepFlat을 구현할수 있다.
L.deepFlat은 깊은 iterable을 펼쳐준다. 

L.deepFlat = function *f(iter) {
    for (const a of iter) {
        if (isIterable(a)) yield *f(a);
        else yield a;
    }
};
*/

var it = L.flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]]);
var it2 = [[1, 2], 3, 4, [5, 6], [7, 8, 9]];
log([...it]);
log([...it2]);

//## L.flatten + take로 flatten 만들기
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

const take = curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length == l) return res;
  }
  return res;
});

const takeAll = take(Infinity);

const flatten = pipe(L.flatten, takeAll);
log(flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]]));
