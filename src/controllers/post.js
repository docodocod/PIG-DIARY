import {createPost} from "../dao/post.js";
import {postInsert} from "../modules/maria.js";

export async function post(req,res,next){
    try {
        const {title, content, writer, uploadFile} = req.body;
        const query = createPost(title, content, writer, uploadFile);
        const result = postInsert(query);
        return result;
        res.send("게시글 작성 성공");
    }catch(error){
        console.log(error);
    }
}