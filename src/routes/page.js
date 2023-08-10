import {Router} from "express";
const router = Router();
import {getSelection, postInsert, postUpdate} from "../modules/maria.js";

router.get("/profile/:id", function(req,res){
    const id=req.params.id;
    console.log(id);
    const profile = `select email,nick from user where email=${id}`;
    console.log(profile);
    const resultSet = getSelection(profile);
    res.send("성공");
});
router.post("/join",function(req,res){
    const {email,nick,password}=req.params;
    const newUser=`insert into user (email,nick,password) values(${email},${nick},${password})`;
    console.log(newUser);
    const resultSet=postInsert(newUser);
    res.send("성공");
});

router.post("/profileUpdate",function(res,req){
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