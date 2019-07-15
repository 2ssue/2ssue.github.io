---
title:  "Git 명령어 및 Git 기능 설명"
date:   2019-02-24 14:12:24 +0900
categories: VCS
tags: git
toc: true
last_modified_at: 2019-07-15 17:06:24 +0900
---

### git init

디렉토리에 git 저장소를 생성

### git clone

```
git clone {url}
```
저장소를 디렉토리에 복사

```
git clone {url} -b {branch_name} --single-branch
```
저장소에서 해당 브런치만 복사

> **git fork와 Pull Request**  
다른 사람의 Github repository에서 내가 어떤 부분을 수정하거나 추가적인 기능을 넣고 싶을 때 그 Repository를 나의 Repository로 그대로 복제하는 기능.  
>  
> fork한 저장소는 원본인 Repository와 연결되어있다. 따라서 원본 Repository에 변화가 생긴다면 fork한 Repository로 반영할 수 있다. 이 때의 과정이 fetch나 rebase이다.  
이후 원본 Repository에 내가 변경한 사항을 적용하고 싶다면 원본 저장소에 Pull Request를 날린다. 원본 저장소의 관리자가 이를 보고 승인하면, 내가 변경한 사항이 merge돼 원본 저장소에 반영될 수 있다.  
이와 같은 사항은 주로 Open Source에 Countribute시에 자주 사용되는 방법이다.  

### git pull 

원격 저장소의 변경 사항을 확인해 현재 브랜치에 불러오기

### git remote

```
git remote 프로젝트에 등록된 저장소 확인
git remote -v 연결된 저장소의 이름과 URL 확인 
git remote add {name} {url} {name} 저장소{url} 추가 
git remote rm {name} {name} 저장소 삭제 
```

### git add

```
git add .
```
수정된 전부(.)를 현재 remote에 추가  
  
> **git add시에 git 내부에서 일어나는 일**  
git add 명령을 통해 git에 새로운 파일을 등록해주면, git에는 이를 가르키기 위한 변화가 생긴다.  
*파일의 내용을 담은* `objects`라는 파일이 새로 생성되고, *변경된 파일 이름과 objects 정보를 저장*하는 `index`라는 파일이 변경된다.  
>  
> 이후 또 add가 일어나게 되면 add된 파일의 내용을 담고 있는 새로운 objects 파일이 추가되고, index 파일에는 이 objects와 파일에 대한 새로운 정보를 추가한다.  
>> 여기서 만약 같은 내용을 담는(복사한) 파일을 add했을 경우, objects 파일은 새로 추가되지 않는다. 다만 index파일은 같은 내용을 담은 새로운 파일에 대한 정보(파일의 이름)를 가지고 있어야 하므로, index 파일에는 objects와 파일 정보가 추가된다.  
>  
> 이와 관련된 강의는 [여기](https://opentutorials.org/course/2708/15238)를 참고한다.  

### git commit 

```
git commit -m "message"
```
add된 파일들을 "message"를 붙여 commit (add는 저장소에 기록이 남지 않지만, commit을 하면 새로운 버전이 기록된다.)  
  
> **git commit시에 git 내부에서 일어나는 일**  
add를 했을 때 처럼, git commit을 했을 때도 git에는 이를 가르키기 위한 변화가 생긴다.  
이번에도 `objects` 파일이 생성되는데, 이 때의 objects는 *add에서 생성된 것과는 다른 정보*를 담고 있다. commit의 저자 정보`author` `committer`와, add된 파일`blob` 및 디렉토리`tree`의 정보들을 담고 있는 index 파일 링크`tree`(index파일이 아닌 objects 파일 형태로 변경됨), 커밋 시에 남긴 메시지 내용을 담고있다.  
>> 이 때 처음 commit 이후의 commit은 parent 정보도 담고 있는데, 이전의 commit 링크를 가지고 있다.  
이전의 commit 정보를 가지고 있기 때문에 이전 commit과 현재 commit의 다른점(diff)를 확인할 수 있게 되는 것이다.  
> 
> **git add와 git commit을 종합하면?**  
> * git add  
>   - 각 파일의 내용이 담긴 `objects` 파일 생성  
>   - 생성된 `objects` 파일들과 파일의 이름을 연결지은 add file list `index` 변경  
> * git commit  
>   - add된 파일의 리스트의 링크(add때 가지고 있던 index와 내용이 동일한 objects), 저자 정보, 커밋 메시지, 이전 커밋 링크가 담긴 `objects` 파일 생성
> 
> 이와 관련된 강의는 [여기](https://opentutorials.org/course/2708/15240)를 참고한다.  


### git push 

```
git push -u {name} master
```
name 저장소에 추가된 내용을 master에 저장

### git branch

```
git branch {name}
```
저장소에 새로운 branch를 생성

> **git branch**  
여러 사람들이 동시에 다양한 작업을 할 수 있도록 하는 기능.  
>  
> 하나의 범주로 묶인 작업에 대해 기능별, 버그별, 릴리즈별 등으로 독립적인 작업(브런치)를 만들어 서로 개발 사항에 대한 충돌이 일어나지 않도록 할 수 있다.  
브런치를 통해 개발하게 되면 여러 작업을 진행할 때 작업의 흐름을 한눈에 파악할 수 있다는 장점이 있으며, 여러 명이 동시에 작업을 해도 서로의 작업에 영향을 주지 않는다는 장점이 있다.  
이렇게 개발된 각각의 브런치는 작업이 완료되면 다른 브런치와 병합(Merge)할 수 있어, 작업 내용들을 하나로 모아 개발을 완료하게 된다.  

### git checkout

```
git checkout {branch_name}
```
{branch_name}으로 현재 branch 바꾸기

### git merge (to master)

```
git checkout master
git merge {branch_name}
```
master branch에 병합하기 위해 master로 branch 전환  
{branch_name}을 master에 병합  
  
### git Error

* fatal: The current branch {branch_name} has no upstream branch.  
원격저장소에 브런치가 없을 경우 발생하는 에러  
해결) `git push -u origin {branch_name}`,`git push --set-upstream origin {branch_name}`