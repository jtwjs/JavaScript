## map()

> 반복문을 돌며 배열 안의 요소들을 1대1로 짝지어 주는 메서드

- ```javascript
  const oneTwoThree = [1, 2, 3];
  let result = oneTwoThree.map((v) => {
    console.log(v);
    return v;
  });
  oneTwoThree; // [1,2,3]
  result; // [1,2,3]
  oneTwoThree === result; // false;
  ```
- 반복문으로 요소를 순회하면서 각 요소를 어떻게 짝지어줄지 알려준다.
- map을 실행하는 배열과 결과로 나오는 배열은 서로 다른 객체다.
  - 기존 배열을 수정하지 않고 새로운 배열을 만들어낸다.
