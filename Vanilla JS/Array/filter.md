## filter()

> 배열에서 필요한 것들만 남길 목적으로 만들어짐

- map()과 마찬가지로 사본을 반환하며 새 배열에는 필요한 요소만 남는다.
- ```js
  const cards = [];
  for (let suit of ["H", "C", "D", "S"]) //하트, 클로버, 다이아, 스페이드
    for (let value = 1; value <= 13; value++) {
      cards.push({ suit, value });
    }

  // value가 2인 카드
  cards.filter((c) => c.value === 2); /*[
                                         {suit: 'H', value: 2}.
                                         {suit: 'C', value: 2},
                                         {suit: 'D', value: 2},
                                         {suit: 'S', value: 2}
                                        ]
                                                            */
  ```

- map과 filter를 결합하면 정말 다양한 일을 할수가 있음
