const maria = require('mysql');
require('dotenv').config();
const conn =maria.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements:true,
});
console.log("maria db 접속 성공");
module.exports=conn;
