## 연산자(operator)

> 연산자를 표현식의 명사에 대한 동사라고 생각해도 좋다.
> <br>표현식이 값이 되는 것이라면 연산자는 값을 만드는 행동이라는 뜻

### 비교 연산자

> 비교 연산자는 이름처럼 두 개의 값을 비교한다.

- 일치함(equality ===), 동등함(loose equality ==), 대소관계의 세 가지 타입으로 나뉜다.
  - 불일치는 일치의 한 종류라고 보기 떄문에 다른 타입으로 나누지는 않는다.
- **일치함 ( === )**
  - 두 값이 같은 객체를 가리킴
  - 같은 타입이고 값도 같을 경우(원시 타입)
- **동등함( == )**
  - 두 값이 같은 객체를 가리킴
  - 같은 값을 갖도록 변환할 수 있다
    - 문자열 "33"은 숫자 33으로 변환할 수 있으므로 동등관계
  - 동등 연산자 떄문에 문제가 생기는 경우는 대게 null, undefined, 빈 문자열, 숫자 0 떄문임
- 동등 연산자를 쓰는 습관은 버리고 일치 연산자만 사용하도록 권장
  - 일치 연산자를 사용했을 때 원하는 결과가 나오지 않으면, 말썽꾸러기인 동등연산자로 바꾸지 말고 그냥 데이터 타입을 변환하면 됨

### 논리 연산자

> 자바스크립트의 논리 연산자는 불리언이 아닌 값도 다룰 수 있고, 놀랍게도 불리언이 아닌 값을 반환하기도 한다.

#### 참같은 값과 거짓같은 값

> 자바스크립트에서는 모든 데이터 타입을 참 같은 값과 거짓 같은 값으로 나눌 수 있다.

- **거짓 같은 값**
  - undefined
  - null
  - false
  - 0
  - NaN
  - ''(빈 문자열)
- **참 같은 값**
  - 거짓 같은 값 이외에는 모두 참 같은 값
  - 모든 객체, valueOf() 메서드를 호출했을떄 false를 반환하는 객체도 참 같은 값에 속함
  - 배열, 빈 배열도 참 같은 값에 속함
  - 공백만 있는 문자열(" " 등)
  - 문자열 -"false"

### 논리 연산자 (AND, OR, NOT)

> AND === 교집합, OR === 합집합, NOT === 부정

#### 단축 평가

> 두 값을 모두 평가하지 않아도 앞에 값에 따라 뒤에 값을 평가할 필요 없이 동작하는 방식을 단축 평가라 한다.

- ```js
    const skiptIt - true;
    let x = 0;
    const result = skipIt || x++;
    //단축평가가 일어나므로 부수 효과인 x의 증가 연산은 일어나지 않는다.

    const doIt = false;
    let x = 0;
    const result = doIt && x++;
    //첫번쨰 피연산자가 false이므로 이번에도 단축평가가 일어나 두번째 피연산자를 평가 하지 않는다.
    //doIt이 true면 두 피연산자를 모두 평가해야하므로 증가 연산이 일어나고 result는 false가 아니라 0 이 된다.
  ```

#### 피연산자가 불리언이 아닐 때 논리연산자가 동작하는 방법

> 불리언 피연산자를 사용하면 논리 연산자는 항상 불리언을 반환한다.<br> 피연산자가 불리언이 아니라면, **결과를 결정한 값이 반환된다**.

- 불리언이 아닌 피연산자에 대한 AND(&&)의 진위표
  - x: 거짓 같은 값, y: 거짓 같은 값, x&&y: x(거짓 같은 값)
  - x: 거짓 같은 값, y: 참 같은 값, x&&y: x(거짓 같은 값)
  - x: 참 같은 값, y: 거짓 같은 값, x&&y: y(거짓 같은 값)
  - x: 참 같은 값, y: 참 같은 값, x&&y: y(참 같은 값)
- 불리언이 아닌 피연산자에 대한 OR(||)의 진위표
- x: 거짓 같은 값, y: 거짓 같은 값, x||y: y(거짓 같은 값)
- x: 거짓 같은 값, y: 참 같은 값, x||y: y(참 같은 값)
- x: 참 같은 값, y: 거짓 같은 값, x||y: x(참 같은 값)
- x: 참 같은 값, y: 참 같은 값, x||y: x(참 같은 값)

- 논리 연산자의 이런 동작 방식을 활용하는 간편한 Tip
- ```js
  const options = suppliedOptions || { name: "Default" };
  /* 객체는 항상 참 같은 값으로 평가됨,
  따라서 suppliedOptions가 객체이면 options는 suppliedOptions를 가리키게됨
  옵션이 제공되지 않으면, 즉 suppliedOptions가 null이나 undefined라면 options는 기본값을 갖게됨
  */
  ```
- NOT은 불리언 아닌 값을 반환할 수 없으므로 ! 연산자는 피연산자의 타입이 무엇이든 항상 불리언을 반환함
  - 피연산자가 참 같은 값이면 false를, 거짓 같은 값이면 true를 반환

#### 조건 연산자(삼항연산자)

> 조건 연산자는 자바스크립트의 유일한 3항 연산자이다. (if...else문과 동등한 표현식)

- ```js
  const doIt = false;
  const result = doIt ? "Did it!" : "Didn't do it.";
  ```

#### 쉼표 연산자

> 쉼표 연산자는 표현식을 결합하여 두 표현식을 평가한 후, 두 번째 표현식의 결과를 반환한다.
> <br> 표현식을 하나 이상 실행해야 하지만 값으로 필요한 것은 마지막 표현식의 결과뿐일 때 유용

- ```js
  let x = 0,
    y = 10,
    z;
  z = (x++, y++); //쉼표 연산자는 우선순위가 가장 낮은 연산자이므로 괄호를 사용했음
  ```
- 쉼표 연산자는 for문에서 표현식을 결합할 때 사용
- 함수에 빠져나오기 전에 여러 가지 작업을 한데 묶을 때 사용함

### 연산자 그룹

> 그룹 연산자(괄호)에는 아무 효과가 없지만 연산자 우선순위를 높이거나 명확히 표현하는데 쓸 수 있다.

#### 비트 연산자

> 비트 연산자는 숫자의 비트를 직접 조작한다.

- 비트 연산자는 피연산자를 2의 보수형식으로 저장된 32비트 부호 붙은 정수로 간주한다.

#### typeof 연산자

> typeof 연산자는 피연산자의 타입을 나타내는 문자열을 반환함

- 이 연산자는 자바스크립트의 일곱 가지 데이터 타입을 정확히 나타내지 못하며 끝없는 혼란을 초래했고 계속 비판받는 ing~
- typeof는 배열과 배열 아닌 객체도 정확히 구분하지 못한다.
  - 함수(객체의 특별한 타입)는 정확히 식별함
- typeof는 연산자이므로 괄호는 필요 없다.
  - typeof(x) [X]
    - 문법적으로는 유효하지만 괄호 떄문에 불필요한 표현식이 끼어들 뿐임
  - typeof x [O]

#### void 연산자

> void 연산자가 하는 일은 하나뿐, <br>이 연산자는 피연산자를 평가한 후 undefined를 반환한다.

- 쓸모없다.

#### 할당 연산자

> 할당 연산자는 변수에 값을 할당한다.

- 상수에 값을 할당하는 것은 엄밀히 말해 선언의 일부이며 할당 연산자가 아니다
- 표현식의 좌변에 있는 것은 반드시 값을 저장할 수 있는 것이어야 한다.
- ```js
  let v, v0;
  v = v0 = 9.8; //먼저 v0가 9.8이 되고, 그 다음 v가 9.8이 된다.

  //while문의 조건에 있는 할당을 보면 먼저 n이 nums[i]의 값을 받고,
  //다음에는 표현식 전체가 그 값으로 평가되므로 숫자로 비교할 수 있다.
  const nums = [3, 5, 15, 7, 5];
  let n,
    i = 0;
  while ((n = nums[i]) < 10 && i++ < nums.length) {
    //할당연산자는 비교연산자보다 우선순위가 낮음
    console.log(`Number less than 10: ${n}.`);
  }
  ```

#### 해체 할당

> ES6에서 새로 도입됨 <br> 객체나 배열을 변수로 '해체'할 수 있다.

- 해체의 진가는 다른곳(외부 API)에서 가져온 객체나 배열에서 원하는 요소를 뽑아내야 할 때 드러난다.

#### 해체 할당(객체)

- ```js
  //객체 해체

  //객체 선언
  const obj = { b: 2, c: 3, d: 4 };
  //해체 할당
  const { a, b, c } = obj;
  a; //undefined: obj에는 "a"프로퍼티가 없다.
  b; //2
  c; //3
  d; //ReferenceError: "d"는 정의되어있지 않다.
  ```

- 객체를 해체할 때는 반드시 변수 이름과 객체의 프로퍼티 이름이 일치해야 한다.

  - 프로퍼티 이름이 유효한 식별자인 프로퍼티만 해체 후 할당됨

- ```js
    //객체 해체는 할당만으로 이뤄질수도 있지만, 그렇게 하려면 반드시 괄호를 써야함
    const obj = {b:2, c:3, d:4};
    let a, b, c;

    //에러
    {a, b, c} = obj;

    //동작
    ({a, b, c} = obj);
  ```

#### 해체 할당(배열)

> 배열을 해체 할때는 배열 요소에 대응할 변수 이름을 마음대로 쓸 수 있으며, 이들을 배열 순서대로 대응됨

- ```js
  //배열 선언
  const arr = [1, 2, 3, 4, 5];

  //배열 해체 할당
  let [x, y] = arr;
  x; //1
  y; //2
  z; //ReferenceError: "z"는 정의되지 않았습니다.

  //확산 연산자를 사용하면 남은 요소를 새 배열에 합당할 수 있다.
  let [x, y, ...rest] = arr;
  x; //1
  y; //2;
  rest; //[3, 4, 5]
  ```

- 배열 해체를 활용하면 변수의 값을 서로 바꿀 수 있다.
  - 해체를 사용하지 않으면 임시 변수가 필수적인 작업이다.
- ```js
  let a = 5,
    b = 10;
  [a, b] = [b, a];
  a; //10
  b; //5
  ```
- 배열 해체는 꼭 배열에만 사용할수 있는 것이 아니라 이터럴 객체에는 모두 사용할 수 있다.

### 객체와 배열 연산자

> 객체와 배열, 함수에는 특별한 연산자가 있다.

- . (점 연산자)
- [] (대괄호 연산자)
- in (프로퍼티 존재 연산자)
- new (객체 인스턴스화 연산자)
- instanceof (프로토타입 체인 테스트 연산자)
- ... (확산 연산자)
- delete (삭제 연산자)
