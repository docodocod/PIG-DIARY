import {Router} from "express";
import mariadb from "./modules/maria";


const router = Router();


router.use((req, res, next) => {
    res.locals.user = null;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followerIdList = [];
    next();
});

router.get('/profile', async (req, res,email) => {
    const user=`select email,nick from user where email=${email}`;
    const result = await mariadb.getSelection(user);
    res.render("회원 정보:",result);
});

router.get('/', (req, res, next) => {
    const twits = [];
    res.render('main', {
        title: 'NodeTwitter',
        twits,
    });
});


export default router;