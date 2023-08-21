import {getUserLogin, postUserJoin, getUserProfile, getUserData} from "../dao/user.js";
import {Select,Insert} from "../modules/maria.js";
import bcrypt, {hash} from "bcrypt";
import passport from "passport";

export async function join(req, res, next) {
    const {email,nick,password}=req.body;
    try{
        const exUser=await getUserData(email);
        if(exUser){
            return res.redirect('/join?error=exist');
        }
        const hash=await bcrypt.hash(password,12);
        await postUserJoin(email,nick,hash);
        return res.redirect('/');
    }catch(error){
        console.error(error);
        return next(error);
    }
};

export async function login(req, res, next) {
    passport.authenticate("local",(authError,user,info)=>{
        if(authError){
            console.log(authError);
            return next(authError);
        }
        if(!user){
            return res.redirect(`/?loginError=${info.message}`);
        }
        return res.login(user,(loginError)=>{
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    }),(req,res,next);
};

export async function logout(req,res){
    req.logout();
    req.session.destroy;
    res.redirect('/');
}

