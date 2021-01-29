const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const { Subscriber } = require('../models/Subscriber');
//=================================
//             Video
//=================================

//Storage Multer Config
let storage = multer.diskStorage({
    destination : (req,file,cb)=>{ //업로드 경로 여기서는 절대경로로 프로젝트 루트폴더에 있는 uploads 폴더
        cb(null,"uploads/");
    },
    filename : (req,file,cb)=>{ //파일명 설정 날짜_원본명
        cb(null,`${Date.now()}_${file.originalname}`);
    },
    fileFilter : (req,file,cb)=>{ //파일 필터 -- 현재는 .mp4와 .png만 허용
        const ext = path.extname(file.originalname);
        if(ext !== '.mp4' || ext !== '.png'){
            return cb(res.status(400).end('only mp4, png is allowd'),false);
        }
        cb(null, true);
    }
})

const upload = multer({storage:storage}).single("file");
// Config Option End


router.post('/uploadfiles',(req,res)=>{
    // 비디오 파일을 루트 폴더에 업로드 한다.
    upload(req,res,err=>{
        if(err){
            //client 의 videoUploadPage에서 Line.52 에서 success true로 갈지 아닐지 판단
            return res.json({success:false,err})
        }
        return res.json({
            success:true, 
            url : res.req.file.path, //업로드 폴더 경로를 클라이언트에 보냄
            fileName : res.req.file.filename //파일명
        })
    })
})

router.post('/uploadVideo',(req,res)=>{
    // 비디오 정보를 서버에 저장한다.
    const video = new Video(req.body); //<== client에서 보낸 모든 Variable이 body에 담긴 상태

    video.save((err,doc)=>{//객체정보를 서버에 저장
        if(err) return res.json({success:false,err})
        res.status(200).json({success:true});
    }); 
})

router.get('/getVideos',(req,res)=>{
    //비디오 목록을 가져온다
    //Video 컬렉션 안에 있는 모든 비디오를 가져옴
    Video.find()
    .populate('writer') 
    .exec((err,videos)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({success:true,videos})
    })
})

router.post('/getSubscriptionVideos',(req,res)=>{
    //자신이 구독하는 사람들을 찾는다.
    Subscriber.find({userFrom : req.body.userFrom})
    .exec((err,subscriberInfo)=>{
        if(err) return res.status(400).json({success:false,err})

        let subscribedUser = []; //구독하고 있는 사람 목록
        subscriberInfo.map((subscriber,i)=>{
            subscribedUser.push(subscriber.userTo);
        })

        //찾은 사람들의 비디오 목록을 가져온다
        //몽고 DB가 가진 메서드 $in을 사용하여 배열에 속해 있는 값을 순회하여 조건이 일치하는 것을 가져옴
        Video.find({writer:{$in : subscribedUser}})
        .populate("writer")
        .exec((err,videos)=>{
            if(err) return res.status(400).send(err);
            res.status(200).json({success:true,videos})
        })
        
    })
    
})

router.post('/getVideoDetail',(req,res)=>{
    //비디오 상세정보를 가져온다.
    Video.findOne({"_id":req.body.videoId})
    .populate("writer")
    .exec((err,videoDetail)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({success:true,videoDetail});
    })
})

router.post('/thumbnail',(req,res)=>{
    let filePath = "";
    let fileDuration = "";

    //비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url,function (err,metadata){ 
        //ffprobe는 ffmpeg 받을때 같이 딸려오는것
        //console.dir(metadata);
        //console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
    })
    
    // 썸네일 생성
    ffmpeg(req.body.url) //클라이언트에서 들어온 비디오저장 경로
    .on('filenames',function(filenames){ //비디오 썸네일 파일명 셍성
        console.log("Will generate "+filenames.join(', '));
        console.log(filenames)

        filePath = "uploads/thumbnails/"+filenames[0];
    })
    .on('end',function(){ //썸네일이 전부 생성되고 난 다음에 무엇을 할것인지
        console.log("ScreenShot Taken");
        return res.json({
            success:true
            , url : filePath 
            , fileDuration:fileDuration
        })
    })
    .on('error',function(err){ //에러가 났을시
        console.error(err);
        return res.json({success:false,err})
    })
    .screenshot({ //
        count : 3, //3개의 썸네일 가능
        folder : "uploads/thumbnails",//업로드 경로
        size : '320x240', //사이즈
        filname : 'thumbnail-%b.png' //파일명 %b는 extension을 뺀 파일 네임
    })
})

module.exports = router;
