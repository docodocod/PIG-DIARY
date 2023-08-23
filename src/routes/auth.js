import express from "express";
import passport from "passport";
import {isLoggedIn,isNotLoggedIn} from "../middlewares/index.js";
import {join,login,logout} from "../controllers/auth.js";
const router=express.Router();

router.post('/join',isNotLoggedIn,join); //로그인 되어있으면 오류메세지 미들웨어 에러 핸들링 했다는 거군
router.post("/login",isNotLoggedIn,login);
router.get('/logout',isLoggedIn,logout);
router.get("/kakao",passport.authenticate("kakao"));
router.get("/kakao/callback",passport.authenticate("kakao",{
    failureRedirect:"/?error='카카오 로그인 실패",
}),(req,res)=>{
    res.redirect('/');
});

export default router;