const Post = require("../models/post.js");
const Hashtag = require("../models/hashtag.js");
const User = require("../models/user");
const Comment = require('../models/comment');
const Upload=require('../models/Upload');


//게시글 업로드
exports.uploadPost = async (req, res, next) => { //게시글 업로드
    try {
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        for(let i=0; i<req.body.url.length; i++){
            await Upload.create({
                files:req.body.url[i],
                postId:post.id,
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

//게시글 이미지 업로드
exports.afterUploadImage = (req, res) => {
    try {
        console.log("파일 이름 : ", req.files);
        const urlArr = [];
        for (let i = 0; i < req.files.length; i++) {
            urlArr.push(`/img/${req.files[i].filename}`);
            console.log(urlArr[i]);
        }
        const jsonUrl = JSON.stringify(urlArr);
        res.json({url: jsonUrl});
    } catch (err) {
        console.error(err);
        res.status(400).send("Error uploding files");
    }
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
    const userId = req.user.id;
    const comment = req.body.comment;
    await Comment.create({
        postId: postId,
        writer: userId,
        comment: comment,
    })
    res.redirect('/');
}

//게시글 좋아요
exports.like = async (req, res, next) => { //좋아요 기능
    try {
        const post = await Post.findOne({where: {id: req.params.id}});
        if (post) {
            await post.addLiker(parseInt(req.user.id, 10));
            res.send('success');
        } else {
            res.status(404).send('no user');
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
            res.send("success");
        } else {
            res.status(404).send("delete fail");
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
}

