const User=require("../models/user.js");
const crypto=require('crypto');
const dotenv=require('dotenv');
const passport=require('passport');
const jwt=require("jsonwebtoken");
const nodeMailer=require("nodemailer");
const {sendEmail}=require('../utils/emailSender');
const {pbkdf2}=require("../utils/encrypt");
dotenv.config();

//회원가입
exports.join=async(req,res,next)=>{
    const {email,nick,password}=req.body;
    try {
        const exUser = await User.findOne({where: {email}});
        if (exUser) {
            return res.redirect("/join?error=아이디가 존재 합니다");
        }
        const hashedPassword = pbkdf2(password);
        await User.create({
            email,
            nick,
            password: hashedPassword,
        });
        res.redirect("/");
    }catch(error){
        console.error(error);
        return next(error);
    }
};

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

//회원탈퇴
exports.unregister=async (req,res,next)=>{
    await User.destroy({where:{id:req.user.id}});
    res.redirect('/');
}

//비밀번호 찾기
exports.passwordFind=async(req,res)=> {
    const userEmail = req.body.email;

    // 이메일이 데이터베이스에 있는지 확인
    const user = await User.findOne({where: {email: userEmail}});

    if (!user) {
        return res.status(404).send('해당 이메일로 가입된 사용자를 찾을 수 없습니다.');
    }
    const newPassword = Math.random().toString(36).slice(-8);
    const hashedPassword=pbkdf2(newPassword);
    try {
        await User.update({password: hashedPassword}, {where: {email: userEmail}});
        console.log("비밀번호 업데이트 성공");
    }catch(err){
        console.log(err);
    }
    // 비밀번호를 업데이트하고 이메일로 전송
    sendEmail(userEmail, newPassword);
    res.send('새로운 비밀번호가 이메일로 전송되었습니다.');
}

//비밀번호 초기화
exports.passwordInit=async(req,res)=>{
    const userId=req.body.id;
    const password=req.body.password;
    const newPassword=pbkdf2(password);
    await User.update({password:newPassword},{where:{id:userId}});
    res.redirect("/");
}

//로그아웃
exports.logout = (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
};
