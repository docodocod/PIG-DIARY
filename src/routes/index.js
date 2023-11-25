const express=require("express");
const router=express.Router();
const {renderMain}=require("../controllers/index.js");
const {renderJoin} = require("../controllers");

router.get('/',renderMain); //메인 페이지 이동
router.get('/join',renderJoin) //회원가입창 이동



module.exports=router;