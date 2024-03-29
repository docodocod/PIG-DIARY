const Sequelize=require("sequelize");
class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            //작성자
            writer:{
                type:Sequelize.INTEGER(),
                allowNull:false,
            },
            //댓글
            comment: {
                type: Sequelize.STRING(140),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Comment',
            tableName: 'comments',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.Comment.belongsTo(db.Post);
        db.Comment.belongsTo(db.User,{foreignKey:"writer"});
    }
}

module.exports=Comment;