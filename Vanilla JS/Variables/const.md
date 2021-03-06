## const (상수)
>const는 상수(변하지 않는 값)을 위해 사용한다.
- 반드시 상수만을 위해 사용하지 않는다.
- const의 특징은 let과 대부분 동일
#### 1. 선언과 초기화
> let은 재할당이 자유로우나 const는 재할당이 금지됨
- ```javascript
    const FOO = 123;
    FOO = 456; // TypeError: Assignment to constant variable
  ```
- 주의할 점은 **const는 반드시 선언과 동시에 할당이 이루어져야 한다**
    - 그렇지 않으면 문법에러가 발생
- 또한, cost는 let과 마찬가지로 블록 레벨 스코프를 갖는다.
#### 2. 상수
>상수는 가독성과 유지보수 편의를 위해 적극적으로 사용해야 한다.
- ```javascript
    // 10의 의미를 알기 어렵기에 가독성이 좋지 않음
    if (rows > 10) {
    }

    // 값의 의미를 명확히 기술하여 가독성이 향상됨
    const MAXROWS = 10;
    if (rows > MAXROWS) {
    }
  ```
    - 조건문 내의 10은 어떤 의미로 사용하였는지 파악하기 곤란한다.
    - 네이밍이 적절한 상수로 선언하면 가독성과 유지보수성이 대폭 향상된다.
- const는 객체에도 사용가능 재할당은 금지
#### 3. const와 객체
> const는 재할당이 금지된다. <br>이는 const 변수의 타입이 객체인 경우, 객체에 대한 참조를 변경하지 못한다는 것을 의미
- **객체의 프로퍼티는 보호되지 않는다.**
    - 재할당은 불가능하지만 할당된 객체의 내용(프로퍼티의 추가,삭제,프로퍼티값의 변경)은 변경 가능
    - ```javascript
        const user = { name: 'Lee' };
        // const 변수는 재할당이 금지된다.
        // user = {};

        //객체의 내용은 변경 가능
        user.name = 'Kim';
      ```
- 객체의 내용이 변경되더라도 객체 타입 변수에 할당된 주소값은 변경되지 않는다.
    - **객체 타입 변수 선언에는 const를 사용하는 것이 좋다.**

