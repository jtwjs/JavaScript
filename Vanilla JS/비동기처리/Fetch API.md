## Fetch API

> ES6의 비동기 통신방법으로 자체로 Promise 객체를 반환하기에 함께 사용하기도 편리함

#### 장점

1. 사용이 쉽고 간단함
2. Promise 객체로 값을 return 받음
3. Response 타입별로 쉽게 적용 가능(JSON 등)

### Fetch API 사용법

- ```javascript
  fetch(url, {
    method: "Get",
    head: {
      "Content-Type": "application/json",
    },
  }) //then을 이용한 콜백함수 실행
    .then(function (response) {
      //Code..
    })
    .catch(function (error) {
      //Error
      console.log(error);
    });
  ```

#### 서버에 Request 값을 설정하는 방법

- **mehotd**
  - 사용할 메소드를 선택 (GET,POST,PUT,DELETE 등)
- **headers**
  - 헤더에 전달할 값
- **body**
  - 바디에 전달할 값
- **mode**
  - cors 등의 값을 설정 (cors,no-cors,same-origin)
- **cache**
  - 캐쉬 사용 여부 (no-catch,reload,force-cache,only-if-cached)
- **credentials**
  - 자격 증명을 위한 옵션 설정 (include, same-origin, omit)
  - default (same-origin)
- ```javascript
  fetch(url, {
    method: "POST",
    body: JSON.stringify({ key: "value" }),
  }).then(function (response) {
    // ...
  });
  ```
  - Fetch API에서는 직접 JSON.stringify()를 사용하여 JSON 타입의 문자열로 변환해야함

### Requset, Response, Headers 인터페이스 지원

> 이를 사용하면 HTTP 요청시 더 쉽고 간단하게 값을 설정하고 전달할수 있다.

- **Headers()**
  - 헤더 정보에 포함되는 값들을 설정
  - append()나 set()을 사용하여 값을 설정할 수 있고 get()으로 값을 가져오거나 delete()로 삭제하는 방법이 매우 간단하다
- ```javascript
  const _header = new Headers();
  _header.append("Content-Type", "application/json");

  _header.delete("Content-Type");
  _header.get("Content-Type");
  ```

- **Request()**
  - 서버에 요청할 때의 값으로 URL, Body 값등을 설정하여 전달 할수 있다.

#### 브라우저 호환성

> fetch API는 대부분의 최신 브라우저에서 정상 동작함<br>ES6을 완벽히 지원하지 않는 IE등에서는 동작하지 않을수 있다.

- IE를 지원하기 위해서 사용가능하도록 Fetch API를 지원 가능하도록 변화하는 npm 등의 패키지를 설치 할거나 axios 등의 라이브러리를 사용하는 것이 가장 간단하고 빠른 해결책
