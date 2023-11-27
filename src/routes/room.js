const express=require('express');
const multer=require('multer');
const path=require('path');
const fs=require('fs');
const {removeRoom}=require("../service/roomDelete.js");
const {
    renderRoom,
    renderMainRoom,
    createRoom,
    enterRoom,
    sendChat,
    sendGif
}=require("../controllers/room.js");

const router = express.Router();

router.get('/', renderMainRoom); //채팅방 목록

router.get('/addRoom', renderRoom); //채팅방 생성창

router.post('/addRoom', createRoom); //채팅방 생성

router.get('/:id', enterRoom); //채팅방 입장

router.delete('/:id', removeRoom); //채팅방 제거

router.post('/:id/chat', sendChat); //채팅 전송

try {
    fs.readdirSync('uploads');
} catch (err) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});
router.post('/:id/gif', upload.single('gif'), sendGif);

module.exports=router;