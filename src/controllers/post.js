import {createPost} from "../dao/post.js";
import {Insert} from "../modules/maria.js";

export async function post(req,res,next){
    try {
        const {title, content, writer, uploadFile} = req.body;
        const query = createPost(title, content, writer, uploadFile);
        const result = Insert(query);
        return result;
        res.status(200).json(result);
    }catch(error){
        console.log(error);
    }
}