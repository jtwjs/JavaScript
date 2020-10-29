## 자바스크립트의 현재와 미래

1. ES6는 없다(?)
   - ECMAScript 6th edition부터는 연도 표기
   - 2015년부터 해마다 새 명세가 갱신
   - 보통 "ES6"라고 하면 "ES6와 그 이후"를 의미
2. ESM으로 전환
   - CommonJS, AMD가 ESM으로 전환될 것
   - `<script>`태그도 ESM을 지원함
   - ![ESM](https://user-images.githubusercontent.com/60641307/97533063-e0dc8980-19fa-11eb-9339-cc7c9796ee40.png)
3. 자바스크립트 미래
   - JS 10년 주기설에 의하면 올해가 3번쨰 주기 시작
   - 브라우저, Node 발전에 따라 트랜스파일러의 필요성 하락
   - JS가 아닌 JS: TS, WebASM, Rust 등
   - 새로운 번들러 등장: Webpack의 독주는 언제까지?

### 어휘적 환경(Lexical Enviroment)

1. 정의
   - 변수나 함수 등의 식별자를 정의할때 사용되는 명세
   - 중첩된 어휘적 환경에 기반해 동작
   - Enviroment Record와 outer 속성을 포함
2. 관련 문법
   - 함수 선언
   - 블럭문
   - Try~Catch문의 Catch 절
3. 종류
   - 전역 환경
   - 모듈 환경
   - 함수 환경

#### 실행 컨텍스트(Execution Context)

1. 정의
   - 자바스크립트 코드가 실행되는 환경
   - 모든 JS코드는 실행 컨텍스트 내부에서 실행된다.
2. 종류
   - 전역 실행 컨텍스트
   - 함수 실행 컨텍스트

#### 어휘적 범위(Lexical Scope)

> 같은 범위 혹은 그 보다 안쪽의 코드에서 바깥 영역에는 접근할수 있지만 그 역은 성립하지 않는다.

- ```js
  function hello() {
    {
      const greeting = "안녕하세요";
    }
    console.log(greeting);
  }
  heelo();
  // 참조에러
  ```
- 범위의 구분: 함수 선언, 블록문(if,for,while), Try-Catch의 catch절

### 클로저(Closure)

> 처음 만들어 질 때의 어휘적 범위를 그대로 유지한 함수.
> <br>어휘적 범위 바깥에서 해당 범위에 접근할 수 있다.

- ```js
  function heelo() {
    const greeting = "안녕하세요";

    return function () {
      console.log(greeting);
    };
  }

  const say = hello();
  say();
  ```

### 엄격한 모드(Strict mode)

1. 진입 방법
   - 'use strict': 전역 영역, 함수 내에 표기
   - ES2015 모듈 사용(자동 적용)
2. 일반 모드와 차이
   - 조용한 에러 대신 명시적으로 에러 발생
   - JS 엔진 최적화를 어렵게 하는 실수 방지
   - 향후 ES2015에 포함도리 예약어/문법 대비
3. 엄격한 모드 외의 엄격함
   - JS의 이상한 동작은 독특한 형변환도 원인
   - 일치 연산자 === 사용 습관화
   - 명시적 형변환 활용

### 비동기 자바스크립트(Asynchronous JavaScript)

1. 비동기 처리는 필연

   - 기능 대부분을 외부 API에 의존하고 있기 때문
   - 외부 API를 호출하고 결과를 콜백으로 전달받음
     ![WebAPI](https://user-images.githubusercontent.com/60641307/97534762-e5567180-19fd-11eb-91d8-1bf58e03132f.png)

2. 자바스크립트의 동작원리
   - 자바스크립트는 싱글 스레드 언어
   - 이벤트 루프와 스택을 통해 스케줄링
   - UI 업데이트, 사용자 이벤트도 모두 같은 스레드에서 처리
3. 콜백 지옥은 해결된 문제
   - 더 우아한 비동기 처리 방법: Promise, async, await
   - 함수 분리 등의 코딩 패턴 적용

### 이벤트 루프(Event Loop)

> 자바스크립트의 동시성(concurrency) 처리 모델의 기본 원리

![eventLoop](https://user-images.githubusercontent.com/60641307/97535082-6ada2180-19fe-11eb-8bbe-15db41727ea5.png)

### Promise, async, await

1. Promise: 비동기 처리를 위한 객체
   - 세 가지 상태: 대기(pending), 이행(fullfilled), 거부(rejected)
   - 비동기 처리 후 뒤의 두가지 상태 반환
   - 성공시.then() / 실패시 .then()또는 .catch()
   - 한번 상태가 결정된 Promise의 상태는 변경불가
   - Promise.resolve, Promise.reject는 상태가 결정된 Promise 반환
   - Promise의 정적 메소드를 통해 다중 Promise 처리
2. async/await: 보다 편리한 비동기 처리
   - asnyc 함수는 항상 Promise를 반환함
   - async 함수에서 성공은 return, 실패는 에러를 throw한다.
   - await과 함꼐 비동기 함수를 실행하면 마치 동기식인듯 동작한다

- ```js
  async function getName() {
    return "정태웅";
  }
  // 아래와 같다.
  function getName() {
    return Promise.resolve("정태웅");
  }
  ```
