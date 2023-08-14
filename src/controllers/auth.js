import {getUserLogin, postUserJoin} from "../dao/user.js";
import {getSelection, postInsert} from "../modules/maria.js";
import bcrypt from "bcrypt";

export async function join(req, res, next) {
    try {
        const {email, nick, password} = req.body;
        const query = postUserJoin(email, nick, password);
        const result = postInsert(query);
        console.log(result);
        return result;
        res.send("성공");
    }catch(error){
        console.error(error);
    }
};
export async function login(req,res,next) {
    try {
        const {email, password} = req.body;
        console.log(email,password);
        const query = getUserLogin(email, password);
        const result = getSelection(query);
        console.log(result);
        return result;
        res.send("로그인 성공");
    } catch (error) {
        console.error(error);
    }
};

