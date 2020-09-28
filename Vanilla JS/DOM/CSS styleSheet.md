## CSS Style Sheet

> 스타일시트는 외부 스타일시트를 포함하도록 HTMLLinkElement 노드를 사용하거나 <br>인라인 스타일 시트를 정의하도록 HTMLStyleElement 노드를 사용하여 HTML 문서에 추가된다.<br> HTML 문서에는 DOM 내에 이 두가지 Element 노드가 존재하며, 해당 노드들을 생성하는 생성자를 검증한다.

- 스타일시트가 HTML 문서에 추가되면 CSSStyleshhet 개체로 표현되며, 스타일시트 내부의 각 CSS 규칙은 CSSStyleRule 개체로 표현된다.
- ```javascript
  console.log(document.querySelector("#styleElement").sheet.constructor);

  console.log(document.querySelector("#styleElement").sheet.cssRules[0].constructor);
  ```

  - 스타일시트를 포함하고 있는 element를 선택(&#60;link&#62; 또는 &#60;style&#62;)하는 것은<br> 스타일시트 자체를 표현하는 실제 개체(CSStyleshhet)에 접근하는 것과 동일하지 않다.

  ### 1. DOM 내의 모든 스타일시트(CSSStylesheet 개체)에 접근하기

  > document.styleSheets는 HTML 문서 내에 명시적으로 연결되거나 내장된 모든 스타일시트 개체(CSSStylesheet 개체) 리스트에 접근할수있게 해줌

- ```javascript
  console.log(document.styleSheets.length);
  console.log(document.styleSheets[0]);
  ```
  - styleSheets는 다른 노드 리스트와 마찬가지로 라이브 상태다.
  - length 속성은 인덱스 0부터 시작하는 리스트에 포함된 스타일시트의 개수를 반환함

### 2. CSSStyleSheet의 속성 및 메소드

> styleSheets 리스트나 .sheet 속성을 통해 접근 가능한 CSSStylesheet 개체는 다음과 같은 속성과 메서드를 가짐

- disabled
- href
- media
- ownerNode
- parentStylesheet
- title
- type
- cssRules
- ownerRule
- deleteRule
- insertRule
- href, media, ownerNode, parentStylesheet,title, type은 읽기 전용 속성으로 이 속성들에는 새로운 값을 부여할수 없다.

### 3. CSSStyleRule 개요

> CSSStyleRule 개체는 스타일시트에 포함된 각 CSS 규칙을 표현한다.<br>기본적으로 CSStyleRule은 선택자에 연결되는 CSS 속성과 값에 대한 인터페이스다.

- ```javascript
    <style id="styleElement">
    body {
        background-color: #333;
        margin: 20px;
        }
    p {
        line-height: 1.4;
        color: blue;
    }
    </style>

    const sSheet = document.querySelector('#styleElement').sheet;
    console.log(sSheet.cssRules[0].cssText);
    // "body { background-color: red; margin: 20px;}"

    console.log(sSheet.cssRules[1].cssText);
    // "p { line-height: 1.4; color: blue; }"
  ```

### 4. CSSStyleRule의 속성 및 메서드

> cssRules 개체를 사용하여 스타일시트 내에 포함되는 규칙을 스크립트로 작성할 수 있다.

- cssText
- parentRule
- parentStylesheet
- selectorText
- style
- type

### 5. 스타일시트에 CSS규칙 삽입 & 삭제

> 스타일시트 내의 CSS 규칙은 0부터 시작하는 인덱스를 가진다. <br> 따라서 새로운 규칙을 인덱스 1에 삽입하면, 인덱스 1에 있는 현재 규칙은 인덱스 2가 된다.

- insertRule()
- deleteRule()

- ```javascript
  document.querySelctor("#styleElement").sheet.insertRule("p{color:red}", 1);

  //추가되었는지 확인
  console.og(documeny.querySelector("#styleElement").sheet.cssRules[1].cssText);

  //방금 추가한것 삭제
  document.querySelector("#styleElement").sheet.deleteRule(1);
  ```

  - 그냥 CSS 파일에서 변경하는것이 훨~~씬 편하다

### 6. 새로운 인라인 CSS 스타일시트 생성

> HTML 페이지가 로드된 후에 새로운 스타일시트를 즉석에서 만들려면, 새로운 &#60;style&#62;노드를 만들고 innerHTML을 사용하여 이 노드에 CSS 규칙을 추가한 후에 HTML 문서에 추가하면 된다.

- ```javascript
  const styleElm = document.createElement("style");
  styleElm.innerHTML = "body{color: red}";

  document.querySelector("head").appendChild(styleElm);
  ```

### 7. HTML 문서에 외부 스타일시트를 프로그래밍적으로 추가하기

> HTML 문서에 CSS 파일을 프로그래밍적으로 추가하려면, 적절한 attribute로 &#60;link&#62; element 노드를 생성해서 DOM에 추가한다.

- ```javascript
  //link 생성하고 속성 추가
  const linkElm = document.createElement("link");
  linkElm.setAttribute("rel", "stylesheet");
  linkElm.setAttribute("type", "text/css");
  linkElm.setAttribute("id", "linkElement");
  linkElm.setAttribute("href", "http://yui.yahooapis.com/3.3.0/build/cssreset/rest-min-css");

  //DOM에 추가
  document.head.appendChild(linkElm);

  //추가되었는지 확인
  console.log(document.querySelector("#linkElement"));
  ```

### 8. disabled 속성을 사용하여 스타일시트를 사용 가능/불가능하게 함

> CSSStylesheet 개체의 .disable 속성을 사용하면 스타일시트를 사용 가능하게 하거나 사용불가능하게 할 수 있다.

- ```javascript
  //현재 disabled 값(boolean)을 가져옴
  console.log(document.querySelector("#linkElement").disable); // false 반환

  //문서 내의 모든 스타일을 사용불가능하게 하도록 disabled 값을 설정
  document.querySelctor("#linkElement").disabled = true;
  ```

  - 사양상 Disalbe는 link나 style element에 존재하지 않는 attribute 이다.
  - HTML 문서 내에 이를 attribute로 추가하려고 시도하면 실패하게 됨
