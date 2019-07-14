---
title:  "[Sublime Text3] Markdown plugin 설치 시 Error"
date:   2019-07-14 22:37:24 +0900
categories: Error
tags: editor
toc: true
last_modified_at: 2019-07-14 22:37:24 +0900
---

`Error loading syntax file "Packages/Markdown/Markdown.sublime-syntax": Unable to read Packages/Markdown/Markdown/Markdown.sublime-syntax`  
  
태블릿, 데스크탑에 Sublime-Markdown을 설치하면서 계속 마주했던 에러인데 매번 검색하고 이거였지! 하고 바꿔서 이번엔 정리해두려고 한다.  
  
왜 이런 것인지는 모르겠는데, 마크다운 패키지를 설치하면 ignored_package에 마크다운이 들어가있다. 따라서 이 부분을 지워주면 된다.  
  
`Preferences`-`Settings`를 들어가면 `Preferences.sublime-settings`에서 Markdown을 지워주면 정상 동작 한다.  
  
```
{
	"ignored_packages":
	[
		"Markdown" //이 부분을 지운다.
	]
}
```