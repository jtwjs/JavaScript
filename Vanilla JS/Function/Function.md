## Function (함수)

> 함수는 하나의 단위로 실행되는 문의 집합이다.<br>모든 함수에는 바디가 있다. 함수 바디는 함수를 구성하는 문의 모음이다.

- ```js
  function sayHello() {
    //함수 바디는 여는 중괄호로 시작하고
    /*...*/
    //닫는 중괄호로 끝난다.
  }
  //함수를 선언하기만 해서는 바디가 실행되지 않는다.

  sayHello(); // 함수를 호출 할 때는 함수이름 다음에 괄호를 쓴다.
  ```

### 반환값

> 함수 바디 안에 return 키워드를 사용하면 함수를 즉시 종료하고 값을 반환한다.(함수 호출의 값)

- return을 명시적으로 호출하지 않으면 반환 값은 undefined가 된다.
- 함수는 어떤 타입의 값이라도 반환할 수 있다.

### 호출과 참조

> 자바스크립트에서는 함수는 1급객체. 따라서 다른 객체와 마찬가지로 넘기거나 할당할 수 있다.

- 함수 식별자 뒤에 괄호를 쓰면 자바스크립트는 함수를 호출하려 한다고 이해하고, 함수 바디를 실행한다
  - 그리고 함수를 호출한 표현식은 반환 값이 된다.
- 괄호를 쓰지 않으면 다른 값과 마찬가지로 함수를 참조하는 것이며, 그 함수는 실행되지 않는다.
  - 함수를 호출하지 않고 다른 값과 마찬가지로 참조하기만 할 수 있다는 특징은 자바스크립트를 매우 유연한 언어로 만듦
- ```js
  function getGreeting() {
    return "Hello World!";
  }

  const f = getGreeting;
  f(); //"Hello World!"

  //함수를 객체 프로퍼티에 할당할 수도 있다.
  const o = {};
  o.f = getGreeting;
  o.f(); //"Hello World!"

  const arr = [1, 2, 3];
  arr[1] = getGreeting; //arr은 이제 [1, function getGreeting(), 2] 이다.
  arr1[1](); // "Hello World!"
  ```

- 자바스크립트에서는 값 뒤에 괄호를 붙이면 그 값을 함수로 간주하고 호출한다.
  - 함수가 아닌 값 뒤에 괄호를 붙이면 에러가 일어남 (TypeError: xxx is not a function)

### 함수와 매개변수

> 함수를 호출하면서 정보를 전달할 때는 함수 매개변수를 이용한다.
> <br>매개변수는 함수가 호출되기 전에는 존재하지 않는다는 점을 제외하면 일반적인 변수나 마찬가지

- ```js
  function avg(a, b) {
    //a와 b를 정해진 매개변수, 함수가 호출되면 정해진 매개변수는 값을 받아 실제 매개변수가 됨
    return (a + b) / 2;
  }

  avg(5, 10); //실제 매개변수는 변수와 매우 비슷하지만, 함수 바디 안에서만 존재
  ```

- ```js
  const a = 5,
    b = 10;
  avg(a, b);

  //첫 행의 변수 a, b는 avg의 매개변수인 a, b와 같은 이름이지만, 엄연히 다른 변수이다.
  //함수를 호출하면 함수 매개변수는 변수 자체가 아니라 그 값을 전달 받는다.
  ```

- ```js
  function f(o) {
    // 함수 내부의 매개변수는 함수 바깥의 변수와 다르다
    o.message = "f에서 수정함";
    o = {
      message: "새로운 객체!",
    };
    console.log(`f 내부: o.message = ${o.message}" (할당 후 )`); //f 내부: o.meesage = "새로운 객체!" (할당 후)
  }

  let o = {
    message: "초기값",
  };

  console.log(`f를 호출하기 전: o.message = "${o.message}"`); //f를 호출하기 전: o.message="초기값"
  f(o); //f를 호출하면 둘은 같은 객체를 가리키지만, f 내부에서 o에 할당한 객체는 새로운, 전혀 다른 객체이다.
  console.log(`f를 호출한 다음: o.message = "${o.message}"`); //f를 호출한 다음: o.message="f에서 수정함"
  ```

#### 매개변수가 함수를 결정하는가?

> 자바스크립트에는 함수 호출할 때 매개변수를 한개 전달하든 열 개 전달하든 같은 함수를 호출하는 것
> <br>어떤 함수를 호출하든 그 함수에서 정해진 매개변수 숫자와 관계없이 몇 개의 매개변수를 전달해도 된다.

- ```js
  function f(x) {
    return `in f: x=${x}`;
  }
  //정해진 매개변수에 값을 제공하지 않으면 암시적으로 undefiend가 할당됨
  f(); // "in f: x=undefined"
  ```

#### 매개변수 해체

- ```js
  // 매개변수 해체(객체)
  function getSentence({ subject, verb, object }) {
    return `${subject} ${verb} ${object}`;
  }

  const o = {
    subject: "I",
    verb: "love",
    object: "JS",
  };

  getSentence(o); //"I love JS"

  // 매개변수 해체(배열)
  function getSentence([subject, verb, object]) {
    return `${subject} ${verb} ${object}`;
  }

  const arr = ["I", "love", "JS"];
  getSentence(arr); // "I love JS"

  // ...확산 연산자 활용
  function addPrefix(prefix, ...words) {
    //함수를 선언할 때 확산 연산자는 반드시 마지막 매개변수여야 한다.
    //ES5에서는 arguments를 사용해서 확산과 비슷한일을 할 수 있었다.
    const prefixedWords = [];
    for (let i = 0; i < words.length; i++) {
      prefixedWords[i] = prefix + words[i];
    }
    return prefixedWords;
  }

  addPrefix("con", "verse", "vex"); // ["converse", "convex"]
  ```

#### 매개변수 기본값

> ES6에서는 매개변수에 기본값을 지정하는 기능도 추가되었다.
> <br>일반적으로 매개변수에 값을 제공하지 않으면 undefined가 값으로 할당된다.

- ```js
  function f(a, b = "default", c = 3) {
    return `${a} - ${b} - ${c}`;
  }

  f(5, 6, 7); // "5 - 6 - 7"
  f(5, 6); // "5 - 6 - 3"}
  f(5); // "5 - default - 3"
  f(); //undefined - default - 3"
  ```

### 객체의 프로퍼티인 함수

> 객체의 프로퍼티인 함수를 메서드라 불러서 일반적인 함수와 구별한다.

- ```js
  const o = {
    name: "Wallace", //원시 값 프로퍼티
    bark: function () {
      // 함수 프로퍼티(메서드)
      return "Woof!";
    },
  };

  //ES6에서 간편하게 메서드를 추가할수 있는 문법 생김
  const o = {
    name: "Wallace",
    bark() {
      return "Woof!";
    },
  };
  ```

### this 키워드

> 함수 바디 안에는 특별한 읽기 전용 값인 this가 있다.
> <br>this는 함수를 어떻게 선언했느냐가 아닌 어떻게 호출했냐에 따라 달라진다

- ```js
  //일반적으로 this는 객체의 프로퍼티인 함수에서 의미가 있다.
  //메서드를 호출하면 this는 호출한 메서드를 소유하는 객체가 된다.
  const o = {
    name: "Wallace",
    speak() {
      return `My name is ${this.name}!`;
    },
  };
  //o.speak()를 호출하면 this는 o에 묶임
  o.speak(); //"My name is Wallace!"
  ```

### 함수 표현식과 익명 함수

> 익명 함수에서는 함수에 식별자가 주어지지 않는다.

- 함수 표현식
  - 함수 표현식은 함수를 선언하는 한가지 방법일 뿐이며, 그 함수가 익명이 될수도 있을 뿐
  - 함수 표현식은 식별자에 할당할 수도 있고 즉시 호출 할수도 있다.
  - 함수 이름을 생략할 수 있다는 점을 제외하면 함수 선언과 문법적으로 완전히 같다.
- ```js
  const f = function () {
    //...
  };
  ```
- ```js
  const g = function f(stop) {
    if (stop) console.log("f stopped");
    //함수 안에서 자신을 호출할 때(재귀) 이런 방식이 필요할 수 있다.
    f(true);
  };
  g(false);
  //함수 안에서 f를 써서 자기 자신을 참조하고
  //함수 바깥에서는 g를 써서 함수를 호출한다.
  ```
- **함수 선언과 함수 표현식의 구분법**
  - 함수 표현식
    - 함수 선언이 표현식으로 사용됐다면 그건 함수 표현식이다.
    - 다른 곳에 할당하거나 다른 함수에 넘길 목적으로 함수를 만든다면 함수 표현식을 사용
  - 함수 선언
    - 표현식으로 사용되지 않았다면 함수 선언이다.
    - 호출할 생각으로 함수를 만든다면 함수 선언을 사용

### 화살표 표기법

> function이라는 단어와 중괄호 숫자를 줄이려고 고안된 ES6 단축 문법

- 화살표 함수에 세가지 단축 문법
  - function을 생략해도 된다.
  - 함수에 매개변수가 단 하나뿐이라면 괄호(())도 생략 가능
  - 함수 바디가 표현식 하나라면 중괄호와 return 문도 생략 가능
- 화살표 함수는 항상 익명
- this가 다른 변수와 마찬가지로 정적으로 묶임
- 객체 생성자로 사용할 수 없다.
- arguments 변수도 사용할 수 없다.(ES6에서 확산 연산자로 대체)

### call과 apply, bind

> 자바스크립트에서는 일반적인 방법 외에도, 함수를 어디서, 어떻게 호출했느냐에 관계없이 this가 무엇인지 지정 가능

#### call

> 모든 함수에서 사용할수 있으며, this를 특정 값으로 지정 가능

- ```js
  const bruce = { name: "Bruce" };
  const madeline = { name: "Madeline" };

  //이 함수는 어떤 객체도 연결되지 않았지만 this를 사용
  function greet() {
    return `Hello, I'm ${this.name}!`;
  }

  greet(); //"Hello I'm undefined!" - this는 어디에도 묶이지 않았다.
  greet.call(bruce); //"Hello I'm bruce!" - this는 bruce
  greet.call(madeline); //"Hello I'm madeline!" - this는 madeline
  //함수를 호출하면서 call을 사용하고 this로 사용할 객체를 넘기면 해당 함수가 주어진 객체의 메서드인것처럼 사용 가능
  //call의 첫번째 매개변수는 this로 사용할 값이고, 매개변수가 더 있으면 그 매개변수는 호출하는 함수로 전달됨

  function update(birthYear, occupation) {
    this.birthYear = birthYear;
    this.occupation = occupation;
  }

  update.call(bruce, 1949, "singer");
  //bruce = {name: "Bruce", birthYear: 1949, occupation: "singer"}
  update.call(madeline, 1942, "actress");
  ```

#### apply

> 함수 매개변수를 처리하는 방법을 제외하면 call과 완전히 같음
> <br>call은 일반적인 함수와 마찬가지로 매개변수를 직접 받지만, apply는 매개변수를 배열로 받는다.

- ```js
  update.apply(bruce, [1955, "actor"]);
  update.apply(madeline, [1942, "writer"]);
  //apply는 배열 요소를 함수 매개변수로 사용해야 할 때 유용하다.

  const arr = [2, 3, -5, 15, 7];
  Math.min.apply(null, arr); // -5
  Math.max.apply(null, arr); // 15

  //확산 연산자도 사용가능
  const newBruce = [1940, "martial artist"];
  update.call(bruce, ...newBruce); // apply(bruce, newBurce)와 같다.
  Math.min(...arr); // -5
  Math.max(...arr); // -15
  ```

#### bind

> bind를 사용하면 함수의 this 값을 영구히 바꿀 수 있다. <br>this값 고정할 때, call이나 apply, 다른 bind와 함께 호출하더라도 this 값이 고정되도록 하려면 bind 사용

- ```js
  const updateBruce = update.bind(bruce);

  updateBruce(1904, "actor");
  // bruce는 이제 { name: "bruce", birthYear: 1904, occupation: "actor"}
  updateBruce.call(madeline, 1274, "king");
  // bruce는 이제 { name: "bruce", birthYear: 1274, occupation: "king"}
  //madeline은 변하지 않음}
  ```

- bind에 매개변수를 넘기면 항상 그 매개변수를 받으면서 호출되는 새 함수를 만드는 효과가 있다.
- ```js
  const updateBruce1949 = update.bind(bruce, 1949);
  updateBruce1949("singer, songwriter");
  //bruce는 이제 {name: "Bruce", birthYear: 1949, occupation: "singer, songwriter"}
  ```

### (First-class citizen) 1급 객체

#### 1. 변수에 대입이 가능하다

- 함수도 객체이기 때문에 변수안에 담아둘수있고 변수에 담아둘때는 함수이름을 생략가능
- ```js
  const add = function (num1, num2) {
    return num1 + num2;
  };

  console.log(typeof add); //function
  console, log(add(1, 2)); //3
  ```

#### 2. 다른 함수의 인자나 리턴값으로 활용이 가능하다

- ```javascript
  const add = function (num1, num2) {
    return num1 + num2;
  };

  console.log("두수의 합계는", add(1, 2), " 입니다.");
  ```

#### 3. 배열, 객체 등의 자료구조에 대입이 가능하다

- ```javascript
  const add = function (num1, num2) {
    return num1 + num2;
  };

  const sub = function (num1, num2) {
    return num1 - num2;
  };

  // 1.배열에 함수 대입
  const calculator = [add, sub];

  calculator[0](2, 3); //5
  caclulator[1](2, 3); //-1

  // 2.객체에 함수 대입
  const calObj = { add, sub }; //{add: f, sub: f}
  calObj.add(2, 6); //8
  calObj.sub(2, 6); //-4
  ```
