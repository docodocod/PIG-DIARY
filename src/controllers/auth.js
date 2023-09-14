import {postUserJoin, getUserData} from "../schema/user.js";
import crypto from "crypto";
import dotenv from "dotenv";
const Config = dotenv.config({ path: "./config/.env.app" }).parsed;
import jwt from "jsonwebtoken";
export async function join(req, res, next) {
    const {email,nick,password}=req.body;
    try{
        const exUser=await getUserData(email);
        console.log(exUser);
/*        if(exUser) {
            return res.redirect('/join?error=exist');
        }*/
        const salt = Config.SALT;
        const iterations = parseInt(Config.ITERATION);
        const keyLength = 64; // 출력 길이
        crypto.pbkdf2(password, salt, iterations, keyLength, 'sha512', (err, derivedKey) => {
            if (err) throw err;
            const hashedPassword = derivedKey.toString('hex');
            console.log('Hashed Password:', hashedPassword);
            postUserJoin(email, nick, hashedPassword,salt);
            return res.redirect('/');
        });
    }catch(error){
        console.error(error);
        return next(error);
    }
};

export async function login(req, res, next) {
    const {email, password} = req.body;
    try {
        const exUser = await getUserData(email);
        if (exUser) {
            const storedPW=exUser.password;
            const salt = Config.SALT;
            const iterations = parseInt(Config.ITERATION);
            const keyLength = 64; // 출력 길이
            crypto.pbkdf2(password, salt, iterations, keyLength, 'sha512', (err, derivedKey) => {
                if (err) throw err;
                const hashedPw = derivedKey.toString('hex');
                console.log('Hashed Password:', hashedPw);
                    if ( storedPW === hashedPw) {
                        console.log("로그인 성공");
                        try{
                            const token=jwt.sign({email},Config.JWT_SECRET,{
                                expiresIn:"60m",
                                issuer:"dongja",
                            })
                            console.log("토큰이 발급 되었습니다.");
                            console.log("token: "+token);
                            req.session.user=exUser.nick;
                            console.log(req.session.user);
                            res.render('layout',{user : exUser});
                        }catch(error){
                            console.log(error);
                        }
                    } else {
                        res.status(200).send("비밀번호가 틀렸습니다.");
                    }
            });
        }else{
            res.status(200).send("아이디가 존재하지 않습니다.");
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

export async function logout(req,res){
    req.logout();
    req.session.destroy;
    res.redirect('/');
}

