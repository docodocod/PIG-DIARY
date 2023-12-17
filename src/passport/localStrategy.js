const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        try {
            const exUser = await User.findOne({ where: { email } });
            if (exUser) {
                const storedPw=exUser.password;
                const salt = process.env.SALT;
                const iterations = parseInt(process.env.ITERATION);
                const keyLength = 64; // 출력 길이
                //암호화된 비밀번호 비교하기
                crypto.pbkdf2(password, salt, iterations, keyLength, 'sha512', (err, derivedKey) => {
                    if (err) throw err;
                    const hashedPw = derivedKey.toString('hex');
                    console.log('Hashed Password:', hashedPw);
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
                });
            } else {
                done(null, false, { message: '가입되지 않은 회원입니다.' });
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};