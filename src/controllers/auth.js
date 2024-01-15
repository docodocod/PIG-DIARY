const User=require("../models/user.js");
const crypto=require('crypto');
const dotenv=require('dotenv');
const passport=require('passport');
const jwt=require("jsonwebtoken");
dotenv.config();

exports.loginTest=async(req,res,next)=>{
    res.render("login",{title:"loginTest"});
}

exports.join=async(req,res,next)=>{
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

exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/?error=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/main');
        });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙인다.
};

exports.unregister=async (req,res,next)=>{
    await User.destroy({where:{id:req.user.id}});
    res.redirect('/');
}

exports.logout = (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
};
