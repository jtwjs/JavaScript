## Arrow Function (화살표 함수의 선언)

> 화살표 함수(Arrow function)는 function 키워드 대신 화살표(=>)를 사용하여 보다 간략한 방법으로 함수를 선언할 수 있다.

#### 화살표 함수의 기본 문법

- ```javascript
  // 매개변수 지정 방법
    () => { ... } //매개변수가 없을 경우
    x => {...} // 매개변수가 한 개 인 경우, 소괄호 생략 가능
    a, b => {...} //매개변수가 여러 개인 경우, 소괄호 생략 불가

    // 함수 몸체 지정 방법
    x => { return x * x} //single line block
    x => x * x  //함수 몸체가 한줄의 구문이라면 중괄호 생략가능 암묵적으로 return

    () => {return { a: 1}; }
    () => ({ a:1 })//위 표현과 동일 객체 반환시 소괄호 사용

    () => {
        const x = 10;
        return x * x;
    };
  ```

#### 화살표 함수의 호출

> 화살표 함수는 익명 함수로만 사용가능, 따라서 화살표 함수를 호출하기 위해서는 함수 표현식을 사용함

- ```javascript
  // ESS
  var pow = function (x) {
    return x * x;
  };
  console.log(pow(10)); // 100

  //콜백함수
  var arr = [1, 2, 3];
  var pow = arr.map(function (x) {
      return x * x;
  });

  console.log(pow; // [1, 4, 9]
  ```

- ```javascript
  // ES6
  const pow = (x) => x * x;
  console.log(pow(10)); // 100

  //콜백
  const arr = [1, 2, 3];
  const pow = arr.map((x) => x * x);

  console.log(pow);
  ```

### this

> function 키워드로 생성한 일반 함수와 화살표 함수의 가장 큰차이점은 this

#### 일반 함수의 this

> 자바스크립트의 경우 함수 호출 방식에 의해 `this`에 바인딩할 어떤 객체가 동적으로 결정된다.<br>함수를 선언할때 this에 바인딩할 객체가 정적으로 결정되는 것이 아니고, **함수를 호출할 때 어떻게 호출되었는지에 따라**<br> this에 바인딩할 객체가 동적으로 결정된다.

- 콜백 함수 내부의 this는 전역 객체 window를 가리킨다.
  - 생성자 함수와 객체의 메소드를 제외한 모든 함수(내부함수,콜백함수 포함)내부의 this는 전역 객체를 가리킴
- 콜백 함수 내부의 this가 메소드를 호출한 객체(생성자 함수의 인스턴스)를 가리키는 방법
  - ES5에 추가된 `Function,prototype.bind()`로 this를 바인딩

#### 화살표 함수의 this

> 화살표 함수는 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정된다.

- 화살표 함수의 this **언제나 상위 스코프의 this**를 가리킴
  - 이를 **Lexical this**라 한다.
- 화살표 함수의 this 바인딩 객체 결정 방식은 상위 스코프를 결정하는 방식인 렉시컬 스코프와 유사하다
- 화살표 함수는 call, apply, bind 메소드를 사용하여 this를 변경할 수 없다.

### 화살표 함수를 사용해서는 안되는 경우

> 화살표 함수는 Lexical this를 지원하므로 콜백함수로 사용하기 편리하다. <br>하지만 화살표 함수를 사용하는 것이 오히려 혼란을 불러오는 경우도 있으므로 주의바람

#### 1. 메소드

> 화살표 함수로 메소드를 정의하는것은 피해야 한다.

- ```javascript
  //Bad
  const person = {
    name: "Lee",
    sayHi: () => console.log(`hi ${this.name}`),
  };

  person.sayHi(); // Hi undefined
  ```

  - 위 예제의 경우, 메소드로 정의한 화살표 함수 내부의 this는 메소드를 소유한 객체, 즉 메소드를 호출한 객체를 가리키지 않고 사우이 컨텍스트인 전역 객체 window를 가리킴

- ```javascript
  //ES6의 축약 메소드 표현

  const person = {
    name: "Lee",
    sayHi() {
      // sayHi: function () {}
      console.log(`Hi ${this.name}`);
    },
  };

  person.sayHi(); // Hi Lee
  ```

### prototype

> 화살표 함수로 정의된 메소드를 prototype에 할당하는 경우도 동일한 문제가 발생함

- ```javascript
  // Bad
  const person = {
    name: "Lee",
  };

  Object.prototype.sayHi = () => console.log(`Hi ${this.name}`);

  person.sayHi(); // Hi undefined
  ```

  - 화살표 함수로 객체의 메소드를 정의하였을 때와 같은 문제가 발생함<br> 따라서 prototype에 메소드를 할당하는 경우, 일반함수를 할당함

- ```javascript
  // Good
  const person = {
    name: "Lee",
  };

  Object.prototype.sayHi = function () {
    console.log(`Hi ${this.name}`);
  };

  person.sayHi(); // Hi Lee
  ```

#### 생성자 함수

> 화살표 함수는 생성자 함수로 사용할 수 없다.<br> 생성자 함수는 prototype 프로퍼티를 가지며 prototpye 프로퍼티가 가리키는 프로토타입 객체의 constructor를 사용한다.<br>하지만 화살표 함수는 protottype 프로퍼티를 가지고 있지 않다.

- ```javascript
  const Foo = () => {};

  //화살표 함수는 prototype 프로퍼티가 없다.
  console.log(Foo.hasOwnProperty("prototype")); //false

  const foo = new Foo(); //TypeError: Foo is not a constructor
  ```

#### addEventListener 함수의 콜백 함수

> addEventListener 함수의 콜백함수를 화살표 함수로 정의하면 this가 상위 컨텍스트인 전역객체 window를 가리킴

- ```javascript
  //Bad
  const button = document.querySelector("#myButton");

  button.addEventListener("click", () => {
    console.log(this === window); // true
    this.innerHTML = "Clicked button";
  });
  ```

  - addEventListener함수의 콜백함수 내에서 this를 사용하는 경우,<br>function 키워드로 정의한 일반 함수를 사용하여야 함
  - 일반함수로 정의된 addEventListener 함수의 콜백 함수 내부의 `this`는 이벤트 리스너에 바인딩된 요소(currentTarget)을 가리킴

- ```javascript
  //Good
  const button = document.querySelector("#myButton");

  button.addEventListener("click", function () {
    cosnole.log(this === button); // true
    this.innerHTML = "Clicked button";
  });
  ```
