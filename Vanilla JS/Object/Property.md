## 객체 프로퍼티 설정과 프락시

### 접근자 프로퍼티 gettd와 setter

> 객체 프로퍼티에는 데이터 프로퍼티와 접근자 프로퍼티 두가지가 있다.
> <br>접근자 프로퍼티는 메서드와 비슷한데, getter와 setter 두가지 함수로 구성된다는 것과 접근했을 때 함수라기보다는 데이터 프로퍼티와 비슷하게 동작한다는 점이 조금 다르다.

- 접근자 프로퍼티는 ES6의 단축 문법 때문에 잘 드러나지는 않는다.

- ```js
  const USER_EMAIL = Symbol();
  class User {
    setEmail(value) {
      if (!/@/.test(value)) throw new Error(`invalid email: ${value}`);
      this[USER_EMAIL] = value;
    }
    getEmail() {
      return this[USER_EMAIL];
    }
  }

  const u = new User();
  u.setEmail("john@doe.com");
  console.log(`User email: ${u.email}`);

  //아래 코드가 더 자연스럽다
  const u = new User();
  u.email = "john@doe.com";
  console.log(`User email: ${u.email}`);

  //접근자 프로퍼티를 사용하면 후자의 자연스로운 문법을 사용하면서도, 부주의한 접근을 차단하는 전자의 장점을 누릴 수 있다.

  // 접근자 프로퍼티 사용예제
  const USER_EMAIL = Symbol();
  class User {
    set email(value) {
      if (!/@/.test(value)) throw new Error(`invalid email: ${value}`);
      this[USER_EMAIL] = value;
    }
    get email() {
      return this[USER_EMAIL];
    }
  }
  //함수 두개를 사용했지만 두 함수는 email 프로퍼티 하나에 묶여있다.
  //프로퍼티에 할당할 때는 setter가 호출되고, 할당하는 값이 첫번째 매개변수로 전달된다.
  //프로퍼티를 평가할떄는 getter가 호출됨

  //setter 없이 getter만 만들수도 있다.
  class Rectangle {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      l;
    }
    get perimeter() {
      return this.width * 2 + this.height * 2;
    }
  }
  // 반대로 getter 없이 setter만 만들수도 있지만, 거의 사용X
  ```

### 객체 프로퍼티 속성

> 프로퍼티에는 자신이 속한 객체 안에서 어떻게 동작할지 결정하는 속성이 있다.

- Object.defineProperty로는 프로퍼티 속성을 컨트롤하거나(설정 가능한 경우) 새 프로퍼티를 만들 수 있다.
- ```js
  //obj의 foo 프로퍼티를 읽기 전용으로
  Object.defineProperty(obj, "foo", { writable: false });

  //이제 foo에 값을 할당하려 하면 에러발생
  obj.foo = 3;
  //TypeError
  //읽기 전용 프로퍼티에 값을 할당하려 할때 에러가 발생하는 것은 스트릭트 모드(엄격모드)에서뿐이다.
  //비엄격모드일때는 할당이 실패하지만 에러는일어나지않음
  ```

- ```js
    //Object.defineProperty를 써서 객체에 새 프로퍼티를 추가할 수도 있다.
    //객체가 일단 생성된 뒤에 접근자 프로퍼티를 추가할 다른방법이 없고 Object.definedProperty를 쓰는 방법 뿐
    Object.defineProperty(obj, 'color', {
        get: function() {return this._color;},
        set: function(value) {this._color = value};
    });

    //Object.defineProperty로 데이터 프로퍼티를 추가할 떄는 value 프로퍼티를 사용하면 됨
    Object.defineProperty(obj, 'name', {
        value: 'Cynthia',
    });
    Object.defineProperty(obj, 'greet', {
        value: function() { return `Hello, my name is ${this.name}`;}
    });
  ```

- Object.defineProperty는 배열 프로퍼티를 나열할 수 없게 만들 떄 주로 사용한다.
- ```js
  const arr = [3, 1.5, 9, 2, 5, 2];
  Object.defineProperty(arr, "sum", {
    value: function () {
      return this.reduce((a, x) => a + x);
    },
    enumerable: false,
  });
  Object.defineProperty(arr, "avg", {
    value: function () {
      return this.sum() / this.length;
    },
    enumerable: false,
  });
  ```

#### 프로퍼티 속성 세가지

1. 쓰기 가능한지(writable)
   - 프로퍼티 값을 바꿀 수 있는지 아닌지 판단
2. 나열 가능한지(enumerable)
   - for...in문이나 Object.keys, 확산 연산자에서 객체 프로퍼티를 나열할 때 해당 프로퍼티가 포함될지 아닌지 판단
3. 설정 가능한지(configurable)
   - 프로퍼티를 객체에서 삭제하거나 속성을 수정할 수 있는지 아닌지 판단

### 객체 보호: 동결, 봉인, 확장금지

> 자바스크립트는 객체를 보호해서 의도하지 않은 수정을 막고, 의도적인 공격은 더어렵게 만드는 세가지 메커니즘이 있다.
> <br> 동결(freeze), 봉인(sealing), 확장 금지(preventing extension) 이다.

#### 동결

- 동결된 객체는 수정할 방법이 없다.
  <br>일단 객체를 동결하면 다음과 같은 작업이 불가능
  - 프로퍼티 값 수정 또는 할당
  - 프로퍼티 값을 수정하는 메서드 호출
  - setter 호출
  - 새 프로퍼티 추가
  - 새 메서드 추가
  - 기존 프로퍼티나 메서드의 성질변경
- 객체를 동결하면 그 객체는 문자열이나 숫자처럼 불변이 된다.
  - 객체를 동결하면 상태를 바꾸는 메소드가 모두 쓸모없어지므로 데이터만 들어있는 객체에서 가장 유용함
- 객체를 동결할때는 `Object.freeze`를 사용
- 객체가 동결됐는지 확인할 떄는 `Object.isFrozen`을 사용

#### 봉인

- 객체를 봉인하면 새 프로퍼티를 추가하거나 기존 프로퍼티를 변경, 삭제할 수 없다.
- 클래스의 인스턴스를 사용하면서, 인스턴스의 프로퍼티를 수정하는 메서드는 동작하도록 할때 봉인 사용
- 객체를 봉인할 때는 `Object.seal`
- 객체가 봉인됐는지 확인할때는 `Object.isSealed`

#### 확장 금지

> 확장 금지를 사용하면 객체에 새 프로퍼티를 추가하는 것만 금지됨

- 확장을 금지할 때는 `Object.preventExtensions`
- 확장이 금지됐는지 확인할 때 `Object.isExtensible`을 사용
- 객체의 확장을 막아야 할때는 보통 프로퍼티 삭제나 속성 변경도 금지해야 할때가 대부분이므로 객체 봉인을 더많이 쓰는 편

### 프락시

> 프락시는 ES6에서 새로 추가된 메타프로그래밍 기능이다.
> <br> 메타프로그래밍이란 프로그램이 자기 자신을 수정하는 것을 말함

- 객체 프락시는 간단히 말해 객체에 대한 작업을 가로채고, 필요하다면 작업 자체를 수정하는 기능

- ```js
  const cofficients = {
    a: 1,
    b: 2,
    c: 5,
  };

  function evaluate(x, co) {
    return co.a + co.b * x + co.c * Math.pow(x, 2);
  }

  const cofficients = {
    a: 1,
    b: 3,
  };
  //계수 일부가 빠진 객체를 가지고 계산
  evaluate(5, cofficients); //NaN

  //cofficients.b에 0을 할당하면 문제를 해결할수 있지만 프락시를 쓰는방법이 더낫다.

  //프락시는 객체를 대상으로 한 작업을 가로채므로 정의되지 않은 프로퍼티는 항상 0을 반환하게만들수 있음
  const betterCofficients = new Proxy(cofficients, {
    get(target, key) {
      //프로퍼티에 접근하는 동작만 가로챘으며 get함수가 핸들러이다.
      return targe[key] || 0;
      //해당 키가 타겟에 있는지 확인하고 없으면 0을반환
    },
  });
  ```

- Proxy 생성자에 넘기는 첫번쨰 매개변수는 타겟, 즉 프락시할 객체이다.
- 두번쨰 매개변수는 가로챌 동작을 가리키는 핸들러
