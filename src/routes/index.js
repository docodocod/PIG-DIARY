import express from "express";
const router=express.Router();
import {isLoggedIn,isNotLoggedIn} from '../middlewares/index.js';

router.get("/login",isLoggedIn);


router.get('/');

export default router;