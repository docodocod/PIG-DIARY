import sql from "mysql";
import {Select,Insert,Update,Delete} from "../modules/maria.js";
export async function getUserData(email){
    let query = `select email,nick,password from user where email=${sql.escape(email)}`;
    const result=await Select(query);
    console.log("result값:",result[0]);
    return result[0];
};

export async function getSnsData(profile_id,provider){
    let query=`select snsId,provider from user where snsId=${sql.escape(profile_id)} and provider=${sql.escape(provider)}`;
    const result=await Select(query);
    console.log(result);
    return result;
}

export async function postUserJoin(email,nick,password){
    let query=`insert into user (email,nick,password) values(${sql.escape(email)},${sql.escape(nick)},${sql.escape(password)})`;
    const result=await Insert(query);
    console.log(result);
    return result;
};

export async function postSnsJoin(email,nick,snsId,provider){
    let query=`insert into user (email,nick,snsId,provider) values(${sql.escape(email)},${sql.escape(nick)},${sql.escape(snsId)},${sql.escape(provider)})`;
    const result=await Insert(query);
    console.log(result);
    return result;
};

export async function getUserLogin(email,password){
    let query=`select email,nick from user where email=${sql.escape(email)} and password=${sql.escape(password)}`;
    const result=await Select(query);
    console.log(result);
    return result;
};
