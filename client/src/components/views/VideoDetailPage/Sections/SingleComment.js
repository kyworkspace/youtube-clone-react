import React, { useState } from 'react'
import {Comment, Avatar,Button,Input} from 'antd'
import { useSelector } from 'react-redux';
import Axios from 'axios';

function SingleComment(props) {
    const user = useSelector(state=>state.user);
    const videoId = props.videoId; //URL에서 비디오 ID 가져옴
    const [OpenReply, setOpenReply] = useState(false);
    const [CommentValue, setCommentValue] = useState("");
    const onClickReplyOpen = () =>{
        setOpenReply(!OpenReply);
    }
    const onHandelChange = (e) =>{
        setCommentValue(e.currentTarget.value);
    }
    const onSubmit = (e)=>{
        e.preventDefault();

        const variable={
            content : CommentValue,
            writer : user.userData._id,
            postId : videoId,
            responseTo : props.comment._id,//대댓글은 댓글을 쓰는 대상이 필요
        }

        Axios.post('/api/comment/saveComment',variable)
        .then(response=>{
            if(response.data.success){
                props.refreshFunction(response.data.result);
                setCommentValue("");
            }else{
                alert('댓글 저장 실패, 다시시도 PLZ')
            }
        })
    }
    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply To</span>
    ]

    return (
        <div>
            <Comment
            actions={actions}
            author = {props.comment.writer.name}
            avatar={<Avatar src={props.comment.writer.image} slt/>}
            content={<p>{props.comment.content}</p>}
            />
            {OpenReply && //OpenReply가 true일때만 보이도록
                <form style ={{display:'flex'}} onSubmit={onSubmit}>
                    <textarea
                    style={{width:'100%',borderRadius:'5px'}}
                    onChange={onHandelChange}
                    value = {CommentValue}
                    placeholder="코멘트를 작성해주세요">


                    </textarea>
                    <br/>
                    <button style={{width : '20%', height:'52px'}} onClick={onSubmit}>Submit</button>
                </form>
            }
            
        </div>
    )
}

export default SingleComment
