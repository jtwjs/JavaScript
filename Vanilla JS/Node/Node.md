## 노드

> 2009년까지 자바스크립트는 거의 브라우저 스크립트 언어로만 쓰여왔다.
> <br> 2009년, 조이언트 사에 근무하던 개발자 라이언 달은 자바스크립트를 서버에서 사용할 목적으로 노드를 만들었다.

- 서버에서 자바스크립트를 쓸 수 있게 된 것의 의미

  - 사고방식을 바꿀필요 없이 일관된 언어를 쓸 수 있다는 의미
  - 다른 전문가에게 의존할 필요가 줄어든다는 의미
  - 서버와 클라이언트에서 같은 코드를 쓸 수 있다는 의미

- 노드는 원래 웹 애플리케이션 개발을 목적으로 만들어졌지만, 서버에서 쓰이게 되면서 데스크톱 애플리케이션 개발이나 시스템 스크립트 영역으로도 확장됐다.

### 노드의 기초

- 노드에는 DOM이 없다.
- 브라우저 기반 자바스크립트는 브라우저에만 해당하는 API를 사용한다.
  - 노드에만 해당되고 브라우저에는 존재하지 않는 API도 있다.
- 운영체제와 파일시스템 지원 같은 일부 기능은 보안상의 이유로 브라우저에는 사용할 수 없다.
- window와 document는 브라우저 환경에서 제공하는 API이다.

### 모듈

> 모듈은 패키지를 만들고 코드를 네임스페이스로 구분하는 메커니즘이다.

- 네임스페이스: 이름 충돌을 방지하는 방법
- ```js
    //amanda.js
    function calculate(a, x n) {
        if(x === 1) return a*n;
        return a*(1 - Math.pow(x,n))/(1 - x);
    }

    module.exports = calculate;

    //tyler.js
    function calculate(r) {
        return 4/3*Math.PI*Math.pow(r,3);
    }

    module.exports = calculate;
    //module은 노드에서 모듈을 구현하기 위해 만든 특별한 객체이다.

    //app.js
    const amanda_calculate = require('./amanda.js');
    const tyler_calculate = require('./tyler.js');

    console.log(amanda_caclulate(1,2,5)); //31
    console.log(tyler_calculate(2)); //33.51231212
    //같은 이름의 함수를 썻지만 무슨이름을 쓰던 상관없다. 이들은 그저 변수일뿐
    // 각 변수가 할당되는 값은 노드가 require 함수를 호출한 결과이다.
  ```

- 모듈은 어떤 타입의 값이든 내보낼 수 있다.

  - 보통은 모듈 하나에 여러 함수를 저장하고, 그 함수를 메서드로 포함하는 객체를 내보내는 것이 일반적

- ```js
  //amanda.js
  module.exports = {
    geometricSum(a, x, n) {
      if (x === 1) return a * n;
      return (a * (1 - Math.pow(x, n))) / (1 - x);
    },
    arithmeticSum(n) {
      return ((n + 1) * n) / 2;
    },
    quadraticFormula(a, b, c) {
      const D = Math.sqrt(b * b - 4 * a * c);
      return [(-b + D) / (2 * a), (-b - D) / (2 * a)];
    },
  };

  //app.js
  const amanda = require("./amanda.js");
  console.log(amanda.geometricSum(1, 2, 5));
  console.log(amanda.quadraticFormula(1, 2, -15));
  ```

- 모듈은 단순히 일반적인 객체를 내보낼 뿐이고, 그 객체에 함수 프로퍼티가 있을 뿐이다.
- ```js
  //특별한 변수 exports를 사용하는 단축문법
  exports.geomtricSum = function (a, x, n) {
    if (x === 1) return a * n;
    return (a * (1 - Math.pow(x, n))) / (1 - x);
  };

  //exports를 사용한 단축문법은 객체를 내보낼 때만 쓸 수 있다.
  //함수나 기타 다른값을 내보낼 때는 module.exports를 써야한다.
  //또한 두 문법을 섞어 쓸수도 없다. (모듈 하나에 한가지문법)
  ```

### 코어 모듈, 파일 모듈, npm 모듈

> 모듈은 코어, 파일, npm 모듈 세가지로 나뉜다.

- 코어 모듈
  - fs나 os처럼 노드자 체에서 제공하는 모듈
  - 이들은 모두 예약어
- 파일 모듈
  - moudle.exports에 할당되는 파일
- npm 모듈
  - 특별한 디렉터리 node.exports에 저장되는 모듈 파일
- require함수를 사용하면 노드는 함수의 매개변수를 보고 어떤 타입인지 판단한다.
  - 코어: /../.../ 등으로 시작하지 않는다.
  - 파일: /../.../ 등으로 시작한다.
  - npm: 코어 모듈이 아니며 /../.../로 시작하지도 않는다.

### 함수 모듈을 통한 모듈 커스텀마이징

> 모듈은 대부분 객체를 내보내지만, 이따금 함수 하나만 내보낼 때도 있다. <br>함수 하나만 내보낼 경우는 그 모듈의 함수를 즉시 호출하려는 의도로 만들 때가 대부분
> <br>이런 경우 사용하려는 것은 그 함수가 아니라 함수의 반환값이다.
> <br>모듈이 내보내는 함수가아니라 그 함수가 반환하는 것을 쓰게하는 이런 패턴은 모듈을 일부 커스터마이즈 하거나, 주변 컨텍스트에서 정보를 얻어야 할 때 주로 사용한다.

- ```js
  //npm 패키지의 debug 모듈

  //main이란 문자열을 사용하도록 debug모듈을 커스터마이즈 한것
  const debug = require("debug")("main"); //모듈이 반환하는 함수를 즉시 호출할 수 있다.
  debug("starting"); // 디버그가 활성화되어 있으면 main starting +0ms"라는 로그를 남김
  ```

- 노드는 노드 앱을 실행할 때 어떤 모듈이든 단 한번만 임포트한다.
  - dbug 모듈을 두 번 임포트하더라도, 노드는 해당 모듈을 이미 임포트했음을 인식하고 다시 임포트하지는 않는다.

### 파일시스템 접근

> 자바스크립트는 노드가 만들어지기 전까지는 파일시스템에 접근할 수 없는 외톨이였다.!!

- fs 모듈을 사용
- 파일 관련 함수에는 모두 동기적으로 작업하는 짝이 있으며, 이들의 이름은 Sync로 끝난다.
  - 웹 서버나 네트워크 애플리케이션에서 노드의 성능은 비동기적 실행에서 나온다.
  - 웹 서버나 네트워크 애플리케이션을 만들 떄는 항상 비동기적 함수를 써야 한다.

### process

> 실행중인 노드 프로그램은 모두 process 변수에 접근할 수 있다.
> <br> 이 변수는 해당 프로그램에 관한 정보를 담고 있으며 실행 자체를 컨트롤할 수 도 있다.

### 운영체제

> os 모듈은 프로그램을 실행하는 컴퓨터의 운영체제에 관한 정보를 제공한다.

### 자식 프로세스

> child_process 모듈은 애플리케이션에서 다른 프로그램을 실행할 떄 사용함
> <br> 실행할 프로그램은 다른 노드 프로그램, 실행 파일, 다른 언어로 만든 스크립트여도 상관없다.

- child_process 모듈에서 제공하는 주요 함수는 exec, execFile, fork이다.
  - fs와 마찬가지로 이들 함수에는 동기적 버전 execSync, execFileSync, forkSync가 있다.
  - exec와 execFile은 운영체제에서 지원하는 실행 파일은 무엇이든 실행 가능

### 스트림

> 스트림은 노드에서 중요한 개념이다.
> <br> 스트림은 스트림 형태의 데이터를 다루는 객체이다.

- 스트림에는 읽기 스트림, 쓰기 스트림, 이중 스트림이 있다.
- 스트림의 예로 사용자의 타이핑, 클라이언트와 통신하는 웹 서비스 등을 들수있음

### 웹 서버

> 노드는 현재 다양한 애플리케이션에 사용되지만, 원래 목적은 웹 서버를 만드는 것이었다.

- ```js
  //http모듈에는 기본적인 웹 서버를 만드는 createServer 메서드가 있다.
  const http = require("http");

  const server = http.createServer(function (req, res) {
    console.log(`${req.method} ${req.url}`);
    res.end("Hello World!");
  });

  const port = 8080;
  server.listen(port, function () {
    //서버가 시작됐을 때 호출될 콜백을 넘길 수 있다.
    console.log(`server started on port ${port}`);
  });
  ```

- 노드 웹서버의 핵심은 들어오는 요청에 모두 응답하는 콜백함수이다.
  - 이 함수는 매개변수로 IncomingMeesage 객체(req)와 ServerRequest 객체(res)를 받는다.
- IncomingMessage 객체에는 요청받은 URL, 보낸 헤더, 바디에 들어왔던 데이터 등 HTTP 요청에 관한 모든 정보가 들어있다.
- ServerResponse 객체에는 클라이언트(보통 브라우저)에 보낼 응답을 컨트롤하는 프로퍼티와 메서드가 들어있다.
