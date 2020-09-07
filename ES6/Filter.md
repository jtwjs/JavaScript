## Filter

> 값을 걸러내는 함수

- ```javascript
  const products = [
    { name: "반팔티", price: 15000 },
    { name: "긴팔티", price: 20000 },
    { name: "핸드폰케이스", price: 15000 },
    { name: "후드티", price: 30000 },
    { name: "바지", price: 25000 },
  ];

  let under20000 = [];
  for (const p of products) {
    if (p.price < 20000) under20000.push(p);
  }
  log(...under20000);

  let over20000 = [];
  for (const p of products) {
    if (p.price > 20000) over20000.push(p);
  }
  log(...over20000);
  ```

#### 함수형

- ```javascript
  const filter = (f, iter) => {
    let res = [];
    for (const a of iter) {
      if (f(a)) res.push(a);
    }
    return res;
  };

  log(...filter((p) => p.price < 20000, products));

  log(...filter((p) => p.price > 20000, products));
  ```
