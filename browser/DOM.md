# DOM(Document Object Model)

<br/>
<br/>

# 1. 정의

<br/>

브라우저가 html의 file을 읽고 노드(브라우저가 이해할 수 있는 자신들만의 오브젝트)로 변환한다.

(즉, html에서 작성한 태그들이 자바스크립트에서는 node라는 오브젝트로 변환)

(document도 node상속, html요소들은 element로 변환됨, element도 node에 상속)

- Node라는 오브젝트는 EventTarget이라는 오브젝트를 상속. (Node객체는 EventTarget의 객체이다.)

  (모든 Node는 이벤트가 발생할 수 있다.)

- 상속관계
  - Element → HTML의 Element → Node → EventTarget

<br/>
<br/>

**❖ Node**

1. DOM Node interface는 DOM API를 쓰기위해서 필수적인 인터페이스다
2. Node 안에는 Document나 Element가 들어있다.
3. Node는 EventTarget을 상속한다. (Node는 EventTarget이라고도 볼 수 있다)

   1. EventTarget에는 세가지 메서드가 존재한다 (EventTarget에서 지원해주는 API)

   - EventTarget.addEventListener() : 이벤트 추가
   - EventTarget.removeEventListener() : 이벤트 제거
   - EventTarget.dispatchEvent() : 이벤트 발생

<br/>
<br/>

# 2.CSSOM (CSS Object Model)

<br/>

: The CSSOM is a set of APIs allowing the manipulation of CSS from JavaScript.

It is much like the DOM, but for the CSS rather than the HTML. It allow user to read and modify CSS style dynamiclally.

### _ DOM + CSS ⇒ CSSOM _

모든 스타일에 관한 정보들을 합해서 CSSOM이라는 트리를 다시 만들게됨

(CSSOM에서는 우리가 정의한 스타일 뿐만 아니라, 브라우저에서 기본적으로 설정된 모든 설정값들 - 즉, cascading rule에 의해 합쳐진 모든 CSS 값들이 정의되어있다. ⇒ Computed Style라고도 불림)

### _ Render Tree = DOM + CSSOM _

⇒ 사용자에게 최종적으로 브라우저에 보여질 요소들만 Render Tree에 선별되어 표기되어지는것

<br/>
<br/>

# 3.Critical rendering path

<br/>
⭐️⭐️⭐️⭐️⭐️ 성능이 좋은 웹 어플리케이션,페이지 애니메이션을 만드는데 아주 중요함!!!!
<br/>
<br/>

### \* 브라우저에 URL을 입력하면 일어나는 순서

**<HTML> 1)requests/response → 2)loading → 3)scripting → 4)rendering → 5)layout → 6)painting**

<br/>
<br/>

⇒ **1)~3) Construction part** : HTML페이지에서 브라우저가 이해할 수 있도록 브라우저만의 언어로 바꾸는 파트

- Render Tree를 최종적으로 만드는것까지 의미

- **DOM요소가 작으면 작을수록, CSSOM이 작으면 작을수록 렌더트리가 작아지므로 속도가 빨라진다.**

(불필요한 태그를 쓴다던가, div남용 wrapping쓸데없이 만드는건 자제!)

⇒ **4)~5) Operation part** : 브라우저가 이해할 수 있는 Rendering tree를 이용해서 구조를 작성하고 어디에다 배치할 건지 계산을 한 다음에 실제로 브라우저 window에 그림을 그려주는 rendering하게 되는 파트

- layout, paint, composition을 통해서 최종적으로 사용자에게 웹페이지가 보여지는것

- layout : 우리가 만든 Render Tree를 이용해서 window위에서 요소의 위치 배치, 즉 레이아웃 구상
  - css의 will-change속성을 사용하게되면 이 요소는 추후 변경이 될 것이라고 알려주어 불필요한 layout과정을 다시 반복하게하지않아,성능이 좋아지지만, 남용하는것은 권장되지 않다.
    `img { will-change: opacity; }`
- paint : (포토샵의 레이어 시스템을 생각하자!) 바로 브라우저에 그림을 그리는 것이 아니라, 이 요소들을 어떻게 배치했는지에 따라서 부분을 조금씩 잘게 나누어 보여질 요소들을 따로따로 나누어서 계산해 준비해 놓는 단계
  z-index뿐만아니라 다양한 속성값에 따라 브라우저 엔진마다 성능을 개선하기위해 레이어를 만든다
- composition : paint단계에서 준비된 레이어를 순서대로 브라우저위에다 표기해주는 단계

- **paint가 자주 일어나지않는 것이 중요**

(box를 traslate를 이용해서 움직이게되면 paint가 일어나지 않고, 레이어의 위치만 움직이는 composition만 일어나면 되므로 불필요한 일이일어나지않아 성능이 꽤 괜찮아질 수 있지만, 다시 그림을 그림이 그려져야하는 경우나 다른 요소의 움직임에 영향을 주는게되면 위치계산이 다시 시작되야하므로 layout부터 다시 시작되므로 성능이 나빠지게된다.)

(composition만 다시 일어나게한다면 최고, 그다음은 paint만 일어나는건 괜찮지만 layout이 새로 일어나면 최악..)

### 내가 지정한 CSS속성값이 좋은지 안좋은지 확인하는 방법

- [http://csstriggers.com/](http://csstriggers.com/)

<용어정리>

Blink(or V8) :crome browser <br/>
Gecko: firefox<br/>
webkit: ios(safari)<br/>
EdgeHTML: 오래된 엣지 브라우저 (최신 엣지는 크로미움기반)<br/>

Change from default : CSS에서 기본값이 발생할때 (초기) <br/>
Subsequent updates : 주기적으로 업데이트될 때

<br/>
<br/>

---

<br/>

DOM의 요소는 element이다

알아두면 좋은 element추가와 가진 문법들

❖ html element를 생성하는 함수

`document.createElement('')`

❖ 태그에 속성을 추가하는 함수

`h2.setAttribute('key','value')`

❖ 태그에 새로운 자식 node 추가

`parentNode.appendChild()`

마지막순서로 추가됨

`parentNode.append()` ⇒최신문법이라 익스플로어 지원안됨

❖ `parentNode.insertBefore(newNode,referenceNode)`

새로운 노드를 해당 reference Node전에 추가
<br/>
<br/>

## \* innerHTML이란...?

⇒ 전체적으로 HTML을 한번에 계속 업데이트를 하는것과 같음.

⇒ 부분적으로 변경이 일어나야하고 그 요소로 동적인 동작을 경우에는 **textContent를 업데이트를 하는게 효율적이다!**

⇒ 한번 업데이트한 이후로 변경될 사유가 없다면 innerHTML을 이용해서 동적으로 추가해도 괜찮다.
