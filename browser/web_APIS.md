# **WEB APIs** 🔍

## 1. APIs(<u>Application Programming Interfaces</u>)

<br/>

### 1-1. WEB APIs

- **DOM APIs** (Document Object Model) : 웹페이지에 있는 요소들을 생성하거나 삭제하거나 또는 스타일을 바꾸는 조작하는 기능
- **Network APIs** : 서버와 통신할 수 있는 기능 제공
- **External APIs** : 백엔드 api
  <br/>
  <br/>

## 2. http & https

<br/>

### 2-1. HTTP(Hypertext Transfer Protocal)

- 웹 클라이언트와 서버가 어떻게 통신하는, 통신규약을 정해놓은것
  ( request 와 response가 일어남)

### 2-2. HTTPS(Hypertext Transfer Protocal Secure)

- encrypted되어(암호 보안처리)가 됨!
  몇몇 APIs는 https환경에서만 동작하는 경우도있다.
  <br/>
  <br/>

## 3. window(global object)구조

<br/>

> 주로 사용하는 window 자체 기능→ window size , scroll , load

### 3-1. window

- **window.screen** : 브라우저 바깥에 있는 범위 다 합한 모니터 사이즈
- **window.outer** : url 탭 등을 포함한 브라우저의 사이즈
- **window.inner** : 웹페이지, 스크롤바 포함 페이지가 표기되는 모든 부분
- **documentElement.ClientWidth** : 문서 자체를 의미 , 즉, 스크롤바를 제외한 순수한 document 영역

### 3-2. DOM

### 3-3. BOM

- navigator , location ,fetch 등 web apis관련된것들

### 3-4. JavaScript

 <br/>
 <br/>

## 4. browser Coordinates(좌표)

> 좌표는 기본적으로 x축(가로축) / y축(세로축)으로 이루어져있고, 좌측 상단이 (0,0)좌표 (기준좌표임)! <br/>
> (내려가고 오른쪽으로 갈수록 숫자가 커진다)

 <br/>

### 4-1. Element.getBoundingClientRect()

- 요소의 사이즈나 위치에 관련된 다양한 정보들을 얻어낼 수 있다. <br/>
  (즉, 요소가 브러우저 위(window)위에서 얼마나 멀리 떨어져 있는지, 크기는 얼마인지 등을 알아낼 수 있다)<br/>
  (즉, 요소가 브러우저 위(window)위에서 얼마나 멀리 떨어져 있는지, 크기는 얼마인지 등을 알아낼 수 있다)<br/>
  css에서의 right와 bottom의 개념이 다르므로 헷갈리지 않게 주의하기

### 4-2. Client x,y

- listener로 전달되는 event object안에 존재함<br/>
  사용자가 보는 페이지에 상관없이 브라우저 윈도우 창에서 x와 y가 얼마나 떨어져있는지 전달

### 4-3. Page x,y

- client에 들어있는 사이즈가아니라 page자체에서 떨어져있는 사이즈<br/>
  (어느정도 스크롤링 된 상태라면, 브라우저상에서 보이지 않는 document의 제일 시작점에서부터 떨어져있는 좌표값)
  <br/>
  <br/>

### 4-4. 마우스 좌표 컨트롤 응용

: 마우스좌표 x , y 값 -1~1사의 값으로 초기화 하는법 (정 중앙 좌표를 (0,0)으로 초기화)

```javascript
window.addEventListener('mousemove', (event) => {
  mousePos.x = -1 + (event.clientX / window.innerWidth) * 2;
  mousePos.y = 1 - (event.clientY / window.innerHeight) * 2;
});
```

## 5. 더 알아두면 좋은 APIs

<br/>

- **element.scrollIntoView( )** : 해당 메서드로 호출 된 요소로 상위컨테이너를 스크롤해서 이동
  - behavior : 애니메이션 전환 auto(default), smooth
  - block : 수직 정렬 start(default), center, end ,nearest
  - inline : 수평 정렬 start, center, end, nearest(default)
    <br/>

```javascript
elemet.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
```

  <br/>
  <br/>

## 6. Script async와 defer 차이점

<br/>

### 6-1. async

: head안에 script를 사용하는 대신에 그 안의 속성값을 async이라고 사용하는것

```html
<script async src="app.js"></script>
```

- Boolean타입의 속성값이다. (선언하는것만으로도 true)
- fetching이 병렬적으로 일어나기 때문에 다운로드 받는 시간을 절약할 수 있다.
- 쿼리 셀렉터로 정의된 조작요소가 있다면, 아직 html 파일을 전부 parsing하기전에 실행이 일어나기 때문에 제대로 정의되어있지 않을 가능성이 있다.
- parsing하는 동안 언제든지 자바스크립트를 실행하기 위해 멈출 가능성이 있어 페이지가 사용동안 멈출 수 있다.
- 작성된 순서에 상관없이 먼저 다운로드된것 부터 실행된다. (순서에 의존적이라면 문제 생길 수 있음)
  <br/>
  <br/>
  [ parsing(분석) HTML ] -> [ app.js를 병렬로 다운 (parsing 같이 진행) ] -> [ blocked + executing ] -> [ parsing HTML ] ->

### 6-2. defer

```html
<script defer src="app.js"></script>
```

- 스크립트를 다 받아 둔 후 마지막 파식이 끝이나고 작성된 순서대로 실행된다.
- defer 속성이 아주 호율적이고 안전하다.
  <br/>
  <br/>
  [ parsing Html + app.js 명령만 시켜놈 ] -> [ app.js를 병렬로 다운 (parsing 같이 진행) ] -> [ blocked + executing ] -> [ excuting(실행)js ]
  <br/>
  <br/>

## 7. window load

<br/>

- window.addEventListner(’load’ , ( ) => { }) <br/>
  : window에서 필요한 요소,리소스들(css, images 등) 전부 로딩이 완료된 후 호출
- window.addEventListner(’DOMContentLoaded’ , ( ) => { })
  - only document만 html만 다 완료가되면 호출
  - head에 defer 속성의 스크립트 태그가 있다면? <Br/>
    [ HTML이 전부 파싱이 된 후 ] -> [ defer 속성의 script 태그 ] -> [ DOMContentLoaded ] -> [ 리소스 이미지 폰트 ] -> [ load ]
- window.addEventListner(’beforeunload’ , ( ) => { }) <br/>
  : 사용자가 페이지를 나갈 때 그 나가기 전에 불려지는 함수 (before unload)
- window.addEventListner(’unload’ , ( ) => { }) <br/>
  : 페이지에 리소스들이 다 unloead될때 불러지는 함수 (resource is being unloaded)

## 8. 참고 사이트

[mdn] https://developer.mozilla.org/en-US/

real 공식은 ecam!
