---
title:  "마크다운(Markdown) 작성법"
date:   2019-02-24 17:29:24 +0900
categories: markdown
---

# Markdown

> [마크다운(Markdown)](https://ko.wikipedia.org/wiki/%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4)은 일반 텍스트 문서의 양식을 편집하는 문법으로, 흔히 git repo의 README.md 파일을 통해 자주 볼 수 있다. 주로 온라인 문서, 일반 텍스트 편집기로 문서를 편집할 때 사용한다. 마크다운을 이용해 작성된 문서는 쉽게 HTML과 같은 문서 형태로 변환이 가능하다.

## 제목태그
_**Example)**_

<pre># H1 Header 
## H2 Header
### H3 Header 
#### H4 Header
##### H5 Header
###### H6 Header
</pre>

_**Result)**_
# H1 Header 
## H2 Header
### H3 Header 
#### H4 Header
##### H5 Header
###### H6 Header

<br>

## 인용문구

_**Example)**_
<pre>
	> 이것은 인용표시다!
</pre>
위와 같이 입력할 경우 아래와 같이 좌측 바와 들여쓰기가 추가되어 출력된다.

_**Result)**_
> 이것은 인용표시다!

## 순차제목
_**Example)**_

<pre>1. 일
1. 이
1. 삼	
</pre>

_**Result)**_

1. 일
1. 이
1. 삼

_**Example)**_
<pre>* 일
	* 이
		* 삼
- 일
	- 이
		- 삼
+ 일
	+ 이
		+ 삼
</pre>

_**Result)**_

* 일
	* 이
		* 삼
- 일
	- 이
		- 삼
+ 일
	+ 이
		+ 삼

## 코드 블록

_**Example)**_

<pre> ```python
	def print_hi(name):
		print("hello", name)
		print_hi('Tom')
```</pre>

<pre> ```java
	public static void main(String[] args){
		System.out.println("hello");
	}
```</pre>

_**Result)**_

```python
	def print_hi(name):
		print("hello", name)
		print_hi('Tom')
```

```java
	public static void main(String[] args){
		System.out.println("hello");
	}
```

_**이외 가능 언어**_
> `bash(bash)` `C#(cs)` `C++(cpp)` `Diff(diff)` `HTML, XML(html)` `HTTP(http)` `Ini(ini)` `JSON(json)` `Java(java)` `JavaScript(javascript)` `PHP(php)` `Perl(perl)` `Ruby(ruby)` `SQL(sql)`


## 글꼴 모양 변경

#### 글꼴 굵게 **(Bold)**

_**Example)**_

<pre>**굵게** 변한 글씨</pre>

_**Result)**_

**굵게** 변한 글씨

#### 글꼴 기울이기 _(Italic)_

_**Example)**_

<pre>_기울이게_ 변한 글씨</pre>

_**Result)**_

_기울이게_ 변한 글씨

#### 글꼴 취소선 

_**Example)**_

<pre>~~취소선~~ 글씨</pre>

_**Result)**_

~~취소선~~ 글씨

## 링크 넣기

_**Example)**_

<pre>[2ssue 깃 블로그](https://2ssue.github.io)</pre>

_**Result)**_

[2ssue 깃 블로그](https://2ssue.github.io)

## 이미지 넣기

_**Example)**_

<pre>![facebook 이미지](https://image.freepik.com/free-vector/card-christmas-hat-ribbon_1057-2801.jpg)</pre>

_**Result)**_

![facebook 이미지](https://image.freepik.com/free-vector/card-christmas-hat-ribbon_1057-2801.jpg)

## 줄바꿈

그냥 엔터를 치면 줄바꿈이 되지 않는다.   
따라서 **HTML의 `<br>` 태그를** 사용하거나, 엔터를 입력할 자리에 **스페이스 바를 두번 입력하면** 줄바꿈이 된다.

## 수평선

언더바를 세번 입력 `___` 하면 아래와 같은 수평선이 생긴다.
___