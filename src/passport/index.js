import passport from "passport";
import {kakao} from "./kakaoStrategy.js";
import {getSnsData} from "../dao/auth.js";


export function passportConfig(){
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        const provider="kakao";
        getSnsData(id,provider)
        .then(user=>done(null,user))
        .catch(err=>done(err));
    });
    kakao();
};
