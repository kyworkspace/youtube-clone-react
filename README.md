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
  2. 화면 사이즈에 맞게 유동적으로 움직이도록 xs=24(가장작은사이즈의 화면) 라고 볼때 lg={6} 으로 하게 되면 각 칼럼이 6사이즈가 되어 24사이즈의 화면에 4개씩 들어가게 된다.
  3. md=8은 중간사이즈가 되었을때 3개가 나오도록 한다. 화면이 가작 작아지는 경우는 24로 맞추어 한줄에 한개만 나오도록 한다.

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

  
