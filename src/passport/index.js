import passport from "passport";
import local from "./localStrategy.js";
import setUpKakaoStrategy from "./kakaoStrategy.js";


module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
    });

    local();
    setUpKakaoStrategy();
};