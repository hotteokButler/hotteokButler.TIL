# JSX

<br>

> 참고 사이트
>
> [introducing JSX] : [https://reactjs.org/docs/introducing-jsx.html](https://reactjs.org/docs/introducing-jsx.html)
>
> [JSX In Depth] : [https://reactjs.org/docs/jsx-in-depth.html](https://reactjs.org/docs/jsx-in-depth.html)

<br>
<br>

# 1. 컨셉

<br>

1. JSX는 자바스크립트 코드다.
2. 변수나 함수나 비즈니스 로직을 쓰고싶다면 {} 중괄호로 묶어서 사용한다.
3. 렌더함수나 function함수에서 JSX를 리턴하게되는데 형제 노드를 쓸 수 없다.

   (즉, 다수의 태그들을 리턴할 수 없다)

   ⇒ <React.Fragment></React.Fragment> : 태그를 생성해서 wrapping해주는것이 아니라 형제 노드를 만들어 주는 wrapper

   ⇒ <></> : React.Fragment와 똑같다.

   위의 두 태그는 의미없이 묶어주기만할때 사용하면 된다

   ⇒ ol, ul, dl/dt/dd 등은 당연히 의미 있는 태그를 이용해서 리턴

4. JSX안에서는 자바스크립트 코드 작성이 가능하다

   (JSX 내부에서 if-else는 지원안됨

5. JSX는 HTML보다는 JavaScript에 가깝기 때문에, React DOM은 HTML 어트리뷰트 이름 대신 `camelCase` 프로퍼티 명명 규칙을 사용

   (예를 들어, JSX에서 `class`는 `className`가 되고 tabindex는 `tabIndex`가 됩니다.)

예)

```jsx
function App() {
  const name = 'soo';
  return (
    <React.Fragment>
      <h1 className="title" onClick="">
        Hello {name}!
      </h1>
      <p>hello</p>
      {name && <p> JSX내부 자바스크립트 코드 작성가능 </p>}
      {['🍓', '🍎', '🍊', '🍋'].map((item) => (
        <span>{item}</span>
      ))}
    </React.Fragment>
  );
}
```

⇒ class이름은 className=”클래스이름" 으로 지정

⇒ 참고: onclick속성또한 onClick처럼 CamelCase로 적어야한다

⇒ name이라고 선언한 변수를 사용하고싶다면 {name} 처럼 괄호를 사용한다

⇒ name이라는 변수에 값이 있다면 태그를 작성하라처럼 비즈니스 로직도 작성 가능 {} 로 감싸줘야함

⇒ map API를통한 코드 구현도 가능

<br>
<br>

1. JSX도 표현식이다.

   (JSX를 `if` 구문 및 `for`  loop 안에 사용하고, 변수에 할당하고, 인자로서 받아들이고, 함수로부터 반환할 수 있습니다.)

2. JSX 태그의 첫 부분은 React element의 타입을 결정

   (대문자로 시작하는 JSX 태그는 React 컴포넌트를 지정 , 해당 컴포넌트가 scope내에 존재해야함)

3. JSX 내에서도 점 표기법을 사용하여 React 컴포넌트를 참조가능

   (하나의 모듈에서 다수의 컴포넌트를 관리할때 유용)

4. 사용자 정의 컴포넌트는 반드시 대문자로 시작

   (소문자는 문자열 형태로 React.createElement로 전달되어 태그로 생성, 대문자로 시작하는 타입은 React.createElement(APP)으로 컴파일되어 파일내 사용자 정의 컴포넌트나 ,import된 컴포넌트를 가리킨다)

```jsx
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  },
};

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```
