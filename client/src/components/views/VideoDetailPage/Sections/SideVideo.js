import Axios from 'axios';
import React, { useEffect, useState } from 'react'

function SideVideo() {

    const [sideVideos, setsideVideos] = useState([])

    useEffect(()=>{
        Axios.get('/api/video/getVideos')
        .then(response => {
            if(response.data.success){
                console.log(response.data);
                setsideVideos(response.data.videos);
            }else{
                alert("비디오 가져오기를 실패 했습니다.")
            }
        })
    },[])

    const RenderSideVideos = sideVideos.map((item,index)=>{

        var minutes = Math.floor(item.duration/60);
        var seconds = Math.floor((item.duration - minutes*60));

        return (
        <div style={{display:'flex', marginBottom:'1rem', padding : '0 2rem'}} key={item._id}>
            <div style={{width : '40%', marginBottom : '1rem', marginRight:'1rem'}}>
                <a >
                    <img style={{width:'100%'}} src={`http://localhost:5000/${item.thumbnail}`}/>
                </a>
            </div>
            <div style = {{width :  '50%'}}>
                <a style={{color:'gray'}}>
                    <span style={{fontSize:'1rem', color:'black'}}>{item.title}</span><br/>
                    <span>{item.writer.name}</span><br/>
                    <span>{item.views} views </span><br/>
                    <span>{minutes} : {seconds}</span><br/>
                </a>
            </div>
        </div>
    )

    })



    return (
        <React.Fragment>
            {RenderSideVideos}
        </React.Fragment>

        
    )
}

export default SideVideo
