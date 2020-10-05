## 객체와 객체지향 프로그래밍

### 프로퍼티 나열

> 프로퍼티 나열에서 기억해야 할 것은 순서가 보장되지 않는다.

#### for...in

> for...in을 배열에 사용할 수도 있겠지만, 그리 좋은 생각은 아니다<br> 배열에는 일반적인 for 루프나 forEach를 사용하는것이 좋다.

- ```js
  const SYM = Symbol();

  const o = { a: 1, b: 2, c: 3, [SYM]: 4 };

  for (let prop in o) {
    if (!o.hasOwnProperty(prop)) continue;
    console.log(`${prop}: ${o[prop]}`);
  }
  //for...in 루프에는 키가 심볼인 프로퍼티는 포함되지 않는다.
  ```

#### Object.keys

> Object.keys는 객체에서 나열 가능한 문자열 프로퍼티를 배열로 반환함<br>(객체의 프로퍼티 키를 배열로 가져옴)

- ```js
  const SYM = symbol();

  const o = { a: 1, b: 2, c: 3, [SYM]: 4 };

  Object.keys(o).forEach((prop) => console.log(`${prop}: ${o[prop]}`));
  //for..in 루프를 썻을 때와 같은 결과
  //hasOwnProperty를 체크할 필요는 없다.
  ```
