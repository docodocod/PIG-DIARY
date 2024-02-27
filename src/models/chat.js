const Sequelize=require("sequelize");
class Chat extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            //사용자
            user: {
                type: Sequelize.INTEGER(),
                allowNull:false,
            },
            //채팅 내용
            chat: {
                type:Sequelize.STRING(200)
            },
            //업로드 파일
            gif: {
                type: Sequelize.STRING(200)
            },
            //room.id ref
            RoomId: {
                type: Sequelize.INTEGER(),
                allowNull: false,
                references: {
                    model: 'Rooms',
                    key: 'id',
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
        db.Chat.belongsTo(db.Room, { foreignKey: 'RoomId' });
        db.Chat.belongsTo(db.User,{foreignKey:"user"});
    }
}
module.exports=Chat;