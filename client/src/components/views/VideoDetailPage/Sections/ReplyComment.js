import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const renderReplyComment = (props) =>
        props.commentLists.map((comment,index)=>(
            <>
            {comment.responseTo === props.parentCommentId && 
                <div style={{width:'80%' , marginLeft: '40px'}}>
                    <SingleComment 
                    key = {comment._id}
                    // refreshFunction={props.refreshFunction} 
                    commentRefresh={props.commentRefresh}
                    comment={comment} postId={props.postId} />
                    <ReplyComment 
                    key = {comment._id}
                    // refreshFunction={props.refreshFunction} 
                    commentRefresh={props.commentRefresh}
                    commentLists={props.commentLists} 
                    postId={props.postId} 
                    parentCommentId={comment._id} />
                </div>
            }
            </>
        ))
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)

    useEffect(() => {
        //대댓글 갯수찾는 함수
        let commentNumber = 0;
        props.commentLists.map((comment,index)=>{ //전체 댓글 목록중 부모코멘트아이디랑 같은게 있으면 갯수 증가 시켜줌
            if(comment.responseTo === props.parentCommentId){
                commentNumber++;
            }
        })
        setChildCommentNumber(commentNumber);
    }, [props.commentLists]) 
    //useEffect는 Default가 페이지가 실행될때 한번만 되도록 하는데
    //뒤에 들어가는 변수를 설정해주면 해당값이 바뀔때마다 reRender 한다.

    const onHandleChange = () =>{
        setOpenReplyComments(!OpenReplyComments);
    }
    return (
        <div>
            {ChildCommentNumber>0 && 
                <p style={{fontSize:'14px', margin:0 , color:'gray', cursor:'pointer'}} onClick={onHandleChange}>
                View {ChildCommentNumber} more Comment(s)
                </p>
            }
            {OpenReplyComments &&
                renderReplyComment(props)
            }
        </div>
    )
}

export default ReplyComment
