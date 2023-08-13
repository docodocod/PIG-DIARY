const mariadb=require('../modules/maria.js');
import bcrypt from "bcrypt";


module.exports=(req,res)=>{
    const {email,password}=req.body;
    const query=`select email,password from user where email=${email}`;
    const result=mariadb.getSelection(query);
    return result;
}