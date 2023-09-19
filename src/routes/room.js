import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {removeRoom} from "../service/roomDelete.js";
import {
    renderRoom, renderMainRoom, createRoom, enterRoom, sendChat, sendGif
} from "../controllers/room.js";

const router = express.Router();

router.get('/', renderMainRoom); //채팅방 목록

router.get('/room', renderRoom); //채팅방 생성창

router.post('/addRoom', createRoom); //채팅방 생성

router.get('/room/:id', enterRoom); //채팅방

router.delete('/room/:id', removeRoom); //채팅방 제거

router.post('/room/:id/chat', sendChat); //채팅 전송

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
router.post('/room/:id/gif', upload.single('gif'), sendGif);

export default router;