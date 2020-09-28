## Document Node
>HTMLDocument 생성자(document로부터 상속됨)는 DOM 내에 DOCUMENT_NODE(예: window.document)를 생성한다.
- Document 및 HTMLDocument 생성자는 보통 HTML 문서를 로드 시 브라우저에 의해 인스턴스가 만들어진다.
- createHTMLDocument()
    - 브라우저 내에 현재 로드된 문서 외부에 직접 HTML 문서를 생성할 수 있다.
- createDocument()
    - HTML 문서로 설정된 document 개체를 생성할 수 있다.
- 사용하는 예:  iframe에 HTML 문서를 제공

#### 1. HTMLDocument의 속성 및 메서드(상속된것 포함)
> HTMLDocument 노드 개체(ex: window.document)는 DOM을 다룰 때 사용 가능한 수많은 메서드와 속성(ex: document.querySelectorAll())에 접근하는데 사용됨
- doctype
- documentElement
- implementation
- activeElement
- body
- head
- title
- lastModified
- referrer
- URL
- defaltview
- compatMode
- ownerDocument
- hasFocus()
- etc...

#### 2. document 자식 노드
>document 노드는 DocumentType 노드 개체 하나와 Element 노드 개체 하나를 가질 수 있다.
- 통상적으로 HTML 문서는 하나의 doctype(ex: &#60;!DOCTYPE html&#62;)과 하나의 element(ex: &#60;html lang="en"&#62;)만을 가진다.
    - 따라서 document 개체의 자식에 대해 물어보면 최소한 문서의 doctype/DTD 와 &#60;html lang="en"&#62;이 포함된 배열을 얻게 된다.
- HTMLDocument 생성자에서 생성되는 window.document 개체와 Dcoument 개체를 혼동해선 안된다.
    - widnow.document 는 DOM 인터페이스의 시작점

#### 3. document는 &#60;!DOCTYPE&#62;, &#60;html lang="en"&#62;, &#60;head&#62;, &#60;body&#62;에 대한 바로가기를 제공한다.
- document.doctype은 &#60;!DOCTYPE&#62;을 참조한다.
- document.documentElement는 &#60;html lang="en"&#62;을 참조한다.
- document.head는 &#60;head&#62;를 참조한다.
- document.body는 &#60;body&#62;를 참조한다.
>doctype이나 DTD의 nodeType은 10 또는 DOCUMENT_TYPE_NODE이며, DOCUMENT_NODE(HTMLDocument()로부터 생성되는 window.document)와 혼동해서는 안된다.<Br>doctype은 DocumentType()생성자로부터 생성된다.

#### 4. document.implementation.hasFeature()를 사용하여 DOM 사양/기능 탐지하기
>document.implementation.hasFeature()를 사용하면 현재 문서에 대해 브라우저가 구현/지원하는 기능 및 수준에 대해 물어볼수 있다.
- ```javascript
    //브라우저가 Core2.0 및 3.0 사양을 구현했는지 확인
     console.log(document.implementation.hasFeature('Core','2.0'));
     console.log(document.implementation.hasFeature('Core','3.0'));
  ```
- hasFeature()외에 기능 탐지(capability detect)를 함꼐 사용
- isSupported 메소드를 사용하면, 특정/선택된 노드에 대한 구현 정보를 수집할 수 있다.
    - ```element.isSupported(feature,version)) ```

#### 5. 문서 내에서 포커스를 가지고 있거나 활성 상태인 노드에 대한 참조 얻기
>document.activeElement를 사용하면, 문서 내에서 포커스를 가지고 있거나 활성 상태인 노드에 대한 참조를 바로 얻기 가능
- 포커스를 가지고 있거나 활성 상태인 element는 포커스를 받을 수 있는 element를 반환한다.
#### 6. 문서 혹은 문서 내의 특정 노드가 포커스를 가지고 있는지 판별하기
>document.hasFocus() 메소드를 사용하면 사용자가 현재 해당 HTML 문서가 로드된 창에 포커스를 두고 있는지 알수 있다.
- ```javascript
    //문서가 로드된 창/탭에서 계속 포커스를 두면 true가 반환됨 그렇지 않으면 false 반환
    setTimeout(function(){console.log(document.hasFocus())}),5000);
  ```

#### 7. document.defaultView는 최상위/전역 개체에 대한 바로가기다
>defaultView 속성은 JavaScript 최상위 개체, 혹은 전역개체라고 불리는것에 대한 바로가기다.
- 웹 브라우저에서 최상위 개체는 window 개체이므로, JS 브라우저 환경에서 defaultView는 이 개체를 가리킴
- 최상위 개체가 없는 DOM이나 웹 브라우저 내에서 실행되지 않는 JS 환경(ex: Node.js)의 경우, 이 속성은 최상위 개체 영역에 접근할수 있게 해줌

#### 8. Element에서 ownerDocument를 사용하여 Document에 대한 참조 얻기
> 노드에서 ownerDocument 속성을 호출하면, 노드가 포함된 document에 대한 참조를 반환한다.
- ```javascript
    <iframe src="http://someFileServeredFromServerOnSameDomain.html"></iframe>

    <script>
    //<body>가 포함된 widnow.document를 얻음
        console.log(document.body.ownerElement);

    //iframe 내의 <body>가 포함된 widnow.document를 얻음
    console.log(window.frames[0].document.body.ownerElement);

    console.log(document.ownerDocument); //null 값 반환
    </script>
  ```