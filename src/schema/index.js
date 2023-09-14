import {Sequelize} from "sequelize";
import fs from "fs";
import path from "path";
const env = process.env.NODE_ENV || 'development';
const config = require("../config/config.json")[env];

const db = {};
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
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