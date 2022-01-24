const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const MongoConnect = require('./db')
const cors = require('koa2-cors')
const koajwt = require('koa-jwt')
const mylogger = require('./controller/mylogger')
const SIGN_KEY = 'jianshu-server-jwt'
const log4js = require('./controller/log4js')
//连接数据库
MongoConnect()

//引入路由
const { unprotectedRouter, protectedUserRouter } = require('./routes/users')
const protectedUploadRouter = require('./routes/upload')
const articleRouter = require('./routes/article')
const commentRouter = require('./routes/comment')
const fansRouter = require('./routes/fans')
const webRouter = require('./routes/web')
// error handler
onerror(app)

// middlewares koa原生中间件
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
})) //请求体解析中间件 ctx.response.body
app.use(json())
app.use(logger()) //日志记录
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
//


// log4js中间件
app.use(logger())


// 自定义请求日志记录logger中间件
// app.use(mylogger())

//跨域cors中间件
app.use(cors())

// 不受保护的routes
app.use(webRouter.routes(), articleRouter.allowedMethods()) //
app.use(unprotectedRouter.routes(), unprotectedRouter.allowedMethods()) //allowedMethods: ctx.status为空或者404的时候,丰富response对象的header头.

// 注册 JWT 中间件 
app.use(koajwt({ secret: SIGN_KEY }));//.unless({ method: 'GET' })
//受jwk保护的routes放后面
app.use(protectedUploadRouter.routes(), protectedUploadRouter.allowedMethods())//文件上传
app.use(protectedUserRouter.routes(), protectedUserRouter.allowedMethods())
app.use(articleRouter.routes(), articleRouter.allowedMethods()) //文章相关路由 commentRouter
app.use(commentRouter.routes(), commentRouter.allowedMethods()) //评论相关路由
app.use(fansRouter.routes(), fansRouter.allowedMethods())//fansRouter粉丝相关路由

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
