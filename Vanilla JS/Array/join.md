## join() 문자열 병합

> Array.prototype.join은 매개변수로 구분자 하나를 받고 요소들을 하나로 합친 문자열을 반환한다.

- 이 매개변수가 생략됐을 때의 기본값은 쉼표이며, 문자열 요소를 합칠 때 정의되지 않은 요소, 삭제된 요소, null, undefined는 모두 빈 문자열로 취급함

- ```js
  const arr = [1, null, "hello", "world", true, undefined];
  delete arr[3];
  arr.join(); // "1,,hello,,true,"
  arr.join(""); //"1hellotrue"
  arr.join("--"); //"1 -- -- hello -- -- true --"
  ```
- 문자열 병합과 Array.prototype.join을 함꼐 쓰면 HTML `<ul>`리스트 같은 것도 만들 수 있다.
  - 이 때 빈 배열에 사용하면 빈`<li>`요소 하나만 나옴
- ```js
  const attribute = ["Nimble", "Perceptive", "Generous"];
  const html = "<ul><li>" + attributes.join("</li><li>") + "</li>/ul>";
  // html: "<ul><li>Nimble</li><li>Perceptive</li><li>Generous</li></ul>"
  ```
