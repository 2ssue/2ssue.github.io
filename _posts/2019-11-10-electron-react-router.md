---
title: "electron에서 react router 사용하기 (Hash Router)"
date: 2019-11-10 22:36:24 +0900
categories: Programming
tags: electron react javascript
toc: true
---

## Electron에선 BrowserRouter가 안된다구? 
electron 앱을 만들면서, 사실상 electron 위에 react를 올리는거나 다름 없었기 때문에 개발을 대부분 electron을 켜보면서 한 것이 아니라 react dev서버를 켜놓고 테스트했다. 그래서 react router를 BrowserRouter로 사용했는데, 개발을 완료하고 react를 build한 후 electron로 켜보니 라우팅이 제대로 되지 않았다.  
  
### 왜 안되는거야?  
electron을 build하고 나서 실행시키게 되면 아래와 같이 실행시킨다. 

```javascript
mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "/../../build/index.html"),
      protocol: "file",
      slashes: true
    })
  );
```

그리고 react를 통해 Routing을 하게 되면 앞의 파일 경로가 죄다 사라지고 `/../../build/index.html/login`과 같이 실행될 줄 알았던 다음 루트가 `D:file://../../login` 과 같은 형태로 바뀌어버린다. 당연히 파일에는 이런 경로가 없기 때문에, electron에서는 오류가 발생하는 것이다.  
  
오류는 발생했으니, 안되는 이유를 찾기 위해서 구글 검색을 시도했다. `how to use react router in electron`. 역시나 최상단에 [stack overflow의 글](https://stackoverflow.com/questions/36505404/how-to-use-react-router-with-electron)이 나타났고, 이 분도 나와 같은 현상이 발생했나보다.  
  
BrowserRouter는 일반적으로 Server가 있을 때 사용한다고 한다. 이름 뜻 그대로 서버와 함께 서비스 되고 있는 웹 브라우저에서 동작하는 라우터이다. 서버가 있으면 base URL이 있기 때문에 `/login`으로 routing되는 작업이 제대로 동작하는 것이었다. 그래서 기존에는 react의 dev 서버와 개발 중이었기 때문에 routing이 잘 동작했던 것!  
  
### 그렇다면 뭘 써야할까?
build를 하고 난 이후에는 라우팅을 위한 서버가 따로 존재하지 않고, 파일 기반으로 실행된다. 이 때는 파일 기반 Router인 MemoryRouter와 HashRouter를 사용할 수 있는데, 이 중 MemoryRouter는 React로 개발된 페이지 내에서만 작동 되는 것 같다. 내가 만든 페이지는 React로만 개발되었긴 하지만, 지난 미션에서 본 적이 있어 좀 더 익숙한 HashRouter를 사용해봤다.  
  
HashRouter는 여러 문서들에서 제목을 클릭하면 문서 내의 해당 부분으로 가는 것과 같은 방식인데, `#/login`과 같이 앞에 hash tag가 붙어서 이동해 HashRouter라고 한다. 자세한 사항은 [HashRouter](https://developer.mozilla.org/ko/docs/Web/API/History) 공식 문서를 참고!  
  
## React Router version4에서 Hash Router 사용하기
막상 HashRouter를 사용하려고 예제를 찾아보는데 쉽지 않았다. 브라우저에 [History](https://developer.mozilla.org/ko/docs/Web/API/History)객체가 생기면서 Hash Routing 방식은 잘 사용되지 않아 그런 것 같기도 하고, 많이 사용하지 않는 것 같았다.  
  
그래도 책과 여러 문서들을 발견하면서 금방 답을 찾을 수 있었다.  
  
version4에서는 따로 History를 지정해주는 작업없이 사용하면 되서 사용이 편리해졌다. 먼저 기존에 사용하던 BrowserRouter를 HashRouter로 바꿔주면 Hash 방식으로 주소 사용이 변경된다.  
  
```javascript
import { HashRouter as Router, Switch, Route } from "react-router-dom";

const appRouting = (
  <Router>
    <Switch>
      <Route path="/login"> {/* /...index.html/#/login */}
        <Login />
      </Route>
      <Route path="/signup"> {/* /...index.html/#/signup */}
        <Signup />
      </Route>
      <Route path="/rooms"> {/* /...index.html/#/rooms */}
        <Rooms />
      </Route>
    </Switch>
  </Router>
);
```

### Routing은 됐고, 직접 주소를 변경시키는 건?
Router로 해당 요청에 대한 페이지 Routing 처리는 완료했는데, 그럼 hash를 사용해서 주소를 변경시키는 것은 어떻게 할까? 예를 들어 로그인을 성공하고 나면, 다음 메인 화면으로 이동시켜줘야 한다.  
  
하지만 기존 BrowserRouter에서 사용하는 것처럼 `window.location = rooms`를 사용하면 제대로 동작하지 않는다. 예상한 것 처럼 `#/rooms`이 되는 것이 아니고, `/rooms`으로 이동해서 역시 파일을 찾을 수 없게 된다.  
  
이전 버전에서는 history를 넘겨줘서, history객체에 다음 이동 주소를 push 하는 방식으로 사용되었던 것 같은데, 이번에는 history객체가 `react-router-dom`에서 없어져서 한참을 해맸다. 그러다 `window.location.hash`라는 객체를 발견하고 이를 조작해봤는데, 제대로 잘 동작했다. 브라우저에서 테스트했을 때도 뒤로가기와 앞으로가기 모두 정상 동작하는 것을 보면, react-router에서 history를 조작해주는 것 같기도 하다. 

**2020.04.04 추가**<br>  
react-router에서 History를 조작해줬다고 하기보단, 우리가 조작되도록 만들었다고 보는 것이 맞는 표현인 것 같다.<br><br> window.location.hash를 통해 주소를 `~index.html/#/rooms`로 바꾸면 실제로 이 앱에서는 `index.html` 파일로 이동한다. 그리고 index.html에 있는 React-Router가 `#/rooms`를 보고 해당 지점으로 Routing을 해서 그에 맞는 컴포넌트를 보여준다. 이 때 History에 이 라우팅 작업이 등록되어서 뒤로가기, 앞으로가기가 작동되는 것이다.
{: .notice--info}
  
```javascript
//if login success
window.location.hash = "#/rooms";
```

#### 다른 방법
이 글을 작성하면서 검색을 하다가 알게된 것인데, [이 예제](https://github.com/electron-react-boilerplate/electron-react-boilerplate/blob/b76f537bc784d1102b13675297d54bd28baff9d8/app/store/configureStore.dev.js#L10)를 보면 `history` 모듈을 통해 hash history를 넘겨주고 push하는 방식으로도 사용이 가능한 것 같다.  
  
다음에 한번 사용해보는 걸로!  

___

이렇게 드디어 이전에 계획대로 `electron 애플리케이션 개발` 책의 2번째 예제(chatting)를 최근에 사용하는 버전으로 바꿔보는 작업을 완료했다. 개발을 완료한 코드는 [여기](https://github.com/2ssue/electron-chat)에서 확인할 수 있으니 자세한 사항이 보고싶은 분들은 참고하셔도 좋을 것 같다.  
  
이제는 배포할 패키지는 어떻게 만드는지, 한번 해보려고 하는데 build했을 때와 마찬가지로 경로 문제로 말썽인 부분들이 있어서 아직 패키징을 완료하진 못했다. 다음에 패키징을 성공하게 되면 한번 패키징에 관련된 포스팅도 해보겠다 :D  
  
웹도 흥미롭지만, 웹을 통해 이런 Desktop App을 만들 수 있다는 게 굉장히 흥미롭다!  