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

/* 채팅방 */
//채팅 목록 불러오기
router.get('/',isLoggedIn,renderRoom);

//채팅방 생성
router.post('/create',createRoom);

//채팅방 입장
router.get('/:id', enterRoom); //방 입장

//채팅방 제거
router.delete('/:id/remove',removeRoom);


/* 채팅 */
//채팅 전송
router.post('/:id/chat',sendChat);

//채팅 이미지 전송
router.post('/:id/img', upload.single('image'), sendImg);


module.exports = router;