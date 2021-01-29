import React,{useEffect,useState} from 'react'
import {Row,Col, List, message, Avatar} from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';


function VideoDetailPage(props) {

    //비디오 아이디는 url에서 가져오면 됨
    const videoId = props.match.params.videoId; //Link 주소에 :videoId라고 적었기 때문에 가져올수 있음
    const variable = {
        videoId : videoId,
    }

    const [VideoDetail, setVideoDetail] = useState([])

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
        
    }, [])
    if(VideoDetail.writer){
        return (
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
                    <div style={{width:'100%', padding:'3rem 4rem'}}>
                        <video style={{width:'100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls/>

                        <List.Item 
                            actions={[<Subscribe userTo={VideoDetail.writer._id}/>]}
                        >
                            <List.Item.Meta
                                avatar = {<Avatar src={VideoDetail.writer.image}/>}
                                title = {VideoDetail.title}
                                description = {VideoDetail.description}
                            />
                        </List.Item>

                        {/* comments 댓글 */}

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
