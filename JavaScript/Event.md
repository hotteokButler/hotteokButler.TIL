# Event

> 참고
>
> [Introduction to events - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
>
> [Event reference | MDN](https://developer.mozilla.org/en-US/docs/Web/Events)
>
> [Introduction to events - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture)

# 1.Bubbling and Capturing

- 상위 부모요소가 있는 하위 자식요소의 이벤트를 발생시켰을때,

  상위 부모요소에서부터 capturing을 통해서 해당 이벤트의 요소까지 내려오게되고, 이벤트 핸들러를 호출하게됨

- 그리고 bubbling up을 통해 그 이벤트는 상위에 등록된 이벤트를 호출하게되고 버블링을하여 또 그 상위 요소의 이벤트를 호출하게됨

- 원래 호출된 이벤트와 이벤트가 등록된 순서에 따라

  currentTarget ⇒ 해당 이벤트의 타겟

  traget ⇒ 실질적 이벤트가 발생한 타겟

  둘을 통해 버블링되어 실행된 이벤트인지 아닌지 확인 가능!

  ⇒ event.stopPropagation() : 나만 실행하고 종료

  ⇒event.stopImmediatePropagation(): 나까지 실행하고 종료

  이 두가지의 함수는 사용을 지양한다 이벤트가 실행되어있을띠ㅐ 다른 요소들과 유기적으로 처리되는 이벤트가 있을 수 있기 때문에, 오류 발생을 부르는 원인이 된다

  ⇒ 해결책, 부모에서

```jsx
if (event.target !== event.currentTarget) {
  return;
}
```

을 통해서 원치않은 버블링 업을 다른 요소에 영향을 주지않고 취소시킬 수 있다.!

<br>

# 2. Event취소

### `event.preventDefault()` : 브라우저의 기본동작 취소

<br>

- 스크롤링처럼 빠르게 동작해야하는 이벤트에서는 이벤트리스너가 passive(수동적)으로 동작하기에 브라우저가 기본적인 동작을 이벤트 처리를 기다렸다 실행을 하게되면 느려질 수 있기 때문에, preventDefault()라는 명령어를 무시한채 기본 동작을 수행하게된다.

<br>

```javascript
//능동적(active)으로 동작하게 처리하고 싶다면, eventListener의 option중 passive의 속성을 false로 설정해주면 된다.
//하지만 이렇게 기본적으로 passive가 true로 설정된 요소들은 임의로 바꾸어 사용하지 않는게 좋다.

document.addEventListener(
  'wheel',
  (event) => {
    console.log('hello');
  },
  { passive: false }
);
```

<br>

# 3. Event Delegation(위임)

- 시작하기전, Event의 Bubbling에 대해서 이해하고있는게 좋다.
  → 버블링 : 부모 컨테이너는 어떤 자식 요소에서 이벤트가 발생하든 모든 이벤트를 다 들을 수 있다.

* 예)

: 만약 ul안의 li태그들을 한번에 불러와서 이벤트를 처리하고 싶을때

<br>

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      ul {
        list-style: none;
      }
      li {
        width: 100px;
        line-height: 100px;
        text-align: center;
      }
      .selected {
        background-color: tomato;
      }
    </style>
  </head>
  <body>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
    </ul>
    <script>
      // Bad case
      // const lis = document.querySelectorAll('li');
      // lis.forEach(li => {
      //   li.addEventListener('click', () => {
      //     li.classList.add('selected');
      //   });
      // });

      const ul = document.querySelector('ul');
      ul.addEventListener('click', (event) => {
        if (event.target.nodeName == 'LI') {
          event.target.classList.add('selected');
        }
      });
    </script>
  </body>
</html>
```

⇒ for문이나 forEach( )하게되면 나쁜 케이스다. 모든 요소를 찾아서 이벤트를 일일이 등록하는건 좋지않다. 왜냐하면 극단적으로 li의 갯수가 1000개나 10000개가 넘어가게되면 효율이 매우 나쁘다

<br>

⇒ 이벤트리스너는 버블링이라는 특성을 갖고 있기때문에,
부모안에 있는 자식요소에 반복적인 처리를할때 일일이 이벤트 리스너를 자식 노드에 추가 하는 것보다
부모요소에 이벤트를 위와같이 이벤트 위임을 통해 등록하는것이 좋다.

<br>

## 참고 : keypress & keyup & keydown

### keypress : 키를 누르면 어떤키인지 확인해 처리하는데, 이제 deprecated 즉, 더이상 지원되지 않는다 라는뜻

(deprecated라 지정된 것은 사용하지 않고 대체해서 다른걸 써야한다.)

### keypress 를 대신해, `beforeinput` 또는 `keydown` 을 써야한다.

### `keydown` : keydown은 사용자가 키보드를 누르는 순간에 처리

isComposing : 글자가 작성되는 동안에 처리되는 이벤트

### `keyup` : 키업은 누르고있다가 땠을때 keyup이 발생한다

둘의 미묘한 차이가 있기 때문에 잘 구분해서 쓰면된다.
