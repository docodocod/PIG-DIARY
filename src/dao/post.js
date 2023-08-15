import sql from "mysql";
import

export async function createPost(title,content,writer,uploadFile){
    let query=`insert into post (title,content,writer,uploadFile) values(${sql.escape(title)},${sql.escape(content)},${sql.escape(writer)}
,${sql.escape(uploadFile)}`;
    return query;
}