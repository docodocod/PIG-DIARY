const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const user=require('')

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
    });
    local();
    kakao();
};