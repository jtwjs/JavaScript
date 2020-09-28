function a(callback) {
  setTimeout(function () {
    console.log("2초 시간이 걸리는 a함수");
    callback();
  }, 2000);
}
function b() {
  console.log("a 다음에 실행되어야 하는 b함수");
}

a(b);
