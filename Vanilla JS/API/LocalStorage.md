## LocalStroage

> 일정 시간 또는 영구적으로 값을 저장하고 싶은 경우에 WebStorage API

- 데이터를 사용자 로컬에 보존하는 방식
- 데이터를 저장, 덮어쓰기, 삭제 등 조작 가능
- JavaScript로 조작
- 모바일에서도 사용 가능

#### 쿠키와 차이점

- 유효 기간이 없고 영구적으로 이용 가능
- 5MB까지 사용 가능 (쿠키는 4KB)
- 필요할 때 언제든 사용 가능 (쿠키는 서버 접속시에 자동 송신)

#### LocalStorage 기본 구성

- 키(key)와 값(value)을 하나의 세트로 저장
- 도메인과 브라우저별로 저장
- 값은 반드시 문자열로 저장됨

### LocalStorage 사용방법

- ```javascript
  function init() {
    //localStorage 데이터 추가 방법 3가지
    localStorage.Test = "Sample";
    localStorage["Text"] = "Sample";
    localStorage.setItem("Text", "Sample");

    //localStorage 데이터 취득 방법 3가지
    const storage = localStorage.Test;
    const storage2 = localStorage["Test"];
    const storage3 = localStroage.getItem("Test");

    //localStorage 데이터 삭제
    localStorage.removeItem("Test");

    //모든 데이터 삭제
    localStorage.clear();
  }
  ```

#### SessionStorage와 차이점

- localStorage: 세션이 끊겨도 사용 가능
- sessionStorage: 같은 세션만 사용 가능
