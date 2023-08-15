import express from "express"
import multer from "multer";
import path from "path";
import fs from "fs";

const {afterUploadImage, uploadPost}=require('../controllers/post');
const {isLoggedIn}=require('../middlewares');

const router=express.Router();

try{
    fs.readdirSync('uploads');
}catch(error){
    console.log('uploads 폴더가 없으므로 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload=multer({
    storage:multer.diskStorage({
        destination(req,file,done){
            done(null,'uploads/');
        },
        filename(req,file,done){
            const ext=path.extname(file.originalname);
            done(null,path.basename(file.originalname,ext)+Date.now()+ext);
        },
    }),
    limits:{fileSize: 5*1024*1024},
});

//POST /post/img
router.post('/img',isLoggedIn,upload.single('img'),afterUploadImage);

//POST /post
const upload2=multer();
router.post('/',isLoggedIn,upload2.none(), uploadPost);

module.exports=router;