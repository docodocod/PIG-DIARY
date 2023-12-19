const Sequelize=require("sequelize");
class Room extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id:{
                type:Sequelize.INTEGER(200),
                allowNull:false,
                primaryKey:true,
                autoIncrement:true,
            },
            opponent: {
                type: Sequelize.STRING(200),
                allowNull:false,
            },
            owner: {
                type: Sequelize.STRING(50),
                allowNull:false,
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
};
module.exports=Room;