const passport=require("passport");
const kakao=require("./kakaoStrategy.js");
const User =require("../models/user.js");

exports.passportConfig=()=>{
    passport.serializeUser((user, done)=>{
        console.log('passport session save: ', user.id);
        done(null, user.id);
        //{ id:3, connect.sid: s%2343432324324}
    });

    passport.deserializeUser((id, done)=>{
        console.log('passport session get id: ', id);
        User.findOne({where:{id}})
            .then(user=>done(null,user))
            .catch(err=>done(err));
    });
    kakao();
};
