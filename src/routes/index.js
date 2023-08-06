import {Router} from "express";
import mysql from "../../mysql.js";


const router = Router();


const data1 = '동안'
const result = await mysql.asyncFunction(`select * from user where 이름 = ${data1}`);

console.log(result);

router.use((req, res, next) => {
    res.locals.user = null;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followerIdList = [];
    next();
});

router.get('/profile', (req, res) => {
    res.render('profile', {title: '내 정보 - NodeTwitter'});
});

router.get('/join', (req, res) => {
    res.render('join', {title: '회원가입 -NodeTwitter'});
});

router.get('/', (req, res, next) => {
    const twits = [];
    res.render('main', {
        title: 'NodeTwitter',
        twits,
    });
});


export default router;