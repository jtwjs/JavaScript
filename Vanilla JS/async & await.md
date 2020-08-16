## async & await

> async와 await은 자바스크립트의 비동기 처리 패턴 중 가자 최근에 나온 문법 <br> 기존의 비동기 처리 방식인 콜백 함수와 프로미스의 단점을 보완

- ```javascript
  /*읽기 좋은 코드 
    위에서부터 아래로 한줄한줄 차례로 읽히는 코드
    */
  const user = {
    id: 1,
    name: "woong",
  };
  if (user.id === 1) {
    console.log(user.name); //woong
  }
  ```
- 위 방식대로 코드를 구성하는 것이 async, await 문법의 목적이다.

### async & await 기본 문법

- ```javascript
  // 함수 앞에 async라는 예약어를 붙임
  async function 함수명() {
    //함수의 내부 로직중 HTTP통신을 하는 비동기처리 코드 앞에 await을 붙임
    //#주의할점: 비동기 처리 메서드가 꼭 프로미스 객체를 반환해야 await가 의도한 대로 동작함
    await 비동기_처리_메서드_명();
    //일반적으로 awiat의 대상이 되는 비동기 처리 코드는 Axios 등 프로미스를 반환하는 API 호출 함수이다.
  }
  ```

### async & await 간단 예제

- ```javascript
  function fetchItems() {
    return new Promise(function (resolve, reject) {
      const items = [1, 2, 3];
      resolve(items);
    });
  }

  async function logItems() {
    const resultItems = await fetchItems();
    console.log(resultItems); // [1,2,3]
  }
  ```

### async & await 실용 예제

> async & awat 문법이 가장 빛을 발하는 순간은 여러 개의 비동기 처리 코드를 다룰 때다

- ```javascript
  function fetchUser() {
    const url = "https://jsonplaceholder.typicode.com/users/1";
    return fetch(url).then(function (response) {
      return response.json();
    });
  }

  function fetchTodo() {
    const url = "https://jsonplaceholder.typicode.com/users/1";
    return fetch(url).then(function (response) {
      return response.json();
    });
  }

  async function logTodoTitle() {
    const user = await fetchUser();
    if (user.id === 1) {
      const todo = await fetchTodo();
      console.log(todo.title);
    }
  }
  ```

#### async & await 예외 처리

> async & await에서 예외를 처리하는 방법은 try catch이다.

- ```javascript
  async function logTodoTitle() {
    try {
      const user = await fetchUser();
      if (user.id === 1) {
        const todo = await fetchTodo();
        console.log(todo.title);
      }
    } catch (error) {
      console.log(error);
    }
  }
  ```
