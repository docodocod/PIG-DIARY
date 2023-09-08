import passport from "passport";
import {kakao} from "./kakaoStrategy.js";
import {getSnsData} from "../dao/auth.js";


export function passportConfig(){
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    kakao();
};
