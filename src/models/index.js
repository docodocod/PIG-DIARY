import {Sequelize} from "sequelize";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
const env = process.env.NODE_ENV || 'development';
const Config = dotenv.config({ path: "./config/.env.app" }).parsed;

const db = {};
const sequelize = new Sequelize(
    Config.DB_DATABASE, Config.DB_USER, Config.DB_PASSWORD, Config,
);

db.sequelize = sequelize;

const basename = path.basename(__filename);
fs
    .readdirSync(__dirname) // 현재 폴더의 모든 파일을 조회
    .filter(file => { // 숨김 파일, index.js, js 확장자가 아닌 파일 필터링
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => { // 해당 파일의 모델 불러와서 init
        const model = require(path.join(__dirname, file));
        console.log(file, model.name);
        db[model.name] = model;
        model.initiate(sequelize);
    });

Object.keys(db).forEach(modelName => { // associate 호출
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

export default db;