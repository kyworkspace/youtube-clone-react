const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");

const { auth } = require("../middleware/auth");
//=================================
//             Comment
//=================================

router.post('/saveComment',(req,res)=>{

    const comment = new Comment(req.body);
    comment.save((err,comment)=>{
        if(err) return res.json({success:false,err})
        //save했을때는 writer의 populate를 가져올수 없음
        //그래서 찾아야함
        Comment.find({'_id':comment._id})
        .populate('writer')
        .exec((err,result)=>{
            if(err) return res.json({seccess:false,err})
            res.status(200).json({success:true,result});
        })
    })

})

router.post('/getComments',(req,res)=>{

    Comment.find({"postId" : req.body.videoId})
    .populate('writer')
    .exec((err,comments)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true,comments});
    })

})


module.exports = router;
