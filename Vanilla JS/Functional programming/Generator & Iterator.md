## 제네레이터 & 이터레이터

### 제너레이터

- 이터레이터이자 이터러블을 생성하는 함수
- ```javascript
  function* gen() {
    // function *gen()
    //일반함수에서 앞에 *를 붙여 제너레이터 함수를 만듦
    yield 1;
    yield 2;
    yield 3;
    return 100; // done이 true가 되면서 return하면서 전달할 값
    //순회할때는 return 값 없이 순회함
  }
  let iter = gen();
  log(iter[Symbol.iterator]() == iter); //true
  log(iter.next());

  for (const a of gen()) log(a);
  ```

- 자바스크립트에서는 어떤 값이든 이터러블이면 순회할 수 있다.
- 제너레이트는 문장을 값으로 만들수 있고 문장을 통해서 순회할 수 있는 값을 만들수 있다.
  - 자바스크립트에서 제너레이트를 통해서 어떠한 상태나 어떠한 값이든 순회할수 있게 만들 수 있다.
  - 제너레이트를 통해서 다양한 값들을 순회할수 있는 이터러블을 쉽게 만들 수 있다

### odds

- ```javascript
  function* infinity(i = 0) {
    while (true) yield i++;
  }
  function* limit(y, iter) {
    for (const a of iter) {
      yield a;
      if (a == y) return;
    }
  }

  function* odds(y) {
    for (const a of limit(y, infinity(1))) {
      if (a % 2) yield a;
    }
  }
  let iter2 = odds(10);
  log(iter2.next());
  log(iter2.next());
  log(iter2.next());
  log(iter2.next());
  log(iter2.next());
  log(iter2.next());
  ```

### for of, 전개 연산자, 구조 분해, 나머지 연산자

- ```javascript
  log(...odds(10));
  log([...odds(10), ...odds(20)]);

  const [head, ...tail] = odds(5);
  log(head);
  log(tail);

  const [a, b, ...rest] = odds(10);
  log(a);
  log(b);
  log(rest);
  ```

#### 구조 분해

> **구조 분해 할당** 구문은 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 JavaScript 표현식

- ```javascript
  let a, b, rest;
  [a, b] = [10, 20];
  log(a); //10
  log(b); //20

  [a, b, ...rest] = [10, 20, 30, 40, 50];
  log(a); //10
  log(b); //20
  log(rest); //[30,40,50]

  ({ a, b } = { a: 10, b: 20 });
  log(a); // 10
  log(b); // 20

  // Stage 4(finished) proposal
  ({ a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 });
  log(a); // 10
  log(b); // 20
  log(rest); // {c: 30, d: 40}
  ```

- 객체 및 배열 리터럴 표현식을 사용하면 즉석에서 쉽게 데이터 뭉치를 만들 수 있다.
  - `const x = [1,2,3,4,5];`
- 구조 분해 할당의 구문은 위와 비슷하지만, 대신 할당문의 좌변에서 사용하여, 원래 변수에서 어떤 값을 분해해 할당할지 정의함
- ```javascript
  const x = [1, 2, 3, 4, 5];
  const [y, z] = x;
  log(y); //1
  log(z); //2
  ```

```

```
