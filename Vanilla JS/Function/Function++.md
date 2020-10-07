## 함수와 추상적 사고

### 서브루틴으로서의 함수

> 서브루틴은 아주 오래된 개념이며 복잡한 코드를 간단하게 만드는 기초적이 수단이다.

- 서브루틴은 프로시저(procedure), 루틴(routine), 서브프로그램(subprogram), 매크로(macro) 등 다양한 이름으로 불린다.

  - 이들은 모두 매우 단순하고 범용적인, 호출할 수 있는 단위를 일컫는 말

- ```js
  //서브루틴은 대게 어떤 알고리즘(주어진 작업을 수행하는 방법)을 나타내는 형태이다.

  //오늘이 윤년인지 아닌지 판단하는 알고리즘
  const year = new Date().getFullYear();
  if (year % 4 !== 0) console.log(`${year} is NOT a leap year.`);
  else if (year % 100 != 0) console.log(`${year} IS a leap year`);
  else if (year % 400 != 0) console.log(`${year} is NOT a leap year`);
  else console.log(`${year} IS a leap year`);

  //위 코드를 함수로 감싸면 재사용할 수 있는 서브루틴(함수)이 됨
  function printLeapYearStatus() {
    // 함수 이름은 어떤 사람이 함수 이름만봐도 무슨기능을하는지 예측가능하게..
    // ...위 코드
  }
  ```

#### 값을 반환하는 서브루틴으로서의 함수

- ```js
  function isCurrentYearLeapYear() {
    // 불리언을 반환하거나 필요한 컨텍스트에서 사용하도록 만든 함수는 is로 시작하는 이름을 붙이는게 일반적
    const year = new Date().getFullYear();
    if (year % 4 !== 0) return false;
    else if (year % 100 != 0) return true;
    else if (year % 400 != 0) return false;
    else return true;
  }

  const daysInMonth = [31, isCurrentYearLeapYear() ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (isCurrentYearLeapYear()) console.log("It is a leap year.");
  ```

#### 함수로서의 함수

1. 순수한 함수는 입력이 같으면 결과도 반드시 같다.
2. 순수한 함수에는 부수 효과(side effect)가 없어야 한다.
   - 즉, 함수를 호출한다고 해서 프로그램의 상태가 바뀌어서는 안된다.

- ```js
  //입력이 같으면 결과도 항상 같고 다른 효과는 전혀 없는 순수한 함수
  function isLeapYear(year) {
    if (year % 4 !== 0) return false;
    else if (year % 100 != 0) return true;
    else if (year % 400 != 0) return false;
    else return true;
  }
  ```

#### 그래서?

> 함수를 서브루틴이라는 관점에서 보면 자주 사용하는 동작을 하나로 묶어 반복을 없애는 것!
> <br>코드를 하나로 묶어서 반복을 피한다는 개념은 너무 중요해서, DRY(don't repeat yourself) 라는 약어가 새로 생겼을 정도이다.

- 함수가 상황에 따라 다른 값을 반환하거나 부작용이 있다면 그 함수는 컨텍스트에 좌우되는 함수이다.
  - 어떤 함수가 정말 유용하더라도 부수 효과가 있다면, 그리고 그 함수가 쓰이던 프로그램이 아닌 프로그램에서 사용하려 한다면 문제를 일으킬 수 있다.
  - 99%는 제데로 동작하다가 1%의 상황에서 버그를일으키는 상황은 더 심각하다 (가장 악질적인 버그는 숨어있는 버그)
- 항상 순수한 함수를 쓰는 습관을 들이자

### IIFE와 비동기적 코드

> IIFE를 사용하는 사례 중 하나는 비동기적 코드가 정확히 동작할 수 있도록 새 변수를 새 스코프에 만드는 것

- ```js
  //카운트다운 함수
  var i;
  for (i = 5; i >= 0; i--) {
    setTimeout(function () {
      console.log(i === 0 ? "go!" : i);
    }, (5 - i) * 1000);
  }
  /* setTimeout에 전달된 함수가 루프 안에서 실행되지 않고
     루프가 종료된 뒤에 실행됐기에 -1이 6번 출력됨*/


    //IIFE 사용
  var i;
  for(i=5; i>=0; i--) {
      (function(i) {
          setTimeout(function() {
              console.log(i===0 ? "go!" : i)
          }, (5-i) * 1000);)
      })(i);

      //블록 스코프 변수를 사용하면 극도로 단순해짐
      for(let i=5; i>=0; i--) {
          setTimeout(function() {
              //변수로 받는게 아닌 값으로 전달
              console.log(i===0 ? "go!" :i);
          },(5-i) * 1000);
      }
  }

    //루프의 단계마다 변수 i의 복사본을 새로 만듦
    //따라서 setTimeout에 전달한 함수가 실행될 때는 독립스코프에서 변수를 받는다.
  ```

### 변수로서의 함수

- 함수를 가리키는 변수를 만들어 별명을 정할 수 있다.
- 배열에 함수를 넣을 수 있다. (물론 다른 타입의 데이터와 섞일 수 있다.)
- 함수를 객체의 프로퍼티로 사용할 수 있다.
- 함수를 함수에 전달할 수 있다.
- 함수가 함수를 반활 할 수 있다.
- 함수를 매개변수로 받는 함수를 반환하는것도 가능

- ```js
  function addThreeSquareAddFiveTakeSquareRoot(x) {
    return Math.sqrt(Math.pow(x + 3, 2) + 5);
  }

  //별명을 쓰기 전
  const answer = (addThreeSquareAddFiveTakeSquareRoot(5) + addThreeSquareAddFiveTakeSquareRoot(2)) / addThreeSquareAddFiveTakeSquareRoot(7);

  // 별명을 쓴 후
  const f = addThreeSquareAddFiveTakeSquareRoot; //뒤에 ()를 안붙임 괄호를 붙이면 함수를 호출하고 호출결과가 저장됨
  const answer = (f(5) + f(2)) / f(7);
  ```

- ```js
  const Money = require("math-money"); //require는 라이브러리를 불러오는 노드 함수

  const oneDollar = Money.Dollear(1);

  //Money.Dollar도 길게 느껴지면 이렇게 해도됨
  const Dollar = Money.Dollar;
  const twoDollars = Dollar(2);
  //oneDollar와 twoDollars는 같은 타입의 인스턴스
  ```

#### 배열 안의 함수

> 한 셋으로 묶는 파이프라인이 좋은 예

- ```js
  const sin = Math.sin;
  const cos = Math.cos;
  const theta = Math.PI / 4;
  const zoom = 2;
  const offset = [1, -3];

  const pipeline = [
    function rotate(p) {
      return {
        x: p.x * cos(theta) - p.y * sin(theta),
        y: p.x * cos(theta) - p.y * cos(theta),
      };
    },
    function scale(p) {
      return {
        x: p.x * zoom,
        y: p.y * zoom,
      };
    },
    function translate(p) {
      return {
        x: p.x + offset[0],
        y: p.y + offset[1],
      };
    },
  ];

  //이제 pipeline은 2D 변형에 필요한 함수의 배열이다.

  //점 하나를 ㅂ녀형
  const p = { x: 1, y: 1 };
  let p2 = p;
  for (let i = 0; i < pipeline.length; i++) {
    p2 = pipeline[i](p2); //각 함수에 p2를 전달하고, 반환값을 다시 할당
  }

  //p2는 이제 p1을 좌표 원점 기준으로 45도 회전하고
  // 원점에서 2 단위만큼 떨어뜨린 후
  // 1단위 오른쪽, 3단위 아래쪽으로 움직인 점이됨
  ```

#### 함수에 함수 전달

> 함수에 함수를 전달하는 다른 용도는 비동기적 프로그래밍이다.<br>이런 용도는 보통 콜백이라 부름 약자로 cb를 쓸 때가 많다.<br> 콜백 함수는 자신을 감싼 함수가 실행을 마쳤을 때 호출됨

- 함수는 동작이고, 함수를 받은 함수는 그 동작을 활용할 수 있다.
- ```js
  function sum(arr, f) {
    //함수가 전달되지 않았으면 매개변수를 그대로 반환하는 null 함수를 쓴다.
    if (typeof f != "function") f = (x) => x;

    return arr.reduce((a, x) => (a += f(x)), 0);
  }

  sum([1, 2, 3]); //6
  sum([1, 2, 3], (x) => x * x); //14
  sum([1, 2, 3], (x) => Math.pow(x, 3)); // 36
  ```

#### 함수를 반환하는 함수

- ```js
  function sumOfSquares(arr) {
    return sum(arr, (x) => x * x);
  }

  function newSummer(f) {
    return (arr) => sum(arr, f);
  }
  //새 함수 newSummer가 반환하는 함수는 단 하나의 매개변수만 받으면서도, 중간 함수를 마음대로 쓸수 있다.
  const sumOfSquares = newSummer((x) => x * x);
  const sumofCubes = newSummer((x) => Math.pow(x, 3));
  sumOfSquares([1, 2, 3]); //returns 14
  sumOfCubes([1, 2, 3]); //returns 36
  ```

- 매개변수 여러개를 받는 함수를 매개변수 하나만 받는 함수로 바꾸는 것을 커링(currying)이라 부른다.
  - 커링이라는 이름은 이 패턴을 만든 미국의 수학자 하스켈 커리의 이름을 딴 것

### 재귀

> 재귀란 자기 자신을 호출하는 함수이다.
> <br>같은 일을 반복하면서 그 대상이 점차 줄어드는 상황에서 재귀를 유용하게 활용할 수 있다.

- 재귀 함수에는 종료 조건이 있어야 한다.
  - 종료 조건이 없다면 JS 인터프리터에서 스택이 너무 깊다고 판단할때까지 재귀 호출을 계속 하다가 프로그램이 멈춘다.
- ```js
  //숫자의 계승(factorial)을 찾는 예제
  function fact(n) {
    if (n === 1) return 1; //함수의 종료 조건
    return n * fact(n - 1); //재귀 호출할 때마다 숫자 n은 1씩 줄어듦
  }
  ```
