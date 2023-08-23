import express from "express";
const router=express.Router();
import {post} from"../controllers/post.js";
import {isLoggedIn,isNotLoggedIn} from '../middlewares/index.js';

router.get("/login",isLoggedIn);
router.post("/join",isNotLoggedIn);

router.get('/', (req, res, next) => {
    res.render('main', {
    });
});

export default router;