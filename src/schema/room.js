const Sequelize = require('sequelize');
class Room extends Sequelize.Model {
    static initiate(sequelize) {
        Room.init({
            title: {
                type: String,
                required: true,
            },
            max: {
                type: Number,
                required: true,
                default: 10,
                min: 2,
            },
            owner: {
                type: String,
                required: true,
            },
            password: String,
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
    static associate(db) {
        db.Room.hasMany(db.Chat,{fro});
        db.Room.belongsToMany(db.Hashtag, {through: 'PostHashtag'});
    }
};
export default Room;