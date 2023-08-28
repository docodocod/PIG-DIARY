import sql from "mysql";
import {Insert,Select} from "../modules/maria.js";


export async function createRoom(title,max,owner,password){
    const query=`insert into room (title,max,owner,password) values(${sql.escape(title)},${sql.escape(max)},
                 ${sql.escape(owner)},${sql.escape(password)})`;
    const result=Insert(query);
    return result;
}
export async function selectAllRoom(){
    const query="select title,max,owner from room";
    const result=Select(query);
    return result;
}