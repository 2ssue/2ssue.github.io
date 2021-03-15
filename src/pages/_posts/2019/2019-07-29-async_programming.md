---
title: "Javascript) 비동기 프로그래밍_태스크큐와 이벤트루프"
date:   2019-07-29 11:37:24 +0900
categories: Base
tags: javascript 
last_modified_at: 2019-08-01 17:30:24 +0900
---

이 글은 JSConf의 [What the heck is the event loop anyway? 영상](https://www.youtube.com/watch?v=8aGhZQkoFbQ)을 참고하여 작성하였습니다.  
  
미션들을 하면서 비동기 프로그래밍이 자바스크립트에서 굉장히 중요하다는 것을 느꼈다. 자바스크립트는 싱글 스레드로 동작하는 언어이기 때문에, 비동기 프로그래밍 기법이 없었다면 아마 통신에서 처리하는 과정들이 모두 쌓이다가 병목현상이 나타나게 되었을 것이다.  
  
비동기로 처리하기 위해서는 `Callback` 함수, `Promise()`, `async/await` 다양한 방식이 존재하는데, 이번에는 이러한 방식들이 어떻게 동작하는지 한번 살펴보려고 한다. 

### Call Stack

자바스크립트에서 대부분의 동작 처리는 Call Stack(호출 스택)을 통해 이루어진다. 스택 구조와 비슷하게 동작하는데, 요청에 맞는 동작을 순차적으로 실행하기 때문에 앞선 작업이 끝나지 않으면 뒤의 작업도 실행될 수 없다. 아래와 같은 코드가 있다고 가정해보자.  
  
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
|**Call Stack**|
  
전체 실행을 의미하는 `main()`함수가 가장 먼저 Stack으로 들어가고, 그 다음으로 실행한 `one()`함수가 들어간다. 여기서 `one()`은 실행되기 전에 `two()`의 호출을 받았으므로, `one()`은 Stack에서 나오지 않고 `two()`가 들어가게 된다. 여기서 `two()`는 다시 `three()`의 호출을 받아 `three()`가 스택에 들어가게 된다.  
  
`LIFO(Last In First Out)`구조인 Stack 구조에 따라, 이제 다음으로 호출된 동작이 없으므로 Stack에서 빠져나오면서 각 동작이 실행되게 된다. 따라서 결과는 three two one 순서로 콘솔에 출력되게 되는 것이다.  
  
여기서 만약 `console.log()`처럼 간단한 동작이 아니라, 웹에서 어떤 정보를 가져오는 긴 동작이 추가되었다고 가정하면, 이 동작 아래에 쌓인 동작은 웹 동작이 완료되기 전까지 실행되지 못한다. 뿐만 아니라 웹은 Call Stack에 작업이 있을 땐 렌더링을 할 수 없다. 따라서 이 과정이 웹 창을 로딩하면서 하는 동작이라면, 웹은 Call Stack 동작이 끝나기까지 렌더링을 할 수 없어 사용자는 웹 창에서 아무것도 볼 수 없거나, 아무 동작도 할 수 없게 되는 것이다.   
  
### Task Queue(Event Queue), Event Loop 

이러한 과정을 막기 위해 있는 것이 **Task Queue**와 **Event Loop**이다. 비동기 함수를 실행시켰을 때, Call Stack은 이 부분을 바로 실행으로 넘기지 않고 **Web API**와 같은 백그라운드로 작업을 넘겨준다.  
  
예를 들어 `SetTimeout()`을 실행했다면 Call Stack은 비동기 함수임을 감지하고 백그라운드로 작업을 넘긴다. 작업을 받은 백그라운드는 `setTimeout()`을 지정된 시간만큼 실행시키고, 그 안에 있던 콜백 함수를 Task Queue로 넘겨주는 것이다.
{: .notice--success}
  
이렇게 백그라운드에서 실행을 마치면 Task Queue로 이 과정에 대한 콜백 함수가 넘어가게 되고, Call Stack이 모두 비게되면 Task Queue에 저장되어 있던 콜백 함수가 Call Stack으로 올라가 실행되게 된다.  
  
그런데 Task Queue에 있던 작업은 스스로 Call Stack이 비었음을 알고 올라가는 것이 아니다. 이 때 활용되는 것이 Event Loop인데 Task Queue에 작업이 있을 때 대기하고 있다가, Call Stack이 빈 것을 확인하면 Task Queue의 작업을 하나씩 Call Stack으로 올려주는 것이다.  

따라서 비동기 함수를 실행시키게 되면 Call Stack에서 실행되지 않고 바로 Task Queue로 넘어간다. 이후 동작하는 동기 함수는 Call Stack을 통해 바로 실행되기 때문에, 이 동기 함수들이 모두 실행된 뒤에 Task Queue에 있던 비동기 함수가 Call Stack으로 올라오게 되어 동기 함수가 비동기 함수보다 먼저 실행되는 것이다.  

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

따라서 이와 같은 코드가 있을 때 동기 함수인 `test()`가 먼저 실행되고 메인이 종료된 뒤에 Task Queue에 저장되어있던 `setTimeout()` 함수가 실행될 수 있게 되는 것이다.  

___

옛날에 웹을 처음 공부했을 때도 부스트코스를 통해서 이 영상을 본 적이 있었다. 그 때는 별 감흥 없이 '비동기 = 나중에 실행되는 것'이라고만 생각했었는데, 비동기를 엄청나게 겪어보면서 이 영상에서 설명하는 것이 비로소 무엇이었는지를 알게 되었다.  
  
오늘도 비동기를 이해한 것 같지만 다음번에 만나면 또 _비동기가 뭐냐고 대체!_ 하겠지. 비동기를 확실하게 이해하고 쓸 수 있게 될 날을 기대한다.  
  
관련된 글을 찾아보면서 알게 되었는데, Task Queue외에도 마이크로 태스크 큐, 잡 큐 등이 존재한다고 한다. ES6에서 새로 생긴 것 같은데, 이와 관련된 글에 대해서도 추가로 업로드해야겠다. 