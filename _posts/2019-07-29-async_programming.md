---
title: "Javascript) 비동기 프로그래밍_콜백함수의 동작"
date:   2019-07-29 11:37:24 +0900
categories: Base
tags: javascript 
---

이 글은 JSConf의 [What the heck is the event loop anyway? 영상](https://www.youtube.com/watch?v=8aGhZQkoFbQ)을 참고하여 작성하였습니다.  
  
미션들을 하면서 비동기 프로그래밍이 자바스크립트에서 굉장히 중요하다는 것을 느꼈다. 자바스크립트는 싱글 스레드로 동작하는 언어이기 때문에, 비동기 프로그래밍 기법이 없었다면 아마 통신에서 처리하는 과정들이 모두 쌓이다가 병목현상이 나타나게 되었을 것이다.  
  
비동기로 처리하기 위해서는 `Callback` 함수, `Promise()`, `async/await` 다양한 방식이 존재하는데, 이번에는 이러한 방식들이 어떻게 동작하는지 한번 살펴보려고 한다.  

___

### CallStack

자바스크립트에서 대부분의 동작 처리는 Callback Stack(호출 스택)을 통해 이루어진다. 스택 구조와 비슷하게 동작하는데, 아래와 같은 코드가 있다고 가정해보자.  
  
```javascript
function one(){
    two();
    console.log("one");
}
function two(){
    three();
    console.log("two");
}
function three(){
    console.log("three");
}

one(); //three, two, one
```

이 때 Callback Stack에는 아래와 같이 동작이 쌓이게 된다.  
  
|three()|
|two()|
|one()|
|main()|
  
전체 실행을 의미하는 `main()`함수가 가장 먼저 Stack으로 들어가고, 그 다음으로 실행한 `one()`함수가 들어간다. 여기서 `one()`은 실행되기 전에 `two()`의 호출을 받았으므로, `one()`은 Stack에서 나오지 않고 `two()`가 들어가게 된다. 여기서 `two()`는 다시 `three()`의 호출을 받아 `three()`가 스택에 들어가게 된다.  
  
`LIFO(Last In First Out)`구조인 Stack 구조에 따라, 이제 다음으로 호출된 동작이 없으므로 Stack에서 빠져나오면서 각 동작이 실행되게 된다. 따라서 결과는 three two one 순서로 콘솔에 출력되게 되는 것이다.  
  
여기서 만약 `console.log()`처럼 간단한 동작이 아니라, 웹에서 어떤 정보를 가져오는 긴 동작이 추가되었다고 가정하면, 이 동작 아래에 쌓인 동작은 웹 동작이 완료되기 전까지 실행되지 못한다. 뿐만 아니라 이 과정이 웹 창을 로딩하면서 하는 동작이라면, 웹은 CallStack 동작이 끝나기까지 렌더링을 할 수 없기 때문에 사용자는 웹 창에서 아무것도 볼 수 없게 된다.  
  
### Task Queue, Event Loop 

이러한 과정을 막기 위해 생긴 것이 `Task Queue`와 `Event Loop`이다. 비동기 함수를 실행시켰을 때, CallStack은 이 부분을 바로 실행으로 넘기지 않고 `Web API`와 같은 백그라운드로 넘겨준다. 백그라운드에서 실행을 마치면 `Task Queue`로 이 과정에 대한 `Callback`함수가 넘어가게 되고, `CallStack`이 모두 비게되면 `Task Queue`에 저장되어 있던 콜백 함수가 `CallStack`으로 올라가 실행되게 된다.  
  
따라서 비동기 함수를 실행시키게 되면 `CallStack`에서 실행되지 않고 바로 `Task Queue`로 넘어간다. 이후 동작하는 동기 함수는 `CallStack`을 통해 바로 실행되기 때문에, 이 동기 함수들이 모두 실행된 뒤에 `Task Queue`에 있던 비동기 함수가 `CallStack`으로 올라오게 되어 동기 함수가 비동기 함수보다 먼저 실행되는 것이다.  

```javascript
function foo(){
    console.log("foo!");
}
function test(){
    console.log("async test");
}

setTimeout(foo, 2000);
test();

/*
async test
foo!
*/
```
___

관련된 글을 찾아보면서 알게 되었는데, Task Queue외에도 마이크로 태스크 큐, 잡 큐 등이 존재한다고 한다. 이와 관련된 글에 대해서도 추가로 업로드해야겠다. 