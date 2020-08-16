## then() 메서드

> Promise를 리턴하고 두 개의 콜백 함수를 인수로 받는다.<br> 하나는 Promise가 이행했을 때, 다른 하나는 거부했을 때를 위한 콜백 함수이다.

- ```javascript
  const promise1 = new Promise((resolve, reject) => {
    resolve("Success!");
  });

  promise1.then((value) => {
    console.log(value);
    //"Success!"
  });
  ```
