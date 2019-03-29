---
title:  "git revert와 reset의 차이"
date:   2019-03-29 20:58:24 +0900
categories: VCS
tags: git
---

오늘 본 git 강의 중에 git revert와 git reset이 있었다.  

옛날에 인턴 하면서 push를 잘못한 기억이 있어서 그 때 기억이 살아나는 아픈 강의..  
맨날 GUI로 commit하다보니 revert하는 법을 몰라서  
주임님께 여쭤보고 한참을 쩔쩔 맨 기억이 있다. ;(  
  
revert로 인해 더러워진 git log를 보면서 눈물을 감추지 못했다..  
팀 git log에 길이길이 남을 나의 흔적 XD.. 암튼,  
reset과 revert는 모두 이전 버전 id로 돌아간다는 특징을 가지고 있다.  

직접 써보면 log에 남냐, 안남냐 차이가 있긴 하지만  
그 차이를 잘 설명해놓은 만화를 발견해서 블로그에 올려본다 :)  

http://www.popit.kr/