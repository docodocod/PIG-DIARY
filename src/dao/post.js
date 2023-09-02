import sql from "mysql";
import {Select,Insert,Update,Delete} from "../modules/maria.js";

export async function createPost(content,img,UserId){
    let query=`insert into post (content,img,UserId) values(${sql.escape(content)},${sql.escape(img)},${sql.escape(UserId)})`;
    const result=await Select(query);
    console.log(result);
}

export async function deletePost(post_id){
    let query= `delete from post where id=${sql.escape(post_id)}`;
    const result=await Delete(query);
    console.log(result);
}