const Sequelize=require("sequelize");
class Upload extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            files:{
                type:Sequelize.STRING(500),
                allowNull:true
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Upload',
            tableName: 'uploads',
            paranoid: false,
        });
    };
    static associate(db){
        db.Upload.belongsTo(db.Post);
    }
}
module.exports=Upload