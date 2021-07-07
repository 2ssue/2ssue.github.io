---
title:  "[백준] 숨바꼭질 JAVA"
date:   2019-04-11 00:25:24 +0900
categories: Algorithm
tags: baekjoon java
classes: wide
---

[백준_숨바꼭질 문제](https://www.acmicpc.net/problem/1697)  
[풀이 코드](https://github.com/2ssue/Algorithm/blob/master/Baekjoon/1697.java)  

지난번 백준님이 학교에 왔을 때 강의하셨던 문제다.  
그 땐 너무 빨리 설명하셔서 무슨 소린지 몰랐는데, 강의를 다시 듣고 이해했다.  
  
BFS 개념은 쉽지 않다.  
시간 초과도 미리 계산해봐야하고, 생각해내는 데 시간이 꽤 걸려서 연습이 많이 필요할 것 같다.  
  
> ### 풀이

수빈이가 동생을 만날 때까지의 최소 이동 시간을 구하는 것이므로, 이렇게 최소 이동 시간을 구할 때는 BFS로 모든 경로를 시도해봐야 한다.  
  
그래서 현재 위치가 동생과 같아질 때 까지 계속해서 이동하면서 `X-1`, `X+1`, `2X`의 위치에 몇 초에 도착했는지 저장한다.  
도착했던 시간을 저장함으로서 동생과 만나게 됐을 때 몇 초에 만났던 것인지 확인이 가능해진다.  
여기서 한 번 도착했었던 위치는 저장하지 않는데, 이는 최소 시간을 구하는 것이기 때문에 다음 도착 시간을 저장해봐야 의미가 없기 때문이다.  

> ### 구현 절차

1. 수빈이의 현재 위치를 `Queue`에 `push`한다.
2. 수빈이의 현재 위치를 `now`에 저장한다.
3. `visted[]`배열 `now`번째에 현재 위치를 방문했음을 저장한다.
4. `dist[]`배열에 0초에 현재 위치에 있었음을 저장한다. 
5. 현재 위치를 `Queue`에서 `pop`한다. 
6. 현재 위치의 다음 위치가 될 `now-1`, `now+1`, `2*now`위치에 방문했는지 확인한다.
7. 방문하지 않았다면 `Queue`에 해당 위치를 `push`하고  
`visted[]`배열에 방문 여부를, `dist[]`배열에 몇 초에 방문했는 지를 저장한다.  
이 때 몇 초에 방문했는 지는 이전 위치의 `dist[]`값에서 `+1초`한 값이다.
8. 5 ~ 8번을 현재 위치가 동생의 위치와 같아질 때까지 반복한다.
9. 동생의 위치와 수빈이의 위치가 같아지면 현재 위치의 `dist[]`배열 값을 출력한다. 

```java
import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;

public class Main {
	static int MAX_VALUE = 100000;
	
	public static void main(String[] args){
		Scanner sc = new Scanner(System.in);
		
		int nSubin = sc.nextInt(); 
		int nBrother = sc.nextInt();
		
		//해당 위치(index)에 도착했는지 확인하는 배열
		boolean[] visited = new boolean[MAX_VALUE + 1];
		//해당 위치(index)에 몇 초에 도착했는지 저장하는 배열
		int[] dist = new int[MAX_VALUE + 1];
		//현재 위치 저장 변수
		int now = 0;
		
        //방문한 위치를 저장하는 큐
		Queue<Integer> que = new LinkedList();
		
		que.offer(nSubin);
		
		now = que.peek();
		visited[now] = true;
		dist[now] = 0;
		
		while(!(que.isEmpty())) {
			now = que.poll();
			
			if (now == nBrother) {
				que.clear();
				System.out.println(dist[now]);
			}
			
			if(now > 0 && visited[now-1]==false) {
				que.offer(now-1);
				visited[now-1] = true;
				dist[now-1] = dist[now] + 1;
			}
			if(now < MAX_VALUE && visited[now+1]==false) {
				que.offer(now+1);
				visited[now+1] = true;
				dist[now+1] = dist[now] + 1;
			}
			if(2*now <= MAX_VALUE && visited[2*now]==false) {
				que.offer(2*now);
				visited[2*now] = true;
				dist[2*now] = dist[now] + 1;
			}
		}
    }
}
```