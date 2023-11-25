const express=require("express");
const router=express.Router();
const {renderMain}=require("../controllers/index.js");

router.get('/',renderMain); //메인 페이지 이동


module.exports=router;