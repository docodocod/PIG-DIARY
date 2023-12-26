const Sequelize=require("sequelize");
class User extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            email: {
                type: Sequelize.STRING(40),
                allowNull: true,
                unique: true,
            },
            nick: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(500),
                allowNull: true,
            },
            provider: {
                type: Sequelize.ENUM('local', 'kakao'),
                allowNull: false,
                defaultValue: 'local',
            },
            snsId: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true, //createAt 생성
            underscored: false, //카멜케이스로 생성
            modelName: 'User', // 프로젝트상 네임
            tableName: 'users', // db 생성 이름
            paranoid: true, //테이블 삭제시 기록 여부
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    };
    static associate(db) {
        db.User.hasMany(db.Post);
        db.User.belongsToMany(db.User, {
            foreignKey: 'followingId',
            as: 'Followers',
            through: 'Follow',
        });
        db.User.belongsToMany(db.User, {
            foreignKey: 'followerId',
            as: 'Followings',
            through: 'Follow',
        });
        db.User.belongsToMany(db.Post,{through: "like"});
    };
};

module.exports=User;