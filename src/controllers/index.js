const User=require("../models/user.js");
const Post=require("../models/post.js");
const Upload=require('../models/upload');
const Hashtag=require("../models/hashtag.js");
const Comment=require('../models/comment');
const dotenv=require('dotenv');
dotenv.config();

exports.renderProfile = (req, res) => {
    res.render('profile', { title: '내 정보 - NodeBird' });
};

exports.renderJoin = (req, res) => {
    res.render('join', { title: '회원가입 - NodeBird' });
};
exports.renderChat=(req,res)=>{
    res.render('chat',{title:"chat"});
}

exports.renderLogin=(req,res)=>{
    res.render("login",{title:"login"});
}

exports.renderSearchPage=(req,res)=>{
    const searchWord=req.body.searchWord;
    const userId=req.user.id;
    console.log("searchWord:"+searchWord);
    res.render("kakaoMap",{
        title: "지도",
        searchWord: searchWord,
        userId:userId
    });
}

exports.renderSearch=(req,res)=>{
    res.render("search",{
        userId:req.user.id
    });
}

exports.renderMain=async(req, res, next)=>{ //메인 페이지에서 정보 불러올 메서드
    try {
        const posts = await Post.findAll({ //해당 유저가 가지고 있는 게시글들을 담아줍니다.
            include: [{
                model: User,
                attributes: ['id', 'nick','profileImg'],
            },{
                model:User,
                attributes:['id','nick'],
                as:"Liker",
            },{
                model:Comment,
                attributes:['writer','comment'],
            },{
                model:Upload,
                attributes:["files","PostId"],
            }],
            order: [['createdAt', 'DESC']],
        });
        res.render("main",{
            feeds:posts,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.renderHashtag=async(req, res, next)=>{//
    const query = req.query.hashtag;
    if (!query) {
        return res.redirect('/');
    }
    try {
        const hashtag = await Hashtag.findOne({ where: { title: query } });
        let posts = [];
        if (hashtag) {
            posts = await hashtag.getPosts({ include: [{ model: User }] });
        }
        return res.render('main', {
            title: `${query} | PIG DIARY`,
            twits: posts,
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
};