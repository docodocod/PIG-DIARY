const express=require("express");
const passport=require("passport");
const {isLoggedIn,isNotLoggedIn}=require("../middlewares/index.js");
const {
    join,login,logout,loginTest,unregister,passwordFind,passwordInit,passwordEdit
}=require("../controllers/auth.js");
const router=express.Router();


/*회원가입 관련*/

//로그인
router.post("/login",isNotLoggedIn,login);

//회원가입
router.post('/join',isNotLoggedIn,join);

//카카오 로그인
router.get("/kakao",passport.authenticate("kakao"));

//구글 로그인
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

//네이버 로그인
router.get('/naver', passport.authenticate('naver', { authType: 'reprompt' }));

//로그아웃
router.get('/logout',isLoggedIn,logout);


/* 회원 */

//회원탈퇴
router.get("/unregister",isLoggedIn,unregister);

//비밀번호 찾기
router.post("/findPassword",passwordFind);

//비밀번호 재설정
router.post("/passwordInit",passwordInit);

//비밀번호 수정
router.post("/passwordEdit",isLoggedIn,passwordEdit);

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/?error=카카오로그인 실패',
}), (req, res) => {
    res.redirect('/main');
});

router.get(
    '/google/callback', passport.authenticate('google', { failureRedirect: '/?error=구글 로그인 실패' }),
    (req, res) => {
        res.redirect('/main');
    },
);

router.get(
    '/naver/callback', passport.authenticate('naver', { failureRedirect: '/?error=네이버 로그인 실패' }),
    (req, res) => {
        res.redirect('/main');
    },
);

module.exports=router;