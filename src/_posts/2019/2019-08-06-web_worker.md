---
title: "20190806 TIL) 웹 워커"
date:   2019-08-06 23:50:24 +0900
categories: TIL Base 
tags: javascript boostCamp daily
---

자바스크립트는 싱글 스레드로 동작하는 언어이다. 보통의 웹에서는 복잡한 작업이 많지 않기 때문에 싱글 스레드로도 충분 구현할 수 있지만, 빅데이터 처리나 웹 게임과 같은 경우에는 데이터 처리에 오랜 시간이 걸리거나, 많은 작업이 필요하기 때문에 싱글 스레드로 충분하지 않을 수 있다.  
  
이런 상황을 위해서, 자바스크립트에는 `Web Worker`라는 것이 존재한다.  
  
### Web Worker

Web Worker는 자바 스크립트를 멀티 스레딩처럼 계산할 수 있도록 도와주는데, 새로운 스레드 워커를 생성해 워커가 오래걸리는 작업을 담당하도록 한다.  
  
워커가 계산을 하는 동안에 메인 스레드는 다른 작업을 수행하고, 이후 워커가 계산 결과를 메인 스레드로 전달하면 메인 스레드가 그에 따른 작업을 실행한다. 비동기와 비슷하게 보이지만 비동기는 응답이 올 때까지 기다리는 작업을 하는 반면, Web Worker는 메인 스레드가 일하는 동안 같이 계산을 한다는 점에서 조금 다르다.  
  
계산 작업이 많을 경우 워커를 늘려서 계산을 맡기면 되기 때문에 유용하게 사용될 수 있지만 멀티 스레드 처럼 보일 뿐 **각 Worker가 여전히 싱글 스레드**라는 점을 잊지 말아야한다. 또한 Worker객체는 CPU의 스레드 개수만큼만 늘어날 수 있기 때문에, 무한정 생성할 수 있는 것도 아니다.  
  
이번에 Web Worker를 이용한 프로그래밍을 하면서, 워커가 싱글 스레드로 동작한다는 것을 망각하고 Worker에서 새로운 Worker 객체를 생성해서 일을 시키다보니 동작이 생각대로 되지 않아 한참을 삽질했다. 워커는 전달된 값에대해 일정한 계산을 하고, 그 값을 메인 스레드로 전달 하는 역할이라는 것을 꼭 기억하자.  
{: .notice--warning}
  
### Woker 활용 예제

대충 어떨 때 Worker를 써야한다는 것인지 알겠는데, 그래서 어떻게 사용하는 것인지는 잘 감이 오지 않는다. 워커를 사용하기 전과 후로 나눠서 어떻게 사용하는 지 동작을 살펴보자.
  
#### Worker 사용 전

```html
<div id="result"></div>
<button id="button">run</button>
<script>
    function sleep(delay){
        var start = new Date().getTime();
        while(new Date().getTime() < start + delay);
    }
    document.querySelector('#button').addEventListener('click', function(){
        sleep(3000);
        var div = document.createElement('div');
        div.textContext = Math.random();
        document.querySelector('#result').appendChild(div);
    })
</script>
```

이 코드를 그대로 사용하게 되면, 버튼을 누른 뒤 3초 동안은 아무 동작도 할 수 없을 것이다. Call Stack에 동작이 쌓여있을 경우, 웹은 렌더링 작업을 멈추기 때문에 사용자가 이외의 작업을 하려고 해도 동작하지 않는다. 때문에 이는 서비스를 하는 입장에서는 매우 치명적인 코드이다.  
  
#### Worker 사용 후

```html
<div id="result"></div>
<button id="button">run</button>
<script>
    document.querySelector('#button').addEvenetListener('click', function(){
        const worker = new Worker('./worker.js');
        worker.addEventListener('message', function(e){
            const div = document.createElement('div');
            div.textContext = e.data;
            document.querySelector('#result').appendChild(div);
            worker.terminate();
        });
        worker.postMessage('worker 시작');
    })
</script>
```

이전 코드처럼 버튼을 누른 후에 메인 스레드에서 직접 계산하는 것이 아니라, Worker 객체를 생성해 postMessage()로 값을 넘겨서 Worker가 계산을 시작하도록 신호를 보내는 동작이다.  
  
여기서 worker에 값을 넘겨주기 전에 등록한 `EvnetListener('message', {})`는, 이후에 Worker에서 보낸 값에대한 처리를 위해 등록한 리스너이다. Worker에서 보낸 값은 `e.data`를 통해서 사용이 가능하다. Worker 스레드 동작이 끝나면, 스레드를 계속해서 살려두는 것은 낭비이기 때문에 Worker를 종료하는 명령어인 `terminate()`로 스레드를 종료시킨다.  
{: .notice--info}
  
하지만 위 코드에는 메인 스레드의 동작만 있을 뿐 Worker는 어떻게 동작하는지 알 수 없다. Worker는 어떻게 동작할까? 아래 코드를 살펴보자.  
  
```javascript
function sleep(delay){
    const start = new Date().getTime();
    while(new Date().getTime() < start + delay);
}

onmessage = function(e){
    console.log(e.data); //worker 시작
    sleep(3000);
    const random = Math.random();
    self.postMessage(random);
}
```

Worker도 메인 스레드와 동일하게 `self.addEventListener`를 이용해 사용할 수 있지만, 나의 경우에는 잘 동작하지 않아서 `onmessage`메소드를 사용했다.  
{: .notice}  
  
상위에 구현된 코드를 메인 스레드, 하위에 구현된 코드가 Worker 스레드라고 가정하고 이 두 코드를 통해 Web Worker의 동작을 살펴보자.  
  
먼저 메인 스레드에서는 Worker 객체를 생성해 `postMessage()`로 Worker에 값을 넘겨준다. 값을 전달받은 Worker 객체는 객체에 등록된 리스너 `onmessage` 메소드를 실행시키게 되고, 전달받은 값을 통해 계산을 시작한다.  

이 때 메인 스레드는 값을 넘겨줬던 `postMessage()`이후의 동작을 한다.  
{: .notice--info}

Worker 객체가 `onmessage`를 계산한 결과를 얻게되면, 이제 그 값을 메인 스레드처럼`postMessage()`로 넘겨준다. 메인 스레드가 Worker를 통해 값을 전달받으면, 등록해뒀던 이벤트 리스너가 실행되고, 이 처리가 완료되면 메인 스레드는 그 전에 처리하던 동작으로 돌아가 실행된다.    

처음에는 이 동작의 순서가 어떻게 되는지 잘 이해하지 못해서 미션을 제대로 완수하지 못했다. 시간에 쫓기지 말고 좀 더 찬찬히 이해했어야 되는데 미션이 끝나고 나서보니 가장 아쉬운 부분이다.  
{: .notice}  
  
Worker는 다른 Worker를 불러올 수도 있다. **worker2.js**에 `self.a = 'hell worker';`라는 코드가 있다고 가정했을 때, worker.js에서는 아래와 같이 불러와 활용할 수 있다. 

```javascript
self.addEventListener('message', function(e){
    let a = 'ignored';
    importScripts('./worker2.js');
    console.log(a); //hell worker
})
```

여기서 주의해야 할 점은, import 하는 스크립트 파일에는 `self.variable`과 같은 형태로 선언해야 다른 워커에서 불러와서 활용이 가능하다.  
  
하지만 여기서 또다른 Worker는 새로운 스레드를 생성하는 것이 아니라, Worker 객체이 들어있는 인자를 가져오는 등의 동작에 활용하는 것이다. 새로운 스레드를 생성한다고 생각했던 점이 미션을 오래 걸리게 했던 주범이기도 했다.  
{: .notice--warning}  
  
___

얼핏 보기에는 굉장히 쉬운 개념이라고 생각했는데, 정확한 이벤트 리스너의 동작을 파악하지 못해서 제대로 완수하지 못했던 부분이다.  
  
설계를 시작하는 지점과 공부를 끝내는 지점, 슬슬 그 지점을 찾는데 익숙해졌다고 생각했는데 이번엔 공부를 너무 빨리 끝내고 설계를 시작해버려서 오히려 시간이 더 많이 걸렸던 케이스인 것 같다.  

앞으로 남은 미션은 이틀인데, 이 간극을 빨리 찾아서 익숙해졌으면 좋겠다.. 미션을 제대로 마무리하지 못한 점은 조금 아쉽지만, 그래도 고통받으면서 이해만큼은 확실하게 하게 된 것 같아서 다행이다! 어디가서 누가 물어보면 당황하진 않을듯 XD  
