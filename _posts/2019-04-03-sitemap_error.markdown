---
title: "sitemap.xml EntityRef: expecfing ';' 에러"
date:   2019-04-03 22:35:24 +0900
categories: blog
tags: jekyll
classes: wide
---

Google Search Console을 보는데 자꾸 사이트 맵 제출이 제대로 안되는 것 같았다.  
그래서 블로그 url에 sitemap.xml을 쳐서 확인해보니 아래와 같은 상황이 펼쳐졌다.  
  
![사이트맵 에러](/assets/images/sitemap_error.PNG)

왜! 나는 아무짓도 안했는데!! 갑자리 에러라니...  
  
이리저리 검색을 하다가 이유를 찾았다.  
잘 살펴보니 포스트 이름 중에서 `&`가 들어간 것이 있었던 것이다.  
  
앞으론 주의해야겠다.. 굳이 넣고싶으면 `&amp;`로 넣어야 한다고 한다.  
바꿔야하는 모양은 [여기](http://mrrena.blogspot.com/2009/07/entityref-expecting-at-line-1.html)를 참고하자.  