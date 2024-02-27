const Sequelize=require("sequelize");
const env=process.env.NODE_ENV || "development";
const config=require("../../config/config.js")[env];
const User=require('../models/user');
const Post=require('../models/post');
const Hashtag=require('../models/hashtag');
const Room=require('../models/room');
const Chat=require('../models/chat')
const Upload=require('../models/upload');
const Favorite=require('../models/favorite');
const Comment=require('../models/comment');
const Test=require('../models/test');

const db={};
const sequelize=new Sequelize(
        config.database,
        config.username,
        config.password,
        config,
);

db.sequelize=sequelize;
db.User=User;
db.Post=Post;
db.Hashtag=Hashtag;
db.Room=Room;
db.Chat=Chat;
db.Upload=Upload;
db.Favorite=Favorite;
db.Comment=Comment;
db.Test=Test;

User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);
Upload.init(sequelize);
Room.init(sequelize);
Chat.init(sequelize);
Favorite.init(sequelize);
Comment.init(sequelize);
Test.init(sequelize);

User.associate(db);
Post.associate(db);
Hashtag.associate(db);
Room.associate(db);
Upload.associate(db);
Chat.associate(db);
Favorite.associate(db);
Comment.associate(db);
Test.associate(db);

module.exports=db;