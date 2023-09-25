import passport from "passport";
import {kakao} from "./kakaoStrategy.js";
import User from "../models/user.js";

export function passportConfig(){
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
