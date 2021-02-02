# Youtube-Clone BoilerPlate

  https://github.com/jaewonhimnae/boilerplate-mern-stack

위 주소를 참고하여 내가 만든 보일러플레이트를 수정함  
token코드가 내가 만든건 x_auth였으나 참고된 파일은 w_auth 였음.  해당 부분 수정함
### Video Upload
  #### 동영상 드랍존 라이브러리 설치

    npm install react-dropzone --save

  위치는 client 패키지에 설치하고 VideoUploadPage 에서 구현  
  아래는 파일 업로드할때 쓰는 라이브러리 MULTER

    npm install multer --save

  위치는 server 디렉토리에 저장
  onDrop =>
  api를 보내게 되면 server의 index.js 로 갔다가  
  37번째 줄의 path 설정에 따라 Video.js로  이동함

  uploads 라는 폴더를 루트 폴더에 추가해줘야함.  
  해당 경로에 관한 설정은 server의 routes 의 video.js에 적어둠

  #### 동영상 썸네일 만들어주는 라이브러리 설치
  npm 라이브러리를 설치하기 전에 ffmpeg 드라이버가 설치되어야함

    https://kyoko0825.tistory.com/entry/%EC%9C%88%EB%8F%84%EC%9A%B0-10%EC%97%90%EC%84%9C-ffmpeg-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

  보고 따라 했음. 환경변수 설정이기 때문에 컴퓨터 껏다 켜야함
  
    npm install fluent-ffmpeg

  1. 썸네일도 서버에 저장
  2. 파일경로를 클라로 보내서 이미지를 동영상 옆에 표출
  ![제목 없음](https://user-images.githubusercontent.com/45280952/105975244-15cbab80-60d2-11eb-8599-569ed8733e37.png)

  ### MONGO DB
  1. Table == Collection
  2. row == Document
  3. Column == Field

  #### useSelector from react-redux
  1. 스토어에 있는 정보 가져옴 ( 로그인 한 유저 정보)

    const user = useSelector(state=>state.user); 

  State에 user 라는 이름으로 등록된 store 객체를 가져온다는 뜻(VideoUPloadPage.js 참조)

  ### LandingPage.js settings
  1. 한줄에 4개의 동영상 개시
  2. 한줄은 ant Design 상으로 사이즈가 24 이다.
  3. 화면 사이즈에 맞게 유동적으로 움직이도록 xs=24(가장작은사이즈의 화면) 라고 볼때 lg={6} 으로 하게 되면 각 칼럼이 6사이즈가 되어 24사이즈의 화면에 4개씩 들어가게 된다.
  4. md=8은 중간사이즈가 되었을때 3개가 나오도록 한다. 화면이 가작 작아지는 경우는 24로 맞추어 한줄에 한개만 나오도록 한다.

  #### get video List
  1. 모델객체.find() ==> 목록 가져옴
  2. populate("some Id")  ==>이걸 해주지 않으면 writer라는 field의 값만 가져온다. populate를 해줘야 이와 연동된 User 정보까지 불러올수 있다.

    router.get('/getVideos',(req,res)=>{
    
      //Video 컬렉션 안에 있는 모든 비디오를 가져옴
      Video.find()
      .populate('writer') 
      .exec((err,videos)=>{
          if(err) return res.status(400).send(err);
          res.status(200).json({success:true,videos})
      })
    })

  duration css는 index.css에 설정해둠
  ![LandingPage_video_List](https://user-images.githubusercontent.com/45280952/106086984-74db0000-6166-11eb-9e47-a476d33893be.png)

  ### Video Detail Page

    <Route exact path="/video/:videoId" component={Auth(VideoDetailPage, null)} />

  각 상세 페이지에는 독립적인 아이디가 들어가야 실행되어야 하므로 path를 저렇게 지정
  auth에서 option이 null 인 경우 튕겨버리는 부분 === false로 교체  
  상세 페이지 에서 props.match.params.videoId  
  이렇게 하면 주소에 쓰인 비디오 아이디를 가져올 수 있음

  게시자 writer 정보가 없으면 화면이 튕기게 되어버려서 아이디 정보를 불러오기 까지 ...Loading 화면이 나오도록 수정함

  ### Detail Side menu
  메뉴섹션을 따로 만듬 ...../views/VideoDetailPage/Section/SideVideo  
  LandingPage에서 쓴 api를 복사해서 씀.

  ### 구독(Subscribe) 모델 만들기
  1. 모델 만들기 
    - 누구에게 하는지 (UserTo)
    - 누구로부터 하는지 (UserFrom)
  2. 구독을 누를때 해당 업로더를 구독하는 사람 숫자 불러오기
  3. 내가 이 비디오를 업로드한 유저를 구독하는지 가져오기

  - 컴포넌트를 만들어서 적용

      <List.Item 
          actions={[<Subscribe/>]}
    >

  List.Item으로 들어가는 컴포넌트들을 배열로 감싸줘야 진행됨
  - 구독자 모델을 만듬 in server Subscriber.js
  - 구독자 라우트를 만듬 in server subscribe.js
  - 새로운 라우트를 만들때는 server의 index.js를 항상 확인하여 경로가 유효한지 체크해야함
  - 구독자 숫자를 가지고 올때 매개변수로 들어간 userTo에 조건에 맞는 subscribe 모델이 배열로 나올텐데, 해당 배열의 길이를 가지고 오면 구독자 숫자를 확인가능하다.
  - 접속자가 대상 비디오를 올린 사람을 구독하는지 확인

    userFrom : localStorage.getItem('userId')

![pic1](https://user-images.githubusercontent.com/45280952/106249749-19883b00-6256-11eb-8b40-a94b88d7cf7e.png)

  - 본인 아이디를 localStorage에 저장해둔 경우 locaStorage에서 getItem으로 ID 정보를 가져올 수 있다.
  - 구독기능은 구독하기, 구독 취소로 나뉜다.

  - findOneAndDelete 는 대상을 컬렉션에서 검색하여 삭제할때 사용
  - 새로운 데이터를 저장할려고 할때는 새로운 인스턴스를 선언해서 진행
  - 라우터 정보를 따라서 진행

  ### 구독 페이지 만들기
  - LoginPage를 복사해서 만듬. ./componenet/views/SubscriptionPage.js
  - 접속자 정보를 가져옴
  - 접속자가 구독하고 있는 구독대상 리스트를 가져옴
  - 구독대상 ID 리스트를 순회하며 비디오 DB에 있는 정보를 가져와서 뿌림
  -  Subscribe.js는 모델, userTo(구독대상), userFrom(구독자) 2개로 분류
  -  subscribe.js은 라우터, 구독자 반환 후 배열 select은 안에서 참고
  - video.js 라우터 참고

      router.post('/getSubscriptionVideos',(req,res)=>{
        Subscriber.find({userFrom : req.body.userFrom})
        .exec((err,subscriberInfo)=>{
          if(err) return res.status(400).json({success:false,err})
          let subscribedUser = []; //구독하고 있는 사람 목록
          subscriberInfo.map((subscriber,i)=>{
              subscribedUser.push(subscriber.userTo);
          })
          Video.find({writer:{$in : subscribedUser}})
          .populate("writer")
          .exec((err,videos)=>{
              if(err) return res.status(400).send(err);
              res.status(200).json({success:true,videos})
          })
        })
      })

  위 코드 참고
  ### 댓글기능
  #### ./component/views/Section/Comment.js
  - 댓글의 RootComponent 안에 SingleComponent를 무한정 생성할수 있도록 함
  - 댓글쓴 사람의 ID 정보는 리덕스 store를 통해 가져옴
  - 글쓴이의 정보는 store에서 가져오도록 함
  - 비디오의 정보는 props를 통해 부모컴포넌트로 부터 가져옴

  #### Comment Routes in Sever
  - 서버에 저장할때 작성자의 모든 정보를 가져와야 이미지, 아이디 등을 알 수 있음.
  - save를 할때는 populate를 사용할 수 없기 때문에
  - 모델에서 아이디를 찾아서 해당 정보를 가져올 수 밖에 없음
  - comment의 writer 정보의 _id에 대한 정보를 가져옴
  #### Comment by SingleComment
  - SingleComment Component를 Comment에서 임포트하여 사용함
  - 대댓글이 올라갈때는 일반 댓글과 비교하여 responseTo 객체가 하나 더 들어감
  - Detail Page에서 표출할때는 일반 댓글만 나오도록(!responseTo) 실행
  #### Callback Function
  - Detail 페이지에서 새로운 코멘트가 추가될 경우 SetComments를 받아서 기존 Comment에 새로운 Comment가 붙을수 있도록 설정
  #### Reply Component
  - 부모코멘트와 같은 responseTo를 가진 코멘트만 출력
  - 입력되는 코멘트의 뎁스에 따라 무한정 입력되는 것이기 때문에 Comment에서 실행되는 SingleComment와 ReplyComment의 설정은 같아야한다.
  - 자식 코멘트에서 입력되는 값이 즉각적으로 변동하지 않았던 것은 useEffect의 설정 때문이다.
  - useEffect의 두번째 매개변수의 값에 따라 rerendering이 결정된다. (기본값은 비어있다.)

  ### 좋아요, 싫어요
  - 각 모델 생성 (Like.js, Dislike.js)
  - 컴포넌트 생성 LikeDislikes
  - 비디오와 댓글에 관하여 각각의 컴포넌트로 적용되도록 분리