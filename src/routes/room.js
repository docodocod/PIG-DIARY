import express from 'express';
const router = express.Router();
import {createRoom, renderMainRoom, renderRoom ,enterRoom} from "../controllers/room.js";


router.get('/',renderRoom);
router.post('/',createRoom);
router.get('/room/:id', enterRoom);

export default router;