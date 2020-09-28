## Element 노드 인라인 스타일

> 모든 HTML element는 해당 element에 한정된 인라인 CSS 속성을 넣는 데 사용할 수 있는 style attribute를 가진다.

- ```javascript
  const divStyle = document.querySelctor("div").style;

  console.log(divStyle);
  //CSSStyleDeclaration {0="background-color", ...}가 출력됨
  ```

- style 속성이 문자열이 아닌 CSSStyleDeclaration 개체를 반환한다는 점에 유의
- CSSStyleDeclaration 개체에는 element의 인라인 스타일만이 포함된다.
  - 스타일시트에서 단계적으로 내려오면서 계싼된 스타일이 아니다

#### 1. 개별 인라인 CSS 속성 가져오기·설정·제거

> 인라인 CSS 스타일은 element 노드 개체에 존재하는 style 개체의 속성으로 각자 표현된다.<br>단순히 개체의 속성 값을 설정하는 것으로 element의 개별 CSS 속성을 가져오거나 설정, 제거하는 인터페이스가 제공되는 것

- ```javascript
  const divStyle = document.querySelector("div").style;

  //설정
  divStyle.backgroundColor = "red";
  divStyle.height = "100px";

  //가져오기
  console.log(divStyle.backgroundColor);
  console.log(divStyle.hiehgt);

  //제거
  divStyle.backgroundColor = "";
  divStyle.height = "";
  ```

- style 개체에 포함된 속성명에는 CSS 속성명에서 사용되는 일반적인 하이픈이 포함되지 않는다.
  - 하이픈을 제거하고 카멜케이스(camelCase)를 사용하면 된다.
- 측정 단위가 필요한 CSS 속성의 경우, 적절한 단위를 포함시켜야 한다.
  - 문서가 포준 모드로 렌더링될 때에는 측정단위가 반드시 필요하며, 그렇지 않은 경우에는 무시된다.
- style 개체는 CSSStyleDeclaration 개체로 개별 CSS 속성에 대한 접근뿐만 아니라 element 노드의 개별 CSS 속성을 조작하는데 사용되는 <Br> setPropertValue(propertyName), getPropertyValue(propertyName,value), removeProperty() 메서드에 대한 접근도 제공해준다.
- ```javascript
  const divStyle = document.querySelector("div").style;

  //설정
  divStyle.setProperty("background-color", "red");
  divStyle.setProperty("border", "1px solid black");

  //가져오기
  console.log(divStyle.getPropertyValue("background-color"));
  console.log(divStyle.getPropertyValue("border"));

  //제거
  divStyle.removeProperty("background-color");
  ```

- setProperty()와 getPropertyValue() 메서드에 전달되는 속성명은 하이픈이 포함된 CSS 속성명을 사용한다.

#### 2. 모든 인라인 CSS 속성 가져오기·설정·제거

> CSSStyleDeclaration 개체의 cssText 속성과 getAttribute() 및 setAttribute() 메서드를 사용하면<br> JS문자열을 사용하여 style attribute의 전체 값을 가져오고, 설정 및 제거할수있다.

- ```javascript
  const div = document.querySelector("div");
  const divStyle = div.style;

  //cssText를 사용하여 설정
  divStyle.cssText = "background-color:red;border:1px solid black; height:100px; width:100px;";
  //cssText를 사용하여 가져옴
  console.log(divStyle.cssText);
  //제거
  divSTyle.cssText = "";

  //setAttribute() 및 getAttribute()를 사용하는 것과 결과가 완전히 동일함
  div.setAttribute("style", "background-color:red;border:1px solid black;height:100px;width:100px;");
  //가져오기
  console.log(div.getAttribute("style"));
  //제거
  div.removeAttribute("style");
  ```

- style attribute값을 새로운 문자열로 바꾸는 것은 element의 style에 여러 변경을 수해앟는 가장 빠른 방법이다.

#### 3. getComputedStyle()을 사용하여 element의 계산된 스타일(계층화된 것을 포함한 실제 스타일) 가져오기

> element의 계층화된 CSS(즉 인라인 스타일시트, 외부 스타일시트, 브라우저 스타일시트가 계층화된 것)을 가져오려면 getComputedStyle()을 사용한다.<br> 이 메서드는 style과 유사한 읽기 전용의 CSSStyleDeclaration 개체를 제공한다.

- ```javascript
  const div = document.querySelector("div");

  console.log(window.getComputedStyle(div).backgroundColor);
  console.log(window.getComputedStyle(div).width);
  ```

- CSS 특수 계층을 준수한다.
  - 외부 CSS < 인라인 CSS
- getComputedStyles()에서 반환되는 CSSStyleDeclaration 개체는 읽기 전용이므로 값을 설정할 수 없다.
- 색상 값을 원래 지정된 방식과 상관없이 rgb(#,#,#) 형식으로 반환된다.
- CSSStyleDeclaration 개체에서 단축 속성은 계산되지 않으므로, 속성 접근 시 비단축 속성명을 사용해야함
  - margin(X) marginTop(O)

##### 4. class 및 id attribute를 사용하여 element의 CSS 속성을 적용 및 제거하기

> element 스타일을 조작할 때 가장 일반적인 패턴<br>setAttribute()와 classListadd()를 활용하여 class 및 id attribute 값을 설정해서 element에 스타일 규칙을 적용한다.

- removeAttribute()와 classList.remove()를 사용하여 이 CSS 규칙들을 제거 할 수도있다.
- ```javascript
  const div = document.querySelector("div");

  //설정
  div.setAttribute("id", "bar");
  div.classList.add("foo");

  //제거
  div.removeAttribute("id");
  div.classList.remove("foo");
  ```
