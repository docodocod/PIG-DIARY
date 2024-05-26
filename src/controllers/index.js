const User = require("../models/user.js");
const Post = require("../models/post.js");
const Upload = require('../models/upload');
const Hashtag = require("../models/hashtag.js");
const Comment = require('../models/comment');
const dotenv = require('dotenv');
const {formatDate}=require("../utils/dateFormat");
const {Op} = require("sequelize");
const axios=require('axios');
dotenv.config();

//로그인 창 가기
exports.renderLogin = (req, res) => {
    res.render("login", {title: "login"});
}

//카카오맵 검색
exports.renderSearchPage = (req, res) => {
    const searchWord = req.body.searchWord;
    const userId = req.user.id;
    console.log("searchWord:" + searchWord);
    res.render("kakaoMap", {
        title: "지도",
        searchWord: searchWord,
        userId: userId
    });
}

//맛집 검색 페이지 가기
exports.renderSearch = (req, res) => {
    res.render("search", {
        userId: req.user.id
    });
}

//모든 피드 불러오기
exports.renderMain = async (req, res, next) => { //메인 페이지에서 정보 불러올 메서드
    try {
        const posts = await Post.findAll({ //해당 유저가 가지고 있는 게시글들을 담아줍니다.
            include: [{
                model: User,
                attributes: ['id', 'nick', 'profileImg'],
            }, {
                model: User,
                attributes: ['id', 'nick'],
                as: "Liker",
            }, {
                model: Comment,
                attributes: ['id', 'comment', 'createdAt'],
                include: [{
                    model: User,
                    attributes: ['id', 'nick','profileImg'],
                }]
            }, {
                model: Upload,
                attributes: ['fileName', 'PostId'],
            }],
            order: [['createdAt', 'DESC']],
        });
        const transformedPosts = posts.map(post => {
            return {
                ...post.toJSON(),
                createdAt: formatDate(post.createdAt),
            };
        });
        res.render("main", {
            feeds: transformedPosts,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

//해시태그 검색
exports.renderHashtag = async (req, res, next) => {
    const query = req.query.hashtag;
    console.log(query);
    if (!query) {
        return res.redirect('/');
    }
    try {
        const hashtag = await Hashtag.findOne({
            where: {title: query}
        });
        let posts = [];
        if (hashtag) {
            posts = await hashtag.getPosts({
                include: [{
                    model: User,
                    attributes: ['id', 'nick', 'profileImg'],
                }, {
                    model: User,
                    attributes: ['id', 'nick'],
                    as: "Liker",
                }, {
                    model: Comment,
                    attributes: ['id', 'comment', 'createdAt'],
                    include: [{
                        model: User,
                        attributes: ['id', 'nick', 'profileImg'],
                    }]
                }, {
                    model: Upload,
                    attributes: ['fileName', 'PostId'],
                }],
                order: [['createdAt', 'DESC']],
            })
            return res.render('main', {
                feeds: posts,
            });
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

exports.getWeatherInfo=async(req,res,next)=>{
    const {lat,lng}=req.query;
    const apiKey = process.env.weather_api_key;
    const lang = "kr";
    const units="metric"
    const url=`https://api.openweathermap.org/data/2.5/\weather?lat=${lat}&lon=${lng}&appid=${apiKey}&lang=${lang}&units=${units}`
    try {
        const response=await axios.get(url);
        res.json(response.data);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Error fetching weather data' });
    }
};
