const Sequelize=require("sequelize");
class Hashtag extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: { //해시태그 글
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Hashtag',
            tableName: 'hashtags',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    };
    static associate(db) {
        db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
    };
}

module.exports=Hashtag;