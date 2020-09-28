## Module(모듈)

> 파일 간에 주고 받을 수 있는 코드 조각, 코드 단위를 `모듈`이라 한다.
> <br> 즉 재사용 가능한 코드 단위이자 파일 간에 주고받을 수 있는 코드 단위를 모듈이라 칭한다.

- 모듈은 함수, 클래스, 배열, 객체가 될수도 있고 심지어 상수가 될수도 있다.

### 다른 파일로 나누어 작업할 수 있는 원리

1. 내보낸 녀석은 모듈이다.
2. 내보낸 녀석은 다른 파일에서 갖다 쓸 수 있다.
   - 내보내지 않은 코드는 갖다 쓸 수없다.
   - export: 내보내기
   - import: 갖고오기

### export의 기본사용

> 다른 파일에서 갖다 쓰기 위해서는 모듈을 내보내줘야하는데, 모듈을 내보내는 코드는 `export`이다.

- ```js
    const sayHello = (name) => console.log(`내 이름은 ${name}이야`);

    //export 하는방법 1
    export sayHello;

    /*export 하는방법 2
    함수를 정의할때 명시*/
    export const sayHello = (name) => console.log(`내이름은 ${name}이야 `);

    //함수뿐만아니라 상수, 배열, 객체, 클래스 등도 export 한 뒤 다른 파일에서 사용가능


    //상수 내보내기
    export const NAME = '정태웅';

    //배열 내보내기
    export let oddNumbers = [1, 3, 5, 7, 9];

    //클래스 내보내기
    export class Student {
        constructor(name){
            this.name = name;
        }
    }
  ```

#### export default

> `export`를 이용하여 하나 이상의 모듈을 내보낼 수 있다.<br> 즉, 여러 개의 모듈을 export 해줄 수 있는데 만일 `export`가 아닌 `export default`로 내보낸다면 "나는 이 파일에서 이 모듈 딱 하나만 내보낼거다"란 의미가 됨

- 파일 전체에서 내보낼 모듈이 하나뿐이라면 `export default`로 내보내길 권장

#### export as

> 내보낼 모듈의 이름을 모듈의 이름이 아닌 내가 지정한 이름으로 보내고 싶다면 `export 모듈 as 내가정한모듈이름`형식으로 내보내기 가능

- ```js
  sayHello = (name) => console.log(`내이름은 ${name}이야`);
  export default sayHello as myName;

  //여러 모듈을 다른 이름으로 보내고 싶을때
  export {sayHello as hihi, sayBye as goodBye};
  ```

### import

> export를 이용해 내보내준 모듈을 다른 파일에서 가져올 때 우리는 `import`를 이용함

- ```js
    import { 모듈(들) } from '모듈을_내보낸_파일'

    //ex
    import {sayHello} from './greetings.js'
    //동일한 파일이름이 존재할수있음으로 상대경로
  ```
