const Sequelize=require("sequelize");
class Upload extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            files:{
                type:Sequelize.STRING(500),
                allowNull:true,
            },
            PostId:{
                type:Sequelize.INTEGER(),
                allowNull:true,
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Upload',
            tableName: 'uploads',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    };
    static associate(db){
        db.Upload.belongsTo(db.Post);
    }
}

module.exports=Upload;