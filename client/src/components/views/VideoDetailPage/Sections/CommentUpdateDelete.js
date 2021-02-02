import React, { useState } from 'react'
import {Button,Icon} from 'antd'
import {DeleteFilled,LoadingOutlined,EditFilled} from '@ant-design/icons'
import 'antd/dist/antd.css';
import Axios from 'axios';


function CommentUpdateDelete(props) {
    const [UpdateLoading, setUpdateLoading] = useState(false);
    const [DeleteLoading, setDeleteLoading] = useState(false);

    let variable = props;
    const onCommentEditHandler =() =>{
        props.commentUpdate();
    }
    const onCommentDeleteHandler =()=>{
        if(window.confirm("댓글을 삭제하시겠습니까?")){
            setDeleteLoading(true);
            Axios.post("/api/comment/deleteComment",variable)
            .then(response=>{
                if(response.data.success){
                    setDeleteLoading(false);
                    props.commentRefresh();
                }else{
                    alert("댓글을 삭제하는데 오류가 발생하였습니다.")
                }
            })
        }
    }
    return (
        <div>
            {props.writerId === props.userId && 
                <div>
                    {UpdateLoading ? <LoadingOutlined /> :<EditFilled onClick={onCommentEditHandler}/>}
                    <span style={{paddingLeft:'2px',paddingRight:'2px'}}/>
                    {DeleteLoading ? <LoadingOutlined /> : <DeleteFilled onClick={onCommentDeleteHandler}/>}
                </div>
            }
            
        </div>
    )
}
export default CommentUpdateDelete
