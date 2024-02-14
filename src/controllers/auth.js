const User = require("../models/user.js");
const crypto = require('crypto');
const dotenv = require('dotenv');
const passport = require('passport');
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const {sendEmail} = require('../utils/emailSender');
const {pbkdf2} = require("../utils/encrypt");
dotenv.config();


//로그인
exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/?error=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/main');
        });
    })(req, res, next);
};

//회원가입
exports.join = async (req, res, next) => {
    const {email, nick, password} = req.body;
    try {
        const exUser = await User.findOne({where: {email}});
        if (exUser) {
            return res.status(400).send(
                `<script>
                    alert("아이디가 이미 존재합니다.");
                    window.location.href = '/';
                 </script>
          `);
        }
        const hashedPassword = pbkdf2(password);
        await User.create({
            email,
            nick,
            password: hashedPassword,
        });
        res.redirect("/");
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

//비밀번호 찾기
exports.passwordFind = async (req, res) => {
    const nickName=req.body.nickName;
    const userEmail = req.body.email;
    // 이메일이 데이터베이스에 있는지 확인
    const user = await User.findOne({where: {[Op.and]:[{email: userEmail},{nick: nickName}]}});
    if (!user) {
        return res.status(404).send('해당 이메일로 가입된 사용자를 찾을 수 없습니다.');
    }
    const newPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = pbkdf2(newPassword);
    try {
        await User.update({password: hashedPassword}, {where: {email: userEmail}});
        console.log("비밀번호 업데이트 성공");
    } catch (err) {
        console.log(err);
    }
    // 비밀번호를 업데이트하고 이메일로 전송
    sendEmail(userEmail, newPassword);
    res.send('새로운 비밀번호가 이메일로 전송되었습니다.');
}

//비밀번호 초기화
exports.passwordInit = async (req, res) => {
    const userId = req.user.id
    const password = req.body.currPassword;
    const hashedPassword=pbkdf2(password);
    const user=await User.findOne({where:{id:userId}});
    if(hashedPassword===user.password){
        const changePassword=req.body.changePassword;
        const newPassword = pbkdf2(changePassword);
        await User.update({password: newPassword}, {where: {id: userId}});
        res.send("success");
    }
}

//로그아웃
exports.logout = (req, res) => {
    req.logout(() => {
        res.redirect('/main');
    });
};

//닉네임 수정
exports.nickEdit = async (req, res) => {
    const userId = req.user.id;
    const newNick = req.body.nick;
    await User.update({nick: newNick}, {where: {id: userId}});
    console.log("닉네임 수정완료");
    res.redirect("/");
}

//비밀번호 수정
exports.passwordEdit = async (req, res) => {
    const userId = req.user.id;
    const newPassword = req.body.password;
    const hashedPassword = pbkdf2(newPassword);
    await User.update({password: hashedPassword}, {where: {id: userId}});
    console.log("비밀번호 수정 성공");
    res.redirect("/");
}

//회원탈퇴
exports.unregister = async (req, res, next) => {
    await User.destroy({where: {id: req.user.id}});
    res.redirect('/');
}






