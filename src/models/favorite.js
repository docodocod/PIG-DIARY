const Sequelize=require("sequelize");
class Favorite extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            //가게 이름
            placeName: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true,
            },
            //도로명 주소
            roadAddressName: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            //지번 주소
            addressName: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            //핸드폰 번호
            phone: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            //가게 홈페이지(kakao)
            placeUrl:{
                type:Sequelize.STRING(200),
                allowNull:true,
            },
            //위도
            lat:{
                type:Sequelize.FLOAT(40),
                allowNull:false,
            },
            //경도
            lng:{
                type:Sequelize.FLOAT(40),
                allowNull:false,
            },
        }, {
            sequelize,
            timestamps: true, //createAt 생성
            underscored: false, //카멜케이스로 생성
            modelName: 'Favorite', // 프로젝트상 네임
            tableName: 'favorites', // db 생성 이름
            paranoid: false, //테이블 삭제시 기록 여부
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    };
    static associate(db) {
        db.Favorite.belongsTo(db.User);
    };
}
module.exports=Favorite;