## WeakMap

- 키는 반드시 객체여야 한다.
- WeakMap의 키는 가비지 콜렉션에 포함될 수 있다.
- WeakMap은 이터러블이 아니며 clear() 메서드도 없다.
- 나머지는 Map과 완전히 동일

- WeakMap은 객체 인스턴스의 전용 키를 저장하기에 알맞다.
- ```js
  const SecretHolder = (function () {
    const secrets = new WeakMap();
    return class {
      setSecret(secret) {
        //비밀을 저장할때는 setSecret 메서드를 써야만 하고
        secrets.set(this, secret);
      }
      getSecret() {
        //보려할 때는 getSecret메서드를 써야만 한다.
        return secrets.get(this);
      }
    };
  })();

  const a = new SecretHolder();
  const b = new SecretHolder();

  a.setSecret("secreat A");
  b.setSecret("secreat B");

  a.getSecret(); // "secret A"
  b.getSecret(); // "secret B"

  //일반적인 Map을 써도 되지만, 그렇게하면 SecretHolder 인스턴스에 저장한 내용은 가비지 콜렉션에 포함되지 않는다.
  ```
