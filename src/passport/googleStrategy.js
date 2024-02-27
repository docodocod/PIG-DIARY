const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/user');

//google 소셜 로그인
module.exports = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_ID,
                clientSecret: process.env.GOOGLE_SECRET,
                callbackURL: process.env.GOOGLE_URL,
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log('google profile : ', profile);
                try {
                    const exUser = await User.findOne({
                        where: { snsId: profile.id, provider: 'google' },
                    });
                    if (exUser) {
                        done(null, exUser);
                    } else {
                        const newUser = await User.create({
                            email: profile._json.email,
                            nick: profile.displayName,
                            snsId: profile.id,
                            provider: 'google',
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