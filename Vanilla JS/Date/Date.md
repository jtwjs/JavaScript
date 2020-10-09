## 날짜와 시간

- 자바스크립트의 Date 객체는 원래 넷스케이프 프로그래머 켄 스미스가 만들었는데 사실 자바의 java.util.Date를 가져온 것이나 다름없다.

- 자바스크립트의 날짜는 1970년 1월 1일 UTC로부터 몇 밀리초가 지났는지 나타내는 숫자이다.
- 날짜를 생성할 때는 타임존에 유의
- 날짜 형식을 자유롭게 바꿀수 있어야 한다면 Moment.js를 사용

#### 날짜, 타임존, 타임스탬프, 유닉스 시간

- 세계는 타임존으로 나뉜다.
  - 어디에 살든 오전 7시는 아침이고 오후 7시가 저녁인건 타임존 때문
- 타임존은 모두 UTC(Coordinated Universal Time)를 기준으로 한 시차로 나뉜다.

  - UTC는 떄때로 그리니치 표준시, 즉 GMT(Greenwich Mean Time)라고 불리기도 함

- ```js
  const d = new Date();
  console.log(d); // 2020-10-09T09:21:58.769Z
  console.log(d.valueOf()); //유닉스 타임스태프
  ```

#### Date 객체 만들기

- ```js
  new Date(); //현재 날짜

  //자바스크립트의 월은 0으로 시작한다. 즉 0은 1월, 1은 2월
  new Date(2020, 0); //2020년 1월 1일 0시
  new Date(2020, 1); //2020년 2월 1일 0시
  new Date(2020, 1, 14); //2020년 2월 14일 0시
  new Date(2020, 1, 14, 13); //2020년 2월 14일 오후 1시
  new Date(2020, 1, 14, 13, 30); //2020년 2월 14일 오후 1시 30분
  new Date(2020, 1, 14, 13, 30, 5); //2020년 2월 14일 오후 1시 30분 5초
  new Date(2020, 1, 14, 13, 30, 5, 500); //2020년 2월 14일 오후 1시 30분 5.5초

  //유닉스 타임스탬프로 날짜 생성
  new Date(0); // 12:00 A.M, Jan 1, 1970 UTC
  new Date(1000); //12:00:01 A.M Jan 1, 1970 UTC
  new Date(1463443200000); //5:00 P.M, May 16, 2016 UTC

  //유닉스 시간 원점 이전의 날짜를 구할 때
  new Date(-365 * 24 * 60 * 60 * 1000); //12:00 A.M., Jan 1, 1969 UTC

  //날짜 문자열 해석(표준시를 기준으로 한다.)
  new Date("June 14, 1903"); //12:00 A.M., Jun 14, 1903 지역 표준시
  new Date("June 14, 1903 GMT-0000"); //12:00 A.M., Jun 14, 1903 UTC
  ```

- Date 객체는 항상 내부적으로 UTC 기준으로 저장하고, 출력할 때 운영체제에서 정의한 표준시에 맞게 변환한다.

### Moment.js

> 날짜를 파싱, 벨리데이션, 포맷을 지정할 수 있는 등 쉽게 컨트롤 할 수 있는 자바스크립트 라이브러리

- Moment.js에는 타임존을 지원하는 버전과 지원하지 않는 버전 두 가지가 있다.

  - 타임존 버전은 세계의 타임존 정보를 모두 담고 있어서 꽤 양이 많음

- ```js
  //CDN을 통해 Moment.js를 불러올수있다.
  <script src="//cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.4.0/moment-timezone.min.js"></script>;

  //노드를 사용할 떄는 npm install --save moment-timezone 명령으로 Moment.js를 설치하고 require 명령으로 스크립트를 불러올수있다.
  const moment = require("moment-timezone");
  ```

### 날짜 구성요소

> Date 인스턴스의 각 구성 요소에 접근할 떄는 다음 메서드 사용

- ```js
  const d = new Date(Date.UTC(1815, 9, 10));

  d.getFullYear(); //1815
  d.getMonth(); //9 - index 0부터시작하므로 10월
  d.getDate(); //9
  d.getDay(); // 1 - 월요일
  d.getHours(); //17
  d.getMinutes(); //0
  d.getSeconds(); //0
  d.getMilliseconds(); //0

  //UTC 기준 메서드도 있다.
  d.getUTCFullYear(); //1815
  d.getUTCMonth(); // 9
  d.getUTCDate(); //10
  //...etc
  ```

### 날짜 비교

> 날짜 A와 날짜 B 중 어느 쪽이 더 앞인가 하는 단순한 날짜 비교는 JS에 내장된 비교 연산자를 통해 할수있다.

- ```js
  //Date 인스턴스는 날짜를 숫자로 저장하므로, 숫자에 쓸수있는 비교연산자를 그대로쓰면 된다.
  const d1 = new Date(1996, 2, 1);
  const d2 = new Date(2009, 4, 27);

  d1 > d2; //false
  d1 < d2; //true
  ```

### 날짜 연산

> 날짜는 숫자이므로 날짜에 날짜를 빼면 몇 밀리초가 지났는지 알 수 있다.

- ```js
  const msDiff = d2 - d1; //417740400000 ms
  const daysDiff = msDiff / 1000 / 60 / 60 / 24; //4834.96 days

  //Array.prototype.sort를 써서 날짜를 정렬할 수도 있다.

  const dates = [];

  //랜덤한 날짜 몇개 만듬
  const min = new Date(2017, 0, 1).valueOf();
  const delta = new Date(2020, 0, 1).valueOf() - min;
  for (let i = 0; i < 10; i++) dates.push(new Date(min + delta * Math.random()));

  //dates 배열은 랜덤으로 만들었으므로 뒤죽박죽
  //다음 과같이 역순으로 정렬할수있다.
  dates.sort((a, b) => b - a);

  //날짜순으로 정렬
  dates.sort((a, b) => a - b);
  ```

- ```js
  //Moment.js에는 날짜를 뺴거나 더하는데 유용한 메서드도 많이 있음
  let m = moment(); //현재
  m.add(3, "days"); //m은 이제 3일 뒤
  m.subtract(2, "years"); //m은 이제 2년 전으로부터 3일이 지난 날짜

  m = moment(); //리셋
  m.startOf("year"); //m은 이제 올해의 1월 1일
  m.endOf("month"); //m은 이제 올해의 1월 31일

  //Moment.js 는 메서드를 체인으로 연결할 수도 있다.
  let m = moment().add(10, "hours").subtract(3, "days").endOf("month");
  //m은 이제 3일전으로부터 10시간 뒤인 달의 마지막 순간
  ```

### 사용자가 알기 쉬운 상대적 날짜

> '3일 전'처럼 날짜를 상대적으로 표시하면 알기 쉬운데 Moment.js에서 쉽게 구현 가능

- ```js
  moment().subtract(10, "seconds").fromNow(); //a few seconds ago
  moment().subtract(44, "seconds").fromNow(); //a few seconds ago
  moment().subtract(45, "seconds").fromNow(); //a minutes ago
  moment().subtract(5, "minutes").fromNow(); //5 minutes ago
  moment().subtrcat(45, "minutes").fromNow(); //an hours ago
  moment().subtract(2, "hours").fromNow(); // 2 hours ago
  moment().subtract(22, "hours").fromNow(); // a day ago
  moment().subtract(300, "days").fromNow(); // 10 months ago
  moment().subtract(345, "days").fromNow(); // a year ago;

  //Moment.js에서는 적당한 시간 단위가 지나면 다른 단위를 써서 나타냄
  ```
