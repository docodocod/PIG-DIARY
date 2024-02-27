const passport = require('passport');
const { Strategy: NaverStrategy, Profile: NaverProfile } = require('passport-naver-v2');
const User = require('../models/user');

//네이버 로그인
module.exports = () => {
    passport.use(
        new NaverStrategy(
            {
                clientID: process.env.NAVER_ID,
                clientSecret: process.env.NAVER_SECRET,
                callbackURL: process.env.NAVER_URL,
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log('naver profile : ', profile);
                try {
                    const exUser = await User.findOne({
                        where: { snsId: profile.id, provider: 'naver' },
                    });
                    if (exUser) {
                        done(null, exUser);
                    } else {
                        const newUser = await User.create({
                            email: profile.email,
                            nick: profile.nickname,
                            snsId: profile.id,
                            provider: 'naver',
                        });
                        done(null, newUser);
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            },
        ),
    );
};