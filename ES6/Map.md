## map

> 다형성이 높다. 이터러블인 모든 값들은 map을 사용 가능, 제네레이터 함수 결과값들도 map 가능 (사실상 모든것들 map 가능)

- ```javascript
  const products = [
    { name: "반팔티", price: 15000 },
    { name: "긴팔티", price: 20000 },
    { name: "핸드폰케이스", price: 15000 },
    { name: "후드티", price: 30000 },
    { name: "바지", price: 25000 },
  ];

  let names = []; //이름
  for (const p of products) {
    names.push(p.name);
  }
  log(names);

  let prices = []; //가격
  for (const p of products) {
    prices.push(p.price);
  }
  log(prices);
  ```

#### 함수형

- ```javascript
  const map = (f, iter) => {
    let res = [];
    for (const a of iter) {
      res.push(f(a));
    }
    return res;
  };

  log(map((p) => p.name, products));

  log(map((p) => p.price, products));
  ```

### 이터러블 프로토콜을 따른 map의 다양성

- ```javascript
    log([1,2,3].map(a => a + 1));//2,3,4

    log(map(el => el.nodeName, document.querySelectorAll('*')));

    function *gen() {
        yield 2;
        if (false) yield 3;
        yield 4;
    }
    log(map(a => a * a, gen());//4,16

    let m = new Map();
    m.set('a', 10);
    m.set('b', 20);
    log(new Map(map(([k,a]) => [k, a * 2], m)));
    //['a', 20],['b',40]
  ```
