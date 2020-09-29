## Array

#### 배열이라는 자료형은 없고 객체에 불과하다

- ```javascript
  const arr = [1, 2, 3, 4];
  console.log(typeof arr); // Object
  ```

#### 배열의 길이 알아보기 : .length

- ```javascript
  const arr = [1, 2, 3, 4];
  console.log(arr.length); //4
  ```

#### JS에서는 배열의 길이와 배열의 요소개수는 다를수가 있다.

- ```javascript
  const arr = [];
  arr[2] = 3;
  console.log(arr);
  //[2 empty, 3]
  ```
- JS에서의 배열에서는 (사용자가 직접 초기화해준) 요소 개수와 배열의 길이는 다를 수 있고, 초기화해주지 않은 요소는 empty라는 요소로 채워진다.

#### 배열의 요소 추가하기

- push(): 배열을 직접 건드리는 방식
  - 대상이되는 배열을 변화시킴으로써 새로운 요소가 추가된 배열을 반환<br>(원본 배열을 직접 건드리는 방식)
- concat(): 배열을 직접 건드리지 않는 방식
  - 원본 배열을 건드리지 않고 새로운 객체로 생성해서 추가

#### 배열 속 요소 빼내기

- pop(): 배열을 직접 건드리는 방식
  - 가장 마지막에 인덱스 요소를 빼냄

#### 배열 속 요소 순회하기

- forEach()

  - 순회하려는배열.forEach(함수로 정의한 순회하면서 할 일)

- **map()**
  - 순회하려는배열.map(함수로 정의한 순회하면서 할 일)
  - 새로운 배열을 만들어 return 해줌
- ```javascript
  const arr = ["태웅", "언택", "재호", "지호"];
  //forEach
  arr.forEach( name => console.log(`내이름은 ${arr[1]}야`););

  //map
  const oddarr = [1, 3, 5, 7, 9];

  const newarr = oddarr.map(num => num * 2);

  console.log(oddarr); //[1, 3, 5, 7, 9]
  console.log(newarr);//[2, 6, 10, 14, 18]
  ```

#### 내가 원하는 조건을 만족하는 배열 속 요소 찾기

- **filter()**

- ```javascript
  const arr = [1, 2, 3, 4, 5, 6];

  const filterarr = arr.filter((a) => a > 4);

  console.log(filterarr); //[5, 6];

  const postlist = [
    { date: "yesterday", id: 1 },
    { date: "yesterday", id: 2 },
    { date: "today", id: 3 },
  ];
  const yesterday = postlist.filter((a) => a.date === "yesterday");

  console.log(yesterday); // [{"date": "yesterday", "id": 1}, {"date": "yesterday", "id": 2}]
  ```