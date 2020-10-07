## 제너레이터 (generator)

> 제너레이터란 이터레이터를 사용해 자신의 실행을 제어하는 함수 <br>일반적인 함수는 매개변수를 받고 값을 반환하지만, 호출자는 매개변수 외에는 함수의 실행을 제어할 방법이 전혀 없다.<br>함수를 호출하면 그 함수가 종료될 때까지 제어권을 완전히 넘김 (제너레이터는 그렇지 않다.)
> <br> 제너레이터는 모든 연산을 지연시켰다가 피ㅓㄹ요할 때만 수행하게 만들 수 있다.

- 제너레이터의는 두가지 새로운 개념을 도입

  1. 함수의 실행을 개별적 단계로 나눔으로써 함수의 실행을 제어
  2. 실행 중인 함수와 통신한다는 것

- 제너레이터는 두 가지 예외를 제외하면 일반적인 함수와 같다.

  - 제너레이터는 언제든 호출자에게 제어권을 넘길 수 있다.
  - 제너레이터는 호출한 즉시 실행되지는 않는다.<br> 대신 이터레이터를 반환하고, 이터레이터의 next 메서드를 호출함에 따라 실행됨

- 제너레이터를 만들 때는 function 키워드 뒤에 애스터리스크(\*)를 붙인다.

  - 이것을 제외하면 문법은 일반적인 함수와 같다.
  - 제너레이터는 return 외에 yield 키워드를 사용 가능

- ```js
    //무지개 색깔을 반환하는 단순한 예제
    function* rainbow() { //* 기호는 제너레이터 문법
        yield 'red';
        yield 'orange';
        yield 'yellow';
        yield 'green';
        yield 'blue',
        yield 'indigo',
        yield 'violet',
    }

    //제너레이터를 호출하면 이터레이터를 얻는다.
    const it = rainbow();
    it.next(); // {value: 'red', done: false}
    it.next(); // {value: 'orange', done: false}
    it.next(); // {value: 'yellow', done: false}
    it.next(); // {value: 'green', done: false}
    it.next(); // {value: 'blue', done: false}
    it.next(); // {value: 'indigo', done: false}
    it.next(); // {value: 'violet', done: false}
    it.next(); // {value: undefined, done: true}


    //rainbow 제너레이터는 이터레이터를 반환하므로 for...of 루프에서 사용 가능
    for(let color of rainbow()) {
        console.log(color);
    }
  ```

#### yield 표현식과 양방향 통신

> 제너레이터와 호출자 사이에서 양방향 통신이 가능하다. (통신은 yield 표현식을 통해 이뤄짐)
> <br> 표현식은 값으로 평가되고 yield는 표현식이므로 반드시 어떤 값으로 평가된다.
> <br> yield 표현식의 값은 호출자가 제너레이터의 이터레이터에서 next를 호출할 때 제공하는 매개변수이다.

- ```js
  function* interrogate() {
    const name = yield "What is your name?";
    const color = yield "What is your favorite color?";
    return `${name}'s favorite color is ${color}.`;
  }

  const it = interrogate();
  it.next(); // { value: "What is your name?", done: false} //행에 yield 표현식이 들어있으므로 제너레이터는 반드시 제어권을 호출자에게 넘겨야함
  //[제너레이터의 첫 번째 행이 완료되려면 호출자가 next를 다시 호출해야 한다, 그러면 name은 next에서 전달하는 값을 받는다.]
  it.next("Ethan"); // {value: What is your favorite color?", done: false}
  it.next("orange"); // {valueL :Ethan's favorite color is orange" , done: true}
  ```

- ```js
  //제너레이터를 실행했을 때 일어나느 일을 묘사한 것
  //1. 제너레이터는 이터레이터를 반환(return) 하고 일시 정지한 상태로 시작함

  function* interrogate() {
    let name = yield "What is your name?";
    let color = yield "What is your favorite color?";
    return `${name}' s favorite color is ${color}.`;
  }

  /*2.undefined를 제너레이터에 넘긴다.(이 값은 사용되지 않는다.)
  제너레이터는 "What is your name?"을 넘기고 일시 정지한다.*/

  /*3."Ethan"을 제너레이터에 넘긴다.
   제너레이터는 "What is your favorite color?"를 넘기고 일시 정지한다.*/

  /*4. "orange"를 제너레이터에 넘긴다.
   제너레이터는 "Ethan's favorite color is orange"를 반환하고 멈춤
  */

  //제너레이터를 활용하면 호출자가 함수의 실행을 제어할 수 있어서 아주 유용하게 쓸수 있다.
  //호출자가 제너레이터에 정보를 전달하므로, 제너레이터는 그 정보에 따라 자신의 동작 방식 자체를 바꿀 수 있다
  ```

- 제너레이터는 화살표 표기법으로 만들 수 없으며 반드시 `function*` 을 써야 한다.

#### 제너레이터와 return

> yield 문은, 설령 제너레이터의 마지막 문이더라도 제너레이터를 끝내지 않는다.
> <br> 제너레이터에서 return문을 사용하면 그 위치와 관계없이 done은 true가 되고, value 프로퍼티는 return이 반환하는 값이 된다.

- ```js
  function* abc() {
    yield "a";
    yield "b";
    return "c";
  }

  const it = abc();
  it.next(); // {value: 'a', done: false}
  it.next(); // {value: 'b', done: false}
  it.next(); // {value: 'c', done: true}

  //이런 동작방식이 정확하긴 하지만 제너레이터를 사용할 떄는 보통 done이 true 이면 value 프로퍼티에 주의를 기울이지 않는다.
  //for...of 루프에서 사용하면 c는 절때 출력되지 않는다.

  for (let l of abc()) {
    console.log(l);
  }
  ```

- 제너레이터에서 중요한 값을 return으로 반환하려 하지 말자
  - 제너레이터가 반환하는 값을 사용하려 할때는 yield를 써야 함
  - return은 제너레이터를 중간에 종료하는 목적으로만 사용해야 한다.<br> 따라서 제너레이터에 return을 쓸때는 반환값을 쓰지 않는 습관을 들이자
