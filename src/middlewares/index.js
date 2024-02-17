exports.isLoggedIn=(req, res, next)=>{
    if (req.isAuthenticated()) { //로그인이 되어있다면
        next(); //돌아가서 다음 함수 실행
    } else {
        res.redirect('/'); //로그인이 되어 있지 않다면
    }
};

exports.isNotLoggedIn=(req, res, next)=>{
    if (!req.isAuthenticated()) { //로그인이 되어있지 않다면
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/main`);
    }
};