## 이터레이터

> 이터레이터는 '지금 어디 있는지' 파악할 수 있도록 돕는다는 면에서 일종의 책갈피와 비슷한 개념이다.
> <BR>이터레이터는 배열이나 객체처럼 여러 가지 값을 제공할 수 있는 컬렉션의 동작 방식을 표준화함

- 배열은 이터러블(iterable) 객체의 좋은 예이다.
  - 책에 여러 페이지가 있는 것처럼 배열에는 여러 요소가 들어 있으므로<br> 책에 책갈피를 끼울 수 있듯 배열에는 이터레이터를 사용할 수 있다.
- ```js
  /*ex:)
    book이란 배열이 있고 이 배열의 각 요소는 책의 한페이지를 나타내는 문자열
    */
  const book = [
    "Twinkle, twinkle, little bat!",
    "How I wonder what you're at!",
    "Up above the world ou fly,",
    "Like a tea try in the sky.",
    "Twinkle, twinkle, little bat!",
    "How I wonder what you're at!",
  ];

  //book 배열에 values 메서드를 써서 이터레이터를 만들 수 있다.
  const it = book.values(); //이터레이터는 보통 it이라고 줄여 씀

  it.next(); // {value: "Twinkle, twinkle, little bat!, done: false }
  it.next(); // {value: "How I wonder what you're at!, done: false }
  it.next(); // {value: "Up above the world ou fly", done: false }
  it.next(); // {value: "Like a tea try in the sky., done: false }
  it.next(); // {value: "Twinkle, twinkle, little bat!", done: false }
  it.next(); // {value: "How I wonder what you're at!", done: false }
  it.next(); // {value: undefined, done: true} [next에서 책의 마지막 페이지를 반환했다해서 끝이아님]
  it.next(); // {value: undefined, done: true  [value는 undefined가 되지만 next는 계속 호출가능]
  it.next(); // {value: undefined, done: true }
  ```

- 이터레이터만 제공할 수 있다면 무엇이든 for...of 루프와 함꼐 쓸 수 있다.
- ```js
  //while문을 이용해서 for...of루프 흉내내기
  const it = book.values();
  let current = it.next();
  while (!current.done) {
    console.log(current.value);
    current = it.next();
  }
  ```
- 이터레이터는 모두 독립적이다.
  - 즉, 새 이터레이터를 만들 때마다 처음에서 시작한다.
  - 각각 다른 요소를 가리키는 이터레이터 여러개를 동시에 사용할 수도 있다.

### 이터레이션 프로토콜

> 이터레이터는 그 자체로 크게 쓸모가 있다기보다는, 더 쓸모있는 동작이 가능해지도록 한다는데 의미가 있다.
> <br> 이터레이터 프로토콜은 모든 객체를 이터러블 객체로 바꿀 수 있다.

- ```js
  class Log {
    constructor() {
      this.messages = [];
    }
    add(message) {
      this.messages.push({ message, timestamp: Date.now() });
    }

    //Symbol.iterator 메서드 추가
    /*이터레이션 프로토콜은 클래스에 심볼 메서드 Symbol.iterator가 있고 이 메서드가 이터레이터처럼 동작하는 객체,
     즉 value와 done 프로퍼티가 있는 객체를 반환하는 next 메서드를 가진 객체를 반환한다면
     그 클래스의 인스턴스는 이터러블 객체라는 뜻이다.*/
    [Symbol.iterator]() {
      return this.messages.values();
    }
  }

  //이제 Log 인스턴스를 배열처럼 순회할 수 있다.
  const log = new Log();
  log.add("first day at sea");
  log.add("spotted whale");
  log.add("spotted another vessel");
  //..

  //로그를 배열처럼 순회
  for (let entry of log) {
    console.log(`${entry.message} @ ${entry.timestamp}`);
  }
  ```

#### messages 배열에서 이터레이터를 가져와 이터레이터 프로토콜 구현하는방법이 아닌 직접 이터레이터를 만들기

- ```js
  class Log {
    //...

    [Symbol.iterator]() {
      let i = 0;
      const messages = this.messages;
      return {
        next() {
          if (i >= messages.length) return { value: undefined, done: true };
          return { value: messages[i++], done: false };
        },
      };
    }
  }
  ```

#### 무한한 데이터(피보나치 수열)에 이터레이터 적용

- ```js
  class FibonacciSequence {
    [Symbol.iterator]() {
      let a = 0,
        b = 1;
      return {
        next() {
          let rval = { value: b, done: false };
          b += a;
          a = rval.value;
          return rval;
        },
      };
    }
  }

  //for...of루프로 FibonacciSequence 인스턴스를 계산하면 무한 루프에 빠짐
  const fib = new FibonacciSequence();
  let i = 0;
  for (let n of fib) {
    console.log(n);
    if (++i > 9) break;
  }
  ```
