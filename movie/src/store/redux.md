# redux
- 전역상태 관리

설치
```
$ yarn add react-redux
$ yarn add redux
```

redux 는 프로그래밍에서 redux 를 사용하기 위해 설치하는 라이브러리이며,
react-redux 는 리액트에서 redux 를 사용하기 위한 또 다른 라이브러리 이다.

### 전역 상태 관리 라이브러리
리액트는 변경되는 값들을 보통 useState 로 지정해서 관리를 한다.  
보통 관리해야 할 상태값이 적은 경우 state 로 관리할 수 있지만, 단 컴포넌트 끼리 공유할 상태값이  
서로 달라서 엉키게 되면 state 는 한계점이 명확해 진다.  
props 로 상태값을 관리하면 가독성이 떨어지며, 유지보수에 어려움이 있다.  

이러한 state 의 단점을 보완해서 하나의 공간에 데이터들을 다 모아두고 전역으로 상태를 관리하는 라이브러리  
redux 는 store 라는 상태 저장소를 사용하며, 이 store 에서 관리되는 상태값들은 일반적으로  
꺼내오거나 변경은 불가능. (상태값의 안전성)  
store 에서는 JavaScript 의 객체 형태로 저장된다.  

### redux 에서의 진행 방식
action -> dispatch -> reducer -> store 순으로 데이터가 진행이 된다.

- action : 상태를 변경하려는 객체
- dispatch : store 에서 action 에 전달하기 위해서 제공하는 하나의 방법
변경될 내용이 전달되면 reducer 가 코드를 처리하고 업데이트 한다.

* [redux 활용 참조](./index.jsx)