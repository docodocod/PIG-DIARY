const Sequelize=require("sequelize");
class Upload extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            files:{
                type:Sequelize.STRING(200),
                allowNull:true
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Upload',
            tableName: 'Uploads',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    };
    static associate(db){
        db.Upload.belongsTo(db.Post);
    }
}
module.exports=Upload