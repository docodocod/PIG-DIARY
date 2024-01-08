const express=require("express");
const passport=require("passport");
const {isLoggedIn,isNotLoggedIn}=require("../middlewares/index.js");
const {join,login,logout,loginTest,unregister}=require("../controllers/auth.js");
const router=express.Router();

router.post('/join',isNotLoggedIn,join); //회원가입

router.get("/loginTest",loginTest);

router.post("/login",isNotLoggedIn,login); //로그인

router.get('/logout',isLoggedIn,logout); //로그아웃

router.get("/unregister",isLoggedIn,unregister); //회원탈퇴

router.get("/kakao",passport.authenticate("kakao")); //카카오 로그인
// GET /auth/kakao/callback
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/?error=카카오로그인 실패',
}), (req, res) => {
    res.redirect('/'); // 성공 시에는 /로 이동
});

module.exports=router;