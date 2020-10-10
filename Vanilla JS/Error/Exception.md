## 예외와 에러 처리

> 예외 처리(exception handling)는 에러를 컨트롤하는 메커니즘이다.

- 에러 처리라고 하지 않고 예외 처리라고 하는 이유는 예상치 못한 상황을 대처하는 방식이기 때문
- 프로그램을 일부로 멈추려하는 게아니라면, 예외를 일으켰으면 반드시 캐치해야 한다.
  - 원인 없는 결과는 없는 법
  - 예외 처리는 예상할 수 없는 상황에 대비한 마지노선으로 생각하고, 예상할 수있는 에러는 조건문으로 처리하는 것이 최선

### Error 객체

> 자바스크립트에는 내장된 Error 객체가 있고 이 객체는 에러 처리에 간편하게 사용할 수 있다.

- SyntaxError
  - 문법 등 자바스크립트 파싱 중 에러
- TypeError
  - 사용할 수 없는 변수를 썻을 때
- ReferenceError
  - 허용되지 않은 참조 사용
- RangeError
  - 허용 숫자 범위 초과
- EvalError
  - eval()으 잘못된 활용
- URIError
  - encoderURI() 혹은 decodeURI()의 잘못된 활용
- 사용자 정의 에러

- ```js
  //Error 인스턴스를 만들면서 에러 메시지를 지정할 수 있다.
  const err = new Error("invalid email");

  //Error 인스턴스를 만드는 것만으로는 아무 일도 일어나지 않는다.
  // 이 인스턴스는 에러와 통신하는 수단이다.

  function validateEamil(email) {
    return email.match(/@/) ? email : new Error(`invalid email: ${email}`);
  }

  //이 함수를 사용할 떄는 instanceof 연산자를 써서 Error 인스턴스가 반환됐는지 확인

  const email = "jane@doe.com";

  const validateEmail = validateEmail(email);
  if (validateEmail instanceof Error) {
    console.error(`Error: ${validateEmail.message}`);
  } else {
    console.log(`Valid email: ${validateEmail}`);
  }

  //이 방법도 Error 인스턴스를 활용하는 유효하고 유용한 방법이긴 하지만, Error 인스턴스는 예외 처리에서 더 자주 사용됨
  ```

### try/catch와 예외처리

> 예외 처리는 try...catch 문을 사용한다. <br> 뭔가를 시도(try)하고, 예외가 있으면 그것을 캐치(catch)한다는 뜻이 잘드러난다.

- 예상치 못한 에러를 대처하려면 try...catch 문으로 코드 전체를 감쌀 수 있다.
- ```js
  const email = null;

  try {
    const validateEmail = validateEmail(email);
    if (validateEmail instanceof Error) {
      console.error(`Error: ${validateEmail.message}`);
    } else {
      console.log(`Valid email: ${validateEmail}`);
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }

  //에러를 캐치했으므로 프로그램은 멈추지 않는다. 에러를 기록하고 계속 진행할 수 있다.
  //실행흐름: 에러가 일어나는 즉시 catch 블록으로 이동. 즉, validateEmail을 호출한 다음에 있는 if문은 실행되지 않는다.
  //error가 일어나지 않으면 catch 블록은 실행되지 않는다.
  ```

### 에러 일으키기

> 자바스크립트가 에러를 일으키기만 기다릴 필요 없이 직접 에러를 일으켜서(throw, raise) 에외 처리 작업을 시작할 수도 있다.

- 예외 처리 기능이 있는 다른 언어와는 달리, 자바스크립트는 에러를 일으킬 때 꼭 객체만이 아니라 숫자나 문자열 등 어떤 값이든 catch 절에 넘길 수 있다.
  - 하지만 Error 인스턴스를 넘기는 것이 가장 편리함
  - 대부분의 catch 블록은 Error 인스턴스를 받을 것이라고 간주하고 만든다.
- ```js
  function billPay(amount, payee, account) {
    if (amount > account.balance) throw new Error("insufficient funds");
    account.transfer(payee, amount);
  }

  //throw를 호출하면 현재 함수는 즉시 실행을 멈춤
  // 따라서 위 예제에서는 account.transfer가 호출되지 않으므로 잔고가 부족한데도 현금을 찾아가는 사고 발생 X
  ```

### 예외 처리와 호출 스택

> 프로그램이 함수를 호출하고, 그 함수는 다른 함수를 호출하고, 호출된 함수는 또 다른 함수를 호출하는 일이 반복됨.<Br>자바스크립트 인터프리터는 이런 과정을 모두 추적하고 있어야 한다.

- **호출 스택(call stack)**
  - 함수 a가 함수 b를 호출, 함수 b는 함수 c를 호출한다면<br> 함수 c가 실행을 마칠 떄 실행 흐름은 함수 b로 돌아감<br>그리고 b가 실행을 마칠 때 실행 흐름은 함수 a로 돌아감
  - 즉, c가 실행 중일때는 a와 b는 완료될 수 없다.
  - 이렇게 완료되지 않은 함수가 쌓이는 것을 호출 스택이라 부른다.
- c에서 에러가 일어난다면 b는 c가 반환하는 값을 사용해야 할 수도 있으므로, b에서도 에러가 일어남, 따라서 a에서도 에러가 일어난다.
  - 에러는 캐치될 때까지 호출 스택을 따라 올라간다.
- 에러는 호출 스택 어디에서든 캐치할 수 있다.
  - 어디에서 이 에러를 캐치하지 않으면 자바스크립트 인터프리터는 프로그램을 멈춘다.
  - 이것을 처리하지 않은(unhandled) 예외, 캐치하지 않은(uncaught) 예외라고 부르며 프로그램이 충돌하는 원인이 됨
  - 에러가 일어날 수 있는 곳은 정말 다양하므로 가능한 에러를 모두 캐치하기는 정말 어렵다.
- 에러를 캐치하면 호출 스택에서 문제 해결에 유용한 정보를 얻을 수 있다.

  - 디버그에 유용하게 쓸수잇는 정보를 알려줌(호출 정보)

- ```js
  function a() {
    console.log("a: calling b");
    b();
    console.log("a: done");
  }
  function b() {
    console.log("b: calling c");
    c();
    console.log("b: done");
  }
  function c() {
    console.log("c: throwing error");
    throw new Error("c error");
    console.log("c: done");
  }
  function d() {
    console.log("d: calling c");
    c();
    console.log("d: done");
  }

  try {
    a();
  } catch (err) {
    console.log(err.stack);
  }

  try {
    d();
  } catch (err) {
    console.log(err.stack);
  }
  ```

### try...catch...finally

> try 블록의 코드가 HTTP 연결이나 파일 같은 일종의 '자원'을 처리할 때가 있다.
> <br>프로그램에서 이 자원을 계속 가지고 있을 수는 없으므로 에러가 있든 없든 어느 시점에서는 이 자원을 해제해야 한다.
> <br> try 블록에는 문을 원하는 만큼 쓸 수 있고, 그중 어디서든 에러가 일어나서 자원을 해제할 기회가 아예 사라질수도 있으므로 <br>try 블록에서 자원을 해제하는건 안전하지 않는다.(에러가 일어나지 않으면 실행되지 않는 catch 블록 역시 안전하지 않음)<br>이런 상황에서는 finally 블록이 필요 (에러가 일어나든 일어나지 않든 반드시 호출됨)

- ```js
  try {
    console.log("this line is executed...");
    throw new Error("whoops");
    console.log("this lin is not...");
  } catch (err) {
    console.log("there was an error...");
  } finally {
    console.log("...always executed");
    console.log("perform cleanup here");
  }
  ```
