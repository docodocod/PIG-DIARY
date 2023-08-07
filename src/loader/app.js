import express from "express";
import nunjucks from "nunjucks";
import mariadb from "./modules/maria.js";

// 우선 config파일을 불러온다
import config from "../../config/config.json" assert {type: "json"} ;


// 기본값은 개발모드로 설정한다
const Config = config.development;

import dbLoader from "../modules/maria.js"
import indexRouter from "../routes/index.js";

const app = express();

dbLoader();

mariadb.getConnection(); //db접속

app.set('port', Config.PORT || 8001); //Config.PORT를 앞에 붙여준 이유는 배포와 개발할때 서로 다른 포트를 사용할거라서
app.set('view engine', 'html');
nunjucks.configure('views', { //nunjucks 설정방법
    express: app,
    watch: true,
});


app.use(express.json());

app.use(express.urlencoded({extended: true}));



// app.use(cookieParser(Config.COOKIE_SECRET));

/*app.use(session({
    resave: false,
    saveUninitialized
: false,
    secret: Config.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));*/

app.use("/", indexRouter);
app.use(mariadb());
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
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

const server = app.listen(Config.port, () => {
    const {address, port} = server.address();
    console.log('Server Listening on 127.0.0.1:' + Config.PORT);
});
