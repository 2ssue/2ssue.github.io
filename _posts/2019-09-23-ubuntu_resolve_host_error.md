---
title: "Ubuntu 'sudo:unable to resolve host' 에러"
date:   2019-09-23 22:40:24 +0900
categories: Programming
tags: error ubuntu
--- 

nCloud에 우분투 서버를 생성했는데 `sudo` 명령을 입력할 때 가끔씩 아래와 같은 메시지가 나타났다.  

```
root@test:~# sudo su
sudo: unable to resolve host test
```

동작을 하는데는 문제가 없었지만, 아무래도 기능과 상관이 없는 문제가 자꾸 출력되서 찜찜한 기분이 들었다.  
  
검색을 해보니 처음부터 프로젝트 이름은 test 였는데, 재부팅하면서 이름이 바뀌었는지 `/etc/hostname`과 `/etc/hosts`의 이름이 달라서 발생하는 문제였다.  
  
- /etc/hostname (normal)
```
test
```

- /etc/hosts (abnormal)
```bash
127.0.0.1       localhost
127.0.1.1       ubuntu-16-04 #convert this name to test(same with hostname)

# ...
```

`/etc/hosts`에서 127.0.1.1에 설정된 이름을 `/etc/hostname`과 동일하게 바꾸면 증상이 해결된다 :) !  