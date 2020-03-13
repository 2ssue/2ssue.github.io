---
title: "jekyll 블로그에 utterances 적용하기"
date: 2020-03-13 22:38:24 +0900
categories: Blog
tags: blog editor git markdown
---

요즘 여러 블로그들을 보면서 멋진 댓글 플랫폼을 하나 발견했다. utterance라는 오픈소스 댓글 플랫폼인데, 깃헙의 이슈 형식을 따서 만들어진 플랫폼이다. 실제로 연결된 레파지토리에 이슈를 남겨서 만들어진다. 

소스를 보니 2년도 더 된 오픈소스인 것 같은데, 마크다운에 푹 빠져있는 나로서는 너무 좋은 플랫폼이 아닐 수 없었다. 마크다운으로 댓글을 달 수 있다니! 거기다 깃헙 디자인이라 왠지 너무 멋있었다.. 

![image](https://user-images.githubusercontent.com/42017052/76626257-305d6a80-657c-11ea-8291-7559eca0529e.png){: .align-center}

그래서 당장 블로그 레포에 이슈를 달았다. 까먹지 말고 변경해야지! 하면서! 

## 🔮utterances로 댓글 플랫폼 적용하기

엄청나게 간단하다. 4단계면 끝!

### 1. 새로운 레파지토리 생성
github에 댓글 이슈가 등록될 repository를 생성한다. 나는 [2ssue/blog_comments](https://github.com/2ssue/blog_comments)로 만들었다.

### 2. 레파지토리에 utterances 연결
[https://github.com/apps/utterances](https://github.com/apps/utterances)에 접속해서 github 계정에 utterances를 연결한다. 앱이 레파지토리에 접근 권한을 가질 수 있도록, 아래와 같이 새로운 레포에 접근 권한을 준다.

![image](https://user-images.githubusercontent.com/42017052/76624530-d1e2bd00-6578-11ea-943b-8194e8dc0eb9.png){: .align-center}

### 3. 블로그에 적용할 스크립트 만들기
install을 클릭하면 [이 페이지](https://utteranc.es/)로 이동하는데, 여기서 블로그에 추가할 스크립트를 만들어서 복사할 수 있다. 

1번에서 만들었던 레파지토리 이름을 작성하고,
![image](https://user-images.githubusercontent.com/42017052/76627463-6865ad00-657e-11ea-8e80-2f5f059b51b5.png){: .align-center}

이슈가 어떤 식으로 달릴지 제목 형태를 지정한다. 나는 포스트의 제목이 같이 달렸으면 해서, page title을 포함하도록 했다. 
![image](https://user-images.githubusercontent.com/42017052/76627477-70bde800-657e-11ea-989b-fe0c0075031b.png){: .align-center}

이 부분은 이슈에 어떤 라벨이 달릴지 지정하는 부분이다. 이 때, 해당 레포에 이 라벨이 없으면 달리지 않으므로 주의해야한다.  
![image](https://user-images.githubusercontent.com/42017052/76627523-859a7b80-657e-11ea-9413-eaa4b8fa6bb8.png){: .align-center}

이렇게 모든 작업을 마치고 나면 적은 정보대로 하단에 스크립트가 생성된다. 이 스크립트를 복사해 적용만 하면 된다. 
![image](https://user-images.githubusercontent.com/42017052/76628293-d9f22b00-657f-11ea-8b83-2617e27ee85d.png){: .align-center}

### 4. 블로그에 스크립트 적용하기

블로그의 포스트를 만드는 레이아웃에 댓글 스크립트를 작성하면 되는데, 보통 `_layouts` 이라는 폴더 아래에 `post.html` 같은 파일로 존재한다. 나의 경우엔 만들어서 적용한거긴 하지만, 이전에 적용했던 스킨에서도 비슷한 이름이었던 걸로 기억한다. 

![image](https://user-images.githubusercontent.com/42017052/76628633-63096200-6580-11ea-8209-444fcb429161.png){: .align-center}

그리고 이렇게 적용하면 완료! 이제 깃헙 이슈 형태로 댓글을 달 수 있게 된다! 커밋으로 확인하고 싶다면 [`3138b4b`]((https://github.com/2ssue/2ssue.github.io/commit/3138b4b0c04a898ba75f84bfe48063fa84d6ebe0))로 확인할 수 있다 :)

이전에 disqus에 달렸던 댓글이 몇 개 있어서 조금 아쉽긴 하지만.. 이 디자인을 꼭 적용해보고 싶었다..ㅠㅠ 그 분들이 다시 달아줄 순 없을테고, 다시 내가 달아야하나...😂
