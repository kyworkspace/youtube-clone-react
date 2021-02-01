import React,{useEffect,useState} from 'react'
import {Row,Col, List, message, Avatar} from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';


function VideoDetailPage(props) {

    //비디오 아이디는 url에서 가져오면 됨
    const videoId = props.match.params.videoId; //Link 주소에 :videoId라고 적었기 때문에 가져올수 있음
    const variable = {
        videoId : videoId,
    }

    const [VideoDetail, setVideoDetail] = useState([])
    const [Comments, setComments] = useState([])
    useEffect(() => {

        Axios.post('/api/video/getVideoDetail',variable)
        .then(response=>{
            if(response.data.success){
                console.log(response.data.videoDetail);
                setVideoDetail(response.data.videoDetail)
            }else{
                message.error("비디오 정보를 가져오는데 실패하였습니다.")
            }
        })
        //댓글 정보 가져옴
        Axios.post('/api/comment/getComments',variable)
        .then(response=>{
            if(response.data.success){
                setComments(response.data.comments);
                console.log(response.data);
            }else{
                alert('코멘트 정보를 가져오는데 실패하였습니다.')
            }
        })
        
    }, [])

    // 댓글쓰면 리로딩 되도록
    const refreshFunction = (newComment) => {
        //기존 코멘트에 새로운 코멘트를 이어 붙임
        setComments(Comments.concat(newComment));
    }

    if(VideoDetail.writer){
        //포스트를 올린사람과 접속자가 같으면 버튼 숨김
        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom ={localStorage.getItem('userId')}/>

        return (
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
                    <div style={{width:'100%', padding:'3rem 4rem'}}>
                        <video style={{width:'100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls/>

                        <List.Item 
                            actions={[subscribeButton]}
                        >
                            <List.Item.Meta
                                avatar = {<Avatar src={VideoDetail.writer.image}/>}
                                title = {VideoDetail.title}
                                description = {VideoDetail.description}
                            />
                        </List.Item>

                        {/* comments 댓글 */}
                        
                        <Comment refreshFunction = {refreshFunction} commentLists={Comments} postId={videoId}/>
                        
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <div style = {{marginTop:'3rem'}}/>
                        <SideVideo/>
                </Col>
            </Row>
        )
    }else{
        return (<div>Loading...</div>)
    }
    
}

export default VideoDetailPage
