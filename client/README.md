# Simple React
  ### 2021-01-25
  Redux를 위한 폴더
  _action
  _reducer

  Routing 관련일을 처리하는 곳
  App.js

  환경변수를 설정하는 곳
  config.js

  하이어오더컴포넌트를 설정하는곳
  hoc
  
  #### axios downlaod
  했던거지만 복습한다 셈치고 공부공부
  npm install axios --save

  #### CORS 이슈
  server가 포트가 5000이고 클라이언트가 3000일때 따로 설정해주지 않으면 코스 정책에 의해 막힘(보안이슈)
  Cross Oring Resourece Sharing(CORS)
  해결하는 방법은 여러가지가 있다.
  1. 개발자 도구만 이용할수도 있고,
  2. JSONP를 사용해서 모든 리퀘스트를 get으로 바꿀수 있지만 제한적임
  3. 모든 요소를 컨트롤 할 상황이 된다면 서버에서 클라 정보를 받았을 때 부분 허용하는 것으로 가는 법
  4. Proxy를 사용할수도 있다.
  https://create-react-app.dev/docs/proxying-api-requests-in-development
  1. 모듈 다운 

    npm install http-proxy-middleware --save

  2. src에 setupProxy.js 파일을 만들어서 규칙을 저장함
  #### Proxy server 사용이유
  1. 회사에서 내부 컴퓨터 인터넷 사용 제어
  2. 캐쉬를 이용해 더 빠른 인터넷 이용 제공
  3. 더 나은 보안 제공
  4. 이용 제한된 사이트 접근 가능
  ## CSS FrameWork 사용할거임
  1. Material UI
  2. React Bootstrap
  3. Semantic UI
  4. Ant Design (양이 방대함) - 이거 쓸거임(https://ant.design/)

    npm install antd

  5. Materialize

  ## Redux
  ### 상태 관리 라이브러리
  #### Props(Properties)
  1. 컴포넌트단에서 주고 받을때 사용
  2. 위에서 아래로 내려가는 데이터
  3. 변하지 않는 데이터(Immutable)
  4. 탑다운 방식의 데이터 흐름

  #### State
  1. 같은 컴포넌트 내에서 데이터를 조작 할때 사용 (mutable)
  2. 컴포넌트 내에서 state가 바뀌면 re-render 됨

  리덕스가 있으면 한개의 store에서 데이터를 주고 받을 수 있음(복잡성이 줄어듬)

  액션->리듀서->스토어->React Component -> 액선-> 리듀서....
  한 방향으로만 흐르는게 redux 데이터 플로우

  #### Action
  각 객체에 무슨일이 일어났는지 설명하는 객체 모음(type, payload) type은 무슨일이 일어났는지 사건 명, payload는 대상 객체
  #### Readucer

    (previousState,action) => nextState

  Action을 통해서 previousState가 nextState로 변했다는 것을 설명하는 것
  이전 State과 action object를 받은 후에  next state을 return 한다
  #### store
  전체적인 어플리케이션의 State를 감싸주는 역할
  ## Redux setting
    
    npm install redux react-redux redux-promise redux-thunk --save

  Redux Store 안에서 State를 관리
  dispatch를 이용해서 Action 관리

  ### redux-thunk
  dispatch 한테 어떻게 function을 쓰는 지 알려줌
  ### redux-promise
  dispatch 한테 어떻게 promise를 처리해야 하는지 알려줌

  결국 redux를 잘 사용하기 위한 라이브러리임

  ### combineReducers in _reducers
  여러가지 reducer를 묶어서 하나로 합쳐서 컨트롤 하기 위함

  ## REACT COMPONENT
  ### Class Component
  1. 더 많은 기능들 사용
  2. 코드 길어짐, 복잡해짐, 성능이 상대적으로 저하
  3. 생명주기 함수를 사용가능 함
  ### functional Component
  1. 제한된 기능 사용
  2. 코드 짧음, 간단함, 성능이 상대적으로 좋음
  3. 생명주기를 사용하기에는 제한적이었으나 HOOK이 나오면서 함수형 컴포넌트에서도 사용가능해짐