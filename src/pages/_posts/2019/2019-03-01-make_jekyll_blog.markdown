---
title:  "Windows jekyll 블로그 테마 적용하기"
date:   2019-03-01 00:33:24 +0900
categories:  Blog
tags: jekyll web
classes: wide
---

## 블로그를 만들자!

GithubPage는 Github에서 공식적으로 운영하는 블로그 서비스이다. 저장 공간도 무료고, 도메인 연결도 쉽게 할 수 있다. 사실 큰 문제는 테마를 연결해서 내 입맛대로 꾸미기이지만... 그건 조금 뒷 일로 미뤄보기로 했다😂

블로그를 만들어서 글을 적고 싶은 마음은 항상 있었지만, 실천에 옮기기 어려웠다. 우연히 스터디를 하면서 각자 블로그를 만들고 글을 올리는게 어떨까 얘기가 나오게 되어서, 드디어 블로그를 만들 기회가 생김!

찾아보니 Github Page를 만드는 데는 주로 jekyll과 HEXO를 많이 사용하는 것 같다. 테마도 더 많은 것 같고, 참고할 문서들도 많아서 나는 jekyll을 선택했다.  

## 세상에 쉬운 일은 하나도 없어...

가장 쉽게 만들 수 있는 방법을 참고해서 블로그를 만드는 데 장장 3-4시간 정도가 걸렸다. 그런데 이 방법으론 jekyll을 설치하지 않고 테마만 따온 거라서 왠지 꺼림칙했다. 그래서 고군분투 하다가 결국 Repository를 다 날려버리고 새 마음가짐으로 다시 만들어보기로 했다.  

jekyll을 설치하면 local에서 테마가 적용된 걸 확인할 수 있다는 장점이 있지만, 만약 스타일을 변경하지 않고 포스트만 올릴 예정이시라면 꼭 설치하지 않으셔도 됩니다. 아래의 [jekyll 테마 적용하기](#jekyll-테마-적용하기) 단계만 해봐도 무방합니다😊 
{: .notice}
  
## 처음부터 다시 시작해보자 Repository 만들기

먼저 [Github](https://github.com)에 접속하고 로그인 한다. 이를테면 블로그의 받침이 될 {id}.github.io라는 Repository를 만들어야 한다.  
  
이렇게 생성한 Repository는 일단 빈 공간으로 두고, 생성한 repository는 내 컴퓨터로 clone한다. clone 명령어는 git bash를 통해 원하는 폴더에 아래와 같이 입력하면 된다.

```
git init
git clone "https://github.com/2ssue/2ssue.github.io"
```

## jekyll 설치하기

jekyll을 사용하기 위해선 루비를 설치해야 한다. [루비 다운로드 사이트](https://rubyinstaller.org/downloads/)를 클릭해서 윈도우용 Ruby+Devkit 권장 버전을 설치한다.  
  
루비 설치가 완료되면 Start Command Prompt with Ruby를 검색해서 실행하고 아래 명령어들을 입력한다.  
  
```
gem install jekyll
gem install bundler
```
  
## jekyll 테마 적용하기

> 나는 가장 많이 사용되는 테마인 [minimal-mistakes](https://github.com/mmistakes/minimal-mistakes)를 사용하기로 했다. 테마는 검색을 통해 더 많이 찾을 수 있으니 마음에 드는 다른 테마를 골라도 좋다.  

테마를 적용하기 위해서 그 테마의 Repository로 이동한다. Repository의 상단 메뉴를 보면 releases 탭이 있는데, 여기서 제일 최신 버전의 zip 파일을 다운로드 받은 뒤에 내가 생성했던 Repository`(= 2ssue.github.io)`에 압축을 풀어서 옮기면 된다.

여러 사람들이 fork를 통해서 테마를 적용하는데, 나는 릴리즈 된 버전의 zip파일을 받아서 repository로 옮겼다. **릴리즈 된 버전은 안정성이 확인된 버전이어서 오류가 적다**는 글을 봐서 이 방식으로 적용했다.  
{: .notice}
  
### _불필요한 파일 삭제하기_
아래 파일들은 내 블로그를 운영하는 데 필요없는 파일이므로 삭제한다.  

- .editorconfig
- .gitattributes
- .github
- /docs
- /test
- CHANGELOG.md
- ~~minimal-mistakes-jekyll.gemspec~~
- README.md
- screenshot-layouts.png
- screenshot.png

나의 경우에는 gemspec을 삭제하니 jekyll 로컬 서버 실행이 안됐다. 다른 블로그를 참고해서 작성했는데 혹시 삭제해도 실행이 된다면 삭제해도 좋다.  
  
## jekyll을 사용해 블로그 실행해보기

테마에 있던 파일들을 다 옮겼다면, 이제 jekyll을 설치할 때 사용했던 콘솔`(=Start Command Prompt with Ruby)`이 가르키는 위치를 내 Repository로 옮긴다.

```
cd C:\Git\2ssue.github.io
```

> 만약 repository가 D드라이브에 있다면, cd 명령어 없이 D:만 입력하면 D드라이브로 변경된다.  

폴더로 이동했다면 이제 jekyll 테마를 가동시키기 위해 필요한 gem 파일들을 다운받아보자. `bundle install` 명령어를 통해서 테마에 필요한(gemfile에 명시된) gem 파일들을 받을 수 있다. 

TMI이지만 이 글을 처음 썼을 때에는 파일마다 전부 `gem install ~없는 파일`로 gem 파일을 일일히 다운 받았었다. 아래와 같이 남아있는 그 흔적..

> 명령어를 입력했을 때 어떤 파일을 찾을 수 없다는 안내가 나오면, `gem install ~없는 파일~` 을 입력해서 모두 설치해주고 설치가 완료되면 위 명령어를 다시 입력해서 실행해본다. 테마가 설치하는 모듈이 많을수록 이 작업이 꽤 많이 반복될 수 있다..

> 경고는 주로 `~: Could not find tzinfo-data-1.2019.3 in any of the sources (Bundler::GemNotFound)`와 같은 형태로 나오는데, 여기서 확인해야할 부분은 `tzinfo-data-1.2019.3` 부분이다. 없는 파일은 **tzinfo-data**이고, 뒷부분인 **1.2019.3**은 버전이기 때문에 해당버전으로 설치되지 않는 경우에는 `gem install -r tzinfo-data -v "< 1.2019.4"`와 같이 입력해야 한다. 

자 이제 설치가 끝났다면 jekyll을 실행해보자!  

```
jekyll serve
```

혹시 알 수 없는 에러가 발생한다면 `chcp 65001` 명령어를 입력하고 다시 서버를 실행시켜본다.  
bundle exec 관련 문구가 보인다면 `bundle exec jekyll serve` 를 입력해보자.  
(로컬에 스펙과는 다른 버전의 gem 파일이 함께 설치되어있기 때문에, 어떤 걸 사용할지는 gemfile에 명시된 버전을 사용하라는 뜻의 명령어이다)
{: .notice}

`Server running...`이라는 문구가 나타나면 **성공**!  

이제 테마가 적용된 블로그를 [localhost](http://127.0.0.1:4000)에서 확인할 수 있다.  
  
## 완성된 블로그를 git으로 올리기

```
git add .
git commit -m "new jekyll blog!"
git push
```

___

> 엄청난 오류와 싸우면서 jekyll을 내 컴퓨터에 붙이는데 성공했지만 사실 안쓰고 있다.. 로컬에서 git에 올리기 전에 확인 할 수 있는 메리트가 있다는 것 같은데 마크다운 문서로 작성하면 Sublime Text에서도 형태는 확인할 수 있기 때문에..  
>
> 어떻게 이용할 지는 점점 써보면서 익히면 되겠지! 그 때 되면 이것의 장점을 알게 되지 않을까 생각한다.  

약 일년이 지난 지금은 굉장히 잘 쓰고 있습니다..😁 블로그에 글이 내가 원하는 스타일로 잘 올라왔는지, 디자인을 바꿨는데 예상대로 잘 적용이 되는지 등을 확인할 때 Jekyll 로컬 서버를 주로 사용하고 있어요! 

이 글을 보시는 분들도 부디 성공하셔서 Jekyll 로컬 서버를 잘 이용하셨으면 좋겠습니다 👍