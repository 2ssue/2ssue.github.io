---
title:  "마크다운(Markdown) 작성법"
date:   2019-02-24 17:29:24 +0900
categories: markdown
tags: basic
classes: wide
---  
<br>
<br>

# Markdown

> [마크다운(Markdown)](https://ko.wikipedia.org/wiki/%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4)은 일반 텍스트 문서의 양식을 편집하는 문법으로, 흔히 git repo의 README.md 파일을 통해 자주 볼 수 있다. 주로 온라인 문서, 일반 텍스트 편집기로 문서를 편집할 때 사용한다. 마크다운을 이용해 작성된 문서는 쉽게 HTML과 같은 문서 형태로 변환이 가능하다.

## 제목(Header)

```
# H1 Header 
### H3 Header 
##### H5 Header
```

# H1 Header 
### H3 Header 
##### H5 Header

<br>

## 인용문구

```
> 이것은 인용표시다!
>> 이것은 이중인용이다!
```
위와 같이 입력할 경우 아래와 같이 좌측 바와 들여쓰기가 추가되어 출력된다.

> 이것은 인용표시다!
>> 이것은 이중 인용이다!

## 리스트

### 순서가 있는 리스트

```
1. 일
1. 이
1. 삼	
```

1. 일
1. 이
1. 삼

### 순서가 없는 리스트

```
* first
	* second
		* third

- first
	- second
		- third
```

* first
	* second
		* third

- first
	- second
		- third

## 코드 블록

<pre><code>```python {code...} ```</code></pre>
위와 같은 형태로 입력하면 아래와 같은 코드 블록을 만들 수 있다.

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


## 글꼴 강조

#### 글꼴 굵게 **(Bold)**

```
**굵게** 변한 글씨
```

**굵게** 변한 글씨

#### 글꼴 기울이기 _(Italic)_

```
_기울이게_ 변한 글씨
```

_기울이게_ 변한 글씨

#### 글꼴 취소선 

```
~~취소선~~글씨
```

~~취소선~~ 글씨

## 링크 넣기

```
[2ssue 깃 블로그](https://2ssue.github.io)
```

[2ssue 깃 블로그](https://2ssue.github.io)

## 이미지 넣기

```
![facebook 이미지](https://image.freepik.com/free-vector/card-christmas-hat-ribbon_1057-2801.jpg){: .align-center}
```

![facebook 이미지](https://image.freepik.com/free-vector/card-christmas-hat-ribbon_1057-2801.jpg){: .align-center}

## 줄바꿈

그냥 엔터를 치면 줄바꿈이 되지 않는다.   
따라서 **HTML의 `<br>` 태그를** 사용하거나, 엔터를 입력할 자리에 **스페이스 바를 두번 입력하면** 줄바꿈이 된다.

## 수평선

언더바를 세번 입력 `___` 하면 아래와 같은 수평선이 생긴다.

___

## 정렬

### 글자 정렬

```
왼쪽 정렬
{: .text-left}
```
왼쪽 정렬
{: .text-left}

```
가운데 정렬
{: .text-center}
```
가운데 정렬
{: .text-center}

```
오른쪽 정렬
{: .text-right}
```
오른쪽 정렬
{: .text-right}

### 이미지 정렬

이미지 정렬도 글자 정렬과 비슷하다. 이미지 링크 옆에 아래와 같이 작성한다.

```
왼쪽 정렬{: .align-left}
가운데 정렬{: .align-center}
오른쪽 정렬{: .align-right}
좌우로 꽉차게
{: .full}
```

## 참고 

추가로 필요한 정보는 [여기](https://mmistakes.github.io/minimal-mistakes/docs/utility-classes/)를 참고하면 된다.