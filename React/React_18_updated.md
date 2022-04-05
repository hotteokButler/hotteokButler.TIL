# React 18 updated

### 1. DOM rendering 방식 변경

18버전에서는 ReactDOM.render지원 안함

`createRoot`를 사용해야함!

<br>

```javascript
//Before

import {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import App from './App';


// your app will behave as if it's running React 17.
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);


//After
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// IMPORTANT: use correct ID of your root element
// this is the ID of the div in your index.html file
const container = document.getElementById('root');
const root = createRoot(container!);
//typescript아니면 not-null(!)빼고
// const root = createRoot(container);


root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

```

[더 추가하기...]
