import Sequelize from "sequelize";
const env=process.env.NODE_ENV || "development";
import config from "../../config/config.json" assert { type: "json" };
const configValue=config[env];
import User from "./user.js";
import Post from "./post.js";
import Hashtag from "./hashtag.js";
import Room from "./room.js";
import Chat from "./chat.js";

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
db.Room=Room;
db.Chat=Chat;

User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);
Room.init(sequelize);
Chat.init(sequelize);

User.associate(db);
Post.associate(db);
Hashtag.associate(db);

export default db;