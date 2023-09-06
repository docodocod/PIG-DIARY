import express from 'express';
const router = express.Router();
import {createRoom, renderMainRoom, renderRoom ,enterRoom,sendChat} from "../controllers/room.js";


router.get('/',renderRoom);
router.post('/',createRoom);
router.get('/:id', enterRoom);
router.post('/:id/chat',sendChat);

export default router;