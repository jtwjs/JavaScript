## Promise

> 자바스크립트 비동기처리에 사용되는 객체
> <br>Promise 인스턴스 안에 비동기 처리될 대상 넣어주기

- ```js
    asncFunction = new Promise( (resolve, reject) => {...});
    /*resolve: 약속 지켰을 때 호출
      reject: 약속 못지켰을때 호출
    */

  const getData = (callback) => {
    return new Promise( (resolve, reject) => {
      $.get('url 주소/products/1', function(response) {
        //데이터를 받으면 resolve() 호출
        resolve(response);
      });
    });
  }

  //getData()의 실행이 끝나면 호출되는 then()
  getData().then( (tableData) => {
    //resolve()의 결과 값이 여기로 전달됨
    console.log(tableData);//$.get()의 response 값이 tableData에 전달됨
  });
  ```

### 프로미스의 3가지 상태(states)

> 프로미스를 사용할 때 알아야 하는 가장 기본적인 개념이 바로 프로미스의 상태(stats)이다.
> <br> 여기서 말하는 상태란 프로미스의 처리 과정을 의미
> <br> `new Promise()`로 프로미스를 생성하고 종료될 떄까지 3가지 상태를 갖는다.

- Pending(대기): 비동기 처리 로직이 아직 완료되지 않은 상태
- Fulfilled(이행): 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
- Rejected(실패): 비동기 처리가 실패하거나 오류가 발생한 상태

#### Pending(대기)

> `new Promise()` 메서드를 호출하면 대기(Pending) 상태가 된다.

- `new Promise()` 메서드를 호출할 때 콜백 함수를 선언할 수 있고, 콜백 함수의 인자는 `resolve, reject` 이다.

- ```js
  new Promise(function (resolve, reject) {
    /*...*/
  });
  ```

#### Fulfilled(이행)

> 콜백 함수의 인자 `resolve`를 실행하면 이행(Fulfilled)상태가 된다.

- 이행 상태가 되면 `then()`을 이용하여 처리 결과 값을 받을 수 있다.
- ```js
  function getData() {
    return new Promise(function (Resolve, reject) {
      const data = 100;
      resolve(data);
    });
  }

  //resolve()의 결과 값 data를 resolveData로 받음
  getData().then(function (resolveData) {
    console.log(resolveData); //100
  });
  ```

#### Rejected(실패)

> `reject`를 호출하면 실패(Rejected)상태가 된다.

- 실패 상태가 되면 실패한 이유(실패 처리의 결과 값)를 `catch()`로 받을수 있다.

- ```js
  function getData() {
    return new Promise(function (resolve, reject) {
      reject(new Error("Request is failed"));
    });
  }

  //reject()의 결과 값 Error를 err에 받음
  getData()
    .then()
    .catch(function (err) {
      console.log(err); //Error: Request is failed
    });
  ```

  ![Promise (1)](https://user-images.githubusercontent.com/60641307/94361939-c9a43680-00f2-11eb-9549-8d7092a710f9.jpg)
