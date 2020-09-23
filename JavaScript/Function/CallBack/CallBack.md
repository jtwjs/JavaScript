## callback 함수

> Web 상에서의 동기처리는 비효율적..<br>그러므로 Web 기반인 자바스크립트는 기본적으로 비동기식으로 코드가 실행됨

- 그럼에도 불구하고 실행순서가 보장되어야 하는 경우는 있다.
  - ex:) 결제처리 함수가 완료되면 -> B함수 실행<br>오래 걸리는 C 함수의 리턴 값으로 -> D함수가 처리됨
  - 이럴 경우에 사용가능한 함수가 **callback함수**
  - 좀 이따 부르면 그 때 오는 함수<br> 부르면 타이밍 맞춰 오는 함수

### callback함수의 실행 원리

> 나중에 부를 함수를 인자로 받아와서 함수 안에서 호출함으로써 실행 순서를 보장

1. 먼저 실행될 함수한테 다음에 실행될 함수를 인자로서 일단 전달
2. 먼저 실행될 함수 안에서 다음에 실행될 함수를 실행

### callback 지옥

> 순차적으로 진행되어야하는 함수를 모조리 다 callback 함수로서 작성함으로써 가독성이 떨어지는 끔찍한 함수

- ```javascript
  function a() {
    setTimeout(function b() {
      console.log("5초 걸리는 a");
      setTimeout(function c() {
        console.log("4초 걸리는 b");
        setTimeout(function d() {
          console.log("3초 걸리는 c");
          setTimeout(function e() {
            console.log("2초 걸리는 d");
          }, 2000);
        }, 3000);
      }, 4000);
    }, 5000);
  }

  a();
  ```

- 이 callback 지옥을 해결해줄수 있는 방법이 ES6에서 도입된 **Promise~async**
