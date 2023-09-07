import passport from "passport";
import KakaoStrategy from "passport-kakao";
const kakaoStrategy =KakaoStrategy.Strategy;
import dotenv from "dotenv";
import {getSnsData, getUserData, postSnsJoin} from "../dao/auth.js";

const Config = dotenv.config({ path: "./config/.env.app" }).parsed;


export function kakao(){
    passport.use(new kakaoStrategy({
        clientID:Config.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    },async(accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        const provider = "kakao";
        try {
            const exUser = await getSnsData(profile.id, provider);
            if (exUser) {
                done(null, exUser);
            } else {
                const {email}=profile._json.kakao_account;
                const newUser = await postSnsJoin(email, profile.displayName, profile.id, provider);
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};

