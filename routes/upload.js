const Router = require("@koa/router")
const uploadCtl = require("../controller/upload");

const protectedUploadRouter = new Router({ //有保护的路由
    prefix: '/upload'
});


protectedUploadRouter.post("/img", uploadCtl.uploadSin, uploadCtl.uploadImg);

module.exports = protectedUploadRouter