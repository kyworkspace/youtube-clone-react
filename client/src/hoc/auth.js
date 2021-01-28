import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {auth} from '../_actions/user_actions';

export default function (SpecificComponent,option,adminRoute=null){

    //SpecificComponent : 하위로 붙어오는 컴포넌트
    //option : null - 아무나 출입 가능함
    //option : true : 로그인한 유저만 출입 가능
    //option :  false : 로그인한 유저는 출입 불가
    //adminRoute : admin 유저만 출입가능한지에 대한 언급


    function AuthenticationCheck(props){
        //백엔드의 상태를 먼저 가져와서 현재 로그인하는 회원의 정보를 확인함

        const dispatch = useDispatch(); //redux를 사용함
        let user = useSelector(state => state.user);
        useEffect(() => {
            //하이어 오더 컴포넌트이기 때문에 하위 컴포넌트 사이에서 이동이 이루어질때 계속 백엔드에 접근하여
            // response 정보를 가져옴
            dispatch(auth()).then(response=>{
                //-> 분기처리
                //로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push("/login") //로그인 페이지로 보내버림
                    }
                }else{
                    //로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin){//admin 유저가 아닌데 어드민 페이지로 가려고 할때
                        props.history.push("/");
                    }else{
                        if(option===false){
                            props.history.push('/');
                        }
                    }
                }
            });
        }, [])

        return ( //컴포넌트 리턴
            <SpecificComponent {...props} user = {user}/>
        )
    }
    return AuthenticationCheck;
}