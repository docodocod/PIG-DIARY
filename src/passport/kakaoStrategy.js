const passport=require('passport');
const KakaoStrategy=require('passport-kakao').Strategy;


module.exports=()=>{
    passport.use(new KakaoStrategy({
        clientId:process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    }));
};

