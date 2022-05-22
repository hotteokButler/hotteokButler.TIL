# function

## 1. Call Signatures

: Call(=function) Signature란 함수의 매개변수와 반환값의 타입을 모두 type으로 미리 선언하는것, (함수가 어떻게 구현되는지 알려주는것은 아님) <br>

(React에서 함수로 props를 보낼 때, 어떻게 작동하는지 미리 설계할 수 있다.) <br>

function의 call signature type 만드는 법

```javascript
type Add = (a: number, b: number) => number;

const add: Add = (a, b) => a + b;
```

## 2. polymorphism (다형성)
