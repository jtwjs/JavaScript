## DOM 에서의 JavaScript

> 외부 JavaScript 파일을 포함시키거나 페이지 수준의 인라인 JavaScript를 작성하여 HTML 문서 내에 JavaScript를 삽입할 수 있다.
> <br>기본적으로 외부 JavaScript 파일의 내용은 HTML 문서 내에 텍스트 노드로 들어간다.

- HTML 문서 내에 JavaScript를 삽입하는 두 방법 모두 &#60;script&#62; element 노드의 사용을 필요로 한다.

### 1. 기본적으로 JavaScript는 동기 방식으로 해석됨

> 기본적으로 DOM이 해석될 때 &#60;script&#62; element를 만나게 되면, 문서 해석을 중지하고, 렌더링 및 다운로드를 차단한 후, JavaScript를 실행한다.

- 이 동작은 블로킹을 발생시키며, DOM 해석이나 JavaScript 실행을 병렬적으로 수행할 수 없게 하므로, 동기 방식이라고 생각하면 된다.
- JavaScript가 HTML 문서 외부에 있는 경우 블로킹이 더 심해지는데. JavaScript를 해석하기 전에 먼저 다운로드해야 하기 때문
- HTML 페이지의 시작 부분에 여러 script element가 있는 경우, 각 스크립트가 순차적으로 다운로드되어 실행될 때까지는 아무런 다른 동작이 발생하지 않음

### 2. 외부 JavaScript의 다운로드 및 실행을 지연시키기 위해 defer를 사용

> defer를 사용하면, 일반적으로 웹 브라우저가 &#60;script&#62; 노드를 만나게 될 때 발생하는 것들을 간단하게 지연 가능

- ```html
  <!--<html> element 노드가 해석될때까지 지연시키고 차단이 발생하지  않도록 무시한다.>-->
  <script defer src="http://cdnjs.cloudfare.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>

  <script>
    //<html> element가 닫히기 전까지 jQuery가 존재하지 않으므로 true 출력
    console.log(window["jQuery"] === undefined); // true
    //모든것이 로드된 후 jQuery가 로드되어 해석되었따는 결론을 내릴수 있음
    document.body.onload = function () {
      console.log(jQuery().jquery);
    };
  </script>
  ```

- Defer는 Bollean attribute이지만 값을 가지지 않는다.

### 3. async를 사용하여 외부 JavaScript 다운로드 및 실행을 비동기로 실행하기

> &#60;script&#62; element는 웹 브라우저가 DOM을 생성할 때 &#60;script&#62; element의 순차적인 블로킹 특성을 재정의하기 위한 async 라는 attribute를 가지고 있다.
> <br> 이 attribute를 사용함으로써 브라우저에 HTML 페이지의 생성을 차단하지 않아야 하며, 순차적 로딩 역시 하지말라고 알려주는 것

- async attribute를 사용하면, 파일들이 병렬적으로 로드되며 다운로드가 끝난 순서대로 해석된다.
- ```javascript
  //차단하지 않고, 다운로드를 시작한 후 완료되면 파일을 해석한다.
  <script async src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js"></script>
  ```
- IE 10은 async를 지원하지만, IE 9에서는 지원되지 않는다.
- async attribute를 사용할 떄의 주요 단점은 JavaScript 파일이 DOM에 포함되는 순서와 다르게 해석된다는 것
- async는 boolean attribute지만 값을 가지지 않는다.
- &#60;script&#62; element에서 async attribute와 defer가 둘다 사용된 경우에는 async가 우선하게됨

### 4. 외부 JavaScript의 비동기 다운로드 및 해석을 강제화하기 위한 동적 &#60;script&#62;element 사용하기

> async attribute를 사용하지 않고 웹 브라우저에 JavaScript의 비동기 다운로드 및 해석을 강제화하려면, 프로그래밍적으로 외부 JavaScript 파일을 포함하는 &#60;script&#62; element를 생성해서 DOM에 삽입하는 기법이 널리 알려져 있다.

- ```javascript
  const underscoreScript = document.createElement("script");
  underscoreScript.src = "http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js";
  document.body.appendChild(underscoreScript);
  ```
- 동적 &#60;script&#62; element를 사용 시의 주요 단점은 JavaScript 파일이 DOM에 포함된 순서와 다르게 해석된다는 것

### 5. 비동기 &#60;script&#62;가 로드되는 시점을 알 수 있도록 onload 콜백을 사용

> &#60;script&#62; element는 외부 JavaScript 파일이 로드되어 실행될 때 수행되는 load 이벤트 핸들러(onload)를 지원한다.

- ```javascript
  const underscoreScript = document.createElement("script");
  underscoreScript.src = "http://cdnjs.Cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js";
  underscoreScript.onload = function () {
    console.log("underscore is loaded and executed");
  };
  ```
  - onload 이벤트는 onload가 지원될 경우에만 동작한다.
  - onerror, load, error를 사용할 수 도 있다.

### 6. DOM 조작 시 HTML에서의 &#60;script&#62;의 위치에 주의

> &#60;script&#62; element는 원래 동기방식이므로, HTML 문서의 &#60;head&#62; element에 두게 되면 실행되는 JavaScript가 &#60;script&#62;보다 뒤에있는 DOM의 오소에 의존적일 경우 타이핑 문제를 일으킨다.

- ```HTML
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <!-- 파싱을 중지 및 차단하고, js를 실행한후 재개한다.-->
    <script>
    //body element가 브라우저에 의해 해석되지도 않았고, DOM에도 존재하지 않아 null이므로 아직  조작할수없다.
        console.log(document.body.innerHTML);
    </script>
    </head>
    <body>
    </body>
    </html>
  ```
  - 이 때문에 많은 개발잗르은 모두 &#60;script&#62; element를 &#60;/body&#62; element이전에 두려고 시도한다.
    - DOM 준비 이벤트에 대한 의존성을 제거 할 수 있음

### 7. DOM 내의 &#60;script&#62; 목록 가져오기

> document 개체의 document.scripts 속성은 현재 DOM 내의 모든 script의 리스트를 제공한다.

- ```javascript
    Array.prototype.slice.call(document.scripts).forEach(function(elm){
        console.log(elm;
    }); //문서 내의 각 script element를 출력함
  ```
