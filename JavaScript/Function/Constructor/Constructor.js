function Computerclass(name, professor, classno) {
  this.name = name;
  this.professor = professor;
  this.classno = classno;
  this.printInfo = function () {
    console.log(this.namee + " 강의" + this.classno + " 분반 입니다. 교수님은 " + this.professor + "입니다.");
  };
}

const class1 = new Computerclass("운영체제", "정태웅", 2);

const class2 = new Computerclass("데이터베이스", "홍언택", 1);

console.log(class1);
console.log(class2);

console.log(class1.printInfo());
console.log(class2.printInfo());
