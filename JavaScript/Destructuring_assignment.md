# Destructuring assignment(구조분해할당)

1. 정의 : The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variable
   (배열이나 객체의 속성을 개별변수에 담을 수 있는 문법 )
   <br/>
   <br/>

## 1. 배열(Array)

1. 기본변수 할당

   ```javascript
   const foo = ['one', 'two', 'three'];

   const [first, second, third] = foo;

   //frist = "one"
   //second = "two"
   //third = "three"
   ```

2. 선언후 따로 정의

   ```javascript
   let a, b;

   [a, b] = [1, 2];
   console.log(a); // 1
   console.log(b); // 2
   ```

3. 기본값

   할당될 값이 없는 경우(undefinde) default값 적용

   ```javascript
   let a, b;

   [a = 5, b = 7] = [1];
   console.log(a); // 1
   console.log(b); // 7
   ```

4. 구조분해할당을 이용한 값 교환

   ```javascript
   let a = 1;
   let b = 3;

   [a, b] = [b, a];
   console.log(a); // 3
   console.log(b); // 1
   ```

5. 나머지 연산자 사용
   남은 부분을 나머지 연산자를 사용해 하나의 변수에 할당 가능

   ```javascript
   const [a, ...b] = [1, 2, 3];
   console.log(a); // 1
   console.log(b); // [2, 3]
   ```

<br/>
<br/>

## 2. 객체 (Object)

1. 기본할당

   ```javascript
   const o = { p: 42, q: true };
   const { p, q } = o;
   console.log(p); // 42
   console.log(q); // true
   ```

2. 새로운 변수 이름으로 할당하기 , 기본값 할당하기

   객체로부터 속성을 해체하여 객체의 원래 속성명과는 다른 이름을 변수에 할당 가능 `:` 사용
   <br>
   객체로부터 해체된 값이 `undefined`일 경우 기본값을 `=`를 이용해 할당 가능

   ```javascript
   //다른 변수이름 지정
   const o = { p: 42, q: true };
   const { p: foo, q: bar } = o;

   console.log(foo); // 42
   console.log(bar); // true

   // 기본값 할당
   const { a: aa = 10, b: bb = 5 } = { a: 3 };

   console.log(aa); // 3
   console.log(bb); // 5
   ```

## 3. 중첩 객체 및 배열 구조분해 예시

```javascript
const metadata = {
  title: 'Scratchpad',
  translations: [
    {
      locale: 'de',
      localization_tags: [],
      last_edit: '2014-04-14T08:43:37',
      url: '/de/docs/Tools/Scratchpad',
      title: 'JavaScript-Umgebung',
    },
  ],
  url: '/en-US/docs/Tools/Scratchpad',
};

const {
  title: englishTitle,
  translations: [{ title: localeTitle }],
} = metadata;

console.log(englishTitle); // "Scratchpad"
console.log(localeTitle); // "JavaScript-Umgebung"
```

> 예제 및 참고 : <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment">MDN Destructuring assignment</a>
