## 1. basic

이렇게 명시적으로 쓰는 것 보다는 typescript는 자동적으로 타입체크를 할 수 있으므로, object의 타입지정이나, 꼭 명시해야하는 경우가 아니라면, typescript엔진이 자동으로 파악하게 두는 것이 낫다.

```javascript
let a: number = 1;
let b: string = 'string';
let c: number[] = [1, 2, 3];
```

### 1) any

-> 어떤 type든 될 수 있다 <br>
-> 타입을 아무것도 지정하지 않음 빈 값에는 자동으로 any라는 타입으로 지정 <br>
-> typescript로 빠져나오고 싶을 때 사용하는 type.(type을 보호받지 못하게되므로 사용을 지양함)<br>

### 2)

<br><br>

## 2. Protect type powerfully

### 2-1. readonly

Constructs a type with all properties of Type set to readonly, meaning the properties of the constructed type cannot be reassigned.

**1)readonly** <br>
=> 읽기 전용
=> readonly를 적용하게되면 immutable한 data type를 지정할 수 있다. (data 보호)

<br>

```javascript
  type Age = number;
  type Name = string;
  type Player = {
    readonly name:Name
    age?:Age
  }
  const playerMaker = (name:string) : Player => ({name});

const soo = player('soo');

soo.age = 12;

soo.name = 'hottoek';
// name 변경시 오류 발생
// interface에서도 사용 가능

const nums: readonly number[] = [1,2];
nums.push('3');
//에러 발생 , 하지만 filter / map과같이 원래의 배열을 바꾸지 않는 것들은 사용가능

```

**2)Tuple**

=> array 생성에 관련됨 <br>
=> 배열을 구조화 시키는 것 : 최소한의 길이를 가져야하고, 특정 위치에 특정 타입이 있어야 함 등..<br>
=> readonly와 같이 사용 가능

```javascript
const player: [string, number, boolean] = [1, 'string', true];

// player에게 array가 최소 3개의 아이템을 가지고, string, number, boolean 순서의 구조를 가진다고 알려줌 따라서 오류발생

const player: [string, number, boolean] = ['string', 1, true];
//정상 작동
```
