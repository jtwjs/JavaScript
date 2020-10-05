## 객체지향 프로그래밍

> 객체 지향 프로그래밍(OOP)은 컴퓨터 과학에서 전통적인 패러다임이다
> <br>객체지향 프로그래밍을 사용하다 보면 자연스레 관리하고, 디버그하고, 수정하기 쉬운 정리되고 캡슐화된 코드를 작성하게 된다.<br>자바스크립트의 OOP 구현은 비판을 자주받는 편이고, 개중에는 객체지향 언어의 기준조차 만족하지 못한다고 혹평하는 사람도 있다.(보통 데이터 접근제어가 불가능하다는 점에 집중됨)<br>일단 익숙해지면 JS의 OOP는 사실 매우 유연하고 강력하다.

- 객체는 데이터와 기능을 논리적으로 묶어놓은 것
  - ex:) 객체 === 자동차
    - 데이터 === 제조사 ,모델, 도어 숫자, 차량번호 등
    - 기능 === 가속, 변속, 문 열기, 헤드라이트 켜기 등등 (메서드)

### 클래스와 인스턴스 생성

> ES6에서 클래스를 만드는 간편한 새 문법을 도입했다.

- ```js
  class Car {
    constructor(make, model) {
      this.make = make;
      this.model = model;
      this._userGears = ["P", "N", "R", "D"]; // 외부에서 접근하면 안되는 프로퍼티 이름 앞에 붙이는, 소위 `가짜 접근 제한`

      this._userGear = this._userGears[0];
    }

    get UserGear() {
      return this._userGear;
    }
    set userGear(value) {
      if (this._userGears.indexOf(value) < 0) {
        throw new Error(`Invalid gear: ${value}`);
        this._userGear = value;
      }
    }

    shift(gear) {
      this.userGear = gear;
    }
  }

  //인스턴스를 만들때는 new를 이용
  const car1 = new Car("Tesla", "Model S");
  const car2 = new Car("Mazda", "3i");
  car1.shift("D"); //this는 car1에 묶임
  car2.shift("R"); //this는 car2에 묶임
  ```

- **instanaceof 연산자**
  - 객체가 클래스의 인스턴스인지 확인
- ```js
  car1 instanceof Car; //true
  car1 instanceof Array; //false
  ```

- **가짜 접근 제한**
  - 외부에서 접근하면 안되는 프로퍼티 이름 앞에 밑줄을 붙임
  - 진정한 제한이라기보다는 밑줄이 붙은 프로퍼티에 접근하려는건 실수로 인지하고 빨리 찾을수 있도록 하는 방편이다.
  - 프로퍼티를 꼭 보호해야 한다면 스코프를 이용해 보호하는 WeakMap 인스턴스를 사용
- ```js
  const Car = (function () {
    //즉시 호출하는 함수 표현식을 써서 WeakMap을 클로저로 감쌈
    const carProps = new WeakMap();
    //WeakMap은 클래스 외부에서 접근하면 안되는 프로퍼티를 안전하게 저장함

    class Car {
      constructor(make, model) {
        this.make = make;
        this.model = model;
        this._userGears = ["P", "N", "R", "D"];
        carProps.set(this, { userGear: this._userGears[0] });
      }
      get userGear() {
        return carProps.get(this).userGear;
      }
      set userGear(value) {
        if (this._userGears.indexOf(value) < 0) throw new Error(`Invalid gear: ${value}`);
        carProps.get(this).userGear = value;
      }

      shift(gear) {
        this.userGear = gear;
      }
    }

    return Car;
  })();

  //
  ```

### 클래스는 함수다

> ES6에서 class 키워드를 도입하기 전까지, 클래스를 만든다는 것은 곧 클래스 생성자로 사용할 함수를 만든다는 의미였다.
> <br>class 문법이 훨씬 더 직관적이고 단순하긴 하지만, 사실 class는 단축 문법일 뿐이며 자바스크립트의 클래스 자체가 바뀐 것은 아니다

- 클래스는 사실 함수일 뿐이다.

- ```js
  //ES5에서의 클래스 작성
  function Car(make, model) {
    this.make = make;
    this.model = model;
    this._userGears = ["P", "N", "R", "D"];
    this._userGear = this.userGears[0];
  }

  //ES6
  class Es6Car {}; //생성자는 의도적으로 생략
  function Es5Car {}
  typeof Es6Car //"function"
  typeof Es5Car //"function"

  //ES6에서 클래스가 바뀐것은 아니다, 단지 간편한 새 문법이 생긴것
  ```

### 프로토타입

> 클래스의 인스턴스에서 사용할 수 있는 메서드라고 하면 그건 프로토타입 메서드를 말하는 것

- 프로토타입 메서드는 ex:) `Car.prototype.shift`처럼 표기할때가 많다.

  - Array의 forEach를 Array.prototype.forEach라고 쓰는것과 마찬가지

> 최근에는 프로토타입 메서드를 #으로 표시하나는 표기법이 널리 쓰인다.
> <br> ex:) Car.prototype.shift를 Car#shift로 쓰는 것

- 모든 함수에는 prototype이라는 특별한 프로퍼티가 있다.
  - 일반적인 함수에는 프로토타입을 사용할 일이 없지만, 객체 생성자로 동작하는 함수에서는 프로토타입이 대단히 중요하다

> 객체 생성자, 즉 클래스는 Car처럼 항상 첫글자를 대문자로 표기한다.

- 함수의 prototype 프로퍼티가 중요해지는 시점은 new 키워드로 새 인스턴스를 만들었을 때 이다.
  - new 키워드로 만든 새 객체는 생성자의 prototype 프로퍼티에 접근할 수 있다.
  - 객체 인스턴스는 생성자의 prototype 프로퍼티를 `__proto__` 프로퍼티에 저장한다.

> `__proto__` 프로퍼티는 자바스크립트의 내부 동작 방식에 영향을 미친다. <br> 밑줄 두 개로 둘러싼 프로퍼티는 모두 그렇다.<br>이런 프로퍼티를 수정하는 것은 정말로 위험하다. (살펴보기만 하고 손대지는 말자)

- 프로토타입에서 중요한 것은 동적 디스패치라는 매커니즘이다.
  - 디스패치는 메서드 호출과 같은 의미
- 객체의 프로퍼티나 메서드에 접근하려 할 때 그런 프로퍼티나 메서드가 존재하지 않으면 자바스크립트는 객체의 프로토타입에서 해당 프로퍼티나 메서드를 찾는다.
- 클래스의 인스턴스는 모두 같은 프로토타입을 공유하므로 프로토타입에 프로퍼티나 메서드가 있다면 해당 클래스의 인스턴스는 모두 그 프로퍼티나 메서드에 접근할 수 있다.

- **Tip**
  - 클래스의 프로토타입에서 데이터 프로퍼티를 수정하는 것은 일반적으로 권장X
  - 모든 인스턴스가 그 프로퍼티의 값을 공유하기는 하지만, 인스턴스 중 하나에 그런 이름의 프로퍼티가 있다면 해당 인스턴스는 프로토타입에 있는 값이 아니라 인스턴스에 있는 값을 사용한다.
    - 이는 혼란과 버그를 초래할 수 있다.
  - 인스턴스에 초깃값이 필요하다면 생성자에서 만드는 편이 낫다.
- 인스턴스에서 메서드나 프로퍼티를 정의하면 프로토타입에 있는 것을 가리는 효과가 있다.

  - 자바스크립트는 먼저 인스턴스를 체크하고 거기에 없으면 프로토타입을 체크하기 때문

- ```js
  const car1 = new Car();
  const car2 = new Car();
  car1.shift === Car.prototype.shift; //true
  car1.shift("D");
  car1.shift("d"); //Error
  car1.userGear; //'D'

  car1.shift = function (gear) {
    this.userGear = gear.toUpperCase();
  };
  car1.shift === Car.prototype.shift; //false;
  car1.shift === car2.shift; //false;
  car1.shift("d");
  car.userGear; // 'D'
  ```

### 정적 메서드

> 메서드에는 인스턴스 메서드 외에도 정적 메서드(클래스 메서드)가 있다.
> <br> 이 메서드는 특정 인스턴스에 적용되지 않는다.

- 정적 메서드에서 this는 인스턴스가 아니라 클래스 자체에 묶인다.
  - 하지만 일반적으로 정적 메서드에는 this 대신 클래스 이름을 사용하는 것이 좋은 습관!
- 정적 메서드는 클래스에 관련되지만 인스턴스와 관련이 없는 범용적인 작업에 사용됨

  - 여러 인스턴스를 대상으로 하는 작업에도 종종 쓰임

- ```js
  class Car {
    static getNextVin() {
      return Car.nextVin++; /* this.nextVin++ 라고 써도 되지만
      Car를 앞에 쓰면 정적 메서드라는 점을 상기하기 쉽다.*/
    }
    constructor(make, model) {
      this.make = make;
      this.model = model;
      this.vin = Car.getNextVin();
    }
    static areSimilar(car1, car2) {
      return car1.make === car2.maek && car1.model === car2.model;
    }
    static areSame(car1, car2) {
      return car1.vin === car2.vin;
    }
  }
  Car.nextVin = 0;

  const car1 = new Car("Tesla", "S");
  const car2 = new Car("mazda", "3");
  const car3 = new Car("Mazda", "3");

  car1.vin; //0
  car2.vin; //1
  car3.vin; //2

  Car.areSimilar(car1, car2); //false
  Car.areSimilar(car2, car3); //true
  Car.areSame(car2, car3); //false
  Car.areSame(car2, car2); // true
  ```

### 상속

> 클래스의 인스턴스는 클래스의 기능을 모두 상속한다.

- 상속은 한 단계로 끝나지 않는다.
  - 객체의 프로토타입에서 메서드를 찾지 못하면 자바스크립트는 프로토타입의 프로토타입을 검색한다. (프로토타입 체인)
  - 조건에 맞는 프로토타입을 찾을 때까지 프로토타입 체인을 계속 거슬러 올라간다.
  - 조건에 맞는 프로토타입을 찾지 못하면 에러를 일으킴
- ```js
  class Vehicle {
    constructor() {
      this.passengers = [];
      console.log("Vehicle created");
    }
    addPassenger(p) {
      this.passengers.push(p);
    }
  }

  class Car extends Vehicle {
    //extends 키워드는 Car를 Vehicle의 서브클래스로 만든다.
    consturctor() {
      super();
      //super()는 슈퍼클래스의 생성자를 호출하는 특별한 함수
      //서브클래스에서는 이 함수를 반드시 호출해야함 아님 에러남
      console.log("Car created");
    }
    deployAirbags() {
      console.log("BWOOSH!");
    }
  }

  const v = new Vehicle();
  v.addPassenger("Frank");
  v.addPassenger("Judy");
  v.passengers; // ["Frank", "Judy"]
  const c = new Car();
  c.addPassenger("Alice");
  c.addPassenger("Cameron");
  c.passengers; // ["Alice", "Cameron"]
  v.deployAirbages(); //Error
  c.deployAirbages(); // "BWOOSH!"

  //상속은 단방향.
  // Car클래스의 인스턴스는 Vehicle 클래스의 모든 메서드에 접근할수 있지만 반대는 불가능
  ```

### 다형성

> 객체지향 언어에서 여러 슈퍼클래스의 멤버 인스턴스를 가리키는 말

- JS에서는 객체가 클래스의 인스턴스인지 확인하는 instanceof 연산자가 있다.

  - 이 연산자를 속일 수 도 있지만, prototype과 `__proto__` 프로퍼티에 손대지 않았다면 정확한 결과를 기대할수 있다.

- ```js
  class Motocycle extends Vehicle {}
  const c = new Car();
  const m = new Motorcycle();
  c instanceof Car; //true
  c instanceof Vehicle; //true
  m instanceof Car; //false;
  m instanceof Motorcycle; //true
  m instanceof Vehicle; //true
  ```

- 자바스크립트의 모든 객체는 루트 클래스인 Object의 인스턴스이다.

  - 즉, 객체 o에서 o instanceof Object는 항상 true
  - 모든 객체가 Object의 인스턴스인 것은 toString 같은 중요한 메서드를 상속하기 위해서이며, 염두에 둘 만큼 중요한 영향은 없다.

### hasOwnProperty()

> 객체 obj와 프로퍼티 x에서, obj.hasOwnProperty(x)는 obj에 프로퍼티 x가 있다면 true를 반환하며, 프로퍼티 x가 obj에 정의되지 않았거나 프로토타입 체인에만 정의되었다면 false를 반환

- ES6 설계 의도대로 사용한다면 데이터 프로퍼티는 항상 프로토타입 체인이아니라 인스턴스에 정의해야 한다.
  - 하지만 프로퍼티를 프로토타입에 정의하지 못하도록 강제하는 장치는 없으므로 항상 hasOwnProperty를 사용하는 편이 좋다.
- ```js
  class Super {
    constructor() {
      this.name = "super";
      this.isSuper = true;
    }
  }

  //유효하지만, 권장X
  Super.prototype.sneaky = "not recommended!";

  class Sub extends Super {
    constructor() {
      super();
      this.name = "Sub";
      this.isSub = true;
    }
  }

  const obj = new Sub();

  for (let p in obj) {
    console.log(`${p}: ${obj[p]}` + (obj.hasOwnProperty(p) ? "" : "(inherited)"));
  }

  /*
  name: Sub
  isSuper: true
  isSub: true
  sneaky: not recommended! (inherited)
  */
  ```

- name, isSuper, isSub 프로퍼티는 모두 프로토타입 체인이 아니라 인스턴스에 정의됐다.
  - 슈퍼클래스 생성자에서 선언한 프로퍼티는 서브클래스 인스턴스에도 정의됨
  - 반면 sneaky 프로퍼티는 슈퍼클래스의 프로토타입에 직접 정의했다.
  - Object.keys를 사용하면 프로토타입 체인에 정의된 프로퍼티를 나열하는 문제를 피할수 있다.

### 문자열 표현

> 모든 객체는 Object를 상속하므로 Object의 메서드는 기본적으로 모든 객체에서 사용할 수 있다.
> <br> 객체의 기본적인 문자열 표현을 제공하는 toString도 그런 메서드 중 하나
> <br> toString 메서드에서 객체의 관한 중요한 정보를 제공한다면 디버깅에도 유용하고, 객체를 한눈에 파악 가능

- ```js
  class Car {
    toString() {
      return `${this.maek} ${this.model}: ${this.vin}`;
    }
  }
  //이제 Car의 인스턴스에서 toString을 호출하면 객체 식별에 필요한 정보를 얻을 수 있다.
  ```

### 다중 상속, 믹스인 인터페이스

> 다중 상속에는 충돌의 위험이 있다.
> <br> JS가 다중 상속이 필요한 문제에 대한 해답으로 내놓은 개념이 믹스인(mixin)이다.

- 믹스인(mixin)

  - 기능을 필요한 만큼 섞어 놓은것

- ```js
  class InsurancePolicy {}
  function makeInsurable(o) {
    o.addInsurancePolicy = function (p) {
      this.insurancePolicy = p;
    };
    o.getInsurancePolicy = function () {
      return this.insurancePolicy;
    };
    o.isInsured = function () {
      return !!this.insurancePolicy;
    };
  }

  makeInsurable(Car);
  const car1 = new Car();
  car1.addInsurancePolicy(new InsurancePolicy()); //Error
  ```

- ```js
  const car1 = new Car();
  // 보험에 가입하는 것은 개별 자동차
  makeInsurable(car1);
  car1.addInsurancePolicy(new InsurancePolicy()); // works
  // 이 방법은 동작하지만, 모든 자동차에서 makeInsurable을 호출해야함
  // Car 생성자에 추가할수도 있지만, 그렇게 하면 이 기능은 모든 자동차에 복사하는 형국이된다.

  makeInsurable(Car.prototype);
  const car1 = new Car();
  car1.addInsurancePolicy(new InsurancePolicy()); //works
  // 보험 관련 메서드들은 모두 Car 클래스에 정의된 것처럼 동작함
  ```

- ```js
  //보험 클래스에 키를 모두 심볼로 사용하면 충돌을 피할수 있음
  class InsurancePolicy {}
  const ADD_POLICY = Symbol();
  const GET_POLICY = Symbol();
  const IS_INSURED = Symbol();
  const _POLICY = Symbol();
  function makeInsurable(o) {
    o[ADD_POLICY] = function (p) {
      this[_POLICY] = p;
    };
    o[GET_POLICY] = function () {
      return this[_POLICY];
    };
    o[IS_INSURED] = function () {
      return !!this[_POLICY];
    };
  }
  //심볼은 항상 고유하므로 믹스인이 Car 클래스의 기능과 충돌할 가능성은 없다.
  // 메서드 이름에는 일반적인 문자열을 쓰고 데이터 프로퍼티에는 _POLICY 같은 심볼을 쓰는 절충안을 생각할 수 있다.
  ```
