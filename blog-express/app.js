var createError = require('http-errors'); //返回404
var express = require('express');
var path = require('path');
var fs = require('fs')
var cookieParser = require('cookie-parser'); //解析cookie
var logger = require('morgan'); //记录日志
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog')
const userRouter = require('./routes/user')

var app = express(); //初始化app

// view engine setup 纯后端开发，忽略
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  //开发，测试环境
  app.use(logger('dev'));
} else {
  //线上环境
  console.log('线上环境')
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }));
}


app.use(express.json()); //处理post请求数据 
app.use(express.urlencoded({
  extended: false
})); //post数据兼容其它格式
app.use(cookieParser()); //解析cookie
app.use(express.static(path.join(__dirname, 'public'))); //前端静态文件，不需要

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})
//配置session
app.use(session({
  secret: 'WJiol_#23123_', //加密的密钥
  cookie: {
    path: '/', //路径
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 //失效时间
  },
  store: sessionStore //关联redis的存储
}))

/* 注册路由 */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  //dev环境下，error显示，不能把报错信息暴露给外网用户
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;