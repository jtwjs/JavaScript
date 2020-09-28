## This

#### binding

> 호출한 대상에게 실제함수를 연결 짓는 것

- ```javascript
  const myObject = {
    name: "taewoong",
    sayName: function () {
      console.log(this.name);
    },
  };
  const otherObject = {
    name: "untack",
  };

  otherObject.sayName = myObject.sayName;

  myObject.sayName; //taewoong
  otherObject.sayName; // untack
  ```

- 올바른 객체에 올바른 메서드 묶어주기 (매칭시키기)

#### 전역객체

> 전역을 감싸는 객체 <br>코드 전체를 아우르는 객체

- 전역객체의 메서드
  - console.log(), clear() 등
- 전역변수
  - 전역 객체의 속성
- Js in browser
  - window 객체
- Js in server side(Node.js)
  - global 객체

### This의 Binding

#### 1. **일반 함수**를 호출했을 때 **this**은 어디로 바인딩 되느냐

> 함수는 사실 전역객체의 메서드<br>전역변수도 사실 전역객체의 속성

- ```javascript
    const name = 'taewoong';

    console.log("전역 변수 name : " + name;
    console.log("전역객체의 속성 name : ", window.name);
    //결과는 같다.
  ```

- ```javascript
  const name = "Jungtaewoong";
  console.log(window.name);

  const sayHello = function () {
    const name = "Honguntack";
    console.log(this.name); //전역객체의 name
    //Jungtaewoong
  };

  sayHello();
  ```

#### 2. **객체**를 호출했을 때 **this**은 어디로 바인딩 되느냐

> *객체의 메서드*에서 사용된 this는 그 메서드를 *호출한 객체*로 바인딩 된다.

- ```javascript
  const myObject = {
    name: "taewoong",
    sayName: function () {
      console.log(this.name);
    },
  };
  const otherObject = {
    name: "untack",
  };

  otherObject.sayName = myObject.sayName;

  //호출한 대상에 binding 됨
  myObject.sayName; //taewoong
  otherObject.sayName; // untack
  ```

#### 3. **생성자 함수**를 호출했을 때 **this**은 어디로 바인딩 되느냐

> **생성자 함수**에서의 this는 그 생성자 함수를 통해 **생성되어 반환되는 객체**에 바인딩

- ```javascript
  //Person 생성자 함수
  const Person = function (name) {
    this.name = name;
  };

  //boy 객체 생성
  const boy = new Person("태웅");
  console.log(boy.name); //태웅

  //girl 객체 생성
  const girl = new Person("영희");
  console.log(girl.name); //영희
  ```

#### 생성자 함수 this vs 일반 함수 this

- new로 새로운 객체를 만들면 생성자 함수
  - 생성자 함수는 첫글자를 대문자로!
- (new 없이) 그냥 호출되어 쓰이면 일반 함수

#### ＃＃주의: 내부함수의 this

> **내부함수에서의 this는 무조건 전역객체에 바인딩 된다.**

- 일반함수의 내부함수
  - 함수안의 함수를 뜻
- 객체에서의 내부함수
  - 객체의 메서드안에 또다른 함수
- 생성자함수의 내부함수

  - 생성자 함수 안의 함수를 뜻

- ```javascript
  function myFunction() {
    console.log("myFunction's this: ", this); //window에 바인딩
    function innerFunction() {
      console.log("innerFunction's this: " + this); //window에 바인딩
      innerFunction();
    }
    myFunction();
  }
  ```
  - 일반 함수의 내부함수 innerFunction의 this는 전역객체에 바인딩
