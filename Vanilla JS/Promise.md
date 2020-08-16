## Promise

> 프로미스는 자바스크립트 비동기 처리에 사용되는 객체이다.

- 비동기 처리
  - 특정 코드의 실행이 완료될 때까지 기다리지 않고 다음 코드를 먼저 수행하는 자바스크립트의 특성

### Primise가 필요한 이유

> 프로미스는 주로 서버에서 받아온 데이터를 화면에 표시할 때 사용함

- ```javascript
  //일반적으로 웹 애플리케이션을 구현할 때 서버에서 데이터를 요청하고 받아오기 위해 아래와 같은 api를 사용
  $.get("url 주소/products/1", function (response) {
    //...
  });
  ```

  - 데이터를 받아오기도 전에 데이터를 다 받아온 것 마냥 화면에 데이터를 표시하려고 하면 오류가 발생하거나 빈화면이 표시됨
  - 이와 같은 문제점을 해결하기 위한 방법 중 하나가 프로미스

- ```javascript
    funtion getData(callback){
        // new promise() 추가
        return new Promise(function(resolve,reject) {
            $.get('url 주소/products/1', function(response){
                //데이터를 받으면 resolve() 호출
                resolve(response);
            });
        });
    }

    //getData()의 실행이 끝나면 호출되는 then()
    getData().then(function(tableData){
        // resolve()의 결과 값이 여기로 전달됨
        console.log(tableData);//$.get()의 response 값이 tableData에 전달됨
    });
  ```

### 프로미스의 3가지 상태(State)

> 프로미스 상태란 프로미스의 처리 과정을 의미<br>new Promise()로 프로미스를 생성하고 종료될 때까지 3가지 상태를 갖는다.

- **Pending(대기)**
  - 비동기 처리 로직이 아직 완료되지 않은 상태
- **Fulfilled(이행)**
  - 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
- **Rejected(실패)**
  - 비동기 처리가 실패하거나 오류가 발생한 상태

#### Pending(대기)

> new Promise() 메서드를 호출하면 대기(Pending)상태가 됨 `new Promise();`

- new Promise() 메서드를 호출할 때 콜백 함수를 선언할 수 있고, 콜백 함수의 인자는 resolve, rejcet이다.
- ```javascript
  new Promise(function (resolve, reject) {
    //...
  });
  ```

#### Fulfiled(이행)

> 콜백함수의 인자 resolve를 아래와 같이 실행하면 이행(Fulfilled)상태가 된다.

- ```javascript
  function getData() {
    return new Promise(function (resolve, reject) {
      const data = 100;
      resolve(data);
    });
  }
  //이행 상태가 되면 then() 메서드 이용하여 처리 결과 값을 받을수 있음
  //resolve()의 결과 값 data를 resolveData로 받음
  getData().then(function (resolveData) {
    console.log(resolveData); // 100
  });
  ```

#### Rejected(실패)

> reject를 호출하면 실패(Rejected)상태가 된다.

- ```javascript
  function getData() {
    return new Promise(function (resolve, reject) {
      reject(new Error("Request is failed"));
    });
  }
  //실패 상태가 되면 실패한 이유(실패 처리의 결과값)를 catch()로 받을수 있음
  getData()
    .then()
    .catch(function (err) {
      console.log(err); // Error: Request is failed
    });
  ```
