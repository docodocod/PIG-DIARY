import User from "../models/user.js";
import Post from "../models/post.js";
import Hashtag from "../models/hashtag.js";

exports.renderMain=async(req, res, next)=>{
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: ['email', 'nick'],
            },
            order: [['createdAt', 'DESC']],
        });
        res.render('main', {
            title: 'NodeBird',
            twits: posts,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

exports.renderHashtag=async(req, res, next)=>{
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