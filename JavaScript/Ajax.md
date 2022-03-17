# <Ajax (Asynchronous JavaScript and XML)>

<br/>
<br/>

1. 정의 : 자바스크립트를 이용해서 비동기적으로 서버와 브라우저가 데이터를 교환할 수 있는 통신방식.
2. 목적 :

- 페이지를 전화할때마다 모든 파일을 다운받는 것이 아니라, 부분적으로 불러오기 때문에, 사용성 증대와 서버 뿐만 아나라 사용자 입장에서도 시간과 돈과 네트워크 자원을 절약할 수 있다.
- 바뀔 수 있는 부분만 Ajax를 사용하여 서버로부터 동적으로 가져와 변경해주기에 효율적이다
- SPA(Single Page Application) 구현에 필요한 핵심이다
- XMLHttpRequest API , fetch API

<br/>
<br/>

## 1-1.fetch API

---

```javascript
fetch('data')
  .then((response) => response.text())
  .then((text) => {
    document.querySelector('article').innerHtml = text;
  });
```

-> fetch() : 첫번째 인자로 전달된 데이터를 서버에게 요청함 <br/>
-> then : 응답이 끝나면 then에서 정의한 콜백함수를 실행시킨다.<br/>
-> fetch()외에 다른 코드들이 있다면 병렬적으로 실행되는 fetch특성상 응답요청을 기다리는동안 먼저 코드를 실행하고, 추후 응답이 끝나면 fetch로부터 받아온 데이터와 콜백함수를 실행한다.<br/>
(fetch는 Asynchronous(비동기)적으로 실행됨, 병렬적으로 실행)<br/>
-> then의 첫번째 인자로 response객체를 받아온다 : <br>

- response객체 : 웹 서버가 응답한 그 결과를 담고 있는 객체, 데이터값들이 들어있다<br>
- status 속성 : 응답에 관련한 상태 표시 (404: not found, 200: 서버로부터 성공적으로 데이터를 받아왔을때 등)
  <br>
  <br>

## 1-2.XMLHttpRequest

---

- XMLHttPRequest는 자바스크립트에서 Http요청을 할 수 있는 내장
  브라우저 객체이다. XML형식 뿐만아니라 어떤 데이터에서도 작동할 수 있다.<br>
  (fetch를 많이 사용)
- 예전방식의 브라우저를 지원해야할때 사용,
- fetch는 업로드 과정을 추적하지 못하기때문에 XMLHttpRequest사용
- 동기적, 비동기적 두가지 기능이 있다.

- 비동기적처리

  1. XMLHttpRequest 생성

  ```javascript
  const request = new XMLHttpRequest();
  ```

  -> 매개변수는 없다 없다
  <br>

  2. new XMLHttpRequest()생성 직후에 초기화

  ```javascript
  request.open(method, URL, [async, user, password]);
  ```

  -> 요청에 대한 메인 파라미터를 정의 <br>

  - method : "GET" / "POST" / "PUT"/ "DELETE" 등 HTTP 통신 방식<br>
  - URL : 요청할 URL (object형식도 가능)<br>
  - async : default 값은 true, false로 지정시 send()메서드는 동기적으로 실행된다.<br>
  - user : default는 null, 인증목적으로 쓰일 user name<br>
  - password : default는 null, 인증목적으로 쓰일 패스워드<br>

  <br>

  3. send()를 통해 서버에 요청 전송

  ```javascript
  request.send(body);
  ```

  -> body에는 요청 본문이 포함됨 <br>

  4. 많이 쓰이는 response event

  - load : 요청이 완료되고 오청사항이 전부 다운되어졌을때
  - error : 리퀘스트가 완료되지 않을때 (예를들어 잘못된 URL 또는 네트워크 다운 등)
  - progress : 응답이 다운되어지는동안 주기적으로 트리거(이벤트에 반응해 자동으로 실행되는 작업)

```javascript
request.onload = function () {
  if (request.status !== 200) {
    alert(`Error ${request.status} : ${request.statusText}`);
  } else {
    alert(`Done, got ${request.response.leght}bytes`);
  }
};

request.onprogress = function (event) {
  if (event.lengthComputable) {
    alert(`Received ${event.loaded} of ${event.total} bytes`);
  } else {
    alert(`Receive ${event.loaded} bytes`);
  }
};

request.onerror = function () {
  alert('Request failed');
};
```
