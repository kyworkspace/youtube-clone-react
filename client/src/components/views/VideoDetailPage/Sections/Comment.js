import Axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ReplyComment from './ReplyComment';
import SingleComment from './SingleComment';

function Comment(props) {
    const user = useSelector(state=>state.user);
    const {postId} = props; //URL에서 비디오 ID 가져옴

    const [commentValue, setcommentValue] = useState("");

    const handleClick = (e) =>{
        setcommentValue(e.currentTarget.value);
    }
    const onSubmit = (e) =>{
        e.preventDefault();

        const variable={
            content : commentValue,
            writer : user.userData._id,
            postId : postId
        }

        Axios.post('/api/comment/saveComment',variable)
        .then(response=>{
            if(response.data.success){
                props.refreshFunction(response.data.result);
                setcommentValue("");
            }else{
                alert('댓글 저장 실패, 다시시도 PLZ')
            }
        })
    }

    return (
        <div>
            <br/>
            <p>Replies</p>
            <hr/>
            {/* Comment Lists */}
            {props.commentLists && props.commentLists.map((comment,index)=>(
                //첫번째 뎁스가 있는것만 출력
                (!comment.responseTo && 
                    <>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={postId} />
                        <ReplyComment refreshFunction={props.refreshFunction} commentLists={props.commentLists} parentCommentId={comment._id} postId={postId} />
                    </>
                    )
                
            ))}
            
            {/* Root Comment Form */}

            <form style ={{display:'flex'}} onSubmit={onSubmit}>
                <textarea
                style={{width:'100%',borderRadius:'5px'}}
                onChange={handleClick}
                value={commentValue}
                placeholder="코멘트를 작성해주세요">


                </textarea>
                <br/>
                <button style={{width : '20%', height:'52px'}} onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Comment
