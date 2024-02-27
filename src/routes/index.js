const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const {renderMain, renderHashtag,renderLogin,renderSearch,renderSearchPage} = require('../controllers/index.js');
const {renderChat} = require("../controllers");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

//고정된 값
router.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.followerCount = req.user?.Followers?.length || 0;
    res.locals.followingCount = req.user?.Followings?.length || 0;
    res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
    next();
});

//메인 페이지
router.get('/main', renderMain);

//로그인 페이지
router.get('/',renderLogin);

//맛집 검색 페이지
router.get("/search",renderSearch)

//맛집 검색 하기
router.post('/searchPage',renderSearchPage);

//해시태그 검색
router.get('/hashtag', renderHashtag);

//테스트 경로
router.get('/test',(req,res)=>{
    res.render('test');
})

try {
    fs.readdirSync('uploads');
} catch (err) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}


module.exports = router;