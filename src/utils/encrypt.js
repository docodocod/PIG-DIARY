const crypto=require('crypto');
const dotenv=require('dotenv');
dotenv.config();

exports.pbkdf2=(password)=>{
    const salt = process.env.SALT;
    const iterations = parseInt(process.env.ITERATION);
    const keyLength = 64; // 출력 길이
    try {
        const derivedKey = crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha512');
        const hashedPassword = derivedKey.toString('hex');
        console.log('Hashed Password:', hashedPassword);
        return hashedPassword;
    }catch(err){
        throw err;
    }
};