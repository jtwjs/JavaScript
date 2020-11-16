# BABEL

JavaScript Compiler

babel은 JavaScript로 결과물을 만들어주는 컴파일러
`소스 대 소스 컴파일러(transpiler)`

### 설치

package.json에 babel 추가

```
npm install @babel/node
```

Babel CLI 설치

```
npm install --save-dev @babel/core @babel/cli
```

env preset 설치
함께 사용되어야 하는 Babel 플러그인을 모아둔 것

```
npm install --save-dev @babel/preset-env
```

확인

```
babel -v
```

설치 후 node 동작할 메인 폴더에 .babelrc를 추가하고 아랫 소스를 적어준다.

```js
//babel의 preset-env의 옵션을 사용하겠다는 뜻
{
    "presets" : ["@babel/preset-env"]
}
```

### 트랜스파일링

Babel을 사용하여 ES6+ 코드를 ES5 이하의 코드로 트랜스파일링하기 위해 npm script를 사용

package.json

```js
"scripts": {
    "build": "babel src/js -w -d dist/js"
  },
```

src/js 폴더(타깃폴더)에 있는 모든 ES6+ 파일들을 트랜스파일링한 후, 그 결과물을 dist/js 폴더에 저장한다.

- 사용한 옵션
  - w: 타깃 폴더에 있는 모든 파일들의 변경을 감지하여 자동으로 트랜스파일한다<br>(--watch 옵션의 축약형)
  - d: 트랜스파일링된 결과물이 저장될 폴더를 지정한다<br>
    (--out-dir 옵션의 축약형)

### babel 사용

```
npm run build
```
