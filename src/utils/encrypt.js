const crypto=require('crypto');
const dotenv=require('dotenv');
dotenv.config();

//해시 암호와 메서드
exports.pbkdf2=(password)=>{
    const salt = process.env.SALT;
    const iterations = parseInt(process.env.ITERATION);
    const keyLength = 64;
    try {
        const derivedKey = crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha512');
        const hashedPassword = derivedKey.toString('hex');
        console.log('Hashed Password:', hashedPassword);
        return hashedPassword;
    }catch(err){
        throw err;
    }
};