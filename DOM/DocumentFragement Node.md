## DocumentFragement Node

> DocumentFragement 노드를 생성해서 사용하면 라이브 DOM 트리 외부에 경량화된 문서 DOM을 만들수 있다 **(문서 조각)** .

- DocumentFragement는 마치 라이브 DOM 트리처럼 동작하되, 메모리상에서만 존재하는 빈 문서 템플릿으로 생각하면 된다.
- DocumentFragement의 자식 노드를 메모리상에서 손쉽게 조작한 후, 라이브 DOM에 추가하는것도 가능

#### 2. createDocumentFragement()

- ```javascript
  const docFrag = document.createDocumentFragment();

  ["blue", "green", "red", "purple", "pink"].forEach(function (e) {
    const li = document.createElement("li");
    li.textContent = e;
    docFrag.appendChild(li);
  });
  ```

- DocumentFragment를 사용하여 메모리상에서 노드 구조를 만들고 이를 라이브 노드 구조에 삽입하면 매우 효율적
- 단순히 메모리상에서 `createElement()`를 사용하여 DOM 구조를 생성하는것에 비해 가지는 이점이 무엇?
  1. DocumentFragment는 어떤 종류의 노드(&#60;body&#62;나&#60;html&#62; 제외)도 가질 수 있는 반면, element는 그렇지 않다.
  2. DocumentFragment를 DOM에 추가하더라도 DocumentFragement 자체는 추가되지 않으며, **노드의 내용만이 추가**된다.<br>element를 추가할 경우에는 element 자체도 추가동작에 속함
  3. DocumentFragment를 DOM에 추가할 때, DocumentFragment는 **추가되는 위치로 이전**되며, 생성한 메모리상의 위치에 더이상 존재X <br>노드를 포함하기 위해 일시적으로 사용된 후 라이브 DOM으로 이동되는 element 노드는 그렇지 않음

#### 2. DocumentFragment를 라이브 DOM에 추가

> appendChild()와 insertBefore() 노드 메서드의 인수로 DocumentFragment를 전달하면, DocumentFragment의 자식 노드는 메서드가 호출되는 DOM 노드의 자식 노드로 옮겨진다.

- ```javascript
  const ulElm = document.querySelector("ul");
  const docFrag = document.createDocuemntFragment();

  ["blue", "green", "red"].forEach(function (e) {
    const li = document.createElement("li");
    li.textContent = e;
    docFrag.appendChild(li);
  });
  ulElm.appendChild(docFrag);
  ```

- 노드를 삽입하는 메서드에 DocumentFragment를 인수로 전달하면, 자식 노드 구조 전체가 삽입되며 DocumentFragment 노드 자체는 무시된다.

#### 3. DocumentFragment에서 innerHTML 사용하기

> DocumentFragment를 생성해서 &#60;div&#62;를 추가(DocumentFragment에서는 innerHTML이 동작하지않음)한 다음, HTML 문자열로 갱신하기 위해 innerHTML 속성을 사용하는 것이다.

- ```javascript
  const divElm = document.createElement("div");
  const docFrag = document.createDocumentFragment();

  //DocumentFragment에 div추가
  docFrag.appendChild(divElm);

  //문자열로부터 DOM 구조를 생성
  docFrag.querySelector("div").innerHTML = "<ul><li>foo</li><li>bar</li></ul>";

  //이 문자열은 querySelectorAll()과 같은 메서드를 호출 가능한 DOM구조가 된다.
  //DOM 구조가 <div>로 감싸져 있다.
  console.log(docFrag.querySelectorAll("li").length); //2가출력
  ```

#### 4. 복제를 사용하여 Fragment의 노드를 메모리상에서 유지

> 노드를 추가한 이후에도 Fragment의 내용을 메모리상에서 유지하려면, cloneNode()를 사용하여 추가할 DocumentFragment를 복제하면 된다.

- ```javascript
  const ulElm = document.querySelector("ul");
  const docFrag = document.createDocumentFragment();

  //li를 DocumentFragment에 추가
  ["blue", "red", "pink"].forEach(function (e) {
    const li = document.createElement("li");
    li.textContent = e;
    docFrag.appendChild(li);
  });

  //복제된 DocumentFragment를 라이브 DOM의 ul에 추가
  ulElm.appendChild(docFrag.cloneNode(true));

  //[li,li,li,li,li]
  console.log(docFrag.childNodes);
  ```
