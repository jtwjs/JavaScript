function sayHello(name) {
  //인자가 1개인 함수
  hi = "hello " + name + "!";
  return hi;
}

function addNumber(num1, num2) {
  //인자가 2개인 함수
  return num1 + num2; //반환
}

console.log(sayHello("woong"));
console.log(addNumber(2, 3));

function printAdd(num1, num2) {
  console.log(num1 + num2); //출력
}

printAdd(2, 3);

//익명함수
(function () {
  console.log("바로 실행되는 익명함수");
})();
