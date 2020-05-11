---
title:  "GitHub Actions로 vuepress 자동 빌드하기"
date:   2020-05-11 14:41:24 +0900
categories: Programming
tags: github githubActions ci/cd
---

> 아래는 스크립트를 완성하게 된 과정을 담고 있습니다. 완성된 스크립트를 먼저 확인하고 싶으시다면 글 하단의 [드디어 완성된 스크립트](#드디어-완성된-스크립트)에서 확인할 수 있습니다.

## vuepress 도입기
얼마 전, 친구가 정리한 문서들을 vuepress로 만든 걸 보고 나도 흥미가 생겨서 그동안 정리하던 [알고리즘 문서](/Algorithm)들과 [웹 개발자가 알아두면 좋은 질문](/common_questions_for_Web_Developer)을 vuepress 문서로 바꿔봤다.

vuepress를 검색해보면 [기술 문서를 빠르게 만들어보자!](https://limdongjin.github.io/vuejs/vuepress/)라는 글이 있는데, 이 글 처럼 정말 기본 디자인이 한 카테고리에 관련된 기술 문서들을 정리하기 좋은 것 같았다. 사람들을 보니 블로그로 커스텀해서 만들기도 하고, 다양하게 활용을 하고 있었다.

나 역시 블로그와는 다르게 목적에만 집중할 수 있는 심플한 이 디자인이 좋았고 기술 정리에 관한 문서들은 블로그가 아닌 vuepress에 따로 문서화 하는 것이 좋겠다는 생각이 들었다. 블로그는 아무래도 기술에 대한 경험, 도입기와 같은 사담들이 많이 들어가기 때문이다. 

### 수정하고 빌드하고 무한 반복.. 이걸 매번?
그래서 vuepress를 몇 일 사용하다가 핸드폰으로 문서의 오탈자들을 고치게 되었는데 핸드폰이기 때문에 스크립트를 실행해 빌드하고 다시 GitHub 페이지로 업데이트 해줄 수가 없었다. 그러다 자동으로 빌드가 되면 얼마나 좋을까 생각했고, 불현듯 GitHub에 새로 생긴 Actions가 생각났다.

## GitHub Actions? 
CI/CD를 지원하기 위해서 GitHub에서 새로 나온 기능이다. 덕분에 GitHub 저장소 하나만으로도 개발한 소프트웨어의 테스트, 빌드, 배포까지 전부 자동화가 가능해졌다. 옛날에 [피키포키](https://github.com/connect-foundation/2019-07) 프로젝트를 했을 때 한번 도입해보고 싶었는데, 구현에 급급하다보니 이 기능을 공부할 시간이 없어서 도입하지 못했었다. 또 그 땐 정식 출시가 된지 얼마 안됐을 때라 정보가 많지 않았다. ~~(지금도 많진 않은 것 같지만..¯\_(ツ)_/¯)~~

자세한 내용은 [GitHub Help](https://help.github.com/en/actions/getting-started-with-github-actions/about-github-actions)에 잘 설명되어있다. 
{: .notice--info}

### GitHub Actions workflow

GitHub Actions가 어떻게 CI/CD를 지원하는지 부딪혀보기 위해서, workflow 생성을 눌러봤다. 그럼 다양한 방식으로 만들어진 workflow들이 존재하는데 내 상황에 맞는 부분이 없는 것 같기도 했고 어떤 방식으로 script를 작성하는지 궁금해서 직접 만들어보기로 했다. 

정말 좋았던게, 커스텀으로 만든다고 해서 빈칸으로 두지 않고 사용 방법을 간단하게 적어둬서 완전히 처음부터 배우지 않아도 내가 궁금한 부분만 따로 찾아볼 수 있게 만들어두었다. 왼쪽엔 코드가 있고, 우측에 Documentation 탭을 클릭하면 좀 더 자세한 설명과 링크가 주어져있다.

![image](https://user-images.githubusercontent.com/42017052/81528561-f6e88600-9397-11ea-9e7c-65752a9783cd.png) 

이를 확인하면 어렵지 않게 어떤 식으로 GitHub Actions workflow를 만드는 것인지 대충이나마 알 수 있다. 기본으로 주어진 workflow를 통해 간단히 살펴보면 아래와 같다. 

![image](https://user-images.githubusercontent.com/42017052/81530057-0b7a4d80-939b-11ea-86bb-2d55975e78ee.png){: .align-center}


## workflow를 생성해보자

workflow가 어떻게 동작하는지 어느정도 파악이 됐기 때문에, 이제 내 상황에 맞는 workflow를 작성해보기 위해 한번 작업들을 나열해봤다. 1번을 제외하곤 vuepress의 delpoy 스크립트 파일이 보통 하는 일과 동일하다. 

1. master에 push 이벤트가 발생했을 때 (**event**)
1. master에 있는 데이터를 빌드한다. (**step**)
1. 빌드한 데이터를 gh-pages로 force push한다. (**step**)

이렇게 모든 상황이 정의되었다. 우리에겐 이미 vuepress에서 통용적으로 사용하는 build&deploy 스크립트가 있기 때문에 이 스크립트를 활용해서 스크립트를 완성했다. ~~(거의 복붙 수준)~~ 드디어 자동화 할 수 있을까..!?

만약 vuepress build 스크립트가 뭔지 잘 모르겠다면, [이 튜토리얼](https://vuepress.vuejs.org/guide/deploy.html#github-pages)을 참고하면 좋을 것 같다.
{: .notice--info}

### 왜 안돼지?

요약하자면 이 빌드 환경이 전혀 새로운 공간에서 실행된다는 것을 처음에 제대로 인지하지 못했다. 당연히 내 로컬과 같은 상황(git도 연결돼있고, node module도 설치돼있겠지..?)이라고 생각하고 스크립트를 작성했는데, 정말 바보같은 생각이었다. 

그래서 남은 상처와도 같은 엄청난 ❌.. 

![image](https://user-images.githubusercontent.com/42017052/81530594-27caba00-939c-11ea-826d-e482bba81092.png){: .align-center}

첫 스크립트였던 아래 스크립트에서 잘못된 부분은 여러가지가 있었다. 

1. npm module을 설치하지 않은 것
1. 어떤 유저가 git을 사용하는 것인지 명시하지 않은 것
1. 어떤 repository로 보내는 지 명시하지 않은 것
1. git push를 하는 유저의 remote 계정 정보가 없는 것

```yml
   steps:
    - name: checkout
      uses: actions/checkout@v2

    - name: Run build and commit
      run: |
        set -e
        npm run build
        cd .vuepress/dist
        git init
        git add -A
        git commit -m 'deploy with vuepress'
        git push -f master:gh-pages
        cd -
```

1 ~ 3번은 로그에 남은 오류를 확인하고 스크립트를 입력해서 npm install, git config 설정, repository 주소 입력으로 스크립트로만 해결할 수 있었는데 4번은 Password를 찾을 수 없다는 경고가 발생했다. 왠 암호지..? 

marketplace에 올라온 다른 workflow들을 보다가 왜 그런지를 알게 되었는데, 생각해보면 git 정보를 remote 저장소로 옮기기 위해선 그 remote git 저장소의 계정으로 로그인을 해야한다. 로컬에선 이미 그 인증 절차를 거쳤기 때문에 편하게 올릴 수 있었던 건데, 익숙하다보니 잊고 있었다.

그런데 이 스크립트는 공개된 장소에 올라가기 때문에 스크립트에 내 비밀번호를 입력할 순 없었다. GitHub에서는 그런 상황을 위해서 TOKEN을 제공하고, 이 토큰을 레파지토리의 Secrets 항목에 저장하고 변수 형태로 뽑아서 사용할 수 있었다.

- [Secrets에 토큰을 저장하는 방법](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets)
- [ACCESS TOKEN을 생성하는 방법](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)
 
## 드디어 완성된 스크립트

이렇게 여러 번 삽질을 거쳐서 약 3시간의 싸움 끝에 빌드 스크립트를 완성할 수 있었다. 이제 master를 수정하면 자동으로 action의 workflow가 동작해서 build되고, gh-pages 브랜치로 자동으로 배포된다! 🎉🎉

```yml
name: build & deploy

on:
  push:
    branches: [ master ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - name: checkout
      uses: actions/checkout@v2

    - name: Install and Build
      run: |
        npm install
        npm run build
        
    - name: Deploy Build Files
      env:
        # jekyll이 해석해버려서 괄호를 하나로 바꿨는데, 사실 중괄호 두개로 감싸야 한다. 
        ACCESS_TOKEN: ${ secrets.ACCESS_TOKEN } 
      run: |
        cd .vuepress/dist
        git config --global user.email "e2ssue@gmail.com"
        git config --global user.name "2ssue"
        git init
        git add -A
        git commit -m 'deploy with vuepress'
        git push -f https://${ACCESS_TOKEN}@github.com/${GITHUB_REPOSITORY}.git master:gh-pages
```

![image](https://user-images.githubusercontent.com/42017052/81532269-146d1e00-939f-11ea-9742-3f61266f6762.png)
