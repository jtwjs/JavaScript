# 리팩터링 정의

'리팩터링'이란 용어는 명사로도 쓸 수 있고, 동사로도 쓸 수 있다. 먼저 명사로 쓸 때는 다음과 같의 정의한다

```
리팩터링: [명사] 소프트웨어의 겉보기 동작은 그대로 유지한 채, 코드를 이해하고 수정하기 쉽도록 내부 구조를 변경하는 기법
```

**함수 추출하기**와 **조건부 로직을 다형성으로 바꾸기** 처럼 이름 붙은 리팩터링 기법들이 이정의에 해당한다.

```
리팩터링(하다):[동사] 소프트웨어의 겉보기 동작은 그대로 유지한 채, 여러가지 리팩터링 기법을 적용해서 소프트웨어를 재구성하다
```

리팩터링은 성능 최적화와 비슷하다. 둘 다 코드를 변경하지만 프로그램의 전반적인 기능은 그대로 유지한다. 단지 목적이 다를 뿐

리팩터링의 목적은 코드를 이해하고 수정하기 쉽게 만드는 것이다. 프로그램 성능은 좋아질수도, 나빠질 수도 있다.

## 두개의 모자

소프트웨어를 개발할 때 목적이 '기능 추가'냐, 아니면 '리팩터링'이냐를 명확히 구분해 작업한다. 켄트백은 이를 두 개의 모자(two hats)에 비유했다. 기능을 추가할 때는 '기능 추가'모자를 쓴 다음 기존 코드는 절대 건드리지 않고 새 기능을 추가하기만 한다. 진척도는 테스트를 추가해서 통과하는지 확인하는 방식으로 측정한다.
반면 리팩터링할 떄는 '리팩터링'모자를 쓴 다음 기능 추가는절대 하지 않기로 다짐한 뒤 오로지 코드 재구성에만 전념한다. 테스트도 새로 만들지 않고 부득이 인터페이스를 변경해야할 때만 기존 테스트를 수정한다.

항상 내가 쓰고 있는 모자가 무엇인지와 그에 따른 미묘한 작업 방식의 차이를 분명하게 인식해야 한다.

## 리팩터링하는 이유

> 리팩터링이 소프트웨어의 모든 문제점을 해결하는 만병통치약은 절대 아니다. 하지만 코드를 건강한 상태로 유지하는 데 도와주는 약임은 분명하다. 리팩터링은 다양한 용도로 활용할 수 있고, 또 반드시 그래야 하는 도구다.

### 리팩터링하면 소프트웨어 설계가 좋아진다.

리팩터링하지 않으면 소프트웨어의 내부 설계(아키텍처)가 썩기 쉽다. 아키텍처를 충분히 이해하지 못한 채 단기 목표만을 위해 코드를 수정하다 보면 기반 구조가 무너지기 쉽다.그러면 코드만 봐서는 설계를 파악하기 어렵다. 설계를 파악하기 어려워질수록 설계를 유지하기 어려워지고, 설계가 부패되는 속도는 더욱 빨라진다. 반면 규칙적인 리팩터링은 코드의 구조를 지탱해줄 것이다.

### 리팩터링하면 소프트웨어를 이해하기 쉬워진다.

프로그램을 동작시키는 데만 신경 쓰다 보면 나중에 그 코드를 다룰 개발자를 배려하지 못하는데 있다. 코드를 이해하기 쉽게 만들려면 일하는 리듬에 변화를 줘야 한다. 리펙터링은 코드가 더 잘 읽히게 도와준다

### 리팩터링하면 버그를 쉽게 찾을 수 있다.

코드를 이해하기 쉽다는 말은 버그를 찾기 쉽다는 말이기도 하다.
프로그램의 구조를 명확하게 다듬으면 그냥 '이럴 것이다'라고 가정하던 점들이 분명히 드러나는데, 버그를 지나치려야 지나칠 수 없을 정도까지 명확해진다.

### 리팩터링하면 프로그래밍 속도를 높일 수 있다.

지금까지 제시한 장점을 한 마디로 정리하면 다음과 같다. 리팩터링하면 코드 개발 속도를 높일 수 있다.

내부 설계가 잘된 소프트웨어는 새로운 기능을 추가할 지점과 어떻게 고칠지를 쉽게 찾을 수 있다. 모듈화가 잘되어 있으면 전체 코드베이스 중 작은 일부만 이해하면 된다. 코드가 명확하면 버그를 만들 가능성도 줄고, 버그를 만들더라도 디버깅하기가 훨씬 쉽다. 내부 품질이 뛰어난 코드베이스는 새 기능 구축을 돕는 견고한 토대가 된다.

## 언제 리팩터링해야 할까?

- 3의 법칙: 돈 로버츠(dont Roberts)가 제시한 가이드
  1. 처음에는 그냥 한다.
  2. 비슷한 일을 두번째로 하게 되면(중복이 생겼다는 사실에 당황스럽지만), 일단 계속 진행한다
  3. 비슷한 일을 세번째 하게 되면 리팩터링한다

### 준비를 위한 리팩터링: 기능을 쉽게 추가하게 만들기

리팩터링하기 가장 좋은 시점은 코드베이스에 기능을 새로 추가하기 직전이다. 이 시점에 현재 코드를 살펴보면서, 구조를 살짝 바꾸면 다른 작업을 하기가 훨씬 쉬워질 만한 부분을 찾는다.

```
비유하면 지금 위치에서 동쪽으로 100km를 이동하려는데 그 사이를 숲이 가로막고 있다면, 좀 둘러가더라도 20km 북쪽에 있는 고속도로를 타는 편이 세 배나 빠를 수 있다. 다들 "직진!"을 외치더라도, 때로는 "잠깐, 지도를 보고 가장 빠른 경로를 찾아보자"고 말할 줄 알아야 한다. 준비를 위한 리팩터링이란 바로 이런 역할을 한다.
_제시카 커(Jessica kerr)
```

준비를 위한 리팩터링으로 상황을 개선해놓으면 버그가 수정된 상태가 오래 지속될 가능성을 높이는 동시에, 같은 곳에서 다른 버그가 발생할 가능성을 줄일 수도 있다.

### 이해를 위한 리팩터링: 코드를 이해하기 쉽게 만들기

코드를 수정하려면 먼저 그 코드가 하는 일을 파악해야 한다.
코드를 분석할 때 리팩터링을 해보면, 그렇지 않았더라면 도달하지 못했을 더 깊은 수준까지 이해하게 된다. 이해를 위한 리팩터링을 의미없이 코드를 만지작거리는 것이라고 무시하는 이들은 복잡한 코드아래 숨어있는 다양한 기회를 결코 발견할 수 없다.

### 쓰레기 줍기 리팩터링

코드를 파악하던 중에 일을 비효율적으로 처리하는 모습을 발견할 때가 있다. 로직이 쓸데없이 복잡하거나, 매개변수화한 함수 하나면 될 일을 거의 똑같은 함수 여러개로 작성해놨을수 있다. 이때 약간 절충을 해야한다. 원래 하려던 작업과 관련 없는 일에 너무 많은 시간을 뺴앗기긴 싫을 것이다. 그렇다고 쓰레기가 나뒹굴게 방치해서 나중에 일을 방해하도록 내버려두는 것도 좋지 않다. 나라면 간단히 수정할 수 있는 것은 즉시 고치고, 시간이 좀 걸리는 일은 짧은 메모만 남긴다음, 하던 일을 끝내고 나서 처리한다. 이것이 이해를 위한 리팩터링의 변형인 쓰레기 줍기 리팩터링이다.

캠핑 규칙이 제안하듯, 항상 처음 봣을 때보다 깔끔하게 정리하고 떠나자, 코드를 훑어볼 때마다 조금씩 개선하다 보면 결국 문제가 해결될 것이다. 리팩터링의 멋진점은 각각의 작은 단계가 코드를 꺠드리지 않는다는 사실이다.

### 계획된 리팩터링과 수시로 하는 리팩터링

앞에서 본 준비를 위한 리팩터링, 이해를 위한 리팩터링, 쓰레기 줍기 리팩터링은 모두 기회가 될 때만 진행한다. 나는 개발에 들어가기 전에 리팩터링 일정을 따로 잡아두지 않고, 기능을 추가하거나 버그를 잡는 동안 리팩터링도 함꼐 한다. 프로그래밍 과정에 자연스럽게 녹인 것이다.
리팩터링은 프로그래밍과 구분되는 별개의 활동이 아니다. 마치 프로그래밍할 때 if문 작성 시간을 따로 구분하지 않는 것과 같다.
대부분의 리팩터링을 다른일을 하는 중에 처리한다.

```
보기 싫은 코드를 발견하면 리팩터링하자, 그런데 잘 작성된 코드 역시 수많은 리팩터링을 거쳐야 한다.
```

나는 코드를 작성할 떄마다 적절히 타협한다. 예컨대 매개변수화하거나 개별 함수로 나누는 기준을 정한다. 어제는 적합했던 기준이 오늘 하는 다른 작업에는 맞지 않을수 있다. 이렇게 상황이 변해 기준을 변경해야 할 때 코드가 이미 깔끔하다면 리팩터링하기가 더 쉽다.

```
무언가 수정하려 할떄는 먼저 수정하기 쉽게 정돈하고(단, 만만치 않을수 있다) 그런 다음 쉽게 수정하자
_켄트 백
```

리팩터링 작업 대부분은 드러나지 않게, 기회가 될 때마다 해야한다.

### 오래 걸리는 리팩터링

리팩터링은 대부분 몇 분안에 끝나야 한다. 길어야 몇 시간 정도다. 하지만 팀 전체가 달려들어도 몇 주는 걸리는 대규모 리팩터링도 있다. 라이브러리를 새 것으로 교체하는 작업일 수 도 있고, 일부 코드를 다른팀과 공유하기 위해 컴포넌트로 뺴내는 작업일수도 있다. 또는 그동안 작업하면서 쌓여온 골치 아픈 의존성을 정리하는 작업일수도 있다.

나는 이런 상황에 처하더라도 팀 전체가 리팩터링에 매달리는 데는 회의적이다. 그보다는 주어진 문제를 몇 주에 걸쳐 조금씩 해결하는 편이 효과적일 떄가 많다. 누구든지 리팩터링해야할 코드와 관련한 작업을 하게될 때마다 원하는 방향으로 조금씩 개선하는 식이다. 리팩터링이 코드를 깨드리지 않는 장점을 활용하는 것이다.

### 코드 리뷰에 리팩터링 활용하기

리팩터링은 다른 이의 코드를 리뷰하는 데도 도움된다.

리팩터링은 코드 리뷰의 결과를 더 구체적으로 도출하는 데에도 도움된다. 개선안들을 제시하는 데서 그치지 않고, 그중 상당수를 즉시 구현해볼수 있기 떄문이다.

작성자와 나란히 앉아서 코드를 훑어가면서 리팩터링하는것이다 .이렇게 하면 자연스럽게 (프로그래밍 과정 안에 지속적인 코드리뷰가 녹아있는) **짝 프로그래밍**이 된다.

### 리팩터링하지 말아야 할때

지저분한 코드를 발견해도 굳이 수정할 필요가 없다면 리팩터링하지 않는다. 외부 API 다루듯 호출해서 쓰는 코드라면 지저분해도 그냥 둔다. 내부 동작을 이해해야 할 시점에 리팩터링해야 효과를 제데로 볼 수 있다.

리팩터링하는 것보다 처음부터 새로 작성하는 게 쉬울 때도 리팩터링하지 않는다. 직접 리팩터링해보기 전에는 어느 쪽이 쉬운지 확실히 알수없을떄도 많기 때문이다. 리팩터링할지 새로 작성할지를 잘 결정하려면 뛰어난 판단력과 경험이 뒷받침돼야 한다.

## 리팩터링시 고려할 문제

### 새 기능 개발 속도 저하

많은 사람이 리팩터링때문에 새 기능을 개발하는 속도가 느려진다고 여기지만, 리팩터링의 궁극적인 목적은 개발속도를 높이는데 있다. 하지만 리팩터링으로 인해 진행이 느려진다고 생각하는 사람이 여전히 많다. 아마도 이점이 실전에서 리팩터링을 제데로 적용하는데 가장 큰 걸림돌일거 같다.

```
리팩터링의 궁극적 목적은 개발 속도를 높여서, 더 적은 노력으로 더 많은 가치를 창출하는 것이다.
```

나는 준비를 위한 리팩터링을 하면 변경을 훨씬 쉽게 할 수 있다고 확신한다. 그래서 새 기능을 구현해넣기 편해지겠다 싶은 리팩터링이라면 주저하지 않고 리팩터링부터 한다.

리팩터링은 개발 기간을 단축하고자 하는 것이다. 기능 추가 시간을 줄이고, 버그 수정 시간을 줄여준다. 스스로 그렇게 인식하는데 그치지 않고 다른 사람과 대화할때도 이점을 명심해야 한다.

### 코드 소유권

리팩터링하다 보면 모듈의 내부뿐 아니라 시스템의 다른 부분과 연동하는 방식에도 영향을 주는 경우가 많다. 함수 이름을 바꾸고 싶고 그 함수를 호출하는 곳을 모두 찾을 수 있다면, 간단히 **함수선언바꾸기**로 선언 자체와 호출하는 곳 모두를 한번에 바꿀 수 있다.

함수를 호출하는 코드의 소유자가 다른 팀이라서 나에게는 쓰기 권하닝 없을 수 있다. 또는 바꾸려는 함수가 고객에게 API로 제공된 것이라면 누가 얼마나 쓰고 있는지를 고사하고 실제로 쓰이기나 하는지 조차 모를 수 있다. 이런 함수는 인터페이스를 누가 선언했는지와 관계 없이 클라이언트가 사용하는 '공개된 인터페이스'에 속한다.

코드 소유권이 나뉘어 있으면 리팩터링에 방해가 된다.
클라이언트에 영향을 주지 않고서는 원하는 형태로 변경할 수 없기 떄문이다.

어떤 티믕ㄴ 다른 팀 사람이 자기팀 코드의 브랜치를 따서 수정하고 커밋을 요청하는 흡사 오픈소스 개발 모델을 권장하기도 한다. 이렇게 하면 함수의 클라이언트도 바꿀수 있다. 즉,변경 사항 커밋을 클라이언트를 관리하는 쪽에서 승인하면 기존 함수를 삭제 할 수 있따. 이 방식은 코드 소유권을 엄격히 제한하는 방식과 완전히 풀어서 변경을 통제하기 어려운 방식을 절충한 것으로, 대규모 시스템 개발시 잘어울린다.

### 브랜치

현재 흔히 볼수 있는 팀 단위 작업방식은 버전관리 시스템을 사용하여 팀원마다 코드베이스의 브랜치를 하나씩 맡아서 작업하다가, 결과물이 어느 정도 쌓이면 마스터 브랜치에 통합해서 다른 팀원과 공유하는 것이다.
그런데 이렇게 하면 어떤 기능 전체를 한 브랜치에만 구현해놓고, 프로덕션 버전으로 릴리스할 떄가 돼서야 마스터에 통합하는 경우가 많다. 이방식을 선호하는 이들은 작업이 끝나지 않은 코드가 마스터에 섞이지 않고, 기능이 추가될 때마다 버전을 명확히 나눌 수 있고, 기능에 문제가 생기면 이전 상태로 쉽게 되돌릴 수 있어서 좋다고 한다.

#### 지속적 통합(Continous Intergration ;CI), 또는 트렁크 기반 개발(Trunk-Based Development; TBD)

CI에 따르면 모든 팀원이 하루에 최소 한번은 마스터와 통합한다. 이렇게 하면 다른 브랜치들과의 차이가 크게 벌어지는 브랜치가 없어져서 머지의 복잡도를 상당히 낮출수 있다. 하지만 CI를 적용하기 위해서는 치러야할 대가가 있다. 마스터를 건강하게 유지하고, 거대한 기능을 잘게 쪼개는 법을 배우고, 각 기능을 끌 수 있는 기능 토글(기능 플래그)을 적용하여 완료되지 않은 기능이 시스템 전체를 망치지 않도록 해야 한다.

머지의 복잡도를 줄일 수 있어서 CI를 선호하기도 하지만, 가장 큰 이유는 리팩터링과 궁합이 아주좋기 때문이다. 리팩터링을 하다보면 코드베이스 전반에 걸쳐 자잘하게 수정하는 부분이 많을때가 있다. 프로그램 전체에서 자주 사용하는 함수의 이름을 바꾸는 경우가 이러한 예다. 이렇게되면 머지 과정에서 의미 충돌이 생기기 쉽다. 특히 기능별 브랜치 방식에서는 리팩터링을 도저히 진행할수 없을 정도로 심각한 머지 문제가 발생하기 쉽다. 켄트 백이 CI와 리팩터링을 합쳐서 **익스트림 프로그래밍(eXtreme Programming ;XP)** 을 만든 이유도 바로 두 기법의 궁합이 잘 맞기 떄문이다.

기능별 브랜치를 사용하면 절대 안된다는 말이 아니다. 브랜치를 자주 통합할수 만있다면 문제가 발생할 가능성을 크게 줄일수 있다. 실제로 CI를 적용하는 이들도 기능별 브랜치를 많이 사용한다.(단 마스터와 통합하는 작업은 매일한다.)

CI를 적용하는 편이 소프트웨어를 배포하는 데 훨씬 효과적이라는 객관적인 증거가 있으니 고려하기 바람

### 테스팅

리팩터링의 두드러진 특성은 프로그램의 겉보기 동작은 똑같이 유지된다는 것이다. 절차를 지켜 제데로 리팩터링하면 동작이 꺠지지 않아야 한다. 하지만 실수를 저지른다면? 실수하더라도 재빨리 해결하면 문제가 되지 않는다. 리팩터링은 단계별 변경 폭이 작아서 도중에 발생한 오류의 원인이 될만한 코드 범위가 넓지 않다. 원인을 못찾더라도 버전 관리시스템을 이용하여 가장 최근에 정상 작동하던 상태로 되돌리면 된다.

여기서 핵심은 오류를 재빨리 잡는데 있다. 실제로 이렇게 하려면 코드의 다양한 측면을 검사하는 테스트 스위트가 필요하다. 그리고 이를 빠르게 실행할 수 있어야 수시로 테스트 하는데 부담이 없다. 달리 말하면 리팩터링하기 위해서는 (대부분의 경우에) 자가 테스트 코드를 마련해야 한다는 뜼이다.

자가 테스트 코드를 갖추기란 실현 불가능할 정도로 무리한 요구라고 생각하는 독자도 있을것이다. 하지만 지난 수십년 동안 자가 테스트를 이용하여 소프트웨어를 빌드하는 팀을 많이 봣다.
자가 테스트 코드는 리팩터링을 할 수 있게 해줄뿐만 아니라, 새 기능 추가도 훨씬 안전하게 진행할 수 있도록 도와준다. 실수로 만든 버그를 빠르게 찾아서 제거할 수 있기 떄문이다. 이때 핵심은 테스트가 실패한다면 가장 최근에 통과한 버전에서 무엇이 달라졌는지 살펴 볼수 있다는 데 있다. 테스트 주기가 짧다면 단 몇줄만 비교하면 되어, 문제를 일으킨 부분이 그 몇줄 안에 있기 떄문에 버그를 훨씬 쉽게 찾을 수 있다.

자가 테스트 코드는 통합 과정에서 발생하는 의미 충돌을 잡는 메커니즘으로 활용할수 있어서 자연스럽게 CI와도 밀접하게 연관된다. CI에 통합된 테스트는 XP의 권장사항이자 지속적 배포(Continous Delivery ;CD)의 핵심이기도 하다.

### 레거시 코드

물려받은 레거시코드는 대체로 복잡하고 테스트도 제데로 갖춰지지 않은 것이 많다. 무엇보다도 다른 사람이 작성한 것이다.

레거시 시스템을 파악할 때 리팩토링이 굉장히 도움된다. 제 기능과 맞지 않은 함수 이름을 바로 잡고 어설픈 프로그램 구문을 매끄럽게 다듬어서 거친 원석같던 프로그램을 반짝이는 보석으로 만들 수 있다. 하지만 이러한 희망찬 스토리에 테스트가 없다는 사실이 찬물을 끼얹는 때가 많다. 대규모 레거시 시스템을 테스트 코드 없이 명료하게 리팩터링하기는 어렵다.

테스트를 갖추고 있더라도 복잡하게 얽힌 레거시 코드를 아름다운 코드로 단번에 리팩터링하는 데는 낙관적이지가 않다. 내가 선호하는 방식은 서로 관련된 부분끼리 나눠서 하나씩 공략하는 것이다.
코드의 한부분을 훑고 넘어갈 때마다 예전보다 조금이라도 개선하려고 노력한다. 역시 캠핑 규칙에 따라 처음 왔을 때보다 꺠끗하게 치우는 것이다. 레거시 시스템의 규모가 크다면 자주 보는 부분을 더 많이 리팩터링 한다.
코드를 훑게 되는 횟수가 많다는 말은 그 부분을 이해하기 쉽게 개선했을때 얻는 효과도 그만큼 크다는 뜻이니 당연히 이렇게 해야 한다.

## 리팩터링, 아키텍처, 애그니(YAGNI)

리팩터링은 소프트웨어 아키텍처를 바라보는 관점을 완전히 바꿔놓았다. 내가 프로그래밍을 시작한지 얼마 되지 않은 시절에는 코딩을 시작하기 전에 소프트웨어 설계와 아키텍처를 어느정도, 심지어 거의 완료해야 한다고 배웠다.일단 코드로 작성된 뒤로는 아키텍처를 바꿀수 없고 부주의로 인해 부패할 일만 남았다고 여기곤 했다.
리팩터링은 이런 관점을 크게 바꿔 놓았다.

리팩터링의 아키텍처에 미치는 실질적인 효과는 요구사항 변화에 자연스럽게 대응하도록 코드베이스를 잘 설계해준다는 데 있다. 코딩 전에 아키텍처를 확정지으려 할 떄의 대표적인 문제는 소프트웨어 요구사항을 사전에 모두 파악해야 한다는 것이다. 하지만 막상 해보면 실현할 수 없는 목표일 떄가 많다. 우리는 소프트웨어를 실제로 사용해보고 업무에 미치는 영향을 직접 확인하고 나서야 정말로 원하는 바를 알게 되는 경우가 허다하다.

한가지 방법은 향후 변경에 유연하게 대처 할 수 있는 유연한 메커니즘을 소프트웨어에 심어두는 것이다. 가령 함수를 정의하다 보면 범용적으로 사용할 수 있겠다는 생각이 들 떄가 있다. 그래서 다양한 예상 시나리오에 대응하기 위한 매개변수들을 추가한다. 이런 매개변수가 바로 유연성 메커니즘이다. 물론 메커짐들이 대게 그렇든 치러야할 비용이 있다. 매개변수를 생각나는 대로 추가하다 보면 당장의 쓰임에 비해 함수가 너무 복잡해진다. 또한 깜박 잊은 매개변수가 있다면 앞서 추가해둔 매개변수들 때문에 새로 추가하기가 더 어려워진다. 간혹 유연성 메커니즘을 잘못 구현할 떄도 있다. 요구사항이 당초 예상과 다르게 바뀌기 떄문일 때도 있고, 내가 설계한 메커니즘 자체에 결함이 있어서일 때도 있다. 이 모든 상황을 고려하다 보면 유연성 메커니즘이 오히려 변화에 대응하는 능력을 떠렁뜨리는 대가 대부분이다.

리팩터링을 활용하면 다르게 접근할수 있다. 앞으로 어느 부분에 유연성이 필요하고 어떻게해야 그 변화에 가장 잘대응할 수 있을지 추측하지 않고, 그저 현재까지 파악한 요구사항만을 해결하는 소프트웨어를 구축한다. 단 이 요구를 멋지게 해결하도록 설계한다.
진행하면서 사용자의 요구사항을 더 잘이해하게 되면 아키텍처도 그에 맞게 리팩터링해서 바꾼다. 그 과정에서 소프트웨어의 복잡도에 지장을 주지않는 메커니즘은 마음껏 추가하지만, 복잡도를 높일수 있는 유연성 메커니즘은 반드시 검증을 거친 후에 추가한다.

이런식으로 설계하는 방식을 간결한 설계, 점진적 설계, YAGNI(you aren't going to need it ;필요 없을 거다의 줄임말)등으로 부른다.

## 리팩터링과 소프트웨어 개발 프로세스

XP의 두드러진 특성은 지속적 통합, 자가 테스트 코드, 리팩터링 등의 개성이 강하면서 상호 의존하는 기법들을 하나로 묶은 프로세스라는 점이다. 참고로 자가 테스트코드와 리팩터링을 묶어서 **테스트주도개발(Test-Driven Devlopment ;TDD)** 이라 한다.

리팩터링의 첫번째 토대는 자가 테스트 코드다. 다시 말해 프로그래밍 도중 발생한 오류를 확실히 걸러내는 테스트를 자동으로 수행할 수 있어야 한다. 테스트는 리팩터링에 굉장히 중요한 토대이기 때문

팀으로 개발하면서 리팩터링을 하려면 각 팀원이 다른 사람의 작업을 방해하지 않으면서 언제든지 리팩터링할 수 있어야 한다. 지속적 통합(CI)를 적극 권장하는 이유도 바로 이때문

## 리팩터링과 성능

리팩터링하면 소프트웨어가 느려질수도 있는건 사실이다. 하지만 그와 동시에 성능을 튜닝하기는 더 쉬워진다. 하드 리얼타임 시스템을 제외한 소프트웨어를 빠르게 만드는 비결은, 먼저 튜닝하기 쉽게 만들고 나서 원하는 속도가 나게끔 튜닝하는 것이다.

```
아무것도 안만드는 데도 시간이 걸린다.
-론 제프리
```

성능에 대한 흥미로운 사실은, 대부분 프로그램은 전체 코드 중 극히 일부에서 대부분의 시간을 소비한다는 것이다. 그래서 코드 전체를 고르게 최적화한다면 그중 90%느 효과가 거의 없기 떄문에 시간낭비인 셈이다. 속도를 높이기 위해 투자한 시간을 모두 날리는 행위다.

성능 개선을 위한 세번재 방법은 이 '90%의 시간은 낭비'라는 통계에서 착안한 것이다. 즉, 의도적으로 성능 최적화에 돌입하기 전까지는 성능에 신경 쓰지 않고 코드를 다루기 쉽게 만드는데 집중한다. 그러다 성능 최적화 단계가 되면 다음의 구체적인 절차를 따라 프로그램을 튜닝 한다.

먼저 프로파일러로 프로그램을 분석하여 시간과 공간을 많이 잡아먹는 지점을 알아낸다. 그러면 성능에 큰 영향을 주는 작은 부분들을 찾을 수 있다. 그런 다음 전체를 고르게 최적화할때와 마찬가지 방법으로 그 부분들을 개선한다. 이렇게 하면 성능에 큰영향을 주는 부분만 집중해서 최적화하기 때문에 적은 노력으로 훨씬 큰 효과를 볼수 있다. 이때도 물론 신중하게 작업해야한다. 리팩터링할 떄처럼 최적화를 위한 수정도 작은단계로 나눠서 진행한다. 각 단계마다 컴파일과 테스트를 거치고 프로파일러를 다시 실행해 본다. 성능이 개선되지 않았따면 수정 내용을 되돌린다. 이런식으로 사용자가 만족하는 성능에 도달할 때까지 최적화와 대상을 찾아서 제거하는 일을 계속한다.

프로그램을 잘 리팩터링해두면 이런식의 최적화에 두가지 면에서 도움이된다.
첫째, 성능 튜닝에 투입할 시간을 벌수 있다. 리팩터링이 잘되어 있다면 기능 추가가 빨리 끝나서 성능에 집중할 시간을 더 벌수있다. 둘쨰, 리팩터링이 잘되어있는 프로그램은 성능을 더 세밀하게 분석 할 수 있다. 프로파일러가 지적해주는 코드의 범위가 더 좁아질 것이고, 그래서 튜닝하기가 쉬워진다. 코드가 깔끔하면 개선안들이 더 잘떠오를 것이고, 그 중 어떤 튜닝이 효과가 좋을지 파악하기 쉽다.

리팩터링은 성능 좋은 소프트웨어를 만드는데 기여한다. 단기적으로 보면 리팩터링단계에서 성능이 느려질수도 있다. 하지만 최적화단계에서 코드를 튜닝하기 훨씬 쉬워지기 떄문에 결국 더 빠른 소프트웨어를 얻게 된다.