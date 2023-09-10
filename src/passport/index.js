import passport from "passport";
import {kakao} from "./kakaoStrategy.js";

export function passportConfig(){
    passport.serializeUser(function (user, done) {
        console.log('passport session save: ', user.id);
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        console.log('passport session get id: ', id);
        done(null, id);
    });
    kakao();
};
