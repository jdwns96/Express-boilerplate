const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();  // express object call

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev')); // console 도구

app.use('/', express.static(path.join(__dirname, 'public'))); // 정적파일 라우터 
// 이걸 셋팅 안하면 css, img 파일 못 읽어옴 

app.use(express.json());    //요청 처리 
app.use(express.urlencoded({ extended: false}));    //요청 처리
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false
    },
    name: 'session-cookie'
}));

app.use((req, res, next) => { // middle ware
    console.log('모든 요청에실행');
    next();
});

const indexRouter = require('./routes/index.js');
app.use('/', indexRouter);

const userRouter = require('./routes/user.js');
app.use('/user', userRouter);


app.use((err, req, res, next) => {  // 에러처리 미들웨어
    console.error(err);
    res.status(500).send(err.message);
});


app.listen(app.get('port'), () => {
    console.log(app.get('port'), " : port running server ");
});