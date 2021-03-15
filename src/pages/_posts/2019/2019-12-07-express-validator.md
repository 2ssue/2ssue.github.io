---
title: 'node.js) 유효성 검사를 위한 express-validator 사용하기'
date: 2019-12-07 22:42:24 +0900
categories: Programming
tags: nodejs javascript programming
---

지난 주차에 프로젝트의 API를 리팩토링하면서, 리뷰어님이 추천해주셨던 express-validator를 도입해봤다. 다들 express-validator가 있다는 건 알지만, 어떻게 사용하는 지는 자세히 모르고 있어서 팀간 기술 공유를 위해 작성했던 문서이다.

이 기술을 도입하면서, 한글로 된 문서를 찾고 싶었지만 역시나 영어로 된 문서들이 훨씬 많았다. 그래서 내가 원하는 사용 방법을 찾기까지 조금 시간이 걸렸기 때문에 혹시 나같은 사람이 있을까 해서 이 문서를 블로그에도 한번 올려본다 ☺

### 유효성 검사를 좀 더 간편하게! express-validator

- [express-validator(npm)](https://www.npmjs.com/package/express-validator)
- [express-validator(getting-started)](https://express-validator.github.io/docs/)

express-validator는 express에서 쓸 수 있는 유효성 검사 모듈이에요. 미들웨어나 API 형태로도 활용이 가능하고, 유효성 검사 뿐만 아니라 tokenizer처럼 활용될 수 있습니다! [validator.js](https://github.com/validatorjs/validator.js)를 활용해 좀 더 편리하게 제작되었다고 해요.

#### [우리 프로젝트](https://github.com/connect-foundation/2019-07)는 원래 유효성 검사를 이렇게 해봤어요

```javascript
function checkJsonHasKeys(body, keys) {
  return !keys.find((element) => body[element] === undefined);
}
```

위 함수를 만들어서, `req.body`에 원하는 형태의 `element`들이 있는지 확인하는 방식이었죠!

#### 코드리뷰 덕분에..

![image](https://user-images.githubusercontent.com/42017052/70377411-8c9a6800-1957-11ea-86a6-f26d192bfcbc.png)

리뷰어님 덕분에 이렇게 좋은 모듈이 있다는 것을 알게 되었습니다. 그리고 바로 api 리팩토링을 시작한 4주차, 드디어 모듈을 통해서 유효성 검사를 깔끔하게 할 수 있었어요. 얼만큼 깔끔해졌는지는 아래를 확인해보세요 :)

#### 어떻게 바뀌었나요?

기존에는 `POST` 형태의 api를 사용해서, body의 인자를 체크해야했지만 이번에는 `GET`형태를 사용하게 되어 따로 인자를 체크할 필요는 없어졌습니다. parameter에 값이 들어오지 않으면 해당 주소로 들어오지 않았기 때문이죠!

그래서 6자리와 숫자 여부를 체크하던 코드를 보여드릴게요 :)

##### 원래는 이렇게 체크하던 코드가

```javascript
if (!roomNumber || roomNumber.length !== 6 || /[^0-9]/.test(roomNumber))
```

##### 이렇게 바뀌었습니다!

```javascript
async function isRoomNumberValid(req, res, next) {
  await check('roomNumber')
    .trim()
    .isLength(6)
    .bail()
    .isNumeric()
    .run(req);
//...
```

코드는 좀 길어보이지만, 좀 더 명확한 형태로 확인할 수 있게 되었어요!

`trim()`을 통해 roomNumber에 공백이 있다면 자르게 되고, 이 이후에 roomNumber는 공백이 잘린 채로 넘어가게 되서, 다음 미들웨어에서도 공백이 없는 상태로 사용할 수 있어요.

`isLength(6)` 길이가 6글자인지 확인하는 구문입니다. `{min: 0, max: undefined}`와 같이 최소 최대 값도 지정할 수 있습니다!

`bail()`은 여기서 만약 에러가 발생했다면, 다음 검사를 하지 않겠다는 뜻이에요. 좀 더 빨리 에러를 확인할 수 있게 된답니다 👍

`isNumeric()`은 숫자 형태가 맞는지를 확인해요. string으로 들어왔더라도, 그 string이 숫자인지 확인해주기 때문에 별도의 처리를 해주지 않아도 되는 편리함이 있었습니다..!

```javascript
//...
  if (!validationResult(req).isEmpty()) {
    res.json({
      isSuccess: false,
      message: 'ERROR MESSAGE',
    });
    return;
  }

  next();
}
```

이렇게 모든 체크를 완료하면, validationResult를 확인하고 만약 통과하지 못했다면 위의 코드처럼 이후의 에러처리를 해주는 형태로 미들웨어를 작성하게 되었습니다.

이렇게도 활용이 가능하지만, 만약 간단하게 파라미터가 존재하는지만 체크하는 경우엔, 따로 미들웨어 함수로 빼기엔 어려운 감이 있습니다. 모든 api에 동일한 body 파라미터가 들어오지 않기 때문인데요! 그런 경우에는 아래와 같은 방법으로도 사용할 수 있답니다.

```javascript
router.put(
  '/room',
  [check('roomId').exists(), check('title').exists()],
  async (req, res) => {
    //...
  },
);
```

이렇게 되면, 아 여기엔 `roomId`와 `title`이 필수로 필요하겠구나. 하는 느낌도 들기 때문에 코드를 보고도 어떤 변수가 필요한지도 한눈에 알 수 있어서 좋았습니다 🙌

---

여러분도 유효성 검사를 할 필요가 있다면, express-validator를 사용해보세요!

express-validator의 더 많은 유효성 검사 함수들은 [공식 문서](https://express-validator.github.io/docs/)에서 확인하실 수 있습니다 :)

validator로의 리팩토링 과정을 확인하시고 싶으시면 [#78 Refactor: api 형태 변경](https://github.com/connect-foundation/2019-07/pull/78/files)으로 구경오세요 🤭
