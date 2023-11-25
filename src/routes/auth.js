const express=require("express");
const passport=require("passport");
const {isLoggedIn,isNotLoggedIn}=require("../middlewares/index.js");
const {join,login,logout}=require("../controllers/auth.js");
const {renderJoin}=require("../controllers/auth.js");
const user = require("../models/user.js");
const router=express.Router();

router.get('/join',isNotLoggedIn,renderJoin); //회원가입 페이지 이동

router.post('/join',isNotLoggedIn,join); //회원가입

router.post("/login",isNotLoggedIn,login); //로그인

router.get('/logout',isLoggedIn,logout); //로그아웃

router.get("/kakao",passport.authenticate("kakao")); //카카오 로그인
router.get("/kakao/callback",passport.authenticate("kakao",{
    failureRedirect:"/?error='카카오 로그인 실패",
}),(req,res,next)=>{
    return req.login(user,(loginError)=>{
        if(loginError){
            console.log(loginError);
            return next(loginError);
        }
        return res.redirect('/');
    })
});

module.epxorts=router;