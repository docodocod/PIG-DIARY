import sql from "mysql";
import {Insert,Select,Delete} from "../modules/maria.js";


export async function createRoomService(id,title,max,owner,password){
    const query=`insert into room (id, title,max,owner,password) values(${sql.escape(id)},${sql.escape(title)},${sql.escape(max)},
                 ${sql.escape(owner)},${sql.escape(password)})`;
    const result=Insert(query);
    return result;
}
export async function selectAllRoom(){
    const query="select title,max,owner from room";
    const result=Select(query);
    return result;
}

export async function selectOneRoom(roomId){
    const query=`select id from room where=${roomId}`;
    const result=Select(query);
    return result;
}

export async function deleteOneRoom(roomId){
    const query=`delete from room where=${roomId}`;
    const result=Delete(query);
    return result;
}