## async ~ await

> ES7에서 새로나온 문법<br>기존의 비동기 처리 방식인 콜백함수와 프로미스의 단점을 보완하고 개발자가 읽기 좋은(동기함수처럼 읽고쓰기) 코드를 작성하게 도와줌

- 동기함수처럼 아래로 차례대로 읽히는 방식의 코드를 구성하는 것이 async, await 문법의 목적이다.

### async & awiat 기본 문법

- ```js
  async function 함수명() {
    await 비동기_처리_메서드_명();
  }
  ```

1. 함수의 앞에 `async`라는 예약어가 붙는다.
2. 함수의 내부 로직 중 HTTP 통신을 하는 비동기 처리 코드 앞에 `await`을 붙인다.
   - 주의할 점: 비동기 처리 메서드가 꼭 프로미스 객체를 반환해야 `await`가 의도한대로 동작됨
   - 일반적으로 `await`의 대상이 되는 비동기 처리 코드는 Axios 등 프로미스를 반환하는 API 호출 한다.

#### async & await 실용예제

> async & await 문법이 가장 빛을 발하는 순간은 여러 개의 비동기 처리코드를 다룰 때 이다.

- ```js
  function fetchUser() {
    const url = "https://jsonplaceholder.typeicode.com/users/1";
    return fetch(url).then(function (response) {
      return response.json();
    });
  }

  function fetchTodo() {
    const url = "https://jsonplaceholder.typeicode.com/todos/1";
    return fetch(url).then(function (response) {
      return response.json();
    });
  }

  /*
  1. fetchUser()를 이용하여 사용자 정보 호출
  2. 받아온 사용자 아이디가 1이면 할일 정보 호출
  3. 받아온 할 일 정보의 제목을 콘솔에 출력
  */

  async function logTodoTitle() {
    const user = await fetchUser();
    if (user.id === 1) {
      const todo = await fetchTodo();
      console.log(todo.title);
    }
  }
  ```

### async & await 예외 처리

> async & await에서 예외를 처리하는 방법은 try catch이다.
> <br>프로미스에서 에러처리를 위해 `.catch()`를 사용했던 것처럼 async에서는 `catch{}`를 사용하면 된다.

- ```js
  async function logoTodoTitle() {
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
