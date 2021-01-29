const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const subscriberSchema = mongoose.Schema({
    userTo : {
        type : Schema.Types.ObjectId, 
        ref : 'User' 
    },
    userFrom : {
        type : Schema.Types.ObjectId, 
        ref : 'User' 
    },
   
},{timestamps:true});
//timestamps ==> 만들날과 업데이트한 날이 기록되어 표시됨

const Subscriber = mongoose.model('Subscriber',subscriberSchema); //컬렉션(테이블)명, 스키마, 사용자정의명(여기선안씀)

module.exports={Subscriber}