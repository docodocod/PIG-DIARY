const Sequelize=require("sequelize");
const env=process.env.NODE_ENV || "development";
const config=require("../../config/config.json");
const configValue=config[env];
const User=require("./user.js");
const Post=require("./post.js");
const Hashtag=require("./hashtag.js");
const Room=require("./room.js");
const Chat=require("./chat.js");

const db={};
const sequelize=new Sequelize(
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

module.exports=db;