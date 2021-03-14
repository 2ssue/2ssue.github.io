---
title:  "React propTypes는 어떻게 prop이 맞는지 확인할까?"
date:   2020-05-05 20:58:24 +0900
categories: Base
tags: react
---

> 이 글은 facebook의 [prop-types](https://github.com/facebook/prop-types) 소스코드를 참고해 작성되었습니다.

### 나는 어쩌다 이게 궁금해졌나..

옛날에 [30-seconds-of-knowledge라는 Chrome Extension](https://30secondsofknowledge.com/)을 설치한 적이 있었다. 크롬에서 새 탭을 열면 내가 선택해뒀던 카테고리에 관련한 간단한 지식들을 보여주는데, 가끔씩 면접에서 물어볼만한 질문들을 보여주기도 한다. 시간이 날 때면 이런 질문들을 번역해두곤 하는데 오늘은 [React에서 prop 유효성 검사를 적용하는 방법](https://github.com/2ssue/common_questions_for_Web_Developer/blob/master/Framework/react_prop_validation.md)에 대한 질문이 나왔다. 

그러다 갑자기 propTypes는 어떤 방식으로 타입이 잘못된 prop인지 체크하는지 궁금해졌다. ~~(사실 처음에 잘못 이해해서 React가 propTypes 유효성 검사를 어떻게 하는지 아느냐고 이해했다. 그런데 아래 글을 해석해보니 그 뜻이 아니라 정말로 prop의 유효성을 확인하는 방법을 물었던 것..)~~

나처럼 누군가 궁금했던 사람이 있었을 것 같아서 한번 찾아봤는데 사용 방법에 대한 글은 많았지만 딱히 그 과정을 궁금해하는 사람은 없나보다. (아무래도 예상이 될만한 부분이기도 하고, 검색을 잘못해서 그런지 영어로도 못찾았다😅) 그래서 어차피 오픈소스인거 직접 소스를 한번 뒤적거려봤다. 

간단한 후기지만 소스를 보다가 테스트코드의 소중함도 느꼈는데, 테스트 코드가 기능이 잘 돌아가는지 확인하는 용도도 있지만 다른 사람이 소스가 어떻게 동작하는지 잘 알아볼 수 있는 용도로도 좋다는 것을 알았다. 덕분에 소스코드를 흐름을 더 쉽게 확인할 수 있었다..!

## 테스트코드부터 살펴보자!

[테스트코드의 122번째 라인](https://github.com/facebook/prop-types/blob/1c4077b7455e037bd8f81f48e9c51d60c972f8e9/__tests__/PropTypesDevelopmentReact15.js#L122)을 보면 PropType 체크가 정상 동작하는지 확인하는 테스트코드 부분임을 알 수 있다.

```javascript
describe('checkPropTypes', () => {
  it('should warn for invalid validators', () => {
    spyOn(console, 'error');
    const propTypes = { foo: undefined };
    const props = { foo: 'foo' };
    PropTypes.checkPropTypes(
      propTypes,
      props,
      'prop',
      'testComponent',
      null,
    );
    expect(console.error.calls.argsFor(0)[0]).toEqual('Some Warning Messages..');
  });
  //...
}
```

가장 먼저 실행되는 테스트코드를 살펴봤는데, 잘못 설정한 propTypes를 줬을 때 에러가 나타나는지 확인하는 코드인 것 같다. `spyOn()`은 콘솔에 error가 찍히는지 확인하는용인 것 같아서 넘겼고, 드디어 올바른 prop인지 확인하는 함수, [PropTypes.checkPropTypes()](https://github.com/facebook/prop-types/blob/1c4077b7455e037bd8f81f48e9c51d60c972f8e9/checkPropTypes.js#L42)를 발견했다. 

사담이지만 GitHub에 굉장한 기능이 생겼는데, IDE처럼 해당 함수에 마우스를 갖다대면 그 함수로 타고 들어갈 수 있게 되었다. (옛날부터 있었는데 몰랐을수도..) 그래서 소스를 다운받지 않더라도 편하게 소스를 확인해볼 수 있었다. 👍
{: .notice--info}

```javascript
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        // 주석은 생략했다.
        var error;
        try {
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
      }
      // ...생략. error가 있을 경우 출력하는 부분이다.
    }
  }
}
```

코드 맨 첫 부분에서 알 수 있듯이, 모든 prop이 정확한지 확인하는 것은 성능상 좋지 않기 때문에 production 모드일 때는 실행되지 않도록 하는 것을 볼 수 있었다. 알고만 있었던 부분을 실제 코드로 보니 신기했다.

이제 propTypes 객체가 정확한지 확인하기 위해, for문을 통해 넘겨받은 type의 Spec을 확인한다. 위 테스트코드를 예로 들어보자면 `typeSpecs`는 `{ foo: undefined }`이고, for문에 들어가게 되면 `typeSpecName`는 객체의 이름인 `foo`가 들어가게 된다.

그 다음에는 [has](https://github.com/facebook/prop-types/blob/master/lib/has.js)를 통해 typeSpecs에 typeSpecName이 있는지 확인하는데 당연히 typeSpecs에서 뽑은 값인데 있는거 아닌가..? 하고 의아할 수 있다. 이 부분은 자바스크립트가 prototype 기반이기 때문에 필요한 검사인데, typeSpecs는 객체라서 Object Prototype을 상속한 객체이기 때문에 그 외의 값들이 검사에 들어올 수 있다. 자세한 내용은 [링크](https://2ssue.github.io/common_questions_for_Web_Developer/docs/Javascript/9_search_object_in_javascript.html) 참고.
{: .notice--info}

좀 놀랐던 것은 그 다음 부분이다. typeSpecs 객체들의 값이 함수인지 확인한다. `PropTypes.{type}`은 그냥 값을 나타내는 것이라고만 생각했는데 함수가 아니라면 바로 에러를 던지는 부분을 보니 그 값들은 모두 함수였다는 것을 알 수 있었다. ~~(너무 갖다쓰기만 했네..)~~

여기서 타입이 맞는지 확인하는 코드를 발견할 수 있을 줄 알았지만 아니었다. 실질적인 타입 체크 확인 부분은 이 한 줄 뿐이었다..! 😨

```javascript
error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
```

그렇다면 이제 `Proptypes.{type}` 부분이 대체 어떻게 이뤄졌기 때문에 유효성을 확인할 수 있었는지 알아보자. 

## 코드 투어를 가보자🥴

PropTypes는 각 테스트가 동작하기 전마다 실행되는 [resetWarningCache()](https://github.com/facebook/prop-types/blob/1c4077b7455e037bd8f81f48e9c51d60c972f8e9/__tests__/PropTypesDevelopmentReact15.js#L15)에서 할당하는 것을 알 수 있다. 여기서 할당되는 [factory](https://github.com/facebook/prop-types/blob/1c4077b745/factory.js)파일을 들어가보면 다시 factory 함수를 실행한 결과를 리턴한다.

여기서 또 새로운 React의 함수를 알게 됐는데 `React.isValidElement`.. 객체가 React 엘리먼트인지 확인하는 함수라고 한다. [React Docs 참고](https://ko.reactjs.org/docs/react-api.html#isvalidelement) 
{: .notice--info}

그래서 또 factory를 따라가보면 [드디어 module의 최종 부분](https://github.com/facebook/prop-types/blob/1c4077b7455e037bd8f81f48e9c51d60c972f8e9/factoryWithTypeCheckers.js#L38)을 찾을 수 있다. ~~하지만 지금까지는 맛보기였다고!😏~~ 길고 긴 함수 내용들을 쭉 따라가다보면, 드디어 어떤 것을 return하는지 찾아낼 수 있다.

```javascript
module.exports = function(isValidElement, throwOnDirectAccess) {
  //... 생략
  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};
```

이를 통해서 우리가 prop을 지정해주기 위해 썼던 그 prop-type은 이 함수가 리턴하는 `ReactPropTypes` 객체라는 것을 알 수 있다. 이 객체의 원본을 찾아가보면 [이렇게](https://github.com/facebook/prop-types/blob/1c4077b7455e037bd8f81f48e9c51d60c972f8e9/factoryWithTypeCheckers.js#L115) 그동안 썼던 PropTypes 타입들이 각 타입에 맞는 함수를 실행하며 나열되어있는 것을 확인할 수 있다.

```javascript
var ReactPropTypes = {
  array: createPrimitiveTypeChecker('array'),
  bool: createPrimitiveTypeChecker('boolean'),
  func: createPrimitiveTypeChecker('function'),
  number: createPrimitiveTypeChecker('number'),
  object: createPrimitiveTypeChecker('object'),
  string: createPrimitiveTypeChecker('string'),
  symbol: createPrimitiveTypeChecker('symbol'),

  any: createAnyTypeChecker(),
  arrayOf: createArrayOfTypeChecker,
  element: createElementTypeChecker(),
  elementType: createElementTypeTypeChecker(),
  instanceOf: createInstanceTypeChecker,
  node: createNodeChecker(),
  objectOf: createObjectOfTypeChecker,
  oneOf: createEnumTypeChecker,
  oneOfType: createUnionTypeChecker,
  shape: createShapeTypeChecker,
  exact: createStrictShapeTypeChecker,
};
```

드디어 조금씩 고지가 보이기 시작하는 것 같다. 모든 타입의 함수를 확인하긴 힘들 것 같아서 가장 많이 사용되는 [createPrimitiveTypeChecker()](https://github.com/facebook/prop-types/blob/1c4077b7455e037bd8f81f48e9c51d60c972f8e9/factoryWithTypeCheckers.js#L228)함수를 살펴봤다. ~~(흑..안에 또 함수가 있어..)~~

이 함수의 `validate()`부분을 보면, 드디어 타입을 확인하는 부분이 있는 것으로 보인다. props의 값을 받아서, 그 값의 PropType을 확인한 뒤에 예상한 값이 아니라면 경고를 발생시키는 함수이다.

```javascript
function validate(props, propName, componentName, location, propFullName, secret) {
  var propValue = props[propName];
  var propType = getPropType(propValue);
  if (propType !== expectedType) {
    var preciseType = getPreciseType(propValue);

    return new PropTypeError(
        'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
        {expectedType: expectedType}
    );
  }
  return null;
}
```

목표였던 [올바른 prop을 확인하는 방법](https://github.com/facebook/prop-types/blob/1c4077b7455e037bd8f81f48e9c51d60c972f8e9/factoryWithTypeCheckers.js#L546)은 간단했다. typeof!

```javascript
function getPropType(propValue) {
  var propType = typeof propValue;
  if (Array.isArray(propValue)) {
    return 'array';
  }
  if (propValue instanceof RegExp) {
    // Old webkits (at least until Android 4.0) return 'function' rather than
    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
    // passes PropTypes.object.
    return 'object';
  }
  if (isSymbol(propType, propValue)) {
    return 'symbol';
  }
  return propType;
}
```

어느정도 예상은 했지만 이를 내 눈으로 확인하기까지 엄청난 시간이 걸렸다..🤯 그래도 새롭게 알게된 점이 있다면 Array나 Symbol은 더 상세한 타입이 있기 때문에 한번 더 확인하는 절차가 있고, 정규 표현식인 RegExp의 경우 오래된 브라우저는 object가 아닌 function을 리턴하는 경우가 있어 한번 더 검사해준다는 것.  

이 함수를 실행해서 결과를 리턴하는 부분은 [여기](https://github.com/facebook/prop-types/blob/1c4077b7455e037bd8f81f48e9c51d60c972f8e9/factoryWithTypeCheckers.js#L218)서 확인할 수 있다. 모든 propType 들이 `isRequired`가 아닌 경우 타입이 맞더라도 경고를 띄우기 때문에 이 부분에 대한 검사와, 각자 다른 validate를 받아서 실행하는 부분으로 보인다.  

## 결론

결국 끝만 본다면 PropType의 타입 검사는 typeof, instanceof 등 우리가 아는 흔한 기능을 통해 확인한다. 하지만 이 간단할 수도 있는 타입 검사가 라이브러리가 되기 위해 실제로는 이렇게 엄청난 모듈화를 거쳐 만들어졌다는 것을 확인할 수 있었다. 

React에서 실제로 동작하는 과정을 예상해보면 아마 아래와 같을 것 같다.
1. React Component 객체인지 확인
1. Component 객체라면 그 객체의 propTypes 객체와 실제 값을 전달해 `checkPropTypes()` 실행
    1. 객체들을 for문으로 돌아가면서 각 propTypes 값과 실제 값을 전달해 `PropTypes.{type}()` 실행
    1. 각 type에 맞는 `validate()`를 실행해 결과 리턴
    1. 결과 값에 따른 출력

___

내가 직접 써봤던 오픈소스를 타고 들어가보면서 제대로 분석해보긴 처음인데, 소스를 보면서 여러가지 느낀점들이 많았다. 

실제로 모듈이 사용되는 방식을 짐작해볼 수도 있었고, 모듈화를 할 때마다 파일의 역할이 너무 작은 것 아닌가 하는 고민이 들 때도 있었는데 이 코드를 보면서 오히려 역할별로 잘 분담된 코드가 더 보기 편하다고 느껴서 파일에 담긴게 적다고 고민할 필요는 없다는 생각이 들었다.  

새롭게 알게 된 부분도 많았고, 라이브러리가 얼마나 일반화하기 위해 노력한 코드인지 그리고 이런 코드들은 절대 쉽게 만들어지지 않았다는 것도 알게됐다. 이런 라이브러리들이 있다고 써보기만 하고, 좋아하기만 했는데 감사할 줄도 알아야할 것 같다.. 대단해.. 나중엔 나도 이런 공용화된 라이브러리를 만들어보고 싶다😤!

내가 분석했던 테스트코드는 하다보니 React의 15버전에 대한 테스트코드였다는 것을 알게 됐는데, 일반적인 React 버전의 실행 과정은 [이 테스트 코드](https://github.com/facebook/prop-types/blob/master/__tests__/PropTypesDevelopmentStandalone-test.js)를 참고하면 된다. 결국은 동일한 파일을 import하기 때문에 크게 과정이 다르진 않다.
{: .notice--warning}
