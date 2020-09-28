## setInterval / clearInterval

> 일정한 시간 간격으로 코드를 반복 실행하는 함수

- setInterval(함수, 시간간격(ms))
  - 첫번째 인자: 일정한 시간 간격으로 반복실행하고자 하는 코드정보
  - 두번째 인자: 시간 정보로 ms 단위로 설정(1초 === 1000)
- clearInterval(참조변수)
  - 생성한 타이머함수를 제거
- ```javascript
  const timer = setInterval(function () {
    console.log("Hello~");
  }, 1000);
  ```

### setTimeout() / clearTimeout()

- setTimeout(함수, 시간간격(ms))
- setInterval()함수와 사용방법은 같다.
- setInterval()함수와 차이점
  - setInterval()함수는 시간 간격마다 코드를 실행
  - setTimeout()함수는 지정한 시간간격에 코드가 **딱 한번 실행**
