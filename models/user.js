const Sequelize=require('sequelize');

module.exports=class user extends Sequelize.model{
    static init(sequelize){
        return super.init({
            email:{
                type:sequelize.STRING(30);
                allow
            }
                          })
}

})