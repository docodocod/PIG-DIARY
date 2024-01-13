const Sequelize=require("sequelize");
class Favorite extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            placeName: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true,
            },
            roadAddressName: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            addressName: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            phone: {
                type:Sequelize.STRING(50),
                allowNull:true,
            },
        }, {
            sequelize,
            timestamps: true, //createAt 생성
            underscored: false, //카멜케이스로 생성
            modelName: 'Favorite', // 프로젝트상 네임
            tableName: 'favorites', // db 생성 이름
            paranoid: true, //테이블 삭제시 기록 여부
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    };
    static associate(db) {
        db.Favorite.belongsTo(db.User);
    };
}
module.exports=Favorite;