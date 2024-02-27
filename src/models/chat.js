const Sequelize=require("sequelize");
class Chat extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            user: { //사용자
                type: Sequelize.INTEGER(),
                allowNull:false,
            },
            chat: {//채팅 내용
                type:Sequelize.STRING(200)
            },
            gif: {//사진
                type: Sequelize.STRING(200)
            },
            RoomId: {
                type: Sequelize.INTEGER(),
                allowNull: false,
                references: {
                    model: 'Rooms', // 참조하는 모델
                    key: 'id',      // 참조하는 모델의 기본 키
                }
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
        db.Chat.belongsTo(db.Room, { foreignKey: 'RoomId' }); // 외래 키 설정
        db.Chat.belongsTo(db.User,{foreignKey:"user"});
    }
}
module.exports=Chat;