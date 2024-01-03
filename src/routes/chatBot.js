const express=require('express');
const {renderChatBot, sendChatBot} = require("../controllers/chatBot");
const router=express.Router();

router.get('/chat',renderChatBot);

router.post('/chat',sendChatBot);

module.exports=router;