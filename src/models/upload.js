const Sequelize=require("sequelize");
class Upload extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            fileName:{
                type:Sequelize.STRING(500),
                allowNull:true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Upload',
            tableName: 'uploads',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db) {
        db.Upload.belongsTo(db.Post);
    }
}

module.exports=Upload;

