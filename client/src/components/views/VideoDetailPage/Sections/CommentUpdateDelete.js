import React from 'react'
import {Button,Icon} from 'antd'
import 'antd/dist/antd.css';

const {DeleteFilled} = Icon;

function CommentUpdateDelete() {
    
    return (
        <div>
            <Button loading>수정</Button>
            <Button loading>삭제</Button>
            
        </div>
    )

    // <Button type="primary" loading>
    //     Loading
    // </Button>
}




export default CommentUpdateDelete
