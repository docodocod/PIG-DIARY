import {Router} from "express";
const router = Router();
import {getSelection, postInsert, postUpdate} from "../modules/maria.js";

router.get("/profile", function(req,res,next){
    const id=req.query.email;
    const profile = `select email,nick from user where email=${id}`;
    console.log(profile);
    const resultSetㅇ = getSelection(profile);
});
router.get("/join",function(res,req,email,nick,password){
    const newUser=`insert into user (email,nick,password) values(${email},${nick},${password})`;
    console.log(newUser);
    const resultSet=postInsert(newUser);
});

router.get("profileUpdate",function(res,req,email,nick,password){
    const modifyUser=`update user set (nick,password)=(${nick},${password}) where email=${email}`
    console.log(modifyUser);
    const resultSet=postUpdate(modifyUser);
});

router.get('/', (req, res, next) => {
    res.render('main', {
    });
});
export default router;