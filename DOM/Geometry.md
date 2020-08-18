## Element 노드 지오메트리와 스크롤링 지오메트리

> HTML 문서를 웹 브라우저에서 볼 때, DOM 노드가 해석되어 시각적인 모양으로 그려진다.<br>노드(대부분 element노드)는 브라우저에서 볼 수 있는 시각적인 표현 형태를 가지고 있다.

- 노드의 시각적인 형태와 지오메트리를 프로그래밍을 통해 살펴보고 조작하기 위해 일련의 API가 존재하는데 CSSOM View Module에 정의되어있다.
  - CSSOM View Module 사양에 있는 대부분의 속성(Scrollleft와 ScrollTop은 제외)은 읽기 전용이며 접근시마다 매번 계산된다.

#### 1. offsetParent를 기준으로 element의 offsetTop 및 offsetLeft 값을 가져오기

> 이 element 노드 속성들은 element의 바깥쪽 좌상단 경계로부터 offsetParent의 안쪽 좌상단 경계까지의 거리를 픽셀로 제공해줌

- offsetParent의 값은 가장 가까운 부모 element 중에서 CSS 위치 값이 static이 아닌 element를 검색하여 결정된다.
  - 아무 element도 발견되지 않으면, offsetParent의 값은 &#60;body&#62; element나 "document"에 해당하는 것이 된다.
- 대부분의 브라우저에서는 offsetParent가 &#60;body&#62;이고 &#60;body&#62;나 &#60;html&#62; element가 <br>눈에 보이는 margin, padding, boarder값을 가지는 경우 바깥쪽 테두리에서 안쪽 테두리까지의 측정이 제데로 되지 않는다.

#### 2. getBoundingClientRect()를 사용하여 뷰포트를 기준으로 element의 Top, Right, Bottom, Left 테두리 오프셋을 얻기

> 뷰포트의 좌상단 끝을 기준으로 element가 브라우저에서 그려질 때 element의 바깥쪽 테두리 위치를 얻을 수 있다.

- **getBoundingClientRect()**
  - top, right, bottom, left 속성/값뿐만 아니라 height와 width 속성/값도 가지고 있는 개체를 반환한다.
  - offsetHeight와 offsetWidth 속성을 사용해도 동일한 크기 값을 얻을 수 있다.

#### 3. 뷰포트에서 테두리를 제외한 element의 크기(패딩+내용) 얻기

> clientWidth와 clientHeight 속성은 테두리 크기를 제외하고 element의 내용과 패딩을 더해서 element의 전체 크기를 반환한다.

- **clientHeight**
- **cleientWidth**
- 패딩은 포함하되 테두리는 제외한 element의 높이와 너비를 얻는다.

#### 4. elementFromPoint()를 사용하여 뷰포트의 특정 지점에서 최상단 element 얻기

> elementFromPoint()를 사용하면 HTML 문서의 특정 지점에서 최상단 element에 대한 참조를 얻을 수 있다.

- 최상단 element설정이 없는 경우에는 문서 순서상 마지막인 것이 선택된다.
- ```javascript
  console.log(document.elemenetFromPoint(50, 50));
  ```

#### 5. scrollHeight와 scrollWidth를 사용하여 스크롤될 element의 크기를 얻기

> 스크롤될 높이와 너비를 제공해준다.

- ```javascript
  const div = document.querySelector("div");
  console.log(div.scrollHeight);
  console.log(div.scrollWidth);
  ```
- 스크롤될 노드가 스크롤 영역보다 작은 경우, 스크롤 가능한 영역 내에 포함된 노드의 크기를 판별하려면 clientHeight와 clientWidth를 사용한다.

#### 6. scrollTop과 scrollLeft를 사용하여 top 및 left로부터 스크롤될 픽셀을 가져오거나 설정하기

> scrollTop과 scrollLeft 속성은 스크롤 때문에 현재 뷰포트에서 보이지 않는 left나 top까지의 픽셀을 반환한다.

- left나 top까지 뷰포트에서 보이지 않는 내용을 픽셀로 측정한 것

#### 7. scrollIntoView()를 사용하여 element를 View로 스크롤하기

> 스크롤이 가능한 노드 내에 있는 노드를 선택하면, scrollIntoView() 메서드를 사용하여 선택된 노드가 view로 스크롤되도록 할 수 있다.

- ```javascript
  document.querySelector("content").children[4].scrollIntoView(true);
  ```
- scrollIntoView()메서드에 true를 전달하면 해당 메서드로 하여금 스크롤될 대상 element의 top으로 스크롤하라는 것이다.
  - true가 default 값이므로 매개변수는 주지 않아도됨
  - element의 bottom으로 스크롤시키고 싶다면 매개변수를 false로 한다.
