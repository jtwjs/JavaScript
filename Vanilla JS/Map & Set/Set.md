## 셋 (Set)

> 셋은 중복을 허용하지 않는 데이터 집합이다.

- ```js
  //Set 인스턴스를 만듬
  const roles = new Set();

  // 사용자 역할을 추가할 때는 add() 메서드를 사용
  roles.add("User"); // Set [ "User" ]

  // 이 사용자에게 관리자 역할을 추가하려면 add()를 다시 호출
  roles.add("Admin"); // Set [ "User", "Admin" ]

  //Map과 마찬가지로 Set에도 size 프로퍼티가 있다.
  roles.size; //2

  //셋의 장점은 추가하려는 것이 셋에 이미 있는지 확인할 필요가 없다.
  // 이미 있다면 아무일도 일어나지 않는다.
  roles.add("User"); // set ["User", "Admin"]
  role.size(); //2

  //역할을 제거할때는 delete()를 호출, 제거에 성공하면 true를 반환
  roles.delete("Admin"); // true
  roles; //Set  ["User"]
  roles.delete("Admin"); // false
  ```
