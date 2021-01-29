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
        Axios.get("/api/subscribe/subscribeNumber",variable)
        .then(response=>{
            if(response.data.success){
                setSubscribeNumber(response.data.subscribeNumber)
            }else{
                alert('구독자 숫자를 불러오는데 실패하였습니다.')
            }
        });

        let subscribedVariable ={ //접속자의 대상 비디오 구독 유무를 확인하는 것이기 때문에 접속자 아이디도 필요
            userTo : props.userTo,
            userFrom : localStorage.getItem('userId')
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
             onClick >
                 {SubscribeNumber} {Subscribed ? 'Subscribed':'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe
