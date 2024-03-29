const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const User = require("../models/user.js");

//카카오 소셜 로그인
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
                        done(null, exUser);
                    } else {
                        const newUser = await User.create({
                            email: profile._json && profile._json.kakao_account_email,
                            nick: profile.displayName,
                            snsId: profile.id,
                            provider: 'kakao',
                        });
                        done(null, newUser);
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            }));
};