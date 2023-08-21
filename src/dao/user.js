import sql from "mysql";
import mariadb from "./modules/maria.js";
export function getUserData(email){
    let query = `select email,password from user where email=${sql.escape(email)}`;
    const result=mariadb.SELECT(query);
    console.log(result);
    return result;
};

export function postUserJoin(email,nick,password){
    let query=`insert into user (email,nick,password) values(${sql.escape(email)},${sql.escape(nick)},${sql.escape(password)})`;
    const result=mariadb.INSERT(query);
    console.log(result);
    return result;
};

export function getUserLogin(email,password){
    let query=`select email,nick from user where email=${sql.escape(email)} and password=${sql.escape(password)}`;
    const result=mariadb.SELECT(query);
    console.log(result);
    return result;
}

export function getUserProfile(email){
    let query=`select email,nick from user where email=${sql.escape(email)}`;
    const result=mariadb.SELECT(query);
    console.log(result);
    return result;
};
