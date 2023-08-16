import sql from "mysql";
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

    return query;
}

export function getUserProfile(email){
    let query=`select email,nick from user where email=${sql.escape(email)}`;

    return query;
};
