## 리스트 순회

### 기존과 달라진 ES6에서의 리스트 순회

- for i++
- for of

- ```javascript
    const list = [1,2,3];
    for (var i = 0; i < list.length; i++) {
        log(list[i]);
    }
    const str = 'abc;
    for (var i = 0; i < str.length; i++) {
        log(str[i]);
    }

    for (const a of list) {
        log(a);
    }
    for (const a of str) {
        log(a);
    }


  ```

### Array를 통해 알아보기

- ```javascript
  const arr = [1, 2, 3];
  let iter1 = arr[Symbol.iterator]();
  for (const a of iter1) log(a);
  ```

### Set을 통해 알아보기

- ```javascript
  const set = new Set([1, 2, 3]);
  for (const a of set) log(a);
  ```

### Map을 통해 알아보기

- ```javascript
  const map = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3],
  ]);
  for (const a of map.keys()) log(a);
  for (const a of map.values()) log(a);
  for (const a of map.entries()) log(a);
  ```

### 이터러블/이터레이터 프로토콜

- 이터러블(iterable)
  - 이터레이터(iterator)를 리턴하는 `[Symbol.iterator]()` 를 가진 값
- 이터레이터(iterator)
  - `{value, done}` 객체를 리턴하는 next() 를 가진 값
- 이터러블/이터레이터 프로토콜
  - 이터러블(iterable)을 for ...of, 전개 연산자 등과 함께 동작하도록 규약

### 사용자 정의 이터러블을 통해 알아보기

- ```javascript
  const iterable = {
    [Symbol.iterator]() {
      let i = 3;
      return {
        next() {
          return i == 0 ? { done: true } : { value: i--, done: false };
        },
        [Symbol.iterator]() {
          return this;
        },
      };
    },
  };

  let iterator = iterable[Symbol.iterator]();
  iterator.next();
  iterator.next();

  for (const a of iteraotr) log(a);
  /*
    const arr2 = [1,2,3];
    let iter2 = arr2[Symbol.iterator]();
    iter2.next();
    log(iter2[Symbol.iterator]() == iter2); // true
     for (const a of iter2) log(a);
    */

  for (const a of document.querySelectorAll("*")) log(a);
  const all = document.querySelctor("*");
  let iter3 = all[Symbol.iterator]();
  log(iter3.next());
  log(iter3.next());
  ```

### 전개 연산자

> 함수를 호출하는 인자로 배열을 사용하고 싶을 때나 배열을 정의하는 리터럴 내에서 사용할 수 있다.

- ```javascript
  //ES6 이전
  function add(a, b, c) {
    return a + b + c;
  }
  var arr = [2, 4, 5];
  add.apply(null, arr); //11
  //add함수를 호출 할 때 인자값으로 arr배열의 원소를 사용하려면 함수의 기본 메서드인 apply를 사용해야만 했다.

  //ES6 이후
  const add = (a, b, c) => {
    return a + b + c;
  };
  const arr = [2, 4, 5];
  add(...arr);
  // 전개 연산자를 통해 함수의 인자값으로 배열의 원소를 사용!
  ```

- ```javascript
  const a = [1, 2];
  // a[Symbol.iterator] = null;
  log([...a, ...arr, ...set, ...map.keys()]);
  ```
