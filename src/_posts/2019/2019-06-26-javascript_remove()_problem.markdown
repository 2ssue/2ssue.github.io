---
title: "자바스크립트 childNode[n].remove()시 데이터가 남는 문제"
date:   2019-06-26 10:24:24 +0900
categories: Programming
tags: web javascript error
classes: wide
---

드디어 부스트코스 두번째 프로젝트 코드리뷰를 받았다.  
  
대부분의 문제를 이해하고, 해결할 수 있었는데 이해할 수 없었던 문제가 하나 있었다.  
  
![TodoList](/assets/images/todoList.png)  
  
이 페이지에서 doing 컬럼의 일을 done으로 옮기면, 버튼이 사라지는 스크립트를 작성해야 했다.  
그 부분을 나는 `cell.childNode[buttonIdx].remove()`로 구현했는데, 코드리뷰 후 데이터가 남는다는 것을 알게 되었다.  
  
> ### 어디에 데이터가 남는다는거지? 

육안상으로는 전혀 문제가 없었다.  
  
개발자 도구의 Properties를 확인해봐도 어떤 데이터가 남는다는 건지 알아보기 힘들었다.  
그래서 댓글로 문의를 남기려다가 혹시나 해서 콘솔로 innerHTML을 확인해봤는데, 문제점을 찾을 수 있었다.  
  
![innerHTML](/assets/images/todoList_innerHTML.png)  
  
`프로젝트 완성하기`는 최초에 페이지가 열렸을 때 HTML 소스를 통해 출력된 cell이다.  
그리고 `테스트2`는 script를 통해 `<button>` 태그가 없어지고 다시 출력된 cell이다.  
  
`테스트2`에는 아래에 공백이 하나 더 남아있는 것을 확인할 수 있다.  
그냥 보기에는 문제가 없어보이지만, 이러한 공백이 많아지면 문제가 생기게 되기 때문에 이를 해결해 주는 것이 좋다.  

```html
<section class="cell" id="cell#">
	<h3>title</h3>
	<span>regdate, name, sequence</span>
	<button>></button>
</section>
```
  
위 소스에서 `<button>` 태그만 없어지고, 그 자리에 있던 개행문자는 사라지지 않아서 발생하는 문제이다.  
javascript로 이 `<section>`의 childNode들을 조회해보면 `<h3>`, `<span>`, `<button>` 세개가 있을 것 같지만 그렇지 않다.  
예상과는 다르게 각각의 태그 사이에 `<text>` 노드가 들어가있다. 아마 코드 가독성을 위해 `Enter`를 입력한 부분이 `<text>`로 들어가는 것 같다.  
그러니까 실제론 보이지 않지만, 위 코드는 아래 코드와 같은 상태를 띄어서 `<button>`을 삭제해도 그 뒤의 `<text>`가 남는 것이다. 

```html
<section class="cell" id="cell#"><text>
	<h3>title</h3><text>
	<span>regdate, name, sequence</span><text>
	<button>></button><text>
</section><text>
```
  
리뷰어님의 조언으로는 상위 parent를 지우면 어떠냐고 하셨는데 위 코드에서 button의 상위 parent는 section이다.  
이를 지우게 되면 이 cell을 옮기는 것이 아니라 새로 출력을 해야할 것 같아서, 뭔가 낭비라고 판단되었다.  
  
그래서 일단은 `cell.lastChild.remove();`를 통해 마지막 `<text>`를 삭제하고, `<button>`에 대한 remove를 진행했다.  
약간 야매로 한 것 같은 느낌이 있긴 하지만 이 문제를 겪은 사람들이 없는지 검색해도 찾기 쉽지 않았다..  
  
앞으로 더 공부를 하면서 좋은 방법을 찾을 수 있었으면 좋겠다 ;P  