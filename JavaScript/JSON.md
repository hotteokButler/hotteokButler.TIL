# JSON(JavaScript Object Notaion)

- simplest data interchange format
- lightweight text-based structure
- easy to read
- key-value pairs
- used for serialization(직렬화) and transmission of data between the network the network connection
- **independent programming language and platform (프로그래밍언어나 플렛폼에 상관없이 쓸 수 있음)**

point! =>object를 어떻게 serialize 해서 json으로 변환할지, 직렬화된 json을 deserialize해서 object로 변환할지

받아온 json의 포멧이 망가져있는 경우: JSON Beautifier (에디터에서 json 파일을 만들어서 복붙 후 포맷하는방법 두 있음)

json file을 object가 어떻게 표기되는지 확인해 볼 수 있다.

### 참고

- JSON에 대해 조금더 공부를 하고 싶으시면: [https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)
- JavaScript.info : [https://javascript.info/json](https://javascript.info/json)
- JSON Diff checker: [http://www.jsondiff.com/](http://www.jsondiff.com/)
- JSON Beautifier/editor : [https://jsonbeautifier.org/](https://jsonbeautifier.org/)
- JSON Parser : [https://jsonparser.org/](https://jsonparser.org/)
- JSON Validator: [https://tools.learningcontainer.com/json-validator/](https://tools.learningcontainer.com/json-validator/)

<br>
<br>

# 1. Object to JSON

### \* JSON.stringify(obj)

: 함수는 object에 있는 데이터가 아니기때문에 제외됨

: 자바스크립트에만있는 특별한 데이터도 업데이트가 안됨 (ex) Symbol 같은거)

: 콜백함수(replacer)를 사용하면 내가원하는 property만 전달가능

```jsx
const rabbit = {
  name: 'tori',
  color: 'white',
  size: null,
  birthDate: new Date(),
  jump: () => {
    console.log(`${this.name} can jump!`);
  },
};

let json = JSON.stringfy(rabbit, ['name', 'color']);
console.log(json); // {"name":"tori","color":"white"} -> 내가 원하는 property만 골라서 전할 수 있다

let json = JSON.stringfy(rabbit, (key, value) => {
  return key === 'name' ? 'soo' : value;
});
//콜백함수에서 인자로 key와 value가 object자체(최상위것)을 포함해서 모든 key와 value가 전달
//name 의 값이 soo로 변경된 후 값이 변경되게 이런식으로도 만들 수있음
```

> 오버로딩(Overloading) : 함수이름은 동일하지만 어떤 파라미터를 전달하냐, 몇개의 파라미터를 전달하냐의 따라서 각각 다른 방식으로 호출이 가능한것

<br>
<br>

# 2. JSON to Object

### \* JSON.parse(json)

: serialize될때 함수라던가 자바스크립트에만 있는 특별한 데이터는 포함되지 않기때문에 만약에 포함된 object를 serialize한 후, 다시 deserialize하게되면 포함되지 않는다

: revival이라는 콜백함수를 정의해서 아래와 같이 다시 ‘new Date()’를 할당해서 deserialize할 수 있다

```jsx
//만약 json으로 변경된 값중에 원래대로 object를 가져오고싶을때는
let parseJson = JSON.parse(json, (key, value)=> {
	retrun birthDate ? new Date() : value
})
//이렇게 변환해주면 원래 rabbit의 birthDate프로퍼티의 new Date()를 불러와 사용할 수 있다
```
