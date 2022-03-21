# Component

<br>
<br>

# 1. Class Component

: 리액트에서 제공하는 Component라는 클래스를 extends, 상속해서 만들 수 있다.

⇒ component가 state가 있고, 그 상태에 따라서 컴포넌트가 주기적으로 업데이트 되어야할때 씀

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

⇒ 상태가 없고, 항상 정적으로 데이터가 표기가 된다면 function component 사용

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
