# Karma

<b>여러 실제 브라우저에 JavaScript를 실행시킬 수 있게 해주는 간단한 도구</b>

따라서 JavaScript를 실행만 시켜주는 도구이므로 여기에 Jasmine같은 테스트 프레임워크를 붙여서 사용하는 것

### 설치

package.json에 karma 추가

```
npm install --save-dev karma
```

카르마 설정파일 생성

```
node_modules/.bin/karma init
```

카르마 플러그인 설치

```
npm i karma-jasmine jasmine-core karma-chrome-launcher --save-dev
```

### karma.conf.js

카르마 설정파일

```js
module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    files: ["./src/hello.js", "./test/hello.spec.js"],
    autoWatch: true,
    browsers: ["Chrome"],
  });
};
```

- frameworks
  - 테스트 프레임워크 이름을 설정하는 부분
- files
  - 테스트와 테스트 대상이 되는파일 목록을 나열
- autoWatch
  - 테스트 종료후 계속 파일 변화를 감지하면서 테스트를 자동으로 재실행하는 옵션
- browsers
  - 테스트할 브라우저를 설정하는 옵션

생성한 카르마 설정파일로 카르마를 실행하려면 세가지 카르마 플러그인을 추가로 다운받아야 한다.

- karma-jasmine
  - 카르마에서 자스민을 사용 가능
- jasmine-core
  - karma-jasmine은 카르마가 자스민을 사용할수 있도록 하는 어답터 역할만 한다.
  - 자스민 코드가 있는 jasmine-core를 추가해야 한다.
- karma-chrome-launcher
  - 테스트 브라우져로 크롬을 선택했으면 이 플러그인을 설치해서 카르마가 크롬을 사용할수 있도록 해야 한다.
