---
title:  "Git 명령어"
date:   2019-02-24 14:12:24 +0900
categories: VCS
tags: git
classes: wide
toc: true
---

## git 명령어

### git init

디렉토리에 git 저장소를 생성

### git clone

```
git clone {url}
```
저장소를 디렉토리에 복사

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

### git checkout

```
git checkout {branch_name}
```
{branch_name}으로 현재 branch 바꾸기

### git Error

* fatal: The current branch {branch_name} has no upstream branch.
원격저장소에 브런치가 없을 경우 발생하는 에러
해결) `git push -u origin {branch_name}`,`git push --set-upstream origin {branch_name}`