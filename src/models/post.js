const Sequelize=require("sequelize");
class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            //피드 제목
            title:{
                type:Sequelize.STRING(140),
                allowNull:false,
            },
            //피드 내용
            content: {
                type: Sequelize.STRING(500),
                allowNull: false,
            },
            //좋아요 수
            likeCount:{
                type:Sequelize.INTEGER(),
                allowNull:true,
            },
            //조회 수
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