const Post = require("../models/post.js");
const Hashtag = require("../models/hashtag.js");
const User = require("../models/user");
const postUpload = require('../models/upload');
const Comment = require('../models/comment');
const Test=require('../models/test');

exports.test=async(req,res,next)=>{
    try{
        await postUpload.create({
            fileName:"",
        })
        res.send("success");
    }catch(err){
        console.log(err);
    }
}

//피드 업로드
exports.uploadPost = async (req, res, next) => { //게시글 업로드
    try {
        let uploadFiles=req.body.url;

        const post = await Post.create({
            title: req.body.title || "안녕하세요",
            content: req.body.content || "",
            UserId: req.user.id,
        });

        for (var i=0; i<uploadFiles.length; i++){
            await postUpload.create({
                fileName: uploadFiles[i],
                PostId: post.id,
            })
        }
        const hashtags = req.body.content.match(/#[^\s#]*/g);
        if (hashtags) {
            const result = await Promise.all(
                hashtags.map(tag => {
                    return Hashtag.findOrCreate({
                        where: {title: tag.slice(1).toLowerCase()},
                    })
                }),
            );
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/main')
    } catch (error) {
        console.error(error);
        next(error);
    }
};

//피드 이미지 업로드
exports.afterUploadImage = (req, res) => {
    console.log("files:" + req.files);
    console.log("파일 이름 : ", req.files);
    let urlArr = new Array();
    for (let i = 0; i < req.files.length; i++) {
        urlArr.push(req.files[i].filename);
        console.log(urlArr[i]);
    }
    let jsonUrl = JSON.stringify(urlArr);
    res.json(jsonUrl);
};

//게시글 수정
exports.postEdit = async (req, res) => {
    const postId = req.params.id;
    const newContent = req.body.content;
    await Post.update({content: newContent}, {where: {id: postId}});
    res.redirect('/main');
}

//게시글 삭제
exports.postDelete = async (req, res, next) => { //게시글 삭제
    const postId = req.params.id;
    await Post.destroy({
        where: {
            id: postId
        }
    })
    res.send("success");
}

//댓글 달기
exports.postReply = async (req, res, next) => {
    const postId = req.params.id;
    const writerId = req.user.id;
    const comment = req.body.comment;
    console.log("postId:" + postId);
    await Comment.create({
        writer: writerId,
        comment: comment,
        PostId: postId,
    })
    res.send("success");
}
//댓글 삭제
exports.deleteReply = async (req, res, next) => {
    const postId = req.params.id;
    const writerId = req.user.id;
    await Comment.destroy({
        where: {
            writer: writerId,
            PostId: postId
        }
    });
    res.send("success");
}


//게시글 좋아요
exports.like = async (req, res, next) => { //좋아요 기능
    try {
        const post = await Post.findOne({where: {id: req.params.id}});
        if (post) {
            await post.addLiker(parseInt(req.user.id, 10));
            await Post.update({likeCount: post.likeCount + 1}, {where: {id: req.params.id}});
        } else {
            res.send.status(500);
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};


//게시글 좋아요 취소
exports.unlike = async (req, res, next) => { //좋아요 해제 기능
    try {
        const post = await Post.findOne({where: {id: req.params.id}});
        if (post) {
            await post.removeLiker(parseInt(req.user.id, 10));
            await Post.update({likeCount: post.likeCount - 1}, {where: {id: req.params.id}});
            res.send("success");
        } else {
            res.status(404).send("delete fail");
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

