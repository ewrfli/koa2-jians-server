// log4js.js
const log4js = require('log4js')
const path = require('path')

log4js.configure({
    appenders: {
        error: {
            type: 'file',           //日志类型
            category: 'errLogger',    //日志名称
            filename: path.join('logs/', 'error/error.log'), //日志输出位置，当目录文件或文件夹不存在时自动创建
            maxLogSize: 104800, // 文件最大存储空间
            backups: 100  //当文件内容超过文件存储空间时，备份文件的数量
        },
        response: {
            type: 'file', //dateFile
            category: 'resLogger',
            filename: path.join('logs/', 'responses/'),
            pattern: 'yyyy-MM-dd.log', //日志输出模式
            alwaysIncludePattern: true,
            maxLogSize: 104800,
            backups: 100
        }
    },
    categories: {
        error: {appenders: ['error'], level: 'info'},
        response: {appenders: ['response'], level: 'info'},
        default: { appenders: ['response'], level: 'info'}
    },
    replaceConsole: true
})

let logger = {}

const formatError = (ctx, err) => {
    const {method,url} = ctx
    let body = ctx.request.body
    const user = ctx.state.user
    return {method, url,body,user, err}
  }
  
  const formatRes = (ctx,costTime) => {
      const {method,url,response:{status,message,body:{success}},request:{header:{authorization}}} = ctx
    let body = ctx.request.body
    const user = ctx.state.user
    return {method, url,user, body, costTime,authorization, response:{status,message,body:{success}}}
  }


let errorLogger = log4js.getLogger('error')
let resLogger = log4js.getLogger('response')

// 封装错误日志
logger.errLogger = (ctx, error) => {
    if(ctx && error) {
        errorLogger.error(formatError(ctx, error))
    }
}

// 封装响应日志
logger.resLogger = (ctx, resTime) => {
    if(ctx) {
        resLogger.info(formatRes(ctx, resTime))
    }
}

module.exports = logger 


