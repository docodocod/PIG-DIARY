const express=require('express');
const {renderChatBot, sendChatBot} = require("../controllers/chatBot");
const router=express.Router();

//챗봇 바로가기
router.get('/chat',renderChatBot);

//챗봇 대화하기
router.post('/chat',sendChatBot);

module.exports=router;