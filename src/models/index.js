import Sequelize from "sequelize";
import fs from "fs";
import path, {join} from "path";
const env = process.env.NODE_ENV || 'development';
import Config from '../../config/config.json' assert { type: "json" };
const configValue = Config[env];
import { fileURLToPath } from 'url'; //es모듈에서는 __filename을 사용할 수 없기에 url npm 사용
const __filename = fileURLToPath(import.meta.url);
const excludedFiles = ['index.js'];

const db = {};
export const sequelize = new Sequelize(
    configValue.database,
    configValue.username,
    configValue.password,
    configValue
);

db.sequelize = sequelize;

    const files = fs.readdirSync("file:\\C:\\workspace\\node_twitter\\src\\models\\");
    const modelImports = files
        .filter((file) => {
            return (
                file !== __filename &&
                !excludedFiles.includes(file) &&
                file.endsWith('.js')
            );
        })
        .map(async (file) => {
            const modulePath = join("file:\\C:\\workspace\\node_twitter\\src\\models\\", file);
            const model= await import(modulePath);
            console.log(file, model.name);
            db[model.name] = model;
            model.initiate(sequelize); // sequelize에 대한 적절한 설정이 필요합니다.
        });

Object.keys(db).forEach(modelName => { // associate 호출
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

export default db;