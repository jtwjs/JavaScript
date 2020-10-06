## 맵 (Map)

- ES6 이전에는 키와 값을 연결하려면 객체를 사용해야 했다.<br>객체를 이런 목적으로 사용하면 여러가지 단점이 생김
  1. 프로토타입 체인 때문에 의도하지 않은 연결이 생길 수 있다.
  2. 객체 안에 연결된 키와 값이 몇개나 되는지 쉽게 알아낼 수 있는 방법이 없다.
  3. 키는 반드시 문자열이나 심볼이어야 하므로 객체를 키로 써서 값과 연결할 수 없다.
  4. 객체는 프로퍼티 순서를 전혀 보장하지 않는다.
- Map 객체는 이들 결함을 모두 해결했고, 키와 값을 연결할 목적이라면 (문자열만 키로 쓴다 해도) 객체보다 나은 선택
- ```js
  //ex
  const u1 = { name: "Cynthia" };
  const u2 = { name: "Jackson" };
  const u3 = { name: "Olive" };
  const u4 = { name: "James" };

  const userRoles = new Map();
  //맵의 set() 메서드를 써서 사용자 역할을 할당
  userRoles.set(u1, "User");
  userRoles.set(u2, "User");
  userRoles.set(u3, "Admin");

  //set() 메서드는 체인으로 연결할 수 있어서 타이핑하는 수고를 덜어줌
  /*userRoles
        .set(u1, "User")
        .set(u2, "User")
        .set(u3, "Admin");
    */

  //생성자에 배열의 배열을 넘기는 형태로 써도됨
  /*const userRoles = new Map([
      [u1, 'User'],
      [u2, 'User'],
      [u3, 'Admin'],
  ]);*/

  //이제 u2의 역할을 알아 볼때는 get() 메서드를 쓰면됨
  userRoles.get(u2); //"User"

  //맵에 존재하지 않는 키에 et을 호출하면 undefined를 반환
  //맵에 키가 존재하는지 확인하는 has() 메서드도 있다.
  userRoles.has(u1); //true
  userRoles.get(u1); //"User"
  userRoles.has(u4); //false
  userRoles.get(u4); //undefined

  //맵에 이미 존재하는 키에 set()을 호출하면 값이 교체됨
  userRoles.get(u1); //'User'
  userRoles.set(u1, "Admin");
  userROles.get(u1); //"Admin"

  //size 프로퍼티는 맵의 요소 숫자를 반환
  userRoles.size; // 3

  //keys() 메서드는 맵의 키를
  //values() 메서드는 값을
  //entries() 메서드는 첫 번쨰 요소가 키이고 두번째 요소가 값인 배열을 각각 반환
  //이들 메서드는 모두 이터러블 객체이므로 for...of루프를 쓸수 있다.
  for (let u of userRoles.keys()) console.log(u.name);
  for (let r of userRoles.values()) console.log(r);
  for (let ur of userRoles.entries()) console.log(`${ur[0].name}: ${ur[1]}`);

  //맵도 분해(desturct) 할 수 있따.
  //분해하면 좀 더 자연스러운 코드가 됨
  for (let [u, r] of userRoles.entries()) console.log(`${u.name}: ${r}`);

  //entries() 메서드는 맵의 기본 이터레이터이다. (단축 가능)
  for (let [u, r] of userRoles) console.log(`${u.name}: ${r}`);

  //이러터블 객체보다 배열이 필요하다면 확산 연산자를 사용
  const arr = [...userRoles.values()]; // ["Admin", "User", "User"]

  //맵의 요소를 지울 떄는 delete() 메서드를 사용
  userRoles.delete(u2);
  userRoles.size(); //2

  //맵의 요소를 모두 지울때는 clear() 메서드 사용
  userRoles.clear();
  userRoles.size; //0
  ```
