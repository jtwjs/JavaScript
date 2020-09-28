## DOM(Document Object Model)
>컴퓨터가 문서를 잘 처리할 수 있도록 문서에 대한 구조를 약속한 것
- Tree구조로 문서를 표현
    - 하나의 부모에 여러 자식엘리먼트들로 구성
    - 자바스크립트 Node 개체의 계층화된 트리
- DOM은 원래 XML문서를 위한 애플리케이션 프로그래밍 인터페이스였지만, HTML 문서에서도 사용되도록 확장되었다.

### 노드 개체 유형
>HTML 문서를 다룰 때 마주치게 되는 가장 일반적인 노드 유형은 다음과 같다.<br>이 목록에 있는 노드 유형 형식은 JS 브라우저 환경에서 Node 개체의 속성으로 기록되는 상수 값의 속성과 동일하다<br>Node의 이 속성들은 상수 값이며, Node 개체의 특정 유형에 매핑되는 숫자 코드 값을 저장하는 데 사용된다.
- DOCUMENT_NODE (ex: window.document)
    - 숫자 코드 값 = 9
- ELEMENT_NODE (ex: &#60;body&#62;,&#60;a&#62;,&#60;h1&#62; 등..)
    - 숫자 코드 값 = 1
- ATTRIBUTE_NODE (ex: class="funEdges")
    - 숫자 코드 값 = 2
    - DOM4에서 사용이 금지(deprecated) 되었다.
- TEXT_NODE (ex: 줄바꿈과 공백을 포함한 HTML 문서 내의 텍스트 문자)
    - 숫자 코드 값 = 3
- DOCUMENT.FRAGMENT_NODE (ex: document.createDocumentFragment())
    - 숫자 코드 값 = 11
- DOCUMENT_TYPE_NODE (ex: &#60;!DOCTYPE html&#62;)
    - 숫자 코드 값 = 10


### 노드를 다루기 위한 속성 및 메소드
- 모든 노드 개체는 속성과 메소드를 1차적으로 Node 개체로부터 상속받는다.
    - 이 속성 및 메소드는 DOM을 조작·조사·탐색하는 기준이 되는 값과 함수다
#### Node 속성
- childNodes
- firstChild
- lastChild
- nextSibling
- nodeName
- nodeValue
- parentNode
- previousSibling
#### Node 메소드
- appendChild()
- cloneNode()
- compareDocumentPosition()
- contains()
- hasChildNodes()
- insertBefore()
- isEqualNode()
- removeChild()
- replaceChild()
#### Document 메소드
- document.createElement()
- document.createTextNode()
#### HTML *Element 속성
- innerHTML
- outerHTML
- textContent
- innerText
- outerText
- firstElementChild
- lastElementChild
- nextElementChild
- previousElementChild
- children
#### HTML element 메소드
- insertAdjacentHTML()

### 노드 값 가져오기
> nodeValue 속성은 Text와 Comment를 제외한 대부분 노드 유형에서는 null 값을 반환한다.<br>이 속성의 용도는 Text와 Comment 노드에서 실제 텍스트 문자열을 추출하는 데 초점을 맞추고 있다.

### JS 메소드를 사용해 ELement 및 Text노드 생성하기
>JS를 사용해서 ELement 및 Text 노드를 프로그래밍적으로 생성할 수 있게 해준다.
- createElement()
    - 생설될 element를 지정하는 문자열을 매개변수로 받는다.
- createTextNode()
- createAttribute() 메소드는 사용이 금지되었으며, attribute 노드를 만드는데 사용되어서는 안된다.
    - 대신에, 통상적으로 개발자들은 getAttreibute(),setAttribute(),removeAttribute() 메소드를 사용
### JS 문자열을 사용하여 DOM에 Elementㅈ 및 Text 노드를 생성 및 추가하기
> innerHTML, outerHTML, textContent, insertAdjacentHTML() 속성 및 메소드는 JS문자열을 사용하여 DOM에 노드를 생성하고 추가하는 기능을 제공
- **innerHTML**
    - ```document.getElementById('A').innerHTML = '<Strong>Hi</Strong>` ```
    - 문자열로 노드 생성
    - *비표준 확장: Text 노드 생성
        - document.getElementById('A').innerText = 'Kepp it';
- **outerHTML**
    - ```document.getElementById('B').outerHTML = '<div id="B" class="new">Whats Shaking</div>` ```
    - 문자열로 생성된 노드로 바꾼다.
    - *비표준 확장: Text 노드로 바꾼다.
        - document.getElementById('B').outerText = 'real!';
- **textContent**
    - ```document.getElementById('C').textContent = 'dude'; ```
    - Text 노드를 생성해서 Node#C를 갱신한다.
- insertAdjacentHTML()
    - Element 노드에서만 동작하는 이 메소드는 이전에 언급된 메소드들에 비해 보다 세밀하게 다룰수 있다.
    - 시작 태그의 앞, 시작 태그의 뒤, 종료 태그 앞, 종료 태그 뒤에 노드를 삽입하는 것이 가능
    - ```JavaScript
        var elm = document.getElementById('elm');
        elm.insertAdjacentHTML('beforebegin','<span>Hey-</span>');//시작 태그의 앞
        elm.insertAdjacentHTML('afterbegin','<span>dude-</span>');//시작 태그의 뒤
        elm.insertAdjacentHTML('beforeend','<span>-are</span>');//종료 태그 앞
        elm.insertAdjacentHTML('afterend','<span>-you?</span>');//종료 태그 뒤
      ```
- document.write() 역시 DOM에 일제히 노드를 생성해서 추가하는데 사용될수 있다.
    - 하지만 이 메소드는 서든파티 스크립트 작업을 수행하는 데 필요하지 않는 한, 통상적으로 사용 X
    - write() 메소드는 전달된 값을 페이지가 로딩 및 해석되는 동안 페이지에 출력된다.
    - wirte() 메소드를 사용하면 로딩된 HTML 문서가 해석되는 것을 지연/차단 시키는점 유의
### DOM 트리의 일부를 JS 문자열로 추출하기
>DOM에 노드를 생성하고 추가하는 데 사용하는 것과 동일한 속성들(innerHTML, outerHTML,textContent)이 DOM의 일부(혹은 전체)를 JS 문자열로 추출하는데 사용된다.
- **innerHTML**
    - 자식 노드들만 나타냄
- **outerHTML**
    - 본인포함 자식노드들 모두 나타냄
- **textContent**
    - 본인 Text노드만 나타냄
- *비표준확장
    - innerText
    - outerText
### apeendChild() 및 insertBefore()를 사용하여 노드 개체를 DOM에 추가
> appendChild() 및 insertBefore() 노드 메소드는 JS노드 개체를 DOM 트리에 삽입할수있게 해준다.<br> 자식 노드가 존재하지 않으면, 해당 노드가 첫번째 자식으로 추가된다.
- **appendChild()**
    - 자식 노드 끝에 추가
    - ```javascript
        <p>Hi</p>

        //임시 element 노드와 text 노드를 생성
        var elementNode = document.createElement('strong');
        var textNode = document.createTextNode('dude');

        //앞의 노드들을 DOM에 추가
        document.querySelector('p').appendChild(elementNode);
        document.querySelector('strong').appendChild(textNode);
    ```
- insertBefore()
    - 자식 노드 목록 끝에 노드를 추가하는 것 외에 삽입 위치를 조정하는것이 필요하면 사용
    - ```javascript
        <ul>
            <li>2</li>
            <li>3</li>
        </ul>
        //텍스트 노드와 li element 노드를 생성해서 li에 텍스트를 추가
        var text1 = document.createTextNode('1');
        var li = document.createElement('li');
        li.appendChild(text1);

        //문서에서 ul을 선택
        var ul = document.querySelector('ul');
        ul.insertBefore(li,ul.firstChild);
      ```
      - insertBefore() 메소드는 2개의 매개변수를 필요로 하는데, 삽입될 노드와 해당 노드를 삽입하고자 하는 문서 내의 참조노드
      - 두번째 매개변수를 전달하지 않으면, appendChild()처럼 동작

### removeChild() 및 replaceChild()를 사용하여 노드를 제거하거나 바꾸기
>DOM에서 노드를 제거하는 거은 여러 단계의 과정으로 이루어진다.<br>1.먼저 삭제하고자 하는 노드를 선택<br>2. 다음으로 부모 노드에 대한 접근을 얻는다. **parentNode** 속성을 사용<br>3. 부모 노드에서 삭제할 노드에 대한 참조를 전달하여 removeChild()메소드 호출
- ```javascript
    <div id="A">Hi</div>
    <div id="B">Dude</div>

    //element 노드 삭제
    var divA = document.getElementById('A');
    divA.parentNode.removeChild(divA);

    //텍스트 노드 삭제
    var dibB = document.getElementById('B').firstChild;
    divB.parentNode.removeCHild(divB);

    //element 노드 바꾸기
    var divA = document.getElementById('A');
    var newSpan = document.createElement('span');
    newSpan.textContent = 'Howdy';
    divA.parentNode.replaceChild(newSpan,divA);

    //텍스트 노드 바꾸기
    var divB = document.getElementById('B'),firstChild;
    var newText = document.createTextNode('buddy');
    divB.parentNode.replaceChild(newText,divB);
  ```
  - 제거하거나 바꾸는 대상이 무엇인지에 따라 innerHTML, outerHTML, textContent속성에 빈문자열을 주는것이 더 쉽고 빠를수도 있다.
    - 하지만 브라우저의 메모리 누수가 발생할 수 있으므로 조심!

### cloneNode()를 사용하여 노드 복제
>cloneNode() 메소드를 사용하여 단일 노드 혹은 노드 및 모든 자식 노드를 복제할수 있다.
- ```javascript
    var cloneUL = document.querySelector('ul').cloneNode();// ul태그만 복제
    var cloneUL2 = document.querySelector('ul').clonNode(true);//자식노드들도 모두 복제
  ```
- Element 노드를 복제할 때 모든 특성 및 값(인라인 이벤트 포함)도 복제된다.
    - addEventListener()나 node.onclick으로 추가된것은 복제되지 않는다.

### 노드 컬렉션(NodeList와 HTMLCollection)에 대한 이해
> 트리에서 노드 그룹을 선택하거나 사전에 정의된 노드집합에 접근하려면, 해당 노드들이 NodeList나 HTMLCollection내에 있어야 한다.
- **NodeList**
    - ex: document.querySelectorAll(*)
- **HTMLCollection**
    - ex : document.scripts
#### 배열과 유사한 개체 컬렉션들의 특징
- 컬렉션은 라이브 상태 혹은 정적일수 있다.
    - 컬렉션 내에 포함된 노드들이 현재 문서 혹은 현재 문서에 대한 스냅샷의 일부라는 것을 의미
- 기본적으로 노드는 트리 순서에 따라 컬렉션 내에서 정렬된다.
- 컬렉션은 리스트 내의 요소 개수를 나타내는 length 속성을 가진다.

### 직계 자식 노드 전부에 대한 리스트/컬렉션 얻기
> childNodes 속성을 사용하면 직계 자식 노드에 대한 배열 형태의 리스트(예: NodeList)가 나온다.
- childNodes에서 반환되는 NodeList는 직계 자식 노드만을 가진다.
- childNodes가 Element 노드뿐만아니라 다른 노드 유형(text및 comment노드)도 포함한다는점에 유의
### NodeList나 HTMLCollection을 JavaScript 배열로 변환
>NodeList나 HTMLCollection은 배열 형태이지만 array의 메소드를 상속하는 진정한 JS배열은 아니다
- ```javascript
    console.log(Array.isArray(document.links));//HTMLCollection이지 array가 아니므로 false
    console.log(Array.isArray(document.querySelectorAll('a')));//NodeList이나 array가아니므로 false
  ```
- 유사 배열 리스트를 진정한 JS 배열로 변환하기 위해, call() 혹은 apply()에 유사 배열리스트를 전달하면 call()혹은 apply()는 진짜 JS배열을 반환하는 메소드를 호출한다.
- ```javascript
    //slice() 메소드를 사용하고있는데 실제로는 아무것도 잘라내지 않는다. 단지 slice()가 배열을 반환하므로 리스트를 JS Array로 변환하는데 사용하고 있을 뿐이다.
    console.log(Array.isArray(Array.prototype.slice.call(document.links)));
    console.log(Array.isArray(Array.prototype.slice.call(document.querySelectorAll('a'))));
  ```

### DOM 내의 노드 탐색
>노드 참조(ex: document.querySelector('ul'))에 다음과 같은 속성들을 사용하여 DOM을 탐색함으로써 다른 노드에대한 참조를 얻을수 있다.
#### element노드 뿐만아니라 text와 comment노드도 포함됨
- **parentNode**
- **firstChild**
- **lastChild**
- **nextSibling**
- **previousSibling**
#### text와 comment 노드를 무시하고 DOM탐색 가능
- **firstElementChild**
- **lastElementChild**
- **nextElementSibling**
- **previousElementSibling**
- **children**
- **parentElement**
> **childElementCount** : 노드가 가지고 있는 자식 element의 개수를 계산할때 유용

### contains()와 compareDocumentPosition()으로 DOM 트리 내의 Node 위치 확인
- **contains()**
    - 특정 노드가 다른 노드 내에 포함되었는지를 알수 있음
- **compareDocumentPosition()**
    - 전달된 노드에 상대적으로 선택된 노드에 대한 정보를 요청
