# 컴포넌트 만드는 방법

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

1. React.Component
2. React.PureComponent

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

1. function
2. memo(function)
3. React Hook
