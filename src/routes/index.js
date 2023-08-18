import express from "express";
const router=express.Router();
import {join,login,profile} from "../controllers/auth.js";
import {post} from"../controllers/post.js";
import {isLoggedIn,isNotLoggedIn} from '../middlewares/index.js';

router.get("/login",isLoggedIn,login);
router.post("/join",isNotLoggedIn,join);
router.get("/profile/:id", profile);
router.post("/post",post);

router.get('/', (req, res, next) => {
    res.render('main', {
    });
});

module.exports=router;