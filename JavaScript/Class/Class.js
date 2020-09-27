class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`안녕 나는 ${this.name}이야`);
  }
}

const woong = new Person("Woong");

console.log(woong);
woong.sayHello();

class studnet extends Person {
  constructor(name, school, major) {
    super(name);
    this.school = school;
    this.major = major;
  }
}
