---
title:  "Git 명령어 및 Git 기능 설명"
date:   2019-02-24 14:12:24 +0900
categories: VCS
tags: git
toc: true
last_modified_at: 2019-07-14 22:37:24 +0900
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

### git commit 

```
git commit -m "message"
```
add된 파일들을 "message"를 붙여 commit

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