# < CallBack >

<br>

### \* JavaScript is synchronous

⇒ Execute the code block in order after hoisting

(→ hoisting : var , function declaration)

<br>

## 1.Synchronous callback

```javascript
//예
function printImmediately(print) {
  print();
}
printImmediately(() => console.log('hello'));
```

<br>

## 2.Asynchronous callback (언제 실행될지 예측불가)

```javascript
//예
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}
printWithDelay(() => console.log('async callback'), 2000);
```

<br>

## 3.callback Hell example

```jsx
class UserStorage {
	loginUser(id, password, onSuccess, onError) {
		setTimeout(()=> {
			if (
					(id ==='soo' && password === 'dream') ||
					(id ==='coder' && password === 'academy')
			) {
				onSuccess(id);
			} else {
				onError(new Error('not found'));
			}
		},2000);
	}
	//원래는 사용자가 로그인하면 사용자의 정보를 한번에 백엔드에서 받아오는게 맞음! 이건 예시라 따로 나눠둠
	getRoles(user, onSuccess, onError) {
		setTimeout(()=>{
			if (user === 'soo') {
				onSuccess({name; 'soo', role:'admin'});
			} else {
				onError(new Error('no access'));
			}
		},1000);
	}

const userStorage = new UserStorage();
const id = prompt('Enter your ID');
const password = prompt('enter your password');
userStorage.loginUser(
	id,
	password,
	user => {
		userStorage.getRoles(
			user,
			userWithRole => {
				alert(
					`Hello ${userWithRole.name}, you have a ${userWithRole.role} role`
				);
			},
			error => {
				console.log(error);
			}
		);
	},
	error => {
		console.log(error);
	}
);

//문제점 : 가독성이 떨어진다 | 에러가 어디서 발생하는지 디버깅할때 알 수 없음 | 유지보수가 어렵다
```

<br>
<br>

# < Promise >

<br>

: **자바스크립트에서 제공하는 비동기를 간편하게 처리할 수 있게 도와주는 자바스크립트의 오브젝트**

: 정해진 장시간의 기능을 수행하고나서, 정상적으로 기능이 수행되면 성공의 메시지와함께 처리결과값 전달, 예상치 못한 문제 발생시 에러전달

Point : 1) State 2)Producer 와 Consumer 과의 차이점 이해하기

1)State : pending(operation이 실행중일때) → fullfilled(성공) or rejected(실패)

2)Porducer(Promise Obj) vs Consumer

<br>

## 1. Producer

```javascript
//promise를 만드는 순간 그 안에 전달한 executer라는 콜백함수가 바로 실행하기때문에, 불필요한상황에도 실행이 될 수 있다. 잘 이해하고 사용해야함

const promise = new Promise((resolve, reject) => {
  //doing some heavy work(network, read files) => 비동기처리를 하는게 좋다
  setTimeout(() => {
    //resolve('soo');
    reject(new Error('no network'));
  }, 2000);
});
```

<br>

## 2. Consumers : then, catch, finally

```javascript
promise
	.then((value)=>{
		console.log(value);
	})
	.catch(error => {
		console.log(error);
	})
	.finally(()=>{
		console.log('finally')'
	})
//then : promise가 정상적으로 잘 실행이 되어서 마지막에 최종적으로 resolve라는 콜백함수로 전달한 그 값이 value라는 파라미터로 전달되어져 들어온다
//catch로 에러가 발생했을때 처리할 콜백함수 등록
//finally : 성공유무에 상관없이 무조건 마지막에 호출되는함수
//promise의 then을 호출하게되면 똑같은 pormise를 리턴하기때문에 리턴된 promise에 catch를 다시 호출 할 수 있다 => chaining

```

<br>

## 3.Promise chaining

```jsx
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then((num) => num * 2)
  .then((num) => num * 3)
  .then((num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then((num) => console.log(num));
```

<br>

## 4. Error Handling

```javascript
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('🐓'), 1000);
  });
const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${hen} => 🥚`), 1000);
  });
const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 🍳`), 1000);
  });

getHen() //
  .then((hen) => getEgg(hen))
  .catch((error) => {
    return '🥐';
  })
  //오류처리를통해 프로미스체인이 실패하지않게 해준다
  .then((egg) => cook(egg))
  .then((meal) => console.log(meal)); // 🐓 => 🥚 => 🍳
//하나의 값을 바로 함수에 전달하는경우에는
//.then(getEgg) then에서 받아온 value를 getEgg에 암묵적으로 전달 가능하다
```

<br>

## 5. 예제 코드 정리

```javascript
class UserStorage {
	loginUser(id, password) {
		return new Promise((resolve, reject)=> {
				setTimeout(()=> {
				if (
						(id ==='soo' && password === 'dream') ||
						(id ==='coder' && password === 'academy')
				) {
					resolve(id);
				} else {
					reject(new Error('not found'));
				}
			},2000);
		});
	}

	getRoles(user) {
		return new Promise((resolve, reject)=> {
				setTimeout(()=>{
				if (user === 'soo') {
					resolve({name: 'soo', role:'admin'});
				} else {
					reject(new Error('no access'));
				}
			},1000);
		});
	}
}

const userStorage = new UserStorage();
const id = prompt('Enter your ID');
const password = prompt('enter your password');

userStorage.loginUser(id, password)
.then(userStorage.getRoles)
.then(user => alert(`Hello ${user.name}, you have a ${user.role} role`)
.catch(colsole.log);

//async await

async function longinUser() {
	try {
		const userId = await userStorage.loginUser(id,password);
		const user = await userStorage.getRoles(userId);
		console.log(`Hello ${user.name}, you have a ${user.role} role`)
	}
	catch {
		console.log(error);
	}
}
```

<br>
<br>

# < async & await 보충 >

: clear style of using promise
<br>

## 1. async

```jsx
async function fetchUser() {
  return 'soo';
}

const user = fetchUser();
console.log(user);
```

<br>

## 2.await

: async라고 붙은 함수 안에서만 사용가능

```javascript
function delay(ms) {
	return new Promise(resolve => setTimeout(resolve,ms);
}

async function getApple() {
	await delay(3000);
//delay가 끝날때까지 기다렸다가 반환하게된다
	return 'apple'
}

async function getBanana() {
	await delay(3000);
	return 'banana';
}

async function pickFruits() {
	//두 값을 불러오는데 연관이 없기때문에 아래와 같이 바로 data를 불러와 처리하는 하는방식이 낫다. (병렬처리)
	const applePromise = getApple();
	const bananaPromise = getBanana();
	const apple = await applePromise;
	const banana = await bananaPromise;
	return `${apple} + ${banana}`;
}
pickFruits().then(console.log);// apple + banana
```

<br>

## 3. useful Promise API

```jsx
//위의 pickFruits()를 아래의 코드와 같이 깔끔하게 정리할 수 있다.
//promise배열을 전달하게되면, 모든 promise들이 병렬적으로 다 받아질때까지 모아주는 기능을한다 (꼭 배열로 전달)

function pickAllFruits() {
  return Promise.all([getApple(), getBanana()]).then((fruits) => fruits.join(' + '));
}
pickAllFruits().then(console.log);

function pickOnlyOne() {
  return Promise.race([getApple(), getBanan()]);
}

//값을 가장먼저 리턴하는 아이만 값을 전달
```
