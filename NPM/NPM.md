# NPM install

NPM(Node Package Manager)

`node.js`는 JavaScript 기반으로 구성된 서버사이드 서비스를 JavaSCript로 구현할수 있게 만든 런타임

`npm`은 `node.js` 기반의 모듈을 모아둔 집합 저장소이다.

### 설치

node.js만 설치하면 자동으로 설치가 된다.

[node.js 다운로드 페이지](http://www.nodejs.org)

```
정상적으로 다운받고 설치한 버전정보가 출력된다면 설치는 완료된 것
node -v
npm -v
```

### npm 기본 명령어

```
npm install <패키지명>
-g 전역설치

--save-dev
패키지(plugin)를 ./node_modules 디렉터리에 설치하고
./package.json 파일의 devDependencies 항목에 플러그인 정보가 저장된다
```

### 패키지 관리

npm에서 패키지 관리는 `package.json`이라는 파일로 관리한다

```
npm init
```

`package.json`은 프로젝트에 대한 명세라고 할수 있다. <br>
해당 프로젝트의 이름, 버전, 사용되는 모듈 등의 스펙이 정해져 있으며, 이 `package.json`을 통해 모듈 의존성 모듈 관리도 진행할 수 있다.<br>
만약 어떤 오픈 소스를 다운 받을 때 이 `package.json`만 있다면 해당 오픈 소스가 의존하고 있는 모듈이 어떤 것인지. 그리고 그 모듈들을 아래 명령어로 한 번에 설치할 수 있다.

```
npm install
```
