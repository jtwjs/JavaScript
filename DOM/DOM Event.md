## DOM 이벤트

> DOM의 이벤트는 DOM 내의 element, document 개체, window 개체와 관련되어 발생하는 사전 정의된 시점이나 사용자 정의 시점을 말한다.

- 이 시점은 통상적으로 사전에 결정되어 있으며, 이 시점이 발생할 때 실행될 기능(핸들러/콜백)을 연관시킴으로써 프로그래밍적으로 알 수 있다.
- 이 시점은 UI의 상태, JavaScript 프로그램을 실행하는 환경의 상태, 프로그램 자체의 상태에의해 발생된다.
- 이벤트를 설정하는 것은 인라인 attribute 이벤트 핸들러, 속성 이벤트 핸들러, addEventListener() 메서드를 사용하여 수행될 수 있다.
- ```javascript
    // 인라인 attribute 이벤트 핸들러 패턴
    <body onclick= "console.log('fire/trigger attribute event handler')">

    const elementDiv = document.querySelector('div');
    //속성 이벤트 핸들러 패턴
    elementDiv.onclick = function() {
        console.log('fire/trigger property event handler')
    };

    //addEventListener 메서드 패턴
    elementDiv.addEventListener('click',function(){
         console.log('fire/trigger property event handler')
    }, false);
  ```

- DOM에 프로그래밍적으로 이벤트를 연결하는 이 세 가지 패턴 모두 이벤트를 예약하는 것이지만, addEventListener()만이 견고하고 조직화된 솔루션을 제공한다.
- 인라인 attribute 이벤트 핸들러는 JavaScript와 HTML을 혼합하게 되는데, 이 둘을 분리해서 유지하는 것이 가장 바람직하다.
- 속성 이벤트 핸들러를 사용할 때의 단점은 한번에 한개의 값만 이벤트 속성에 할당할수 있다는 것이다.
  - 이벤트 속성 값으로 할당할 때 하나 이상의 속성 이벤트 핸들러를 DOM에 추가할수 없다는 것
- 속성 이벤트 핸들러를 인라인으로 사용하면, 이벤트가 호출하는 함수의 영역 체인을 활용하려는 시도는 영역 문제를 겪을 수 있다.

### 1. DOM 이벤트 유형

#### 사용자 인터페이스 이벤트

- load
  - HTML 페이지, 이미지, cSS frameset, &#60;object&#62;,JavaScript 파일이 로드될 때 발생
- unload
  - user agent가 리소스(document,element,defaultView)나 종속 리소스(이미지,CSS,파일)를 제거할 때 발생
- Abort
  - 리소스가 완전히 로드되기 전에 로드를 중지할 때 발생
- error
  - 리소스 로드가 실패했거나, 문맥 상 해석이 불가능 할 때 발생
- resize
  - 문서 뷰의 크기가 변경되었을 때 발생
- scroll
  - 사용자가 문서나 element를 스크롤할 때 발생
- context menu
  - Element를 오른쪽 클릭시 발생

#### Focus 이벤트

- blur
  - 마우스나 탭을 통해 element가 포커스를 잃었을 때 발생
- focus
  - element가 포커스를 받았을 때 발생
- focusin
  - 이벤트 대상이 포커스를 받으려고 하나 아직 포커스가 전환되기 이전일 때 발생.
  - 이 이벤트는 focus 이벤트 직전에 일어난다.
- focusout
  - 이벤트 대상이 포커스를 잃으려고 하나 아직 포커스가 전환되기 이전일 때 발생.
  - 이 이벤트는 blur 이벤트 직전에 일어난다.

#### Form 이벤트

- change
  - 컨트롤이 입력 포커스를 잃고 포커스를 얻은후 값이 변경되었을 때 발생
- reset
  - 폼이 리셋될 때 발생
- submit
  - 폼이 전송될 때 발생
- select
  - 사용자가 input 및 textarea를 비롯한 텍스트 필드에서 텍스트를 선택할 때 발생

#### Mouse 이벤트

- click
  - element 위에서 마우스 포인터를 클릭할 때(혹은 Enter 키를 눌럿을 때) 발생
  - 동일한 스크린 위치에서의 mousedown 및 mouseup으로 정의된다.
  - 이 이벤트들의 순서는 mousedown>mouseup>click
  - click 이벤트는 dbclick 이벤트에 후속해서도 발생된다.
- dbclick
  - 마우스 포인터를 element 위에서 두 번 클릭할 때 발생
- mousedown
  - 마우스 포인터를 element에서 눌렀을 때 발생
- mouseenter
  - 마우스 포인터가 element나 하위 element 중 하나의 경계 내로 들어올 떄 발생
  - mouseover와 유사하지만, 버블링되지 않으며 포인터 장치가 element에서 하위 element중 하나의 경계로 이동될 때 전파되지 않아야한다
- mouseleave
  - 마우스 포인터가 element 및 하위 element의 경계를 벗어 날 때 발생
    - mouseout과 유사하지만 버블링되지 않으며 포인터 장치가 element에서 하위 element중 하나의 경계로 이동될 때 전파되지 않아야한다
- mousemove
  - 마우스 포인터가 element 위에서 이동할 때 발생된다.
  - 각 마우스 이동에 대해 단일 이벤트가 아닌 여러 개의 연속된 mousemove 이벤트가 발생되어야 한다.
- mouseout
  - 마우스 포인터가 element의 경계를 벗어날 때 발생됨
- mouseup
  - element 위에어 마우스 포인터 버튼을 땔 때 발생
- mouseover
  - 마우스 포인터를 element 위에서 움직일 떄 발생

#### Wheel 이벤트

- wheel(브라우저에서는 mousewheel)
  - 마우스 휠이 축을 따라 회전하거나 상응되는 입력장치가 해당 동작을 흉내낼 때 발생한다.

#### Keyboard 이벤트

- keydown
  - 키가 처음 눌려질 때 발생
  - 문자 코드를 발생시키지 않는 키를 포함한 모든 키에서 발생됨
  - 키 매핑이 수행된 이후, 입력 수단 편집기가 keypress를 받기 이전에 발생됨
- keypress
  - 문자값을 발생시키는 키가 처음 눌려질 떄 발생됨
  - 키 매핑이 수행된 이후, 입력 수단 편집기가 keypress를 받기 이전에 발생됨
- keyup
  - 키를 뗄 때 발생됨
  - 항상 관련된 keydown 및 keypress이벤트에 후속한다.

#### Touch 이벤트

> Touch 이벤트는 통상적으로 iOS, Android,BlackBerry 브라우저, 혹은 터치 모드로 전환할 수 있는 브라우저(ex: Chrome)에서만 지원된다.

- touchstart
  - 사용자가 터치 표면에 터치 포인트를 두었을 때 발생
- touchend
  - 사용자가 터치 표면에서 터치 포인트를 제거 했을 때 발생되는 이벤트
- touchmove
  - 사용자가 터치 표면을 따라 터치 포인트를 이동할 때 발생되는 이벤트
- tocuenter
  - 터치 포인트가 DOM element에서 정의된 상호작용 영역으로 이동했을 때 발생되는 이벤트
- touchleave
  - 터치 포인트가 DOM element에서 정의된 상호작용 영역을 벗어날 때 발생되는 이벤트
- touchcancel
  - 동기 이벤트나 터치 취소 동작과 같이 구현에따라 다른 수단에의해 터치 포인트가 방해를 받거나,<br>문서 창을 떠나 사용자 상호 작용을 처리할 수 있는 비문서 영역으로 터치 포인트를 옮겼을 때 발생되는 이벤트

#### Window, &#60;body&#62;, 프레임 관련 이벤트

- afterprint
  - 개체와 관련된 문서가 인쇄되거나 인쇄 미리보기된 직후에 발생
- beforeprint
  - 개체와 관련된 문서가 인쇄되거나 인쇄 미리보기되기 직전에 발생
- beforeunload
  - 문서가 언로드되기 전에 발생
- hashchange
  - URL에서 숫자 기호(#)에 해당하는 부분이 변경될 때 발생
- message
  - 사용자가 문서 간 메세지를 보내거나 worker로부터 postMessage로 메시지를 전송하는 경우 발생
- offline
  - 브라우저가 오프라인으로 동작할 때 발생
- online
  - 브라우저가 온라인으로 동작할 때 발생
- pagehide
  - 세션 이력 항목에서 이동해갈 때 발생
- pageshow
  - 세션 이력 항목으로 이동해왔을 때 발생

#### Document 관련 이벤트

- readystatechange
  - readyState가 변경될 때 발생
- DOMContentLoaded
  - 웹 페이지의 해석은 끝났지만, 모든 리소스가 완전히 다운로드되기 전에 발생

#### Drag 이벤트

- drag
  - 드래그 동작 도중에 원본 개체에서 계쏙 발생된다.
- dragstart
  - 사용자가 선택한 텍스트나 선택된 개체를 드래그하기 시작할 때 원본 개체에서 발생됨
  - 사용자가 마우스를 드래그할 때는 ondragstart 이벤트가 먼저 발생된다.
- dragend
  - 사용자가 드래그 동작을 종료하면서 마우스를 놓을 떄 원본 개체에서 발생
  - 대상 개체에서는 ondragleave 이벤트 다음에 ondragend 이벤트가 마지막으로 발생됨
- dragenter
  - 사용자 개체를 유효한 드롭 대상으로 드래그했을 때 대상 element에서 발생됨
- dragleave
  - 사용자가 드래그 동작 도중에 유효한 드롭 대상에서 벗어나도록 마우스를 옮겼을때 대상 개체에서 발생됨
- dragover
  - 사용자가 개체를 유효한 드롭 대상위로 드래그 하는 동안 대상 element에서 계쏙해서 발생된다.
- drop
  - 드래그-앤-드롭 동작 도중 마우스 버튼을 떼었을때 대상 개체에서 발생된다.
  - ondrop 이벤트는 ondragleav와 ondragend 이벤트 이전에 발생된다.

### 2. 이벤트 흐름

> 이벤트가 발생되면 DOM을 따라 흘러가거나 전파되면서 다른 노드와 JavaScript 개체들에서 동일한 이벤트를 발생시킨다.
> <br> 이벤트 흐름은 캡처 단계나(즉, DOM 트리 줄기 -> 가지)이나 버블링 단계(DOM트리 가지 -> 줄기), 혹은 양쪽 모두로 발생하도록 프로그래밍 할 수 있다.

- 캡처단계는 이를 지원하지 않는 브라우저가 있기 때문에 널리 사용되지는 않는다.
  - 최신 브라우저들에서는 캡처 단계 사용을 지원하고 있으므로, 예전에 신뢰할 수 없다고 간주된 것도 요즘에는 가치 있을수 있다.
- 통상적으로 이벤트는 버블링 단계 도중에 호출되는 것으로 가정된다.

### 3. element 노드, window 개체, document 개체에 이벤트 수신기를 추가하기

> addEventListener() 메서드는 모든 Element 노드, window 개체, document 개체에 존재하며, DOM 및 브라우저 개체모델(BOM)과 관련된 JavaScript개체뿐만 아니라 HTML 문서의 일부에도 이벤트 수신기를 추가할 수 있는 기능을 제공한다.

- addEventListener() 메서드는 세 개의 인수를 받는다.
  - 첫번째 인수: 수신할 이벤트 형식
    - 이벤트 핸들러에서 필요로하는 "on"접두어를 가지지 않는다.
  - 두번쨰 인수: 이벤트가 발생했을때 호출되는 함수
  - 세번쨰 인수: 이벤트가 이벤트 흐름의 캡처단계에서 발생될지, 버블링 단계에서 발생될지를 가리키는 Boolean 값
    - true: 캡쳐단계
    - false: 버블링단계
    - defualt값은 flase(버블링단계)이다.

### 4. 이벤트 수신기 제거하기

> 원래 수신기가 익명함수로 추가되지 않았다면, removeEnvetListener() 메서드를 사용하여 이벤트 수신기를 제거 할 수 있다.

- addEventListener() 메서드를 사용하여 추가된 익명 함수는 제거가 불가능하다.

### 5. 이벤트 개체에서 이벤트 속성 얻기

> 기본적으로, 이벤트에서 호출되는 핸들러나 콜백 함수에는 이벤트와 관련된 모든 정보를 가지고 있는 매개변수가 전송된다.

- ```javascript
  document.querySelector("div").addEventListener("click", function (event) {
    Object.keys(event)
      .sort()
      .forEach(function (item) {
        console.log(item + " = " + event[item]); //이벤트 속성 및 값을 출력
      });
  });
  ```
- 각 이벤트는 이벤트 형식에 따라 약간 다른 속성을 가질 수 있다.
  - ex: MouseEvent, keyboardEvent, WheelEvent
- event 개체는 stopPropagation(), stopImmediatePropagation(), preventDefault()메서드도 제공됨
  - stopPropagation(): 부모태그로의 이벤트 전파를 stop 중지시킨다.
  - stopImmediatePropagation(): 같은 이벤트에서 다른 리스너들이 불려지는것울 막음
  - preventDefault(): 해당 이벤트 외에 별도의 브라우저 행동을 막기위해 사용
- envet라는 인수명은 아무이름이나 써도 상관없으며, e나 evt로 쓰는것도 흔히볼수 있다.

### 6. addEventListener() 사용 시 this의 값

> addEventListener() 메서드에 전달되는 이벤트 수신기 함수 내부에서 this 값은 이벤트가 연결된 노드나 개체에 대한 참조가 된다.

- ```javascript
  document.querySelector("div").addEventListener("click", function () {
    //'this'는 이벤트 수신기가 연결된 element나 노드가 된다.
    console.log(this); // '<div>' 가 출력됨
  });
  ```
- 이벤트 흐름의 일부로 이벤트가 호출되면, this 값은 이벤트 수신기가 연결된 노드나 개체의 값이 된다.
- ```javascript
  //<div>나 <body>를 클릭해도, this 값은 <body> element 노드로 유지된다.
  document.body.addEventListener("click", function () {
    console.log(this); //<body>..</body>가 출력됨
  });
  ```
- **event.currentTarget** 속성을 사용하여 this 속성이 제공하는 것과 동일하게 이벤트 수신기를 호출하는 노드나 개체에 대한참조를 얻을 수 있다.
- ```javascript
  document.addEventListener("click", function (event) {
    console.log(event.currentTarget); //'#document'가 출력됨
    console.log(this); //출력값 동일
  });
  ```

### 7. 이벤트가 호출된 노드나 개체가 아닌 이벤트의 대상을 참조

- **event.target**
  - 이벤트 흐름에서 이벤트의 진원지를 알려할 때 사용
- ```javascript
  document.body.addEventListener("click", function (event) {
    //<div>가 클릭되면, <div>가 이벤트 흐름에서 대상이므로 '<div>가 출력된다.
    console.log(event.target);
    /*<body> element가 클릭되면, 이벤트 대상과 이벤트 수신기가 호출된 element 노드가 동일하게 된다.
    따라서 event.target, this, event.currentTarget은 모두 <body> element에 대한 참조를 가지게 된다.*/
  });
  ```

### 8. preventDefault()를 사용하여 기본 브라우저 이벤트 취소하기

> 브라우저는 HTML 페이지를 사용자에게 보여줄 때 사전에 구성된 여러 이벤트를 제공한다.<br>예를 들어, 링크 클릭(URL 이동), 체크박스 클릭(박스 체크표시),텍스트 필드에 텍스트 입력(텍스트가 입력되어 스크린에 표시)하는 것도 마찬가지다.<br>이러한 브라우저 이벤트는 브라우저 기본 이벤트를 호출하는 노드나 개체에 연결된 이벤트 핸들러 함수 내부에서 preventDefault() 메서드를 호출해서 막을 수 있다.

- ```javascript
  document.querySelector("a").addEventListener("click", function (event) {
    event.preventDefault(); // url을 로드하는 <a>의 기본 이벤트를 중지 시킴
  });
  ```
- preventDefault() 메서드는 이벤트가 전파되는것을 중지시키지 않는다.
- 이벤트 수신기의 끝부분에서 false를 반환하면 preventDefulat() 메서드를 호출하는 것과 동일한 결과를 갖는다.

### 9. stopPropagation()을 사용하여 이벤트 흐름을 중지시키기

> 이벤트 핸들러/수신기 내에서 stopPropagation()을 호출하면 캡처/버블링 이벤트 흐름단계가 중지되지만,<br>노드나 개체에 직접 연결된 이벤트는 여전히 호출된다.

- ```javascript
  document.querySelector("div").addEventListener("click", function (event) {
    console.log("invoked all click event attached, but cancel capture and bubble event phases");
    event.stopPropagation();
  });

  /*<div>가 클릭되어도 <div>에 연결된 이벤트에서 캡처 및 버블 흐름을 중지시켯기에, 아래 이벤트는 호출되지 않음*/
  document.body.addEventListener("click", function () {
    console.log("What, denied from being invoked!");
  });
  ```

- &#60;div&#62;에 연결된 다른 click 이벤트는 정상적으로 호출된다.
- 추가적으로, stopPropagation()은 기본 이벤트를 막지 않는다.

### 10. stopImmediatePropagtion()을 사용하여 동일한 대상의 이벤트 흐름뿐만아니라 다른 유사이벤트도 중지시키기

> 이벤트 흐름 단계를 중지시키는 것(즉 stopPropagtion())뿐만 아니라, stopImmediatePropagation() 메서드를 호출한 이벤트 수신기 이후에 연결되어 호출되는 이벤트 대상의 다른 유사한 이벤트도 중지시킨다.

- ```javascript
  // 첫번쨰 이벤트 연결
  document.querySelector("div").addEventListener("click", function () {
    console.log("1");
  });

  //두번째 이벤트 연결
  document.querySelector("div").addEventListener("click", function (event) {
    console.log("2");
    event.stopImmediatePropagation();
  });

  /*세 번째 이벤트가 연결되나, 앞에서 stopImmediatePropagation()에 호출되어 이 이벤트가 발생되지 않는다.*/
  document.querySeletor("div").addEventListener("click", function () {
    console.log("3");
  });

  /*stopPropagation이 호출된 것처럼 이벤트 흐름 역시 취소된다.*/
  document.body.addEventListener("click", function () {
    console.log("4");
  });
  ```

- stopImmediatePropagation()을 사용하더라도 기본 이벤트는 막지 않는다.
  - preventDefault()를 호출해야만 이 이벤트를 막을수 있다.

### 11. 사용자 정의 이벤트

> 개발자는 사전 정의된 이벤트 형식만으로 제한받지 않는다.<br>addEventListener() 메서드를 document.createEvent(), initCustomEvent(), dispatchEvent()와 조합해서 사용하면 사용자 정의 이벤트를 연결해서 호출할 수 있다.

- ```javascript
  const divElement = document.querySelector("div");
  //사용자 정의 이벤트 생성
  const cheer = document.createEvent("CustomEvent"); // 'CustomEvent' 매개변수가 필요함

  //사용자 정의 이벤트에 대한 이벤트 수신기 생성
  divElement.addEventListener("goBigBlue", function (event) {
    console.log(event.detail.goBigBlueIs);
  });

  /*initCustomEvent 메서드를 사용하여 사용자 정의 이벤트를 상세하게 설정한다.
  initCustomEvent의 매개변수는 event, bubble?, cancelable?, event.detail로 전달될 값이다*/
  cheer.initCustomEvent("goBigBlue", true, false, { goBigBlueIs: "its gone!" });

  //dispatchEvent를 사용하여 사용자 정의 이벤트를 호출
  divElement.dispatcchEvent(cheer);
  ```

- IE9는 initCustomEvent() 에서 4번째 매개변수를 필요로 하며, 선택이 아니다.
- DOM4 사양서에서는 사용자 정의 입네트의 주기를 단순화시켜주는 CustomEvent()생성자가 추가되었지만 IE9는 지원되지않음

### 12. 마우스 이벤트 시뮬레이션/트리거링

> 이벤트를 시뮬레이션하는 것은 사용자 정의 이벤트와 별반 다를 바 없다.
> <Br> 마우스 이벤트를 시뮬레이션하려면, Document.createEvent()를 사용하여 MouseEvent를 생성한 후 initMouseEvent()를 사용하여 발생할 마우스 이벤트를 구성한다.<br> 다음으로, 이벤트를 시뮬레이션하고자 하는 element에 전달한다.

- ```javascript
  const divElement = document.querySelctor("div");

  //시뮬레이션할 click 이벤트를 구성
  divElement.addEventListener("click", function (event) {
    console.log(Object.keys(event));
  });

  //시뮬레이션된 'click' 마우스 이벤트 생성
  const simulateDivClick = document.createEvent("MouseEvents");

  /*initMouseEvent(type,bubbles,cancelable,view,detail,screenx,screeny,clientx,clienty,ctrlKey,altKey,shiftKey,metaKey,button,relatedTarget)*/
  simulateDivClick.initMouseEvent(
    'click',true,true,document,defaultView,0,0,0,0,0,false,false,false,0,null,null);

    //시뮬레이션된 click 이벤트 발생
    divElement.dispatchEvent(simulateDivClick);
  )
  ```

### 13. 이벤트 위임

> 이벤트 위임(delegate)은 간단히 말해 이벤트 흐름을 활용하여 단일 이벤트 수신기가 여러 개의 이벤트 대상을 처리할 수 있게 하는 프로그래밍 행위를 말함

- ```javascript
  document.querySelector("table").addEventListener("click", function (event) {
    //대상이 td인 경우에만 코드를 실행
    if (event.target.tagName.toLowerCase() === "td") {
      console.log(event.target.textContent); //event.target을 사용하여 이벤트 대상(td)에 대한 접근을 얻는다.
    }
  });
  ```
- 이벤트 위임은 click, mousedown, mouseup, keydown, keyup, keypress 이벤트 형식을 처리할 때 활용하면 이상적이다.
- 이벤트 위임의 부수작용은 이벤트가 생성될 떄 이벤트에 응답하기 위해 이벤트 대상이 DOM 내에 있을 필요가 없다는 것
- 이벤트 위임을 구현함으로써, JavaSCript가 로드되어 해석된 후에 새로운 콘텐츠가 DOM에 추가되어도 즉시 이벤트에 응답할 수 있게 된다.
- 이것이 가능한 이유는 이벤트 흐름 때문이며, 특히 그중에서 버블링단계임을 잊지말자
