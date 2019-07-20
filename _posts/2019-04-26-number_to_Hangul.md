---
title:  "숫자를 문자로 바꾸기_JAVA"
date:   2019-04-26 21:30:24 +0900
categories: algorithm
tags: java
classes: wide
---

한 회사의 기출 문제 중 하나이다.  
999를 입력하면 구백구십구, 110은 백십 등으로 숫자를 한글로 읽는 문자로 바꾸는 문제이다.  
  
의외로 생각해야 할 것이 꽤 있었다.  
테스트해본 케이스에서는 답이 다 맞았는데, 정답을 확인할 사이트가 없어서 답이 맞는지는 잘 모르겠다.  
문제가 정확히 어디까지 입력되었는지는 모르겠지만 일단 억단위는 입력되지 않는다고 가정하고 풀었다.  
  
> ### 풀이

원래는 한번에 숫자와 십의 자리 수를 같이 넣어보려고 했는데 잘 안됐다.  
그래서 Stack을 활용해 십의 자리는 미리 계산하고, 숫자를 확인할 때 같이 출력하도록 했다.  
  
Stack에는 출력돼야 할 십의 자리를 넣는다.  
여러 자리 수를 한글로 써보다가 십백천만이 자릿수 만큼 돌아가면서 나와야한다는 것을 알게 되었다.  
그래서 입력 받은 수의 길이만큼 십백천만을 돌아가면서 스택에 넣는다.  
  
예를 들어 123456(십이만삼천사백오십육)는 스택에 아래와 같이 저장되어 출력된다.    

|Stack|같이 출력되는 수|  
|십|1(미출력)|
|만|2(이)|
|천|3(삼)|
|백|4(사)|
|십|5(오)|
| |6(육)|

그리고 숫자 하나를 출력할 때마다, 스택이 빌 때까지 하나씩 십의 자리를 같이 출력해주면 된다.  
  
여기서 주의할 점은 0에 대한 처리와 1에 대한 처리이다.  

- 0은 '0'만 입력되었을 때를 제외하고 출력되지 않아야 한다.
- 1은 1의 자리를 제외하고 출력되지 않아야 한다.  

> ### 코드

```java
import java.util.Scanner;
import java.util.Stack;

public class Main {
	static String[] number = {"영","일","이","삼","사","오","육","칠","팔","구"};
	static String[] ten = {"십","백","천","만"};
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
		String[] num = sc.nextLine().split("");
		String answer = "";
		Stack<String> tenStack = new Stack();
		int nTen = 0;
		
		for(int i = 1; i < num.length; i++) {
			nTen %= 4;
			tenStack.push(ten[nTen]);
			nTen++;
		}
		
		for(int i = 0; i < num.length; i++) {
			int nCurNum = Integer.parseInt(num[i]);
			
			if(nCurNum != 0) {
				if(nCurNum == 1 && i < num.length - 1) {
					//nothing
				}else answer += number[nCurNum];
				if(!(tenStack.isEmpty()))
					answer += tenStack.pop();
			}else {
				if(num.length == 1) answer += number[nCurNum];
				if(!(tenStack.isEmpty()))
					tenStack.pop();
			}
		}
		System.out.println(answer);
	}
}
```