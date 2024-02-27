const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const {pbkdf2} = require("../utils/encrypt");

//일반 로그인
module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        try {
            const exUser = await User.findOne({ where: { email } });
            if (exUser) {
                const storedPw = exUser.password;
                const hashedPw = pbkdf2(password);
                if (storedPw === hashedPw) {
                    const token = jwt.sign({email}, process.env.JWT_SECRET, {
                        expiresIn: "60m",
                        issuer: "dongja",
                    })
                    console.log("토큰이 발급 되었습니다.");
                    console.log("token: " + token)
                    console.log("로그인 성공");
                    done(null, exUser);
                } else {
                    done(null, false, {message: '비밀번호가 일치하지 않습니다.'});
                }
            } else {
                done(null, false, { message: '가입되지 않은 회원입니다.' });
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};