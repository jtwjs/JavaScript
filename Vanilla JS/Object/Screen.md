## Screen 객체

> Screen 객체는 사용자의 스크린에 대한 다양한 정보를 가지고 있따.

#### Screen 객체 속성

- **height**
  - 현재 사용자 모니터 화면의 총 높이를 반환(pixel)
  - window.outerHight: 현재 브라우저 창의 높이 반환
- **width**
  - 현재 사용자 모니터 화면의 총 너비를 반환(pixel)
  - window.outerWidth: 현재 브라우저 창의 너비 반환
- **availHeight**
  - 스크린의 높이를 반환한다.
  - window 작업표시줄(Taskbar) 제외
- **availWidth**
  - 스크린의 너비를 반환
  - window 작업표시줄(Taskbar) 제외
- **colorDepth**
  - 이미지를 표시하는 컬러 파레트의 비트의 깊이를 반환
  - 픽셀당 비트 수
- **pixelDepth**
  - 스크린의 컬러 해상도를 반환
  - IE9 이하 미지원, colorDepth와 같은 기능
