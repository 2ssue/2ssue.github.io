---
title: "Error createing bean with name ~"
date: 2020-02-11 10:42:24 +0900
categories: Error
tags: web java spring
toc: true
---

[부스트코스의 Spring Layered Architecture 강의](https://www.edwith.org/boostcourse-web/lecture/16772/)를 실습해보면서 여러가지 에러와 부딪혔는데, 그 중에서도 가장 시간을 많이 투자했고 가장 어이없었던 에러인 Bean wiring과 관련된 문제에 대해 정리해야겠다고 생각했다. 

생각보다 이 문제를 겪는 사람은 굉장히 많은 것 같았는데, 많은 글들 중에서 내가 해결하는 데 도움을 줬었던 글은 사실 없었다. 그래도 다음을 위해서 그러면서 찾아뒀던 글들이라도 링크를 걸어두는 게 좋을 것 같아서 한번 정리해둔다. 

## Error createing bean with name ~
결과적으로 에러가 발생했을 때 내가 찾아봤던 해결 방법은 아래와 같았다. 하지만 내 프로젝트에서 오류를 잡아내는데 도움은 되지 못했고, 나의 경우엔 `web.xml`에 (나는 여전히 발견하지 못한) 오타가 있었다..
- 어노테이션들이 제대로 붙었는지 확인
- 메소드 안에서 `new`로 인스턴스를 또 생성하고있지 않은지 확인

> 난 다 잘 돼있는데... 왜 안돼지.... 다른 방법은 없나..?

### 다 잘 들어가있는데, 왜 유독 Controller에서만 Service를 못찾을까?
#### 삽질의 연속
Controller를 스캔하는 Config파일에는 Service가 있는 패키지 내의 Bean을 스캔하지 않고 있었다. 다른 Config 파일에서 스캔하고 있었기 때문인데, 혹시 이것때문인가 해서 Controller를 스캔하는 파일에도 Service 패키지를 넣어봤다.   
~~스캔은 됐지만 이번엔 다른쪽에서 못찾는다는 에러가 발생했다~~

어떤 사람은 Service interface엔 `@Service`를, Service 구현체에는 `@Repository`를 붙여보라는 사람이 있었다. 

이랬더니 오히려 Bean이 두개라는 에러가 발생했다. `@Qualify`나 `@Primary`를 쓰면 해결되는 것 같았는데, 이는 별로 권장하지 않는 방법이라고 해서 강의에선 제대로 됐으니까 다른 방법을 찾아보자! 하고 다시 원상복구했다.
{: .notice--info}

#### xml에 오타가..있었어..?
이리저리 또 뒤져보다가 Project Structure(IntelliJ에서 `Command + ;`를 누르면 된다)에 들어가서 문제가 없는지 확인해봤다. 그런데 Facets 부분을 보니 내가 추가해뒀던 Config 파일들이 제대로 인식되지 못하고 있었고, 이것 때문에 Bean을 찾지 못한다는 것을 알게 되었다. Config 파일이 인식되지 못했다면 이에 대한 의존성을 추가하는 xml파일에 문제가 있겠구나하고 생각하게 됐다. 

열심히 눈을 부릅뜨고 찾아봤지만 오타는 못찾았다. 그래서 결국 `web.xml` 내용을 전부 지우고 처음부터 다시 써봤다. 이제 제대로 Bean을 매칭하기 시작했다! 

## 하지만 여기가 끝이 아니지
### Java.lang.NoClassDefFoundError: com/fasterxml/jackson/databind/exc/InvalidDefinitionException

이번엔 다른 에러가 발생했다. 다행히 이 오류는 검색을 통해 바로 찾을 수 있었는데, jackson 2.8.0 버전이 내 프로젝트의 어떤 설정과 맞지 않았던 것 같다. [stackoverflow]에서 버전을 2.9.4로 올리라고 해서 올려봤는데, 잘 실행됐다.. 

왜 버전을 올려야했는지는 아직 파악중이지만, 그래도 실행시킨거에 감동.. 장장 3시간의 삽질 끝에 얻어낸 결과이다. 해결 방법은 별거아니었지만 xml 파일을 왜 잘 안쓰려고 하는지는 확실히 알았다. ~~오타좀알려줘..~~

![image](https://user-images.githubusercontent.com/42017052/74296906-904bd000-4d88-11ea-913d-8abc4a7313ef.png)

## 나의 삽질에 도움을 준 문서들
- [Two reasons why your Spring @Autowired component is null](https://www.moreofless.co.uk/spring-mvc-java-autowired-component-null-repository-service/)
- [Spring_NoSuchBeanDefinitionException](https://www.baeldung.com/spring-nosuchbeandefinitionexception)
- [stackoverflow](https://stackoverflow.com/questions/44718345/java-lang-noclassdeffounderror-com-fasterxml-jackson-databind-exc-invaliddefini)