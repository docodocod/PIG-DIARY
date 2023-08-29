import {Delete,Insert} from "../modules/maria.js";
import sql from "mysql";
export async function deleteChat(roomId){
    const query=`delete from chatting where=${roomId}`;
    const result=Delete(query);
    return result;
}

export async function createChat(room,user,chat,gif,createAt){
    const query=`insert into chatting (room,user,chat,igf,createAt) values(${sql.escape(room)},${sql.escape(user)}
                ,${sql.escape(chat)},${sql.escape(gif)},${sql.escape(createAt)})`;
    const result=Insert(query);
    return result;
};