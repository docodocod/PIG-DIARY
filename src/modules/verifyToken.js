import jwt from "jsonwebtoken";
import express from "express";
const router=express.Router();
import dotenv from "dotenv";
const Config=dotenv.config({path:"./config/.env.app"}).parsed;


router.get('/test',(req,res,next)=>{
    try {
        req.decoded = jwt.verify(req.headers.authorization, Config.JWT_SECRET);
        return next();
    } catch(error) {
        if (error.name === 'TokenExpireError') {
            return res.status(419).json({
                code: 419,
                message: '토큰이 만료되었습니다.'
            });
        }
        return res.status(401).json({
            code: 401,
            message: '유효하지 않은 토큰입니다.'
        });
    }
});

export default router;