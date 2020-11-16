# ESLint

오래된 스웨터의 보푸라기 같은 것을 린트(Lint)라고 부른다. <br>
보푸라기가 많으면 옷이 보기 좋지 않은데 코드에서도 이런 보푸라기가 있다.<br>들여쓰기를 맞추지 않은 경우, 선언한 변수를 사용하지 않은 경우...

보푸라기가 있는 옷을 입을수 있듯이 이러한 코드로 만든 어플리케이션도 동작은 한다. 그러나 코드의 가독성이 떨어지고 점점 유지보수하기 어려운 애물단지가 되어버리기 일쑤다.

보푸라기를 제거하는 린트 롤러(Lint roller)처럼 코드의 오류나 버그, 스타일 따위를 점검하는 것을 린트(Lint)혹은 린터(Linter)라고 부른다.

### 기본 개념

ESLint는 ECMAScript 코드에서 문제점을 검사하고 일부는 더 나은 코드로 정정하는 린트 도구 중의 하나다.

코드의 가독성을 높이고 잠재적인 오류와 버그를 제거해 단단한 코드를 만드는 것이 목적이다.

코드에서 검사하는 항목은 크게 두가지

- 포맷팅
- 코드 품질

`포맷팅`은 일관된 코드 스타일을 유지하도록 하고 개발자로 하여금 쉽게 읽히는 코드를 만들어 준다.

이를테면 "들여쓰기 규칙", "코드 라인의 최대 너비 규칙"을 따르는 코드가 가독성이 더 좋다.

한편 `코드 품질`은 어플리케이션의 잠재적인 오류나 버그를 예방하기 위함이다. 사용하지 않는 변수 쓰지 않기, 글로벌 스코프 함부로 다루지 않기 등이 오류 발생 확률을 줄여준다.

### 설치

ESLint 설치

```
npm i --save-dev eslint
```

ESLint를 초기화

```
.\node_modules\.bin\eslint --init
```

환경설정 파일을 프로젝트 최상단에 생성

```js
//.eslintrc.js
module.exports = {};
```

빈 객체로 아무런 설정 없이 모듈만 만들었다. ESLint로 코드를 검사하면 아무런 결과를 출력하지 않고 프로그램을 종료한다.

Extensible Config

이러한 규칙을 여러개 미리 정해 놓은 것이 eslint:recommended 설정이다.

규칙 목록중에 왼쪽에 체크 표시되어 있는 것이 이 설정에서 활성화되어 있는 규칙이다.

ESLint에서 기본적으로 제공하는 설정 외에 자주 사용하는 두가지가 있다.

- airbnb
  - airbnb 설정은 `airbnb 스타일 가이드`를 따르는 규칙 모음이다.
  - `eslint-config-airbnb-base`패키지로 제공된다.
- standard
  - `자바스크립트 스탠다드 스타일`을 사용한다.
  - `eslint-config-standrad` 패키지로 제공된다.

### Pritter와 통합

eslint-config-prettier는 프리티어와 충돌하는 ESLint 규칙을 끄는 역할

```
npm i --save-dev eslint-config-prettier
```

설정파일의 extends 배열에 추가

```js
//.eslintrc.js
{
    extends: [
        "eslint:recommended",
        "eslint-config-prettier"
    ]
}

```

### 자동화

#### 에디터 확장도구

eslint 익스텐션 설치

.vscode/setting.json

```js
{
    "eslint.enable": true
}
```

에디터 설정중 저장시 액션을 추가할 수 있는데 ESLint로 코드를 정정할수 있다.

.vscode/setting.json

```js
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}
```
