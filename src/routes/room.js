const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {isLoggedIn,isNotLoggedIn}=require("../middlewares");
const {
    renderMain, renderRoom, createRoom, enterRoom, removeRoom,sendChat, sendGif,
} = require('../controllers/room.js');

const router = express.Router();

try {
    fs.readdirSync('uploads/chats');
} catch (error) {
    console.error('chats 폴더가 없어 chats 폴더를 생성합니다.');
    fs.mkdirSync('uploads/chats');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/chat');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.get('/',renderRoom); // 채팅방 리스트 호출

router.post('/create',createRoom); // 채팅방 생성

router.get('/:id', enterRoom); //방 입장

router.delete('/:id', removeRoom); //방 퇴장

router.post('/:id/chat',sendChat); //채팅 전송

router.post('/room/:id/gif', upload.single('gif'), sendGif);

module.exports = router;