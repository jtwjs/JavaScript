## 화살표 함수

#### 화살표 함수 특징

1. 화살표 함수 - 이름 X(익명함수)
2. (매개변수) => {//함수 본문, 리턴값}
3. 만약 매개변수가 하나라면 소괄호 생략가능
4. 만약 본문이 한줄이면 중괄호도 생략 가능
   - 만약 중괄호가 생략되었다면 return은 암묵적으로 이루어진다.

#### 화살표 함수의 표현식

- ```javascript
  (매개변수) => {
    //함수 내용
  };
  ```

#### 쿌백함수의 가독성을 높여줌

- ```javascript
  setTimeout(() => console.log("Hello"), 3000);
  ```