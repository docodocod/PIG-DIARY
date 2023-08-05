const maria = require('mysql');
const conn =maria.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'answlrl1',
    database: 'nodetwitter'
});
console.log("maria db 접속 성공");
module.exports=conn;
