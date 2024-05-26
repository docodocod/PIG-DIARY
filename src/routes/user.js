const express = require('express');
const { isLoggedIn } = require('../middlewares');
const { follow,unfollow,addFavorite,removeFavorite,favoriteList,aroundMyList,getMyProfile,previewMyImg,changeNick,saveProfileImg,introduce } = require('../controllers/user');
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const router = express.Router();

try {
    fs.readdirSync('uploads/profiles');
} catch (error) {
    console.error('profiles 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads/profiles');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/profiles');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

/* 팔로잉 */
//팔로우 하기
router.post('/:id/follow', isLoggedIn, follow);

//팔로우 끊기
router.delete('/:id/unfollow',isLoggedIn,unfollow);


/* 맛집 리스트 */
//맛집 리스트 저장
router.post('/:id/addFavorite',isLoggedIn,addFavorite);

//맛집 리스트 삭제
router.delete('/:id/removeFavorite',isLoggedIn,removeFavorite);

//내가 저장한 맛집 찾기
router.get("/:id/favoriteList",isLoggedIn,favoriteList);

//내 주변 맛집 찾기
router.post("/:id/aroundMyList",isLoggedIn,aroundMyList);


/*유저 부가 정보 */
//마이 프로필 들어가기
router.get("/:id/myProfile",isLoggedIn,getMyProfile);

//프로필 이미지 미리보기
router.post("/previewMyImg",upload.single('img'),previewMyImg);

//프로필 이미지 변경하기
router.post('/saveProfileImg',saveProfileImg);

//닉네임 변경
router.post("/changeNick",changeNick)

//한줄 자기 소개
router.post('/changeIntroduce',introduce);

module.exports = router;