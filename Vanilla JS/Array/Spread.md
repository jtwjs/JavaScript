## Spread

> 객체나 배열의 내부나 함수를 호출해주는 인자에서 사용

- 요소들을 펼쳐서 가져옴 (배열X)

### 객체 속의 spred 문법

- ```javascript
  const student = {
    name: "정태웅",
    old: 26,
  };

  const univStudent = {
    ...student, //이거 받고
    major: "컴퓨터공학과", //이거 추가
  };

  console.log(univStudent); //{name: 정태웅, old: 26, major: 컴퓨터공학과}

  const koreanUnivStudent = {
    ...univStudent, //이거 받고
    region: "Seoul", //이거 추가
  };

  console.log(koreanUnivStudent); //{name: 정태웅, old: 26, major: 컴퓨터공학과, region: Seoul}
  ```

### 배열속의 spread 문법

- ```javascript
  const oddNum = [1, 3, 5, 7, 9];
  const evenNum = [2, 4, 6, 8];

  const num = [...oddNum, ...evenNum];
  console.log(num); //1, 3, 5, 7, 9, 2, 4, 6, 8
  ```

- 배열의 요소들을 함수의 인자로 전달하고싶을때 자주 사용됨
