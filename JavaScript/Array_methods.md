# Array methods

## 1. Array.prototype.findIndex()

1. 구문

   ```javascript
   arr.findIndex(callback(element[, index[, array]])[, thisArg])
   ```

2. 정의

   findIndex 메서드는 콜백 함수가 true인값 을 반환 할 때까지 배열의 모든 배열 index에 대해 한 번씩 콜백 함수를 실행합니다. true를 리턴하는 요소가 발견되면 findIndex는 해당 반복에 대한 index를 즉시 반환 (없을 경우 `-1` 리턴)
