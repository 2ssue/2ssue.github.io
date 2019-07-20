---
title: "jekyll 블로그 커스터마이징하기(4)"
date:   2019-04-08 01:57:24 +0900
categories: Blog
tags: jekyll Web
classes: wide
---

벌써 4탄이다 됐다..  
  
홈화면에 최근 포스트가 스크롤 없이 보였으면 해서,  
리스트 형태에서 Grid 형태로 바꾸어보았다.  
  
> #### 이번에도 하드캐리한 개발자모드 
  
Grid형태는 포스트의 참고 부분에서 이미 사용되고 있어서 어떤 태그로 감싸져있나 확인해봤다.  
**grid__item** 형태였다. 지금 archive는 **list__item**으로 되어있어서 grid__item으로 조정해봤다.  
다행히 바로 Grid 형태로 바뀌는 것을 볼 수 있었고, html 파일에서 list대신 grid를 사용하도록 했다.  

> #### Posts, Category, Tag 메뉴도 같은 스타일을 사용하고 있었다니.. 
  
~~공통 파일 스타일을 바꿨더니 위 메뉴까지 전부다 Grid로 바뀌어서 쪼끔 이상해졌다.  
그래서 html파일을 복사해 홈화면에서만 사용할 archive-single_gridstyle.html을 만들었다.  
그리고 layout 파일에서 include 파일값만 변경하면 완성!~~

> 04/10 수정
>   
> 아래 다른 게시글에 카테고리가 같은 게시글을 띄우고 싶어서 찾아보다가 이 방법을 쓰지 않아도 된다는 걸 알게됐다.  
> 간단하게 html 파일 include에서 type=grid로 설정해주면, list타입에서 grid타입으로 변경이 가능하다.  
> jekyll을 통해 기능 확인을 한 후 gridstyle.html 파일은 삭제하여 업데이트 했다.  
> 산넘어 산, 배울 게 너무 많다!  
>   
> 알고보니 정체를 알 수 없던 포문의 site.categories도 검색을 하다보니 jekyll의 변수였단 것을 알게 되었다.  
> 무턱대고 된다고 하는 게 약간 조금 안 좋은 습관이긴 하지만 그래도 알아나가면서 고치고 있으니까! 
> 더 발전시켜나가보자 :)  
  
간단하게 Grid 형태로 변경했고, 포스트가 5개 일 땐 하나가 아래로 내려가버려서 `_config.yml`파일에서 pagination 개수를 4개로 바꿨당 =)  

> ### 이전 홈화면 
스크롤을 내려야 게시글들을 확인 가능했다.  

![이전 홈화면](/assets/images/before_home.png)

> ### 바뀐 홈화면
스크롤을 내리지 않아도 게시글을 확인 가능하다!  

![바뀐 홈화면](/assets/images/after_home.PNG)


이렇게 오늘의 커스터마이징도 성공 :) !