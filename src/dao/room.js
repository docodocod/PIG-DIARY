import sql from "mysql";
import {Insert,Select,Delete} from "../modules/maria.js";


export function createRoomService(title,max,owner,password){
    const query=`insert into room (title,max,owner,password) values(${sql.escape(title)},${sql.escape(max)},
                 ${sql.escape(owner)},${sql.escape(password)})`;
    const result=Insert(query);
    return result;
}
export function selectAllRoom(){
    const query="select title,max,owner from room";
    const result=Select(query);
    return result;
}
export  function selectOneRoom(roomId){
    const query=`select id,title,max,owner from room where id=${sql.escape(roomId)}`;
    const result= Select(query);
    return result;
}

export function NewRoom(title){
    const query=`select id,title,max,owner from room where title=${sql.escape(title)}`;
    const result=Select(query);
    return result;
}

export function deleteOneRoom(roomId){
    const query=`delete from room where=${roomId}`;
    const result=Delete(query);
    return result;
}