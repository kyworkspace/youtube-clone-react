const {User} = require("../models/User");

let auth = (req,res,next) => {
    //인증 처리를 하는곳

    // 1. 클라이언트에서 쿠키의 토큰을 가져옴
  let token = req.cookies.x_auth;

  // 2. 토큰을 복호화 한다. 유저를 찾는다.
  User.findByToken(token,(err,user)=>{
      if(err) throw err;
      //반환된 유저정보가 없으면 권한 false 반환
      // 4. 유저가 없으면 false
      if(!user) return res.json({isAuth : false, error:true});
      // 3. 유저가 있으면 인증 ok
      req.token = token;
      req.user = user;
      next(); //여긴 미들웨어이기 때문에 다음함수로 넘어갈수 있도록;
  })

  
}

module.exports={auth};