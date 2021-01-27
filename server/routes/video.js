const express = require('express');
const router = express.Router();
//const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer");
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
    // 비디오를 서버에 저장한다.
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

module.exports = router;
