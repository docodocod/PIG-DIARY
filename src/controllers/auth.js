import {postUserJoin, getUserData} from "../dao/auth.js";
import crypto from "crypto";
export async function join(req, res, next) {
    const {email,nick,password}=req.body;
    try{
        const exUser=await getUserData(email);
        console.log(exUser);
        if(exUser) {
            return res.redirect('/join?error=exist');
        }
        const salt = crypto.randomBytes(16).toString('hex'); // 무작위로 생성된 솔트 값
        const iterations = 10; // 반복 횟수
        const keyLength = 64; // 출력 길이
        crypto.pbkdf2(password, salt, iterations, keyLength, 'sha512', (err, derivedKey) => {
            if (err) throw err;
            const hashedPassword = derivedKey.toString('hex');
            console.log('Hashed Password:', hashedPassword);
            postUserJoin(email, nick, hashedPassword);
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
        console.log(exUser);
        if (exUser) {
            const storedPw = exUser.password;
            console.log("storedPw: "+storedPw);
            const salt = crypto.randomBytes(16).toString('hex'); // 무작위로 생성된 솔트 값
            const iterations = 10; // 반복 횟수
            const keyLength = 64; // 출력 길이
            crypto.pbkdf2(password, salt, iterations, keyLength, 'sha512', (err, derivedKey) => {
                if (err) throw err;
                const hashedPw = derivedKey.toString('hex');
                console.log('Hashed Password:', hashedPw);
                    if (storedPw === hashedPw) {
                        res.status(200).send("로그인 성공");
                    } else {
                        res.status(200).send("비밀번호가 틀렸습니다.");
                    }
            });
        }else{
            res.error("아이디가 존재하지 않습니다.");
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

