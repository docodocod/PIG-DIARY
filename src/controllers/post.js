import {createPost} from "../schema/post.js";

exports.afterUploadImage = (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
};

export async function uploadPost(req, res, next){
    const content=req.body.content;
    const image=req.body.img;
    const UserId=req.user.id;
    try {
        const post = await createPost(content,image,UserId);
        const hashtags = req.body.content.match(/#[^\s#]*/g);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
};