## Class

> Class는 객체를 생성하기 위한 템플릿이다. <br>클래스는 데이터와 이를 조작하는 코드를 하나로 추상화한다.
> <br> JS에서의 클래스는 프로토타입을 이용해서 만들어졌지만 ES5의 클래스 의미와는 다른 문법과 의미를 가진다.

### Class 정의

> Class는 사실 함수<br>
> 함수를 함수 표현식과 함수 선언으로 정의할 수 있듯이 class 문법도 class 표현식과 class 선언 두가지 방법을 제공함

- ```javascript
  class 클래스이름 {
    constructor 메서드  //초기화하는 부분 (상태[변수]) 생략가능
    //메서드 부분 (동작[메소드])
  }
  ```

#### 클래스를 정의하는 방법 1.Class 선언

> class를 선언하기 위해서는 클래스의 이름과 함꼐 class 키워드를 사용해야함

- ```js
  class Rectangle {
    constructor(height, width) {
      this.height = height;
      this.width = width;
    }
  }
  ```
- **Hoisting**
  - 함수 선언과 클래스 선언의 중요한 차이점은 함수 선언의 경우 호잇으팅이 일어나지만 클래스 선언은 그렇지 않다.
  - 클래스를 사용하기 위해서는 클래스를 먼저 선언해야 하며, 그렇지 않으면 ReferenceError 에러를 던짐

#### 클래스를 정의하는 방법 2.Class 표현식

> Class 표현식은 이름을 가질 수도 있고, 갖지 않을수도 있다.<br>이름을 가진 class 표현식의 이름은 클래스의 body에 대한 local scope에 한해 유효

- ```js
  //unnamed
  let Rectangle = class {
    constructor(height, width) {
      this.height = height;
      this.width = width;
    }
  };
  console.log(Rectangle.name);
  //output: "Rectangle"

  //named
  let Rectangle = class Rectangle2 {
    constructor(height, width) {
      this.height = height;
      this.width = width;
    }
  };
  console.log(Rectangle.name);
  //output: "Rectangle2"
  ```

### Class body와 method 정의

> Class body는 중괄호 {} 로 묶여있는 안쪽 부분
> <br> 이곳은 method 이나 constructor와 같은 class members를 정의할 곳

#### Constructor(생성자)

> `constructor` 메소드는 `class`로 생성하고 초기화하기 위한 특수한 메소드이다.

- "constructor"라는 이름을 가진 특수한 메소드는 클래스 안에 한 개만 존재 할 수 있다.
  - 만약 클래스에 여러개의 `constructor` 메소드가 존재하면 `SyntaxError`가 발생
    - constructor는 부모 클래스의 constructor를 호출하기 위해 `super` 키워드를 사용 가능

#### Static methods

> `static` 키워드는 클래스를 위한 정적(static) 메소드를 정의함

- 정적 메소드는 클래스의 인스턴스화없이 호출됨
  - 클래스의 인스턴스에서는 호출할 수 없다.
- 정적메소드는 어플리케이션을 위한 유틸리티 함수를 생성하는데 주로 사용됨

### **extends**를 통한 클래스 상속

> `extends` 키워드는 클래스 선언이나. 클래스 표현식에서 다른 클래스의 자식 클래스를 생성하기 위해사용됨

- ```js
  class Animal {
    constructor(name) {
      this.name = name;
    }

    speak() {
      console.log(`${this.name} make a noise`);
    }
  }

  class Dog extends Animal {
    constructor(name) {
      super(name); //name을 파라미터로 부모 클래스의 생성자를 호출
    }

    speak() {
      console.log(`${this.name} barks.`);
    }
  }

  let d = new Dog("Mitzie");
  d.speak(); //Mitzie barks.
  ```

- subclass에 constructor가 있다면, "this"를 사용하기 전에 가장 먼저 super()를 호출해야함

#### 클래스는 생성자가 없는 객체(non-constructible)을 확장할 수 없다.

> 만약 기존의 생성자가 없는 객체를 확장하고싶다면, `Object.setPrototypeOf()`

- ```js
  const Animal = {
    speak() {
      console.log(`${this.name} makes a noise.`);
    },
  };

  class Dog {
    constructor(name) {
      this.name = name;
    }
  }

  Object.setPrototypeOf(Dog.prototype, Animal);

  let d = new Dog("Mitzie");
  d.speak(); //Mitzie makes a noise
  ```

### Species

> 배열을 상속받은 MyArray 클래스에서 `Array` Object를 반환하고 싶을 때 Species 패턴은 기본생성자를 덮어쓰도록 해준다.

- ```js
  class MyArray extends Array {
    //부모 Array 생성자로 종류 덮어쓰기
    static get [Symbol.species]() {
      return Array;
    }
  }
  var a = new MyArray(1, 2, 3);
  var mapped = a.map((x) => x * x);

  console.log(mapped instanceof MyArray); //false;
  console.log(,apped instanceof Array); //true;
  ```

### **super**를 통한 상위 클래스 호출

> `super`키워드는 객체의 부모가 가지고 있는 함수들을 호출하기 위해 사용됨

- ```js
  class Cat {
    consturctor(name) {
      this.name = name;
    }

    speak() {
      console.log(`${this.name} makes a noise.`);
    }
  }

  class Lion extends Cat {
    speak() {
      super.speak();
      console.log(`${this.name} roars.`);
    }
  }

  let l = new Lion("Fuzzy");
  l.speak();
  //Fuzzy maeks a noise;
  //Fuzzy roars
  ```
