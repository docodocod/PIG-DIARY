const express = require('express');
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const session = require("express-session");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const passport = require("passport");
dotenv.config();

const indexRouter = require("./src/routes/index.js");
const authRouter = require("./src/routes/auth.js");
const postRouter=require('./src/routes/post.js');
const userRouter=require('./src/routes/user.js');
const roomRouter=require('./src/routes/room.js');
const chatBotRouter=require('./src/routes/chatBot.js');


const {sequelize} = require("./src/models/index.js");
const passportConfig = require("./src/passport/index.js");
const path = require("path");
const {webSocket} = require("./src/utils/socket");

const app = express();
passportConfig();

app.set('port', process.env.SERVER_PORT || 8001); //Config.PORT를 앞에 붙여준 이유는 배포와 개발할때 서로 다른 포트를 사용할거라서
app.set('view engine', 'html');
nunjucks.configure('views', { //nunjucks 설정방법
    express: app,
    watch: true,
});

sequelize.sync({force: false}) //true로 하면 강제적으로 데이터베이스를 초기화하고 다시만든다.
    .then(() => { //sequelize를 실행 시켜 mySQL과 연결해준다.
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
//테스트
app.use(morgan('dev')); // 데이터의 흐름을 자세히 보여줌
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session()); //passport->index.js로 넘어가서 deserialize로 넘어간다.

app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/auth',authRouter);
app.use('/post',postRouter);
app.use('/user',userRouter);
app.use('/room',roomRouter);
app.use('/chatBot',chatBotRouter);
app.use((req, res, next) => { //404 에러
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

const server = app.listen(process.env.SERVER_PORT, () => { //웹서버 연결 확인
    console.log('Server Listening on 127.0.0.1:' + process.env.SERVER_PORT+"에서 대기중입니다.");
});

webSocket(server,app);

