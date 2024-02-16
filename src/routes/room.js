const express = require('express');
const multer = require('multer');
const path = require('path');
const {isLoggedIn,isNotLoggedIn}=require("../middlewares");
const {
    renderMain, renderRoom, createRoom, enterRoom, removeRoom,sendChat, sendImg,
} = require('../controllers/room.js');
const {chatShowUploadImage} = require("../controllers/room");
const fs = require("fs");

const router = express.Router();

try {
    fs.readdirSync('uploads/chats');
} catch (err) {
    console.error('uploads/chat 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads/chats');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/chats');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext ) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.get('/',isLoggedIn,renderRoom); // 채팅방 리스트 호출

router.post('/create',createRoom); // 채팅방 생성

router.get('/:id', enterRoom); //방 입장

/*router.delete('/:id', removeRoom); //방 퇴장*/

router.post('/:id/chat',sendChat); //채팅 전송

router.post('/:id/img', upload.single('image'), sendImg);

module.exports = router;