const Sequelize=require("sequelize");
class Room extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            //방 개설자
            owner: {
                type: Sequelize.INTEGER(),
                allowNull: false,
                references: {
                    model: 'Users', // 참조하는 모델
                    key: 'id',      // 참조하는 모델의 기본 키
                }
            },
            //상대방
            friend:{
                type:Sequelize.INTEGER(),
                references: {
                    model: 'Users', // 참조하는 모델
                    key: 'id',      // 참조하는 모델의 기본 키
                }
            }
        }, {
            sequelize,
            timestamps: true,
            modelName: 'Room',
            tableName: 'Rooms',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    };

    static associate(db) {
        db.Room.hasMany(db.Chat);
        db.Room.belongsTo(db.User,{foreignKey: 'friend',as:"Friend"});
        db.Room.belongsTo(db.User,{foreignKey: 'owner',as:"Owner"});
    }
}
module.exports=Room;