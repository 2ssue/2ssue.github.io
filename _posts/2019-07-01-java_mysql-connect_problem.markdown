---
title:  "Spring MySQL 연동 오류"
date:   2019-07-01 16:46:24 +0900
categories: Programming
tags: java web database Error
classes: wide
---

부스트코스 3번째 프로젝트를 위해 강의를 듣고 있는데, Spring JDBC 실습을 위해 연동하는 중 오류가 발생했다.  
  
### localhost 접속 오류

첫번째 오류는 localhost로 접속할 수 없다는 오류인데, 이 오류는 MySQL이 실행 중이지 않을 때 주로 나타나는 오류이다.  
cmd를 관리자 권한으로 실행해서 `net start mysql80` 명령어를 입력해 실행시켜주면 해결된다.  

### public key retriebal is not allowed  

그 다음으로 이 오류가 발생했다.  
jdbc url에 `allowPublicKeyRetriebal=true&useSSL=false`를 추가해주면 해결된다.  
  
mysql 8.X 대 버전 이후로 발생하는 오류인데, 보안을 위해 옵션값이 업데이트 된 것 같다.  
데이터베이스의 암호를 네트워크로 전송하기 위해 **TLS**를 사용하게 되는데, 이를 사용할 수 없을 경우 **RSA 암호화 알고리즘**을 사용한다.  
이를 위해서 데이터베이스 서버의 공개키를 받아와야하는데, 이 때 `allowPublicKeyRetrieval` 옵션이 `true`여야 공개키를 받아올 수 있다.  
하지만 이 옵션을 사용할 경우 암호가 노출될 수 있기 때문에 이의 기본값이 `false`로 설정되어있다고 한다.  
  
하지만 현재 진행할 프로젝트에서는 데이터베이스에 민감한 정보가 없고, 네트워크를 통해 데이터베이스를 연결하는 것이 아니기 때문에 이 옵션을 허용하도록 했다.  
  
```
dbUrl = "jdbc:mysql://localhost:3306/connectdb?useSSL=false&allowPublicKeyRetrieval=true";
```
