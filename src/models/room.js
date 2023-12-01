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
            title: {
                type: Sequelize.STRING(200),
                allowNull:false,
            },
            max: {
                type: Sequelize.INTEGER(10),
                allowNull:false,
                default: 10,
                min: 2,
            },
            owner: {
                type: Sequelize.STRING(50),
                allowNull:false,
            },
            password: {
                type: Sequelize.STRING(100)
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