import Sequelize from "sequelize";
const env=process.env.NODE_ENV || "development";
import config from "../../config/config.json" assert { type: "json" };
const configValue=config[env];
import User from "./user.js";
import Post from "./post.js";
import Hashtag from "./hashtag.js";

const db={};
export const sequelize=new Sequelize(
        configValue.database,
        configValue.username,
        configValue.password,
        configValue
);

db.sequelize=sequelize;
db.User=User;
db.Post=Post;
db.Hashtag=Hashtag;

User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);

User.associate(db);
Post.associate(db);
Hashtag.associate(db);

export default db;