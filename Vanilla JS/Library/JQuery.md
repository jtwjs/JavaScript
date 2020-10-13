## 제이쿼리

> 제이쿼리는 DOM을 조작하거나 AJax 요청을 실행할 때 널리 쓰이는 라이브러리이다.
> <br> 제이쿼리로 할 수 있는 일은 모두 DOM API로도 할 수 있다.

- 제이쿼리의 세가지 장점
  1. 제이쿼리를 사용하면 브라우저 호환성을 걱정하지 않아도 된다.
  2. 제이쿼리가 제공하는 Ajax API는 무척 단순한 편
  3. 제이쿼리는 내장된 DOM API를 더 유용하고 단순하게 바꾼 메서드를 제공한다.

### 맥가이버 나이프, 달러 기호

> 제이쿼리는 자바스크립트에서 달로 기호를 식별자로 쓸 수 있다는 장점을 활용한 첫 번째 라이브러리중 하나

- 제이쿼리를 사용할 때는 jQeury나 \$를 사용

#### 제이쿼리 불러오기

> 제이쿼리를 불러오는 가장 쉬운 방법은 CDN을 이용하는 것

- `<script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>`

- 제이쿼리는 2.x 버전부터 인터넷 익스플로러 8 이하에 대한 지원을 중단했다.
  - 인터넷 익스플로러 구버전을 사용하려면 제이쿼리 1.x버전을 사용해야 한다.
  - 제이쿼리 2.x버전에서는 오래된 브라우저 버전을 포기하면서 훨씬 작고 단순해졌다.

#### DOM 기다리기

> 제이쿼리에서는 브라우저가 페이지를 완전히 읽고 DOM을 구축한 다음에만 호출되는 콜백 안에 코드를 작성해서 브라우저가 DOM을 구축하기도 전에 요소에 접근하려는 문제를 피할 수 있다.

- ```js
  $(document).ready(function () {
    //여기 있는 코드는 HTML을 모두 불러오고
    //DOM 이 구성된 다음 실행된다.
  });

  //단축표기법
  $(function () {
    /*...*/
  });
  ```

#### 제이쿼리로 감싼 DOM 요소

> 제이쿼리로 DOM을 조작할 때 가장 많이 쓰는 방법은 제이쿼리로 DOM 요소를 감싸는 방법이다.

- 제이쿼리로 DOM을 조작할 때 우선 DOM 요소 셋을 감싸는 제이쿼리 객체를 만든다.

- 제이쿼리 함수(\$, jQuery)로 DOM 요소 셋을 감싼 것을 제이쿼리 객체라고 한다.
  - 제이쿼리 함수를 호출할 때는 주로 CSS 선택자나 HTML을 사용함
- CSS 선택자로 제이쿼리를 호출하면 해당 선택자에 일치하는 제이쿼리 객체가 반환된다.

- ```js
  //document.,querySelectorAll()이 반환하는 컬렉션과 거의 비슷
  const $paras = $("p");

  //HTML로 제이쿼리를 호출하면 그에 맞는 DOM 요소가 새로 만들어짐 innerHTML 프로퍼티를 조작했을때와 비슷
  const $newPara = $("<p>Newly created paragraph...</p>");
  ```

#### 요소 조작

> 제이쿼리에는 text와 html 메서드가 있다. <br>이들은 각각 요소의 textContet, innerHTML 프로퍼티에 대응한다.

- ```js
  // 모든 문단의 텍스트를 똑같이 바꾸는 ex
  $("p").text("ALL PARAGRAPHS REPLACED");

  //html 메서드를 쓰면 DOM을 수정할 수 있다.
  $("p").html("<i>ALL</i> PARAGRAPHS REPLACED");
  ```

- 제이쿼리는 기본적으로 제이쿼리 객체에 들어있는 모든 요소에 같은 작업을 하면서 루프 실행을 대신해줌

- ```js
  $("p") //모든 문단에 일치
    .eq(2) //세번 째 문단(인덱스는 0으로 시작)
    .html("<i>THIRD</i> PARAGRPAH REPLACED");

  $("p").remove(); //요소를 제거
  ```

#### 제이쿼리 취소

> 제이쿼리 객체로 감싼 것을 취소하고 DOM 요소에 직접 접근하려면 get 메서드를 사용

- ```js
  const para2 = $("p").get(1); //두번쨰 <p> (0으로 시작하는 인덱스)

  const paras = $("p").get(); //<p> 요소가 모두 들어있는 배열
  ```

### Ajax

> 제이쿼리에는 Ajax 호출을 간편하면서도 세밀히 컨트롤 할 수 있는 메서드가 있다.

- 가장 널리 쓰이는 Ajax 호출을 간편하게 바꾼 get과 post 메서드도 있다.

  - 이들 메서드는 콜백을 지원하기도 하지만, 서버 응답을 처리할 때 권장하는 프로미스를 반환하기도 한다.

- ```js
  function refreshServerInfo() {
    const $serverInfo = $(".serverInfo");
    $.get("http://localhost:7070").then(
      //성공한 경우
      function (data) {
        Object.keys(data).forEach((p) => {
          $(`[data-replace="${p}"]`).text(data[p]);
        });
      },
      function (jqXHR, textStatus, err) {
        console.error(err);
        $serverInfo.addClass("error").html("Error connecting to server.");
      }
    );
  }
  ```
