const Sequelize=require("sequelize");
class Chat extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            user: { //사용자
                type: Sequelize.STRING(200),
                allowNull:false,
            },
            chat: {//채팅 내용
                type:Sequelize.STRING(200)
            },
            gif: {//사진
                type: Sequelize.STRING(200)
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Chat',
            tableName: 'Chats',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    };
    static associate(db){
        db.Chat.belongsTo(db.Room,{ foreignKey: 'RoomId' });
    }
}
module.exports=Chat;