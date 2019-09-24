---
title: "터미널 'tm크립트를 실행할 수 없으므로 ~.ps1 파일을 로드할 수 없습니다' 에러"
date:   2019-09-24 13:54:24 +0900
categories: Programming
tags: error terminal
--- 

express-generator로 서버를 자동 생성하려고 했는데, 명령어를 입력하니 갑자기 이런 에러가 발생했다.  
  
![image](https://user-images.githubusercontent.com/42017052/65482159-0e3f3580-ded3-11e9-8b65-bec3d50bd186.png)
  
검색을 해보니 스크립트 실행 권한이 제한된 상태라서 그렇다고 한다. (npm이 업데이트 되었다고해서 업그레이드를 해봤는데, 그것 떄문인 것 같다.. 실행 방식이 바뀌었나?)  
  
파워쉘을 관리자 권한으로 실행해서 권한을 변경하면 해결할 수 있다. 그 전에 아래 명령어를 실행하면 명령어에 해당하는 정보를 볼 수 있는데, 여기에서 어떤 권한을 설정할 수 있는지 확인할 수 있다.  
  
```bash
C:\> get-help Set-ExecutionPolicy
```
  
- Restricted(제한된): 실행 권한 정책 기본 옵션, 명령어 하나씩 실행 가능. .ps1 스크립트 파일을 로드해 실행 불가능
- AllSigned: 신뢰된 배포자에 의해 서명된 스크립트만 실행 가능
- RemoteSigned: 로컬 컴퓨터에서 본인이 생성한 스크립트만 실행 가능 또는 인터넷에서 다운로드 받은 경우 신뢰된 배포자에 의해 서명된 것만 실행 가능
- Unrestricted: 제한 없이 모든 스크립트 실행 가능
- ByPass: 어떤 것도 차단하지 않고 경고 없이 실행 가능
- Undefined: 정책 적용 안함.
  
이 중 원하는 권한을 골라서 적용하면 된다. 나는 그나마 안전할 것 같은 수준의 RemoteSigned로 설정했고, 명령어를 실행할 수 있었다. 권한 변경은 관리자 권한으로 실행한 뒤 해줘야 가능하다!  
  
```bash
C:\> Set-ExecutionPolicy RemoteSigned
```