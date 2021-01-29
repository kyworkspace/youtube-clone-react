import Axios from 'axios'
import React, { useEffect, useState } from 'react'

function Subscribe(props) {
    //구독자 정보 가져오기

const [SubscribeNumber, setSubscribeNumber] = useState(0);
const [Subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        let variable ={
            userTo : props.userTo
        }
        Axios.post("/api/subscribe/subscribeNumber",variable)
        .then(response=>{
            if(response.data.success){
                setSubscribeNumber(response.data.subscribeNumber)
            }else{
                alert('구독자 숫자를 불러오는데 실패하였습니다.')
            }
        });

        let subscribedVariable ={ //접속자의 대상 비디오 구독 유무를 확인하는 것이기 때문에 접속자 아이디도 필요
            userTo : props.userTo,
            userFrom : props.userFrom
        }

        Axios.post("/api/subscribe/subscribed",subscribedVariable)
        .then(response=>{
            if(response.data.success){
                setSubscribed(response.data.subscribed);
            }else{
                alert("정보를 가져오지 못했습니다.")
            }
        })


    }, [])
const onSubscribe = () =>{
    if(props.userTo===props.userFrom){
        alert("본인 업로드 영상은 구독 할 수 없습니다.");
        return;
    }

    let subscribedVariable ={ 
        userTo : props.userTo,
        userFrom : props.userFrom
    }

    // 구독중이면..
    if(Subscribed){
        Axios.post("/api/subscribe/unSubscribe",subscribedVariable)
        .then(response=>{
            if(response.data.success){
                console.log(response.data);
                setSubscribeNumber(SubscribeNumber-1);
                setSubscribed(!Subscribed);
            }else{
                alert("구독 취소를 실패하였습니다.")
            }
        })

    //구독중이 아니라면
    }else{ 
        Axios.post("/api/subscribe/subscribe",subscribedVariable)
        .then(response=>{
            if(response.data.success){
                setSubscribeNumber(SubscribeNumber+1);
                setSubscribed(!Subscribed);
            }else{
                alert("구독 신청을 실패하였습니다.")
            }
        })
    }
}

    return (
        <div>
            <button
                style = {{
                    backgroundColor:`${Subscribed ? '#AAAAAA' : '#CC0000'}`
                    , borderRadius:'4px'
                    , color : 'white'
                    , padding : '10px 16px'
                    , fontWeight : '500'
                    , fontSize : '1rem'
                    , textTransform : 'uppercase'
            }}            
             onClick ={onSubscribe}>
                 {SubscribeNumber} {Subscribed ? 'Subscribed':'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe
