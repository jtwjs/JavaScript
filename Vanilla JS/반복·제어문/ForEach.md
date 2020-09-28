## forEach문

> for문과 마찬가지로 반복적인 기능을 수행할 때 사용

- for문처럼 index와 조건식, increase를 정의하지 않아도 callback 함수를 통해 기능을 수행할 수 있다.

#### 1. [].forEach(callback, thisArg)

- ```javascript
  const arr = [0, 1, 2, 3, 4, 5];

  arr.forEach(function (element) {
    console.log(element); // 0 1 2 3 4 5
  });

  arr.forEach((element) => console.log(element));
  ```

- for문보다 직관적
- arr내 모든 요소들이 callback 호출
- forEach는 return 값이 없다.
  - 즉, callback 함수에 의해서 어떤 결과물을 내놓고 싶으면 함수 밖의 변수를 사용

#### 2. callback 함수 인자

> forEach의 callback 함수에는 배열의 요소뿐만아니라 index, 전체 배열을 인자로 사용 가능

- ```javascript
  const arr = [0, 1, 2, 3, 4, 5];

  arr.forEach(function (element, index, array) {
    console.log(`${array}의 ${index}번째 요소 : ${element}`);
  });

  /*0,1,2,3,4,5의 0번째 요소 : 0
  0,1,2,3,4,5의 1번째 요소 : 1
  0,1,2,3,4,5의 2번째 요소 : 2
  0,1,2,3,4,5의 3번째 요소 : 3
  0,1,2,3,4,5의 4번째 요소 : 4
  0,1,2,3,4,5의 5번째 요소 : 5*/
  ```

#### 3. thisArg

> forEach는 callback 함수 이외에 thisArg라는 객체(Object) 인자도 사용할 수 있다.

- ```javascript
  function Counter() {
    this.sum = 0;
    this.count = 0;
  }

  Counter.prototype.add = function (array) {
    array.forEach(function (entry) {
      this.sum += entry;
      ++this.count;
    }, this);
  };

  const obj = new Counter();
  obj.add([2, 5, 9]);
  obj.count;
  //3
  obj.sum;
  //16
  ```

- ```javascript
  const arr = [0, 1, 2, 3, 4, 5];
  const obj1 = { name: "kim" };
  const obj2 = { name: "park" };

  arr.forEach(function (element) {
    console.log(`${this.name} - ${element}`);
  }, obj1);
  /*
  kim - 0
  kim - 1
  kim - 2
  kim - 3
  kim - 4
  kim - 5
  */

  arr.forEach(function (element) {
    console.log(`${this.name} - ${element}`);
  }, obj2);
  /*
  park - 0
  park - 1
  park - 2
  park - 3
  park - 4
  park - 5
  
  */
  ```

  - 즉, forEach의 callback에서 this에 대한 참조를 사용할 수 있다.
    - thisArg가 callback의 this가 되는 것

#### 4. 유의할점

- for문은 continue나 break로 반복문을 제어할 수 있지만 forEach는 throw(예외)를 발생시키지 않으면 중간에 반복문을 종료할수 없다.
  - 조건을 만족할 때 까지만 반복시켜야 한다면 기존 for문이나 every같은 함수를 사용
