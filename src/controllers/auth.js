import {getUserLogin, postUserJoin, getUserProfile} from "../dao/user.js";
import {getSelection, postInsert} from "../modules/maria.js";
import bcrypt, {hash} from "bcrypt";
import {json} from "express";

export async function join(req, res, next) {
    try {
        const {email, nick, password} = req.body;
        const salt=12;
        bcrypt.hash(password, salt, (err, encryptedPW) => {

        })
        const query = postUserJoin(email, nick, encodedPassword);
        const result = postInsert(query);
        res.status(200).json(result);
        return result;
    } catch (error) {
        console.error(error);
    }
};

export async function login(req, res, next) {
    try {
        const {email, password} = req.body;
        console.log(email, password);
        const query = getUserLogin(email, password);
        const result = getSelection(query);
        console.log(result);
        return result;
        res.send("로그인 성공");
    } catch (error) {
        console.error(error);
    }
};

export async function profile(req, res, next) {
    try {
        const email = req.query.email;
        console.log(email);
        const query = getUserProfile(email);
        const result = await getSelection(query);

        res.status(200).json(result[0]);

    } catch (error) {
        console.error(error);
    }
}

