## Element Node

> HTML 문서 내의 각 element 들은 고유한 성질을 가지며, 각자 element를 DOM 트리 내의 노드 개체로 인스턴스화하는 고유한 JS 생성자를 가진다.

- ```javascript
  console.log(document.querySelector("a").constructor); //function HTMLAnchorElement() { [native code] }
  ```
- DOM에서 각 element가 고유한 JavaScript 인터페이스/생성자를 통해 만들어진다는 것

#### 1. HTML\*Element 개체의 속성 및 메서드(상속받은 것 포함)

> HTML\*Element 노드에 존재하는 속성 및 메서드와 관련된 정확한 정보를 얻으려면 사양서를 무시하고 브라우저에게 물어보자

- createElement()
- tagName
- children
- getAttribute()
- setAttribute()
- hasAttribute()
- removeAttribute()
- classList()
- dataset
- attributes
- etc...

#### 2. Element 생성

> Element 노드는 브라우저가 HTML 문서를 해석해서 문서 콘텐츠를 기반으로 대응되는 DOM이 만들어질 때 인스턴스화 된다.

- createElement()를 사용하여 프로그래밍적으로 Element 노드를 생성할수도 있다.
- ```javascript
  const elementNode = document.createElement("textarea");

  document.body.appendChild(elementNode);
  ```

- createElement() 메서드에 전달되는 값은 생성할 Element의 형식(태그 이름)을 지정하는 문자열이다.
  - createElement에 전달되는 값은 element가 생성디기 전에 소문자 문자열로 변경된다.

#### 3. Element의 태그 이름 얻기

> tagName 속성을 사용하면, element의 이름에 접근할 수 있다.

- tagName 속성은 nodeName이 반환하는 것과 동일한 값을 반환한다.
- 원본 HTML 문서에서의 대소문자 여부에 관계없이 둘다 값을 대문자로 반환한다.
- ```javascript
  console.log(document.querySelector("a").tagName); // A가 출력됨
  console.log(document.querySelector("a").nodeName); // A가 출력됨
  ```

#### 4. Element의 Attribute 및 값에 대한 리스트/컬렉션 얻기

> attributes 속성(element 노드가 Node로부터 상속받음)을 사용하면 현재 element에 정의된 Attr 노드의 컬렉션을 얻을수 있다.

- 반환된 리스트는 NamedNodeMap이다.
- ```javascript
  const atts = document.querySelector("a").attributes;

  for (let i = 0; i < atts.length; i++) {
    console.log(atts[i].nodeName + "=" + atts[i].nodeValue);
  }
  ```

- attributes 속성을 통해 반환되는 배열은 라이브 상태..
  - 이는 내용물이 언제든지 변경될 수 있다는 것을 의미
- 반환된 배열이 상속받고 있는 NamedNodeMap은 getNamedItem(), setNamedItem(), removeNamedItem()과 같이 배열을 조작하기 위한 메소드를 제공한다.
  - 이 메소드를 사용하여 attributes를 조작하는 것보다는 getAttribute(),setAttribute(),hasAttribute(),removeAttribute()를 사용하는것이 좋다.

#### 4. Element의 Attribute 값 획득&#183;설정&#183;제거

> element의 attribute 값을 가져오고, 설정 및 제거하기 위한 가장 일관된 방법은 getAttribute(),setAttribute(),removeAttribute() 메서드를 사용하는 것

- ```javascript
  const atts = document.querySelector("a");

  //제거
  atts.removeAttributes("href");

  //설정
  atts.setAttribuet("href", "#");

  //attribute 가져오기
  console.log(atts.getAttribute("href"));
  ```

- setAttribute()를 사용하여 attribute 값을 null이나 ''로 설정하지 말고 removeAttribute()를 사용하는것을 추천

#### 5. Element가 특정 attribute를 가지고 있는지 확인

> element가 attribute를 가지고 있는지 판별(즉 true & false)하기 위한 가장 좋은방법은 hasAttribute() 메소드를 사용하는 것

- ```javascript
  const attr = document.querySelector("a");

  console.log(atts.hasAttribite("href"));
  ```

- 이 메서드는 element가 attribute를 포함하고 있으면(attribute가 값을 가지지 않더라도) true를 반환
  - boolean attribute의 경우 Boolean 응답을 얻을 수 있다.
- ```javascript
    <input type="checkbox" checked/>
    <script>
    const atts = document.querySelector('input');

    console.log(atts.hasAttribute('checked')); //true
    </script>
  ```

#### 6. Class Attribute 값 리스트 얻기

> element 노드에 존재하는 classList 속성을 사용하면 className 속성에서 반환되는 공백으로 구분되는 문자열 값을 사용하는 것보다<br> 쉽게 class attribute 값 리스트에 접근할 수 있다.

- ```javascript
  <div class="big brown bear"></div>
  <script>
    const elm = document.querySelector("div");

    console.log(elm.classList); //big brown bear {0="big", 1="brown", 2="bear", length=3, ...}
    console.log(elm.className); //'big brown bear'가 출력됨
    </script>
  ```

- classList는 유사 배열 컬렉션이며, 읽기 전용인 length 속성을 가짐
- classList는 읽기전용이지만 add(), remove(), contains(), toggle() 메서드를 사용해서 변경할 수 있다.

#### 7. Class attribute에 하위 값 추가 및 제거하기

> classList.add()와 classList.remove() 메서드를 사용하면, class attribute의 값을 간단하게 편집할 수 있다.

- ```javascript
    <div class="dog"></div>
    <script>
        const elm = document.querySelector('div');

        elm.classList.add('cat');
        elm.classList.remove('dog');

        console.log(elm.className); //'cat'
    </script>
  ```

#### 8. Class Attribute 값 토글

> classList.toggle() 메서드를 사용하면, class attribute의 하위 값을 토글시킬수 있다.

- 값이 누락된 경우 추가하거나 값이 이미 있는 경우 제거된다.

#### 9. Class attribute 값이 특정 값을 가지고 있는지 판별하기

> classList.contains() 메서드를 사용하면, class attribute 값이 특정 하위값을 가지고 있는지 판별(true & false)할수 있다.

#### 10. data-\* attribute를 가져오고 설정하기

> element 노드의 dataset 속성은 element에서 data-\*로 시작하는 모든 attribute를 가진 개체를 제공해준다.<Br> 이 개체는 JS 개체이므로, dataset을 조작해서 DOM 내의 element에 변경 내용을 반영할 수 있다.

- dataset은 data attribute들의 camelCase 버전을 가지고 있다.

  - ex:) data-foo-foo -> fooFoo라는 속성으로 나열됨

- DOM에서 data-\* attribute를 제거하려면, dataset의 속성에 대해 delete 연산자를 사용하면 된다.
  - `delte dataset.fooFoo`
- ```javascript
    <div data-foo-foo="foo" data-bar-bar="bar"></div>

    <script>
        const elm = document.querySelector('div');

        //가져오기
        console.log(elm.dataset.fooFoo); //'foo'가 출력됨
        console.log(elm.dataset.barBar); //'bar'가 출력됨

        //설정하기
        elm.dataset.gooGoo = 'goo';

        //확인
        console.log(elm); //<div data-foo-foo="foo" data-bar-bar="bar" data-goo-goo="goo">가 출력됨
    </script>
  ```
