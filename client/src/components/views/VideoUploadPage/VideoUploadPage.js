import React, { useState } from 'react'
import {Typography,Button,Form,message,Input,Icon} from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';

const {Title} = Typography;
const {TextArea} = Input;

function VideoUploadPage() {
    const [VideoTitle, setVideoTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Private, setPrivate] = useState(0);
    const [Category, setCategory] = useState("Film & Animation");

    //Select option을 위한 key value
    const PrivateOptions = [
        {value:0,label:"Private"},
        {value:1,label:"Public"}
    ]
    const CategoryOptions = [
        {value : 0, label:"Film & Animation"},
        {value : 1, label:"Auto & Vehicles"},
        {value : 2, label:"Music"},
        {value : 3, label:"Pets & Animals"},
    ]
    const onTitleChange =(event)=>{
        let title = event.currentTarget.value;
        setVideoTitle(title);
    }
    const onDescriptionChange = (event) =>{
        setDescription(event.currentTarget.value);
    }
    const onPrivateChange = (e) =>{
        setPrivate(e.currentTarget.value)
    }
    const onCategoryChange = (e)=>{
        setCategory(e.currentTarget.value)
    }
    const onDrop = (files) =>{
        let formData = new FormData;
        const config = {
            header :{
                'content-type':'multipart/form-data'
            }
        }
        //파일 타입을 보낼때 설정해줌
        //멀티파트 이기 때문에 몇개가 들어올지 모름
        //그래서 하나만 들어오게 해뒀기 때문에 첫번째 것만 가져옴
        formData.append("file",files[0]) 


        Axios.post('/api/video/uploadfiles',formData,config).then(response=>{
            
            if(response.data.success){
                //server 부분에 routes에 설정 추가
                console.log(response.data);
            }else{
                alert('비디오 업로드 실패')
            }
        })

    }

    return (
        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style ={{textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form onSubmit>
                <div style = {{display:'flex', justifyContent:'space-between'}}>
                    {/* DROP ZONE */}
                    <Dropzone
                    onDrop = {onDrop}
                    multiple ={false} /** 한번에 파일을 하나만 할건지 여러개 할건지 **/
                    maxSize = {1000000000} /** 파일 크기 **/
                    >
                        {({getRootProps,getInputProps})=>(
                            <div style= {{width : '300px', height : '240px', border : '1px solid lightgray', display:'flex',
                            alignItems:'center', justifyContent: 'center'
                            }} {...getRootProps()}>
                                <input {...getInputProps()}/>
                                <Icon type="plus" style = {{fontSize:'3rem'}}/>
                            </div>
                        )}
                    </Dropzone>
                    
                    {/* 썸네일 */}
                    <div src alt>
                    </div>
                </div>
                <br/>
                <br/>
                <label>Title</label>
                <Input onChange={onTitleChange} value={VideoTitle}/>
                <br/>
                <br/>
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                    />
                <br/>
                <br/>
                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item,index)=>(
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br/>
                <br/>
                <select onChange={onCategoryChange}>
                    {CategoryOptions.map((item,index)=>(
                            <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br/>
                <br/>
                <Button type="primary" size="large" onClick>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage