# React Hook

- Function Component는 클래스가 아니라 함수! 함수안에 있는 것들은 컴포넌트가 변경되면 코드블럭 전체!가 계속 반복해서 호출됨!!!
  즉, 지역변수들 이런것들도 무한정 반복된다. (모든 비즈니스 로직들이 다시 수행된다 )
- Only call Hooks **at the top level**. Don’t call Hooks inside loops, conditions, or nested functions.
- Only call Hooks **from React function components**

> Class Component는 한번 만들어지면, 클래스 안의 멤버 변수/함수들은 클래스가 만들어질때 딱 한번만 만들어진다. 대신 state가 변경되거나 props가 업데이트되면 render함수만 계속 반복해서 호출됨!
> (즉, 한번 만들어진 멤버변수는 한번만 할당되어진다)

<br>
<br>
---
<br>
<br>

### 1. useState(초기값)

- 리액트 훅에서 state를 쓴다는것?
  : useState API사용 => state를 설정하고, state를 업데이트 할 수 있는 함수를 받아올 수 있다
- useState는 current state value 와 state를 업데이트하는 function을 리턴한다
- useState()것은 리액트 훅에서 제공하는 api중의 하나로 useState를 쓰게되면 리액트가 알아서 자동으로 캐시 메모리에 기억한다.
  (따로 저장이 되어져있어서 계속 동일한 값을 받아오는 것, 리액트 훅에는 이런 API들이 많아서 업데이트가 반복적으로 일어나더라도 동일한 값을 메모리에 저장해놓기 때문에 초기 설정값이 다시 할당되는것은 걱정하지 않아도된다.)

      const [state변수(즉, 실제 state값과) , state를 처리할(업데이트할) 함수] = useState(초기값);

  ( 함수안에서 여러가지 useState가 존재할 수 있다 )

<br>
<br>

### 2. useCallback()

리액트가 자동으로 캐시를 해서 즉, 반복해서 호출이 되어도 동일한 콜백함수를 전달한다 (사용시 주의할점이 있음)

```jsx
const handleIncrement = useCallback(() => {
  setCount(count + 1);
});
```

→ 만약 해당 해당 콜백을 받는 요소가 아래처럼 button태그가아니라 자식 컴포넌트라면, onClick의 props에 새로운 콜백이 전달되면 memo라는 캐시컴포넌트를 써도 props 그리고 함수 자체가 변경이 되기때문에 계속 업데이트가되는 side-effect가 발생하게 됨 <br>
(\*Side Effect : return값 이외에, 호출 된 함수 밖에서 관찰할 수 있는 어플리케이션의 상태 변경이다. 부수효과)
<br>
<br>

### 3. useEffect()

- 컴포넌트가 마운트되었을때 그리고 업데이트 될때마다 호출된다
  (기존 `componentDidMount` 와 `componentDIdUpdate` 두가지를 결합할때 코드 중복하는 경우가 있었는데 그걸 줄여주기위해 사용) <br>

      useEffect(callback function , [옵션])

      useEffect(callback function, [count]) // count가 변경될때마다 호출 (여러가지도 전달 가능)

      useEffect(callback function, []) // mount시에만 호출 호출

예시)

```jsx
import React, { useEffect, useRef, useState } from 'react';

const HabitHook = (props) => {
  const [count, setCount] = useState(0);
  const spanRef = useRef();

  const handleIncrement = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    console.log(`mounted & updated!: ${count}`);
  }, []);

  return (
    <li className="habit">
      <span ref={spanRef} className="habit-name">
        Habit
      </span>
      <span className="habit-count">{count}</span>
      <button className="habit-button habit-increase" onClick={handleIncrement}>
        <i className="fa-solid fa-square-plus"></i>
      </button>
    </li>
  );
};

export default HabitHook;
```
