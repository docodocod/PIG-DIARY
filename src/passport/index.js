import passport from "passport";
import {kakao} from "./kakaoStrategy.js";


export function passportConfig(){
    /*passport.serializeUser((user, done) => {
        done(null, user.email);
    });
    passport.deserializeUser((email, done) => {
        getUserData(email)
        .then(user=>done(null,user))
        .catch(err=>done(err));
    });*/
    kakao();
};
