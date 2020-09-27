## 행위의 분리 - 믹스인(Mixins)

> 필요한 행위를 클래스 계통과 상관없이 독립된 클래스로부터 얻어와 행위를 탑재할수 있다면 훨씬 유효한 코드 재사용 패턴이 된다.

- 믹스인은 **특정 기능(행위)만을 담당하는 클래스**
  - 단독 사용(Stand-alone use)이 아닌 다른 클래스에 탑재되어 사용될 목적으로 자성된 **(조각) 클래스** 를의미

### 믹스인(Mixins) 구현하기

> ES6에 새롭게 도입된 클래스 문법을 이용하면 믹스인 클래스들을 손쉽게 정의가능

- ```js
  //나는 행위를 담당하는 Mixin
  const FlyToMixin = (superclass) =>
    class extends superclass {
      flyTo(destination) {
        console.log(`${this.name} is flying to the ${destination}.`);
      }
    };
  //먹는 행위를 담당하는 Mixin
  const EatMixin = (superclass) =>
    class extends superclass {
      eat(food) {
        console.log(`${this.name} is eating ${food}`);
      }
    };

  //헤엄치는 행위를 담당하는 Mixin
  const SwimAtMixin = (superclass) =>
    class extends superclass {
      swimAt(place) {
        console.log(`${this.name} is swiming at the ${place}`);
      }
    };

  // 믹스인을 탐재한 Mouse
  class Mouse extends SwimAtMixin(EatMixin(Animal)) {
    /*...*/
  }

  const mickMouse = new Mouse("Micky Mouse");
  mickMouse.swimAt("river");
  ```

#### 참고사항

1. 믹스인이 많아질 수록 클래스 선언부에 기술해야 하는 양이 많아진다.
   - 이때 lodash의 compose 기능을 이용하면 편리하게 믹스인을 조합할 수 있다.

- ```js
    import compose from 'lodash/fp/compose';

    const behaviors = compose(FlyToMixin, EatMixin, SwimAtMixin)(Animal);
    class Duck exnteds behaviors {
        /*...*/
    }
  ```
