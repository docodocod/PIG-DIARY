const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { afterUploadImage, uploadPost,postDelete,like,unlike,postReply,getLike} = require('../controllers/post');
const { isLoggedIn } = require('../middlewares');

const router = express.Router();

try {
    fs.readdirSync('uploads/posts');
} catch (error) {
    console.error('posts 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads/posts');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/posts');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

// POST /post/img
router.post('/:id/img', isLoggedIn, upload.single('ima',10), afterUploadImage);

// POST /post
const upload2 = multer();

//포스트 업로드
router.post('/', isLoggedIn, upload2.none(), uploadPost);

//좋아요 기능
router.post('/:id/like',isLoggedIn,like);

router.get("/:id/like",isLoggedIn,getLike);

//좋아요 해제
router.delete('/:id/unlike',isLoggedIn,unlike);

//게시글 삭제
router.delete('/:id/delete',isLoggedIn,postDelete);

//댓글 달기
router.post('/:id/reply',isLoggedIn,postReply);

module.exports = router;