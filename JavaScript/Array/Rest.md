## Rest

> (디스트럭처링을 통해 값을 받아오는) 객체나 배열을 받아오는 변수나 (값을 받아오는) 함수 파라미터에서 주로 쓰임

- 배열로서 받아온다.
- 부분집합을 만드는데 사용됨

- ```javascript
  const koreanUnivStudent = {
    name: "정태웅",
    major: "컴공",
    region: "성남",
  };

  const { name, ...rest } = koreanUnivStudent;
  console.log(rest); //{ major: '컴공', region: '서울' }
  ```
