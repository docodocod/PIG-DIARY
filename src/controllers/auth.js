import User from "../models/user.js";
import crypto from "crypto";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export function renderProfile(req, res){
    res.render('profile', { title: '내 정보 - NodeBird' });
};
export function renderJoin(req, res) {
    res.render('join', { title: '회원가입 - NodeBird' });
};
export async function join(req, res, next) {
    const {email,nick,password}=req.body;
    try{
        const exUser=await User.findOne({where:{email}});
        if(exUser){
            return res.redirect("/join?error=아이디가 존재 합니다"); //아이디가 존재할 시 return
        }
        const salt = process.env.SALT;
        const iterations = parseInt(process.env.ITERATION);
        const keyLength = 64; // 출력 길이
        
        //비밀번호 암호화
        crypto.pbkdf2(password, salt, iterations, keyLength, 'sha512', (err, derivedKey) => {
            if (err) throw err;
            const hashedPassword = derivedKey.toString('hex');
            console.log('Hashed Password:', hashedPassword);
            User.create({
                email,
                nick,
                password: hashedPassword,
                salt
            });
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
        const exUser = await User.findOne({where:{email}});
        if (exUser) {
            const storedPW=exUser.password;
            const salt = process.env.SALT;
            const iterations = parseInt(process.env.ITERATION);
            const keyLength = 64; // 출력 길이
            
            //암호화된 비밀번호 비교하기
            crypto.pbkdf2(password, salt, iterations, keyLength, 'sha512', (err, derivedKey) => {
                if (err) throw err;
                const hashedPw = derivedKey.toString('hex');
                console.log('Hashed Password:', hashedPw);
                    if ( storedPW === hashedPw) {
                        console.log("로그인 성공");
                        try{
                            const token=jwt.sign({email},process.env.JWT_SECRET,{
                                expiresIn:"60m",
                                issuer:"dongja",
                            })
                            console.log("토큰이 발급 되었습니다.");
                            console.log("token: "+token);
                            req.session.user=exUser.nick;
                            console.log(req.session.user);
                            res.render('loginForm',{user : exUser});
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
