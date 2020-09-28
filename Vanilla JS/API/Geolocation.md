## Geolocation 객체

> Geolocation API는 사용자의 현재 위치를 가져오는 API로, 지도에 사용자 위치를 표시하는 등 다양한 용도로 사용 가능

- Geolocation API는 navigator.geolocation 객체를 통해 사용할 수 있다.
- geolocation 객체가 존재하는 경우 위치 정보 서비스를 지원하는 것이다.
- ```javascript
  if ("geolocation" in navigator) {
    /*위치 정보 사용 가능*/
  } else {
    /*위치 정보 사용 불가능*/
  }
  ```

#### 현재 위치 가져오기

> getCurrentPosition() 메서드를 호출해서 사용자의 현재 위치를 얻을 수 있다.

- **getCurrentPosition()**
  - 사용자의 위치를 탐지하는 비동기 요청을 초기화하고, 위치 관련 하드웨어에 최신 정보를 요청함
  - 위치를 알아낸 후에는 지정한 콜백 함수를 호출
  - 선택적으로, 이 과정 중 오류가 발생하면 호출할 오류 콜백을 두번 째 매개변수로 지정 가능
  - 세 번째 매개변수 역시 선택항목이며, 위치정보의 최대 수명, 요청의 최대 대기시간, 고정밀 위치정보 여부등의 옵션을 담은 객체
- getCurrentPosition()의 기본값에서는 최대한 빠르게 낮은 정밀도의 응답을 반환
  - 정확하지 않더라도 빠른정보가 필요한 상황에서 유용
- ```javascript
  navigator.geolocation.getCurrentPosition((position) => {
    doSomething(position.coords.latitude, position.coords.longitude);
  });
  ```

#### 현재 위치 추적하기

> 장치가 이동했거나 더 정확한 정보를 사용할 수 있어서 위치 정보가 바뀐 경우 호출할 콜백함수를 watchPosition() 메서드로 설정할 수 있으며,<br>getCurrentPosition()과 같은 매개변수를 받는다.

- 콜백은 계속해서 호출될 수 있으므로, 브라우저가 사용자의 이동 시, 또는<br>고정밀 위치 기술을 사용할 수 있는 시점에 새로운 위치 정보를 제공 할 수 있다.
- getCurrentPosition()을 먼저 호출하지 않고도 watchPosition()을 사용할 수 있다.
- ```javascript
  const watchID = navigator.geolocation.watchPosition((position) => {
    doSomething(position.coords.latitude, position.coords, longitude);
  });
  //위치 추적 요청의 고유 식별자를 나타내는 숫자값을 반환
  // 해당 식별자를 clearWatch() 메서드에 전달해서 추적을 종료할수 있음
  navigator.geolocation.clearWatch(watchID);
  ```

#### 위치 표현

> 사용자의 위치는 GeolocationPosition 객체를 담은 GeolocationCoordinates 객체를 사용하여 표현

- GeolocationPosition은 단 두가지만 가짐

  1. **coords**
     - GeolocationCoordinates 인스턴스를 갖고있음
  2. **DOMTimeStamp**
     - 위치 정보의 기록 시점을 나타냄

- ```javascript
  function success(position) {
    const latitude = position.coords.latitude; //위도
    const longitude = position.coords.longitude; //경도
  }
  ```

#### 오류 처리

> 사람이 읽을 수 있는 형태로 오류코드의 뜻을 설명한 message 속성을 갖는다.

- ```javascript
  function errorCallback(error) {
    alert(`ERROR(${error.code}): ${error.message}`);
  }
  ```
