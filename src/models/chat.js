const Sequelize=require("sequelize");
class Chat extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            room: { //room 아이디
                type: Sequelize.INTEGER(200),
                allowNull:false,
            },
            user: { //생성자
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
};
module.exports=Chat;