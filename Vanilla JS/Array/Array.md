## Array

- 배열은 객체와 달리 본질에서 순서가 있는 데이터 집합이며 0으로 시작하는 숫자형 인덱스를 사용한다.
- 자바스크립트의 배열은 비균질적이다. 즉, 한 배열의 요소가 모두 같은 타입일 필요는 없다.
  - 배열은 다른 배열이나 객체도 포함할 수 있다.
- 배열 리터럴은 대괄호로 만들고, 배열 요소에 인덱스로 접근할 때도 대괄호로 사용한다.
- 모든 배열에는 요소가 몇개 있는지 나타내는 length 프로퍼티가 있다.
- 배열에 배열 길이보다 큰 인덱스를 사용해서 요소를 할당하면 배열은 자동으로 그 인덱스에 맞게 늘어나며, 빈자리는 undefined로 채워짐
- Array 생성자를 써서 배열을 만들 수도 있지만 그렇게 해야하는 경우는 별로 없다.

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

### 배열 요소 조작

> 자바스크립트 배열 메서드 중 일부는 배열 '자체를' 수정하며, 다른 일부는 새 배열을 반환한다.

#### 배열의 요소 추가하기

- push(): 배열을 직접 건드리는 방식
  - 대상이되는 배열을 변화시킴으로써 새로운 요소가 추가된 배열을 반환<br>(원본 배열을 직접 건드리는 방식)
- unshift()
  - 배열의 첫 인덱스에 새 요소를 추가
- concat(): 배열을 직접 건드리지 않는 방식
  - 원본 배열을 건드리지 않고 새로운 객체로 생성해서 추가
- ```js
  const arr = ["b", "c", "d"];
  arr.push("e"); //  arr은 이제 ["b", "c", "d", "e"]
  arr.unshift("a"); // arr은 이제 ["a", "b", "c", "d", "e"]

  //concat은 배열의 끝에 여러 요소를 추가한 사본을 반환한다.
  const arr2 = ["가", "나", "다"];
  arr2.concat("라", "마"); //["가", "나", "다", "라", "마"]. arr2는 바뀌지 않는다.

  //concat에 배열을 넘기면 이 메서드는 배열을 분해해서 원래 배열에 추가한 사본을 반환함
  ar2.concat(["라", "마"], "바"); //["가", "나", "다", "라", "마", "바"]. arr2는 바뀌지 않는다.
  //제공받은 배열을 한번만 분해한다. 배열 안에 있는 배열을 다시 분해하지는 않는다.
  arr.concat(["라", ["마", "바"]]); //["가", "나", "다", "라", ["마", "바"]]. arr2는 바뀌지 않는다.
  ```

#### 배열 속 요소 빼내기

- pop(): 배열을 직접 건드리는 방식
  - 가장 마지막에 인덱스 요소를 빼냄
- shift()
  - 가장 처음 인덱스 요소를 빼냄
- ```js
  const arr = [1, 2, 3];
  arr.pop(); // arr은 이제 [1, 2];
  arr.shift(); // arr은 이제 [2];
  ```

#### 배열 일부 가져오기

> 배열 일부만 가져올 떄는 slice 메서드를 사용한다.

- slice 메서드는 매개변수 두개를 받는다.
  - 첫번째 매개변수는 어디서부터 가져올지를,
  - 두번째 매개변수는 어디까지 가져올지를 지정한다.(생략시 마지막까지 반환)
  - 음수 인덱스를 쓸 경우 배열의 끝부터 요소를 센다
- ```js
  const arr = [1, 2, 3, 4, 5];
  arr.slice(3); // [4, 5] arr은 바뀌지 않는다.
  arr.slice(2, 4); // [3, 4] arr은 바뀌지 않는다.
  arr.slice(-2); // [4, 5] arr은 바뀌지 않는다.
  arr.slice(1, -2); //[2, 3] arr은 바뀌지 않는다.
  arr.slice(-2, -1); //[4] arr은 바뀌지 않는다.
  ```

#### 임의의 위치에 요소 추가하거나 제거하기

> splice는 배열을 자유롭게 수정할수 있다.

- 첫 번째 매개변수는 수정을 시작할 인덱스
- 두번째 매개변수는 제거할 요소 숫자이다.
- 나머지 매개변수는 배열에 추가될 요소이다.
- ```js
  const arr = [1, 5, 7];
  arr.splice(1, 0, 2, 3, 4); // []. arr은 이제 [1, 2, 3, 4, 5, 7]
  arr.splice(5, 0, 6); //[]. arr은 이제 [1, 2, 3, 4, 5, 6 ,7]
  arr.splice(1, 2); //[2, 3]. arr은 이제 [1, 4, 5, 6, 7]
  arr.splice(2, 1, "a", "b"); //[5]. arr은 이제 [1, 4, 'a', 'b', 6, 7]
  ```

#### 배열 안에서 요소 교체하기

> copyWithin은 ES6에서 도입한 새 메서드이다. <br> 이 메서드는 배열 요소를 복사해서 다른 위치에 붙여주고, 기존의 요소를 덮어쓴다.

- 첫번째 매개변수는 복사한 요소를 붙여넣을 위치
- 두번째 매개변수는 복사를 시작할 위치
- 세번째 매개변수는 복사를 끝낼 위치 (생략가능)
- slice와 마찬가지로 음수 인덱스를 사용하면 배열의 끝에서부터 센다.
- ```js
  const arr = [1, 2, 3, 4];
  arr.copyWithin(1, 2); // arr은 이제 [1, 3, 4, 4]
  arr.copyWithin(2, 0, 2); // arr은 이제 [1, 3, 1, 3]
  arr.copyWithin(0, -3, -1); // arr은 이제 [3, 1, 1, 3]
  ```

#### 특정 값으로 배열 채우기

> ES6에서 도입한 새 메서드 fill은 정해진 값으로 배열을 채운다.

- 크기를 지정해서 배열을 생성하는 Array 생성자와 잘어울림
- 배열의 일부만 채우려 할 때는 시작 인덱스와 끝 인덱스를 지정하면 된다.
- 음수 인덱스 사용 가능
- ```js
  const arr = new Array(5).fill(1); // arr이 [1, 1, 1, 1, 1]로 초기화 된다.
  arr.fill("a"); //arr은 이제 ["a", "a", "a", "a", "a"]
  arr.fill("b", 1); //["a", "b", "b", "b", "b"]
  arr.fill("c", 2, 4); //["a", "b", "c", "c", "b"]
  arr.fill(5.5., -4); // ["a", -5.5, -5.5, -5.5, -5.5]
  arr.fill(0, -3, -1); //["a", -5.5, 0, 0, -5.5]
  ```

#### 배열 정렬과 역순 정렬

- reverse()
  - 이름 그대로 배열 요소의 순서를 반대로 바꿈(수정)
- sort()
  - 배열 요소의 순서를 정렬함
- ```js
  const arr = [1, 2, 3, 4, 5];
  arr.reverse(); // arr은 이제 [5, 4, 3, 2, 1]

  arr.sort(); // arr은 이제 [1, 2, 3, 4, 5]

  // sort는 정렬 함수를 받을 수 있다.
  const arr = [{ name: "Taewoong" }, { name: "Jim" }, { name: "Untack" }, { name: "Amanda" }];
  arr.sort(); //arr은 바뀌지 않는다.
  arr.sort((a, b) => a.name > b.name); //arr은 name 프로퍼티의 알파벳 순으로 정렬됨
  arr.sort((a, b) => a.name[1] < b.name[1]); //arr은 name 프로퍼티의 두 번째 글자의 알파벳 역순으로 정렬됨
  ```

### 배열 검색

#### indexOf()

- 찾고자 하는 것과 정확히 일치(===)하는 첫번째 요소의 인덱스를 반환
- lastIndexOf는 배열의 끝에서부터 검색
- 일치하는 것을 찾지 못하면 -1 반환
- ```js
  const o = { name: "Jerry" };
  const arr = [1, 5, "a", o, true, 5, [1, 2], "9"];
  arr.indexOf(5); //1
  arr.lastIndexOf(5); //5
  arr.indexOf({ name: "Jerry" }); // -1
  arr.indexOf([1, 2]); // -1
  //두번째 매개변수로 시작인덱스 지정
  arr.indexOf("a", 5); // -1
  ```

#### findIndex()

- 일치하는 것을 찾지 못할 때 -1을 반환한다는 점에서 indexOf와 비슷
- 보조 함수를 써서 검색 조건을 지정할 수 있으므로 indexOf보다 더 다양한 상황에서 활용 가능하다
- 검색을 시작할 인덱스를 지정할 수 없다.
- 뒤에서부터 찾는 짝 메소드도 없다.
- ```js
  const arr = [
    { id: 5, name: "Taewoong" },
    { id: 7, name: "Francis" },
  ];
  arr.findIndex((o) => o.id === 5); // 0
  arr.findIndex((o) => o.name === "Francis"); //1
  ```

#### find()

> 조건에 맞는 요소의 인덱스가 아니라 요소 자체를 원할 때는 find를 사용

- findIndex와 마찬가지로 검색 조건을 함수로 전달 가능
- ```js
  const arr = [
    { id: 5, name: "Taewoong" },
    { id: 7, name: "Francis" },
  ];
  arr.find((o) => o.id === 5); // 객체 {id :5, name: "Taewoong"}
  arr.find((o) => o.id === 2); //undefined
  ```
- find()와 findIndex()에 전달하는 함수는 배열의 각 요소를 첫 번째 매개변수로 받고, 현재 요소의 인덱스와 배열 자체도 매개변수로 받는다.
- ```js
  const arr = [1, 17, 16, 5, 4, 16, 10, 3, 49];
  arr.find((x, i) => i > 2 && Number.isInteger(Math.sqrt(x))); //4
  ```
- find와 findIndex에 전달하는 함수의 this도 수정 가능
  - 이를 이용해서 함수가 객체의 메서드인 것처럼 호출 가능
- ```js
  class Person {
    constructor(name) {
      this.name = name;
      this.id = Person.nextId++;
    }
    Person.nextId = 0;
    const jamie = new Person("Jamie"),
      juliet = new Person("Juliet"),
      peter = new Person("Peter"),
      jay = new Person("Jay");
    const arr = [jamie, juliet, peter, jay];

    //옵션 1: ID를 직접 비교하는 방법
    arr.find(p => p.id === juliet.id); //juliet 객체

    //옵션 2: "this" 매개변수를 이용하는 방법
    arr.find(function (p) {
      return p.id === this.id
    },juliet); // juliet 객체
  }
  ```

#### some & every

- some()
  - 조건에 맞는 요소를 찾으면 즉시 검색을 멈추고 true 반환
  - 조건에 맞는 요소를 찾지 못하면 false 반환
- every()
  - 배열의 모든 요소가 조건에 맞아야 true를 반환하며 그렇지 않다면 false 반환
  - every는 조건에 맞지 않는 요소를 찾아야만 검색을 멈추고 false를 반환한다.
- ```js
  const arr = [4, 6, 16, 36];
  arr.every((x) => x % 2 === 0); // true; 홀수가 없다.
  arr.every((x) => Number.isInteger(Math.sqrt(x))); // false; 6은 제곱수가 아니다
  ```
- 콜백함수를 받는 모든 메서드가 그렇듯, some과 every도 콜백함수를 호출할 때 this로 사용할 값을 두 번째 매개변수로 받을 수 있다.

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
