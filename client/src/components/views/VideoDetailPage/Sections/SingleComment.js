import React, { useState } from 'react'
import {Comment, Avatar,Button,Input,List,Card} from 'antd'
import { useSelector } from 'react-redux';
import Axios from 'axios';
import LikeDislikes from './LikeDislikes';
import CommentUpdateDelete from './CommentUpdateDelete';

function SingleComment(props) {
    const user = useSelector(state=>state.user);
    const {postId} = props; 
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
            postId : postId,
            responseTo : props.comment._id,//대댓글은 댓글을 쓰는 대상이 필요
        }

        Axios.post('/api/comment/saveComment',variable)
        .then(response=>{
            if(response.data.success){
                //props.refreshFunction(response.data.result);
                props.commentRefresh();
                setCommentValue("");
                setOpenReply(!OpenReply);
            }else{
                alert('댓글 저장 실패, 다시시도 PLZ')
            }
        })
    }
    const actions = [
        <CommentUpdateDelete writerId={props.comment.writer._id} userId={localStorage.getItem("userId")} commentId={props.comment._id} commentRefresh={props.commentRefresh}/>
    ]

    return (
        <div>
            {/* <Comment
            actions={actions}
            author = {props.comment.writer.name}
            avatar={<Avatar src={props.comment.writer.image} slt/>}
            content={<p>{props.comment.content}</p>}
            /> */}
            <List.Item
            actions={actions}
            >
                     <List.Item.Meta
                        actions={actions}
                        title = {props.comment.writer.name}
                        avatar={<Avatar src={props.comment.writer.image} />}
                        description={<p>
                            {props.comment.content}<br/>
                            <LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id}/><br/>
                            <span style={{cursor:"pointer"}} onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply To</span>
                            </p>}
                    />
            </List.Item>
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
