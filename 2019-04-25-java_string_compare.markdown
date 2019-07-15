---
title: "[Java] 문자열 비교 함수"
date:   2019-04-25 01:08:24 +0900
categories: Programming_Knowledge
tags: java
classes: wide
---

알고리즘을 풀다가 문자열을 비교하는 함수에는 equals외에 여러가지가 있다는 것을 알게 되었다.  
이번 기회에 문자열을 비교하는 함수를 기록해 놓으려한다.  
  
|메서드|설명|
|boolean equals(Object obj)|매개변수로 받은 문자열과 String 인스턴스 문자열을 비교한다. obj가 String이 아니거나 문자열이 다르면 `false`를 반환한다.|
|boolean equalsIgnoreCase(String str)|문자열과 String 인스턴스 문자열을 대소문자 구분없이 비교한다.|
|int compareTo(String str)|문자열을 사전순으로 비교한다. 같으면 0, 사전 순으로 앞이면 음수, 사전 순으로 뒤면 양수를 반환한다.|
|int compareToIgnoreCase(String str)|대소문자 구분없이 문자열을 사전순으로 비교한다.|
|boolean StartWith(String prefix)|문자열이 prefix문자열로 시작하는지 확인해 `true/false`를 반환한다.|
boolean endWith(String suffix)|문자열이 suffix문자열로 끝나는지 확인해 `true/false`를 반환한다.|