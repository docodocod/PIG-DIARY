import Sequelize from "sequelize";
class Chat extends Sequelize.Model {
    static initiate(sequelize) {
        Chat.init({
            room: {
                type: Sequelize.INTEGER(200),
                allowNull:false,
            },
            user: {
                type: Sequelize.STRING(200),
                allowNull:false,
            },
            chat: {
                type:Sequelize.STRING(200)
            },
            gif: {
                type: Sequelize.STRING(200)
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Room',
            tableName: 'Rooms',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    };
};
export default Chat;