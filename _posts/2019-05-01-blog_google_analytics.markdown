---
title: "jekyll 블로그에 google analytics 적용하기"
date:   2019-05-01 21:46:24 +0900
categories: Blog
tags: jekyll Web
classes: wide
---

블로그를 처음 만들었을때 Google에 검색이 되도록 모두 등록했었다. 
그리고 Search Console은 등록이 되서 블로그 유입 경로들이 어느정도 확인 가능해졌다.  
그런데 Google Analytics는 방문자 수나 유입 경로 확인이 안되서 방문자가 없는건가 했는데 Search Console이랑 결과가 맞지 않는 점이 이상했다..    
  
내가 방문한 것도 인식이 안되는 것 같아 이상해서 깃을 확인해보니 추적 코드가 등록이 안된 상태였다.  
  
> ### 추적 코드를 등록하자

이전에 Google Analytics에 가입은 한 상태여서 추적 코드만 블로그에 등록하면 됐다.  
가입을 안한 상태라면 가입을 하고, 관리 메뉴에서 추적 ID를 확인해 등록해보도록 하자!    
  
jekyll에 __config.yml 파일이 있으면 analytics 와 비슷한 항목을 찾아 추적 ID를 등록하면 된다.  
minimal mistakes 테마를 사용하고 있는 나는, 아래와 같이 analytics 항목에서 등록해주었다.  

```
...
analytics: "google"
google:
	tracking_id : UA-135038079-1 #본인의 추적코드 작성
	anonymize_ip : false (default)
...
```

만약 __config.yml 파일이 없을 경우, __include 폴더에 analytics.html 파일이나 analytics-providers 폴더의 파일을 선택해 코드를 변경해주어야 한다.  
추적 코드 아래의 스크립트를 통해 파일 내용을 변경해주도록 하자. 되도록이면 custom.html 파일을 변경하는 것이 좋을 것 같다.  
이렇게 코드 변경을 통해 등록한 경우에는 __layouts 폴더의 default.html 파일에서 코드를 변경한 파일을 include 해주어야 적용이 된다.  
  
적용이 완료됐는지 확인하기 위해서는 관리 메뉴에서 추적 ID 옆의 테스트 신호 버튼을 누르면 확인할 수 있다.  
테스트 신호를 보내면 등록한 사이트로 연결되는데, 등록이 완료되었다면 실시간 메뉴에서 활성 사용자 수가 올라간다. 
  
> ### 등록 끝! XD  
   
![ga](/assets/images/ga.png)  
