const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const {
    renderProfile, renderJoin, renderMain, renderHashtag,renderLogin,renderSearch,renderSearchPage,getSearchContent
} = require('../controllers/index.js');
const {renderChat} = require("../controllers");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.followerCount = req.user?.Followers?.length || 0;
    res.locals.followingCount = req.user?.Followings?.length || 0;
    res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
    next();
});

router.get('/profile', isLoggedIn, renderProfile);

router.get('/join', isNotLoggedIn, renderJoin);

router.get('/main', renderMain);

router.get('/',renderLogin);

router.get("/search",renderSearch)

router.post('/searchPage',renderSearchPage);

router.get('/chat',renderChat);

router.get('/hashtag', renderHashtag);

router.get('/test',(req,res)=>{
    res.render('test');
})
router.get("/kakaoMap",function(req,res){
    res.render("kakaoMap",{title:"kakaoMap"});
})

try {
    fs.readdirSync('uploads');
} catch (err) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}
module.exports = router;