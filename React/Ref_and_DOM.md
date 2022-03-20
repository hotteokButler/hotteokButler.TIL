# Ref 와 DOM

<br>

_React에서는 DOM요소를 직접적으로 쓰지 않기 때문에 리액트에서 다른 리액트의 요소에 접근하고 싶다면 Ref를 쓰면 된다._

[사용법]

_보통은 input에 접근해야하기 때문에 inputRef라는 멤버변수를 생성 후 React.createRef()호출_

_inputRef = React.createRef();_

_Ref라는 오브젝트가 생성_

_원하는 요소에 ref={this.inputRef}처럼 전달해주면됨_

_-> 컴포넌트가 브라우저에 표기되면서 input이라는 요소가 inputRef와 연결되고_

_요소에 접근해서 해당하는 데이터를 읽어올 수 있다._

<br>
<br>

# Ref

: render() method에서 생성된 DOM 노드나 React Element에 접근하는 방법을 제공
<br>
<br>

### 1-1. 사용해야하는 경우

→ focus , text 선택 영역, media 재생 처리

→ 애니메이션을 직접적으로 실행시

→ 서드 파티 DOM 라이브러리를 React와 같이 사용할 때

( third-party : 프로그래밍 개발과 개발자 사이에 `플러그인, 라이브러리, 프레임워크` 를 서드파티라고 볼 수 있다. 개발을 완료했을때는 서비스-사용자를 이어주는 서드파티는 `응용프로그램, 어플리케이션, 웹서비스` 이다. 이처럼 `제3자` 로써 중간다리의 역할을 하는 것을 서드파티)

> 리액트에서 추구하는 상태값에 따라서 가상의 DOM을 이용해서 리액트 자체적으로 UI를 업데이트 하는것이 중요 원칙이기 때문에 **Ref를 이용해서 직접 DOM요소에 접근해서, 그들의 UI 상태를 업데이트 하는것은 지양**해야함

<br>

### 1-2. Ref 생성

: `React.createRef()` 통해 생성, `ref` attribute를 통해 React Element와 연결

→ 보통, 컴포넌트의 인스턴스가 생서될 때 Ref를 프로퍼티로써 추가하고, 컴포넌트의 인스턴스의 어느 곳에서도 Ref에 접근할 수 있게 함

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

<br>

### 1-3. Ref 접근

: render 메서드 안에 ref가 엘리먼트에게 전달되었을때, 그 노드를 향한 참조는 ref의 current에 담기게된다

```jsx
const node = this.myRef.current;
```

→ ref가 HTML Element에 쓰였다면, 전달받은 DOM Element를 current 프로퍼티의 값으로 전달받음

→ custom Component에 쓰였다면, 마운트된 컴포넌트의 인스턴스를 current 프로퍼티의 값으로 전달받음

→ 함수 컴포넌트(Function Component)는 인스턴스가 없어 ref 사용 못함

<br>

### 1-4. 콜백 ref

: ref가 설정되고 해제되는 상황을 세부 설정할 수 있다.

콜백 ref를 사용할 때에는 `ref` 어트리뷰트에 `React.createRef()` 를 통해 생성된 `ref` 를 전달하는 대신, 함수를 전달하고 전달된 함수는 다른 곳에 저장되고 접근될 수 있는 React 컴포넌트의 인스턴스나 DOM 엘리먼트를 인자로 받는다.

→ref콜백이 인라인 함수로 선언되면, 처음이는 `null` 로, 다음에는 DOM Element로 두번 호출됨

(ref 콜백을 클래스에 바인딩해서 해결가능)

<br>

### 1-5. 예시

: 공식문서 참고

1. DOM 노드에 대한 참조를 저장하기 위해 `ref`를 사용

```jsx
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // textInput DOM 엘리먼트를 저장하기 위한 ref를 생성
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // DOM API를 사용하여 명시적으로 text 타입의 input 엘리먼트를 포커스 : focus()
    //  지금 DOM 노드를 얻기 위해 "current" 프로퍼티 접근
    this.textInput.current.focus();
  }

  render() {
    // React에게 우리가 text 타입의 input 엘리먼트를
    // 우리가 생성자에서 생성한 `textInput` ref와 연결
    return (
      <div>
        <input type="text" ref={this.textInput} />
        <input type="button" value="Focus the text input" onClick={this.focusTextInput} />
      </div>
    );
  }
}
```

→컴포넌트가 마운트될 때 React는 `current` 프로퍼티에 DOM 엘리먼트를 전달하고, 컴포넌트의 마운트가 해제될 때 `current`  프로퍼티를 다시 `null` 로 돌려 놓는다.

`ref`를 수정하는 작업은 `componentDidMount` 또는 `componentDidUpdate`  life-cycle 메서드가 호출되기 전에 이루어진다.

1. ref를 사용하여 `CustomTextInput`  컴포넌트의 인스턴스에 접근하고 직접 `focusTextInput`  메서드를 호출할 수 있다.

```jsx
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return <CustomTextInput ref={this.textInput} />;
  }
}
```

→ CustomTextInput 컴포넌트가 클래스 컴포넌트일때만 적용됨
