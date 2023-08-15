// const mariadb=require('../modules/maria.js');
// import bcrypt from "bcrypt";
import sql from "mysql";


/*
module.exports=(req,res)=>{
    const {email,password}=req.body;

    const result=mariadb.getSelection(query);
    return result;
}
*/
/*
*
* controller > service > dao > service > controller
* 질문
* 없습니다. 이거 활용해서 api 호출까지 지금 해봐
* 넵..
* */

export function getUserData(email){
    let query = `select email,password from user where email=${sql.escape(email)}`;
    console.log(query);
    return query;
};

export function postUserJoin(email,nick,password){
    let query=`insert into user (email,nick,password) values(${sql.escape(email)},${sql.escape(nick)},${sql.escape(password)})`;
    console.log(query);
    return query;
};

export function getUserLogin(email,password){
    let query=`select email,nick from user where email=${sql.escape(email)} and password=${sql.escape(password)}`;
    console.log(query);
    return query;
}

export function getUserProfile(email){
    let query=`select email,nick from user where email=${sql.escape(email)}`;
    console.log(query);
    return query;
};
