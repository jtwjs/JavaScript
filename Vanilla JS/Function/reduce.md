## reduce()

- `배열.reduce((누적값, 현재값, 인덱스, 요소) => { return 결과}, 초기값);`
- ```javascript
  result = oneTwoThree.reduce((acc, cur, i) => {
    console.log(acc, cur, i);
    return acc + cur;
  }, 0);
  // 0 1 0
  // 1 2 1
  // 3 3 2
  result; // 6
  /*acc(누적값)이 초깃값인 0부터 시작*/
  ```
  - 초기값을 지정하지 않으면 자동으로 초기값이 0번째 인덱스의 값이 된다.

### reduceRight()

> reduce와 동작은 같지만 요소 순회를 오른쪽에서부터 왼쪽으로 한다.

- ```javascript
  result = oneTwoThree.reduceRight((acc, cur, i) => {
    console.log(acc, cur, i);
    return acc + cur;
  }, 0);
  //0 3 2
  //3 2 1
  //5 1 0
  result; //6
  ```

#### reduce() 응용

- ```javascript
  /*map 표현*/
  result = oneTwoThree.reduce((acc, cur) => {
    acc.push(cur % 2 ? "홀수" : "짝수");
    return acc;
  }, []);
  result; // ['홀수', '짝수', '홀수']

  /*filter 표현*/
  result = oneTwoThree.reduce((acc, cur) => {
    if (cur % 2) acc.push(cur);
    return acc;
  }, []);
  result; // [1,3]
  ```

- ```javascript
  const promiseFactory = (time) => {
    return new Promise((resolve, reject) => {
      console.log(time);
      setTimeout(resolve, time);
    });
  };

  [1000, 2000, 3000, 4000].reduce((acc, cur) => {
    return acc.then(() => promiseFactor(cur));
  }, Promise.resolve());
  //바로 1000
  //1초 후 2000
  //2초 후 3000
  //3초 후 4000
  ```

- 반복되는 모든것에 `reduce()` 사용가능
