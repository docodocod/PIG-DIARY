import express from "express";
const router=express.Router();
import {isLoggedIn,isNotLoggedIn} from '../middlewares/index.js';
import {renderMain,renderJoin} from "../controllers/index.js";

router.get('/join',isNotLoggedIn,renderJoin);
router.get('/',renderMain);
router.get("/room",isNotLoggedIn,renderRoom);
export default router;