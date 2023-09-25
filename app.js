import express from "express";
import nunjucks from "nunjucks";
import formData from "express-form-data";
import dotenv from "dotenv";
import session from "express-session";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import ColorHash from "color-hash";
dotenv.config();

import indexRouter from "./src/routes/index.js";
import authRouter from "./src/routes/auth.js";
import tokenTestRouter from "./src/modules/verifyToken.js";
import roomRouter from "./src/routes/room.js";
import {passportConfig} from "./src/passport/index.js";
import path from "path";
import {webSocket} from "./src/utils/socket.js";
import {sequelize} from "./src/models/index.js";

const app = express();
passportConfig();
app.set('port', process.env.SERVER_PORT || 8001); //Config.PORT를 앞에 붙여준 이유는 배포와 개발할때 서로 다른 포트를 사용할거라서
app.set('view engine', 'html');
nunjucks.configure('views', { //nunjucks 설정방법
    express: app,
    watch: true,
});

sequelize.sync({ force: false }) //true로 하면 강제적으로 데이터베이스를 초기화하고 다시만든다.
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.json());
app.use(formData.parse());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httponly:true,
        secure:false,
    },
}));
app.use(passport.initialize());
app.use(passport.session()); //passport->index.js로 넘어가서 deserialize로 넘어간다.

app.use(express.static(path.join("C:\\workspace\\node_twitter", 'public')));
app.use('/img', express.static(path.join("C:\\workspace\\node_twitter", 'uploads')));

app.use('/',indexRouter);
app.use('/token',tokenTestRouter);
app.use('/auth',authRouter);
app.use('/room',roomRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    next(error);
});

app.use((req, res, next) => {
    if (!req.session.color) {
        const colorHash = new ColorHash();
        req.session.color = colorHash.hex(req.sessionID);
        console.log(req.session.color, req.sessionID);
    }
    next();
});

app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const server=app.listen(process.env.SERVER_PORT,()=>{
    console.log('Server Listening on 127.0.0.1:' + process.env.SERVER_PORT);
});

webSocket(server,app);

