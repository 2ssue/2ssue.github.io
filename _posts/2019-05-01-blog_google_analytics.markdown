---
title: "jekyll 블로그에 google analytics 적용하기"
date:   2019-05-01 21:46:24 +0900
categories: blog
tags: jekyll
classes: wide
---

Google Search Console은 등록이 되서, 블로그 방문자 확인을 할 수 있었다.  
그런데 Google Analytics도 같이 등록했다고 생각했는데 Search Console이랑 결과가 맞지 않아서 뭔가 이상했다.  
  
내가 방문한 것도 인식이 안되길래 이상해서 깃을 확인해보니 추적 코드가 등록이 안된 상태였다.  
그래서 어제 새벽에 모바일로 커밋하고 되는 것 확인하고 잠에듦 X)..  
  
___

이전에 Google Analytics에 가입은 한 상태여서 추적 코드만 블로그에 등록하면 됐다.  
가입을 안한 상태라면 가입을 하고, 관리 메뉴에서 추적 ID를 확인한다.  
  
jekyll에 __config.yml 파일이 있다면 g-analytics 와 비슷한 항목을 찾아 추적 ID로 변경하면 된다.  
  
minimal mistakes 테마를 적용하고 있는 나는 아래와 같이 analytics 항목에서 변경해주었다.  

```
analytics: "google"
google:
	tracking_id : UA-135038079-1 #본인의 추적코드 작성
	anonymize_ip : false (default)
```

만약 __config.yml 파일이 없다면 __include 폴더에 analytics.html 파일이나, analytics-providers 폴더의 파일을 선택해 코드를 변경해주면 된다.  
이 경우에는 __layouts 폴더 아래의 default.html 파일에서 코드를 변경한 파일을 include 해주어야 적용이 된다.  
  
적용이 완료됐는지 확인하기 위해서는 관리 메뉴에서 추적 ID 옆의 테스트 신호 버튼을 누르면 된다.  
테스트 신호를 보내면 등록한 사이트로 연결되는데, 등록이 완료되었다면 실시간 메뉴에서 활성 사용자 수가 올라간다.  
![ga](/assets/images/ga.png)  