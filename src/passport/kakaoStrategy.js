import passport from "passport";
import kakaoStrategy from "passport-kakao";
const {Strategy} =kakaoStrategy;
import dotenv from "dotenv";
const Config = dotenv.config({ path: "./config/.env.app" }).parsed;

const setUpKakaoStrategy=()=>{
    passport.use(new Strategy({
        clientID:Config.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    }));
};

export default setUpKakaoStrategy;

