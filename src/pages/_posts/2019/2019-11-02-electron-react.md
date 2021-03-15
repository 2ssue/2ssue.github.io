---
title: "create-react-app으로 electron 앱 만들기"
date: 2019-11-02 23:34:24 +0900
categories: Programming
tags: electron react javascript
toc: true
---

## create-react-app을 사용하게 된 얘기
> 구구절절한 사연이므로 그냥 지나치셔도 무방합니다.
  
부캠에서 어떤 팀원이 electron에 관심을 가지고 있다는 얘기를 했었고, 몇 번 얘기하다보니 나도 자연스럽게 여기에 살짝 관심을 가지고 있던 중이었다. 그러다 서점에 갔는데, `Electron 애플리케이션 개발`이라는 책을 발견했다. 단연 눈을 사로잡았던 것은 여러 개의 예제들이었는데, 이대로 따라하기만 하면 왠지 금방 내가 원하는 electron앱을 만들 수 있을 것 같았다! 거기다 react까지 배울 수 있어서 일석 이조..! ~~(는 착각이었다)~~  
  
### 버전의 상태가..?
야심차게 책을 펼쳐서 예제를 따라하려고 보는데, 모듈들의 버전이 수상했다. Node LTS 버전이 V6 였다는 것부터 알아봤어야 했는데.. (지금은 V10이다....)  
  
순조롭게 잘 될 거라는 예상과는 다르게 바닐라로 Electron을 켜는데는 성공했지만 React는 제대로 동작하지 않았다. 책에서 받으라는 버전의 모듈을 다운로드 받으면 온갖 deprecate 경고와 `ERR!`이 날 반겼다.  
  
### 어쩌다 create-react-app을 사용하게 되었나
아니 그럼 어떡하지??? 최신 버전으로 다운로드 받아서 예제대로 설정하면 Babel이 제대로 먹지 않는다. 거기다 예전 버전은 경고가 너무 많아서 찜찜... 하지만 예제 파일을 다운로드 받아서 실행할 땐 잘 실행되긴 한다.. 하지만 이렇게 배운다고 한들 _내가 만들고 싶은 앱을 만들려고 할 때는 어떡하나?_ 하는 생각이 들었다.  
  
이참에 Babel을 익혀보자는 생각으로 모듈을 현재 버전으로 올려받고, 깡으로 도전하려 했으나 흠.. 미션으로 인해 체력이 따라주지 않았다. 그렇게 책을 산지 이주일이 지나 React 프론트 앱 프로젝트를 완성하고 부캠 멤버십의 첫 휴가가 주어졌을 때, 다시 이 책을 펼쳐 뒤적거리기 시작했다.  

#### 역시 사람은 쉬어야 함
이번에도 허탕을 치나 싶어서 침대에서 핸드폰을 보고 있다가 문득 _어.. 웹처럼 create-react-app으로 하면 webpack이나 babel을 신경쓸 필요가 없지 않나?_ 하는 생각이 들었다. 그리고 바로 `electron create-react-app`을 검색했다.

##### 사랑해요 구글
![image](https://user-images.githubusercontent.com/42017052/68073148-59047500-fdd0-11e9-9055-ad2325e1b47a.png)

희망을 잃지 않게 해준 고마운 구글.. 바로 그 답을 알려주셨다. 지금 생각해보면 왜 진작 생각해내지 못했나 하는 아쉬움이..  
  
그래서 이 방법을 토대로, create-react-app을 통해 electron 앱을 만들기 시작했다.  

## create-react-app하고 electron 집어넣기
서론이 매우 거창했지만 만드는 방법은 의외로 간단하다.  

```bash
$ npm init
$ npm install create-react-app --save
$ npx create-react-app {project_name}
$ cd {project_name}
$ npm install electron --save-dev
```

위 순서대로 명령어를 실행하면 일단 react 애플리케이션이 생성됐고, electron 모듈 설치도 완료됐다.  
  
```bash
{project_name}
├── public          # 정적 파일. react를 사용하기 때문에 특별히 변경할 내용은 없다.
├── src             # javascript 파일. react routing, electron로딩 등의 작업을 진행.
│   ├── App.js
│   ├── index.js
│   ├── index.css
│   └── ...         # 이 외 파일은 삭제해도 무방
├── package.json
└── package-lock.json
```

명령어를 실행하고 나면 폴더의 구조가 위와 같이 완성되는데, 이제 `src`폴더에서 electron을 로딩할 코드를 작성하면 electron을 실행할 수 있다.  
  
electron을 실행할 파일인 `/src/electron-starter.js`를 만들기 위해, [electron-quick-start](https://github.com/electron/electron-quick-start)에서 코드를 복사하자.  
  
이 파일에서 `mainWindow.loadFile()` 부분을 `mainWindow.loadURL('http://localhost:3000')`으로 변경한다.  
  
이 작업은 webpack의 개발 서버 주소로 electron 로딩을 연결하는 작업으로, 개발 시에 일일히 소스코드를 빌드해 확인할 필요가 없어 용이하다. 하지만 별도의 서버에서 코드를 가져오는 작업이기 때문에 electron에는 화면이 늦게 뜨는 현상이 있으므로 주의한다. 추후 배포 시에는 소스를 빌드한 위치로 변경시켜주는 것이 좋다. 자세한 방법은 [여기](https://www.freecodecamp.org/news/building-an-electron-application-with-create-react-app-97945861647c/)를 참조  
{: .notice--info}
  
`electron-starter.js`의 코드를 변경했다면, 이제 프로젝트 폴더에 있는 `package.json`에서 start 코드를 연결해주고, electron 실행 명령어를 추가해야한다. json 파일에 `"main": "src/electron-starter.js"`를 추가하고, script에 `"electron": "electron ."`을 추가한다.  
  
차례대로 잘 실행했다면 package.json의 모습은 아래와 같다.  

```json
{
  "name": "electron-test",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "electron": "^7.0.1",
    "electron-builder": "^22.1.0",
    "react": "^16.11.0",
    "react-dom": "^16.11.0",
    "react-scripts": "3.2.0",
  },
  "main": "src/electron-starter.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "electron": "electron ."
  }
}
```

이제 `npm start`를 통해 react 서버를 활성화시키고, `npm run electron`을 하면 electron 앱을 create-react-app으로 띄우는 데 성공!  

___

### create-react-app은 왜 사용할까?
자세한 config 파일을 숨기기 때문에, 초심자가 사용하기에 적합하다. 복잡한 설정들 없이 바로 React를 사용하는 데 돌입할 수 있어 (나처럼) 환경설정에 애먹지 않고 본질 배우기에 들어갈 수 있다.  
  
현업에서도 보통 create-react-app을 사용하긴한다. 하지만 복잡한 설정이 필요할 때는 config 파일을 따로 만들어 관리하는 경우가 거의 무조건 생기기 때문에 React를 잘 익혔다면 webpack과 babel에 도전해보는 것도 좋을 것 같다.  
  
___

여기까지의 과정은 구글님이 알려주신 [이 포스트](https://www.freecodecamp.org/news/building-an-electron-application-with-create-react-app-97945861647c/)를 참고하였으며, 책의 예제를 토대로 코드를 새로 만들고 있는 [나의 프로젝트 electron-chat](https://github.com/2ssue/electron-chat)에서도 확인할 수 있다.
