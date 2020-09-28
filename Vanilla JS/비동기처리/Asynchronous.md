## Asynchronous(비동기)

> 자바스크립트의 비동기 처리란 특정코드의 연산이 끝날때까지 코드의 시행을 멈추지 않고 다음 코드를 먼저 실행하는 자바스크립트의 특성을 의미

### Ajax 비동기 처리

> 비동기 처리의 가장 흔한 사례는 제이쿼리의 ajax이다.

- ```javascript
  function getData() {
    let tableData;
    //$.get()이 ajax 통신을 하는 부분
    $.get("https://domain.com/products/1", function (response) {
      //서버에서 받아온 데이터는 response 인자에 담김
      tableData = response;
    });
    return tableData;
  }
  console.log(getData()); // undefined
  ```
  - undefined가 뜬 이유
    - `$.get()`로 데이터를 요청하고 받아올 때까지 기다려주지 않고 다음 코드인 return tableData를 실행했기 때문
- **특정 로직이 실행이 끝날 떄까지 기다려주지 않고 나머지 코드를 먼저 실행하는 것이 비동기처리**

### setTimeout() 비동기 처리

> setTimeout()은 Web API의 한 종류<br> 코드를 바로 실행하지 않고 지정한 시간만큼 기다린 후에 로직 실행

- ```javascript
  //#1
  console.log("Hello");
  //#2 (가장 마지막에 실행됨)
  setTimeout(function () {
    console.log("bye");
  }, 3000);
  //#3
  console.log("Hello Again");
  ```
- setTimeout()역시 비동기 방식으로 실행되기 때문에 3초를 기다렸다가 다음 코드를 수행하는 것이 아닌 <br>setTimeout()을 실행하고 나서 바로 다음 코드로 넘어감

### 콜백 함수로 비동기 처리 방식의 문제점 해결

- ```javascript
  function getData(callbackFunc) {
    $.get("https://domain.com/products/1", function (response) {
      callbackFunc(response);
      //서버에서 받은 데이터 response를 callbackFunc()함수에 넘겨줌
    });
  }

  getData(function (tableData) {
    console.log(tableData); //$.get()의 response값이 talbeData에 전달됨
  });
  ```

  - 콜백 함수를 사용하면 특정 로직이 끝났을 때 원하는 동작을 실행시킬수 있음

#### 비유로 이해하는 콜백 함수 동작 방식

> 콜백 함수의 동작 방식은 일종의 식당 자리 예약과 같다.

- 데이터가 준비된 시점에서만 원하는 동작을 수행할 수 있다.

#### 콜백 지옥 (Callback hell)

> 콜백 지옥은 비동기 처리 로직을 위해 콜백 함수를 연속해서 사용할때 발생되는 문제

- ```javascript
  $.get("url", function (response) {
    parseValue(response, function (id) {
      auth(id, function (result) {
        display(result, function (text) {
          console.log(text);
        });
      });
    });
  });
  ```
- 서버에서 데이터를 받아와 화면에 표시하기까지 인코딩, 사용자 인증 등을 처리해야 하는 경우에 <br> 이 모든 과정을 비동기로 처리해야 한다면 콜백을 계속 무는 형식으로 코딩을 하게됨
  - 이러한 코드 구조는 가독성도 떨구고 로직을 변경하기도 어렵다

#### 콜백 지옥을 해결하는 방법

> Promise나 Async를 사용하는 방법이 있다.

- 코딩 패턴으로만 콜백지옥 해결하는 방법
- ```javascript
  function parseValueDone(id) {
    auth(id, authDone);
  }
  function authDone(result) {
    display(result, displayDone);
  }
  function displayDone(text) {
    console.log(text);
  }
  $.get("url", function (response) {
    parseValue(response, parseValueDone);
  });
  ```
  - Promise나 Async를 이용하여 더 편리하게 비동기 처리를 구현하자

```

```
