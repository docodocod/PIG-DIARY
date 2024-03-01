const express = require('express');
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const session = require("express-session");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const helmet=require('helmet');
const hpp=require('hpp');
const passport = require("passport");
const morganMiddelware = require("./src/middlewares/morganMiddleware");
const {sequelize} = require("./src/models/index.js");
const passportConfig = require("./src/passport/index.js");
const path = require("path");
const {webSocket} = require("./src/utils/socket");
const {morganMiddleware} = require("./src/middlewares/morganMiddleware");
const sanitizeHtml=require('sanitize-html');
dotenv.config();

const indexRouter = require("./src/routes/index.js");
const authRouter = require("./src/routes/auth.js");
const postRouter = require('./src/routes/post.js');
const userRouter = require('./src/routes/user.js');
const roomRouter = require('./src/routes/room.js');
const chatBotRouter = require('./src/routes/chatBot.js');

const app = express();
passportConfig();
sanitizeHtml('');

app.set('port', process.env.SERVER_PORT || 4161); //Config.PORT를 앞에 붙여준 이유는 배포와 개발할때 서로 다른 포트를 사용할거라서
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

/* DB 연결 */
sequelize.sync({force: false})
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

const sessionOption = {
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}
if(process.env.NODE_ENV==="production"){
    sessionOption.proxy=true;
    /*sessionOption.cookie.secure=true; //https 사용시 주석 해제*/
}
app.use(session(sessionOption));


/* 배포 환경 설정*/
if (process.env.NODE_ENV === "production") {
    app.use(morgan('combined'))
    app.enable('trust proxy');
/*    app.use(helmet({contentSecprityPolicy:true}));*/
    app.use(hpp());
} else {
    app.use(morgan("dev"));
}
app.use(express.json());
app.use(morganMiddleware);
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session()); //passport->index.js로 넘어가서 deserialize로 넘어간다.

/* About upload */
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/chats', express.static(path.join(__dirname, 'uploads', 'chats')));
app.use('/uploads/profiles', express.static(path.join(__dirname, 'uploads', 'profiles')));
app.use('/uploads/posts', express.static(path.join(__dirname, 'uploads', 'posts')));

/* router path */
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/room', roomRouter);
app.use('/chat-bot', chatBotRouter);

app.use((req, res, next) => { //404 에러
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    next(error);
});

app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message ="해당 페이지를 찾을 수 없습니다."
    console.log("에러메세지:"+err.message);
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/* 웹서버 연결 확인 */
const server = app.listen(process.env.SERVER_PORT, () => {
    console.log('Server Listening on 127.0.0.1:' + process.env.SERVER_PORT + "에서 대기중입니다.");
});

/* 웹소켓 */
webSocket(server, app);

