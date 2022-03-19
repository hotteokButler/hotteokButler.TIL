# State & Props

<br>
<br>

## 1. State

: **컴포넌트 안에서 우리가 정의한 컴포너트의 state object**

- 컴포넌트 UI를 위한 데이터를 보관하는 오브젝트로, state object를 통해서 데이터에 업데이트가 발생하면 리액트가 자동적으로 구현한 render함수를 호출

  <br>

## 2. this.setState() : state update

: 컴포넌트 로컬 state를 업데이트하기 위해 사용.

```jsx
//wrong
this.state.comment = 'hello';
```

→ state 업데이트할때는 react의 setState함수를 꼭 호출해줘야만 변경사항을 지정할 수 있다, 부분적으로 업데이트(위 처럼 직접 state를 수정하는)는 불가능

```jsx
//Correct
this.setState({ comment: 'Hello' });
```

<br>

2-1. **state 업데이트는 비동기적일 수 있다.**

(리액트는 성능을 위해 여러 setState()를 한번에 처리 할 수 있다 ⇒ this.props와 this.state는 비동기적으로 업데이트 될 수 있기에 다음에 일어날 상태를 예측해 의존하면 안됨!)

```jsx
//Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});

//Correct

this.setState((state, props) => ({
  counter: state.counter + props.counter,
}));
```

→ setState 함수는 첫번째 인자로 state를, 두번째 인자로 props를 받아온다.

<br>
<br>

2-2. 컴포넌트는 자신의 state를 자식 컴포넌트에 props로 전달할 수 있다.

```jsx
<FormattedDate date={this.state.date} />;

// ----------------------*

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <FormattedDate date={this.state.date} />
      </div>
    );
  }
}
```

<br>
<br>

## 2. Props

: **컴포넌트 밖에서 주어지는 데이터 (속성을 나타내는 데이터)**
<br>

2-1. 컴포넌트 외부에서 데이터를 제공받는다

2-2. 컴포넌트의 재사용성 증대 (상황에 따라 주어진 데이터를 받아서 그 데이터에 맞게 UI를 보여주기 위해서 사용)

2-3. 함수 컴포넌트나 클래스 컴포넌트 모두 컴포넌트의 자체 props를 수정해서는 안 된다.

```jsx
<LikeButton title={'like'} onClick={this.handleClick} />
```

→ 사용자 커스텀 컴포넌트인 LikeButton을 사용할 때 title, onClick과 같은 속성을 인자로 전달해주면 해당 속성들이 props object로 묶여서 LikeButton 컴포넌트에 전달되어진다

→ LikeButton안에서 this.props.title , this.props.onClick으로 전달받은 속성에 접근 가능하다

```jsx
class App extends Component {
  handleClick = (event) => {
    console.log(event);
  };

  render() {
    return <LikeButton title={'like'} onClick={this.handleClick} />;
  }
}

class LikeButton extends Component {
  state = {
    numberOfLikes: 0,
  };
  render() {
    console.log(this.props);
    console.log(this.state);
    return <button>{this.state.numberOfLikes}</button>;
  }
}
```

→ 전달된 인자들이 오브젝트로 묶어져서 LikeButton 컴포넌트 안에서 this.props로 할당되어진다.

<br>
<br>

2-4. props는 읽기전용

(함수 컴포넌트나 클래스 컴포넌트 모두 컴포넌트 자체의 props를 수정해서는 안됨.)

⇒ 모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수(입력값을 바꾸지 않고 동일한 입력값에대해 동일한 결과를 반환)처럼 동작해야 합니다.

→ FormattedDate 컴포넌트는 date를 props로 받아왔지만,

이것이 Clock의 state로부터 왔는지, props에서 왔는지, 직접

작성한것인지는 모른다.

⇒ 하향식(top-down) 또는 단방향식 데이터 흐름으로 부름!

(모든 state는 항상 특정한 컴포넌트가 소유하고 있으며, 그
state로 부터 파생된 UI 또는 데이터는 오직 트리구조에서 자신의
아래에 있는 컴포넌트에만 영향)
