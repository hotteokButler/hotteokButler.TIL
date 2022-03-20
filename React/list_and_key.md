# Lists and Keys

<br>

_리액트에서는 자식 컴포넌트가 있다면, 고유한 키를 갖고 있어야한다._

_각각의 컴포넌트에 id를 부여함으로써 id가 동일하다면 자식요소가 변경되어진게 아니기때문에 다른 자식요소가 추가되거나 위치가 변경이 되어도 리액트가 성능 개선을 위해 다시 렌더링을 하지 않는다던지 성능을 아이디를 이용해 개선하기에 자식컴포넌트에 id를 부여하는것이 중요하다!_

_=> 키는 원래 고유한 번호를 써야함, 배열의인덱스는 사용하면 안됨1 키를 항상 제공하기!_

> [참고 사이트 바로가기](https://reactjs.org/docs/lists-and-keys.html)

<br>

---

## 1. List

### 1-1. 여러개의 컴포넌트 렌더링 하기

1. 기본적인 리스트 컴포넌트 예시

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => <li>{number}</li>);
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(<NumberList numbers={numbers} />, document.getElementById('root'));
```

→ 해당 코드를 실행하게되면 ‘a key should be provided for list items’ 라는 리스트 각 항목에 key를 넣어야한다는 에러 메시지를 받게된다.

→ key는 리스트 elements를 만들때 꼭 포함시켜야하는 특수한 문자열 attribute이다.

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString() >{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);

```

로 해결

<br>
<br>

## 2. Key

- 리액트가 어떤 항목을 변경 추가 또는 삭제할지 식별하는 것을 도우며, element에 안정적인 고유성과 식별성을 부여하기 위해 배열 내부의 엘리먼트에 지정
- 대부분 id를 key로 사용한다
- 배열의 인덱스를 부여하는것은 항목의 순서가 바뀌게되면 동일한 엘리먼트라도 key값이 변할 수 있다.

<br>

### 2-1.올바른 key 사용법

```jsx
function ListItem(props) {
  // 여기에는 key를 지정할 필요가 없습니다.
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => (
    // 배열 안에 key를 지정해야 합니다.
    <ListItem key={number.toString()} value={number} />
  ));
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(<NumberList numbers={numbers} />, document.getElementById('root'));
```

→ ListItem 컴포넌트를 뽑아서 ul리스트 안의 자식요소로 넣어야한다면
<br>
<br>

`map()` 함수 내부에 있는 엘리먼트에 key를 넣어 주는 게 좋습니다. ( key자체가 컴포넌트 리스트들을 식별하기위한 고유한 id이기 때문에

- Key는 형제 사이에서만 고유한 값이어야 한다.

  - Key는 배열 안에서 형제 리스트 사이에서 고유해야 하고 전체 범위에서 고유할 필요는 없습니다. 두 개의 다른 배열을 만들 때 동일한 key를 사용할 수 있다.

  ```jsx
  function Blog(props) {
    const sidebar = (
      <ul>
        {props.posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    );
    const content = props.posts.map((post) => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </div>
    ));
    return (
      <div>
        {sidebar}
        <hr />
        {content}
      </div>
    );
  }

  const posts = [
    { id: 1, title: 'Hello World', content: 'Welcome to learning React!' },
    { id: 2, title: 'Installation', content: 'You can install React from npm.' },
  ];
  ReactDOM.render(<Blog posts={posts} />, document.getElementById('root'));
  ```

- React에서 key는 힌트를 제공하지만 컴포넌트로 전달하지는 않습니다. 컴포넌트에서 key와 동일한 값이 필요하면 다른 이름의 prop으로 명시적으로 전달한다.
  ```jsx
  const content = posts.map((post) => <Post key={post.id} id={post.id} title={post.title} />);
  ```
  → Post 컴포넌트는 props.id를 읽을수 있지만 props.key는 읽지 못함
