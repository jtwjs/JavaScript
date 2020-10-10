## Math 객체

> 수학 함수를 담고 있는 객체

### 숫자 형식

- 자바스크립트의 숫자 형식 메서드는 모두 숫자가 아니라 문자열을 반환한다.
  - 해당 형식에 필요한 각종 기호를 온전히 표현하려면 반드시 문자열이어야 하기 때문
  - 따라서 숫자 형식을 바꾸는 건 실제로 표시하기 직전에 해야 한다.
- 숫자를 저장하거나 계산할때는 따로 형식을 지정하지 않은 숫자 타입이어야 한다.

#### 고정 소수점

> 소수점 뒤 자릿수를 지정하는 형식을 원한다면 `toFixed()`를 사용

- ```js
  const x = 19.51;
  x.toFixed(3); // "19.510"
  x.toFixed(2); // "19.51"
  x.tooFixed(1); // "19.5"
  x.toFixed(0); // "20" (반올림)
  ```

#### 지수 표기법

> 지수 표기법이 필요할 때는 `toExponential()`을 사용

- ```js
  const x = 3800.5;
  x.toExponential(4); // "3.8005e+3";
  x.toExponential(3); // "3.801e+3";
  x.toExponential(2); // "3.80e+3";
  x.toExponential(1); // "3.8e+3";
  x.toExponential(0); // "4se+3";
  // toFixed()와 마찬가지로 반올림한 결과가 출력됨
  // 매개변수로 넘긴 정밀도에 따라 소수점뒤에 숫자가 몇개 나타날지 정해짐
  ```

#### 고정 전체 자리수

> 소수점이 어디 나타나든 관계없이 몇 개로 표현하는가 중요한 `toPrecision()`을 사용

- ```js
  let x = 1000;
  x.toPrecision(5); //"1000.0"
  x.toPrecision(3); //"1.00e+3"
  x.toPrecision(1); //"1e+3"

  x = 15.335;
  x.toPrecision(6; // "15.3350"
  x.toPrecision(4); // "15.34"
  x.toPrecision(2); // "15"
  x.toPrecision(1); // "2e+1"
  ```

#### 다른 진수

> 2진수 8진수, 16진수 표현을 원한다면 `toString()`에 기수를 매개변수로 쓰면 됨

- ```js
  const x = 12;
  x.toString(); // "12" (10진수)
  x.toString(16); // "c" (16진수)
  x.toString(8); // "14" (8진수)
  x.toString(2); // "1100" (2진수)
  ```

#### 고급 숫자 형식

> 다양한 형식으로 숫자를 표시해야 한다면 자바스크립트 내장 메서드로는 곧 한계에 부딪힘

- 주로 필요한 경우
  - 수천 자리의 아주 큰숫자
  - 괄호를 쓰는 등, 음수 표현을 다르게 해야 하는 경우
  - 공학 표기법
  - mill-, micro-, kilo-, mega- 등의 SI 접두사가 필요한 경우
- Numeral.js(http://numeraljs.com/) 라이브러리를 권함

### 상수

> Math 객체에는 몇가지 중요한 상수가 프로퍼티로 내장돼 있다.

- ```js
  //기본적인 상수
  Math.E; //자연로그의 밑수: 2.718
  Math.PI; //원주율: 3.142

  //로그 관련 상수
  Math.LN2; //2의 자연로그
  Math.LN10; //10의 자연로그

  //대수 관련 상수
  Math.SQRT1_2; // 1/2의 제곱근: 0.717
  Math.SQRT2; // 2의 제곱근: 1.414
  ```

### 대수 함수

- 거듭제곱
  - 제곱 관련 기본 함수는 Math.pow이며 제곱근, 세제곱근, e의 거듭제곱 등 자주 쓰이는 연산에는 간편함수가 있다.
- 로그함수
  - 자연로그 함수는 Math.log

#### 기타 함수

- Math.abs(x)
  - x의 절대값
- Math.sign(x)
  - x의 부호, x가 음수면 -1, 양수면 1, 0이면 0
- Math.ceil(x)
  - x의 올림
- Math.floor(x)
  - x의 내림
- Math.trunc(x)
  - x의 버림
  - 소수점 아래 부분을 모두 제거하고 정수만 남긴 수
- Math.round(x)
  - x의 반올림
- Math.min(x1, x2, ...)
  - 매개변수 중 최소값
- Math.max(x1, x2, ...)
  - 매개변수 중 최대값

#### 의사 난수 생성

- JS에서 의사 난수를 생성할 때는 `Math.random()`을 사용
  - 0 이상 1 미만의 숫자를 반환
- ```js
  //다른 범위의 난수가 필요할 때 널리쓰이는 공식
  Math.random(); //0 이상 1 미만
  x + (y - x) * Math.random(); //x이상 y미만
  m + Math.floor((n - m) * Math.random()); //m이상 n 미만의 정수
  m + Math.floor((n - m + 1) * Math.random()); //m이상 n이하의 정수
  ```

### 삼각함수

> 자바스크립트의 삼각함수는 모두 라디안 값을 기준으로 한다.

- Math.sin(x)
  - x의 사인
- Math.cos(x)
  - x의 코사인
- Math.tan(x)
  - x의 탄젠트
- Math.asin(x)
  - x의 아크사인
- Math.acos(x)
  - x의 아크코사인
- Math.atan(x)
  - x의 아크탄젠트
- Math.atan2(y, x);

  - x 축에서 점(x,y)까지의 시계 반대방향 각도를 라디안으로 나타낸 값

- 매개변수에 각도를 쓸 수 없으므로 라디안 값으로 바꿔야 한다.
  - 180으로 나누고 PI를 곱하면 된다.
  - `function deg2rad(d) { return d/180\*Math.PI;}`
  - `function rad2deg(r) { return r/Math.PI\*180;}
