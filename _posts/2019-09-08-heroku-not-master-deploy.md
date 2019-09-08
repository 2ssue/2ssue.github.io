---
title: "Heroku_master가 아닌 branch 배포하기"
date:   2019-09-08 23:17:24 +0900
categories: Programming
tags: error heroku
--- 

난생처음 Heroku에 내가 만든 프로젝트를 배포해보는데, master branch가 아닌 branch를 push하니 블로그에서 봤던 설명과는 다르게 build작업을 하지 않았다.  
  
push 내역을 읽어보니까 아래와 같은 문구를 볼 수 있었다.  
  
```
remote: Pushed to non-master branch, skipping build.
```

아무래도 마스터 브랜치가 아니면 빌드를 스킵하나보다. 문서를 찾아보니 해결방법이 있었다. 아래와 같이 입력하면 현재 브런치를 master로 사용할 수 있게 해주는 것 같다 :-)  
  
```
git push heroku {branch_name}:master
```
  
해결 방법은 [Deploying with Git](https://devcenter.heroku.com/articles/git#deploying-from-a-branch-besides-master)을 참고하였다.  