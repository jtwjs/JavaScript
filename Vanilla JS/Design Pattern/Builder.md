## 빌더 패턴

> 빌더 패턴은 객체의 생성을 직관적이게 해줌

#### 예제

- ```js
  class Guest {
    constructor(name) {
      this.name = name;
    }
  }

  //또 다른 객체인 GuestBuilder를 만듦
  class GuestBuilder {
    constructor(name) {
      this.user = new Guest(name);
    }

    setAge(age) {
      this.user.age = age;
      return this;
    }

    setPhone(phone) {
      this.user.phone = phone;
      return this;
    }

    setNationality(nationality) {
      this.user.nationality = nationality;
      return this;
    }

    build() {
      return this.user;
    }
  }
  //Guest라는 객체에 직접적으로 접근하여 사용할 일이 없어짐

  const paper = new GuestBuilder("paper").setAge(26).build();

  console.log(paper);
  //Guest { name: 'paper', age: 26 }
  ```
