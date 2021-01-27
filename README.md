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
