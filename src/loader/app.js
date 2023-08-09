import express from "express";
import nunjucks from "nunjucks";

// 우선 config파일을 불러온다
import dotenv from "dotenv";

const Config = dotenv.config().parsed;

import indexRouter from "../routes/page.js";

const app = express();

app.set('port', Config.SERVER_PORT || 8001); //Config.PORT를 앞에 붙여준 이유는 배포와 개발할때 서로 다른 포트를 사용할거라서
app.set('view engine', 'html');
nunjucks.configure('views', { //nunjucks 설정방법
    express: app,
    watch: true,
});

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use("/", indexRouter);
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

const server = app.listen(Config.SERVER_PORT, () => {
    const {address, port} = server.address();
    console.log('Server Listening on 127.0.0.1:' + Config.SERVER_PORT);
});
