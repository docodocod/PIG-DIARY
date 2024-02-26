const Sequelize=require("sequelize");
class Test extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            test: {
                type: Sequelize.STRING(100),
                allowNull: true,
            }
        }, {
            sequelize,
            timestamps: true,
            modelName: 'Test',
            tableName: 'tests',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    };

    static associate(db) {
    };
}
module.exports=Test;