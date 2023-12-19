const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const User = require("../models/user.js");

module.exports = () => {
    passport.use(
        new KakaoStrategy({
                clientID: process.env.KAKAO_ID,
                callbackURL: process.env.KAKAO_URL,
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log(profile);
                try {
                    const exUser = await User.findOne({
                        where: {snsId: profile.id, provider: 'kakao'},
                    });
                    if (exUser) {
                        done(null, exUser); // 로그인 인증 완료
                    } else {
                        // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
                        const newUser = await User.create({
                            email: profile._json && profile._json.kakao_account_email,
                            nick: profile.displayName,
                            snsId: profile.id,
                            provider: 'kakao',
                        });
                        done(null, newUser); // 회원가입하고 로그인 인증 완료
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            }));
};