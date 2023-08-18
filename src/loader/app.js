import express from "express";
import nunjucks from "nunjucks";
import formData from "express-form-data";
import dotenv from "dotenv";
import path from "path";
import session from "session";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import passport from "passport";
const Config = dotenv.config({ path: "./config/.env.app" }).parsed;
import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import userRouter from "./routes/user.js";
import passportConfig from "./passport";

const app = express();
passportConfig();
app.set('port', Config.SERVER_PORT || 8001); //Config.PORT를 앞에 붙여준 이유는 배포와 개발할때 서로 다른 포트를 사용할거라서
app.set('view engine', 'html');
nunjucks.configure('views', { //nunjucks 설정방법
    express: app,
    watch: true,
});

app.use(morgan('dev'));
app.use(express.json());
app.use("/img",express.static(path.join(__dirname,'uploads')));
app.use(formData.parse());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(Config.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:Config.COOKIE_SECRET,
    cookie:{
        httponly:true,
        secure:false,
    },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',indexRouter);
app.use('/auth',authRouter);
app.use('/post',postRouter);
app.use('/user',userRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    next(error);
});

app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const server=app.listen(Config.SERVER_PORT,()=>{
    console.log('Server Listening on 127.0.0.1:' + Config.SERVER_PORT);
});