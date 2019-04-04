---
title: "jekyll 블로그 커스터마이징하기(3)"
date:   2019-04-04 15:27:24 +0900
categories: blog
tags: jekyll
classes: wide
---

Daily Note를 쓰면서 당분간 테마에 손 안대겠단 말이 무색하게 또 손대버렸다.  
  
홈화면에 나도 멋지게 사진이 떴으면 해서 계속 바꿔보고 싶었다.  
이번에도 새벽까지 뚝딱뚝딱 하다가 결국 완성!  
  
홈화면을 바꾸다가 포스트 형식도 더 맘에 드는 방식을 찾아서 또 바꿔버렸다.  

아무래도 밤에 일하는게 적성에 맞는 것이 분명해...  
  
> ### 개발자 모드가 짱이야!

오늘도 도움을 준 개발자 모드에게 이 모든 영광을 돌립니다..  

> ### 홈 레이아웃 바꾸기

먼저 홈화면을 구성하는 레이아웃은 `\_layouts\home` 에 작성되어 있다.  
조만간 jekyll 폴더 구성이 어떻게 되어있는지 정리해놔야겠다. 계속 하는데도 헷갈리는 중..  
  
암튼, [Minimal Mistakes 홈화면](https://mmistakes.github.io/minimal-mistakes/)을 참고해보면, 큼지막한 그림이 page__hero 클래스를 쓴 걸 확인할 수 있었다.  
홈화면엔 넣는 방법을 잘 모르겠어서 다른 레이아웃 구성을 살피다가 **splash.html** 구성이 마음에 들었다.  
  
사실 지금 와서 생각해보면 그냥 home.html에 구성해도 됐는데 뭔가 꽂혔나보다...  
  
그래서 `index.html`에서 첫 레이아웃을 splash로 바꿨고, 옆에 붙어있던 내 소개도 없앴다.  
이번이야말로 그냥 야매로 구성했는데 아래 if문 조건을 어떻게 만족하는지 모르겠어서 그냥 html로 다 넣어줘버렸다.  
  
```html
{% if page.header.overlay_color or page.header.overlay_image or page.header.image %}
  {% include page__hero.html %}
{% elsif page.header.video.id and page.header.video.provider %}
  {% include page__hero_video.html %}
{% endif %}
```

html공부를 아무래도 좀 더 해야할 것 같다..  
돌아돌아 엄청 오래걸렸긴 하지만 코드만 보면 너무 짧아서 엄청 쉽게 만들었다.  
page__hero 클래스를 사용해서 이미지를 넣고 home에 있던 최근 게시물 include문을 가져와서 원하는 형태는 금방 만들 수 있었다.  
page__hero class는 `\_include` 폴더에 있으니 혹시 바꿔보려면 참고!  

> ### 포스트 여백 바꾸기

내 소개를 포스트 형식에서도 없애면서 왼쪽에 남는 여백이 너무 거슬렸다.  
왼쪽으로 옮길 수 있는 방법이 없을까 CSS 스타일을 바꿔보다가 float를 왼쪽으로 바꿔주니 왼쪽 여백은 없앨 수 있었다.  
  
그런데 여전히 오른쪽에 여백이 남아서 뭔가 이상했다.  
또 이리저리 스타일을 바꿔보다가, width값을 100%로 주면 꽉차는 형태로 바뀌는 것을 확인했다.  
  
CSS 파일을 확인해보니 sidebar로 인한 공간을 남겨두는 것 같았다.  
과감하게 그 값을 지우고 100%로 출력되게 바꿨고, 지금의 형태로 완성!  
  
좀 큼직큼직한 면이 있지만 매우 마음에 든다.  

> ### _config.yml로 제목 메뉴 설정해주기

이 기능은 [Minimal Mistakes에서 커스터마이징 방법](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/)을 보다가 발견했다.  
breadcrumbs 속성을 true로 바꾸면 되는데, 그러면 상단에 아래와 같이 메뉴가 생긴다.  

![breadcrumbs](/assets/images/breadcrumbs.PNG)

그래서 포스트에 달린 카테고리에 있는 글을 모아보거나, 홈으로 되돌아갈 수 있다.  
  
뭔가 더 블로그스러워진 것 같아서 기분이 좋다 :)  