---
title: "HikariCP를 MySQL에 맞게 튜닝하기"
date: 2020-04-02 00:19:24 +0900
categories: Programming
tags: database mysql
---

Spring Boot로 프로젝트를 하다가 MySQL의 성능을 향상시켜야하는 일이 있었다. 어떤 데이터를 로딩 할 때 DB의 연결이 모자라 가끔 연결을 대기하는 상황이 있었는데, 연결이 항상 모자란건 아니라서 무작정 Connection 수를 늘려주는 것 보다는 다른 옵션을 튜닝해서 개선해보고 싶었다.

그래서 Spring Boot의 default DBCP가 된 HikariCP에 대해서 알아봤는데, [거기서 MySQL에 권장하는 성능 옵션이 있다](https://github.com/brettwooldridge/HikariCP/wiki/MySQL-Configuration)는 것을 알게 되었다. 이 옵션을 공부하면서 한글로 된 자료도 너무 없고, MySQL Document에도 의문문으로 설명하고 있어서 이해가 가지 않아 힘들었던 기억이 있다.. 나중을 위해 다시 기억하는 겸, 다른 분들은 나와 같은 고통을 겪지 않았으면 하는 바램으로 정리해보았다. 

## HikariCP의 MySQL 전용 권장 옵션

`application.yml` 파일에 아래와 같이 작성하면 적용되는 옵션이다. 

```yaml
dataSource:
  hikari: 
    cachePrepStmts: true           
    prepStmtCacheSize: 250        
    prepStmtCacheSqlLimit: 2048      
    useServerPrepStmts: true    
    useLocalSessionState: true   
    rewriteBatchedStatements: true
    cacheResultSetMetadata: true  
    cacheServerConfiguration: true
    elideSetAutoCommits: true
    maintainTimeStats: false
```

### 1. 데이터 캐싱과 관련된 옵션
#### cachePrepStmts (cachePreparedStatements)
`default: false`, `recommend: true`  

MySQL은 PreparedStatement Caching을 비활성화하고 있기 때문에, 이 옵션을 허용해줘야 아래의 옵션값들이 실제 DB에 영향을 줄 수 있다.
#### prepStmtCacheSize (preparedStatementsCacheSize)
`default: 25`, `recommend: 250 ~ 500`  

MySQL 드라이버가 Connection마다 캐싱할 PreparedStatement의 개수를 지정하는 옵션이다. HikariCP에서는 250 ~ 500개 정도를 추천한다.

#### prepStmtCacheSqlLimit (preparedStatementsCacheSqlLimit)
`default: 256`, `recommend: 2048`  

MySQL 드라이버가 캐싱할 PreparedStatement의 최대 길이를 지정하는 옵션이다. HikariCP 개발자들의 경험상, Hibernate와 같은 ORM framework를 사용하는 경우에 특히 이 기본값이 턱없이 모자란다고 한다. 

#### useServerPrepStmts (useServerSidePreparedStatements)
`default: false`, `recommend: true`  

Server-Side PreparedStatement를 사용하는 옵션이다. Server-Side PreparedStatement를 사용해 preparedStatement를 캐싱할 경우, 꽤 큰 성능 향상을 기대할 수 있다. 

이 부분이 특히 잘 이해가 안갔는데, 내가 알던 PreparedStatement는 단순히 SQL문에 가변적인 변수를 넣을 수 있게 만든 구문이었기 때문이다. Client 단에서만 보면 맞지만, DB의 내부적인 동작은 좀 더 복잡하다.  <br><br>
MySQL은 4.1 버전 이하에서 완전한 PreparedStatement를 지원하지 않았고, JDBC Driver를 통해 Client-Side PreparedStatement만 지원했었다고 한다.  <br><br>
원래 PreparedStatement를 사용하는 경우 DB Server에서는 SQL 구문 분석(parse)과 실행 계획을 세우는 등의 일을 한번만 수행하고, 그 이후부터는 이 작업이 캐싱되어 데이터를 불러오는 작업만 수행된다. 따라서 PreparedStatement를 사용할 경우 데이터를 가져오기 위한 별도의 분석 작업을 줄일 수 있어 성능이 좋아질 수 있는 것이다.  <br><br>
하지만 MySQL 이전 버전에서는 이 작업이 지원되지 않았고, Client 측면에서만 PreparedStatement가 지원되어 `SELECT id FROM user WHERE name=?`와 같은 구문에 대한 사용은 가능했지만 실제로 구문 분석 내용이 캐싱 되어 동작이 빨라지거나 하는 이점은 없었다.<br><br>
참고: [What's the difference between cachePrepStmts and useServerPrepStmts in MySQL JDBC Driver?](https://stackoverflow.com/questions/32286518/whats-the-difference-between-cacheprepstmts-and-useserverprepstmts-in-mysql-jdb)
{: .notice--info}

### 2. 불필요한(잦은) 작업을 줄이는 옵션
#### useLocalSessionState
`default: false`, `recommend: true`  

불필요한 autocommit을 남기지 않도록 하는 옵션이다. 

정확히 어떤 일을 하는 옵션인지는 잘 모르겠는데, 이 옵션에 대해 검색해보면 여러 사람들이 _남지 않아도 되는 commit이 남는데.._ 할 때 활성화하고있는 옵션이다. 

> MySQL Document에는 아래와 같이 설명하고 있다.  
_Should the driver refer to the internal values of autocommit and transaction isolation that are set by Connection.setAutoCommit() and Connection.setTransactionIsolation() and transaction state as maintained by the protocol, rather than querying the database or blindly sending commands to the database for commit() or rollback() method calls?_

#### cacheResultSetMetadata
`default: false`, `recommend: true`  

ResultSetMetadata를 캐싱하는 옵션이다. Statement들을 실행한 이후에, 이 데이터에 대한 정보를 갖고 있는 데이터를 ResultSetMetadata라고 한다. 이 데이터를 통해서 더 많은 정보들을 가져올 수 있는데, [여기](https://www.javatpoint.com/ResultSetMetaData-interface)를 참고하면 SQL을 실행하고 나서 영향을 받은 row의 수 등을 가지고 있는 객체를 의미하는 것으로 보인다.

#### cacheServerConfiguration
`default: false`, `recommend: true`

SHOW COLLATION, SHOW VARIABLES 명령으로 메모리에 임시 테이블을 조작하는 작업을 JDBC URL 단위로 가져가도록 하는 옵션이다. false로 설정할 경우(기본값), JDBC의 Connection이 만들어질 때마다 해당 명령이 실행된다. 

SHOW VARIABLES 명령어는 DB에 설정된 변수 값을 확인하는 명령어인데, 이러한 명령어를 실행하면 DB는 이를 보여주기 위해 임시적으로 테이블을 만들게 된다. DB의 설정값은 자주 변경되는 값이 아니기 때문에 Connection 마다 새로 갱신할 필요가 없어서 이 옵션을 허용해 메모리 작업을 줄이고, 메모리의 공간도 늘리는 것으로 보인다. 

#### elideSetAutoCommits
`default: false`, `recommend: true`

`setAutoCommit()`으로 설정된 값과 MySQL 서버의 autocommit 값이 다를 때만 SET autocommit 명령을 전송하게 하는 옵션이다. 

이 옵션 또한 위와 같이 불필요한 경우가 많아서 특수한 경우에만 작업을 하도록 변경하는 옵션이다. 

#### maintainTimeStats
`default: true`, `recommend: false`

`getCurrentTimeMillis()`가 여러 번 호출되지 않게 되는 옵션이다. 연결 실패 시 유휴시간을 계산하고, 더 자세한 메세지를 위해 내부 타이머가 유지되어야할 경우 사용한다고 한다. 

아마도 내부적으로 타이머를 계산하고 있는 특수한 상황에서 현재 시간을 계산할 필요가 없기 때문에 그러한 상황에서 저 함수가 호출되지 않도록 해서 불필요한 작업을 줄이는 옵션인 것 같다. [이 옵션을 알아보면서 여러 글을 보니, 생각보다 시간을 체크하는 함수가 오버헤드가 큰 것 같다.](https://stackoverflow.com/questions/48811036/performance-overhead-from-system-getcurrenttimemillis)

> MySQL Document에는 아래와 같이 설명하고 있다.  
_Should the driver maintain various internal timers to enable idle time calculations as well as more verbose error messages when the connection to the server fails? Setting this property to false removes at least two calls to System.getCurrentTimeMillis() per query._

### 3. 기타 옵션
#### rewriteBatchedStatements
`default: false`, `recommend: true`

대량의 데이터를 insert할 경우(batch insert) 성능 향상을 시킬 수 있는 옵션이다. 

> MySQL Document에는 아래와 같이 설명하고 있다.  
_Should the driver use multiqueries (irregardless of the setting of "allowMultiQueries") as well as rewriting of prepared statements for INSERT into multi-value inserts when executeBatch() is called? Notice that this has the potential for SQL injection if using plain java.sql.Statements and your code doesn't sanitize input correctly. Notice that for prepared statements, server-side prepared statements can not currently take advantage of this rewrite option, and that if you don't specify stream lengths when using PreparedStatement.set*Stream(), the driver won't be able to determine the optimum number of parameters per batch and you might receive an error from the driver that the resultant packet is too large. Statement.getGeneratedKeys() for these rewritten statements only works when the entire batch includes INSERT statements. Please be aware using rewriteBatchedStatements=true with INSERT .. ON DUPLICATE KEY UPDATE that for rewritten statement server returns only one value as sum of all affected (or found) rows in batch and it isn't possible to map it correctly to initial statements; in this case driver returns 0 as a result of each batch statement if total count was 0, and the Statement.SUCCESS_NO_INFO as a result of each batch statement if total count was > 0._

___

이 옵션들을 적용하고 나서 확실히 이전보다 안정적으로 데이터를 가져오는 모습을 볼 수 있었고 연결도 모자라지 않게 되는 것을 볼 수 있었다. 😳

하지만 이 설정은 단순히 불필요한(반복적인) 작업을 최대한 줄여서 SQL 실행만 하도록 하는 옵션들이기 때문에 SQL문 실행이 오래 걸리게 되면 ~~당연히~~ 큰 도움이 되지 못한다. 그런 경우에는 추가적인 튜닝(이 땐 DBCP보다는 쿼리와 테이블에 대한 튜닝..😵)이 필요하다. 