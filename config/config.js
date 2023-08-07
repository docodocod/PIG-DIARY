require('dotenv').config();

const development = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port:3306,
    dialect: "mysql",
    //port: env.MYSQL_PORT
};

const production = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port:3306,
    dialect: "mysql",
    //port: env.MYSQL_PORT
};

const test = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port:3306,
    dialect: "mysql",
    //port: env.MYSQL_PORT
};

module.exports = { development, production, test };
























