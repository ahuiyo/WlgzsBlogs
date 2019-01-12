const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const superagent=require('superagent');
//日志
// var logger = require('morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 定义日志和输出级别
// app.use(logger('dev'));
// 定义数据解析器
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 定义cookie解析器
app.use(cookieParser());
// 定义静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
//保存用户信息
const session = require("express-session");
//配置中间件  固定格式
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge:1000*60*30*30  //过期时间
    },
    rolling:true  //只要页面由刷新，session值就会被保存，若为false则1000*60*30*30以后不管有没有操作，session都会消失
}));

app.locals['userinfo']='';   //设置初始值为空

//引入模块
const indexRouter =require('./routes/index.js');

//跨域设置
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200); /让options请求快速返回/
    }
    else {
        next();
    }
});


//访问页面的时候判断用户是否登录

// app.use(function (req, res, next) {
//     if (req.url=='/login'||req.url=='/dologin'){
//         next();
//     } else{
//         if (req.session.userinfo && req.session.userinfo.username!=''){
//             next();
//         }else{
//             res.redirect('/login');
//         }
//     }
// });

// 访问主页面
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
