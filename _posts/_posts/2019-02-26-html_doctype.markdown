---
title:  "HTML 문서의 기본 구조"
date:   2019-02-26 00:11:24 +0900
categories: Web
tags: HTML
toc: true
---

```html
<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>HTML</title>
	</head>
	<body>
		<h1>Hello, HTML</h1>
	<body>
</html>
```

## Doctype define

> <!DOCTYPE html>

문서 타입 정의는 보통 DTD(DocType)라고 부른다.
문서가 어떤 버전으로 작성되었는지 브라우저에게 알려주는 선언문으로, 반드시 최상단에 있어야 한다.

## HTML elements

```
<html lang="ko">
```

문서 타입 선언 후에 나오는 html 시작 태그이다. 자식 태그로는 `<head>`와 `<body>`태그가 있다. 
lang 속성은 문서가 어느 언어로 작성되었는지를 뜻한다.

```
<head>
```

화면에 표시되지 않는 부분이다. 문서의 기본 설정 정보나 외부 스타일 시트 파일, js 파일을 연결하는 역할을 한다.

```
<meta charset="UTF-8">
```

charset 속성은 문자의 인코딩 방식을 지정한다.

```
<body> </body>
```

실제 브라우저 화면에 나타나는 내용 부분에 해당한다.