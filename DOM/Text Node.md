## Text Node

> HTML 문서에서 텍스트는 text 노드를 만들어내는 Text() 생성자 함수의 인스턴스로 표현된다.<br> HTML 문서가 해석될 때, HTML 페이지의 element 사이에 섞여있는 텍스트는 text 노드로 변환된다.

- ```javascript
    <p>Hi</p>

    const textHi = document,querySelector('p').firstChild
    console.log(textHi.constructor); // Text()
  ```

- Text() 생성자 함수가 text 노드를 생성
  - Text는 CharacterData, Node, Object로부터 상속받는다

#### 1. Text 개체 및 속성

- textContent
- splitText()
- appendData()
- deleteData()
- insertData()
- replaceData()
- subStringData()
- nomalize()
- data
- document.createTextNode()

#### 2. 공백도 Text 노드를 생성한다.

> 브라우저에 의해서나 프로그래밍 수단에 의해서 DOM이 생성될 때, 텍스트 문자뿐만 아니라 공백 역시 text 노드로 만들어진다.

- DOM에서 공백이나 텍스트 문자가 보통 text 노드로 표현된다는 점!
- 줄 바꿈도 text 노드로 간주된다.
- 일반적인 HTML 페이지는 상당한 수의 공백과 줄 바꿈 text 노드를 가진다.

#### 3. Text 노드 생성 및 삽입

> Text 노드는 브라우저가 HTML 문서를 해석해서 문서 내용을 기반으로 DOM이 구축될 때 자동으로 생성된다.

- createTextNode()를 사용해서 프로그래밍적으로 text노드를 생성할 수 도 있다.
- ```javascript
  const elementNode = document.createElement("p");
  const textNode = document.createTextNode("hi");

  elementNode.appendChild(textNode);
  ```

#### 4. data나 nodeValue로 text 노드 값 가져오기

> Text 노드로 표현되는 텍스트 값과 데이터는 .data나 nodeValue 속성을 사용하여 노드에서 추출할 수 있다.

- ```javascript
  <p>
    Hi, <strong>cody</strong>
  </p>;

  console.log(document.querySelector("p").firstChild.data); //Hi
  console.log(document.querySElector("p").firstChild.nodeValue); //Hi
  /*<p>가 두개의 Text노드와 두개의 element 노드(<strong>)을 가짐*/
  ```

- Text 노드에 포함된 문자의 길이를 가져오려면, 노드 자체 또는 노드의 실제 텍스트 값/데이터의 length 속성에 접근하면 된다.

#### 5. text 노드 조작하기

> 메서드를 상속받는 CharacterData 개체는 Text 노드의 하위 값을 조작하고 추출하기 위한 메서드를 제공한다.

- appendData()
- deleteData()
- insertData()
- replaceData()
- subStringData()

- ```javascript
  const pElementText = document.querySelector("p").firstChild;
  //추가
  pElementText.appendData("!");
  //삭제
  pElementText.deleteData(7, 5); //index
  //삽입
  pElementText.insertData(7, "Blue ");
  //수정
  pElementText.replaceData(7, 5, "Bunny ");
  //추출
  console.log(pElementText.substringData(7, 10));
  ```
- 조작 및 부분 추출 메서드들은 Comment 노드에서도 활용 가능

#### 6. 복수의 형제 텍스트 노드가 발생하는 경우

- 형제 Text 노드가 발생 가능한 두가지 경우
  - 텍스트 노드가 Element 노드를 포함할 경우
  - 코드로 생성한 element에 프로그래밍적으로 Text 노드를 추가할 때 발생

#### 7. textContent를 사용하여 마크업이 제거된 모든 자식 텍스트 노드를 반환하기

> textContnt 속성은 모든 자식 텍스트 노드를 가져오는 것뿐만 아니라,<br> 노드의 내용을 특정 Text 노드로 설정하는데도 사용가능

- ```javascript
    <body>
        <div>
            <h1>< Dude/h1>
            <p>you <strong>rock!</strong></p>
        </div>
    </body>

    document.body.textContent = 'you don\'t rock!';
    console.log(document.querySelector('div').textContent);
    /*you don't rock!이 출력됨*/
  ```

#### 8. textContent와 innerText간의 차이

> Firefox를 제외한 대부분의 최근 브라우저들은 textContent와 유사해보이는 innerText라는 속성을 지원함

- innerText에는 CSS가 반영된다.
  - 즉, 숨겨진 텍스트가 있을경우 innerText는 이 텍스트를 무시함
  - textContent는 무시하지 않는다.
- innerText는 CSS의 영향을 받으므로 리플로우(reflow)가 발생됨
- innerText는 &#60;script&#62;와 &#60;style&#62; 내에 포함된 Text노드를 무시
- textContent와 달리 innerText는 텍스트를 정규화해서 반환함
  - textContent는 문서 내에 있는것을 마크업만 제거해서 그대로 반환
- innerText는 비표준이고 브라우저에 국한된것으로 간주
  - textContent는 DOM 사양으로 구현
- innerText를 사용하고자 한다면, Firefox에 대한 우회방한이 있어야함

#### 9. normalize()를 사용하여 형제 텍스트 노드들을 단일 텍스트 노드로 결합

> 형제 Text 노드들은 통상적으로 텍스트를 DOM에 프로그래밍적으로 추가한 경우에만 나타남

- Element 노드를 포함하고 있지 않은 형제 Text 노드들을 제거하기 위해 `normalize()`를 사용
- DOM 내의 형제 텍스트 노드를 단일 Text 노드로 결합한다.
- ```javascript
  const pElementNode = document.createElement("p");
  const textNodeHi = document.createTextNode("Hi");
  const textNodeCody = document.createTextNode("Cody");

  pElementNode.appendChild(textNodeHi);
  pElementNode.appendChild(textNodeCody);

  console.log(document.querySelector("p").childNodes.length); //2가 출력
  documeny.querySelector("div").normalize(); //형제 텍스트노드들을 결합
  console.log(document.querySelector("p").childNodes.length); //1 출력
  ```

#### 10. splitText()를 사용하여 텍스트 노드를 분할

> Text 노드에서 splitText()를 호출하면 해당 텍스트 노드를 변경하고 <br>분할된 텍스트를 가진 새로운 Text 노드를 반환

- ```javascript
  <p>Hey Yo!</p>;
  //DOM으로부터 새로운 텍스트 노드를 반환
  console.log(document.querySelcetor("p").firstChild.splitText(4).data); //Yo! 출력

  //DOM에 남아있는 것
  console.log(document.querySelector("p").firstChild.textContent);
  //Hey가 출력
  ```
