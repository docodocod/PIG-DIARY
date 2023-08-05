const express=require('express');
const passport=require('passport');
const bcrypt=require('bcrypt');
const User=require('../models/user');
const router=express.Router();

router.post('/join',async(req,res,next)=>{
    const {email,nick,password}=req.body; //요청 받은 값들을 저장한다.
    try{
        const exUser=await User.findOne({where: {email}}); //해당 이메일을 db에서 찾는다.
        if(exUser){
            return res.redirect('/join?error=exist');
        }
        const hash=await bcrypt.hash(password,12);
        await User.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect('/');
    }catch(error){
        console.error(error);
        return next(error);
    }
});
module.exports=router;