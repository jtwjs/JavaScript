## Function (함수)

### (First-class citizen) 1급 객체

#### 1. 변수에 대입이 가능하다

- 함수도 객체이기 때문에 변수안에 담아둘수있고 변수에 담아둘때는 함수이름을 생략가능
- ```js
  const add = function (num1, num2) {
    return num1 + num2;
  };

  console.log(typeof add); //function
  console, log(add(1, 2)); //3
  ```

#### 2. 다른 함수의 인자나 리턴값으로 활용이 가능하다

- ```javascript
  const add = function (num1, num2) {
    return num1 + num2;
  };

  console.log("두수의 합계는", add(1, 2), " 입니다.");
  ```

#### 3. 배열, 객체 등의 자료구조에 대입이 가능하다

- ```javascript
  const add = function (num1, num2) {
    return num1 + num2;
  };

  const sub = function (num1, num2) {
    return num1 - num2;
  };

  // 1.배열에 함수 대입
  const calculator = [add, sub];

  calculator[0](2, 3); //5
  caclulator[1](2, 3); //-1

  // 2.객체에 함수 대입
  const calObj = { add, sub }; //{add: f, sub: f}
  calObj.add(2, 6); //8
  calObj.sub(2, 6); //-4
  ```
