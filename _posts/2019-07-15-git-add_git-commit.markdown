---
title:  "git add와 git commit시 Git의 내부 동작"
date:   2019-07-15 22:33:24 +0900
categories: VCS
tags: git
last_modified_at: 2019-07-15 22:33:24 +0900
published: false
---

*이 포스트는 생활 코딩의 [지옥에서 온 Git](https://opentutorials.org/course/2708) 강의를 참고하였습니다.*

### git add

git add 명령은 git에 변경된 파일이 있음을 알려주는 동작이다.  
따라서 git add가 실행되면, git은 이를 표시하기 위해 가진 파일들에 변화가 생긴다.  
  
여기서 변화가 생기는 파일들은 `objects` 파일과 `index`파일인데,  
* `objects` 파일은 파일의 내용을 가지고 있으며
* `index` 파일은 objects 파일 링크의 list(파일 이름 포함)를 가지고 있다.  
  
만약 `a`라는 내용을 가진 파일 `f1.txt`를 add하게 된다면, 
* `a`를 저장하고 있는 `objects` 파일(abcd라는 주소를 가진다고 가정)과
* 파일을 뜻하는 수식어 `blob`, objects 링크 `abcd`, 파일 이름 `f1.txt`를 담고 있는 `index` 파일이 생성(정확히는 변경)되는 것이다.  