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
//连接数据库
MongoConnect()

const index = require('./routes/index')
// const users = require('./routes/users')
const { unprotectedRouter, protectedUserRouter } = require('./routes/users')
const protectedUploadRouter = require('./routes/upload')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
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

// app.use(koajwt({
//   secret: 'jianshu-server-jwt'
// }).unless({
//   path:[/^\/users\/login/]
// }))

app.use(cors())

// routes
app.use(unprotectedRouter.routes(), unprotectedRouter.allowedMethods())

// 注册 JWT 中间件 
app.use(koajwt({ secret: 'jianshu-server-jwt' }));//.unless({ method: 'GET' })
//受jwk保护的放后面
// app.use(index.routes(), index.allowedMethods())
app.use(protectedUploadRouter.routes(), protectedUploadRouter.allowedMethods())//文件上传
app.use(protectedUserRouter.routes(), protectedUserRouter.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
