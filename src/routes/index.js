import express from "express";
const router=express.Router();
import {isLoggedIn,isNotLoggedIn} from '../middlewares/index.js';
import {renderMain,renderJoin} from "../controllers/index.js";
import {renderMainRoom, renderRoom} from "../controllers/room.js";

router.get('/join',isNotLoggedIn,renderJoin); //회원가입 페이지 이동
router.get('/',renderMain); //메인 페이지 이동
router.get('/roomMain', renderMainRoom); //채팅방 페이지 이동
export default router;