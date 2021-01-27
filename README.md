# Youtube-Clone BoilerPlate

  https://github.com/jaewonhimnae/boilerplate-mern-stack

위 주소를 참고하여 내가 만든 보일러플레이트를 수정함
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
  해당 경로에 관한 설정은 server의 video.js에 적어둠