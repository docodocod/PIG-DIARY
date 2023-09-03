import express from 'express';
const router = express.Router();
import {createRoom, renderMainRoom, renderRoom} from "../controllers/room.js";


router.get('/', renderMainRoom);
router.get('/create',renderRoom);
router.post('/create',createRoom);

export default router;