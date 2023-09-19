import express from "express";
const router=express.Router();
import {renderMain} from "../controllers/index.js";

router.get('/',renderMain); //메인 페이지 이동



export default router;