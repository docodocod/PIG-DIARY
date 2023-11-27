const User=require("../models/user.js");
const Post=require("../models/post.js");
const Hashtag=require("../models/hashtag.js");

exports.renderProfile = (req, res) => {
    res.render('profile', { title: '내 정보 - NodeBird' });
};

exports.renderJoin = (req, res) => {
    res.render('join', { title: '회원가입 - NodeBird' });
};

exports.renderMain=async(req, res, next)=>{ //메인 페이지에서 정보 불러올 메서드
    try {
        const posts = await Post.findAll({ //해당 유저가 가지고 있는 게시글들을 담아줍니다.
            include: {
                model: User,
                attributes: ['email', 'nick'],
            },
            order: [['createdAt', 'DESC']],
        });
        res.render('main', { //메인페이지가 로딩 될때 데이터를 뿌려줍니다.
            title: 'NodeBird',
            twits: posts,
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
            posts = await hashtag.getPost({ include: [{ model: User }] });
        }
        return res.render('main', {
            title: `${query} | NodeBird`,
            twits: posts,
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
};