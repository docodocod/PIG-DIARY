import express from 'express';
const path = require('path');
const fs = require('fs');

const {
    renderMain, renderRoom, createRoom, enterRoom, removeRoom, sendChat, sendGif,
} = require('../controllers');

const router = express.Router();

router.get('/', renderMain);

router.get('/room', renderRoom);

router.post('/room', createRoom);

router.get('/room/:id', enterRoom);

router.delete('/room/:id', removeRoom);

router.post('/room/:id/chat', sendChat);