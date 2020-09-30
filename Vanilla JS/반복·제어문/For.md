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

### 유용한 제어문 패턴

> 널리 쓰이는 패턴

#### 1. continue 문을 사용하여 조건 중첩 줄이기

> 특정 조건이 맞을 때만 루프 바디를 실행해야 할 때가 많다. <br> 다시 말해 반복문 안에 조건문을 써야 하는 경우이다.

- ```js
  while (funds > 1 && funds < 100) {
    let totalBet = rand(1, funds);
    if (totalBet === 13) {
      console.log("Unlucky! Skip this round...");
      continue;
    }

    //플레이
  }
  ```

#### 2. break나 return 문을 써서 불필요한 연산 줄이기

> 뭔가를 찾기 위해서 루프를 실행했다면, 찾으려는 것을 이미 찾은 후에는 루프 바디를 계속 실행할 필요가 없다.

- ```js
  let firstPrime = null;
  for (let n of bigArrayOfNumbers) {
    if (isPrime(n)) {
      firstPrime = n;
      break;
    }
  }
  ```

#### 3. 루프를 완료한 뒤 인덱스 값 사용하기

> break 문을 써서 루프를 일찍 종료했을 때 인덱스 변수의 값이 필요할 때가 있다. <br>for 루프가 끝나도 인덱스 변수의 값은 그대로 유지된다는 점을 활용

- ```js
  let i = 0;
  for (; i < bigArrayOfNumbers.length; i++) {
    if (isPrime(bigArrayOfNumbers[i])) break;
  }

  if (i === bigArrayOfNumbers.length) console.log("No prime numbers!");
  else console.log(`First prime number found at position ${i}`);
  ```

#### 4. 배열을 수정할 때 감소하는 인덱스 사용하기

> 배열에 루프를 실행하면서 루프 바디에서 배열을 수정하는 건 위험할 수 있다.<br> 뜻하지 않게 종료 조건을 바꿀수도 있기떄문
> <br> 이런 경우 널리 쓰이는 패턴은 감소하는 인덱스를 써서, 배열 마지막 요소에서 루프를 시작하는 방법이다.

- ```js
  for (let i = bigARrayOfNumbers.length - 1; i >= 0; i--) {
    if (isPrime(bigArrayOfNumbers[i])) bigArrayOfNumbers.splice(i, 1);
  }
  ```
