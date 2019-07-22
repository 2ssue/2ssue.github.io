---
title: "Javascript) Prototype이란?"
date:   2019-07-22 10:57:24 +0900
categories: Base
tags: javascript
---

Javascript에는 다른 객체 지향 언어처럼 클래스의 개념이 없다. 대신 그와 비슷한 개념으로 prototype이 있다. prototype은 마치 클래스처럼 사용할 수 있는데, prototype에 값들을 지정해주면 그 값을 마치 다른 언어에서 클래스 안에 있는 값을 사용하는 것처럼 참조하여 사용할 수 있다.  
  
이 prototype을 이용해서 기본 내장 객체인 `Object` `Function` `Array` 등에 새로운 함수를 정의해 확장시켜서 사용할 수도 있다.  
  
> javascript의 기본 내장 객체
> * Object
> * Function
> * Array
> * String
> * Boolean
> * Number
> * Math
> * Date
> * RegExp

기본 내장 객체를 확장한 예를 들어보면 아래와 같다. Array의 내장 객체 함수인 `reduce`를 커스텀으로 제작해본 예이다.   
  
```javascript
var arr = {'seoul', 'new york', 'pusan'};
Array.prototype.customReduce = function(callback, initialValue){
    let result;

    if(typeof callback === 'function'){
        let array = this;
        let startIdx = 0;

        if(arguments.length == 2){
            result = initialValue;
        }else{
            result = array[0];
            startIdx = 1;
        }

        for(let i = startIdx; i < array.length; i++){
            result = callback(result, array[i]);    
        }
    }

    return result?result:ERROR_MESSAGE;
}
```
  
물론 이 함수를 내장 객체에 확장해서 사용하지 않고, `function customReduce()`로 선언해 사용할 수도 있다.  

### prototype chain

protytpe은 상속처럼 사용할 수 있는데, 이렇게 사용하는 것을 `prototype chain` 이라고 한다. 아래 코드 처럼 사용한다. 

```javascript
function Ultra(){}
Ultra.prototype.ultraProp = true;

function Super(){}
Super.prototype = new Ultra();

function Sub(){}
Sub.prototype = new Super();

var o = new Sub(); //생성자
console.log(o.ultraProp);
```

`Sub()`객체를 받은 변수 `o`는 위 코드에서 `ultraProp`를 참조하려고 한다. 그런데 `o`와 `Sub()`에는 모두 `ultraProp`라는 변수가 존재하지 않는다. 따라서 Sub의 prototype에 존재하는지 찾게 된다. 그런데 `Sub()` 함수에서도 ultraProp를 찾을 수 없다.  
  
코드를 보면 `Sub.prototype`에는 `Super()` 객체가 참조되어있다. 그래서 컴파일러는 `ultraProp`을 찾아 Super() 함수로 향한다. 이번에도 Super()는 ultraProp을 가지고 있지 않다.  
  
그래서 `Super.prototype`을 보니, `Ultra()` 객체를 참조하고 있다. 이번에도 컴파일러는 `ultraProp`을 찾으로 Ultra() 함수로 향하고, Ultra 함수에서는 ultraPop을 찾을 수 없지만 Ultra.prototype에 ultraProp이 있다는 것을 찾았다.  
따라서 `o`는 Ultra.prototype의 ultraProp를 사용하게 된다.  
  
만약 Ultra까지 올라가기 전에 ultraProp을 찾게되면, o는 그 ultraProp을 사용하게 된다. 무조건 적으로 가장 상위의 값을 가져오는 것이 아니라, 찾는 값이 없을 때 상위 prototype으로 올라가 값을 찾는 것이기 때문에 발생하는 현상이다.  
  
이렇게 객체와 객체를 연결해 체인처럼 사용하는 것이 **prototype chain** 이다.  
  
> cf) 만약 Super.prototype = Ultra.prototype으로 하게되면, Super.prototype의 값을 변경했을 때 Ultra.prototype의 값도 변경되기 때문에 주의하자. `new Ultra()`를 통해 새로운 객체를 생성해주어야 원형인 prototype에는 영향을 주지 않는다. 