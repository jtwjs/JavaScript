## 싱글톤 패턴

> 싱글톤 패턴은 어떤 객체의 인스턴스를 단 하나만 생성하고 그 객체에 대한 모든 자원과 메소드를 공유하는 디자인 패턴을 말함

- 싱글톤 패턴을 사용하면 하나의 객체를 공유하게 한다.
- 하나의 객체를 공유해야 하는 상황 또는 공유해도 괜찮은 상황에서 싱글톤을 사용하면 이 객체를 사용할 때 `const user = new User()` 처럼 new를 매번 사용하여 새로운 객체를 생성하지 않아도 된다.
  - 매번 새로운 객체를 사용하지 않는다는 것은 메모리 할당이 적어진다는 뜻

#### 예제

- ```js
  class Room {
    constructor() {
      if (Room.instance === null) {
        //Room의 instance가 존재하지 않는다면 새로운 인스턴스를 생성
        this.guest = [];
        Room.instance = this; // new Room을 room201에 할당
      }
      return Room.instanace;
    }

    guestList() {
      console.log(this.guest);
    }

    checkIn(name) {
      this.guest.push(name);
    }

    checkOut(name) {
      this.guest.filter((guestName) => guestName !== name);
    }
  }

  const room201 = new Room();
  Object.freeze(room201); //이 클래스는 Room에 선언된 메소드로만 변경이 가능하도록 한다.

  module.exports = room201;
  //모듈화하여 내보냄
  ```

- ```js
  //runtime1.js
  const room201 = require("./Room");
  //rRoom.js에서 생성된 room201을 직접가져옴
  module.exports = () => {
    room201.checkIn("Kelly");
    room201.checkIn("Sarah");
    room201.guestList();
  };
  //runtime2.js
  const room201 = requrie("./Room");
  //rRoom.js에서 생성된 room201을 직접가져옴
  module.exports = () => {
    room201.checkIn("Kelly");
    room201.checkIn("Sarah");
    room201.guestList();
  };
  ```
