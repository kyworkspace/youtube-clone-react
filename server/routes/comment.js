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

router.post('/deleteComment',(req,res)=>{
    Comment.updateOne({_id:req.body.commentId},{$set:{content:"작성자에 의해 삭제된 댓글입니다."}},function(err,res){
        if(err) return res.status(400).json({success:false,err});
    })
    res.status(200).json({success:true});
})


router.post('/updateComment',(req,res)=>{
    Comment.updateOne({_id:req.body.commentId},{$set:{content:req.body.content}},function(err,res){
        if(err) return res.status(400).json({success:false,err});
    })
    res.status(200).json({success:true});
})


module.exports = router;
