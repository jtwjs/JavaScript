## let
#### 1. 블록 레벨 스코프(Block-level scope)
>대부분의 프로그래밍 언어는 블록 레벨 스코프를 따르지만 자바스크립트는 함수 레벨 스코프를 따른다.
- **블록 레벨 스코프(Block-level scope)**
    - 모든 코드 블록(함수,if문,for문,try/catch문 등)내에서 선언된 변수는 코드 블록 내에서만 유호하며 코드 블록 욉웨서는 참조할수 없다.
    - 즉, 코드 블록 내부에서 선언한 변수는 지역 변수이다.
- ```javascript
    //let = 블록 레벨 스코프
    let foo = 123; // 전역변수
    {
        let foo = 456; // 지역 변수
        let bar = 456; // 지역 변수
    }
    console.log(foo); // 123
    console.log(bar); // 참조에러: not defined
  ```
#### 2. 변수 중복 선언 금지
- **let 키워드로는 동일한 이름을 갖는 변수를 중복해서 선언할 수 없다**
    - 변수를 중복 선언하면 문법 에러가 발생
#### 3. 호이스팅
>자바스크립트 ES6에서 도입된 let, const를 포함하여 모든 선언(var,let,const,function,function*,class)을 호이스팅한다.
- **호이스팅(hoisting)**
    - var선언문이나 function 선언문 등을 해당 스코프의 선두로 옮긴 것처럼 동작하는 특성을 말함
- var 키워드로 선언된 변수와 달리 let 키워드로 선언된 변수를 선언문 이전에 참조하면 참조에러 발생
    - let 키워드로 선언된 변수는 스코프의 시작에서 변수의 선언까지<br> **일시적 사각지대(Temporal Dead Zone; TDZ)**에 빠지기 때문
- ```javascript
    console.log(foo);//undefined
    var foo;

    console.log(bar); //참조에러 not defined
    let bar;
  ```
#### 변수의 호이스팅 과정 3단계
1. **선언 단계(Declaration phase)**
    - 변수를 실행 컨텍스트의 변수 객체에 등록한다.
    - 이 변수 객체는 스코프가 참조하는 대상이 된다.
2. **초기화 단계(Initialization phase)**
    - 변수 객체에 등록된 변수를 위한 공간에 메모리에 확보된다.
    - 이 단계에서 변수는 undefined로 초기화된다.
3. **할당 단계(Assignment phase)**
    - undefined로 초기화된 변수에 실제 값을 할당한다.
- **let 키워드로 선언된 변수는 선언 단계와 초기화 단계가 분리되어 진행된다.**
    - 즉, 스코프에 변수를 등록(선언단계)하지만 초기화 단계는 변수 선언문에 도달했을 때 이루어진다.
    - 초기화 이전에 변수에 접근하려고 하면 참조에러 발생
        - 변수를 위한 메모리 공간이 아직 확보되지 않은 상태
    - 따라서 스코프의 시작지점부터 초기화 시작지점까지는 변수를 참조할 수 없다.
    - ```javascript
        // 스코프의 선두에서 선언 단계가 실행됨
        // 아직 변수가 초기화(메모리 공간 확보와 undefined로 초기화)되지 않음
        // 따라서 변수 선언문 이전에 변수를 참조할수없다.
        console.log(foo); // 참조에러
        
        let foo; //변수 선언문에서 초기화 단계 실행됨
        console.log(foo); // undefined

        foo = 1; //할당문에서 할당 단계 실행됨
        console.log(foo); // 1

      ```
#### 4. 클로저
- ```javascript
    var funcs = [];

    //함수의 배열을 생성하는 for 루프의 i는 전역 변수다
    for(var i = 0; i< 3; i++) {
        funcs.push(function() { console.log(i);});
    }

    //배열에서 함수를 꺼내어 호출한다.
    for (var j = 0; j< 3; j++) {
        funcs[j]();
    }
    //결과: 3 3 3
    // var i가 전역변수이기 때문
  ```

- ```javascript
    var funcs = [];

    //함수의 배열을 생성하는 for 루프의 i는 전역 변수다
    for (var i = 0 ; i< 3; i++;) {
        (function (index) {
            funcs.push(function () {
                console.log(index);
            });;
        }(i));
    }
        //배열에서 함수를 꺼내어 호출
        for(var j = 0; j<3; j++){
            funcs[j]();
        
    }
    //함수레벨스코프로 인하여 for 루프의 초기화 식에 사용된 변수가 전역 스코프를 갖게되어 발생하는 문제를 회피하기위해 클로저를 활용
  ```
    - let 키워드를 for 루프의 초기화 식에 사용하면 클로즈를 사용하지 않아도 위코드와 동일한 동작을한다.
    - for 루프의 let i는 for loop에서만 유효한 지역 변수이다.
    - 또한 i는 자유변수로서 for 루프의 생명주기가 종료되어도 i를 참조하는 함수가 존재하는 한 계속 유지됨
#### 5. 전역 객체와 let
> 전역 객체(Global Object)는 모든 객체의 유일한 최상위 객체를 의미하며<br> 일반적으로 Browser-side에서는 window 객체, Server-side(Node.js)에서는 Global 객체를 의미한다.
- let 키워드로 선언된 변수를 전역변수로 사용하는 경우, let 전역 변수는 전역 객체의 프로퍼티가 아니다.
    - 즉, widnow.foo와 같이 접근할 수 없다.
    - let 전역 변수는 보이지 않는 개념적인 블록 내에 존재하게 된다.