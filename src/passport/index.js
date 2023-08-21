import passport from "passport";
import local from "./localStrategy.js";
import setUpKakaoStrategy from "./kakaoStrategy.js";
import {getUserData} from "../dao/user.js";


module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.email);
    });
    passport.deserializeUser((email, done) => {
        getUserData(email)
        .then(user=>done(null,user))
        .catch(err=>done(err));
    });
    local();
    setUpKakaoStrategy();
};