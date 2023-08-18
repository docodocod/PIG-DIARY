import {getUserLogin, postUserJoin, getUserProfile, getUserData} from "../dao/user.js";
import {getSelection, postInsert} from "../modules/maria.js";
import bcrypt, {hash} from "bcrypt";
import {json} from "express";

export async function join(req, res, next) {
    const {email, nick, password} = req.body;
    try {
        const user=getUserData(email);
        const exUser= await getSelection(user);
        console.log(exUser);
        if(!exUser){
            console.log("이미존재");
           return res.redirect("/join?error=exist");
        }
        const hash=await bcrypt.hash(password,12);
        const query = postUserJoin(email, nick, hash);
        await postInsert(query);
        return res.redirect("/");
    } catch (error) {
        console.error(error);
        return next(error);
    }
};

export async function login(req, res, next) {
    try {
        const {email, password} = req.body;
        const hash=await bcrypt.hash(password,12);
        const query = getUserLogin(email, hash);
        const result = await getSelection(query);
        res.status(200).json(result);
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

