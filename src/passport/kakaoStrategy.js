import passport from "passport";
import KakaoStrategy from "passport-kakao";
const kakaoStrategy =KakaoStrategy.Strategy;
import dotenv from "dotenv";
import User from "../models/user.js";


export function kakao(){
    passport.use(new kakaoStrategy({
        clientID:process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    },async(accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        const provider = "kakao";
        try {
            const exUser = await User.findOne( {where: {
                    snsId: profile.id,
                    provider: 'kakao'
            }});
            if (exUser) {
                done(null, exUser);
            } else {
                const newUser=await User.create({
                    email: profile._json.kakao_account,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: "kakao",
                });
                done(null,newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};

