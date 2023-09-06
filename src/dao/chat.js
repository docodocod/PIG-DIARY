import {Delete,Insert} from "../modules/maria.js";
import sql from "mysql";
export async function deleteChat(roomId){
    const query=`delete from chatting where=${roomId}`;
    const result=Delete(query);
    return result;
}

export async function createChat(roomId,user,chat){
    const query=`insert into chatting (roomId,user,chat) values(${sql.escape(roomId)},${sql.escape(user)},${sql.escape(chat)})`;
    const result=Insert(query);
    return result;
};

export async function findChat(roomId){
    const query=`select roomId,user,chat,gif,createAt from chatting where roomId=${sql.escape(roomId)}`;
    const result=Insert(query);
    return result;
}