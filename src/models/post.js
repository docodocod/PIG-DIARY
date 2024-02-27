const Sequelize=require("sequelize");
class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title:{
                type:Sequelize.STRING(140),
                allowNull:false,
            },
            content: {
                type: Sequelize.STRING(500),
                allowNull: false,
            },
            likeCount:{
                type:Sequelize.INTEGER(),
                allowNull:true,
            },
            viewCount:{
                type:Sequelize.INTEGER(),
                allowNull:true,
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Upload);
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'});
        db.Post.belongsToMany(db.User,{through: "Like", as: "Liker"});
    }
}
module.exports=Post;