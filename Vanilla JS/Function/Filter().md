## filter 함수

> 콜백함수에 지정된 조건에 맞는 요소를 새롭게 반환<br>콜백함수의 인자는 순서대로 값(value),인덱스(index),원 배열(array)이다.

- ```javascript
  let data = [
    { name: "jack", age: 20 },
    { name: "kevin", age: 22 },
    { name: "jacson", age: 25 },
    { name: "soon", age: 55 },
    { name: "woong", age: 26 },
  ];
  // age가 20이상인 원소 추출(필터링)
  let result = data.filter((element) => {
    return element.age >= 20;
  });

  let result2 = data.filter((element, index, array) => {
    return index === 0 && element.age >= 20;
  });
  ```
