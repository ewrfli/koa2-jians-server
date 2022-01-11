//自定义请求日志记录logger中间件
const mylogger = function() {
  return async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`mylogger: ${ctx.method} ${ctx.url} ${ctx.status} - ${ms}ms`);
  };
}
module.exports = mylogger
