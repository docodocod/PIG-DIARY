const Sequelize=require("sequelize");
class Room extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            opponent: { //상대방
                type: Sequelize.INTEGER(),
                allowNull: false,
            },
            owner: { //사용자
                type: Sequelize.INTEGER(),
                allowNull: false,
            },
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
    }
}
module.exports=Room;