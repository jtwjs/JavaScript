## map()

> 배열 요소를 변형한다. <br> 일정한 형식의 배열을 다른 형식으로 바꿔야 한다면 map을 사용

- 사본을 반환하며 원래 배열은 바뀌지 않는다.
- ```js
  const cart = [
    { name: "Widget", price: 9.95 },
    { name: "Gadget", price: 22.95 },
  ];
  const names = cart.map((x) => x.name); //["Widget", "Gadget"]
  const prices = cart.map((x) => x.price); //[9.95, 22.95]
  const discountPrices = prices.map((x) => x * 0.8); // [7.96, 18.36]
  ```
- 콜백 함수는 각 요소에서 호출될 떄 요소 자체와 요소 인덱스, 배열 전체를 매개변수로 받는다.
  - 배열 매개변수는 그다지 유용하지 않다.
- ```js
  const items = ["Widget", "Gadget"];
  const prices = [9.95, 22.95];
  const cart = items.map((x, i) => ({ name: x, price: prcies[i] }));
  //cart: [{name: "Widget", price: 9.95}, {name: "Gadget", prices: 22.95}]
  //여기서 map은 다른 배열에서 정보를 가져와서 문자열로 이루어진 배열을 객체 배열로 변형함
  //객체를 괄호로 감싼이유는, 이렇게 하지 않으면 화살표 표기법에서 객체 리터럴의 중괄호를 블록으로 판단하기 때문
  ```
