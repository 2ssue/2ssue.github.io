---
title: "MySQL msi installer 설치 오류"
date:   2019-06-22 16:34:24 +0900
categories: Project
tags: web
classes: wide
---

매일 노트북으로 개발하다가, 화면이 너무 작아서 답답했다.  
10인치로 코딩이라니.... 그동안 혹사 당한 눈이 너무 안타까워 데스크탑에도 동일한 환경설정을 하기로 했다.  
  
tomcat v8.5 설치 완료..  
eclipse EE 설치 완료..
**MySQL 설치 실패!**  
  
어째서 이런 시련을, 노트북과 똑같은 방법으로 msi로 설치를 시작했다. 그런데 왜?!?!  
Server만 설치가 안됐다. 찾아보니 설치 프로그램에서 발생하는 에러같은데, 고치는 방법이 안나왔다. 멘붕인 상태로 그냥 노트북으로 개발해야지! 했다가 이대로는 참을 수 없어서 결국 다시 다음날 데스크탑을 켰다.(그냥 팀뷰어같은걸로 쓸 것을... 두번 환경설정 하는 일은 너무 번거롭다)  
  
msi로 설치하라고해서 msi로 설치를 한거긴 했지만, MySQL 홈페이지에서는 ZIP Archive로 설치하는 방법도 제공한다.(사실 이게 default) 그래서 이번엔 ZIP Archive로 설치하는 방법을 시도해봤다.  
  
> ### MySQL 설치 및 압축 해제

[MySQL 사이트](https://www.mysql.com/downloads/)에 접속해서 MySQL Community Server ZIP Archive를 다운로드 한다.  
  
다운로드가 완료되면 설치하려고 한 위치에 ZIP 파일의 압축을 풀면 된다.  
나는 `C:\Program Files\MySQL\mysql-8.0.16-winx64`에 압축을 풀었다.  
  
> ### 환경 변수 등록

![환경 변수](/assets/images/System_variables.png)

윈도우 검색창에 `환경`이라고 검색하면 `시스템 환경 변수 편집`을 확인할 수 있다.  
시스템 환경 변수에서 아래 사진과 같이 새로운 환경 변수를 만든다.  

#### 시스템 변수 새로 만들기
  
![환경 변수](/assets/images/sv.PNG)
  
경로는 MySQL ZIP 파일을 압축 해제한 경로이다.  

#### Path 변수 새로 만들기 (추가하기) 

![환경 변수](/assets/images/path_v.png)

사진처럼 Path 변수에 MySQL_HOME%\bin을 추가해준다.  
  
> ### 서비스 시작을 위한 준비

ZIP으로 MySQL을 설치하게되면, 시스템에 MySQL이 서비스 생성이 되지 않아있다.  
때문에 서비스 설치를 해줘야하는데, 설치를 해도 my.ini라는 설정 파일이 없어서 MySQL을 실행할 수 없었다.  
  
이를 위해 cmd창을 열고, MySQL이 설치된 폴더로 이동한다. (cd [설치된 경로])  
경로로 이동한 다음에는 `mysqld --initilaize-insecure` 명령을 실행한다.  

이 명령을 실행하고 폴더에 data 폴더가 생기면 성공이다!  
만약 에러가 발생해서 생성이 안됐다면, 다시한번 실행해본다. (명령을 두번 실행했더니 설치가 됐다..)  
  
> ### 서비스 설치

이제 끝이 보인다!  
  
cmd 창에 `mysqld --install`을 입력한다.  
설치가 성공적으로 끝나면, Service successfully installed 를 볼 수 있다.  
만약 이미 설치되어있는데 잘 되지 않아 재설치를 원한다면, `mysqld --remove` 후 install 하면된다.  
  
> ### 서비스 시작

cmd 창에 `net start mysql`을 입력한다.  
  
> MySQL 서비스를 시작합니다...
> MySQL 서비스가 잘 시작되었습니다.

성공!  
제대로 되는지 확인하려면, `mysql -uroot -p`를 입력하고 엔터를 두번 친다. (패스워드를 설정한 적이 없으므로 패스워드를 그냥 넘어가기 위함이다)  
  
여기서 cmd창이 `mysql>` 시작하면 MySQL로 접속이 성공한 것이다. 이제 MySQL을 정상적으로 사용할 수 있다 :)  
