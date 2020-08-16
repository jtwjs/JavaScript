## Element 노드 선택

> 단일 element 노드에 대한 참조를 얻는데 가장 흔히 사용되는 메소드

- **querySelector()**
  - CSS selector 문법 형식의 매개변수를 허용
  - 문서 내에서 발견되는 첫 번째 노드 element를 반환
- **getElementById()**
  - querySElector() 메서드에 비해 매우 단순
  - id attribute를 이용해 element 선택

#### 1. Element 노드 리스트 선택 및 생성하기

> HTML 문서 내의 노드 리스트(NodeList)를 선택 및 생성하는 데 가장 흔히 사용되는 메서드<br> 특정 element 하나를 선택하는 것이 아닌 선택한 element들의 리스트(NodeList) 생성

- **querySelectorAll()**
  - 반환하는 리스트는 리스트 생성 시점의 문서 스냅샷
  - 해당 리스트는 정적이며, 라이브 상태가 아니다
- **getElementsByTagName()**
  - 생성된 NodeList는 라이브 상태로 간주
    - 리스트를 생성하고 선택한 후에 문서가 업데이트된 경우에도 문서의 상태를 항상 반영
- **getElementsByClassName()**
  - 생성된 NodeList는 라이브 상태로 간주
    - 리스트를 생성하고 선택한 후에 문서가 업데이트된 경우에도 문서의 상태를 항상 반영
- element 노드에도 정의되어 있어 메서드의 결과를 DOM 트리의 특정부분에 한정할 수 있다.
  - ex: `document.getElementById('header').getElementByClassName('a'))`

#### 2. 직계 자식 Element 노드를 모두 선택하기

> element 노드에서 children 속성을 사용하면, element 노드의 직계 자식 노드 전체 리스트(HTMLCollection)을 얻을 수 있다.

- **children**
  - 직계 element 노드만을 제공하며, element 가 아닌 노드(test노드)는 제외된다.
  - 자식이 없는 경우 빈 유사 배열 리스트를 반환
- HTMLCollection은 element를 문서 내의 순서대로 가진다.
  - 즉, elemnt가 DOM에 나타나는 순서대로 배열 내의 위치함
  - HTMLCollection은 라이브 상태이므로, 문서가 변경되면 동적으로 컬렉션에 반영됨

#### 3. 컨텍스트 기반 Element 선택

> 통상적으로 document 개체를 통해 접근되는 querySelector(), querySelectorAll(), getElementByTagName(), getElementsByClassName()은 elemnt 노드에도 정의되어 있다.<br>이는 해당 메서드의 결과를 DOM 트리의 특정 부분으로 제한할 수 있게 해준다.<br>elemnt 노드 개체에서 이 메서드를 호출하면, element 노드를 검색하고자 하는 특정 컨텍스트를 선택할 수 있다는 것

- ```javascript
  const divElm = document.createElement("div");
  const ulElm = document.createElement("ul");
  const liElm = document.createElement("li");
  liElm.setAttribute("class", "liClass");
  ulElm.apeendChild(liElm);
  divElm.apeendChild(ulElm);

  console.log(divElm.querySelector("ul"));
  console.log(divElm.querySelectorAll("li"));
  conosle.log(divElm.getElementsByTagName("li"));
  console.log(divElm.getElementsByClassName("liClass"));
  ```

#### 4. 사전에 구성된 Element 노드 선택/리스트

> HTML 문서에서 element 노드를 포함하고 있는 사전 구성된 유사 배열 리스트가 몇 개 존재한다.

- **document.all**
  - HTML 문서 내의 모든 elemnt
    - Firefox에선 지원X
- **document.forms**
  - HTML 문서 내의 모든 &#60;form&#62; element
- **document.images**
  - HTML 문서 내의 모든 &#60;img&#62; element
- **document.links**
  - HTML 문서 내의 모든 &#60;a&#62; element
- **document.scripts**
  - HTML 문서 내의 모든 &#60;script&#62; element
- **document.styleSheets**
  - HTML 문서 내의 모든 &#60;link&#62; 또는 &#60;style&#62; element
- HTMLCollection 인터페이스/개체를 통해 생성되는데, document.styleSheet만 예외적으로 StyleSheetList를 사용

#### 5. 선택될 Element를 검증하기 위해 matchesSelctor()를 사용하기

> matchesSelector() 메서드를 사용하면, element가 selector 문자열에 들어맞는지를 판별할 수 있다.

- ```javascript
    <ul>
    <li>Hello</li>
    <li>world</li>
    </ul>

    <script>
        //최신 브라우저에서는 브라우저 접두어인 moz, webkit, o ,ms를 사용하지 않으면 실패한다. //webkitMatchesSelector
        console.log(document.querySelector('li').matchesSelector('i:first-child'));// true
    </script>
  ```
