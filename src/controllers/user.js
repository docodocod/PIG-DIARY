import {getUserData,postUserJoin} from "../dao/user.js";


exports.userJoin=(req,res,next)=>{
    try {
        const newUser = postUserJoin();
        if (newUser) {
            res.send('success');
        } else {
            res.status(404).send("fail");
        }
    }catch(error){
            console.error(error);
            next(error);
        }
    };