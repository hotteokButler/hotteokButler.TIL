# Component

<br>
<br>

# 1. Class Component

: 리액트에서 제공하는 Component라는 클래스를 extends, 상속해서 만들 수 있다.

⇒ **리액트에서 컴포넌트를 만들려면 React.Component 클래스를 상속하고, 데이터는 꼭 this.state에 담아 두고, render() 함수에 HTML과 같은 JSX 문법을 이용해서 데이터를 어떻게 UI로 표기 할건지 정의를 해놓도록 만들기! 이것이 리액트 라이브러리에서 정해진 규칙**

- `render()` : UI가 어떻게 표기될것인지 정의
- `this.state` : object형태로 data 저장

⇒ component가 state가 있고, 그 상태에 따라서 컴포넌트가 주기적으로 업데이트 되어야할때 씀

⇒클래스의 멤버 변수를 직접 적으로 수정하지 않는한 멤버 변수는 한번 만들어 지면 계속 그 값이 유지

```jsx
//Component
import React from 'react';

/*lifecycle methods - 컴포넌트가 사용자에게 보여질 때, 돔트리에 올라갔을 때, 돔트리에서 나왔을때, 
컴포넌트가 업데이트 되었을 때 등등 다양한 컴포넌트의 상태에 따라서 함수를 구현해 놓으면 리액트가 알아서 
불러준다.
*/
class LikeButton extends Component {
  //state - Data ,상태
  state = {
    numberOfLikes: 0,
  };
  //render() - 사용자에게 어떻게 보여질지 정의하는 렌더함수
  //=>상태가 변화될때마다 계속 렌더함수가 호출
  render() {
    return <button>{this.state.numberOfLikes}</button>;
  }
}

export default LikeButton;
```

### 1-1. 종류

1. `React.Component`
2. `React.PureComponent`
   : Component에 state나 props에 변화가 없다면(최상위 데이터에 변화가 없다면) render()가 불려지지 않는다 (→ `memo` 도 똑같은 기능) <br>

- `**shouldComponentUpdate()**` : Component를 업데이트 해야 할지 안해야할지 확인하는 함수<br>
  (lifecycle method 중 하나)

  이전의 state나 props와 현재 업데이트된 state나 props를 가볍게(shallow) 비교한다.

  → 이전 state/props === 업데이트된 state/props : `false` 리턴 <br>
  → 이전 state/props !== 업데이트된 state/props : `true` 리턴 <br>
  → shallow comparison (shallow 하게 비교한다는것) = Object의 레퍼런스를 비교한다는 것,object 내부의 변경사항은 신경 안씀 <br>
  (deep comparison : 내부까지 타고들어가 비교 )

- 그래서 PureComponet로만 만드는 게 좋은 일인가? <br>
  → NO : 업데이트가 빈번하게 일어나는 곳에서는 불필요하게 operation을 수행하기때문에 상황에 맞게 사용
  <br>

  ```javascript
  //habit-tracker예시

  import React, { PureComponent } from 'react';

  class Input extends PureComponent {
    formRef = React.createRef();
    inputRef = React.createRef();

    onSubmit = (event) => {
      event.preventDefault();
      const name = this.inputRef.current.value;
      name && this.props.onAdd(name);
      // this.inputRef.current.value = '';
      this.formRef.current.reset();
    };

    render() {
      return (
        <form action="" ref={this.formRef} className="habit_input-box" onSubmit={this.onSubmit}>
          <input type="text" ref={this.inputRef} placeholder="Habit" className="habit_input" />
          <button className="habit_inputBtn">Add</button>
        </form>
      );
    }
  }

  export default Input;
  ```

  → 해당부분은 re-rendering이 되지 않는다. <br>
  → 여기 전달되는 props나 그 안의 state data가 변경되어야 되는데 위 예시는 state는 따로 없고, onAdd 라는 props 하나만 받아 온다.

<br>

<br>
<br>

# 2. Function Component

: 간단하게 함수로 만들 수 있다.

⇒함수형 컴포넌트는 this를 사용하지 않아도되고, 변수로 선언할 수 있다

⇒ 컴포넌트 자체에 데이터(State)가 없는 경우, **외부에서 전달받은 데이터(Props)만 보여주면 될때도 function Component 사용 즉,** 상태가 없고, 항상 정적으로 데이터가 표기가 된다면 function component 사용

(state를 보관하거나, lifecycle를 사용하고자한다면 react hook 사용)

⇒ 함수의 특성상, 함수를 호출할때마다 코드블럭 전체가 다시 실행, 그리고 선언한 모든 로컬 변수들또한 함수의 실행 컨텍스트 안에서 재정의 값의 재할당이 이루어짐 <br>
(이러한 이유로 state를 보관해서 일관적으로 사용자에게 보여줄 수 있는 방법이 없어 자체적인 state를 가질 수 없다)

```jsx
// 함수는 한가지의 일을 수행하는 작은 단위, state나 라이프사이클 메서드가 없다.
// 16.8 버전부터는 React Hook이라는 것을 통해서 함수 컴포넌트에서도 State,lifecycle methods 사용가능 즉, 클래스 컴포넌트에서만 할 수 있던 일들을 함수 컴포넌트에서 할 수 있도록 도와준다.

function App() {
  return <h1>hello</h1>;
}
```

### 2-1. 종류

1. `function`
2. `memo(function)`
   : 함수형 컴포넌트를 클래스 컴포넌트의 PureComponent처럼 사용하려면 memo 라는 함수안에 인자로 전달해주면된다

예)

```javascript
const Input = memo((props) => {
  const formRef = React.createRef();
  const inputRef = React.createRef();

  const onSubmit = (event) => {
    event.preventDefault();
    const name = inputRef.current.value;
    name && props.onAdd(name);
    // this.inputRef.current.value = '';
    formRef.current.reset();
  };
  return (
    <form action="" ref={formRef} className="habit_input-box" onSubmit={onSubmit}>
      <input type="text" ref={inputRef} placeholder="Habit" className="habit_input" />
      <button className="habit_inputBtn">Add</button>
    </form>
  );
});
```

3. `React Hook`

: class component에서만 이용가능했던 state와 lifecycle method를 이용할 수 있게 도와준다.

⇒ 기본적으로 제공되는 훅은 use~로 시작하는 함수

- State Hook : `useState()` → 함수형 컴포넌트에서도 state를 쓸 수 있도록, 일정한 데이터를 기억할 수 있게 도와줌
- Effect Hook : `useEffect()` → lifecycle method처럼 활용할 수 있는, 원하는 데이터만 타겟으로 삼아서 그것이 변경될때마다 호출될 수 있도록 쓸 수 있음
- 그외 `useCallback()` , `useContext`, `useMemo` , `useReducer` , `useRef` 등등 여러가지가 있다.
