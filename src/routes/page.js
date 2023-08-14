import {Router} from "express";
import sql from "mysql";
import {getUserData,postUserJoin} from '../dao/user.js';
const router = Router();
import {getSelection, postInsert, postUpdate} from "../modules/maria.js";
import {join,login} from "../controllers/auth.js";


router.get("/login",login);

router.post("/join",join);

router.post("/",function(res,req){
    const {email,nick,password}=req.body;
    const modifyUser=`update user set (nick,password)=(${nick},${password}) where email=${email}`;
    console.log(modifyUser);
    const resultSet=postUpdate(modifyUser);
    res.send("성공");
});

router.get('/', (req, res, next) => {
    res.render('main', {
    });
});
export default router;