import express from "express";
const router=express.Router();
import {isLoggedIn,isNotLoggedIn} from '../middlewares/index.js';
import {renderMain,renderJoin} from "../controllers/index.js";
import {renderMainRoom, renderRoom} from "../controllers/room.js";

router.get('/join',isNotLoggedIn,renderJoin);
router.get('/',renderMain);
router.get('/roomMain', renderMainRoom);
export default router;