import React, { useEffect,useState } from 'react'
import {Typography,Row,Card,Icon,Avatar,Col} from 'antd';
import Axios from 'axios';
import moment from 'moment';
const {Title} = Typography;
const {Meta} = Card;

function SubscriptionPage() {


    const [Video, setVideo] = useState([]) ;//배열형

    useEffect(()=>{

        let variable = {
            userFrom : localStorage.getItem('userId')
        }

        Axios.post('/api/video/getSubscriptionVideos',variable)
        .then(response => {
            if(response.data.success){
                console.log(response.data);
                setVideo(response.data.videos);
            }else{
                alert("비디오 가져오기를 실패 했습니다.")
            }
        })
    },[]); // useEffect에 []가 없으면 메서드를 계속 실행하고, 있을때는 화면이 오픈될때 한번만 실행함

    const renderCards = Video.map((video,index)=>{

        var minutes = Math.floor(video.duration/60);
        var seconds = Math.floor((video.duration - minutes*60));

        return <Col lg={6} md = {8} xs={24} key={video._id}>
                <a href={`/video/${video._id}`}>
                    <div style={{position:'relative'}}>
                        <img style={{width:'100%'}} src={`http://localhost:5000/${video.thumbnail}`}  alt="thumbnail"/>
                        <div className="duration">
                            <span>{minutes}:{seconds}</span>
                        </div>
                    </div>
                </a>
            <br/>
            <Meta 
                avatar={
                    <Avatar src={video.writer.image}/>
                }
                title ={video.title}
                description=""
            />
            <span>{video.writer.name}</span><br/>
            <span style={{marginLeft:'3rem'}}>{video.views}views</span> -
            <span>{moment(video.createdAt).format("MMM Do YY")}</span>
            </Col>
    })

    return (
        <div style = {{width : '85%', margin : "3rem auto"}}>
            <Title level={2} > Subscription Videos </Title>
            <hr/>
            <Row gutter ={[32,16]}>

               {Video.length > 0 ? renderCards : <div>...Loading Joong</div>} 

            </Row>
         </div>
    )
}

export default SubscriptionPage
