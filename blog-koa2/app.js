const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const session = require('koa-generic-session')
const redisStore = require('koa-redis')

//记录日志 koa不支持morgan ,所以要安装插件，koa-morgan
var path = require('path');
var fs = require('fs')
var morgan = require('koa-morgan'); //记录日志

const index = require('./routes/index')
const user = require('./routes/user')
const blog = require('./routes/blog')

const {
  REDIS_CONF
} = require('./conf/db')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

//记录日志  和express一样
const ENV = process.env.NODE_ENV //环境参数
if (ENV !== 'production') {
  //开发，测试环境
  app.use(morgan('dev'));
} else {
  //线上环境
  console.log('线上环境')
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(morgan('combined', {
    stream: writeStream
  }));
}

//session 配置
app.keys = ['WJiol#23123']
app.use(session({
  //配置cookie
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  //配置redis
  store: redisStore({
    // all: '127.0.0.1:6379' //写死本地的redis
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))



// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app