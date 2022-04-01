# Optional Chaining

[참조] <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining" target="_blank">Optional chaining (?.)</a>

The optional chaining operator (`?.`) enables you to read the value of a property located deep within a chain of connected objects without having to check that each reference in the chain is valid.

( 즉, 바로 nested된 객체의 내부 속성값까지 읽어올 수 있게하는 기능)

레퍼런스가 `nullish`(`null` or `undefined`)일때 일반적인 chaining operator인 `.`은 에러 발생시기키지만, `?.`는 오류를 내지않고 만약 없다면 `undefined`를 리턴한다

(함수에서 사용하면 동일하게 `undefined`를 리턴한다)

➡ Root Object가 선언되지 않으면 사용 불가

문법

```
obj?.prop
obj?.[expr]
arr?.[index]
func?.(args)
```

optional chaining없이 접근하려하면 `&&` 연산자 사용해야함

```javascript
//optional_chaining
let nestedProp = obj.first?.second;

//without optional_chaining
let nestedProp = obj.first && obj.first.second;
```

예1)

```javascript
const adventurer = {
  name: 'Ruru',
  cat: {
    name: 'Hotteok',
  },
};

const dogName = adventurer.dog?.name;
console.log(dogName);
// expected output: undefined

console.log(adventurer.someNonExistentMethod?.());
// expected output: undefined
```
