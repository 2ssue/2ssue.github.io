---
title: "The Servlet name already exists 문제"
date:   2019-06-18 12:06:24 +0900
categories: Programming
tags: Web Error
classes: wide
---

eclipse IDE에서 Servlet을 삭제하고, 다시 작성하려고 했더니 이미 존재한다며 만들어지지 않았다.  
분명 삭제한건데 왜 그런걸까 해서 검색해봤더니 web.xml 파일 때문이었다.  
  
web.xml 파일은 생성하는 Servlet에 대한 정보는 자동으로 생성하지만, 삭제한 경우는 남겨둔다.  
때문에 기존에 있던 이름의 Servlet을 재 생성하려면, `servlet`과 `servletmapping`을 지우고 생성하면 된다.  
  
간단한 해결법이 있는데 항상 돌아서 도착한다..  