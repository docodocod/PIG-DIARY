import Sequelize from "sequelize";
import fs from "fs";
import path, {join} from "path";
const env = process.env.NODE_ENV || 'development';
import Config from '../../config/config.json' assert { type: "json" };
const configValue = Config[env];

import { fileURLToPath } from 'url'; //es모듈에서는 __filename을 사용할 수 없기에 url npm 사용
import { dirname } from 'path';
import express from "express";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const db = {};
const sequelize = new Sequelize(
    configValue.database,
    configValue.username,
    configValue.password,
    configValue
);

db.sequelize = sequelize;
sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

const basename = path.basename(__filename);
fs
    .readdirSync(__dirname) // 현재 폴더의 모든 파일을 조회
    .filter(file => { // 숨김 파일, index.js, js 확장자가 아닌 파일 필터링
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => { // 해당 파일의 모델 불러와서 init
        const modulePath = join(__dirname, file);
        const model = import(modulePath);
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