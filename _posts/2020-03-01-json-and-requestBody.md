---
title: "@RequestBody도 잘 작성했는데, json과 객체가 매핑이 안된다면?"
date: 2020-03-01 18:10:24 +0900
categories: Error
tags: web java spring
toc: true
---

> 지난주, RequestBody의 객체에 전달한 json 값이 매핑이 되지 않아서 약 2시간 동안..씨름을 했었다. 😱  
> `@RequestBody`를 사용하신 다른 분의 코드도 살펴봤는데 다른 점도 보이지 않고, 이것저것 해보다가 결국 다른 분들께 도움을 요청했었는데, Boolean이 문제인 줄 알았더니 알고보니 자동완성으로 생성한 Getter의 문제였다...
>
> (그렇다고 자동완성을 탓할 것도 아닌 것이.. 변수명을 명사형으로 짓지 않았던 내 탓이 크다😓)

## 문제의 발단

```
{"message":"\n### Error updating database.  Cause: java.sql.SQLIntegrityConstraintViolationException: Column 'is_available' cannot be null\n### The error may exist in file [/Users/user/Documents/fn-order/out/production/resources/mappers/SellerMapper.xml]\n### The error may involve defaultParameterMap\n### The error occurred while setting parameters\n### SQL: UPDATE seller         SET is_available = ?         WHERE id = ?\n### Cause: java.sql.SQLIntegrityConstraintViolationException: Column 'is_available' cannot be null\n; Column 'is_available' cannot be null; nested exception is java.sql.SQLIntegrityConstraintViolationException: Column 'is_available' cannot be null"}
```

분명 제대로 값을 전달했는데, 요청을 보내보니 이와 같은 응답이 왔다. 여기엔 컬럼에는 `null` 값이 들어갈 수 없어! ~~난 분명 false라고 보냈는데..~~

### 뭐지..? 객체랑 json이랑 안맞나?

가장 먼저 든 생각은 객체의 변수 이름과 json으로 전달한 값의 이름이 안맞나? 하는 생각이었다. 그런데 확인해보니 양쪽의 변수 이름은 동일했다.

```java
public class SellerRequest {
  private Boolean isAvailable;

  // Getter, toString..
}
```

```json
{
  "isAvailable": true
}
```

음.. 그럼 뭔가 별도의 설정이 필요한가해서, 먼저 `@RequestBody`로 매핑을 해놨던 다른 분의 코드를 살펴봤다. 그런데 다른 점을 발견하지 못했고, Boolean이라는 특수성인가 싶어서 Integer형으로 status라는 변수를 가진 새로운 Request 객체를 생성하게 됐다. 결과는 성공..! ~~(왜지?)~~

```java
public class AnotherSellerRequest {
  private Integer status;
  // Getter, toString...
}
```

### 🤔그런데, 정말 Boolean 때문?

이대로 사양을 바꾸려다가, 정말로 json이 Boolean이어서 매핑이 안된걸까? 하는 의문이 들었다. 이렇게 오래된 라이브러리가, Boolean은 매핑을 못해서 딴 걸 써야한다고? 뭔가 이상해..

그래서 스프링을 더 오래 써보신 다른분께 혹시 변수가 하나일 때 매핑이 안되는지, Boolean이면 안되는건지 여쭤봤다. 하지만 그 분도 금시초문이라는 반응..

그 분도 왜 안되는지 궁금해서 시도를 해보셨는지, 처음엔 안된다고 하셨다가 잠시 뒤에 성공했다는 답변을 받았다.

## 왜 됐을까? 어떤게 달랐지?

결론은 Getter의 이름이 변수와 동일하지 않았기 때문이었다. Jackson 라이브러리는 [데이터 매핑에 Java의 프로퍼티(Getter, Setter)를 사용하게 되는데](https://mommoo.tistory.com/83), 이 때 중요한 것은 json과 동일한 이름을 가진 멤버변수가 있느냐가 중요한 것이 아니라 프로퍼티가 있느냐로 동작한다고 한다.

그런데 내 Request 객체의 멤버변수의 이름은 `isAvailable`, Getter의 이름은 `getAvailable`이었다. 그렇기 때문에 동일한 이름을 가진 프로퍼티를 찾지 못해 제대로 된 데이터 매핑이 되지 않았던것..!

> 일부러 다르게 지은 것이 아니라, IDE의 자동완성을 이용했는데 메서드 이름 명명 규칙이 맞지 않아 `Is`가 제거된 것으로 보임..😵

## 오늘의 교훈. 명사형 변수이름!

자동완성이 이름을 똑같이 안지을거라곤 상상도 못했지만, 변수명을 명사형으로 지었더라면 발생하지 않았을 문제였다.. 앞으론 변수의 이름을 한번 더 고민해서 지어야겠다는 교훈을 얻었다.

~~옛날엔 명사형으로 잘 지었었는데.. 어쩌다 쇠퇴해버렸는지 모르겠다.~~

---

Jackson 라이브러리는 프로퍼티를 이용해 데이터를 매핑한다고 했는데, 이는 Java의 Reflection이라는 개념을 활용한 것이다. 대부분의 라이브러리들이 이렇게 객체를 매핑할 때 이 개념을 사용한다고 한다.

> Jackson 라이브러리가 데이터를 매핑하는 방법에 대해 공식 문서같은 것을 확인해보고 싶은데, 라이브러리를 검색하면 최상단에 공식 사이트가 나오는 javascript 모듈들과는 다르게 java는 다른 블로거들의 글이 너무 많아서 공식 문서를 찾기 힘들다..

더 잘 알아뒀더라면 문제를 금방 찾았을 수 있었을거란 생각이 들어서 다시 한번 공부해보면서 정리해볼 생각이다.
