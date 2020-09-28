## Prototype (프로토타입)
> 프로토타입 기반 프로그래밍은 객체지향 프로그래밍의 한 형태로 클래스가 없고,
><br> 클래스기반 언어에서 상속을 사용하는 것과는 다르게, 객체를 원형(프로토타입)으로 하여
><br> 복제의 과정을 통하여 객체의 동작 방식을 다시 사용할 수 있다.
><br>
><br>프로토타입기반 프로그래밍은 클래스리스(class-less), 프로토타입 지향(prototype-oriented)
><br>혹은 인스턴스 기반(instance-based) 프로그래밍이라고도 한다.

- **Prototype**
    ```js
    function Person() {}

    Person.prototype.eyes = 2;
    Person.prototype.nose = 1;

    var kim = new Person();
    var park = new Person();

    console.log(kim.eyes); // => 2
    ```
    - Person.prototype이라는 빈 Object가 어딘가에 존재하고, Person 함수로부터 생성된 객체들은<br> 어딘가에 존재하는 Obejct에 들어있는 값을 모두 갖다 쓸 수 있다.

- JavaScript의 모든객체는 자신의 부모를 가리키는 참조 링크인 __proto__가 존재한다.
- 객체의 __proto__은 부모의 prototype 객체를 바라보며, 이것이 반복(체인)되다가,<br> prototype으로 null을 가지고 있는 객체에서 끝이 난다.
### prototype 객체
> Javascript의 모든 객체는 자신의 prototype 으로 부터 constructor 프로퍼티를 상속한다.
- 객체 인스턴스가 생성되는 순간 prototype 의 constructor 생성자 메서드를 호출한다.
- 모든 JavaScript 함수는 Function prototype 객체를 참조하기 때문에<br> Function prototype 객체의 constructor을 호출하여 생성한다.
- prototype 객체는 constructor 호출과 함께 생성된다.
    ```js
    console.log( (function(){}).constructor === Function );
    //true
    
    function Fn() {}
    console.log( Fn.constructor === Function );
    //true
    console.log( Fn.__proto__.__proto__.constructor === Object );
    //true

    var newFn = new Fn()
    console.log( newFn.constructor === Function);
    //false;
    console.log( newFn.constructor === Fn);
    //true

    console.log( newFn.__proto__===Fn.prototype);
    //true
    ```
### Prototype Link 와 Prototype Object(★★★)
- JavaScript에는 **Prototype Link** 와  **Prototype Object**라는 것이 존재
- 이 둘을 통틀어 **Prototype**이라고 부른다.
- **Prototype Object**
    >객체는 언제나 함수(Function)로 생성된다.
    ```js
    function Person() {} // =>함수
    var personObject = new Person(): //함수로 객체를 생성

    ```
- personObject 객체는 Person이라는 함수로 생성된 객체이다.<br>이렇듯 언제나 객체는 함수에서 시작된다.    
- 일반적인 객체생성도 예외는 아니다.
```js
var obj = {};
    ↕
var obj = new Object():
```
- Object는 자바스크립트에서 기본적으로 제공하는 함수이다
- **Object,Function,Array 모두 함수로 정의되어있다.(★★★)**

#### **함수가 정의될 때는 2가지 일이 동시에 일어난다.(★★★)**
1. 해당 함수에 Constructor(생성자) 자격 부여
    - Constructor 자격이 부여되면 new를 통해 객체를 만들어 낼 수 있게 된다. <br>이것이 함수만 new 키워드를 사용할 수 있는 이유이다.
2. 해당 함수의 Prototype Object 생성 및 연결
    - 함수를 정의하면 함수만 생성되는 것이 아니라 Prototype Object도 같이 생성된다.

    ![Prototype](https://user-images.githubusercontent.com/60641307/81774650-0e557980-9526-11ea-9c45-a6ed7c51d669.png)

- 생성된 함수는 prototype이라는 속성을 통해 **Prototype Object**에 접근가능
**(★★★)**
- **Prototype Object**는 일반적인 객체와 같으며 기본적인 속성으로 constructor와 __proto__를 가지고 있다.
- **constructor**
    - Prototype Object와 같이 생성되었던 함수를 가리키고 있다.
- **__proto__**
    - Prototype Link이다. 
- Prototype Object는 일반적인 객체이므로 속성을 마음대로 추가/삭제 가능

### Prototype Link(★★★)
- **&#95;&#95;proto&#95;&#95;**   
    - 모든 객체가 빠짐없이 가지고 있는 속성
    - 객체가 생성될 때 조상이었던 함수의 Prototype Object를 가리킨다.

    ![PrototypeObject관계](https://user-images.githubusercontent.com/60641307/81784108-5af58080-9537-11ea-8a06-fc9fa685e24f.png)

- __proto__속성을 통해 상위 프로토타입과 연결되어 있는 형태를 프로토타입 체인(Chain)이라고 한다.

    ![prototypeChain](https://user-images.githubusercontent.com/60641307/81784853-701edf00-9538-11ea-99d0-473993e42699.png)

- 이런 프로토타입 체인 구조 때문에 모든 객체는 Object의 자식이라고 불린다.
- Object Prototype Object에 있는 모든 속성을 사용 가능하다. (ex: toString())
### prototype 프로퍼티와 __proto__ 링크의 차이
> Javascript의 객체는 prototype 프로퍼티와 숨어있는 __proto__링크 프로퍼티를 가지고 있다.
- prototype 프로퍼티는 객체의 prototype 객체를 가르킨다.
- __proto__링크는 생성자 함수의 prototype 프로퍼티가 가리키는 prototype 객체를 가르킨다.

### String, Number, Boolean 프로토타입
- 순수 원시값은 prototype이 존재하지 않는다.
    - But 원시값을 읽을 때 래퍼 타입이 생성되어, 해당 객체의 prototype을 사용할수 있다.
- 원시값을 호출시 래퍼 타입 객체를 생성하고 읽은 후에는 래퍼타입 객체를 제거한다.
- new 연산자를 이용해 참조타입으로 생성하며, 제거하지 않고 계속 유지한다.

### 프로토타입 체이닝
>Javascript 에서 객체의 프로퍼티, 메소드에 접근하려고 할때, 객체에 존재 하지 않는다면 __prototpye__ 링크를 따라 차례대로 부모 prototype 객체를 검색하며, 종료 prototype 객체까지 없을 때는 undefined를 반환한다.

- 거의 모든 객체는 Object.prototype을 상속하기 때문에, Object.prototype에 추가되어있는 메소드 사용가능

### Object.prototype
>JavaScript 에서 거의 모든 객체는 Object 인스턴스이다.
- 객체는 Object.prototype에서 속성과 메소드를 상속받는다.
- **프로토타입을 초기화 & 변경**
    - Object.create()
    - Object.setPrototypeOf()
    ```js
    var obj1 = Object.create(null);
    console.dir(obj1);

    var obj2 = {};
    console.dir(obj2);
    // Object
    // __proto__ : Object
    Object.setprototypeOf(obj2, null);
    console.dir(obj2);
    // Object
    // No properties
    ```

### Class
>ES6부터 class 문법을 지원한다.
- class 는 새로운 타입이 아니며, 그 내부는 함수이다.
- class의 prototype은 생성자 class의 prototype 객체이다.
- 생성자 prototype의 메소드를 override 하면, override한 메소드가 실행된다.
    ```js
    class Class {
        constructor() {
            this.name = 'name';
        }
        toTest() { return 'test1' }
    }
    Class.prototype.toTest = function() { return 'test2' };
    var newClass = new Class();
    
    console.log( newCalss.toTest() );
    // "test2"
    console.log( newClass.name );
    // "name"

    console.dir(Class)
    // class Class
    // arguments: (...)
    // caller: (...)
    // length: 0
    // name: "Class"
    // prototype: {constructor: f, toTest: f}
    // __proto__: f ()
    // [[FunctionLocation]]: (...)
    // [[Scopes]]: Scopes[2]
    ```

- extends로 상속받는 부모 객체는 prototype chaining 으로 메소드를 참조할수 있다.
    ```js
    class SuperClass {
        constructor() {}
        toTest() { return 'test1' }
    }
    class Class extends SuperClass {
        constructor() {
            super();
        }
    }
    var newClass = new Class();
    newClass.toTest()
    // "test1"

    console.dir(SuperClass)
    // class Class
    //  arguments: (...)
    //  caller: (...)
    //  length: 0
    //  name: "Class"
    //  prototype: Class {constructor: ƒ}
    //  [[FunctionLocation]]: (...)
    //  [[Scopes]]: Scopes[2]
    //  __proto__: class SuperClass
    //   arguments: (...)
    //   caller: (...)
    //   length: 0
    //   name: "SuperClass"
    //   prototype: {constructor: ƒ, toTest: ƒ}
    //   __proto__: ƒ ()
    //   [[FunctionLocation]]: (...)
    //   [[Scopes]]: Scopes[2]
    ```
### 객체
> 자바스크립트에서 객체를 만드는 방법은 두가지 방법이 있다. <br>1. 객체리터럴을 이용 2. 생성자를 이용


```js
var objectMadeByLiteral = {};               // 객체리터럴
var objectmadByConstrucuor = new Object();  // 생성자
//리터럴은 Object 타입의 객체를 만들어내는 일종의 숏컷
```
