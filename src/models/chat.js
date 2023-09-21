import Sequelize from "sequelize";
class Chat extends Sequelize.Model {
    static initiate(sequelize) {
        Chat.init({
            room: {
                type: String,
                required: true,
            },
            user: {
                type: Number,
                required: true,
            },
            chat: String,
            gif: String,
            createdAt: {
                type: Date,
                default: Date.now,
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