---
title:  "git add와 git commit시 Git의 내부 동작"
date:   2019-07-15 22:33:24 +0900
categories: VCS
tags: git
last_modified_at: 2019-07-16 00:05:24 +0900
---

*이 포스트는 생활 코딩의 [지옥에서 온 Git](https://opentutorials.org/course/2708) 강의를 참고하였습니다.*

### git add

git add 명령은 git에 현재 commit된 버전과 다르게 변경된 파일이 있음을 알려주는 동작이다.  
따라서 git add가 실행되면, git은 이를 표시하기 위해 가진 파일들에 변화가 생긴다.  
  
여기서 변화가 생기는 파일들은 `objects` 파일과 `index`파일인데,  
> `objects` 파일은 파일의 내용을 가지고 있으며,  
`index` 파일은 objects 파일 링크의 list(파일 이름 포함)를 가지고 있다.  
  
만약 `a`라는 내용을 가진 파일 `f1.txt`를 add하게 된다면, 
> `a`를 저장하고 있는 `objects` 파일(abcd라는 주소를 가진다고 가정)과  
> 파일을 뜻하는 수식어 `blob`, objects 링크 `abcd`, 파일 이름 `f1.txt`를 담고 있는 `index` 파일이 생성(정확히는 변경)되는 것이다.  
>  ```
>  //index file contents
>  blob abcd f1.txt
>  ```

이후에 `b`라는 내용을 가진 파일 `f2.txt`를 추가로 add하면,  
> `b`를 저장하고 있는 `objects` 파일(링크: efgh)과  
> 위 정보가 `index`파일에 추가된다.  
>  ```
>  //index file contents
>  blob efgh f2.txt
>  blob abcd f1.txt
>  ```
  
이 때 만약 `f2.txt`와 똑같은 `b`라는 내용을 가진 `f3.txt`가 add 되면 조금 독특한 동작을 하게 된다.  
> `b`를 저장하고 있는 `objects`가 이미 있기 때문에, 새로운 `objects`는 생기지 않는다.  
> 새로운 파일이 생긴 것은 맞기 때문에 `index` 파일에 이 파일에 대한 정보가 추가된다.  
>  ```
>  //index file contents
>  blob efgh f3.txt
>  blob efgh f2.txt
>  blob abcd f1.txt
>  ```

이와 관련된 강의는 [여기](https://opentutorials.org/course/2708/15238)를 참고한다.  
  
### git commit 
  
git commit 명령은 git에 변경된 파일이 있음을 명시하는 동작이다. 따라서 commit을 하게되면, 그 전까지 add한 파일들이 해당 commit에 기록된다. add 동작과 마찬가지로 git commit이 실행되면, git은 이를 기록하기 위해 가진 파일들에 변화가 생긴다.  
  
먼저 `index` 파일이 변경된다.  
  
commit에도 이번에 어떤 파일들이 어떻게 변경되었는지에 대한 정보가 필요하기 때문에, add 당시 `index`에 저장된 내용과 같은 내용을 가진 `objects`파일을 생성한다. 파일들의 변경 정보가 담긴 `objects`파일이 생성되면, commit 동작으로 인해 파일들이 모두 최신 버전으로 올라갔기 때문에 add 정보가 담겨있던 `index`에 있는 내용은 초기화 된다. 이후 과정에서 새로운 add list를 추가하기 위함이다.  
  
변경된 파일 정보들을 가지고 있는 `objects`가 생성되었으니, 이번에는 commit의 전체 정보가 담긴 파일이 생성되어야 한다. 이름이 똑같아 헷갈릴 수 있지만 이 파일의 이름도 `objects` 파일이다. 이 파일은 변경된 파일 정보들을 가지고 있는 `objects` 파일의 링크, commit 저자의 정보, commit에서 남긴 메시지, 이전 commit의 링크와 같은 내용을 담고 있다.  
  
이름이 같아 이해하기 난해하니, 예를 들어 설명해보자.  
add `index`의 내용을 옮긴 `objects`를 `index_objects`라고 하고, commit의 정보가 담긴 `objects`를 `commit_objects`라고 한다면,  
* `index_objects`에는 아래와 같은 정보가,  
  ```
  blob efgh f3.txt
  blob efgh f2.txt
  blob abcd f1.txt
  ```
* `commit_objects`에는 아래와 같은 정보가 담기게 되는 것이다.  
  ```
  tree {index_objects link}
  parent {previous_commit}
  author {committer_info}
  committer {committer_info} 
  ```
  
이 외에도 마지막 commit을 가르키는 HEAD 등 그와 관련된 파일들이 변경된다.  
  
이렇게 각 commit마다 현재 버전에서 변경된 사항을 가지고 있고, 이전 commit에 대한 정보도 가지고 있기 때문에 git을 통해 이전 commit과의 다른 점(diff)를 확인할 수 있게 되는 것이다.  
  
이와 관련된 강의는 [여기](https://opentutorials.org/course/2708/15240)를 참고한다.  
  
### 정리
  
간략하게 요약해보자면,  
좀 더 큰 단위의 `objects`가 작은 단위, 이전 단위의 `objects`를 가르키고 있다고 보면 될 것 같다.  

```  
commit objects 
 ├ commit file list objects
 │  └ file objects  
 └ previous commit objects
    └ (previous) commit file list objects
    └ (previous) file objects
```
