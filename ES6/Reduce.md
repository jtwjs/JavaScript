## Reduce

> 특정 값을 누적하면서 하나의 값으로 만들어나가는 함수(값을 축약하는 함수)

- ```javascript
  const num = [1, 2, 3, 4, 5];

  let total = 0;
  for (const n of num) {
    total = total + n;
  }
  log(total);
  ```

#### 함수형

- ```javascript
  const reduce = (f, acc, iter) => {
    for (const a of iter) {
      acc = f(acc, a);
    }
    return acc;
  };

  const add = (a, b) => a + b;

  log(reduce(add, 0, [1, 2, 3, 4, 5]));
  //15

  log(add(add(add(add(add(0, 1), 2), 3), 4), 5));
  //재귀적으로 받은 보조함수를 하나의 값으로 누적

  log(reduce(add, [1, 2, 3, 4, 5]));
  //초기값을 지정해주지 않을시
  log(reduce(add, 1, [2, 3, 4, 5]));
  //받아둔 첫번째 값을 기본값으로 변경 (내부적으로 변경함)

  const reduce = (f, acc, iter) => {
    if (!iter) {
      iter = acc[Symbol.iterator]();
      acc = iter.next().value;
    }
  };
  ```

- ```javascript
  const products = [
    { name: "반팔티", price: 15000 },
    { name: "긴팔티", price: 20000 },
    { name: "핸드폰케이스", price: 15000 },
    { name: "후드티", price: 30000 },
    { name: "바지", price: 25000 },
  ];

  log(reduce((total_price, product) => total_price + product.price, 0, prodcuts));
  ```
