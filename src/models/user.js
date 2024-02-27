const Sequelize=require("sequelize");
class User extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            //이메일
            email: {
                type: Sequelize.STRING(40),
                allowNull: true,
                unique: true,
            },
            //닉네임
            nick: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            //비밀번호
            password: {
                type: Sequelize.STRING(500),
                allowNull: true,
            },
            //제공자(소셜로그인)
            provider: {
                type: Sequelize.STRING(30),
                allowNull: false,
                defaultValue: 'local',
            },
            //소셜 아이디
            snsId: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            //프로필 이미지
            profileImg:{
                type: Sequelize.STRING(100),
                allowNull:true,
            }
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
        db.User.hasMany(db.User);
        db.User.hasMany(db.Favorite);
        db.User.hasMany(db.Comment);
        db.User.hasMany(db.Room);
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
}

module.exports=User;