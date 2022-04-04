# Styled components

## 0.Concept

- Automatic critical Css : 자동적으로 컴포넌트를 생성해 css를 적용시켜준다
- No class name bug : 개별적으로 겹치지앟는 class이름을 생성해 스타일이 덮어씌워지거나 중복되거나 이름의 철자가 틀릴 걱정이 없음
- porps와 global theme을 이용한 간단한 동적 styling가능
- css파일을 컴포넌트별로 따로 관리해주지 않아도되어 관리하기 용이
- Automatic vendor prefixing : 표준스타일링으로 작성해도 자동적으로 벤더프리픽스 적용

## 1.start

사용하는 package매니저에 따라서 해당 디렉토리폴더내에 설치

    # with npm
    npm install --save styled-components

    # with yarn
    yarn add styled-components

vsCode 에디터에서 styled-components의 자동완성은 해주지 않으므로 익스텐션을 따로 설치해주면 편하다

    vscode-styled-components

## 2.basic

<br>

### 1. 기본 문법

```javascript
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #232323;
`;

/*
const ComponentName = styled.HtmlTag`
  css styling
`
*/

const App = (props) => <Title />;
```

-> 꼭 backtick(`)로 감싸줘야한다

<br>

### 2. props 전달

-> 리액트의 컴포넌트처럼 props를 전달하여 사용할 수 있다.

```javascript
const Wrap = styled.div`
  display: flex;
`;
const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.bgColor};
`;

const App = (props) => {
  return (
    <Wrap>
      <Box bgColor="tomato" />
      <Box bgColor="orange" />
    </Wrap>
  );
};
```

-> `props.해당props` 형태로 접근해야한다.

<br>

### 3. extending style(확장해서 쓰기)

-> 스타일 중복이 있는경우 스타일 컴포넌트를 확장해서 사용할 수 있음

```javascript
const Wrap = styled.div`
  display: flex;
`;
const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.bgColor};
`;
const Box2 = styled(Box)`
  color: white;
`;

const App = (props) => {
  return (
    <Wrap>
      <Box bgColor="tomato" />
      <Box2 bgColor="orange" />
    </Wrap>
  );
};
```

-> `styled(확장해서쓸 style-component)` 형식으로 불러온 뒤 뒤에 백틱을 사용해 style을 확장해주면된다

<br>

### 4. as

-> 스타일은 그대로 쓰면서 html태그의 형식만 바꿔쓸 경우 (완전히 똑같은 스타일을 가져와 쓰는 경우)

```javascript
const Wrap = styled.div`
  display: flex;
`;
const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: tomato;
`;

const App = (props) => {
  return (
    <Wrap>
      <Box as="a" href="https://www.naver.com" target="_blank" />
    </Wrap>
  );
};
```

-> 개발자도구로 검사해보면 스타일은 그대로면서 div태그가 a태그로 바꼈있다. `as="바꿀 html 태그 이름"` 형식으로 쓴다

<br>

### 5. 위에처럼 직접쓰지않고 html 태그 속성값 추가하는 다른 방법

-> styled.HtmlTagName.attrs({object형식})` -> styled.HtmlTagName.attrs((props)=>({object형식}))`

props도 전달해줄 수 있으며, object로 전달해준다.

```javascript
const Wrap = styled.div`
  display: flex;
`;

const Input = styled.input.attrs({
  type: 'text',
  value: 'yo',
  required: true,
  autoFocus: true,
})`
  background-color: lightblue;
  padding: 2em;
`;

const App = (props) => {
  return (
    <Wrap>
      <Input />
    </Wrap>
  );
};
```

<br>

### 6. Pseudoelements, pseudoselectors, and nesting

```javascript
const Wrap = styled.div`
  display: flex;
`;
const P = styled.p`
  color: blue;
`;
const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.bgColor};

  &:hover {
    width: 150px;
    height: 150px;
  }

  span {
    &:hover {
      color: white;
    }
  }
  //상위 요소의 className이 container일때 적용
  .container & {
    width: 50px;
    height: 50px;
    color: orange;
  }
  //자식 태그로 다른 스타일 컴포넌트 가져와 해당하는 관계일때만 스타일 적용가능
  ${P}:hover {
    color: white;
  }
`;

const App = (props) => {
  return (
    <Wrap>
      <Box bgColor="tomato">
        <span>Hello</span>
        <P />
      </Box>
      <div className="container">
        <Box bgColor="green" />
      </div>
    </Wrap>
  );
};
```

### 7. ThemeProvider

```javascript
//index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from 'styled-components';
import App from './app';

const dark = {
  textColor: 'whitesmoke',
  backgroundColor: '#232323',
};
const light = {
  backgroundColor: 'whitesmoke',
  textColor: '#232323',
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={light}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

//app.jsx
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const Button = styled.button`
  padding: 1em;
  font-size: 2em;
  cursor: pointer;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
`;

const DarkMode = (props) => {
  return (
    <Wrapper>
      <Button onClick={changeMode}>{mode}</Button>
    </Wrapper>
  );
};
```
