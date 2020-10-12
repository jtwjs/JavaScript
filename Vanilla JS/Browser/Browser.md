## 브라우저의 자바스크립트

### 문서 객체 모델(DOM)

> DOM, 즉 문서 객체 모델은 HTML 문서의 구조를 나타내는 표기법인 동시에 브라우저가 HTML 문서를 조작하는 핵심이기도 하다.

- DOM은 트리 구조로 표현
  - DOM 트리는 노드로 구성됨
  - 루트 노드를 제외하면 모든 노드에 부모가 있으며, 자식 노드는 있어도 되고 없어도 된다.
  - 루트 노드는 문서이며 자식 노드는 `<html>` 요소 하나 뿐이다.
  - `<html>` 요소에는 자식으로 `<head>`요소와 `<body>`요소가 있다.
- DOM 트리의 모든 노드는 Node 클래스의 인스턴스이다.
  - Node 객체에는 트리 구조를 나타내는 parentNode와 childNodes 프로퍼티<br> 자신에 대한 프로퍼티인 nodeName과 nodeType 프로퍼티가 있다.
- DOM은 노드로만 구성된다.
  - 모든 노드가 HTML 요소는 아니다.
    - 문단 태그`<p>`는 HTML 요소지만 그 문단에 포함된 텍스트는 텍스트 노드 이다.
- DOM 메서드가 반환하는 컬렉션은 자바스크립트 배열이 아니라 HTMLCollection의 인스턴스로, 배열 비슷한 객체이다.
  - 이 컬렉션에 for루프를 사용할 수는 있지만 map,filter,reduce 같은 Array.prototype 메서드는 사용할 수 없다.
  - 확산 연산자를 쓰면 HTMLCollection을 배열로 바꿀 수 있다.

#### 용어

- 부모 노드
  - 직접적인 부모 (바로 윗단계)
- 자식 노드
  - 직접적인 자식
- 자손: 자식, 자식의 자식 등을 말함
- 조상: 부모, 부모의 부모 등을 말함

#### DOM 요소 조작

> textContent나 innerHTML을 수정하는 것은 파괴적인 작업이다.<Br> 이 프로퍼티를 수정하면 요소의 원래 콘텐츠는 전부 사라진다.

#### 요소 스타일링

> DOM API만 써도 요소 스타일을 정교하게 지정할 수 있지만, 요소 프로퍼티를 직접 수정하는 것보다 CSS 클래스를 이용하는 편이 더 좋다.
> <Br> 즉, 요소의 스타일을 바꾸고 싶다면 그에 맞는 CSS 클래스를 새로 만들고 그 클래스를 원하는 요소에 지정하는 것

#### 데이터 속성

> HTML5에서는 데이터(data-) 속성을 도입했다.<br> 이 속성을 사용해 HTML 요소에 임의의 데이터를 추가할 수 있다.<br>브라우저는 이 데이터를 완전히 무시하므로 자바스크립트에서 쉽게 요소에 관한 정보를 읽거나 수정할 수 있다.

- ```js
  const highlightActions = document.querySelectorAll('[data-action="highlight"]');
  highlightActions[0].dataset;
  //DOMStringMap {containg: "unique", action: "highlight" }
  /*dataset 프로퍼티
    DOMStringMap이라는 이름에서 짐작하듯이 DOM API는 데이터 속성의 값을 문자열 형태로 저장하므로 객체 데이터는 저장할 수 없다.*/

  //ex:) giraffe라는 단어가 들어있는 문단을 하이라이트하되 대소문자를 구분하여 찾으려고 한다면 다음과 같이 데이터 속성을 수정할 수 있다.
  highlightActions[0].dataset.container = "giraffe";
  highlightActions[0].dataset.caseSenstive = "true";
  ```

### 이벤트

> DOM API에는 200개 가까운 이벤트가 정의되어 있다.

- addEventListener는 이벤트를 추가하는 구식 방법인 'on' 프로퍼티를 대체할 목적으로 만들어 졌다.

#### 이벤트 카테고리

> MDN에는 뛰어난 모든 DOM 이벤트를 그룹으로 구별한 훌륭한 문서가 있다.

- 드래그 이벤트
  - dragstart, drag, dragend, drop 등의 이벤트를 통해 드래그 앤 드롭 인터페이스를 만들 수 있다.
- 포커스 이벤트
  - 사용자가 폼 필드 같은 편집 가능한 요소를 조작하려 할 때 반응 할수 있다.
  - 사용자가 입력필드를 클릭하거나, 탭을 누르거나, 터치하는 등 필드에 '들어갈 때' **focus** 이벤트가 발생하고<br> 다른곳을 클릭하거나, 탭을 다시 누르거나, 다른 곳을 터치해서 필드에서 '나올 때' **blur** 이벤트가 발생
  - 필드의 내용을 바꿀때는 **change** 이벤트가 발생
- 폼 이벤트
  - 사용자가 전송 버튼을 클릭하거나, 적절한 위치에서 엔터를 눌러 폼을 전송하면 submit 이벤트가 발생함
- 입력 장치 이벤트
- 미디어 이벤트
  - HTML5 비디오, 오디오 플레이어에 관련된 이벤트로 pause, play 등이 있다.
- 진행 이벤트
  - 브라우저가 콘텐츠를 불러오는 과정에서 발생
  - load: 브라우저가 요소와 그에 연관된 자원을 모두 불러왔을 때 발생
  - error: 자원을 사용할 수 없을 때, ex)이미지 링크가 꺠졋을 때 error 이벤트 발생
- 터치 이벤트
  - 장치 터치를 사용할 수 있는 장치를 세밀히 지원

### Ajax

> Ajax는 원래 비동기적 자바스크립트와 XML의 약어이다.
> <br>Ajax를 통해 서버와 비동기적으로 통신하면 페이지 전체를 새로 고칠 필요 없이 서버에서 데이터를 받아올 수 있다.
> <br>이 혁명적인 시스템은 2000년 초반 XMLHttpRequest의 도입으로 가능해졌고, 웹2.0이라 불리기도 했다.

- Ajax의 핵심 개념
  - 브라우저 자바스크립트에서 HTTP 요청을 만들어 서버에 보내고 데이터를 받는다.
  - 받는 데이터는 보통 JSON 형식
  - 그리고 브라우저에서 그 데이터를 사용한다.
- Ajax 역시 다른 웹페이지와 마찬가지로 HTTP 위에서 동작하지만, 페이지를 불러오고 렌더링하는 부담이 줄어들므로 웹 애플리케이션이 훨씬 빨라짐
- Ajax가 널리쓰이면서 교차 소스 자원 공유(CORS)라는 잠재적인 취약점이 들어났다.

- ```js
  function refreshServerInfo() {
    const req = new XMLHttpRequest();
    req.addEventListener("load", function () {
      //Ajax호출이 성공했을떄 발생할 load이벤트
      const data = JSON.parse(this.responseText);
      //this.responseText는 JSON이 들어있는 문자열이다.
      //JSON.parse를 써서 문자열을 객체로 바꾼다.

      //서버에서 반환한 객체를 키 기준으로 순회
      Object.keys(data).forEach((p) => {
        /*...*/
      });
    });
    req.open("GET", "http://localhost:7070", true); //서버 URL 넘김
    req.send(); //요청 실행
  }
  refreshServerInfo();
  ```
