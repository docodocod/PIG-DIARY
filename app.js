const express=require('express');
const cookieParser=require('cookie-parser');
const morgan=require('morgan');
const path=require('path');
const session=require('express-session');
const nunjucks=require('nunjucks');
const dotenv=require('dotenv');

dotenv.config();
const pageRouter=require('./src/routes/page');
const {sequelize}=require('./models');

const app=express();

const maria= require('./modules/maria');
maria.connect(); //마리아 db 연결

app.set('port',process.env.PORT || 8001); //process.env.PORT를 앞에 붙여준 이유는 배포와 개발할때 서로 다른 포트를 사용할거라서
app.set('view engine','html');
nunjucks.configure('views',{ //nunjucks 설정방법
    express:app,
    watch:true,
});
/*sequelize.sync({force: false})
    .then(()=>{
        console.log("데이터 베이스 연결 성공");
    })
    .catch((err)=>{
        console.error(err);
    });*/
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    },
}));

app.use('/', pageRouter);

app.use((req,res,next)=>{
    const error=new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status=404;
    next(error);
});
        
app.use((err,req,res,next)=>{
    res.locals.message=err.message;
    res.locals.error=process.env.NODE_ENV!=='production' ? err:{};
    res.status(err.status ||500);
    res.render('error');
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기중');
});
