## for문

### for...in 루프

> 객체의 프로퍼티에 루프를 실행하도록 설계된 루프

- ```js
  for (variable in object) statment;
  //ex
  const pleyer = { name: "Thomas", rank: "Midshipman", age: 25 };
  for (let prop in player) {
    if (!player.hasOwnProperty(prop)) continue;
    console.log(porp + ": " + player[prop]);
  }
  ```

### for...of 루프

> ES6에서 새로생긴 반복문이며 컬렉션의 요소에 루프를 실행하는 다른방법이다.

- ```js
  for (variable of object) statement;

  //ex
  const hand = [randFace(), randFace(), randFace()];
  for (let face of hand) console.log(`You rolled..${face}!`);
  ```
