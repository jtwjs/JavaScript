## WeakSet

> 위크셋은 객체만 포함할수 있으며, 이 객체들은 가비지 컬렉션의 대상이 된다.

- WeakMap과 마찬가지로 WeakSet도 이터러블이 아니므로 위크셋의 용도는 매우 적다.
- WeakSet의 실제 용도는 주어진 객체가 셋안에 존재하는지 아닌지를 알아보는 것뿐이라고 해도 과언이아님

- ```js
  const naughty = new WeakSet();

  const childern = [{ name: "Suzy" }, { name: "Derek" }];

  naughty.add(children[1]);

  for (let child of children) {
    if (naughty.has(child)) console.log(`Coal for ${child.name}!`);
    else console.log(`Presents for ${child.name}!`);
  }
  ```
